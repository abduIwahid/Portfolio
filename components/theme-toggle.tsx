'use client';
import { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

/**
 * Ink-bleed theme transition (approved by Wadi 2026-11-10, V1 style —
 * the clean spread, not the feathered/fibred V2 detailing).
 *
 * Adapted from the ink-bleed-theme-changer concept (WebGL ink spread):
 *  1. A fixed WebGL2 canvas covers the viewport, fully transparent, so
 *     the live page in the OLD theme shows through.
 *  2. An ink blot in the OLD theme's --background colour spreads from
 *     the click point with fbm-noise-warped edges until it covers the
 *     screen.
 *  3. At full cover the theme flips on <html data-theme> UNDER the blot.
 *  4. The blot dissolves with noise, revealing the NEW theme.
 *
 * Fallbacks: reduced-motion preference, no WebGL2, shader failure, or a
 * transition already running all degrade to the previous instant flip.
 * The toggle must always work.
 */

const INK_VERT = `#version 300 es
layout(location=0) in vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

const INK_FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform vec2 uOrigin;
uniform vec3 uInk;
uniform float uCover;
uniform float uDissolve;
uniform float uSeed;
out vec4 fragColor;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++){ v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main(){
  vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  float maxDist = max(max(distance(uOrigin, vec2(0.0, 0.0)),
                          distance(uOrigin, vec2(uRes.x, 0.0))),
                      max(distance(uOrigin, vec2(0.0, uRes.y)),
                          distance(uOrigin, uRes)));
  vec2 np = (px - uOrigin) / max(uRes.x, uRes.y);
  float warp = fbm(np * 5.0 + uSeed) - 0.5;
  float d = distance(px, uOrigin) + warp * maxDist * 0.22;
  float dn = d / maxDist;

  float edge = 0.012;
  float coverMask = 1.0 - smoothstep(uCover - edge, uCover + edge, dn);

  float dthresh = uDissolve * 1.25 - dn * 0.15;
  float dmask = smoothstep(dthresh - 0.10, dthresh + 0.10,
                           fbm(np * 7.0 - uSeed) + dn * 0.12);

  float alpha = coverMask * (1.0 - dmask);
  if (alpha <= 0.003) discard;
  fragColor = vec4(uInk, alpha);
}`;

interface InkUniforms {
  res: WebGLUniformLocation | null;
  origin: WebGLUniformLocation | null;
  ink: WebGLUniformLocation | null;
  cover: WebGLUniformLocation | null;
  dissolve: WebGLUniformLocation | null;
  seed: WebGLUniformLocation | null;
}

function createInkProgram(gl: WebGL2RenderingContext): { program: WebGLProgram; u: InkUniforms } | null {
  function shader(type: number, src: string) {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) { gl.deleteShader(sh); return null; }
    return sh;
  }
  const vs = shader(gl.VERTEX_SHADER, INK_VERT);
  const fs = shader(gl.FRAGMENT_SHADER, INK_FRAG);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  return {
    program,
    u: {
      res: gl.getUniformLocation(program, 'uRes'),
      origin: gl.getUniformLocation(program, 'uOrigin'),
      ink: gl.getUniformLocation(program, 'uInk'),
      cover: gl.getUniformLocation(program, 'uCover'),
      dissolve: gl.getUniformLocation(program, 'uDissolve'),
      seed: gl.getUniformLocation(program, 'uSeed'),
    },
  };
}

const SPREAD_MS = 620;
const HOLD_MS = 40;
const DISSOLVE_MS = 520;

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

function parseColor(value: string): [number, number, number] | null {
  const m = value.trim().match(/^#([0-9a-f]{6})$/i);
  if (m) {
    const n = parseInt(m[1], 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }
  const rgb = value.trim().match(/^rgba?\(([^)]+)\)$/i);
  if (rgb) {
    const parts = rgb[1].split(',').map((s) => parseFloat(s));
    if (parts.length >= 3 && parts.every((v) => Number.isFinite(v))) {
      return [parts[0] / 255, parts[1] / 255, parts[2] / 255];
    }
  }
  return null;
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const busyRef = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // The pre-paint init script in app/layout.tsx has already resolved
    // the theme (saved choice first, OS preference on a first visit);
    // mirror whatever it decided instead of forcing a default here.
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    setIsDark(current === 'dark');
  }, []);

  function applyTheme(next: 'light' | 'dark') {
    document.documentElement.dataset.theme = next;
    try { window.localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
    setIsDark(next === 'dark');
  }

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const next = isDark ? 'light' : 'dark';

    if (busyRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyTheme(next);
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    const origin = {
      x: event.clientX || (rect ? rect.left + rect.width / 2 : window.innerWidth / 2),
      y: event.clientY || (rect ? rect.top + rect.height / 2 : 0),
    };
    const inkValue = getComputedStyle(document.documentElement).getPropertyValue('--background');
    const ink = parseColor(inkValue) ?? (isDark ? [0.09, 0.09, 0.09] : [0.97, 0.97, 0.96]);

    let canvas: HTMLCanvasElement | null = null;
    try {
      canvas = document.createElement('canvas');
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.className = 'ink-bleed-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, depth: false, stencil: false });
      if (!gl) throw new Error('no webgl2');
      const built = createInkProgram(gl);
      if (!built) throw new Error('program failed');
      document.body.appendChild(canvas);
      busyRef.current = true;

      const { program, u } = built;
      gl.useProgram(program);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform2f(u.origin, origin.x * dpr, origin.y * dpr);
      gl.uniform3f(u.ink, ink[0], ink[1], ink[2]);
      gl.uniform1f(u.seed, Math.random() * 40);

      const start = performance.now();
      let flipped = false;
      const total = SPREAD_MS + HOLD_MS + DISSOLVE_MS;

      const frame = (now: number) => {
        const t = now - start;
        let cover: number;
        let dissolve = 0;
        if (t < SPREAD_MS) {
          cover = easeOutCubic(t / SPREAD_MS) * 1.25;
        } else {
          cover = 1.25;
          if (!flipped) {
            flipped = true;
            applyTheme(next);
          }
          const dt = (t - SPREAD_MS - HOLD_MS) / DISSOLVE_MS;
          dissolve = dt <= 0 ? 0 : easeInOut(Math.min(dt, 1));
        }
        gl.uniform1f(u.cover, cover);
        gl.uniform1f(u.dissolve, dissolve);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (t < total) {
          requestAnimationFrame(frame);
        } else {
          canvas?.remove();
          busyRef.current = false;
        }
      };
      requestAnimationFrame(frame);
    } catch {
      canvas?.remove();
      busyRef.current = false;
      applyTheme(next);
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className="icon-button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
