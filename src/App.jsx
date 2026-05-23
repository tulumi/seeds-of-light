import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// ── SVG ILLUSTRATIONS ────────────────────────────────────
const SVG = {
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
  // ── NEW: mindfulness illustrations ──
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

// ── DECK (40 cartas) ────────────────────────────────────
const DECK = [
  // AFIRMACIONES (32)
  {id:"A01",n:1, cat:"Afirmaciones", badge:"Afirmación del día",     svg:"bunny_love",      lines:["Soy amado","y valorado"]},
  {id:"A02",n:2, cat:"Afirmaciones", badge:"Afirmación del día",     svg:"bear_hug",        lines:["Eres mi","lugar seguro"]},
  {id:"A03",n:3, cat:"Afirmaciones", badge:"Afirmación del día",     svg:"smile_shine",     lines:["Mi sonrisa","ilumina el mundo"]},
  {id:"A04",n:4, cat:"Afirmaciones", badge:"Afirmación del día",     svg:"sunflower",       lines:["Soy suficiente","tal como soy"]},
  {id:"A05",n:5, cat:"Afirmaciones", badge:"Afirmación del día",     svg:"sun",             lines:["Hoy elijo","la felicidad"]},
  {id:"A06",n:6, cat:"Afirmaciones", badge:"Afirmación del día",     svg:"turtle",          lines:["Respiro paz","y calma"]},
  {id:"A07",n:7, cat:"Afirmaciones", badge:"Afirmación del día",     svg:"grateful_bear",   lines:["Doy gracias","por este día"]},
  {id:"A08",n:8, cat:"Afirmaciones", badge:"Afirmación del día",     svg:"butterfly_flower",lines:["Mi corazón","es bondadoso"]},
  {id:"A09",n:9, cat:"Afirmaciones", badge:"Afirmación del día",     svg:"lion",            lines:["Soy","valiente"]},
  {id:"A10",n:10,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"bunny_idea",      lines:["Mis ideas","brillan"]},
  {id:"A11",n:11,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"plant_heart",     lines:["Crezco","con amor"]},
  {id:"A12",n:12,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"sunshine_ray",    lines:["Soy","luz"]},
  {id:"A13",n:13,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"bird_sing",       lines:["Mi voz","importa"]},
  {id:"A14",n:14,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"feelings",        lines:["Todo lo que siento","está bien"]},
  {id:"A15",n:15,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"chick_fly",       lines:["Puedo volver","a intentar"]},
  {id:"A16",n:16,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"gift",            lines:["Soy un","regalo"]},
  {id:"A17",n:17,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"bear_star",       lines:["Confío","en mí"]},
  {id:"A18",n:18,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"child_bunny",     lines:["Cuido los","animales"]},
  {id:"A19",n:19,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"earth_hug",       lines:["Amo al","planeta"]},
  {id:"A20",n:20,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"sharing",         lines:["Compartir","me hace feliz"]},
  {id:"A21",n:21,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"parrot",          lines:["Hablo con","bondad"]},
  {id:"A22",n:22,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"two_friends",     lines:["Soy un buen","amigo"]},
  {id:"A23",n:23,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"elephant_listen", lines:["Escucho con","el corazón"]},
  {id:"A24",n:24,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"sunflower_smile", lines:["Mi sonrisa","alegra"]},
  {id:"A25",n:25,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"helping",         lines:["Ayudar","me hace bien"]},
  {id:"A26",n:26,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"sunrise",         lines:["Agradezco","mi día"]},
  {id:"A27",n:27,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"drawing",         lines:["Dibujo mis","emociones"]},
  {id:"A28",n:28,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"memories",        lines:["Recuerdo cosas","bonitas"]},
  {id:"A29",n:29,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"journal",         lines:["Escribo lo que","me alegra"]},
  {id:"A30",n:30,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"emotions",        lines:["Nombro mi","emoción"]},
  {id:"A31",n:31,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"butterfly_flower",lines:["Observo","la belleza"]},
  {id:"A32",n:32,cat:"Afirmaciones", badge:"Afirmación del día",     svg:"bunny_love",      lines:["Me quiero","tal como soy"]},
  // MINDFULNESS (8)
  {id:"M01",n:33,cat:"Mindfulness",  badge:"Actividad de mindfulness",svg:"rainbow",        lines:["Cierra los ojos.", "Imagina un arcoíris","brillando en ti"]},
  {id:"M02",n:34,cat:"Mindfulness",  badge:"Actividad de mindfulness",svg:"butterfly_flower",lines:["Busca 5 cosas","que te hagan feliz","y cuéntaselas a mamá"]},
  {id:"M03",n:35,cat:"Mindfulness",  badge:"Actividad de mindfulness",svg:"breathing",      lines:["Respira profundo","3 veces, llenando","tu barriga"]},
  {id:"M04",n:36,cat:"Mindfulness",  badge:"Actividad de mindfulness",svg:"bear_hug",       lines:["Abraza fuerte","a quien más amas"]},
  {id:"M05",n:37,cat:"Mindfulness",  badge:"Actividad de mindfulness",svg:"sunshine_ray",   lines:["Mira al cielo","y cuenta","las nubes"]},
  {id:"M06",n:38,cat:"Mindfulness",  badge:"Actividad de mindfulness",svg:"silence",        lines:["Pon la mano","en tu corazón","y siente latir"]},
  {id:"M07",n:39,cat:"Mindfulness",  badge:"Actividad de mindfulness",svg:"drawing",        lines:["Dibuja cómo","te sientes","hoy"]},
  {id:"M08",n:40,cat:"Mindfulness",  badge:"Actividad de mindfulness",svg:"tree",           lines:["Imagina raíces","bajo tus pies.","Eres fuerte"]},
];

const TOTAL = DECK.length;
const CATS = ["Todas","Afirmaciones","Mindfulness"];

const CAT_TITLE = {
  Todas: "Todas las cartas",
  Afirmaciones: "Afirmaciones",
  Mindfulness: "Actividades de mindfulness",
};

// ── CARD ────────────────────────────────────────────────
function Card({ card, idx, onClick }) {
  const badge = BADGE_COLORS[idx % BADGE_COLORS.length];
  const num   = String(card.n).padStart(2,"0");
  const tot   = String(TOTAL).padStart(2,"0");

  return (
    <motion.div layout
      initial={{ opacity:0, y:18 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, scale:0.92 }}
      transition={{ duration:0.24, delay: Math.min(idx*0.03, 0.55) }}
      whileHover={{ y:-10, transition:{ duration:0.17 } }}
      onClick={()=>onClick(card)}
      style={{ cursor:"pointer" }}
    >
      <div style={{
        background:"white", borderRadius:20,
        padding:"14px 12px 10px",
        boxShadow:"0 2px 16px rgba(0,0,0,0.08)",
        display:"flex", flexDirection:"column",
        aspectRatio:"3/4",
      }}>
        {/* Badge */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:10 }}>
          <span style={{
            background:badge.bg, color:badge.text,
            fontSize:9, fontWeight:700,
            padding:"4px 11px", borderRadius:99,
            letterSpacing:"0.03em", whiteSpace:"nowrap",
          }}>{card.badge}</span>
        </div>

        {/* Illustration */}
        <div style={{
          flex:1, display:"flex",
          alignItems:"center", justifyContent:"center",
          padding:"0 6px", overflow:"hidden",
        }}>
          <div style={{ width:"90%", maxHeight:"100%" }}>
            {SVG[card.svg]}
          </div>
        </div>

        {/* Text */}
        <p style={{
          fontFamily:"Georgia, 'Times New Roman', serif",
          fontStyle:"italic",
          fontSize:"clamp(0.82rem, 2.4vw, 1.05rem)",
          color:"#5A3D30",
          textAlign:"center",
          lineHeight:1.3,
          margin:"10px 4px 4px",
        }}>
          {card.lines.join("\n")}
        </p>

        {/* Card number */}
        <p style={{
          fontSize:9, color:"#C0AFA0",
          textAlign:"right", margin:"2px 4px 0",
          letterSpacing:"0.08em",
          fontFamily:"sans-serif",
        }}>
          {num} / {tot}
        </p>
      </div>
    </motion.div>
  );
}

