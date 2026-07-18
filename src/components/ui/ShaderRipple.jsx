'use client';

import React, { useRef, useEffect } from 'react';

export default function ShaderRipple({ ...props }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Enable Alpha Blending for transparent background rendering
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      
      mat2 rotate2d(float angle) {
        float c = cos(angle);
        float s = sin(angle);
        return mat2(c, -s, s, c);
      }
      
      float variation(vec2 v1, vec2 v2, float strength, float speed) {
        return sin(dot(normalize(v1), normalize(v2)) * strength + iTime * speed) / 100.0;
      }
      
      vec3 paintCircle(vec2 uv, vec2 center, float rad, float width) {
        vec2 diff = center - uv;
        float len = length(diff);
        len += variation(diff, vec2(0.0, 1.0), 5.0, 2.0);
        len -= variation(diff, vec2(1.0, 0.0), 5.0, 2.0);
        float circle = smoothstep(rad - width, rad, len) - smoothstep(rad, rad + width, len);
        return vec3(circle);
      }
      
      // HSV to RGB converter
      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }
      
      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        float aspect = iResolution.x / iResolution.y;
        uv.x *= aspect;
        uv.x -= (aspect - 1.0) * 0.5;
        
        vec2 center = vec2(0.5);
        vec2 diff = center - uv;
        float len = length(diff);
        
        // Soft glowing filled circular disk in the center
        float centerGlow = smoothstep(0.45, 0.0, len);
        
        // Concentric ripple rings
        float mask = 0.0;
        float radius = 0.42;
        mask += paintCircle(uv, center, radius, 0.035).r;
        mask += paintCircle(uv, center, radius - 0.018, 0.01).r;
        mask += paintCircle(uv, center, radius + 0.018, 0.005).r;
        
        // Rainbow Hue Cycle (dynamic over time and spatial coordinates)
        // Adjusting speed (0.12) and spatial spread (len * 0.4) for a gorgeous radial rainbow cycle
        float hue = fract(iTime * 0.12 - len * 0.4);
        vec3 colorCycle = hsv2rgb(vec3(hue, 0.85, 1.0));
        
        // White highlight ring in the middle
        float whiteRing = paintCircle(uv, center, radius, 0.003).r;
        vec3 finalColor = mix(colorCycle, vec3(1.0, 1.0, 1.0), whiteRing);
        
        // Blend the ripple rings and the soft center color-changing disk
        float finalMask = (mask + whiteRing) * 0.4 + centerGlow * 0.25;
        
        gl_FragColor = vec4(finalColor, finalMask);
      }
    `;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Could not create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Shader compilation error");
      }
      return shader;
    };

    let program;
    try {
      program = gl.createProgram();
      if (!program) throw new Error("Could not create program");
      const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);
    } catch (e) {
      console.error(e);
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, 'iTime');
    const iResLoc = gl.getUniformLocation(program, 'iResolution');

    let animationFrameId;
    const render = (time) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(iTimeLoc, time * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none block z-0"
      style={{
        width: '180%',
        height: '180%',
        top: '-40%',
        left: '-40%',
      }}
      {...props}
    />
  );
}
