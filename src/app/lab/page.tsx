"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import posthog from "posthog-js";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

/* ──────────────────────────────────────────────────
   Lab — weekly experiments in AI-native interaction
   Every demo is live code. Every parameter is labeled.
   Every animation must argue for its existence.
   ────────────────────────────────────────────────── */

function ParamChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-[family-name:var(--font-geist-mono)] px-2 py-[3px] bg-[#f1f1f1] rounded text-[#444441]">
      {children}
    </span>
  );
}

function LabCard({
  number,
  date,
  category,
  title,
  why,
  removed,
  params,
  onExpand,
  children,
}: {
  number: string;
  date: string;
  category: string;
  title: string;
  why: string;
  removed: string;
  params: string[];
  onExpand?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={onExpand}
      className={`border border-gray-200 rounded-lg overflow-hidden bg-white ${
        onExpand ? "cursor-pointer hover:border-[#00bc7d] transition-colors" : ""
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-[240px] bg-[#fafafa] relative flex items-center justify-center overflow-hidden cursor-default"
      >
        <span className="absolute top-2 right-3 text-[11px] text-[#b4b2a9] font-[family-name:var(--font-geist-mono)]">
          live demo
        </span>
        {children}
      </div>
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[11px] text-[#b4b2a9] font-[family-name:var(--font-geist-mono)]">
            {number} · {date}
          </p>
          <span className="text-[11px] text-[#00915f] bg-[#e6f7f0] px-2 py-[2px] rounded-full">
            {category}
          </span>
        </div>
        <h3 className="text-[15px] font-semibold text-gray-900 mb-1.5">{title}</h3>
        <p className="text-[13px] text-[#5f5e5a] leading-relaxed mb-3">
          <span className="text-[#00915f] font-semibold">Why: </span>
          {why}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {params.map((p) => (
            <ParamChip key={p}>{p}</ParamChip>
          ))}
        </div>
        <p className="text-[12px] text-[#b4b2a9] leading-relaxed">
          <span className="font-semibold">Removed:</span> {removed}
        </p>
      </div>
    </div>
  );
}

/* ── 001 · Spatial relationship ─────────────────── */

function SpatialDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen(!open);
          posthog.capture("lab_demo_interacted", { demo: "spatial" });
        }}
        className="px-4 py-2 text-[13px] bg-white border border-gray-300 rounded-md hover:border-[#00bc7d] transition-colors flex items-center gap-1.5"
      >
        Options
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              scale: { duration: 0.2, ease: [0.32, 0.72, 0, 1] },
              opacity: { duration: 0.15, ease: "easeOut" },
            }}
            style={{ transformOrigin: "top left" }}
            className="absolute top-11 left-0 w-40 bg-white border border-gray-200 rounded-lg p-1.5 shadow-sm z-10"
          >
            {["Rename", "Duplicate"].map((item) => (
              <div
                key={item}
                className="text-[13px] px-2.5 py-1.5 rounded hover:bg-gray-50 cursor-default"
              >
                {item}
              </div>
            ))}
            <div className="text-[13px] px-2.5 py-1.5 rounded hover:bg-red-50 text-red-600 cursor-default">
              Delete
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── 002 · Causality ────────────────────────────── */

function CausalityDemo() {
  const [count, setCount] = useState(0);
  const [flightKey, setFlightKey] = useState(0);
  const [flying, setFlying] = useState(false);
  const zoneRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  const fire = () => {
    if (flying || !zoneRef.current || !btnRef.current || !badgeRef.current) return;
    const from = btnRef.current.getBoundingClientRect();
    const to = badgeRef.current.getBoundingClientRect();
    setDelta({
      x: to.left + to.width / 2 - (from.left + from.width / 2),
      y: to.top + to.height / 2 - (from.top + from.height / 2),
    });
    setFlying(true);
    setFlightKey((k) => k + 1);
    posthog.capture("lab_demo_interacted", { demo: "causality" });
    setTimeout(() => {
      setCount((c) => c + 1);
      setFlying(false);
    }, 400);
  };

  return (
    <div ref={zoneRef} className="relative flex items-center gap-16">
      <button
        ref={btnRef}
        onClick={fire}
        className="px-4 py-2 text-[13px] bg-white border border-gray-300 rounded-md hover:border-[#00bc7d] transition-colors"
      >
        Add to cart
      </button>
      <div className="relative p-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#444441"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <motion.span
          ref={badgeRef}
          key={count}
          initial={{ scale: count > 0 ? 1.4 : 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-[#00bc7d] text-white text-[11px] flex items-center justify-center px-1"
        >
          {count}
        </motion.span>
      </div>
      {flying && (
        <motion.div
          key={flightKey}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{ x: delta.x, y: delta.y, scale: 0.4, opacity: 0 }}
          transition={{
            x: { duration: 0.4, ease: "easeIn" },
            y: { duration: 0.4, ease: "easeIn" },
            scale: { duration: 0.4 },
            opacity: { duration: 0.1, delay: 0.35 },
          }}
          className="absolute left-8 top-1/2 w-3.5 h-3.5 rounded-full bg-[#00bc7d] pointer-events-none"
        />
      )}
    </div>
  );
}

/* ── 003 · State change ─────────────────────────── */

function StateDemo() {
  const [on, setOn] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");

  const save = () => {
    if (saveState !== "idle") return;
    posthog.capture("lab_demo_interacted", { demo: "state" });
    setSaveState("saving");
    setTimeout(() => setSaveState("saved"), 1100);
    setTimeout(() => setSaveState("idle"), 2300);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        role="switch"
        aria-checked={on}
        onClick={() => {
          setOn(!on);
          posthog.capture("lab_demo_interacted", { demo: "state" });
        }}
        className="w-12 h-7 rounded-full relative transition-colors duration-200"
        style={{ backgroundColor: on ? "#00bc7d" : "#d4d4d4" }}
      >
        <motion.div
          className="absolute top-[3px] left-[3px] w-[22px] h-[22px] rounded-full bg-white shadow-sm"
          animate={{ x: on ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </button>
      <button
        onClick={save}
        className="px-4 py-2 text-[13px] bg-white border border-gray-300 rounded-md hover:border-[#00bc7d] transition-colors min-w-[110px] flex items-center justify-center gap-1.5"
      >
        <AnimatePresence mode="wait">
          {saveState === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              Save
            </motion.span>
          )}
          {saveState === "saving" && (
            <motion.span
              key="saving"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex items-center gap-1.5"
            >
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00915f"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
              >
                <path d="M21 12a9 9 0 1 1-6.2-8.56" />
              </motion.svg>
              Saving
            </motion.span>
          )}
          {saveState === "saved" && (
            <motion.span
              key="saved"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex items-center gap-1.5 text-[#00915f]"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Saved
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

/* ── 004 · Decoration ───────────────────────────── */

type Particle = {
  id: number;
  angle: number;
  dist: number;
  color: string;
  round: boolean;
  delay: number;
};

function DecorationDemo() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const colors = ["#00bc7d", "#378add", "#ef9f27", "#d4537e"];

  const celebrate = () => {
    posthog.capture("lab_demo_interacted", { demo: "decoration" });
    const batch: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      angle: Math.random() * Math.PI * 2,
      dist: 50 + Math.random() * 50,
      color: colors[i % 4],
      round: Math.random() > 0.5,
      delay: Math.random() * 0.1,
    }));
    setParticles(batch);
    setTimeout(() => setParticles([]), 900);
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={celebrate}
        className="px-4 py-2 text-[13px] bg-white border border-gray-300 rounded-md hover:border-[#00bc7d] transition-colors"
      >
        Complete task
      </button>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: Math.cos(p.angle) * p.dist,
            y: Math.sin(p.angle) * p.dist - 20,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 0.6, ease: "easeOut", delay: p.delay }}
          className="absolute w-[7px] h-[7px] pointer-events-none"
          style={{
            backgroundColor: p.color,
            borderRadius: p.round ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

/* ── 005 · Dish ordering — the lazy Susan ───────── */

const menu = [
  {
    category: "Appetizer",
    items: [
      { id: "dumpling", emoji: "🥟", name: "Dumplings", price: 8 },
      { id: "spring-roll", emoji: "🥠", name: "Spring rolls", price: 6 },
      { id: "salad", emoji: "🥗", name: "House salad", price: 7 },
      { id: "soup", emoji: "🍜", name: "Wonton soup", price: 9 },
      { id: "edamame", emoji: "🫛", name: "Edamame", price: 5 },
    ],
  },
  {
    category: "Main",
    items: [
      { id: "noodles", emoji: "🍝", name: "Dan dan noodles", price: 14 },
      { id: "rice", emoji: "🍛", name: "Curry rice", price: 13 },
      { id: "fish", emoji: "🐟", name: "Steamed fish", price: 18 },
      { id: "hotpot", emoji: "🍲", name: "Hot pot", price: 22 },
      { id: "bento", emoji: "🍱", name: "Bento", price: 16 },
    ],
  },
  {
    category: "Side",
    items: [
      { id: "bok-choy", emoji: "🥬", name: "Bok choy", price: 6 },
      { id: "eggplant", emoji: "🍆", name: "Eggplant", price: 7 },
      { id: "tofu", emoji: "🧈", name: "Mapo tofu", price: 8 },
      { id: "corn", emoji: "🌽", name: "Grilled corn", price: 5 },
      { id: "mushroom", emoji: "🍄", name: "Mushrooms", price: 7 },
    ],
  },
  {
    category: "Dessert",
    items: [
      { id: "mochi", emoji: "🍡", name: "Mochi", price: 6 },
      { id: "icecream", emoji: "🍨", name: "Ice cream", price: 5 },
      { id: "cake", emoji: "🍰", name: "Mango cake", price: 7 },
      { id: "pudding", emoji: "🍮", name: "Egg pudding", price: 6 },
      { id: "tea", emoji: "🧋", name: "Boba tea", price: 6 },
    ],
  },
];

function RollingNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  return (
    <span className="relative inline-flex overflow-hidden h-[18px] items-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="inline-block tabular-nums"
        >
          {prefix}
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Wheel({
  category,
  items,
  onAdd,
  onOpenList,
  index,
  big = false,
}: {
  category: string;
  items: { id: string; emoji: string; name: string; price: number }[];
  onAdd: (id: string) => void;
  onOpenList: () => void;
  index: number;
  big?: boolean;
}) {
  const [offset, setOffset] = useState(0);
  const hoverRef = useRef(false);
  const n = items.length;
  const centerIdx = ((offset % n) + n) % n;
  const center = items[centerIdx];

  useEffect(() => {
    let tick: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      tick = setInterval(() => {
        if (!hoverRef.current) setOffset((o) => o + 1);
      }, 3200);
    }, index * 800);
    return () => {
      clearTimeout(start);
      if (tick) clearInterval(tick);
    };
  }, [index]);

  const slotFor = (i: number) => {
    let d = (((i - offset) % n) + n) % n;
    if (d > n / 2) d -= n;
    return d;
  };

  const spacing = big ? 104 : 68;
  const itemBox = big ? 48 : 36;

  return (
    <div
      className="flex items-center gap-2 w-full"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <span
        className={`${
          big ? "text-[12px] w-[68px]" : "text-[10px] w-[52px]"
        } text-[#888780] text-right shrink-0 font-[family-name:var(--font-geist-mono)]`}
      >
        {category}
      </span>
      <div className={`relative flex-1 overflow-hidden ${big ? "h-[64px]" : "h-[44px]"}`}>
        {items.map((item, i) => {
          const slot = slotFor(i);
          const visible = Math.abs(slot) <= 1;
          return (
            <motion.button
              key={item.id}
              onClick={() => onAdd(item.id)}
              whileTap={{ scale: 0.85 }}
              aria-label={`Add ${item.name}, $${item.price}`}
              animate={{
                x: slot * spacing,
                scale: slot === 0 ? (big ? 1.25 : 1.15) : 0.8,
                opacity: visible ? (slot === 0 ? 1 : 0.45) : 0,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              className={`absolute left-1/2 top-1/2 flex items-center justify-center cursor-pointer ${
                big ? "text-[30px]" : "text-[22px]"
              }`}
              style={{
                width: itemBox,
                height: itemBox,
                marginLeft: -itemBox / 2,
                marginTop: -itemBox / 2,
                zIndex: 10 - Math.abs(slot),
                pointerEvents: visible ? "auto" : "none",
              }}
            >
              {item.emoji}
            </motion.button>
          );
        })}
      </div>
      <span
        className={`${
          big ? "text-[12px] w-[104px]" : "text-[10px] w-[64px]"
        } text-[#5f5e5a] shrink-0 truncate`}
      >
        {center.name} ${center.price}
      </span>
      <button
        onClick={onOpenList}
        aria-label={`View ${category} as list`}
        className={`shrink-0 text-[#b4b2a9] hover:text-[#00915f] transition-colors flex items-center justify-center ${
          big ? "w-7 h-7" : "w-5 h-5"
        }`}
      >
        <svg
          width={big ? 16 : 13}
          height={big ? 16 : 13}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
}

function OrderingDemo({ ipad = false }: { ipad?: boolean }) {
  const [order, setOrder] = useState<Record<string, number>>({});
  const [listCategory, setListCategory] = useState<string | null>(null);
  const count = Object.values(order).reduce((a, b) => a + b, 0);

  const add = (id: string) => {
    setOrder((o) => ({ ...o, [id]: (o[id] || 0) + 1 }));
    posthog.capture("lab_demo_interacted", { demo: "lazy_susan" });
  };

  const listCat = menu.find((c) => c.category === listCategory);

  return (
    <div
      className={`w-full flex flex-col relative h-full ${
        ipad
          ? "max-w-[560px] gap-3 justify-center pb-16 px-4"
          : "max-w-[300px] gap-1 justify-start pt-3 pb-12 px-1"
      }`}
    >
      {ipad && (
        <div className="text-center mb-2">
          <p className="text-[13px] font-semibold text-gray-900">Golden Susan</p>
          <p className="text-[11px] text-[#888780]">
            Table 12 · dishes drift by, tap to add · open the list for a closer look
          </p>
        </div>
      )}
      {menu.map((cat, i) => (
        <Wheel
          key={cat.category}
          category={cat.category}
          items={cat.items}
          onAdd={add}
          onOpenList={() => {
            setListCategory(cat.category);
            posthog.capture("lab_demo_interacted", { demo: "lazy_susan_list" });
          }}
          index={i}
          big={ipad}
        />
      ))}
      <AnimatePresence>
        {listCat && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%", transition: { duration: 0.2, ease: "easeIn" } }}
            transition={{ type: "spring", stiffness: 400, damping: 34 }}
            className="absolute inset-0 bg-white z-20 flex flex-col rounded-t-xl border-t border-gray-200"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 shrink-0">
              <p className={`font-semibold text-gray-900 ${ipad ? "text-[14px]" : "text-[12px]"}`}>
                {listCat.category}
              </p>
              <button
                onClick={() => setListCategory(null)}
                aria-label="Back to wheels"
                className="text-[11px] text-[#00915f] hover:underline"
              >
                Back to table
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-1">
              {listCat.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={ipad ? "text-[24px]" : "text-[18px]"}>{item.emoji}</span>
                    <div>
                      <p className={`text-gray-900 ${ipad ? "text-[13px]" : "text-[11px]"}`}>
                        {item.name}
                      </p>
                      <p className={`text-[#888780] ${ipad ? "text-[11px]" : "text-[10px]"}`}>
                        ${item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {(order[item.id] || 0) > 0 && (
                      <span className="text-[11px] font-semibold text-[#00915f]">
                        ×{order[item.id]}
                      </span>
                    )}
                    <button
                      onClick={() => add(item.id)}
                      aria-label={`Add ${item.name}`}
                      className={`rounded-full border border-gray-300 text-[#00915f] hover:border-[#00bc7d] hover:bg-[#e6f7f0] transition-colors flex items-center justify-center leading-none ${
                        ipad ? "w-7 h-7 text-[15px]" : "w-6 h-6 text-[13px]"
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 48, opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`absolute z-30 bg-gray-900 text-white rounded-full flex items-center justify-between cursor-default ${
              ipad ? "bottom-4 left-6 right-6 px-5 py-3" : "bottom-2 left-2 right-2 px-4 py-2"
            }`}
          >
            <span className={`flex items-center gap-1 ${ipad ? "text-[13px]" : "text-[12px]"}`}>
              <RollingNumber value={count} /> {count === 1 ? "dish" : "dishes"}
            </span>
            <span className={`font-semibold ${ipad ? "text-[14px]" : "text-[13px]"}`}>
              Check out →
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Page ───────────────────────────────────────── */

const categories = ["All", "Motion design", "Interaction design"] as const;
type Category = (typeof categories)[number];

const experiments = [
  {
    number: "001",
    date: "Jul 2026",
    category: "Interaction design" as Category,
    title: "Spatial relationship",
    why: "A menu should grow from its trigger, so the user always knows where it lives and where it will return.",
    removed:
      "the menu teleports in from nowhere — no anchor, no mental map.",
    params: ["scale 0.9→1", "cubic-bezier(0.32, 0.72, 0, 1)", "200ms in · 150ms out", "origin: trigger"],
    demo: <SpatialDemo />,
  },
  {
    number: "002",
    date: "Jul 2026",
    category: "Motion design" as Category,
    title: "Causality",
    why: "The item flies to the cart before the count changes. Motion connects the action to its consequence — in that order.",
    removed: "the number changes mysteriously and the cause is invisible.",
    params: ["translate + arc", "ease-in flight", "400ms flight → 200ms pop", "strict sequence"],
    demo: <CausalityDemo />,
  },
  {
    number: "003",
    date: "Jul 2026",
    category: "Interaction design" as Category,
    title: "State change",
    why: "The knob travels and the color shifts together, so one state reads as one event. The save button narrates its own lifecycle.",
    removed: "a binary jump — easy to miss that anything happened at all.",
    params: ["spring 500/28", "200ms color", "exit faster than enter", "interruptible"],
    demo: <StateDemo />,
  },
  {
    number: "004",
    date: "Jul 2026",
    category: "Motion design" as Category,
    title: "Decoration",
    why: "Confetti communicates nothing — and that is the definition of decoration. It earns its place only at moments of real accomplishment, fires once, and never loops.",
    removed: "nothing breaks. Decoration must know it is decoration.",
    params: ["12 particles", "ease-out", "600ms · stagger 0–100ms", "fires once"],
    demo: <DecorationDemo />,
  },
  {
    number: "005",
    date: "Jul 2026",
    category: "Interaction design" as Category,
    title: "The lazy Susan",
    why: "Ordering for a table is browsing, not searching. Each course drifts by like a slow conveyor — tap a dish the moment it tempts you. When you need certainty instead of serendipity, flip that course into a plain list. Fast path and careful path, same menu.",
    removed:
      "auto-motion with no list escape becomes a menu that performs instead of serves.",
    params: ["3 visible per tunnel", "auto-roll 3.2s · stagger 800ms", "gentle spring 120/22", "hover pauses", "list = detail mode"],
    demo: <OrderingDemo />,
  },
];

export default function LabPage() {
  const scrollRef = useSmoothScroll<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [expandedNumber, setExpandedNumber] = useState<string | null>(null);

  const newestFirst = [...experiments].reverse();
  const filtered =
    activeCategory === "All"
      ? newestFirst
      : newestFirst.filter((e) => e.category === activeCategory);

  const expanded = experiments.find((e) => e.number === expandedNumber);

  useEffect(() => {
    if (!expandedNumber) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedNumber(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedNumber]);

  const openExperiment = (number: string) => {
    setExpandedNumber(number);
    posthog.capture("lab_card_expanded", { experiment: number });
  };

  return (
    <div ref={scrollRef} className="h-screen overflow-y-auto w-full bg-white flex flex-col">
      <div className="sticky top-0 z-20 flex items-center justify-between p-4 md:p-6 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <Link href="/">
          <motion.button
            className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 hover:border-[#00bc7d] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go back to home"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00bc7d"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 14L4 9l5-5" />
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
            </svg>
          </motion.button>
        </Link>
        <h1 className="text-lg md:text-xl font-bold text-gray-800 tracking-wide font-[family-name:var(--font-tinos)]">
          Visual Lab
        </h1>
        <div className="w-10 md:w-12" />
      </div>

      <div className="bg-graph-paper border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-14">
          <p className="text-[11px] font-bold text-[#00915f] tracking-[3px] font-[family-name:var(--font-geist-mono)] mb-2">
            MANIFEST → BUILD → SHIP
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-tinos)]">
            Weekly experiments in AI-native interaction
          </h2>
          <p className="text-[14px] text-[#5f5e5a] max-w-md leading-relaxed">
            Every demo is live code. Every parameter is labeled. Every
            animation must argue for its existence.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-6 py-8">
        <div className="flex items-center gap-6 mb-8 border-b border-gray-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                posthog.capture("lab_filter_changed", { category: cat });
              }}
              className={`relative pb-3 text-[14px] transition-colors ${
                activeCategory === cat
                  ? "text-gray-900 font-semibold"
                  : "text-[#9ca3af] hover:text-[#5f5e5a]"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="lab-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((exp) => (
            <LabCard
              key={exp.number}
              {...exp}
              onExpand={() => openExperiment(exp.number)}
            >
              {exp.demo}
            </LabCard>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-10 pt-5 pb-10 flex items-center justify-between">
          <span className="text-[13px] text-[#888780]">
            New experiment every week
          </span>
          <a
            href="https://www.linkedin.com/in/katherinexu99"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[#00915f] hover:underline"
          >
            Follow along on LinkedIn →
          </a>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setExpandedNumber(null)}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`${expanded.title} experiment detail`}
          >
            {expanded.number === "005" ? (
              <motion.div
                initial={{ scale: 0.95, y: 16, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{
                  scale: 0.97,
                  y: 8,
                  opacity: 0,
                  transition: { duration: 0.15, ease: "easeIn" },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl"
              >
                <button
                  onClick={() => setExpandedNumber(null)}
                  aria-label="Close"
                  className="absolute -top-10 right-0 w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
                <div className="bg-gray-900 rounded-[32px] p-4 shadow-2xl">
                  <div className="bg-white rounded-[18px] aspect-[4/3] flex items-center justify-center overflow-hidden relative">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <OrderingDemo ipad />
                  </div>
                </div>
              </motion.div>
            ) : (
            <motion.div
              initial={{ scale: 0.95, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{
                scale: 0.97,
                y: 8,
                opacity: 0,
                transition: { duration: 0.15, ease: "easeIn" },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl"
            >
              <div className="flex items-center justify-between px-5 pt-4 pb-3">
                <div>
                  <p className="text-[11px] text-[#b4b2a9] font-[family-name:var(--font-geist-mono)]">
                    {expanded.number} · {expanded.date} · {expanded.category}
                  </p>
                  <h3 className="text-[17px] font-bold text-gray-900">
                    {expanded.title}
                  </h3>
                </div>
                <button
                  onClick={() => setExpandedNumber(null)}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#888780] hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="h-[320px] bg-[#fafafa] border-y border-gray-100 flex items-center justify-center overflow-hidden relative">
                <span className="absolute top-2 right-3 text-[11px] text-[#b4b2a9] font-[family-name:var(--font-geist-mono)]">
                  live demo
                </span>
                {expanded.demo}
              </div>
              <div className="px-5 py-4">
                <p className="text-[13px] text-[#5f5e5a] leading-relaxed mb-3">
                  <span className="text-[#00915f] font-semibold">Why: </span>
                  {expanded.why}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {expanded.params.map((p) => (
                    <ParamChip key={p}>{p}</ParamChip>
                  ))}
                </div>
                <p className="text-[12px] text-[#b4b2a9] leading-relaxed">
                  <span className="font-semibold">Removed:</span> {expanded.removed}
                </p>
              </div>
            </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
