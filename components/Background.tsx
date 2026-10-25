"use client";

import { useEffect, useRef } from "react";

// Pastel rainbow "smoke" that follows the pointer, then fades away.
// WebGL fragment shader: each recent pointer position leaves a soft blob,
// and a noise warp turns the blobs into swirling ribbons.

const MAX = 48; // max live trail points
const LIFE = 2800; // ms a trail point stays visible
const SPACING = 14; // px between interpolated points
const SCALE = 0.5; // render at half resolution (soft look, cheap on the GPU)

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform vec4 uTrail[${MAX}]; // x, y (0..1), strength, hue

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

vec3 palette(float t) {
  return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * asp, uv.y);

  vec2 q = vec2(
    fbm(p * 2.5 + uTime * 0.06),
    fbm(p * 2.5 + vec2(5.2, 1.3) - uTime * 0.05)
  );

  vec3 col = vec3(0.0);
  float a = 0.0;
  for (int i = 0; i < ${MAX}; i++) {
    vec4 t = uTrail[i];
    if (t.z > 0.0) {
      vec2 c = vec2(t.x * asp, t.y);
      vec2 d = p - c + (q - 0.5) * 0.22;
      float w = exp(-dot(d, d) * 90.0) * t.z;
      col += palette(t.w + q.x * 0.35) * w;
      a += w;
    }
  }

  float alpha = 1.0 - exp(-a * 0.9);
  vec3 ink = mix(col / max(a, 0.0001), vec3(1.0), 0.3);
  alpha *= 0.85;
  gl_FragColor = vec4(ink * alpha, alpha);
}
`;

type Point = { x: number; y: number; born: number; hue: number };

export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // One big triangle that covers the screen.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uTrail = gl.getUniformLocation(prog, "uTrail");

    let w = window.innerWidth;
    let h = window.innerHeight;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.max(1, Math.round(w * SCALE));
      canvas.height = Math.max(1, Math.round(h * SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const pts: Point[] = [];
    const data = new Float32Array(MAX * 4);
    let last: { x: number; y: number } | null = null;
    let hue = Math.random();
    let raf = 0;
    let running = false;

    const frame = (now: number) => {
      while (pts.length && now - pts[0].born > LIFE) pts.shift();

      if (pts.length === 0) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        running = false;
        return;
      }

      data.fill(0);
      pts.forEach((p, i) => {
        const age = (now - p.born) / LIFE;
        data[i * 4] = p.x;
        data[i * 4 + 1] = p.y;
        data[i * 4 + 2] = Math.pow(Math.max(0, 1 - age), 1.6);
        data[i * 4 + 3] = p.hue;
      });

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now / 1000) % 1000);
      gl.uniform4fv(uTrail, data);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const from = last ?? { x: e.clientX, y: e.clientY };
      const dist = Math.hypot(e.clientX - from.x, e.clientY - from.y);
      const steps = Math.max(1, Math.floor(dist / SPACING));

      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        hue += 0.012;
        pts.push({
          x: (from.x + (e.clientX - from.x) * t) / w,
          y: 1 - (from.y + (e.clientY - from.y) * t) / h,
          born: now,
          hue,
        });
        if (pts.length > MAX) pts.shift();
      }
      last = { x: e.clientX, y: e.clientY };

      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const onDown = () => {
      last = null; // don't draw a streak from the previous touch
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
