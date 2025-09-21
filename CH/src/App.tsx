import React, { useState, useEffect, useRef} from "react";
import { motion, AnimatePresence } from "framer-motion";
import useWindowSize from "./useWindowSize";
import Pintoo from "../assets/images/Pintoo.svg";
import AtlanticOwl from "../assets/images/Atlantic Owl-2 1.png";
import EqyptianOwl from "../assets/images/Egyptian pintoo-2 2.png";
import PokemonOwl from "../assets/images/Pokemon owl-2 2.png";
import SpiderOwl from "../assets/images/spidermanpintoonew 1.png"
import Map from "../assets/images/Map Asset.png";
import "./App.css";

const ORDER = ["tl", "tr", "br", "bl"];

export default function App() {
      const buttonRef = useRef(null);
    const images = [AtlanticOwl, EqyptianOwl, PokemonOwl, SpiderOwl];
  const [size, setSize] = useState({ width: 0, height: 0 });

  // State to track which image is active
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through images every 4 seconds
  useEffect(() => {
      if (buttonRef.current) {
                  const rect = buttonRef.current.getBoundingClientRect();
                  setSize({ width: rect.width, height: rect.height });
                }
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { width, height } = useWindowSize();
  const pintooSize = (width >=400)?(Math.min(width, height) * 0.55):(Math.min(width, height)*0.8);
  const [step, setStep] = useState(0);
  const [radii, setRadii] = useState({ tl: 0, tr: 0, br: 0, bl: 0 });
  const [reveal, setReveal] = useState(false);

  const paraFontSize = (width <= 1000)?((width > height) ? height * 0.025 : width * 0.025)*1.5:((width > height) ? height * 0.025 : width * 0.025);
  const PARTIAL = (width <= 1000)?(((height > width) ? width * 0.32 : height * 0.5)*1.75):(((height > width) ? width * 0.32 : height * 0.5));
  const FULL = Math.max(width, height);
  const current = ORDER[step];

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

  const ARROW_TARGETS = (width >= 1000)?({
    tl: { x: -width / 2 + 1.25 * (width / 2) * 0.375, y: -height / 2 + (height / 2) * 0.375, rotate: -135 },
    tr: { x: -width / 2 + 3.75 * (width / 2) * 0.375, y: -height / 2 + (height / 2) * 0.375, rotate: -45 },
    br: { x: -width / 2 + 3.75 * (width / 2) * 0.375, y: -height / 2 + 3.75 * (height / 2) * 0.375, rotate: 45 },
    bl: { x: -width / 2 + 1.25 * (width / 2) * 0.375, y: -height / 2 + 3.75 * (height / 2) * 0.375, rotate: 135 },
  }):({
          tl: { x: -width / 2 + 2 * (width / 2) * 0.375, y: -height / 2 + (height / 2) * 0.4, rotate: -135 },
          tr: { x: -width / 2 + 3 * (width / 2) * 0.375, y: -height / 2 + (height / 2) * 0.4, rotate: -45 },
          br: { x: -width / 2 + 3 * (width / 2) * 0.375, y: -height / 2 + 3 * (height / 2) * 0.425, rotate: 45 },
          bl: { x: -width / 2 + 2 * (width / 2) * 0.375, y: -height / 2 + 3 * (height / 2) * 0.425, rotate: 135 },
        });

  return (
    <div className="app" style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <motion.div
        className="background"
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {/* Corner texts */}
        <motion.div
          className="masked-content"
          initial={{ opacity: 1 }}
          animate={{ opacity: reveal ? 0 : 1 }}
          transition={{ duration: 1 }}
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            gridTemplateColumns: "1fr 1fr",
            width: "100%",
            height: "100%",
            padding: 15,
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
            <p style={{ fontSize: paraFontSize }}>
              I do not die. I endure — an idea that outlives time.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
            <p style={{ textAlign: "right", fontSize: paraFontSize }}>
              You’ve always seen me… but you never knew my name.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end" }}>
            <p style={{ fontSize: paraFontSize }}>
              The ones who knew me still carry my aura within them.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <p style={{ textAlign: "right", fontSize: paraFontSize }}>
              I am the greatest hunt you will ever witness.
            </p>
          </div>
        </motion.div>

        {/* 🔹 Dashed map overlay (only after reveal) */}
{/* 🔹 Dashed map overlay (only after reveal) */}
{(reveal)?((width >= 1000)?(
  <motion.svg
    viewBox={`0 0 ${width} ${height}`}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1,
    }}
  >
    {/* Top-left curve */}
    <motion.path
      d={`M ${width * 0.1},${height * 0.15}
          C ${width * 0.18},${height * 0.05}
            ${width * 0.22},${height * 0.25}
            ${width * 0.25},${height * 0.05}`}
      stroke="rgba(255,255,255,0.9)"
      strokeWidth={3}
      strokeDasharray="12 8"
      fill="none"
      initial={{ strokeDashoffset: 200 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <circle cx={width * 0.1} cy={height * 0.15} r={10} fill="#F3ED99" />
    <circle cx={width * 0.25} cy={height*0.05} r={10} fill="#F3ED99" />

    {/* Top-right curve */}
    <motion.path
      d={`M ${width * 0.7},${height * 0.1}
          C ${width * 0.75},${height * 0.2}
            ${width * 0.85},${height * 0.25}
            ${width * 0.9},${height * 0.15}`}
      stroke="rgba(255,255,255,0.9)"
      strokeWidth={3}
      strokeDasharray="12 8"
      fill="none"
      initial={{ strokeDashoffset: 200 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 2.2, repeat: Infinity }}
    />
    <circle cx={width * 0.7} cy={height * 0.1} r={10} fill="#F3ED99" />
    <circle cx={width * 0.9} cy={height * 0.15} r={10} fill="#F3ED99" />

    {/* Bottom-left curve */}
    <motion.path
      d={`M ${width * 0.05},${height * 0.6}
          C ${width * 0.1},${height * 0.55}
            ${width * 0.2},${height * 0.85}
            ${width * 0.15},${height * 0.8}`}
      stroke="rgba(255,255,255,0.9)"
      strokeWidth={3}
      strokeDasharray="12 8"
      fill="none"
      initial={{ strokeDashoffset: 200 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 2.4, repeat: Infinity }}
    />
    <circle cx={width * 0.05} cy={height * 0.6} r={10} fill="#F3ED99" />
    <circle cx={width * 0.15} cy={height * 0.8} r={10} fill="#F3ED99" />

    {/* Bottom-right curve */}
    <motion.path
      d={`M ${width * 0.75},${height * 0.4}
          C ${width * 0.8},${height * 0.35}
            ${width * 0.85},${height * 0.55}
            ${width * 0.9},${height * 0.5}`}
      stroke="rgba(255,255,255,0.9)"
      strokeWidth={3}
      strokeDasharray="12 8"
      fill="none"
      initial={{ strokeDashoffset: 200 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 2.6, repeat: Infinity }}
    />
    <circle cx={width * 0.75} cy={height * 0.4} r={10} fill="#F3ED99" />
    <circle cx={width * 0.9} cy={height * 0.5} r={10} fill="#F3ED99" />
  </motion.svg>
):(
    <motion.svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        {/* Top-left curve */}
        <motion.path
          d={`M ${width * 0.05},${height * 0.1}
              C ${width * 0.12},${height * 0.05}
                ${width * 0.18},${height * 0.15}
                ${width * 0.1},${height * 0.025}`}
          stroke="rgba(255,255,255,0.9)"
          strokeWidth={3}
          strokeDasharray="12 8"
          fill="none"
          initial={{ strokeDashoffset: 200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <circle cx={width * 0.05} cy={height * 0.1} r={10} fill="#F3ED99" />
        <circle cx={width * 0.1} cy={height*0.025} r={10} fill="#F3ED99" />

        {/* Top-right curve */}
        <motion.path
          d={`M ${width * 0.7},${height * 0.25}
              C ${width * 0.75},${height * 0.2}
                ${width * 0.85},${height * 0.25}
                ${width * 0.9},${height * 0.18}`}
          stroke="rgba(255,255,255,0.9)"
          strokeWidth={3}
          strokeDasharray="12 8"
          fill="none"
          initial={{ strokeDashoffset: 200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <circle cx={width * 0.7} cy={height * 0.25} r={10} fill="#F3ED99" />
        <circle cx={width * 0.9} cy={height * 0.18} r={10} fill="#F3ED99" />

        {/* Bottom-left curve */}
        <motion.path
          d={`M ${width * 0.15},${height * 0.5}
              C ${width * 0},${height * 0.55}
                ${width * 0.2},${height * 0.9}
                ${width * 0.75},${height * 0.8}`}
          stroke="rgba(255,255,255,0.9)"
          strokeWidth={3}
          strokeDasharray="12 8"
          fill="none"
          initial={{ strokeDashoffset: 300 }}   // increase offset since it's longer
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <circle cx={width * 0.15} cy={height * 0.5} r={10} fill="#F3ED99" />
        <circle cx={width * 0.75} cy={height * 0.8} r={10} fill="#F3ED99" />

        {/* Bottom-right curve */}
        <motion.path
          d={`M ${width * 0.95},${height * 0.3}
              C ${width * 0.8},${height * 0.35}
                ${width * 0.85},${height * 0.55}
                ${width * 0.9},${height * 0.5}`}
          stroke="rgba(255,255,255,0.9)"
          strokeWidth={3}
          strokeDasharray="12 8"
          fill="none"
          initial={{ strokeDashoffset: 200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2.6, repeat: Infinity }}
        />
        <circle cx={width * 0.95} cy={height * 0.3} r={10} fill="#F3ED99" />
        <circle cx={width * 0.9} cy={height * 0.5} r={10} fill="#F3ED99" />
      </motion.svg>
      )
  ):null
}

        {/* Titles + Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: reveal ? 1 : 0 }}
          transition={{ duration: 1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 5,
            fontFamily: 'Geist'
          }}
        >
          <motion.h1
            style={{
              fontSize: (width >= 1000)?"9vw":"14vw",
              fontWeight: "bold",
              background: "linear-gradient(to right, #1E1E1E, #474747)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              marginBottom: "1rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: reveal ? 1 : 0 }}
            transition={{ duration: 1.2 }}
          >
            cryptic hunt
          </motion.h1>
          <motion.h1
            style={{
              fontSize: (width >= 1000)?"3vw":"7vw",
              fontWeight: "bold",
              color: "#F3ED99",
              textAlign: "center",
              marginBottom: "2rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: reveal ? 1 : 0 }}
            transition={{ duration: 1.4 }}
          >
            Expect the Unexpected
          </motion.h1>
          <motion.button
  whileHover={{ scale: 1.1, boxShadow: "0px 0px 25px rgba(243,237,153,0.9)" }}
  whileTap={{ scale: 0.95 }}
 onClick={() => window.location.href = "https://gravitas.vit.ac.in/events/3df08aa2-22c9-42ff-8640-de501218780f"}
  ref={buttonRef}
  style={{
    padding: "1rem 2.5rem",
    fontSize: (width > height)?(height*0.05):(width*0.05),
    fontWeight: "bold",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    background: "linear-gradient(90deg, #F3ED99, #FFD700, #F3ED99)",
    backgroundSize: "300% 300%",
    color: "#1E1E1E",
    textTransform: "uppercase",
    letterSpacing: "2px",
    marginTop: "0.25rem",
    marginBottom: "0.4rem",
    zIndex: 2,
    animation: "gradientMove 4s ease infinite",
  }}
>
  Register
</motion.button>
          {/* Background map layer */}
{reveal && (
  <img
    src={Map}
    alt="map"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 1, // just above gradient, below titles + Pintoo
    }}
  />
)}

{/* Pintoo image stays above */}
<motion.img
        src={images[currentIndex]}
        alt="Changing friend"
        style={{
          position: "absolute",
          bottom: ((height - pintooSize)<0)?(pintooSize*0.5):((pintooSize*0.5 + height/2 - pintooSize)),
          left: "45%",
          width: size.height,
          height: "auto",
           zIndex: 4,   // ✅ always on top
        }}
        animate={{
          x: [0, (size.width*0.6), (size.width*0.6), 0],
          y: [0, (-pintooSize*0.6), (-pintooSize * 0.6), 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

<motion.img
  src={Pintoo}
  alt="pintoo"
  initial={{ y: 200, opacity: 0, scale: 0.8 }}
  animate={{
    y: reveal ? 0 : 200,
    opacity: reveal ? 1 : 0,
    scale: reveal ? 1 : 0.8,
  }}
  transition={{ duration: 1.2, ease: "easeOut" }}
  style={{
    width: pintooSize,   // ✅ no curly braces inside
    height: pintooSize,
    zIndex: 5,
  }}
/>
        </motion.div>
      </motion.div>

      {/* Overlay (black first, reveals content with circles) */}
      {!reveal && (
        <motion.svg
          className="overlay-svg"
          viewBox={`0 0 ${width} ${height}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 20,
          }}
        >
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
        </motion.svg>
      )}

      {/* Arrow ➤ → Question mark ? */}
      <AnimatePresence>
        {!allDone && current && !reveal && (
            <>
          <motion.div
            key="arrow"
            className="arrow"
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={ARROW_TARGETS[current]}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            onClick={() => handleClick(current)}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "3rem",
              zIndex: 30,
              cursor: "pointer",
            }}
          >
            ➤
          </motion.div>
          <motion.div
                key="click-hint"
                initial={{ opacity: 0 }}
                animate={{
                  y: [0, -15, 0],      // bounce
                  opacity: 1,          // visible when active
                }}
                exit={{ opacity: 0 }}   // fade out when removed
                transition={{
                  y: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  opacity: {
                    duration: 0.8, // fade-out speed
                  },
                }}
                style={{
                  position: "absolute",
                  bottom: "50%",
                  left: "27.5%",
                  transform: "translateX(-50%)",
                  color: "#F3ED99",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  zIndex: 25,
                }}
              >
                Click on the arrow
              </motion.div>
              </>
        )}

        {allDone && !reveal && (
          <motion.div
            key="question"
            className="question"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 2,
              opacity: 1,
              y: [0, -15, 0],   // 👈 oscillation up & down
            }}
            exit={{ opacity: 0 }}
            transition={{
              scale: { duration: 0.8, ease: "easeOut" }, // pop in
              opacity: { duration: 0.8 },
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            style={{
              position: "absolute",
              top: height * 0.5 - width * 0.04,
              left: width * 0.5,
              transform: "translate(-50%, -50%)",
              fontSize: width * 0.08,
              fontWeight: "bold",
              color: "#F3ED99",
              cursor: "pointer",
              zIndex: 30,
            }}
            onClick={() => setReveal(true)}
          >
            ?
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}