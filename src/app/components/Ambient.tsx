"use client";

import { useEffect, useRef } from "react";

export default function Ambient() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const variants = ["/assets/letter-front.png", "/assets/letter-back.png"];
    const isTouch = matchMedia("(hover: none)").matches;
    const isSmall = window.innerWidth < 720;
    const COUNT = isSmall ? 5 : 9;

    interface Letter {
      outer: HTMLDivElement;
      inner: HTMLDivElement;
      cx: number;
      cy: number;
      cr: number;
    }

    const letters: Letter[] = [];
    const createdElements: HTMLElement[] = [];

    for (let i = 0; i < COUNT; i++) {
      const outer = document.createElement("div");
      outer.className = "envelope";
      const inner = document.createElement("div");
      inner.className = "envelope-wind";
      const img = document.createElement("img");
      img.src = variants[i % 2];
      img.alt = "";
      inner.appendChild(img);
      outer.appendChild(inner);

      const left = Math.random() * 100;
      const dur = 34 + Math.random() * 28;
      const delay = -Math.random() * dur;
      const dx = Math.random() * 50 - 25;
      const r0 = Math.random() * 30 - 15;
      const r1 = r0 + (Math.random() * 40 - 20);
      const widthBase = isSmall ? 9 : 4;
      const widthRange = isSmall ? 5 : 3.5;
      const width = widthBase + Math.random() * widthRange;
      const op = isSmall
        ? 0.16 + Math.random() * 0.22
        : 0.18 + Math.random() * 0.28;

      outer.style.left = left + "vw";
      outer.style.width = width + "vw";
      outer.style.setProperty("--dx", dx + "vw");
      outer.style.setProperty("--r0", r0 + "deg");
      outer.style.setProperty("--r1", r1 + "deg");
      outer.style.setProperty("--op", String(op));
      outer.style.animationDuration = dur + "s";
      outer.style.animationDelay = delay + "s";
      layer.appendChild(outer);
      createdElements.push(outer);

      letters.push({ outer, inner, cx: 0, cy: 0, cr: 0 });
    }

    // Wind / wand effect (non-touch only)
    let animId = 0;
    if (!isTouch) {
      let mx = -9999,
        my = -9999;
      let pmx = mx,
        pmy = my;
      let vx = 0,
        vy = 0;
      let active = false;

      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        active = true;
      };
      const onLeave = () => {
        active = false;
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);

      const RADIUS = 240;
      const PUSH = 70;
      const SPIN = 18;

      function frame() {
        vx = vx * 0.7 + (mx - pmx) * 0.3;
        vy = vy * 0.7 + (my - pmy) * 0.3;
        pmx = mx;
        pmy = my;
        const speed = Math.min(1, Math.hypot(vx, vy) / 40);

        for (const L of letters) {
          let tx = 0,
            ty = 0,
            tr = 0;
          if (active) {
            const r = L.outer.getBoundingClientRect();
            const ex = r.left + r.width / 2;
            const ey = r.top + r.height / 2;
            const ddx = ex - mx,
              ddy = ey - my;
            const dist = Math.hypot(ddx, ddy);
            if (dist < RADIUS && dist > 0.1) {
              let f = 1 - dist / RADIUS;
              f = f * f * (3 - 2 * f);
              const strength = (0.4 + 0.6 * speed) * f;
              tx = (ddx / dist) * PUSH * strength;
              ty = (ddy / dist) * PUSH * strength;
              tr = (ddx / dist) * SPIN * strength;
            }
          }
          L.cx += (tx - L.cx) * 0.12;
          L.cy += (ty - L.cy) * 0.12;
          L.cr += (tr - L.cr) * 0.1;
          const eps = 0.05;
          if (Math.abs(L.cx) < eps) L.cx = 0;
          if (Math.abs(L.cy) < eps) L.cy = 0;
          if (Math.abs(L.cr) < eps) L.cr = 0;
          L.inner.style.setProperty("--wx", L.cx.toFixed(2) + "px");
          L.inner.style.setProperty("--wy", L.cy.toFixed(2) + "px");
          L.inner.style.setProperty("--wr", L.cr.toFixed(2) + "deg");
        }
        animId = requestAnimationFrame(frame);
      }
      animId = requestAnimationFrame(frame);
    }

    // Sparks
    const SPARKS = isSmall ? 12 : 22;
    for (let i = 0; i < SPARKS; i++) {
      const s = document.createElement("div");
      s.className = "spark";
      const left = Math.random() * 100;
      const dur = 8 + Math.random() * 12;
      const delay = -Math.random() * dur;
      s.style.left = left + "vw";
      s.style.setProperty("--sdx", (Math.random() * 40 - 20) + "vw");
      s.style.animationDuration = dur + "s";
      s.style.animationDelay = delay + "s";
      s.style.opacity = String(0.35 + Math.random() * 0.45);
      layer.appendChild(s);
      createdElements.push(s);
    }

    return () => {
      cancelAnimationFrame(animId);
      for (const el of createdElements) {
        el.remove();
      }
    };
  }, []);

  return <div className="ambient" ref={layerRef} />;
}
