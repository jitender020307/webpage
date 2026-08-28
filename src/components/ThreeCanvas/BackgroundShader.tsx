import { useEffect, useRef } from 'react';

interface BackgroundShaderProps {
  isDarkMode?: boolean;
}

export default function BackgroundShader({ isDarkMode = true }: BackgroundShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    syncSize();
    window.addEventListener('resize', syncSize);

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const darkFs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
        vec2 st = v_texCoord;
        
        // Deep obsidian / justice midnight
        vec3 color = vec3(0.035, 0.051, 0.071); 
        
        // Grid system
        vec2 grid = fract(st * 40.0);
        float line = step(0.975, grid.x) + step(0.975, grid.y);
        color += line * 0.016 * vec3(0.063, 0.725, 0.506);
        
        // Gentle wave
        float wave = smoothstep(0.45, 0.5, sin(st.y * 10.0 + u_time * 1.2));
        color += wave * 0.012 * vec3(0.063, 0.725, 0.506);
        
        // Mouse glow
        vec2 mouseNorm = u_mouse / u_resolution;
        float dist = distance(st, mouseNorm);
        float mouseGlow = smoothstep(0.4, 0.0, dist);
        color += mouseGlow * 0.03 * vec3(0.063, 0.725, 0.506);

        // Subtle ambient atmosphere
        float glow = 1.0 - smoothstep(0.0, 0.8, st.y);
        color += glow * 0.04 * vec3(0.024, 0.714, 0.831);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const lightFs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
        vec2 st = v_texCoord;
        
        // High-tech sterile slate
        vec3 color = vec3(0.965, 0.975, 0.99); 
        
        // Crisp grid lines
        vec2 grid = fract(st * 36.0);
        float line = step(0.965, grid.x) + step(0.965, grid.y);
        color -= line * 0.045 * vec3(0.2, 0.4, 0.6);
        
        // Subtle scanline
        float scanline = smoothstep(0.45, 0.5, sin(st.y * 12.0 + u_time * 1.5));
        color -= scanline * 0.015 * vec3(0.0, 0.5, 0.8);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function compileShader(type: number, src: string) {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vShader = compileShader(gl.VERTEX_SHADER, vs);
    const fShader = compileShader(gl.FRAGMENT_SHADER, isDarkMode ? darkFs : lightFs);

    if (!vShader || !fShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = canvas.height - event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    function render(t: number) {
      if (!gl || !canvas) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', syncSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-screen"
    />
  );
}
