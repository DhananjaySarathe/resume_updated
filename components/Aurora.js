'use client';

import { useEffect, useRef } from 'react';

// Ported from the Stitch "Luminescent" shader: violet + cyan aurora ribbons over a faint star grid.
const VERTEX = `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  vec2 mouseNorm = (u_mouse / u_resolution) * 2.0 - 1.0;
  p += mouseNorm * 0.12;

  float t = u_time * 0.18;
  float n1 = noise(p * 1.8 + vec2(t * 0.35, -t * 0.25));
  float n2 = noise(p * 3.2 - vec2(-t * 0.2, t * 0.4) + n1 * 1.2);
  float n3 = noise(p * 5.0 + n2 * 0.9);

  float ribbon1 = sin(p.y * 4.5 + n1 * 3.5 + t * 0.8) * cos(p.x * 3.5 + n2 * 2.5);
  float ribbon2 = cos(p.y * 3.0 - n2 * 2.8 - t * 0.6) * sin(p.x * 4.0 - n1 * 2.0);
  float glow1 = smoothstep(0.7, 1.0, ribbon1) * 0.5;
  float glow2 = smoothstep(0.65, 1.0, ribbon2) * 0.4;

  vec2 gridPos = fract(p * 12.0) - 0.5;
  float dotGrid = smoothstep(0.05, 0.01, length(gridPos)) * 0.05 * smoothstep(0.3, 0.8, n3);

  vec3 bg = vec3(0.071, 0.075, 0.09);
  vec3 violetAura = vec3(0.55, 0.2, 0.95) * smoothstep(0.2, 1.1, n2) * 0.22;
  vec3 cyanAura = vec3(0.05, 0.75, 0.9) * smoothstep(0.25, 1.1, n1) * 0.25;
  vec3 beam = vec3(0.75, 0.45, 1.0) * glow1 * 0.55 + vec3(0.1, 0.9, 1.0) * glow2 * 0.45;

  vec3 color = bg + (violetAura + cyanAura + beam) * 0.8 + vec3(dotGrid * 0.4, dotGrid * 0.8, dotGrid);
  float vig = 1.0 - length(uv - 0.5) * 0.9;
  color *= clamp(vig, 0.3, 1.0);

  gl_FragColor = vec4(color, 1.0);
}`;

// The aurora is soft by nature, so it renders at a fraction of the screen size and is
// scaled up by CSS. Visually identical, a fraction of the GPU cost.
const RENDER_SCALE = 0.5;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function Aurora() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl', { antialias: false, powerPreference: 'low-power' });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    const syncSize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * RENDER_SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * RENDER_SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    syncSize();
    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);

    // The pointer eases toward its target so the parallax drifts instead of snapping.
    const target = { x: 0.5, y: 0.5 };
    const eased = { x: 0.5, y: 0.5 };
    const onPointerMove = (e) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const draw = (ms) => {
      eased.x += (target.x - eased.x) * 0.04;
      eased.y += (target.y - eased.y) * 0.04;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTime, ms * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, eased.x * canvas.width, eased.y * canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let frame = 0;
    const loop = (ms) => {
      draw(ms);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw(12000);
    } else {
      document.addEventListener('visibilitychange', onVisibility);
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 block h-full w-full"
    />
  );
}
