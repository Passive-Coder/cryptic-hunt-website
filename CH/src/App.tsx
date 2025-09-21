import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useWindowSize from "./useWindowSize";
import "./App.css";

const ORDER = ["tl", "tr", "br", "bl"];

export default function App() {
  const { width, height } = useWindowSize();
  const [step, setStep] = useState(0);
  const [radii, setRadii] = useState({ tl: 0, tr: 0, br: 0, bl: 0 });

  const PARTIAL = width * 0.25;
  const FULL = Math.max(width, height);
  const current = ORDER[step];

  // 🔹 Mouse tracking state
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [pupils, setPupils] = useState({
    left: { cx: 70, cy: 80 },
    right: { cx: 130, cy: 80 },
  });

  useEffect(() => {
    const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const leftEye = { x: 70, y: 80 };
  const rightEye = { x: 130, y: 80 };
  const maxOffset = 6;

  const mapToSvg = (pos, svgSize, viewBoxSize) =>
    (pos / svgSize) * viewBoxSize;

  const lerp = (a, b, t) => a + (b - a) * t;

  useEffect(() => {
    const mappedX = mapToSvg(mouse.x, width, 200);
    const mappedY = mapToSvg(mouse.y, height, 200);

    const dxHead = mappedX - 100;
    const dyHead = mappedY - 100;
    if (dxHead * dxHead + dyHead * dyHead <= 90 * 90) {
      setPupils({
        left: { cx: 70, cy: 80 },
        right: { cx: 130, cy: 80 },
      });
      return;
    }

    const updateEye = (eye, prev) => {
      const dx = mappedX - eye.x;
      const dy = mappedY - eye.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const factor = Math.min(1, maxOffset / dist);
      const targetX = eye.x + dx * factor;
      const targetY = eye.y + dy * factor;
      return {
        cx: lerp(prev.cx, targetX, 0.1),
        cy: lerp(prev.cy, targetY, 0.1),
      };
    };

    setPupils((prev) => ({
      left: updateEye(leftEye, prev.left),
      right: updateEye(rightEye, prev.right),
    }));
  }, [mouse, width, height]);

  const handleClick = (corner) => {
    if (radii[corner] > 0) return;
    setRadii((p) => ({ ...p, [corner]: PARTIAL }));
    setTimeout(() => setStep((s) => Math.min(s + 1, ORDER.length)), 650);
  };

  useEffect(() => {
    if (step === ORDER.length) {
      setTimeout(() => {
        setRadii({ tl: FULL, tr: FULL, br: FULL, bl: FULL });
      }, 400);
    }
  }, [step, FULL]);

  const allDone = step === ORDER.length;

  const ARROW_TARGETS = {
    tl: { x: -width / 2 + 120, y: -height / 2 + 90, rotate: -135 },
    tr: { x: width / 2 - 180, y: -height / 2 + 90, rotate: -45 },
    br: { x: width / 2 - 180, y: height / 2 - 180, rotate: 45 },
    bl: { x: -width / 2 + 120, y: height / 2 - 180, rotate: 135 },
  };

  return (
    <div className="app">
      <motion.div className="background">
        <div
          className="masked-content"
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            gridTemplateColumns: "1fr 1fr",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", padding: 15 }}>
            <p>I am not a mortal to die. I am an idea that never fades</p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start", padding: 15 }}>
            <p style={{ textAlign: "right" }}>People always see me but never knew my name</p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end", padding: 15 }}>
            <p>The ones who knew me still has my aura running inside them</p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", padding: 15 }}>
            <p style={{ textAlign: "right" }}>I am the greatest Hunt you can ever witness</p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 5,
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
              background: "linear-gradient(to right, #1E1E1E, #474747)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            cryptic hunt
          </h1>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#F3ED99",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Expect the Unexpected
          </h1>

          <svg viewBox="0 0 200 200" width={500} height={500}>
            <circle cx="100" cy="100" r="90" fill="#f4d19b" />
            <circle cx="70" cy="80" r="20" fill="white" />
            <circle cx={pupils.left.cx} cy={pupils.left.cy} r="8" fill="black" />
            <circle cx="130" cy="80" r="20" fill="white" />
            <circle cx={pupils.right.cx} cy={pupils.right.cy} r="8" fill="black" />
          </svg>
        </div>
      </motion.div>

      {/* The masked overlay */}
      <svg className="overlay-svg" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <mask id="mask">
            <rect x="0" y="0" width={width} height={height} fill="white" />
            <motion.circle cx="0" cy="0" fill="black" animate={{ r: radii.tl }} />
            <motion.circle cx={width} cy="0" fill="black" animate={{ r: radii.tr }} />
            <motion.circle cx={width} cy={height} fill="black" animate={{ r: radii.br }} />
            <motion.circle cx="0" cy={height} fill="black" animate={{ r: radii.bl }} />
          </mask>
        </defs>
        <rect x="0" y="0" width={width} height={height} fill="black" mask="url(#mask)" />
      </svg>

      {!allDone && current && (
        <motion.div
          className="arrow"
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={ARROW_TARGETS[current]}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          onClick={() => handleClick(current)}
        >
          ➤
        </motion.div>
      )}
    </div>
  );
}