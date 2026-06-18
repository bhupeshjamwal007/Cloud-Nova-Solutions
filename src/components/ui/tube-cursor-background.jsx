'use client';
import { useEffect, useRef } from "react";

const TubesCursorBackground = ({
  initialColors = ["#0D6EFD", "#0dcaf0", "#ffffff"],
  lightColors = ["#ffffff", "#0D6EFD", "#0dcaf0"],
  lightIntensity = 200,
  enableRandomizeOnClick = false,
}) => {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    let removeClick = null;
    let destroyed = false;

    (async () => {
      const mod = await import(
        /* webpackIgnore: true */
        "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
      );
      const TubesCursorCtor = mod.default ?? mod;

      if (!canvasRef.current || destroyed) return;

      const app = TubesCursorCtor(canvasRef.current, {
        tubes: {
          colors: initialColors,
          lights: {
            intensity: lightIntensity,
            colors: lightColors,
          },
        },
      });

      appRef.current = app;

      if (enableRandomizeOnClick) {
        const handler = () => {
          const colors = randomColors(initialColors.length);
          const lights = randomColors(lightColors.length);
          app.tubes.setColors(colors);
          app.tubes.setLightsColors(lights);
        };
        // Bind to canvas to prevent full-page click hijacking
        canvasRef.current.addEventListener("click", handler);
        removeClick = () => {
          if (canvasRef.current) {
            canvasRef.current.removeEventListener("click", handler);
          }
        };
      }
    })();

    return () => {
      destroyed = true;
      if (removeClick) removeClick();
      try {
        appRef.current?.dispose?.();
        appRef.current = null;
      } catch {
        // ignore
      }
    };
  }, [initialColors, lightColors, lightIntensity, enableRandomizeOnClick]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'auto'
      }}
    />
  );
};

function randomColors(count) {
  return new Array(count).fill(0).map(
    () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
  );
}

export default TubesCursorBackground;