// ── APP ──────────────────────────────────────────────────
export default function App() {
  const [cat, setCat] = useState("Todas");
  const [sel, setSel] = useState(null);

  const visible = cat === "Todas" ? DECK : DECK.filter(c => c.cat === cat);
  const title   = CAT_TITLE[cat];
  const count   = visible.length;

  return (
    <div style={{ minHeight:"100vh", background:"#F0EEEB" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 24px 0" }}>

        {/* Header */}
        <div style={{
          display:"flex", alignItems:"center",
          justifyContent:"space-between",
          flexWrap:"wrap", gap:12, marginBottom:6,
        }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:14 }}>
            <h1 style={{
              fontFamily:"'Dancing Script', cursive",
              fontSize:"clamp(1.7rem, 5vw, 2.5rem)",
              fontWeight:700, color:"#3A2820",
              margin:0, lineHeight:1,
            }}>{title}</h1>
            <span style={{
              fontSize:"0.68rem", letterSpacing:"0.28em",
              color:"#B0A090", textTransform:"uppercase", fontWeight:500,
            }}>{count} cartas</span>
          </div>

          {/* Category pills */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {CATS.map(c => {
              const active = cat === c;
              return (
                <motion.button key={c}
                  whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                  onClick={()=>setCat(c)}
                  style={{
                    padding:"6px 16px", borderRadius:99, border:"none",
                    cursor:"pointer", fontSize:12,
                    background: active ? "#5A3D30" : "white",
                    color: active ? "white" : "#8A7060",
                    fontWeight: active ? 700 : 500,
                    boxShadow: active
                      ? "0 4px 14px rgba(90,61,48,.28)"
                      : "0 1px 5px rgba(0,0,0,.07)",
                    transition:"all .18s",
                  }}
                >{c}</motion.button>
              );
            })}
          </div>
        </div>

        <hr style={{ border:"none", borderTop:"1px solid #DDD8D2", margin:"10px 0 24px" }}/>

        {/* Grid */}
        <motion.div layout style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(155px, 1fr))",
          gap:16, paddingBottom:48,
        }}>
          <AnimatePresence mode="popLayout">
            {visible.map((c,i) => (
              <Card key={c.id} card={c} idx={i} onClick={setSel}/>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {sel && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{
              position:"fixed", inset:0,
              background:"rgba(60,40,30,.65)",
              backdropFilter:"blur(12px)",
              display:"flex", alignItems:"center", justifyContent:"center",
              zIndex:999, padding:20,
            }}
            onClick={()=>setSel(null)}
          >
            <motion.div
              initial={{scale:0.84, y:30}} animate={{scale:1, y:0}} exit={{scale:0.88}}
              transition={{type:"spring", stiffness:300, damping:26}}
              onClick={e=>e.stopPropagation()}
              style={{
                width:"min(320px, 90vw)", background:"white",
                borderRadius:24, boxShadow:"0 40px 100px rgba(0,0,0,.25)",
                overflow:"hidden", position:"relative",
              }}
            >
              <button onClick={()=>setSel(null)} style={{
                position:"absolute", top:12, right:12,
                background:"rgba(0,0,0,.08)", border:"none", borderRadius:"50%",
                width:28, height:28, cursor:"pointer", fontSize:14, color:"#5C3A10",
                display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800,
              }}>✕</button>
              <div style={{ padding:"28px 24px 24px", display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
                <span style={{
                  background: BADGE_COLORS[sel.n % BADGE_COLORS.length].bg,
                  color: BADGE_COLORS[sel.n % BADGE_COLORS.length].text,
                  fontSize:10, fontWeight:700,
                  padding:"4px 14px", borderRadius:99,
                }}>{sel.badge}</span>
                <div style={{ width:140 }}>{SVG[sel.svg]}</div>
                <p style={{
                  fontFamily:"Georgia, serif", fontStyle:"italic",
                  fontSize:"1.25rem", color:"#3A2820",
                  textAlign:"center", lineHeight:1.4, margin:0,
                }}>{sel.lines.join(" ")}</p>
                <p style={{ fontSize:10, color:"#C0AFA0", letterSpacing:"0.08em" }}>
                  {String(sel.n).padStart(2,"0")} / {String(TOTAL).padStart(2,"0")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
