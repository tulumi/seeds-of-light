import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── COLORS ──────────────────────────────────────────────────
const C = {
  bg:"#F5EDD5", border:"#E09020", text:"#D07010", brown:"#5C3A10",
  green:"#48A030", sky:"#60B8E0", coral:"#F06050", pink:"#F090A0",
  purple:"#A060C0", tan:"#E8C080", gold:"#F0B828", teal:"#2A9BB5",
};

const BADGE_COLORS = [
  { bg:"#F9D0D8", text:"#9A3A50" },
  { bg:"#F7E4A4", text:"#7A5A18" },
  { bg:"#C6DEC8", text:"#3A6040" },
  { bg:"#B6D4E2", text:"#285870" },
  { bg:"#F0D0C0", text:"#8A4530" },
  { bg:"#D4C8E8", text:"#504070" },
  { bg:"#B8E0D8", text:"#286858" },
];

// ── CARD IMAGE ───────────────────────────────────────────────
function CardImg({ src, size = "100%" }) {
  return <img src={src} alt="" style={{ width: size, height: "auto", objectFit: "contain", display: "block" }} />;
}

// ── CUSTOM ICONS ─────────────────────────────────────────────
function Ico({ name, size = 28, color }) {
  const s = { width: size, height: size, display: "block", flexShrink: 0 };
  const sw = 1.6; // strokeWidth
  const col = color || "currentColor";

  const icons = {
    // Problem section
    burst: (
      <svg viewBox="0 0 28 28" fill="none" style={s}>
        <path d="M14 4 L15.8 10.2 L22 8 L18.2 13.4 L24 16 L17.8 17 L19 23.4 L14 19.6 L9 23.4 L10.2 17 L4 16 L9.8 13.4 L6 8 L12.2 10.2 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round" fill="none"/>
        <circle cx="14" cy="14" r="3" stroke={col} strokeWidth={sw} fill="none"/>
      </svg>
    ),
    moonCloud: (
      <svg viewBox="0 0 28 28" fill="none" style={s}>
        <path d="M17 7 C14.8 7 12.9 8.2 12 10 C11.4 9.8 10.7 9.7 10 9.7 C7.2 9.7 5 11.9 5 14.7 C5 17.5 7.2 19.7 10 19.7 L20 19.7 C22.2 19.7 24 17.9 24 15.7 C24 13.5 22.2 11.7 20 11.7 C19.8 11.7 19.6 11.7 19.4 11.8 C19.1 9.1 17.2 7 17 7 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M8 8 C9.5 5.5 12 4 14.5 4.2" stroke={col} strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),
    speechX: (
      <svg viewBox="0 0 28 28" fill="none" style={s}>
        <path d="M5 5 L23 5 L23 18 L16 18 L11 23 L11 18 L5 18 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <line x1="10" y1="9.5" x2="18" y2="13.5" stroke={col} strokeWidth={sw} strokeLinecap="round"/>
        <line x1="18" y1="9.5" x2="10" y2="13.5" stroke={col} strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),
    moonZ: (
      <svg viewBox="0 0 28 28" fill="none" style={s}>
        <path d="M12 5 C8 6.5 5.5 10.3 5.5 14.5 C5.5 20 10 24 15.5 24 C18.5 24 21.2 22.7 23 20.5 C21.5 21 19.8 21.3 18 21 C13 20.2 9.5 15.8 9.5 10.8 C9.5 8.7 10.5 6.6 12 5 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <text x="17" y="12" fontSize="7" fill={col} fontFamily="var(--font-sans)" fontWeight="600">z</text>
        <text x="20" y="8" fontSize="5" fill={col} fontFamily="var(--font-sans)" fontWeight="600">z</text>
      </svg>
    ),
    // Benefit section
    butterfly: (
      <svg viewBox="0 0 28 28" fill="none" style={s}>
        <path d="M14 14 C11 10 5 8 5 13 C5 17 9 18 14 14 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M14 14 C17 10 23 8 23 13 C23 17 19 18 14 14 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M14 14 C12 17 10 22 13 23 C15 23.5 15 20 14 14 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M14 14 C16 17 18 22 15 23 C13 23.5 13 20 14 14 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <ellipse cx="14" cy="14" rx="1.2" ry="5" stroke={col} strokeWidth="1.2"/>
        <circle cx="13" cy="9.5" r="1" fill={col}/>
        <circle cx="15" cy="9.5" r="1" fill={col}/>
      </svg>
    ),
    leaf: (
      <svg viewBox="0 0 28 28" fill="none" style={s}>
        <path d="M8 22 C8 22 10 14 18 8 C22 6 25 6 25 6 C25 6 24 9 22 12 C18 18 10 22 8 22 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M8 22 L16 14" stroke={col} strokeWidth={sw} strokeLinecap="round"/>
        <path d="M5 18 C5 18 6 14 8 12" stroke={col} strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),
    heartPair: (
      <svg viewBox="0 0 28 28" fill="none" style={s}>
        <path d="M10 9.5 C10 7.5 8 6 6.5 7.5 C5 9 6.5 11 10 13 C13.5 11 15 9 13.5 7.5 C12 6 10 7.5 10 9.5 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M18 11.5 C18 9.5 16 8 14.5 9.5 C13 11 14.5 13 18 15 C21.5 13 23 11 21.5 9.5 C20 8 18 9.5 18 11.5 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M10 13 Q14 19 18 15" stroke={col} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2"/>
      </svg>
    ),
    heartFlower: (
      <svg viewBox="0 0 28 28" fill="none" style={s}>
        <path d="M14 20 C14 20 7 15 7 10.5 C7 8 9 6.5 11 7 C12.2 7.4 13.2 8.2 14 9.2 C14.8 8.2 15.8 7.4 17 7 C19 6.5 21 8 21 10.5 C21 15 14 20 14 20 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <circle cx="20" cy="6" r="1.5" stroke={col} strokeWidth="1.2"/>
        <circle cx="24" cy="9" r="1.5" stroke={col} strokeWidth="1.2"/>
        <circle cx="23" cy="4" r="1.5" stroke={col} strokeWidth="1.2"/>
      </svg>
    ),
    starShine: (
      <svg viewBox="0 0 28 28" fill="none" style={s}>
        <path d="M14 4 L15.5 12.5 L24 14 L15.5 15.5 L14 24 L12.5 15.5 L4 14 L12.5 12.5 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="2.5" stroke={col} strokeWidth="1.2"/>
      </svg>
    ),
    moonStar: (
      <svg viewBox="0 0 28 28" fill="none" style={s}>
        <path d="M11 6 C7.5 7.5 5 11 5 15 C5 20.5 9.5 25 15 25 C18.5 25 21.5 23.2 23.2 20.5 C21.8 21 20.2 21.3 18.5 21 C14 20.2 11 16.2 11 12 C11 9.8 11.8 7.7 13 6.3 C12.3 6.1 11.7 6 11 6 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M20 5 L20.8 7.2 L23 8 L20.8 8.8 L20 11 L19.2 8.8 L17 8 L19.2 7.2 Z" stroke={col} strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
    // Kit contents
    cardDeck: (
      <svg viewBox="0 0 28 28" fill="none" style={s}>
        <rect x="8" y="10" width="15" height="14" rx="2.5" stroke={col} strokeWidth={sw}/>
        <rect x="6" y="7" width="15" height="14" rx="2.5" stroke={col} strokeWidth={sw}/>
        <rect x="4" y="4" width="15" height="14" rx="2.5" stroke={col} strokeWidth={sw}/>
        <path d="M7 8 L16 8" stroke={col} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    openBook: (
      <svg viewBox="0 0 28 28" fill="none" style={s}>
        <path d="M14 8 C14 8 11 6 5 7 L5 22 C11 21 14 22 14 22 C14 22 17 21 23 22 L23 7 C17 6 14 8 14 8 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <line x1="14" y1="8" x2="14" y2="22" stroke={col} strokeWidth={sw} strokeLinecap="round"/>
        <line x1="8" y1="11" x2="12" y2="11" stroke={col} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="8" y1="14" x2="12" y2="14" stroke={col} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="16" y1="11" x2="20" y2="11" stroke={col} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="16" y1="14" x2="20" y2="14" stroke={col} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    papers: (
      <svg viewBox="0 0 28 28" fill="none" style={s}>
        <rect x="8" y="5" width="14" height="18" rx="2" stroke={col} strokeWidth={sw}/>
        <rect x="5" y="8" width="14" height="18" rx="2" stroke={col} strokeWidth={sw} fill="var(--cream)"/>
        <line x1="8" y1="13" x2="16" y2="13" stroke={col} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="8" y1="16" x2="16" y2="16" stroke={col} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="8" y1="19" x2="13" y2="19" stroke={col} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    moonRitual: (
      <svg viewBox="0 0 28 28" fill="none" style={s}>
        <path d="M10 5.5 C6.5 7 4 10.5 4 14.5 C4 20 8.5 24.5 14 24.5 C17.5 24.5 20.5 22.7 22.2 20 C20.8 20.5 19.2 20.8 17.5 20.5 C13 19.7 10 15.7 10 11.5 C10 9.3 10.8 7.2 12 5.8 C11.3 5.6 10.6 5.5 10 5.5 Z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M19 4 L19.6 5.8 L21.4 6.4 L19.6 7 L19 8.8 L18.4 7 L16.6 6.4 L18.4 5.8 Z" stroke={col} strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M23 10 L23.4 11.4 L24.8 11.8 L23.4 12.2 L23 13.6 L22.6 12.2 L21.2 11.8 L22.6 11.4 Z" stroke={col} strokeWidth="1" strokeLinejoin="round"/>
      </svg>
    ),
    // Momentos
    moonLg: (
      <svg viewBox="0 0 48 48" fill="none" style={{...s, width:size, height:size}}>
        <path d="M18 8 C11 11 6 18 6 26 C6 35.9 14.1 44 24 44 C30.5 44 36.2 40.5 39.5 35.2 C37 36.2 34.2 36.8 31.2 36.4 C22.5 35.1 16 27.4 16 18.5 C16 14.7 17.4 11.1 20 8.5 C19.3 8.2 18.7 8 18 8 Z" stroke={col} strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M35 7 L36.2 10.8 L40 12 L36.2 13.2 L35 17 L33.8 13.2 L30 12 L33.8 10.8 Z" stroke={col} strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="40" cy="20" r="2" stroke={col} strokeWidth="1.4" fill="none"/>
      </svg>
    ),
    carLg: (
      <svg viewBox="0 0 48 48" fill="none" style={{...s, width:size, height:size}}>
        <rect x="4" y="22" width="40" height="16" rx="4" stroke={col} strokeWidth="2.2"/>
        <path d="M10 22 L14 12 L34 12 L38 22" stroke={col} strokeWidth="2.2" strokeLinejoin="round"/>
        <circle cx="12" cy="38" r="5" stroke={col} strokeWidth="2.2"/>
        <circle cx="36" cy="38" r="5" stroke={col} strokeWidth="2.2"/>
        <rect x="16" y="14" width="8" height="8" rx="1.5" stroke={col} strokeWidth="1.4"/>
        <rect x="26" y="14" width="8" height="8" rx="1.5" stroke={col} strokeWidth="1.4"/>
        <line x1="38" y1="28" x2="44" y2="28" stroke={col} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    plateLg: (
      <svg viewBox="0 0 48 48" fill="none" style={{...s, width:size, height:size}}>
        <circle cx="24" cy="26" r="16" stroke={col} strokeWidth="2.2"/>
        <circle cx="24" cy="26" r="11" stroke={col} strokeWidth="1.4"/>
        <line x1="15" y1="8" x2="15" y2="18" stroke={col} strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" y1="8" x2="12" y2="18" stroke={col} strokeWidth="2" strokeLinecap="round"/>
        <line x1="18" y1="8" x2="18" y2="18" stroke={col} strokeWidth="2" strokeLinecap="round"/>
        <path d="M33 8 C33 8 36 10 36 13 C36 16 33 16 33 16 L33 42" stroke={col} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    sunLg: (
      <svg viewBox="0 0 48 48" fill="none" style={{...s, width:size, height:size}}>
        {[0,45,90,135,180,225,270,315].map((a,i) => (
          <line key={i}
            x1={24 + 17*Math.cos(a*Math.PI/180)} y1={24 + 17*Math.sin(a*Math.PI/180)}
            x2={24 + 23*Math.cos(a*Math.PI/180)} y2={24 + 23*Math.sin(a*Math.PI/180)}
            stroke={col} strokeWidth="2.2" strokeLinecap="round"/>
        ))}
        <circle cx="24" cy="24" r="13" stroke={col} strokeWidth="2.2"/>
        <circle cx="20" cy="22" r="2" stroke={col} strokeWidth="1.4"/>
        <circle cx="28" cy="22" r="2" stroke={col} strokeWidth="1.4"/>
        <path d="M19 28 Q24 33 29 28" stroke={col} strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  };
  return icons[name] ?? null;
}

// ── (SVG illustrations removed — using real PNG illustrations) ─

const _unused = {
  lion:(
    <svg viewBox="0 0 120 100" style={{overflow:"visible"}}>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>(
        <ellipse key={i} cx={60+24*Math.cos(a*Math.PI/180)} cy={52+24*Math.sin(a*Math.PI/180)} rx={8} ry={5}
          fill="#F0A020" stroke={C.brown} strokeWidth="1.5"
          transform={`rotate(${a},${60+24*Math.cos(a*Math.PI/180)},${52+24*Math.sin(a*Math.PI/180)})`}/>
      ))}
      <ellipse cx="60" cy="72" rx="20" ry="14" fill="#F5C840" stroke={C.brown} strokeWidth="2"/>
      <circle cx="60" cy="52" r="18" fill="#F5C840" stroke={C.brown} strokeWidth="2"/>
      <circle cx="45" cy="38" r="6" fill="#F5C840" stroke={C.brown} strokeWidth="1.5"/>
      <circle cx="75" cy="38" r="6" fill="#F5C840" stroke={C.brown} strokeWidth="1.5"/>
      <circle cx="54" cy="50" r="3" fill={C.brown}/><circle cx="66" cy="50" r="3" fill={C.brown}/>
      <circle cx="55" cy="49" r="1" fill="white"/><circle cx="67" cy="49" r="1" fill="white"/>
      <ellipse cx="60" cy="57" rx="5" ry="3.5" fill="#F09070" stroke={C.brown} strokeWidth="1.2"/>
      <path d="M55 57 Q60 62 65 57" stroke={C.brown} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <polygon points="48,38 52,28 56,35 60,26 64,35 68,28 72,38" fill={C.gold} stroke={C.brown} strokeWidth="1.5"/>
      <circle cx="60" cy="27" r="2.5" fill={C.coral}/>
      <ellipse cx="44" cy="83" rx="8" ry="5" fill="#F5C840" stroke={C.brown} strokeWidth="1.5"/>
      <ellipse cx="76" cy="83" rx="8" ry="5" fill="#F5C840" stroke={C.brown} strokeWidth="1.5"/>
    </svg>
  ),
  bunny_idea:(
    <svg viewBox="0 0 120 100">
      <circle cx="60" cy="22" r="16" fill="#FFF8D0" stroke={C.gold} strokeWidth="1.5" opacity="0.7"/>
      <ellipse cx="60" cy="22" r="12" fill={C.gold} stroke={C.brown} strokeWidth="2"/>
      <path d="M54 30 Q60 36 66 30" stroke={C.brown} strokeWidth="1.5" fill="none"/>
      <line x1="58" y1="36" x2="62" y2="36" stroke={C.brown} strokeWidth="2"/>
      {[[40,12],[80,10],[85,28],[38,30]].map(([x,y],i)=>(
        <g key={i}><line x1={x} y1={y-4} x2={x} y2={y+4} stroke={C.gold} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1={x-4} y1={y} x2={x+4} y2={y} stroke={C.gold} strokeWidth="1.5" strokeLinecap="round"/></g>
      ))}
      <ellipse cx="60" cy="74" rx="16" ry="13" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <circle cx="60" cy="57" r="13" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="53" cy="43" rx="4.5" ry="9" fill={C.tan} stroke={C.brown} strokeWidth="1.8"/>
      <ellipse cx="53" cy="43" rx="2.5" ry="6" fill="#F0A0A0"/>
      <ellipse cx="67" cy="43" rx="4.5" ry="9" fill={C.tan} stroke={C.brown} strokeWidth="1.8"/>
      <ellipse cx="67" cy="43" rx="2.5" ry="6" fill="#F0A0A0"/>
      <circle cx="56" cy="55" r="2.5" fill={C.brown}/><circle cx="64" cy="55" r="2.5" fill={C.brown}/>
      <ellipse cx="60" cy="60" rx="3" ry="2" fill="#F090A0" stroke={C.brown} strokeWidth="1"/>
    </svg>
  ),
  plant_heart:(
    <svg viewBox="0 0 120 100">
      <ellipse cx="60" cy="88" rx="28" ry="8" fill="#B87840" stroke={C.brown} strokeWidth="1.5"/>
      <path d="M60 87 Q60 65 60 50" stroke={C.green} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M60 70 Q42 58 44 46 Q56 52 60 68" fill="#60C040" stroke={C.brown} strokeWidth="1.5"/>
      <path d="M60 65 Q78 53 76 41 Q64 47 60 63" fill="#50B030" stroke={C.brown} strokeWidth="1.5"/>
      <path d="M60 18 C56 14,48 14,48 22 C48 28,54 34,60 40 C66 34,72 28,72 22 C72 14,64 14,60 18Z" fill={C.coral} stroke={C.brown} strokeWidth="2"/>
    </svg>
  ),
  sun:(
    <svg viewBox="0 0 120 100">
      <circle cx="60" cy="54" r="35" fill="#FFF8C0" opacity="0.5"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>(
        <line key={i} x1={60+25*Math.cos(a*Math.PI/180)} y1={54+25*Math.sin(a*Math.PI/180)}
          x2={60+34*Math.cos(a*Math.PI/180)} y2={54+34*Math.sin(a*Math.PI/180)}
          stroke={C.gold} strokeWidth={i%2?2.5:3.5} strokeLinecap="round"/>
      ))}
      <circle cx="60" cy="54" r="23" fill={C.gold} stroke={C.brown} strokeWidth="2.5"/>
      <circle cx="52" cy="51" r="3.5" fill={C.brown}/><circle cx="68" cy="51" r="3.5" fill={C.brown}/>
      <circle cx="53.5" cy="49.5" r="1.2" fill="white"/><circle cx="69.5" cy="49.5" r="1.2" fill="white"/>
      <ellipse cx="46" cy="57" rx="5" ry="3.5" fill={C.coral} opacity="0.45"/>
      <ellipse cx="74" cy="57" rx="5" ry="3.5" fill={C.coral} opacity="0.45"/>
      <path d="M50 58 Q60 68 70 58" stroke={C.brown} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  sunflower:(
    <svg viewBox="0 0 120 100">
      <line x1="60" y1="88" x2="60" y2="55" stroke={C.green} strokeWidth="4" strokeLinecap="round"/>
      <path d="M60 75 Q42 65 44 55 Q56 60 60 73" fill="#60C040" stroke={C.brown} strokeWidth="1.5"/>
      <path d="M60 70 Q78 60 76 50 Q64 55 60 68" fill="#50B030" stroke={C.brown} strokeWidth="1.5"/>
      {[0,36,72,108,144,180,216,252,288,324].map((a,i)=>(
        <ellipse key={i} cx={60+20*Math.cos(a*Math.PI/180)} cy={40+20*Math.sin(a*Math.PI/180)}
          rx="7" ry="10" fill={C.gold} stroke={C.brown} strokeWidth="1.8"
          transform={`rotate(${a},${60+20*Math.cos(a*Math.PI/180)},${40+20*Math.sin(a*Math.PI/180)})`}/>
      ))}
      <circle cx="60" cy="40" r="16" fill="#B06820" stroke={C.brown} strokeWidth="2.2"/>
      <circle cx="55" cy="38" r="2.8" fill={C.brown}/><circle cx="65" cy="38" r="2.8" fill={C.brown}/>
      <path d="M53 44 Q60 50 67 44" stroke={C.brown} strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  bird_sing:(
    <svg viewBox="0 0 120 100">
      <path d="M20 72 Q60 65 100 70" stroke="#8B5C20" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <ellipse cx="58" cy="58" rx="18" ry="13" fill={C.sky} stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="50" cy="56" rx="12" ry="8" fill="#80C8E8" stroke={C.brown} strokeWidth="1.5" transform="rotate(-15,50,56)"/>
      <circle cx="40" cy="52" r="12" fill={C.sky} stroke={C.brown} strokeWidth="2"/>
      <path d="M29 52 L22 49 L23 55 Z" fill={C.gold} stroke={C.brown} strokeWidth="1.2"/>
      <circle cx="37" cy="50" r="3" fill={C.brown}/>
      <text x="12" y="45" fontSize="14" fill={C.coral}>♪</text>
      <text x="55" y="30" fontSize="13" fill={C.gold}>♪</text>
    </svg>
  ),
  feelings:(
    <svg viewBox="0 0 120 100">
      <circle cx="22" cy="30" r="14" fill="#FFF0F0" stroke={C.coral} strokeWidth="1.8" opacity="0.9"/>
      <text x="22" y="35" fontSize="16" textAnchor="middle">😊</text>
      <circle cx="98" cy="25" r="13" fill="#F0F8FF" stroke={C.sky} strokeWidth="1.8" opacity="0.9"/>
      <text x="98" y="30" fontSize="15" textAnchor="middle">😢</text>
      <ellipse cx="60" cy="75" rx="15" ry="16" fill="#F080A0" stroke={C.brown} strokeWidth="2"/>
      <circle cx="60" cy="55" r="14" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <path d="M47 50 Q50 42 60 42 Q70 42 73 50" fill="#5C2A10" stroke={C.brown} strokeWidth="1.5"/>
      <circle cx="55" cy="54" r="2.5" fill={C.brown}/><circle cx="65" cy="54" r="2.5" fill={C.brown}/>
      <path d="M55 60 Q60 65 65 60" stroke={C.brown} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  chick_fly:(
    <svg viewBox="0 0 120 100">
      <path d="M20 80 Q60 30 100 80" stroke="#D0A060" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.6"/>
      <ellipse cx="60" cy="66" rx="17" ry="15" fill={C.gold} stroke={C.brown} strokeWidth="2"/>
      <path d="M43 62 Q32 48 38 40 Q48 50 46 62 Z" fill="#F0C030" stroke={C.brown} strokeWidth="1.8"/>
      <path d="M77 62 Q88 48 82 40 Q72 50 74 62 Z" fill="#F0C030" stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="60" cy="50" r="14" fill={C.gold} stroke={C.brown} strokeWidth="2"/>
      <path d="M52 51 L46 49 L47 55 Z" fill="#F08020" stroke={C.brown} strokeWidth="1.2"/>
      <circle cx="58" cy="48" r="3" fill={C.brown}/>
      <text x="82" y="40" fontSize="11" fill={C.coral}>♡</text>
    </svg>
  ),
  gift:(
    <svg viewBox="0 0 120 100">
      {[[25,15],[95,12],[15,55],[105,50],[60,8]].map(([x,y],i)=>(
        <g key={i}><line x1={x} y1={y-5} x2={x} y2={y+5} stroke={C.gold} strokeWidth="2" strokeLinecap="round"/>
        <line x1={x-5} y1={y} x2={x+5} y2={y} stroke={C.gold} strokeWidth="2" strokeLinecap="round"/></g>
      ))}
      <rect x="28" y="58" width="64" height="34" rx="6" fill="#F06080" stroke={C.brown} strokeWidth="2.5"/>
      <rect x="22" y="48" width="76" height="16" rx="6" fill={C.coral} stroke={C.brown} strokeWidth="2.5"/>
      <rect x="56" y="58" width="8" height="34" rx="2" fill={C.gold} stroke={C.brown} strokeWidth="1.5"/>
      <rect x="22" y="53" width="76" height="8" rx="3" fill={C.gold} stroke={C.brown} strokeWidth="1.5"/>
      <path d="M60 50 Q44 38 46 28 Q58 32 60 48 Z" fill={C.gold} stroke={C.brown} strokeWidth="1.8"/>
      <path d="M60 50 Q76 38 74 28 Q62 32 60 48 Z" fill={C.gold} stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="60" cy="50" r="5" fill={C.gold} stroke={C.brown} strokeWidth="1.8"/>
    </svg>
  ),
  bunny_love:(
    <svg viewBox="0 0 120 100">
      {[[22,20],[95,18],[15,52],[102,48],[60,12]].map(([x,y],i)=>(
        <text key={i} x={x} y={y} fontSize={i===4?16:12} fill={C.coral} textAnchor="middle" opacity="0.8">♥</text>
      ))}
      <ellipse cx="60" cy="74" rx="16" ry="14" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <circle cx="60" cy="55" r="14" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="52" cy="40" rx="5" ry="10" fill={C.tan} stroke={C.brown} strokeWidth="1.8"/>
      <ellipse cx="52" cy="40" rx="3" ry="7" fill="#F0A0A0"/>
      <ellipse cx="68" cy="40" rx="5" ry="10" fill={C.tan} stroke={C.brown} strokeWidth="1.8"/>
      <ellipse cx="68" cy="40" rx="3" ry="7" fill="#F0A0A0"/>
      <circle cx="55" cy="53" r="2.8" fill={C.brown}/><circle cx="65" cy="53" r="2.8" fill={C.brown}/>
      <circle cx="56" cy="52" r="1" fill="white"/>
      <ellipse cx="60" cy="59" rx="3" ry="2" fill="#F090A0" stroke={C.brown} strokeWidth="1"/>
    </svg>
  ),
  bear_star:(
    <svg viewBox="0 0 120 100">
      <circle cx="60" cy="58" r="32" fill="#FFF8D0" opacity="0.4"/>
      <ellipse cx="60" cy="72" rx="20" ry="17" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="60" cy="74" rx="13" ry="11" fill="#E8B060"/>
      <circle cx="44" cy="45" r="9" fill="#D8943A" stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="44" cy="45" r="5" fill="#E8A850"/>
      <circle cx="76" cy="45" r="9" fill="#D8943A" stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="76" cy="45" r="5" fill="#E8A850"/>
      <circle cx="60" cy="55" r="18" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="60" cy="62" rx="8" ry="6" fill="#E8A850" stroke={C.brown} strokeWidth="1.5"/>
      <circle cx="54" cy="52" r="3" fill={C.brown}/><circle cx="66" cy="52" r="3" fill={C.brown}/>
      <circle cx="55" cy="51" r="1.2" fill="white"/><circle cx="67" cy="51" r="1.2" fill="white"/>
      <circle cx="60" cy="62" r="2" fill={C.brown}/>
      <path d="M55 65 Q60 70 65 65" stroke={C.brown} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <polygon points="60,64 62,70 68,70 63,74 65,80 60,76 55,80 57,74 52,70 58,70" fill={C.gold} stroke={C.brown} strokeWidth="1.5"/>
    </svg>
  ),
  smile_shine:(
    <svg viewBox="0 0 120 100">
      {[200,220,240,260,280,300,320].map((a,i)=>(
        <line key={i} x1={60+28*Math.cos(a*Math.PI/180)} y1={58+28*Math.sin(a*Math.PI/180)}
          x2={60+42*Math.cos(a*Math.PI/180)} y2={58+42*Math.sin(a*Math.PI/180)}
          stroke={C.gold} strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
      ))}
      <ellipse cx="60" cy="76" rx="16" ry="16" fill="#F06090" stroke={C.brown} strokeWidth="2"/>
      <circle cx="60" cy="53" r="16" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <path d="M44 50 Q46 36 60 35 Q74 36 76 50" fill="#8B4513" stroke={C.brown} strokeWidth="1.8"/>
      <path d="M52 50 Q55 46 58 50" stroke={C.brown} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M62 50 Q65 46 68 50" stroke={C.brown} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="48" cy="57" rx="5" ry="3.5" fill={C.coral} opacity="0.45"/>
      <ellipse cx="72" cy="57" rx="5" ry="3.5" fill={C.coral} opacity="0.45"/>
      <path d="M48 58 Q60 70 72 58" stroke={C.brown} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  grateful_bear:(
    <svg viewBox="0 0 120 100">
      <ellipse cx="60" cy="72" rx="20" ry="18" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <circle cx="43" cy="44" r="9" fill="#D8943A" stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="43" cy="44" r="5" fill="#E8A850"/>
      <circle cx="77" cy="44" r="9" fill="#D8943A" stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="77" cy="44" r="5" fill="#E8A850"/>
      <circle cx="60" cy="54" r="18" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="60" cy="61" rx="8" ry="6" fill="#E8A850" stroke={C.brown} strokeWidth="1.5"/>
      <path d="M51 50 Q54 46 57 50" stroke={C.brown} strokeWidth="2.5" fill="none"/>
      <path d="M63 50 Q66 46 69 50" stroke={C.brown} strokeWidth="2.5" fill="none"/>
      <circle cx="60" cy="62" r="2" fill={C.brown}/>
      <path d="M55 65 Q60 70 65 65" stroke={C.brown} strokeWidth="1.8" fill="none"/>
      <path d="M42 70 Q36 62 40 56 Q46 62 44 70" fill="#D8943A" stroke={C.brown} strokeWidth="1.8"/>
      <path d="M78 70 Q84 62 80 56 Q74 62 76 70" fill="#D8943A" stroke={C.brown} strokeWidth="1.8"/>
      <path d="M60 62 C57 59,51 59,51 64 C51 68,56 72,60 75 C64 72,69 68,69 64 C69 59,63 59,60 62Z" fill={C.coral} stroke={C.brown} strokeWidth="1.5"/>
    </svg>
  ),
  bear_hug:(
    <svg viewBox="0 0 120 100">
      <text x="60" y="18" fontSize="18" textAnchor="middle" fill={C.coral}>♥</text>
      <text x="38" y="30" fontSize="10" fill={C.coral}>♥</text>
      <text x="82" y="28" fontSize="10" fill={C.coral}>♥</text>
      <ellipse cx="40" cy="72" rx="16" ry="15" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <circle cx="38" cy="52" r="14" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="38" cy="59" rx="7" ry="5" fill="#E8A850" stroke={C.brown} strokeWidth="1.2"/>
      <circle cx="34" cy="49" r="2.5" fill={C.brown}/><circle cx="44" cy="49" r="2.5" fill={C.brown}/>
      <path d="M33 56 Q38 60 43 56" stroke={C.brown} strokeWidth="1.5" fill="none"/>
      <ellipse cx="80" cy="75" rx="14" ry="13" fill="#E8B060" stroke={C.brown} strokeWidth="2"/>
      <circle cx="82" cy="56" r="12" fill="#E8B060" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="82" cy="62" rx="6" ry="4.5" fill="#F0C070" stroke={C.brown} strokeWidth="1.2"/>
      <circle cx="78" cy="53" r="2.2" fill={C.brown}/><circle cx="87" cy="53" r="2.2" fill={C.brown}/>
      <path d="M52 68 Q60 60 68 68" stroke="#D8943A" strokeWidth="7" strokeLinecap="round" fill="none"/>
      <path d="M68 70 Q60 64 52 70" stroke="#E8B060" strokeWidth="5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  child_bunny:(
    <svg viewBox="0 0 120 100">
      <ellipse cx="70" cy="62" rx="12" ry="10" fill={C.tan} stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="68" cy="52" r="9" fill={C.tan} stroke={C.brown} strokeWidth="1.8"/>
      <ellipse cx="63" cy="42" rx="3.5" ry="7" fill={C.tan} stroke={C.brown} strokeWidth="1.5"/>
      <ellipse cx="63" cy="42" rx="2" ry="5" fill="#F0A0A0"/>
      <ellipse cx="72" cy="41" rx="3.5" ry="7" fill={C.tan} stroke={C.brown} strokeWidth="1.5"/>
      <ellipse cx="72" cy="41" rx="2" ry="5" fill="#F0A0A0"/>
      <circle cx="65" cy="51" r="2" fill={C.brown}/><circle cx="72" cy="51" r="2" fill={C.brown}/>
      <ellipse cx="48" cy="74" rx="16" ry="18" fill="#F06090" stroke={C.brown} strokeWidth="2"/>
      <circle cx="48" cy="50" r="15" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <path d="M33 47 Q35 34 48 33 Q61 34 63 47" fill="#5C2A10" stroke={C.brown} strokeWidth="1.5"/>
      <circle cx="43" cy="48" r="2.5" fill={C.brown}/><circle cx="53" cy="48" r="2.5" fill={C.brown}/>
      <path d="M43 55 Q48 60 53 55" stroke={C.brown} strokeWidth="1.8" fill="none"/>
    </svg>
  ),
  earth_hug:(
    <svg viewBox="0 0 120 100">
      <circle cx="60" cy="58" r="28" fill="#60A8D8" stroke={C.brown} strokeWidth="2"/>
      <path d="M45 44 Q52 38 62 42 Q70 40 72 48 Q68 55 60 54 Q50 56 45 50 Z" fill={C.green} stroke={C.brown} strokeWidth="1"/>
      <path d="M55 60 Q64 58 70 64 Q68 72 60 74 Q52 72 50 66 Z" fill={C.green} stroke={C.brown} strokeWidth="1"/>
      <circle cx="54" cy="54" r="2.5" fill={C.brown}/><circle cx="64" cy="54" r="2.5" fill={C.brown}/>
      <path d="M52 60 Q58 66 66 60" stroke={C.brown} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M32 60 Q24 48 28 38 Q36 46 38 58" fill="#F5D0A0" stroke={C.brown} strokeWidth="1.8"/>
      <path d="M88 60 Q96 48 92 38 Q84 46 82 58" fill="#F5D0A0" stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="60" cy="26" r="14" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <circle cx="55" cy="25" r="2.5" fill={C.brown}/><circle cx="65" cy="25" r="2.5" fill={C.brown}/>
    </svg>
  ),
  sharing:(
    <svg viewBox="0 0 120 100">
      <circle cx="33" cy="55" r="13" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <circle cx="29" cy="53" r="2.5" fill={C.brown}/><circle cx="38" cy="53" r="2.5" fill={C.brown}/>
      <path d="M28 58 Q33 63 38 58" stroke={C.brown} strokeWidth="1.8" fill="none"/>
      <ellipse cx="33" cy="73" rx="14" ry="13" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="60" cy="65" rx="12" ry="11" fill={C.coral} stroke={C.brown} strokeWidth="2"/>
      <path d="M60 54 Q62 50 65 52" stroke={C.green} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="88" cy="54" r="12" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <circle cx="84" cy="52" r="2.5" fill={C.brown}/><circle cx="93" cy="52" r="2.5" fill={C.brown}/>
      <path d="M83 58 Q88 63 93 58" stroke={C.brown} strokeWidth="1.8" fill="none"/>
      <ellipse cx="88" cy="72" rx="13" ry="12" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <text x="60" y="36" fontSize="14" textAnchor="middle" fill={C.coral}>♥</text>
    </svg>
  ),
  parrot:(
    <svg viewBox="0 0 120 100">
      <path d="M15 78 Q60 72 105 76" stroke="#8B5C20" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <path d="M72 70 Q85 78 88 90" stroke="#2080C0" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M74 70 Q90 72 96 82" stroke={C.green} strokeWidth="4" strokeLinecap="round" fill="none"/>
      <ellipse cx="58" cy="63" rx="18" ry="15" fill="#30B040" stroke={C.brown} strokeWidth="2"/>
      <path d="M44 60 Q32 50 34 38 Q46 46 50 60 Z" fill="#20A030" stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="48" cy="48" r="14" fill="#30B040" stroke={C.brown} strokeWidth="2"/>
      <circle cx="44" cy="50" r="8" fill="#FFF0C0" stroke={C.brown} strokeWidth="1.5"/>
      <path d="M36 48 L28 45 L30 52 Z" fill="#F08020" stroke={C.brown} strokeWidth="1.5"/>
      <circle cx="50" cy="46" r="3.5" fill={C.brown}/>
      <text x="18" y="40" fontSize="11" fill={C.coral}>♥</text>
      <text x="20" y="28" fontSize="13" fill={C.purple}>♫</text>
    </svg>
  ),
  two_friends:(
    <svg viewBox="0 0 120 100">
      <text x="60" y="15" fontSize="14" textAnchor="middle" fill={C.gold}>✦</text>
      <ellipse cx="38" cy="72" rx="18" ry="15" fill="#90C0E8" stroke={C.brown} strokeWidth="2"/>
      <circle cx="36" cy="50" r="15" fill="#90C0E8" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="22" cy="50" rx="9" ry="12" fill="#78A8D0" stroke={C.brown} strokeWidth="1.5"/>
      <circle cx="32" cy="48" r="2.8" fill={C.brown}/><circle cx="42" cy="48" r="2.8" fill={C.brown}/>
      <path d="M30 54 Q36 58 42 54" stroke={C.brown} strokeWidth="1.8" fill="none"/>
      <ellipse cx="82" cy="73" rx="16" ry="14" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <circle cx="82" cy="52" r="13" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="75" cy="38" rx="4" ry="9" fill={C.tan} stroke={C.brown} strokeWidth="1.5"/>
      <ellipse cx="88" cy="38" rx="4" ry="9" fill={C.tan} stroke={C.brown} strokeWidth="1.5"/>
      <circle cx="78" cy="50" r="2.5" fill={C.brown}/><circle cx="86" cy="50" r="2.5" fill={C.brown}/>
      <text x="61" y="58" fontSize="16" textAnchor="middle" fill={C.coral}>♥</text>
    </svg>
  ),
  elephant_listen:(
    <svg viewBox="0 0 120 100">
      <text x="20" y="52" fontSize="14" fill={C.coral}>♥</text>
      <ellipse cx="68" cy="72" rx="22" ry="17" fill="#90C0E8" stroke={C.brown} strokeWidth="2"/>
      <circle cx="58" cy="52" r="20" fill="#90C0E8" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="36" cy="52" rx="13" ry="17" fill="#78A8D0" stroke={C.brown} strokeWidth="2"/>
      <path d="M44 64 Q34 74 38 84 Q44 88 48 84" stroke="#90C0E8" strokeWidth="8" strokeLinecap="round" fill="none"/>
      <circle cx="54" cy="49" r="3.5" fill={C.brown}/><circle cx="66" cy="49" r="3.5" fill={C.brown}/>
      <path d="M50 58 Q58 64 66 58" stroke={C.brown} strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  sunflower_smile:(
    <svg viewBox="0 0 120 100">
      <line x1="60" y1="90" x2="60" y2="55" stroke={C.green} strokeWidth="5" strokeLinecap="round"/>
      <path d="M60 78 Q42 68 44 58 Q56 63 60 76" fill="#60C040" stroke={C.brown} strokeWidth="1.5"/>
      <path d="M60 72 Q78 62 76 52 Q64 57 60 70" fill="#50B030" stroke={C.brown} strokeWidth="1.5"/>
      {[0,36,72,108,144,180,216,252,288,324].map((a,i)=>(
        <ellipse key={i} cx={60+22*Math.cos(a*Math.PI/180)} cy={38+22*Math.sin(a*Math.PI/180)}
          rx="8" ry="11" fill={C.gold} stroke={C.brown} strokeWidth="1.8"
          transform={`rotate(${a},${60+22*Math.cos(a*Math.PI/180)},${38+22*Math.sin(a*Math.PI/180)})`}/>
      ))}
      <circle cx="60" cy="38" r="17" fill="#904010" stroke={C.brown} strokeWidth="2.2"/>
      <circle cx="55" cy="36" r="2.8" fill="#3C1A08"/><circle cx="65" cy="36" r="2.8" fill="#3C1A08"/>
      <path d="M53 42 Q60 48 67 42" stroke="#3C1A08" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  helping:(
    <svg viewBox="0 0 120 100">
      <ellipse cx="38" cy="72" rx="14" ry="17" fill="#F06090" stroke={C.brown} strokeWidth="2"/>
      <circle cx="38" cy="48" r="14" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <path d="M24 44 Q26 33 38 32 Q50 33 52 44" fill="#5C2A10" stroke={C.brown} strokeWidth="1.5"/>
      <circle cx="33" cy="47" r="2.5" fill={C.brown}/><circle cx="43" cy="47" r="2.5" fill={C.brown}/>
      <path d="M33 54 Q38 60 43 54" stroke={C.brown} strokeWidth="1.8" fill="none"/>
      <path d="M50 66 Q64 60 74 64" stroke="#F0C890" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <circle cx="84" cy="60" r="13" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="84" cy="78" rx="13" ry="12" fill="#60A0E8" stroke={C.brown} strokeWidth="2"/>
    </svg>
  ),
  sunshine_ray:(
    <svg viewBox="0 0 120 100">
      <circle cx="60" cy="50" r="40" fill="#FFF8C0" opacity="0.35"/>
      {[0,45,90,135,180,225,270,315].map((a,i)=>(
        <line key={i} x1={60+26*Math.cos(a*Math.PI/180)} y1={50+26*Math.sin(a*Math.PI/180)}
          x2={60+42*Math.cos(a*Math.PI/180)} y2={50+42*Math.sin(a*Math.PI/180)}
          stroke="#F5C820" strokeWidth="4" strokeLinecap="round"/>
      ))}
      <circle cx="60" cy="50" r="24" fill={C.gold} stroke={C.brown} strokeWidth="2.5"/>
      <circle cx="52" cy="47" r="3.5" fill={C.brown}/><circle cx="68" cy="47" r="3.5" fill={C.brown}/>
      <ellipse cx="45" cy="53" rx="5.5" ry="4" fill={C.coral} opacity="0.42"/>
      <ellipse cx="75" cy="53" rx="5.5" ry="4" fill={C.coral} opacity="0.42"/>
      <path d="M49 55 Q60 67 71 55" stroke={C.brown} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  turtle:(
    <svg viewBox="0 0 120 100">
      {[[28,20,12],[18,42,9],[25,58,7]].map(([x,y,r],i)=>(
        <circle key={i} cx={x} cy={y} r={r} fill="none" stroke={C.sky} strokeWidth="1.5" opacity={0.7-i*0.2}/>
      ))}
      <ellipse cx="66" cy="60" rx="28" ry="20" fill="#50A830" stroke={C.brown} strokeWidth="2.5"/>
      <ellipse cx="66" cy="60" rx="20" ry="14" fill="#40A020" stroke={C.brown} strokeWidth="1.2"/>
      <circle cx="36" cy="58" r="13" fill="#68B848" stroke={C.brown} strokeWidth="2"/>
      <circle cx="31" cy="55" r="2.8" fill={C.brown}/><circle cx="40" cy="54" r="2.8" fill={C.brown}/>
      <circle cx="32" cy="54" r="1" fill="white"/>
      <path d="M30 60 Q36 65 42 60" stroke={C.brown} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <ellipse cx="46" cy="80" rx="10" ry="6" fill="#68B848" stroke={C.brown} strokeWidth="1.8" transform="rotate(-20,46,80)"/>
      <ellipse cx="86" cy="80" rx="10" ry="6" fill="#68B848" stroke={C.brown} strokeWidth="1.8" transform="rotate(20,86,80)"/>
    </svg>
  ),
  sunrise:(
    <svg viewBox="0 0 120 100">
      <rect x="0" y="0" width="120" height="70" rx="8" fill="#FFF0D8" opacity="0.5"/>
      <circle cx="60" cy="68" r="26" fill={C.gold}/>
      {[-60,-40,-20,0,20,40,60].map((a,i)=>(
        <line key={i} x1={60+28*Math.sin(a*Math.PI/180)} y1={68-28*Math.cos(a*Math.PI/180)}
          x2={60+38*Math.sin(a*Math.PI/180)} y2={68-38*Math.cos(a*Math.PI/180)}
          stroke="#E8A010" strokeWidth="3" strokeLinecap="round"/>
      ))}
      <rect x="0" y="66" width="120" height="34" fill="#D8E8A0"/>
      <path d="M0 78 Q30 60 60 72 Q90 84 120 70 L120 100 L0 100 Z" fill="#C8D890"/>
      <circle cx="56" cy="60" r="3" fill={C.brown}/><circle cx="64" cy="60" r="3" fill={C.brown}/>
      <path d="M54 66 Q60 72 66 66" stroke={C.brown} strokeWidth="2" fill="none"/>
    </svg>
  ),
  drawing:(
    <svg viewBox="0 0 120 100">
      <line x1="58" y1="44" x2="44" y2="90" stroke="#8B5C20" strokeWidth="3" strokeLinecap="round"/>
      <line x1="62" y1="44" x2="76" y2="90" stroke="#8B5C20" strokeWidth="3" strokeLinecap="round"/>
      <line x1="46" y1="80" x2="74" y2="80" stroke="#8B5C20" strokeWidth="2.5"/>
      <rect x="42" y="22" width="36" height="30" rx="3" fill="white" stroke={C.brown} strokeWidth="2"/>
      <circle cx="56" cy="33" r="5" fill="#F09040" stroke={C.brown} strokeWidth="1"/>
      <circle cx="66" cy="35" r="4" fill={C.sky} stroke={C.brown} strokeWidth="1"/>
      <circle cx="92" cy="54" r="13" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <path d="M79 50 Q82 40 92 39 Q102 40 105 50" fill="#C86830" stroke={C.brown} strokeWidth="1.5"/>
      <ellipse cx="92" cy="72" rx="13" ry="15" fill="#60A8E0" stroke={C.brown} strokeWidth="2"/>
      <path d="M80 66 Q72 60 66 54" stroke="#F0C890" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <line x1="66" y1="54" x2="52" y2="40" stroke="#8B5C20" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="50" cy="38" rx="4" ry="3" fill={C.coral} stroke={C.brown} strokeWidth="1"/>
    </svg>
  ),
  memories:(
    <svg viewBox="0 0 120 100">
      <circle cx="60" cy="28" r="24" fill="white" stroke={C.sky} strokeWidth="2" opacity="0.9"/>
      <circle cx="38" cy="32" r="16" fill="white" stroke={C.sky} strokeWidth="2" opacity="0.9"/>
      <circle cx="82" cy="30" r="18" fill="white" stroke={C.sky} strokeWidth="2" opacity="0.9"/>
      <circle cx="60" cy="20" r="16" fill="white" stroke={C.sky} strokeWidth="2" opacity="0.9"/>
      <text x="44" y="26" fontSize="12" textAnchor="middle">🌸</text>
      <text x="60" y="32" fontSize="11" textAnchor="middle">⭐</text>
      <text x="75" y="25" fontSize="11" textAnchor="middle">🌈</text>
      {[[52,56,5],[55,63,4],[58,70,3]].map(([x,y,r],i)=>(
        <circle key={i} cx={x} cy={y} r={r} fill="white" stroke={C.sky} strokeWidth="1.5" opacity="0.7"/>
      ))}
      <circle cx="64" cy="82" r="13" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <path d="M52 78 Q54 68 64 67 Q74 68 76 78" fill="#8B4513" stroke={C.brown} strokeWidth="1.5"/>
      <path d="M58 80 Q61 76 64 80" stroke={C.brown} strokeWidth="2" fill="none"/>
      <path d="M64 80 Q67 76 70 80" stroke={C.brown} strokeWidth="2" fill="none"/>
    </svg>
  ),
  silence:(
    <svg viewBox="0 0 120 100">
      {[1,2,3].map(i=>(
        <ellipse key={i} cx="60" cy="88" rx={20+i*12} ry={5+i*2} fill="none" stroke={C.sky} strokeWidth="1.2" opacity={0.8-i*0.25}/>
      ))}
      <circle cx="60" cy="74" r="7" fill={C.gold} stroke={C.brown} strokeWidth="1.5"/>
      <ellipse cx="60" cy="72" rx="22" ry="10" fill="#F06090" stroke={C.brown} strokeWidth="2"/>
      <path d="M38 74 Q30 80 34 88 Q44 86 48 76" fill="#F06090" stroke={C.brown} strokeWidth="1.8"/>
      <path d="M82 74 Q90 80 86 88 Q76 86 72 76" fill="#F06090" stroke={C.brown} strokeWidth="1.8"/>
      <ellipse cx="60" cy="63" rx="14" ry="14" fill="#F06090" stroke={C.brown} strokeWidth="2"/>
      <circle cx="60" cy="46" r="15" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <path d="M45 42 Q48 31 60 30 Q72 31 75 42" fill="#5C2A10" stroke={C.brown} strokeWidth="1.5"/>
      <path d="M53 44 Q56 40 59 44" stroke={C.brown} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M61 44 Q64 40 67 44" stroke={C.brown} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M55 50 Q60 54 65 50" stroke={C.brown} strokeWidth="1.8" fill="none"/>
    </svg>
  ),
  journal:(
    <svg viewBox="0 0 120 100">
      {[[72,18,C.gold],[88,26,C.coral],[80,38,C.purple]].map(([x,y,c],i)=>(
        <g key={i}><line x1={x} y1={y-4} x2={x} y2={y+4} stroke={c} strokeWidth="2" strokeLinecap="round"/>
        <line x1={x-4} y1={y} x2={x+4} y2={y} stroke={c} strokeWidth="2" strokeLinecap="round"/></g>
      ))}
      <rect x="28" y="30" width="52" height="60" rx="6" fill="#80C0F8" stroke={C.brown} strokeWidth="2.5"/>
      <rect x="28" y="30" width="10" height="60" rx="5" fill="#60A0E0" stroke={C.brown} strokeWidth="2"/>
      <rect x="36" y="33" width="40" height="57" rx="2" fill="#FFFDF0"/>
      {[42,52,62,72,80].map(y=>(
        <line key={y} x1="40" y1={y} x2="72" y2={y} stroke="#D0C8A0" strokeWidth="1"/>
      ))}
      <polygon points="56,40 57.5,45 62,45 58.5,48 60,53 56,50 52,53 53.5,48 50,45 54.5,45" fill={C.gold} stroke="#C09010" strokeWidth="0.8"/>
      <line x1="76" y1="28" x2="90" y2="55" stroke="#F08020" strokeWidth="4" strokeLinecap="round"/>
      <polygon points="90,55 86,60 94,60" fill="#F5C030" stroke={C.brown} strokeWidth="1.5"/>
    </svg>
  ),
  emotions:(
    <svg viewBox="0 0 120 100">
      {[[28,35,C.gold,"😊"],[60,35,C.sky,"😢"],[92,35,C.coral,"😠"],[28,68,"#C080E0","😨"],[60,68,C.green,"😌"],[92,68,"#F090C0","🥰"]].map(([x,y,c,face],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r={16} fill="white" stroke={c} strokeWidth="2.2"/>
          <text x={x} y={y+6} fontSize="18" textAnchor="middle">{face}</text>
        </g>
      ))}
      <text x="28" y="56" fontSize="6.5" textAnchor="middle" fill={C.brown}>feliz</text>
      <text x="60" y="56" fontSize="6.5" textAnchor="middle" fill={C.brown}>triste</text>
      <text x="92" y="56" fontSize="6.5" textAnchor="middle" fill={C.brown}>enojado</text>
      <text x="28" y="89" fontSize="6.5" textAnchor="middle" fill={C.brown}>asustado</text>
      <text x="60" y="89" fontSize="6.5" textAnchor="middle" fill={C.brown}>tranquilo</text>
      <text x="92" y="89" fontSize="6.5" textAnchor="middle" fill={C.brown}>amado</text>
    </svg>
  ),
  butterfly_flower:(
    <svg viewBox="0 0 120 100">
      <path d="M60 92 Q58 78 60 65" stroke={C.green} strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M60 78 Q44 70 46 60 Q58 66 60 76" fill="#60C040" stroke={C.brown} strokeWidth="1.5"/>
      <path d="M60 72 Q76 64 74 54 Q62 60 60 70" fill="#50B030" stroke={C.brown} strokeWidth="1.5"/>
      {[0,36,72,108,144,180,216,252,288,324].map((a,i)=>(
        <ellipse key={i} cx={60+18*Math.cos(a*Math.PI/180)} cy={46+18*Math.sin(a*Math.PI/180)}
          rx="7" ry="10" fill={i%2?"#F080C0":"#F8A0D8"} stroke={C.brown} strokeWidth="1.5"
          transform={`rotate(${a},${60+18*Math.cos(a*Math.PI/180)},${46+18*Math.sin(a*Math.PI/180)})`}/>
      ))}
      <circle cx="60" cy="46" r="13" fill={C.gold} stroke={C.brown} strokeWidth="2"/>
      <circle cx="60" cy="46" r="7" fill="#F0B820"/>
      <path d="M62 36 Q76 22 86 30 Q84 42 68 40 Z" fill="#F08020" stroke={C.brown} strokeWidth="1.8"/>
      <path d="M58 36 Q44 22 34 30 Q36 42 52 40 Z" fill="#F08020" stroke={C.brown} strokeWidth="1.8"/>
      <ellipse cx="60" cy="38" rx="3" ry="8" fill="#5C3A10" stroke={C.brown} strokeWidth="1.5"/>
    </svg>
  ),
  rainbow:(
    <svg viewBox="0 0 120 100">
      {[["#FF6B6B",52],["#FF9F43",44],["#FFD166",36],["#6BCB77",28],["#74B9FF",20],["#BFA2DB",12]].map(([color,r],i)=>(
        <path key={i} d={`M ${60-r*1.25} 80 A ${r*1.25} ${r} 0 0 1 ${60+r*1.25} 80`}
          fill="none" stroke={color} strokeWidth="7.5" strokeLinecap="round" opacity="0.88"/>
      ))}
      <ellipse cx="16" cy="80" rx="16" ry="10" fill="#D4EBF5"/>
      <ellipse cx="8" cy="74" rx="10" ry="9" fill="#D4EBF5"/>
      <ellipse cx="24" cy="74" rx="11" ry="9" fill="#D4EBF5"/>
      <ellipse cx="104" cy="80" rx="16" ry="10" fill="#D4EBF5"/>
      <ellipse cx="96" cy="74" rx="10" ry="9" fill="#D4EBF5"/>
      <ellipse cx="112" cy="74" rx="11" ry="9" fill="#D4EBF5"/>
      {[[48,10],[62,8],[76,12],[38,18],[84,16]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="2" fill={i%2?"#FFD166":"#74B9FF"} opacity="0.7"/>
      ))}
    </svg>
  ),
  breathing:(
    <svg viewBox="0 0 120 100">
      {[38,30,22,14,7].map((r,i)=>(
        <circle key={i} cx="60" cy="52" r={r} fill="none"
          stroke={i%2?"#74B9FF":"#A8D8EA"} strokeWidth="2.5" opacity={0.9-i*0.14}/>
      ))}
      <circle cx="60" cy="52" r="5" fill="#74B9FF" opacity="0.85"/>
      <circle cx="60" cy="52" r="2.5" fill="white"/>
      <path d="M44 18 Q60 10 76 18" fill="none" stroke="#74B9FF" strokeWidth="2.2" strokeLinecap="round" opacity="0.55"/>
      <path d="M44 86 Q60 94 76 86" fill="none" stroke="#74B9FF" strokeWidth="2.2" strokeLinecap="round" opacity="0.55"/>
      {[[22,34],[98,34],[22,70],[98,70]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="2.5" fill="#A8D8EA" opacity="0.45"/>
      ))}
    </svg>
  ),
  tree:(
    <svg viewBox="0 0 120 100">
      {[[-14,10,0,22],[-24,20,-4,36],[14,10,0,22],[24,20,4,36],[0,14,0,28]].map(([dx1,dy1,dx2,dy2],i)=>(
        <path key={i} d={`M60 88 Q${60+dx1} ${88+dy1} ${60+dx2} ${88+dy2}`}
          stroke="#8B5C20" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.8"/>
      ))}
      <rect x="54" y="56" width="12" height="34" rx="6" fill="#8B5C20"/>
      <circle cx="60" cy="26" r="24" fill="#5CB85C"/>
      <circle cx="44" cy="42" r="16" fill="#48A840"/>
      <circle cx="76" cy="42" r="16" fill="#48A840"/>
      <circle cx="60" cy="38" r="18" fill="#5CB85C"/>
      {[[50,20,C.coral],[70,16,C.gold],[54,36,C.pink],[68,32,C.gold],[42,30,"#F080C0"]].map(([x,y,c],i)=>(
        <circle key={i} cx={x} cy={y} r="3.5" fill={c} opacity="0.82"/>
      ))}
      <ellipse cx="60" cy="90" rx="22" ry="5" fill="#B87840" opacity="0.5"/>
    </svg>
  ),
};

// ── DECK (40 cartas) ─────────────────────────────────────────
const DECK = [
  {id:"A01",n:1, cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c01.png", lines:["Soy amado","y valorado"]},
  {id:"A02",n:2, cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c02.png", lines:["Eres mi","lugar seguro"]},
  {id:"A03",n:3, cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c03.png", lines:["Mi sonrisa","ilumina el mundo"]},
  {id:"A04",n:4, cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c04.png", lines:["Soy suficiente","tal como soy"]},
  {id:"A05",n:5, cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c05.png", lines:["Hoy elijo","la felicidad"]},
  {id:"A06",n:6, cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c06.png", lines:["Respiro paz","y calma"]},
  {id:"A07",n:7, cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c07.png", lines:["Doy gracias","por este día"]},
  {id:"A08",n:8, cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c08.png", lines:["Mi corazón","es bondadoso"]},
  {id:"A09",n:9, cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c09.png", lines:["Soy paciente","conmigo mismo"]},
  {id:"A10",n:10,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c10.png", lines:["Mi voz","importa"]},
  {id:"A11",n:11,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c11.png", lines:["Me encanta","aprender"]},
  {id:"A12",n:12,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c12.png", lines:["Soy luz","y alegría"]},
  {id:"A13",n:13,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c13.png", lines:["Soy","valiente"]},
  {id:"A14",n:14,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c14.png", lines:["Soy creativo","y brillante"]},
  {id:"A15",n:15,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c15.png", lines:["Puedo lograr","grandes cosas"]},
  {id:"A16",n:16,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c16.png", lines:["Merezco amor","y alegría"]},
  {id:"A17",n:17,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c17.png", lines:["Tengo un","corazón grande"]},
  {id:"A18",n:18,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c18.png", lines:["Disfruto","cada momento"]},
  {id:"A19",n:19,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c19.png", lines:["Todo","estará bien"]},
  {id:"A20",n:20,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c20.png", lines:["Mi cuerpo es","fuerte y sano"]},
  {id:"A21",n:21,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c21.png", lines:["Mi imaginación","es mágica"]},
  {id:"A22",n:22,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c22.png", lines:["Brillo","desde adentro"]},
  {id:"A23",n:23,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c23.png", lines:["Soy libre","de soñar"]},
  {id:"A24",n:24,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c24.png", lines:["Respiro","profundo"]},
  {id:"A25",n:25,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c25.png", lines:["Cuido a","la naturaleza"]},
  {id:"A26",n:26,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c26.png", lines:["Soy feliz","siendo yo"]},
  {id:"A27",n:27,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c27.png", lines:["Confío en","mi camino"]},
  {id:"A28",n:28,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c28.png", lines:["Todo empieza","con amor"]},
  {id:"A29",n:29,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c29.png", lines:["Compartir","es amar"]},
  {id:"A30",n:30,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c30.png", lines:["Escucho a","mi corazón"]},
  {id:"A31",n:31,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c31.png", lines:["Mi familia","es mi hogar"]},
  {id:"A32",n:32,cat:"Afirmaciones",badge:"Afirmación del día",      img:"/cards/c32.png", lines:["Soy","especial"]},
  {id:"M01",n:33,cat:"Mindfulness", badge:"Actividad de mindfulness",img:"/cards/c33.png", lines:["Cierra los ojos.","Imagina un arcoíris","brillando en ti"]},
  {id:"M02",n:34,cat:"Mindfulness", badge:"Actividad de mindfulness",img:"/cards/c34.png", lines:["Busca 5 cosas","que te hagan feliz","y cuéntaselas a mamá"]},
  {id:"M03",n:35,cat:"Mindfulness", badge:"Actividad de mindfulness",img:"/cards/c35.png", lines:["Respira profundo","3 veces, llenando","tu barriga"]},
  {id:"M04",n:36,cat:"Mindfulness", badge:"Actividad de mindfulness",img:"/cards/c36.png", lines:["Abraza fuerte","a quien más amas"]},
  {id:"M05",n:37,cat:"Mindfulness", badge:"Actividad de mindfulness",img:"/cards/c37.png", lines:["Mira al cielo","y cuenta","las nubes"]},
  {id:"M06",n:38,cat:"Mindfulness", badge:"Actividad de mindfulness",img:"/cards/c38.png", lines:["Pon la mano","en tu corazón","y siente latir"]},
  {id:"M07",n:39,cat:"Mindfulness", badge:"Actividad de mindfulness",img:"/cards/c39.png", lines:["Dibuja cómo","te sientes","hoy"]},
  {id:"M08",n:40,cat:"Mindfulness", badge:"Actividad de mindfulness",img:"/cards/c40.png", lines:["Imagina raíces","bajo tus pies.","Eres fuerte"]},
];

const TOTAL = DECK.length;
const CATS  = ["Todas", "Afirmaciones", "Mindfulness"];

// ── FLOATING STARS ────────────────────────────────────────────
function StarsBg() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = ["✦","✧","★","✸","✺"];
    for (let i = 0; i < 28; i++) {
      const s = document.createElement("span");
      s.textContent = chars[Math.floor(Math.random() * chars.length)];
      s.style.left = Math.random() * 100 + "%";
      s.style.top  = (20 + Math.random() * 70) + "%";
      s.style.fontSize = (.28 + Math.random() * .5) + "rem";
      s.style.animationDelay = (Math.random() * 8) + "s";
      s.style.animationDuration = (5 + Math.random() * 6) + "s";
      el.appendChild(s);
    }
  }, []);
  return <div className="stars-bg" ref={ref} />;
}

// ── NAV ───────────────────────────────────────────────────────
function Nav() {
  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector("nav");
      if (nav) nav.style.boxShadow = window.scrollY > 50 ? "0 4px 30px rgba(60,50,40,.1)" : "none";
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav>
      <a className="nav-logo" href="#">Seeds of Light</a>
      <ul className="nav-links">
        <li><a href="#problem">El problema</a></li>
        <li><a href="#guia">El libro</a></li>
        <li><a href="#how">Cómo funciona</a></li>
        <li><a href="#testimonials">Familias</a></li>
        <li><a href="#pricing" className="nav-cta">Conseguir mi mazo</a></li>
      </ul>
    </nav>
  );
}

// ── DECK BOX MOCKUP ───────────────────────────────────────────
function BoxFrontFace() {
  return (
    <div style={{width:"100%",height:"100%",position:"relative",display:"flex",flexDirection:"column",alignItems:"center",padding:"18px 14px 14px"}}>
      {/* Inner gold frame */}
      <div style={{position:"absolute",inset:7,border:"1.5px solid rgba(212,168,92,.45)",borderRadius:4,pointerEvents:"none"}} />

      {/* Brand eyebrow */}
      <div style={{fontFamily:"var(--font-sans)",fontSize:"0.42rem",letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(212,168,92,.95)",marginBottom:5,fontWeight:600}}>✦ Seeds of Light ✦</div>

      {/* Main title */}
      <div style={{fontFamily:"var(--font-serif)",fontSize:"1.18rem",color:"#3C3228",textAlign:"center",lineHeight:1.15,marginBottom:3}}>
        Cartas de <em style={{color:"#D4A090",fontStyle:"italic"}}>Afirmación</em>
      </div>
      <div style={{fontFamily:"var(--font-script)",fontSize:"0.6rem",color:"#A8BFA8",marginBottom:10,textAlign:"center",letterSpacing:"0.05em"}}>Semillas de Luz</div>

      {/* Illustration */}
      <div style={{flex:1,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",minHeight:110,position:"relative"}}>
        <svg viewBox="0 0 200 155" style={{width:"100%",height:"auto"}}>
          {/* Soft glow */}
          <ellipse cx="100" cy="75" rx="55" ry="45" fill="#FFF3D0" opacity="0.6"/>
          {/* Sun */}
          {[0,40,80,120,160,200,240,280,320].map(a=>(
            <line key={a}
              x1={100+35*Math.cos(a*Math.PI/180)} y1={68+35*Math.sin(a*Math.PI/180)}
              x2={100+46*Math.cos(a*Math.PI/180)} y2={68+46*Math.sin(a*Math.PI/180)}
              stroke="#F0C860" strokeWidth="2.2" strokeLinecap="round" opacity="0.7"/>
          ))}
          <circle cx="100" cy="68" r="25" fill="#FADA6A" opacity="0.92"/>
          <circle cx="100" cy="68" r="17" fill="#FEE98A"/>
          <circle cx="93" cy="62" r="2.5" fill="rgba(255,255,255,.5)"/>
          {/* Left branch */}
          <path d="M42 145 C42 125 28 105 34 82" stroke="#8BA870" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
          <path d="M34 100 C22 92 18 78 26 68" stroke="#8BA870" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
          <path d="M34 100 C46 90 44 76 36 66" fill="#A8BFA8" opacity="0.75" stroke="none"/>
          <path d="M42 122 C30 116 24 102 30 90" fill="#B8CFA8" opacity="0.65" stroke="none"/>
          {/* Right branch */}
          <path d="M158 145 C158 125 172 105 166 82" stroke="#8BA870" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
          <path d="M166 100 C178 92 182 78 174 68" stroke="#8BA870" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
          <path d="M166 100 C154 90 156 76 164 66" fill="#A8BFA8" opacity="0.75" stroke="none"/>
          <path d="M158 122 C170 116 176 102 170 90" fill="#B8CFA8" opacity="0.65" stroke="none"/>
          {/* Stars */}
          <text x="24" y="50" fontSize="11" fill="#D4A85C" opacity="0.85">✦</text>
          <text x="162" y="44" fontSize="9" fill="#D4A85C" opacity="0.7">✦</text>
          <text x="175" y="105" fontSize="7" fill="#D4A85C" opacity="0.5">✦</text>
          <text x="16" y="108" fontSize="7" fill="#D4A85C" opacity="0.5">✦</text>
          <text x="95" y="28" fontSize="7" fill="#D4A85C" opacity="0.55">✦</text>
          {/* Flowers */}
          {[[58,112,"#F090A0"],[142,118,"#E8C87C"],[100,138,"#C4B8D8"],[70,95,"#F4B8C0"],[130,92,"#A8D4C0"]].map(([x,y,c],i)=>(
            <g key={i}>
              <circle cx={x} cy={y} r={4.5} fill={c} opacity="0.82"/>
              <circle cx={x} cy={y} r={2} fill="rgba(255,255,255,.75)"/>
            </g>
          ))}
          {/* Ground line */}
          <line x1="15" y1="145" x2="185" y2="145" stroke="#C0A870" strokeWidth="0.8" opacity="0.3"/>
          {/* Small butterflies */}
          <path d="M72 58 C68 52 62 50 62 55 C62 59 68 60 72 58Z" fill="#F4C0D0" opacity="0.7"/>
          <path d="M72 58 C76 52 82 50 82 55 C82 59 76 60 72 58Z" fill="#F4C0D0" opacity="0.7"/>
          <path d="M128 52 C124 46 118 44 118 49 C118 53 124 54 128 52Z" fill="#C8D8F0" opacity="0.65"/>
          <path d="M128 52 C132 46 138 44 138 49 C138 53 132 54 128 52Z" fill="#C8D8F0" opacity="0.65"/>
        </svg>
      </div>

      {/* Product info */}
      <div style={{fontFamily:"var(--font-sans)",fontSize:"0.4rem",letterSpacing:"0.12em",textTransform:"uppercase",color:"#7A6A58",textAlign:"center",lineHeight:1.7,marginBottom:7}}>
        40 Cartas · Español · Edades 3–7<br/>Afirmaciones · Mindfulness
      </div>

      {/* Bottom badge */}
      <div style={{background:"#3C3228",color:"#FAF6F0",fontSize:"0.36rem",letterSpacing:"0.14em",textTransform:"uppercase",padding:"4px 12px",borderRadius:20,fontFamily:"var(--font-sans)",fontWeight:600}}>
        Kit Completo · Digital &amp; Física
      </div>
    </div>
  );
}

function DeckBoxMockup() {
  const W=290, H=385, DX=72, DY=34;

  return (
    <motion.div
      style={{position:"relative",width:W+DX,height:H+DY,flexShrink:0}}
      animate={{y:[0,-14,0]}}
      transition={{duration:4.5,repeat:Infinity,ease:"easeInOut"}}
    >
      {/* Drop shadow */}
      <div style={{
        position:"absolute",bottom:-20,left:DX/2,
        width:W,height:18,
        background:"radial-gradient(ellipse,rgba(60,50,40,.22) 0%,transparent 70%)",
        filter:"blur(10px)",
      }}/>

      {/* TOP face — parallelogram */}
      <div style={{
        position:"absolute",top:0,left:0,
        width:W+DX,height:DY,
        background:"linear-gradient(to bottom right,#FFF9F4,#EFE4D0)",
        clipPath:`polygon(${DX}px 0,${W+DX}px 0,${W}px ${DY}px,0 ${DY}px)`,
        borderTop:"1px solid rgba(212,168,92,.35)",
      }}/>

      {/* RIGHT spine — parallelogram */}
      <div style={{
        position:"absolute",top:0,left:W,
        width:DX,height:H+DY,
        background:"linear-gradient(160deg,#EAC068 0%,#C89040 50%,#A87028 100%)",
        clipPath:`polygon(0 ${DY}px,${DX}px 0,${DX}px ${H}px,0 ${H+DY}px)`,
        display:"flex",alignItems:"center",justifyContent:"center",
      }}>
        <span style={{
          writingMode:"vertical-rl",transform:"rotate(180deg) skewY(-10deg)",
          fontFamily:"var(--font-serif)",fontSize:"0.72rem",
          color:"rgba(255,255,255,.92)",letterSpacing:"0.14em",fontStyle:"italic",
          marginTop:DY,
        }}>Seeds of Light</span>
      </div>

      {/* FRONT face */}
      <div style={{
        position:"absolute",top:DY,left:0,
        width:W,height:H,
        background:"linear-gradient(150deg,#FBF7F1 0%,#F5EDD5 100%)",
        border:"1px solid rgba(212,168,92,.35)",
        borderRadius:"6px 0 0 6px",
        overflow:"hidden",
        boxShadow:"4px 8px 32px rgba(60,50,40,.13)",
      }}>
        <BoxFrontFace />
      </div>
    </motion.div>
  );
}

// ── FLOATING CARD (around box) ────────────────────────────────
const MC_BG = {
  "mc-blush":"linear-gradient(150deg,#FFF5F2,#FFE8E0)",
  "mc-gold": "linear-gradient(150deg,#FFFBF0,#FFF3D0)",
  "mc-sage": "linear-gradient(150deg,#F2F8F2,#E0EEE0)",
  "mc-sky":  "linear-gradient(150deg,#F0F6FF,#DFF0FF)",
  "mc-lav":  "linear-gradient(150deg,#F5F0FF,#EAE0FF)",
};

function FloatCard({ card, style, cls="mc-blush", delay=0, size=1 }) {
  const badge = BADGE_COLORS[card.n % BADGE_COLORS.length];
  const W = Math.round(110*size), H = Math.round(165*size);
  const br = Math.round(14*size);
  return (
    <motion.div
      style={{
        position:"absolute", width:W, height:H,
        background: MC_BG[cls]||"white",
        borderRadius: br,
        border:"1px solid rgba(255,255,255,.9)",
        boxShadow:`0 ${Math.round(10*size)}px ${Math.round(36*size)}px rgba(60,50,40,.14)`,
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        gap:`${.3*size}rem`, padding:`${.9*size}rem ${.6*size}rem`,
        ...style
      }}
      initial={{opacity:0,scale:.8}}
      animate={{opacity:1,scale:1,y:[0,Math.round(-9*size),0]}}
      transition={{opacity:{duration:.6,delay},scale:{duration:.6,delay},y:{duration:3.8+delay,repeat:Infinity,ease:"easeInOut",delay}}}
    >
      <div style={{fontFamily:"var(--font-sans)",fontSize:`${.38*size}rem`,letterSpacing:".15em",textTransform:"uppercase",color:"var(--soft)",textAlign:"center",lineHeight:1.3}}>{card.badge}</div>
      <div style={{width:`${60*size}px`,height:`${52*size}px`,display:"flex",alignItems:"center",justifyContent:"center"}}><CardImg src={card.img}/></div>
      <div style={{fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:`${.52*size}rem`,textAlign:"center",color:"var(--dark)",lineHeight:1.3,padding:`0 ${.2*size}rem`}}>{card.lines.join(" ")}</div>
      <div style={{fontSize:`${.3*size}rem`,color:"var(--gold)",letterSpacing:".1em"}}>✦ ✦ ✦</div>
    </motion.div>
  );
}

// ── HERO ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero">
      <StarsBg />
      <div className="hero-ring" /><div className="hero-ring" /><div className="hero-ring" />

      {/* ── Eyebrow + Title ── */}
      <motion.div className="hero-pre" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
        <span className="star star-sm" />
        <span>Para familias con niños de 3 a 7 años</span>
        <span className="star star-sm" />
      </motion.div>

      <motion.h1 className="hero-title" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.1}}>
        Seeds of <em>Light</em>
      </motion.h1>

      <motion.p className="hero-subtitle-script" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.2}}>
        5 minutos que cambian cómo se siente tu hijo
      </motion.p>

      {/* ── PRODUCT SCENE — the visual anchor ── */}
      <motion.div className="hero-product-scene"
        initial={{opacity:0,y:40,scale:.95}} animate={{opacity:1,y:0,scale:1}}
        transition={{duration:1,delay:.3,ease:[.16,1,.3,1]}}>

        {/* Warm ambient glow */}
        <div className="hero-glow" />

        {/* Floating cards — back layer */}
        <FloatCard card={DECK[3]}  cls="mc-blush" size={1.45} delay={.8}
          style={{top:-20, left:-50, transform:"rotate(-16deg)", zIndex:1}} />
        <FloatCard card={DECK[30]} cls="mc-lav"   size={1.2}  delay={1.4}
          style={{bottom:30, left:-20, transform:"rotate(10deg)", zIndex:1}} />

        {/* Main box */}
        <div style={{position:"relative",zIndex:3}}>
          <DeckBoxMockup />
        </div>

        {/* Floating cards — front layer */}
        <FloatCard card={DECK[5]}  cls="mc-sage" size={1.35} delay={1.0}
          style={{top:10,  right:-55, transform:"rotate(14deg)",  zIndex:4}} />
        <FloatCard card={DECK[33]} cls="mc-sky"  size={1.15} delay={1.6}
          style={{bottom:15, right:-20, transform:"rotate(-8deg)", zIndex:4}} />
      </motion.div>

      {/* ── Description + CTAs ── */}
      <motion.p className="hero-desc" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.7}}>
        Un ritual diario sencillo para que tu hijo crezca sintiéndose seguro, querido y capaz.
        Sin métodos complejos — solo un momento especial entre tú y él, cada día.
      </motion.p>

      <motion.div className="hero-btns" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.85}}>
        <a href="#pricing" className="btn-primary btn-primary-lg">
          <span className="star star-sm" />Comenzar nuestro ritual
        </a>
        <a href="#guia" className="btn-secondary">Ver el libro guía →</a>
      </motion.div>

      <motion.div className="hero-trust" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.8,delay:1.05}}>
        <span>⭐ 4.9 · Más de 1,200 familias</span>
        <span className="trust-dot">·</span>
        <span>Listo en minutos</span>
        <span className="trust-dot">·</span>
        <span>Garantía 30 días</span>
      </motion.div>
    </section>
  );
}

// ── PRODUCT SHOWCASE ─────────────────────────────────────────
function CardFan({ cards, rotate = [-20, 0, 20], cls = ["mc-blush","mc-gold","mc-sage"] }) {
  return (
    <div style={{position:"relative",width:280,height:320,flexShrink:0}}>
      {/* Soft glow beneath cards */}
      <div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:200,height:40,background:"radial-gradient(ellipse,rgba(212,168,92,.18) 0%,transparent 70%)",filter:"blur(10px)"}}/>
      {cards.map((card, i) => {
        const angle = rotate[i] ?? 0;
        const bgCls = cls[i] ?? "mc-blush";
        const bgMap = {"mc-blush":"linear-gradient(160deg,#FFF5F2,#FFE8E0)","mc-gold":"linear-gradient(160deg,#FFFBF0,#FFF3D0)","mc-sage":"linear-gradient(160deg,#F2F8F2,#E0EEE0)","mc-sky":"linear-gradient(160deg,#F0F6FF,#DFF0FF)","mc-lav":"linear-gradient(160deg,#F5F0FF,#EAE0FF)"};
        const badge = BADGE_COLORS[card.n % BADGE_COLORS.length];
        return (
          <div key={card.id} style={{
            position:"absolute",bottom:0,left:"50%",
            width:160,height:220,
            background:bgMap[bgCls]||bgMap["mc-blush"],
            borderRadius:18,
            border:"1px solid rgba(255,255,255,.8)",
            boxShadow:"0 12px 40px rgba(60,50,40,.14)",
            transform:`translateX(-50%) rotate(${angle}deg)`,
            transformOrigin:"center bottom",
            display:"flex",flexDirection:"column",alignItems:"center",padding:"16px 12px 14px",gap:8,
            zIndex: i === 1 ? 2 : 1,
          }}>
            <span style={{background:badge.bg,color:badge.text,fontSize:8,fontWeight:700,padding:"3px 10px",borderRadius:99,letterSpacing:"0.04em",textAlign:"center"}}>{card.badge}</span>
            <div style={{flex:1,width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <img src={card.img} alt="" style={{width:"80%",height:"auto",objectFit:"contain"}}/>
            </div>
            <p style={{fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:"0.75rem",color:"#3C3228",textAlign:"center",lineHeight:1.35,margin:0}}>
              {card.lines.join(" ")}
            </p>
            <div style={{fontSize:"0.32rem",color:"var(--gold)",letterSpacing:"0.1em"}}>✦ ✦ ✦</div>
          </div>
        );
      })}
    </div>
  );
}

function FlatLayCard({ card, style }) {
  const badge = BADGE_COLORS[card.n % BADGE_COLORS.length];
  return (
    <div style={{
      position:"absolute",
      width:130,height:178,
      background:"white",
      borderRadius:14,
      boxShadow:"0 6px 24px rgba(60,50,40,.13)",
      display:"flex",flexDirection:"column",alignItems:"center",padding:"12px 10px 10px",gap:6,
      ...style,
    }}>
      <span style={{background:badge.bg,color:badge.text,fontSize:7.5,fontWeight:700,padding:"3px 8px",borderRadius:99,letterSpacing:"0.04em",textAlign:"center",whiteSpace:"nowrap"}}>{card.badge}</span>
      <div style={{flex:1,width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img src={card.img} alt="" style={{width:"85%",height:"auto",objectFit:"contain"}}/>
      </div>
      <p style={{fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:"0.62rem",color:"#3C3228",textAlign:"center",lineHeight:1.3,margin:0}}>
        {card.lines.join(" ")}
      </p>
    </div>
  );
}

function ProductShowcaseSection() {
  const fanCards  = [DECK[14], DECK[0], DECK[25]];
  const layCards  = [
    { card: DECK[5],  style:{ top:30,  left:"5%",  rotate:"-12deg", scale:"0.88" }},
    { card: DECK[11], style:{ top:20,  left:"22%", rotate:"4deg",   scale:"1"    }},
    { card: DECK[2],  style:{ top:60,  left:"40%", rotate:"-6deg",  scale:"1.05" }},
    { card: DECK[18], style:{ top:15,  left:"57%", rotate:"9deg",   scale:"0.93" }},
    { card: DECK[30], style:{ top:40,  left:"73%", rotate:"-3deg",  scale:"0.97" }},
    { card: DECK[37], style:{ top:25,  right:"1%", rotate:"7deg",   scale:"0.9"  }},
  ];

  return (
    <section id="showcase" style={{background:"var(--cream)",padding:"0 0 5rem"}}>

      {/* ── ROW 1: Fan + copy ── */}
      <div className="showcase-grid section-inner">
        <motion.div className="showcase-fan reveal"
          initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8}}>
          <div style={{position:"relative",display:"inline-block"}}>
            <CardFan cards={fanCards} rotate={[-22,0,22]} cls={["mc-blush","mc-gold","mc-sage"]}/>
            {/* decorative hand-holding hint */}
            <div style={{position:"absolute",bottom:-20,left:"50%",transform:"translateX(-50%)",width:120,height:30,background:"linear-gradient(to top,rgba(212,168,92,.12),transparent)",borderRadius:"50%",filter:"blur(6px)"}}/>
          </div>
        </motion.div>

        <motion.div className="showcase-copy reveal reveal-delay-2"
          initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8,delay:.2}}>
          <div className="section-tag"><span className="star star-sm"/>Diseñadas para ser suyas</div>
          <h2 style={{marginBottom:"1.2rem"}}>Para que las <em style={{color:"var(--blush-deep)"}}>elijan, toquen y guarden</em> como un tesoro</h2>
          <p style={{color:"var(--mid)",marginBottom:"1.4rem"}}>Cada carta es un objeto pensado para durar años — no un PDF olvidado en el móvil. Tu hijo las tendrá en sus manos, las elegirá, las sentirá suyas.</p>
          <ul className="showcase-list">
            <li><span className="sc-dot" style={{background:"#F090A0"}}/>Calidad de impresión premium, lista para regalar</li>
            <li><span className="sc-dot" style={{background:"#A8BFA8"}}/>Tamaño perfecto para manos pequeñas</li>
            <li><span className="sc-dot" style={{background:"#D4A85C"}}/>Ilustraciones suaves — sin estimulación excesiva</li>
            <li><span className="sc-dot" style={{background:"#C4B8D8"}}/>También disponible en PDF para empezar hoy</li>
            <li><span className="sc-dot" style={{background:"#60B8E0"}}/>32 palabras de confianza + 8 herramientas de calma</li>
          </ul>
        </motion.div>
      </div>

      {/* ── ROW 2: Flat-lay ── */}
      <motion.div className="flatlay-wrap reveal"
        initial={{opacity:0,y:50}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.9,delay:.1}}>
        <div className="flatlay-bg">
          {/* Decorative pencils SVG */}
          <svg className="flatlay-deco" viewBox="0 0 80 200" style={{position:"absolute",left:0,top:0,width:50,opacity:.5}}>
            {[["#F4D060","#E0A020"],["#88CCA0","#50A870"],["#90C8E8","#50A0D0"]].map(([c1,c2],i)=>(
              <g key={i} transform={`translate(${10+i*22},${10+i*18}) rotate(${-10+i*8})`}>
                <rect x="-5" y="0" width="10" height="70" rx="3" fill={c1}/>
                <polygon points="0,-10 -5,0 5,0" fill={c2}/>
                <rect x="-5" y="70" width="10" height="12" rx="2" fill="#F0E0D0"/>
              </g>
            ))}
          </svg>

          {/* Scattered cards */}
          {layCards.map(({card,style},i)=>(
            <FlatLayCard key={card.id} card={card} style={{
              transform:`rotate(${style.rotate}) scale(${style.scale})`,
              top:style.top, left:style.left, right:style.right,
            }}/>
          ))}

          {/* Quote overlay */}
          <div className="flatlay-quote">
            <span className="star star-md"/>
            <p>"Las cartas se convirtieron en nuestro ritual favorito de la tarde."</p>
            <span style={{fontSize:".7rem",color:"var(--soft)",letterSpacing:".08em"}}>— Valentina, mamá de Emilio, 5 años</span>
          </div>

          {/* Decorative stars */}
          {[[90,"12%"],[82,"78%"],[95,"45%"]].map(([t,l],i)=>(
            <span key={i} style={{position:"absolute",top:t,left:l,color:"var(--gold)",fontSize:i===2?"1rem":".7rem",opacity:.5}}>✦</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ── PROBLEM ───────────────────────────────────────────────────
function ProblemSection() {
  return (
    <section id="problem">
      <div className="section-inner">
        <div className="problem-grid">
          <div className="problem-text reveal">
            <div className="section-tag"><span className="star star-sm" />Algo que muchas familias sienten</div>
            <h2>¿Tu hijo o hija tiene explosiones emocionales que no sabes cómo calmar?</h2>
            <p>Las niñas y niños de 3 a 7 años viven en un estado de emociones gigantes dentro de un cuerpo pequeño. No es que sean difíciles — es que todavía no tienen las herramientas para gestionar lo que sienten.</p>
            <p>Quieres ayudarle. Pero los recursos no siempre son accesibles o cálidos.</p>
            <ul className="problem-list">
              <li><div className="icon"><Ico name="burst"     color="#C05030" /></div><span>Rabietas que parecen salir de la nada y no sabes cómo responder</span></li>
              <li><div className="icon"><Ico name="moonCloud" color="#7090B0" /></div><span>Miedos nocturnos, ansiedad de separación, inseguridad constante</span></li>
              <li><div className="icon"><Ico name="speechX"   color="#B06070" /></div><span>Frases como "no puedo", "soy malo", "nadie me quiere"</span></li>
              <li><div className="icon"><Ico name="moonZ"     color="#8070A0" /></div><span>Noches difíciles donde el sueño no llega y la mente no para</span></li>
            </ul>
          </div>
          <div className="problem-visual reveal reveal-delay-2">
            <div className="quote-card">
              <p>"Miraba a mi hija llorar y no sabía qué decirle. Quería darle algo real, no solo palabras vacías."</p>
              <div className="quote-author">— Sofía, mamá de Lucía, 4 años</div>
            </div>
            <div className="quote-card">
              <p>"Mi hijo se quedaba paralizado cuando se sentía mal. No tenía ninguna herramienta para salir de ahí."</p>
              <div className="quote-author">— María José, mamá de Tomás, 6 años</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SOLUTION / BENEFITS ───────────────────────────────────────
function SolutionSection() {
  const benefits = [
    { icon:"butterfly",  icoColor:"#C05080", title:"Confianza que crece",      desc:"Afirmaciones diseñadas por psicólogos infantiles para construir autoestima real desde pequeños.",          cls:"bc-blush", iconCls:"bi-blush" },
    { icon:"leaf",       icoColor:"#4A7A50", title:"Calma en momentos difíciles",desc:"Técnicas de regulación emocional convertidas en actividades simples que niñas y niños PUEDEN hacer.",           cls:"bc-sage",  iconCls:"bi-sage"  },
    { icon:"heartPair",  icoColor:"#4080A0", title:"Conexión familiar",         desc:"Un ritual compartido que fortalece el vínculo y crea recuerdos hermosos juntos.",                           cls:"bc-sky",   iconCls:"bi-sky"   },
    { icon:"heartFlower",icoColor:"#8060A8", title:"Amor propio auténtico",     desc:"No es vanidad — es enseñarle que merecen ser amados exactamente como son.",                                 cls:"bc-lav",   iconCls:"bi-lav"   },
    { icon:"starShine",  icoColor:"#A07820", title:"Gratitud que transforma",   desc:"La ciencia lo confirma: quienes practican gratitud desde pequeños son más felices y resilientes.",           cls:"bc-gold",  iconCls:"bi-gold"  },
    { icon:"moonStar",   icoColor:"#506080", title:"Sueño más tranquilo",       desc:"Rituales de relajación para la noche que ayudan a niñas y niños a soltar el día y dormir en paz.",          cls:"bc-cream", iconCls:"bi-cream" },
  ];
  return (
    <section id="solution">
      <div className="section-inner">
        <div className="solution-header reveal">
          <span className="eyebrow">la solución</span>
          <h2>Un ritual de 5 minutos<br/>que tu hijo recordará siempre</h2>
          <p>Seeds of Light es un kit familiar diseñado para crear un momento de conexión, calma y confianza entre tú y tu hijo — cada día, sin esfuerzo.</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <div key={i} className={`benefit-card ${b.cls} reveal reveal-delay-${(i % 3) + 1}`}>
              <div className={`benefit-icon ${b.iconCls}`}><Ico name={b.icon} size={30} color={b.icoColor} /></div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CARD (gallery item) ───────────────────────────────────────
function Card({ card, idx, onClick }) {
  const badge = BADGE_COLORS[idx % BADGE_COLORS.length];
  const num   = String(card.n).padStart(2,"0");
  const tot   = String(TOTAL).padStart(2,"0");
  return (
    <motion.div layout
      initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:0.92}}
      transition={{duration:0.24, delay:Math.min(idx*0.03,0.55)}}
      whileHover={{y:-10, transition:{duration:0.17}}}
      onClick={()=>onClick(card)} style={{cursor:"pointer"}}
    >
      <div className="show-card">
        <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>
          <span style={{background:badge.bg,color:badge.text,fontSize:9,fontWeight:700,padding:"4px 11px",borderRadius:99,letterSpacing:"0.03em",whiteSpace:"nowrap"}}>
            {card.badge}
          </span>
        </div>
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 6px",overflow:"hidden"}}>
          <div style={{width:"90%",maxHeight:"100%"}}><CardImg src={card.img} /></div>
        </div>
        <p style={{fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:"clamp(0.82rem,2.4vw,1.05rem)",color:"#5A3D30",textAlign:"center",lineHeight:1.3,margin:"10px 4px 4px"}}>
          {card.lines.join(" ")}
        </p>
        <p style={{fontSize:9,color:"#C0AFA0",textAlign:"right",margin:"2px 4px 0",letterSpacing:"0.08em",fontFamily:"var(--font-sans)"}}>
          {num} / {tot}
        </p>
      </div>
    </motion.div>
  );
}


// ── CARD STRIP ────────────────────────────────────────────────
const STRIP_IDS = ["A01","A04","A08","A13","A20","A26"];

function CardStrip({ onSel }) {
  const cards = DECK.filter(c => STRIP_IDS.includes(c.id));
  return (
    <section id="cartas" style={{padding:"3.5rem 0 3rem", background:"var(--cream)"}}>
      <div style={{textAlign:"center",marginBottom:"2rem",padding:"0 1.5rem"}}>
        <span className="label">Una muestra — 6 de 40</span>
        <h2 style={{fontFamily:"var(--font-serif)",fontSize:"clamp(1.6rem,3.5vw,2.4rem)",marginTop:".5rem",marginBottom:".6rem"}}>
          Palabras que construyen <em style={{color:"var(--blush-deep)"}}>confianza y seguridad</em>
        </h2>
        <p style={{color:"var(--mid)",fontSize:".95rem",maxWidth:460,margin:"0 auto"}}>
          Toca cualquier carta para leerla. El kit completo incluye 40 — cada una, un momento diferente.
        </p>
      </div>
      <div className="deck-strip-wrap">
        <div className="deck-strip">
          {cards.map((c, i) => {
            const badge = BADGE_COLORS[i % BADGE_COLORS.length];
            return (
              <div key={c.id} className="deck-strip-card" onClick={() => onSel(c)}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:8}}>
                  <span style={{background:badge.bg,color:badge.text,fontSize:8,fontWeight:700,padding:"3px 10px",borderRadius:99,letterSpacing:"0.03em",whiteSpace:"nowrap"}}>
                    {c.badge}
                  </span>
                </div>
                <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px"}}>
                  <CardImg src={c.img} />
                </div>
                <p style={{fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:".88rem",color:"#5A3D30",textAlign:"center",lineHeight:1.3,marginTop:8}}>
                  {c.lines.join(" ")}
                </p>
              </div>
            );
          })}
          {/* Locked cards */}
          {[0,1].map(i => (
            <div key={`lock-${i}`} className="deck-strip-card deck-strip-locked">
              <div style={{display:"flex",justifyContent:"center",marginBottom:8}}>
                <span style={{background:"rgba(120,100,80,.1)",color:"var(--soft)",fontSize:8,fontWeight:700,padding:"3px 10px",borderRadius:99,letterSpacing:"0.03em"}}>
                  En el kit
                </span>
              </div>
              <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8}}>
                <span style={{fontSize:"1.4rem",opacity:.35}}>🔒</span>
                <p style={{fontFamily:"var(--font-sans)",fontSize:".68rem",color:"var(--soft)",textAlign:"center",letterSpacing:".04em"}}>
                  Disponible con<br/>el kit completo
                </p>
              </div>
              <p style={{fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:".7rem",color:"var(--soft)",textAlign:"center",lineHeight:1.3,marginTop:8,opacity:.5}}>
                · · ·
              </p>
            </div>
          ))}
        </div>
      </div>
      <div style={{textAlign:"center",marginTop:"2rem",display:"flex",flexDirection:"column",alignItems:"center",gap:".75rem"}}>
        <p style={{fontSize:".8rem",color:"var(--soft)",letterSpacing:".06em"}}>
          🔒 &nbsp;34 palabras más esperan en el kit completo
        </p>
        <a href="#pricing" className="btn-primary" style={{display:"inline-flex"}}>
          <span className="star star-sm" />Ver el kit completo
        </a>
      </div>
    </section>
  );
}

// ── GUIA PREVIEW ─────────────────────────────────────────────
const GUIDE_PAGES = [
  {
    n:"01", cat:"Afirmación", dotColor:"#D49090",
    img:"/cards/c01.png",
    title:"El espejo del amor",
    affirmation:["Soy amado","y valorado"],
    questions:[
      "¿Cómo le recordaste hoy que es amado, sin palabras?",
      "¿De quién aprendiste tú a sentirte amado?",
    ],
    age:"3 – 9 años", time:"~ 2 min", page:9,
  },
  {
    n:"02", cat:"Afirmación", dotColor:"#D49090",
    img:"/cards/c02.png",
    title:"Lugar seguro",
    affirmation:["Eres mi","lugar seguro"],
    questions:[
      "¿Qué hace de tu regazo un refugio?",
      "Cierra los ojos: ¿quién es tu lugar seguro?",
    ],
    age:"3 – 9 años", time:"~ 3 min", page:10,
  },
];

function BookPage({ p, side }) {
  const radius = side === "left"
    ? { borderRadius:"12px 0 0 12px" }
    : { borderRadius:"0 12px 12px 0" };
  return (
    <div className="book-page" style={radius}>
      <div className="book-page-header">
        <span className="book-cat">
          <span style={{display:"inline-block",width:8,height:8,borderRadius:"50%",background:p.dotColor,marginRight:6,verticalAlign:"middle"}} />
          {p.cat.toUpperCase()}
        </span>
        <span className="book-carta"><em>Carta {p.n} / 40</em></span>
      </div>

      <div className="book-illo">
        <img src={p.img} alt="" style={{width:"100%",height:"100%",objectFit:"contain"}} />
      </div>

      <h3 className="book-title"><em>{p.title}</em></h3>
      <p className="book-affirmation">
        {p.affirmation.map((l, i) => <span key={i}>{l}{i < p.affirmation.length - 1 && <br/>}</span>)}
      </p>

      <hr className="book-divider" />

      <p className="book-section-label">Para conversar juntos</p>
      <ul className="book-questions">
        {p.questions.map((q, i) => <li key={i}>{q}</li>)}
      </ul>

      <div className="book-footer">
        <span>Edad · {p.age}</span>
        <span>{p.time}</span>
      </div>
      <p className="book-pagenum">{p.page}</p>
    </div>
  );
}

function GuiaSection() {
  return (
    <section id="guia" style={{padding:"5rem 0", background:"var(--cream-deep)"}}>
      <div className="section-inner">
        <div className="reveal" style={{textAlign:"center",marginBottom:"3rem"}}>
          <span className="eyebrow">el libro guía</span>
          <h2>Guía para acompañar emociones difíciles<br/>y fortalecer la conexión familiar</h2>
          <p style={{color:"var(--mid)",maxWidth:520,margin:".8rem auto 0"}}>
            Cada página tiene preguntas para conversar juntos, actividades de conexión y orientación para ti como madre o padre.
          </p>
        </div>

        <div className="book-spread reveal reveal-delay-1">
          <div className="book-spine" />
          <BookPage p={GUIDE_PAGES[0]} side="left" />
          <BookPage p={GUIDE_PAGES[1]} side="right" />
        </div>

        <div style={{textAlign:"center",marginTop:"2.5rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"}}>
          <p style={{display:"flex",alignItems:"center",gap:".5rem",color:"var(--mid)",fontSize:".9rem"}}>
            <Ico name="openBook" size={18} color="var(--soft)" />
            <span>🔒 &nbsp;El libro completo — incluido en tu kit</span>
          </p>
          <a href="#pricing" className="btn-primary">
            <span className="star star-sm" />Incluir el libro en mi kit
          </a>
        </div>
      </div>
    </section>
  );
}

// ── MOMENTOS ──────────────────────────────────────────────────
function MomentosSection() {
  const moments = [
    { icon:"moonLg",  icoColor:"#7060A0", time:"Antes de dormir",    desc:"Elige una carta juntos, léela en voz alta y hazla parte del ritual nocturno. Las rabietas antes de dormir se reducen casi por completo.", color:"rgba(196,184,216,.25)" },
    { icon:"carLg",   icoColor:"#4080A0", time:"En el coche",        desc:"Sin pantallas, sin ruido. Una carta en el asiento trasero convierte el trayecto en un momento de conexión real.", color:"rgba(184,212,232,.25)" },
    { icon:"plateLg", icoColor:"#C07040", time:"Durante la cena",    desc:"\"¿Cuál es tu carta favorita esta semana?\" Esa pregunta abre conversaciones que no sabías que necesitabas tener.", color:"rgba(232,196,184,.25)" },
    { icon:"sunLg",   icoColor:"#B08020", time:"Después del colegio",desc:"Cuando llega cargado de emociones del día, una carta le da lenguaje para lo que siente antes de que explote.", color:"rgba(168,191,168,.25)" },
  ];
  return (
    <section id="momentos" style={{padding:"5rem 0",background:"var(--cream-deep)"}}>
      <div className="section-inner">
        <div className="reveal" style={{textAlign:"center",marginBottom:"3rem"}}>
          <span className="eyebrow">un momento especial</span>
          <h2>En cualquier parte de tu día,<br/>hay espacio para <em style={{color:"var(--blush-deep)"}}>conectar</em></h2>
          <p style={{color:"var(--mid)",maxWidth:520,margin:".8rem auto 0"}}>
            No necesitas un ritual complicado. Solo necesitas un momento — y una palabra que llegue al corazón.
          </p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1.5rem"}}>
          {moments.map((m, i) => (
            <div key={i} className={`reveal reveal-delay-${i+1}`} style={{background:m.color,border:"1px solid rgba(120,90,70,.1)",borderRadius:20,padding:"2rem 1.5rem",textAlign:"center"}}>
              <div style={{marginBottom:"1rem",display:"flex",justifyContent:"center"}}><Ico name={m.icon} size={48} color={m.icoColor} /></div>
              <h3 style={{fontSize:"1.1rem",marginBottom:".6rem",color:"var(--dark)"}}>{m.time}</h3>
              <p style={{fontSize:".88rem",color:"var(--mid)",lineHeight:1.6}}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── APRENDE ───────────────────────────────────────────────────
function AprenderSection() {
  const child = [
    "Sentirse seguro y querido — todos los días",
    "Encontrar palabras para lo que siente",
    "Calmarse cuando está desbordado o asustado",
    "Crecer con una autoestima construida desde adentro",
    "Aprender a agradecer — y disfrutar más",
    "Tener herramientas propias para sus emociones",
  ];
  const mama = [
    "Saber qué decirle cuando no encuentras las palabras",
    "Momentos de conexión real — sin esfuerzo ni planificación",
    "Menos tensión emocional en el día a día",
    "Actividades listas en segundos, para cualquier momento",
    "Más seguridad acompañando sus emociones difíciles",
    "Un vínculo más profundo que dura toda su vida",
  ];
  return (
    <section id="aprende" style={{padding:"5rem 0"}}>
      <div className="section-inner">
        <div className="reveal" style={{textAlign:"center",marginBottom:"3rem"}}>
          <span className="eyebrow">lo que cambia</span>
          <h2>Lo que gana tu hijo. Lo que ganas tú.</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"2.5rem"}}>
          <div className="reveal reveal-delay-1">
            <h3 style={{fontSize:"1.4rem",marginBottom:"1.2rem",color:"var(--blush-deep)"}}>Tu hijo gana cada día</h3>
            <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".8rem"}}>
              {child.map((item, i) => (
                <li key={i} style={{display:"flex",gap:".75rem",alignItems:"flex-start",fontSize:".92rem",color:"var(--dark)"}}>
                  <span style={{color:"var(--gold)",fontSize:"1rem",marginTop:"2px",flexShrink:0}}>✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal reveal-delay-2">
            <h3 style={{fontSize:"1.4rem",marginBottom:"1.2rem",color:"var(--sage)"}}>Tú como familia ganas</h3>
            <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".8rem"}}>
              {mama.map((item, i) => (
                <li key={i} style={{display:"flex",gap:".75rem",alignItems:"flex-start",fontSize:".92rem",color:"var(--dark)"}}>
                  <span style={{color:"var(--sage)",fontSize:"1rem",marginTop:"2px",flexShrink:0}}>✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── HOW IT WORKS ──────────────────────────────────────────────
function HowSection() {
  const calmCard = DECK[5]; // turtle — "Respiro paz y calma"
  const steps = [
    { n:"1", title:"Elige una carta juntos",      text:"Cada mañana o noche, tu hijo o hija elige la carta que le llama. Ese pequeño gesto ya es magia." },
    { n:"2", title:"Léela en voz alta",            text:"La afirmación entra por los oídos y se instala en el corazón. Répetela junto a él." },
    { n:"3", title:"Haz la actividad (si hay una)",text:"Algunas cartas traen micro-actividades de 2 minutos: respirar, dibujar, abrazar, agradecer." },
    { n:"4", title:"Guárdala como tesoro",         text:"Las cartas quedan en casa. Tu hijo puede volver a la que necesita en cualquier momento." },
  ];
  return (
    <section id="how">
      <div className="section-inner">
        <div className="how-grid">
          <div>
            <span className="label">cómo funciona</span>
            <h2 style={{fontSize:"clamp(2rem,4vw,3rem)",margin:".6rem 0 2rem"}}>
              Un ritual simple.<br/>Un impacto <em style={{fontStyle:"italic",color:"var(--blush-deep)"}}>profundo.</em>
            </h2>
            <div className="how-steps">
              {steps.map((s, i) => (
                <div key={i} className={`how-step reveal reveal-delay-${i}`}>
                  <div className="step-number">{s.n}</div>
                  <div className="step-content"><h4>{s.title}</h4><p>{s.text}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="how-visual reveal reveal-delay-2">
            <div className="bg-card-2" /><div className="bg-card-3" />
            <div className="big-card">
              <div className="big-card-label">✦ {calmCard.badge} ✦</div>
              <div style={{width:100}}><CardImg src={calmCard.img} /></div>
              <div className="big-card-text">{calmCard.lines.join(" ")}</div>
              <div className="big-card-stars">✦ ✦ ✦ ✦ ✦</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PRICING ───────────────────────────────────────────────────
function KitContents({ includePhysical }) {
  const digital = [
    { icon:"cardDeck",   icoColor:"#7A5A30", label:"Kit de conexión familiar",  sub:"40 palabras que construyen confianza y calma" },
    { icon:"openBook",   icoColor:"#6A7A50", label:"Libro guía completo",        sub:"Para acompañar emociones difíciles juntos" },
    { icon:"papers",     icoColor:"#507090", label:"Hojas de actividades",       sub:"Para explorar sentimientos en familia" },
    { icon:"moonRitual", icoColor:"#706090", label:"Ritual nocturno guiado",     sub:"Un momento de calma antes de dormir" },
  ];
  return (
    <ul className="price-features" style={{gap:".95rem"}}>
      {includePhysical && (
        <>
          <li><span className="check">✦</span> <strong>40 cartas impresas</strong> en cartulina premium mate</li>
          <li><span className="check">✦</span> Caja preciosa lista para regalar</li>
        </>
      )}
      {digital.map((d, i) => (
        <li key={i} style={{display:"flex",gap:".6rem",alignItems:"flex-start"}}>
          <Ico name={d.icon} size={22} color={d.icoColor} />
          <span><strong style={{display:"block",lineHeight:1.2}}>{d.label}</strong><span style={{fontSize:".78rem",color:"var(--soft)"}}>{d.sub}</span></span>
        </li>
      ))}
    </ul>
  );
}

function PricingSection() {
  return (
    <section id="pricing">
      <div className="section-inner">
        <div className="pricing-header reveal">
          <span className="label">lo que recibe tu familia</span>
          <h2>Un kit pensado para crear<br/>un ritual que dure años</h2>
          <p>No es un PDF que olvidarás. Es una experiencia familiar diseñada para usarse cada día, en cada etapa de la infancia.</p>
        </div>
        <div className="pricing-grid">
          <div className="price-card reveal reveal-delay-1">
            <div className="price-type">kit digital</div>
            <h3>Kit Completo Digital</h3>
            <div className="price-amount"><span>$</span>14<span style={{fontSize:".9rem",opacity:.5}}>.99</span></div>
            <KitContents includePhysical={false} />
            <a href="#" className="btn-price btn-price-dark">Comenzar nuestro ritual</a>
          </div>
          <div className="price-card featured reveal reveal-delay-2">
            <div className="price-badge">✦ El más elegido</div>
            <div className="price-type">kit físico + digital</div>
            <h3>Kit Premium Completo</h3>
            <div className="price-amount"><span>$</span>38<span style={{fontSize:".9rem",opacity:.5}}>.99</span></div>
            <KitContents includePhysical={true} />
            <a href="#" className="btn-price btn-price-light">Quiero el kit para mi familia</a>
          </div>
        </div>
        <p style={{textAlign:"center",marginTop:"1.5rem",fontSize:".8rem",color:"var(--soft)"}}>
          ✦ Garantía de amor: si no te encanta, te devolvemos tu dinero en 30 días ✦
        </p>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────
function TestimonialsSection() {
  const list = [
    { stars:"★★★★★", text:'"Mi hija de 5 años pide su carta cada mañana antes de ir al colegio. Noto cómo ha crecido su seguridad. No sabía que un ritual tan sencillo pudiera cambiar tanto el ambiente en casa."', initials:"AB", color:"#E8C4B8", name:"Ana Belén R.", role:"Mamá de Emma, 5 años · Madrid" },
    { stars:"★★★★★", text:'"El kit físico es precioso — digno de regalo. Mi hijo lo tiene en su mesita y lo elige solo. Ha sido la herramienta más cálida que encontré para acompañar sus emociones."', initials:"CM", color:"#C6DEC8", name:"Carla M.", role:"Mamá de Marcos, 6 años · Buenos Aires" },
    { stars:"★★★★★", text:'"Lo usamos como ritual nocturno y las noches difíciles se transformaron. Mi hijo ya sabe buscar su carta cuando se siente mal. No puedo explicar el alivio que eso me da."', initials:"VT", color:"#C8C0DC", name:"Valeria T.", role:"Mamá de Simón, 4 años · Ciudad de México" },
  ];
  return (
    <section id="testimonials">
      <div className="section-inner">
        <div className="testimonials-header reveal">
          <span className="label">familias que ya lo viven</span>
          <h2>Lo que sienten las familias<br/>que ya lo tienen</h2>
        </div>
        <div className="testimonials-grid">
          {list.map((t, i) => (
            <div key={i} className={`testimonial-card reveal reveal-delay-${i+1}`}>
              <div className="testi-stars">{t.stars}</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className="testi-avatar" style={{background:t.color,color:"rgba(60,50,40,.7)",fontFamily:"var(--font-sans)",fontWeight:600,fontSize:".75rem",letterSpacing:".04em"}}>{t.initials}</div>
                <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────
function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const faqs = [
    { q:"¿Para qué edades son las cartas?",           a:"Las cartas están diseñadas para niñas y niños de 3 a 7 años, aunque muchas familias las usan hasta los 9-10 con excelentes resultados. El lenguaje es simple, visual y emocional — accesible para las mentes pequeñas y hermoso para las grandes." },
    { q:"¿Necesito impresora de buena calidad?",       a:"No necesariamente. El PDF está optimizado para verse hermoso incluso en impresoras domésticas estándar. También puedes llevarlo a cualquier copistería. El resultado es igualmente precioso." },
    { q:"¿Cuánto tiempo al día debo dedicarle?",       a:"Con 5 minutos al día es suficiente para empezar a ver cambios. Muchas familias eligen una carta por la mañana o como ritual nocturno. No hay reglas — adapta las cartas a tu ritmo y al de tus hijos." },
    { q:"¿Funcionan si mi hijo tiene necesidades especiales?", a:"Las cartas han sido especialmente bien recibidas por familias con niños con TEA, TDAH y alta sensibilidad. El formato visual y el lenguaje simple las hace muy accesibles. Consulta con tu profesional si tienes dudas específicas." },
    { q:"¿Puedo regalarlas?", a:"Son uno de los regalos más especiales que puedes hacer. La versión física viene en una caja preciosa lista para regalar. La versión PDF incluye un certificado de regalo digital que puedes enviar por email o imprimir." },
  ];
  return (
    <section id="faq">
      <div className="section-inner">
        <div className="faq-header reveal">
          <span className="label">preguntas frecuentes</span>
          <h2>Todo lo que quieres saber</h2>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item reveal reveal-delay-${i % 4} ${openIdx === i ? "open" : ""}`}>
              <button className="faq-question" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {f.q}<span className="faq-arrow">▼</span>
              </button>
              <div className="faq-answer"><div className="faq-answer-inner">{f.a}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="cta">
      <div className="cta-ring" /><div className="cta-ring" />
      <div className="section-inner">
        <div className="cta-star-row">
          <span className="star star-md" style={{color:"rgba(250,246,240,.3)"}} />
          <span className="star star-lg" style={{color:"rgba(250,246,240,.5)"}} />
          <span className="star star-md" style={{color:"rgba(250,246,240,.3)"}} />
        </div>
        <span className="eyebrow">un regalo para tu familia</span>
        <h2>El momento de conexión<br/>que tu hijo está esperando</h2>
        <p>No necesitas ser perfecto como madre o padre. Solo necesitas este pequeño momento — y Seeds of Light hace el resto.</p>
        <div className="hero-btns">
          <a href="#pricing" className="btn-primary" style={{background:"var(--cream)",color:"var(--dark)"}}>
            <span style={{color:"var(--gold)"}}>✦</span>Comenzar nuestro ritual
          </a>
          <a href="#guia" className="btn-secondary" style={{borderColor:"rgba(250,246,240,.3)",color:"rgba(250,246,240,.7)"}}>
            Ver el libro guía
          </a>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <span className="footer-logo">Seeds of Light</span>
      <p>© 2025 Seeds of Light · Hecho con amor para las familias del mundo</p>
      <p style={{marginTop:".5rem"}}>contacto@seedsoflight.com &nbsp;·&nbsp; Etsy &nbsp;·&nbsp; Instagram</p>
    </footer>
  );
}

// ── CARD MODAL ────────────────────────────────────────────────
function CardModal({ card, onClose }) {
  const badge = BADGE_COLORS[card.n % BADGE_COLORS.length];
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:"fixed",inset:0,background:"rgba(60,40,30,.65)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:20}}
      onClick={onClose}
    >
      <motion.div initial={{scale:0.84,y:30}} animate={{scale:1,y:0}} exit={{scale:0.88}}
        transition={{type:"spring",stiffness:300,damping:26}}
        onClick={e=>e.stopPropagation()}
        style={{width:"min(340px,90vw)",background:"white",borderRadius:28,boxShadow:"0 40px 100px rgba(0,0,0,.25)",overflow:"hidden",position:"relative"}}
      >
        <button onClick={onClose} style={{position:"absolute",top:12,right:12,background:"rgba(0,0,0,.08)",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:14,color:"#5C3A10",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>✕</button>
        <div style={{padding:"32px 24px 28px",display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
          <span style={{background:badge.bg,color:badge.text,fontSize:10,fontWeight:700,padding:"5px 16px",borderRadius:99,letterSpacing:"0.04em"}}>{card.badge}</span>
          <div style={{width:160}}><CardImg src={card.img} /></div>
          <p style={{fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:"1.35rem",color:"#3A2820",textAlign:"center",lineHeight:1.4,margin:0}}>
            {card.lines.join(" ")}
          </p>
          <p style={{fontSize:11,color:"#C0AFA0",letterSpacing:"0.08em"}}>
            {String(card.n).padStart(2,"0")} / {String(TOTAL).padStart(2,"0")}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── SCROLL REVEAL ─────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: .12 });
    els.forEach(r => obs.observe(r));
    return () => obs.disconnect();
  }, []);
}

// ── APP ───────────────────────────────────────────────────────
export default function App() {
  const [sel, setSel] = useState(null);
  useScrollReveal();

  return (
    <>
      <div className="top-banner">✦ &nbsp; Kit familiar completo · palabras que construyen confianza &nbsp; ✦ &nbsp; Listo en minutos &nbsp; ✦</div>
      <Nav />
      <Hero />
      <CardStrip onSel={setSel} />
      <ProblemSection />
      <SolutionSection />
      <GuiaSection />
      <MomentosSection />
      <AprenderSection />
      <HowSection />
      <PricingSection />
      <TestimonialsSection />
      <ProductShowcaseSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <AnimatePresence>
        {sel && <CardModal card={sel} onClose={() => setSel(null)} />}
      </AnimatePresence>
    </>
  );
}
