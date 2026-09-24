'use client';

import { useEffect, useRef } from 'react';

// Ported from the Stitch "Shader" screen: flowing lime/cyan aura over a faint grid.
const VERTEX = `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT = `#extension GL_OES_standard_derivatives : enable
precision highp float;
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
  p += mouseNorm * 0.15;

  float t = u_time * 0.25;
  float n1 = noise(p * 2.0 + vec2(t * 0.4, -t * 0.3));
  float n2 = noise(p * 4.0 - vec2(-t * 0.2, t * 0.5) + n1 * 1.5);

  float contour = sin(p.y * 8.0 + n1 * 4.0 + t) * cos(p.x * 6.0 + n2 * 3.0);
  float glow = smoothstep(0.75, 1.0, contour) * 0.4;

  vec2 grid = abs(fract(p * 6.0 - 0.5) - 0.5) / fwidth(p * 6.0);
  float gridLine = (1.0 - min(min(grid.x, grid.y), 1.0)) * 0.04;

  vec3 bg = vec3(0.035, 0.035, 0.048);
  vec3 limeAura = vec3(0.8, 1.0, 0.1) * smoothstep(0.4, 1.2, n2) * 0.12;
  vec3 cyanAura = vec3(0.05, 0.85, 0.95) * smoothstep(0.3, 1.1, n1) * 0.14;
  vec3 beam = vec3(0.7, 0.95, 0.2) * glow * 0.35;

  vec3 color = bg + limeAura + cyanAura + beam + vec3(gridLine * 0.3, gridLine * 0.8, gridLine * 0.9);
  float vig = 1.0 - length(uv - 0.5) * 0.85;
  color *= clamp(vig, 0.1, 1.0);

  gl_FragColor = vec4(color, 1.0);
}`;

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

export default function ShaderBackground({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl', { antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    gl.getExtension('OES_standard_derivatives');

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

    // The effect is soft by design, so 1x resolution keeps it cheap without visible loss.
    const syncSize = () => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    syncSize();
    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.x = ((event.clientX - rect.left) / rect.width) * canvas.width;
      mouse.y = (1 - (event.clientY - rect.top) / rect.height) * canvas.height;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const draw = (ms) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTime, ms * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let visible = true;

    const loop = (ms) => {
      draw(ms);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Only animate while the hero is on screen and the tab is visible.
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    const onVisibility = () => (document.hidden ? stop() : start());

    if (reducedMotion) {
      draw(0);
    } else {
      intersection.observe(canvas);
      document.addEventListener('visibilitychange', onVisibility);
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
