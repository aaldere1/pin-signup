"use client";

import { useState, useEffect, useRef, useMemo } from "react";

export default function Pin() {
  const [face, setFace] = useState<"front" | "back">("front");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (!hoverRef.current) setFace((f) => (f === "front" ? "back" : "front"));
    }, 6500);
    return () => clearInterval(t);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const r = stageRef.current!.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const nx = (e.clientX - cx) / r.width;
    const ny = (e.clientY - cy) / r.height;
    setTilt({ x: -ny * 14, y: nx * 18 });
  };

  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
    hoverRef.current = false;
  };

  const baseRotate = face === "back" ? 180 : 0;
  const transform = `rotateX(${tilt.x}deg) rotateY(${baseRotate + tilt.y}deg)`;

  const rays = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 48; i++) {
      const angle = (i / 48) * 360;
      const len = i % 3 === 0 ? 47 : i % 2 === 0 ? 43 : 40;
      lines.push(
        <line
          key={i}
          x1="50"
          y1="50"
          x2={50 + Math.cos((angle * Math.PI) / 180) * len}
          y2={50 + Math.sin((angle * Math.PI) / 180) * len}
          stroke="url(#rg)"
          strokeWidth={i % 3 === 0 ? 0.18 : 0.1}
        />
      );
    }
    return lines;
  }, []);

  return (
    <div
      className="pin-col"
      ref={stageRef}
      onMouseMove={onMove}
      onMouseEnter={() => { hoverRef.current = true; }}
      onMouseLeave={onLeave}
    >
      <svg className="pin-rays" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <radialGradient id="rg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E09028" stopOpacity={0} />
            <stop offset="40%" stopColor="#E09028" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#E09028" stopOpacity={0} />
          </radialGradient>
        </defs>
        {rays}
      </svg>
      <div className="pin-aura" />
      <div
        className="pin-3d"
        style={{ transform }}
        onClick={() => setFace((f) => (f === "front" ? "back" : "front"))}
        role="button"
        aria-label={`Flip pin — showing ${face}`}
      >
        <div className="pin-face front">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/pin-front.png" alt="Harry Potter collector pin — front" />
        </div>
        <div className="pin-face back">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/pin-back.png" alt="Harry Potter collector pin — back, stamped 925 silver" />
        </div>
      </div>
      <div className="pin-caption">
        <span className="face-pill">
          <span className={face === "front" ? "on" : ""}>Obverse</span>
          <span className="sep">·</span>
          <span className={face === "back" ? "on" : ""}>Reverse</span>
        </span>
        <span>Tap to flip</span>
      </div>
    </div>
  );
}
