import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const C = {
  bg:    "#F5EDD5",
  border:"#E09020",
  text:  "#D07010",
  brown: "#5C3A10",
  green: "#48A030",
  sky:   "#60B8E0",
  coral: "#F06050",
  pink:  "#F090A0",
  purple:"#A060C0",
  tan:   "#E8C080",
  gold:  "#F0B828",
  teal:  "#2A9BB5",
};

const SVG = {
  lion: (
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
      <circle cx="54" cy="50" r="3" fill={C.brown}/>
      <circle cx="66" cy="50" r="3" fill={C.brown}/>
      <circle cx="55" cy="49" r="1" fill="white"/>
      <circle cx="67" cy="49" r="1" fill="white"/>
      <ellipse cx="60" cy="57" rx="5" ry="3.5" fill="#F09070" stroke={C.brown} strokeWidth="1.2"/>
      <path d="M55 57 Q60 62 65 57" stroke={C.brown} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <polygon points="48,38 52,28 56,35 60,26 64,35 68,28 72,38" fill={C.gold} stroke={C.brown} strokeWidth="1.5"/>
      <circle cx="60" cy="27" r="2.5" fill={C.coral}/>
      <circle cx="52" cy="29" r="1.8" fill={C.coral}/>
      <circle cx="68" cy="29" r="1.8" fill={C.coral}/>
      <ellipse cx="44" cy="83" rx="8" ry="5" fill="#F5C840" stroke={C.brown} strokeWidth="1.5"/>
      <ellipse cx="76" cy="83" rx="8" ry="5" fill="#F5C840" stroke={C.brown} strokeWidth="1.5"/>
    </svg>
  ),
  bunny_idea: (
    <svg viewBox="0 0 120 100">
      <circle cx="60" cy="22" r="16" fill="#FFF8D0" stroke={C.gold} strokeWidth="1.5" opacity="0.7"/>
      <ellipse cx="60" cy="22" r="12" fill={C.gold} stroke={C.brown} strokeWidth="2"/>
      <path d="M54 30 Q60 36 66 30" stroke={C.brown} strokeWidth="1.5" fill="none"/>
      <line x1="58" y1="36" x2="62" y2="36" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="60" cy="74" rx="16" ry="13" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <circle cx="60" cy="57" r="13" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="53" cy="43" rx="4.5" ry="9" fill={C.tan} stroke={C.brown} strokeWidth="1.8"/>
      <ellipse cx="53" cy="43" rx="2.5" ry="6" fill="#F0A0A0"/>
      <ellipse cx="67" cy="43" rx="4.5" ry="9" fill={C.tan} stroke={C.brown} strokeWidth="1.8"/>
      <ellipse cx="67" cy="43" rx="2.5" ry="6" fill="#F0A0A0"/>
      <circle cx="56" cy="55" r="2.5" fill={C.brown}/>
      <circle cx="64" cy="55" r="2.5" fill={C.brown}/>
      <ellipse cx="60" cy="60" rx="3" ry="2" fill="#F090A0" stroke={C.brown} strokeWidth="1"/>
    </svg>
  ),
  plant_heart: (
    <svg viewBox="0 0 120 100">
      <ellipse cx="60" cy="88" rx="28" ry="8" fill="#B87840" stroke={C.brown} strokeWidth="1.5"/>
      <path d="M60 87 Q60 65 60 50" stroke={C.green} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M60 70 Q42 58 44 46 Q56 52 60 68" fill="#60C040" stroke={C.brown} strokeWidth="1.5"/>
      <path d="M60 65 Q78 53 76 41 Q64 47 60 63" fill="#50B030" stroke={C.brown} strokeWidth="1.5"/>
      <path d="M60 18 C56 14,48 14,48 22 C48 28,54 34,60 40 C66 34,72 28,72 22 C72 14,64 14,60 18Z" fill={C.coral} stroke={C.brown} strokeWidth="2"/>
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 120 100">
      <circle cx="60" cy="54" r="35" fill="#FFF8C0" opacity="0.5"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>(
        <line key={i}
          x1={60+25*Math.cos(a*Math.PI/180)} y1={54+25*Math.sin(a*Math.PI/180)}
          x2={60+34*Math.cos(a*Math.PI/180)} y2={54+34*Math.sin(a*Math.PI/180)}
          stroke={C.gold} strokeWidth={i%2?2.5:3.5} strokeLinecap="round"/>
      ))}
      <circle cx="60" cy="54" r="23" fill={C.gold} stroke={C.brown} strokeWidth="2.5"/>
      <circle cx="52" cy="51" r="3.5" fill={C.brown}/>
      <circle cx="68" cy="51" r="3.5" fill={C.brown}/>
      <ellipse cx="46" cy="57" rx="5" ry="3.5" fill={C.coral} opacity="0.45"/>
      <ellipse cx="74" cy="57" rx="5" ry="3.5" fill={C.coral} opacity="0.45"/>
      <path d="M50 58 Q60 68 70 58" stroke={C.brown} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  sunflower: (
    <svg viewBox="0 0 120 100">
      <line x1="60" y1="88" x2="60" y2="55" stroke={C.green} strokeWidth="4" strokeLinecap="round"/>
      <path d="M60 75 Q42 65 44 55 Q56 60 60 73" fill="#60C040" stroke={C.brown} strokeWidth="1.5"/>
      <path d="M60 70 Q78 60 76 50 Q64 55 60 68" fill="#50B030" stroke={C.brown} strokeWidth="1.5"/>
      {[0,36,72,108,144,180,216,252,288,324].map((a,i)=>(
        <ellipse key={i}
          cx={60+20*Math.cos(a*Math.PI/180)} cy={40+20*Math.sin(a*Math.PI/180)}
          rx="7" ry="10" fill={C.gold} stroke={C.brown} strokeWidth="1.8"
          transform={`rotate(${a},${60+20*Math.cos(a*Math.PI/180)},${40+20*Math.sin(a*Math.PI/180)})`}/>
      ))}
      <circle cx="60" cy="40" r="16" fill="#B06820" stroke={C.brown} strokeWidth="2.2"/>
      <circle cx="55" cy="38" r="2.8" fill={C.brown}/>
      <circle cx="65" cy="38" r="2.8" fill={C.brown}/>
      <path d="M53 44 Q60 50 67 44" stroke={C.brown} strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  bird_sing: (
    <svg viewBox="0 0 120 100">
      <path d="M20 72 Q60 65 100 70" stroke="#8B5C20" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <ellipse cx="58" cy="58" rx="18" ry="13" fill={C.sky} stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="50" cy="56" rx="12" ry="8" fill="#80C8E8" stroke={C.brown} strokeWidth="1.5" transform="rotate(-15,50,56)"/>
      <circle cx="40" cy="52" r="12" fill={C.sky} stroke={C.brown} strokeWidth="2"/>
      <path d="M29 52 L22 49 L23 55 Z" fill={C.gold} stroke={C.brown} strokeWidth="1.2"/>
      <circle cx="37" cy="50" r="3" fill={C.brown}/>
    </svg>
  ),
  feelings: (
    <svg viewBox="0 0 120 100">
      <circle cx="22" cy="30" r="14" fill="#FFF0F0" stroke={C.coral} strokeWidth="1.8"/>
      <text x="22" y="35" fontSize="16" textAnchor="middle">😊</text>
      <circle cx="98" cy="25" r="13" fill="#F0F8FF" stroke={C.sky} strokeWidth="1.8"/>
      <text x="98" y="30" fontSize="15" textAnchor="middle">😢</text>
      <circle cx="60" cy="55" r="14" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <circle cx="55" cy="54" r="2.5" fill={C.brown}/>
      <circle cx="65" cy="54" r="2.5" fill={C.brown}/>
      <path d="M55 60 Q60 65 65 60" stroke={C.brown} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <ellipse cx="60" cy="80" rx="15" ry="14" fill="#F080A0" stroke={C.brown} strokeWidth="2"/>
    </svg>
  ),
  chick_fly: (
    <svg viewBox="0 0 120 100">
      <ellipse cx="60" cy="66" rx="17" ry="15" fill={C.gold} stroke={C.brown} strokeWidth="2"/>
      <path d="M43 62 Q32 48 38 40 Q48 50 46 62 Z" fill="#F0C030" stroke={C.brown} strokeWidth="1.8"/>
      <path d="M77 62 Q88 48 82 40 Q72 50 74 62 Z" fill="#F0C030" stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="60" cy="50" r="14" fill={C.gold} stroke={C.brown} strokeWidth="2"/>
      <path d="M52 51 L46 49 L47 55 Z" fill="#F08020" stroke={C.brown} strokeWidth="1.2"/>
      <circle cx="58" cy="48" r="3" fill={C.brown}/>
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 120 100">
      <rect x="28" y="58" width="64" height="34" rx="6" fill="#F06080" stroke={C.brown} strokeWidth="2.5"/>
      <rect x="22" y="48" width="76" height="16" rx="6" fill={C.coral} stroke={C.brown} strokeWidth="2.5"/>
      <rect x="56" y="58" width="8" height="34" rx="2" fill={C.gold} stroke={C.brown} strokeWidth="1.5"/>
      <rect x="22" y="53" width="76" height="8" rx="3" fill={C.gold} stroke={C.brown} strokeWidth="1.5"/>
      <path d="M60 50 Q44 38 46 28 Q58 32 60 48 Z" fill={C.gold} stroke={C.brown} strokeWidth="1.8"/>
      <path d="M60 50 Q76 38 74 28 Q62 32 60 48 Z" fill={C.gold} stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="60" cy="50" r="5" fill={C.gold} stroke={C.brown} strokeWidth="1.8"/>
    </svg>
  ),
  bunny_love: (
    <svg viewBox="0 0 120 100">
      <text x="60" y="18" fontSize="18" textAnchor="middle" fill={C.coral}>♥</text>
      <ellipse cx="60" cy="74" rx="16" ry="14" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <circle cx="60" cy="55" r="14" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="52" cy="40" rx="5" ry="10" fill={C.tan} stroke={C.brown} strokeWidth="1.8"/>
      <ellipse cx="68" cy="40" rx="5" ry="10" fill={C.tan} stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="55" cy="53" r="2.8" fill={C.brown}/>
      <circle cx="65" cy="53" r="2.8" fill={C.brown}/>
    </svg>
  ),
  bear_star: (
    <svg viewBox="0 0 120 100">
      <ellipse cx="60" cy="72" rx="20" ry="17" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <circle cx="44" cy="45" r="9" fill="#D8943A" stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="76" cy="45" r="9" fill="#D8943A" stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="60" cy="55" r="18" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="60" cy="62" rx="8" ry="6" fill="#E8A850" stroke={C.brown} strokeWidth="1.5"/>
      <circle cx="54" cy="52" r="3" fill={C.brown}/>
      <circle cx="66" cy="52" r="3" fill={C.brown}/>
      <polygon points="60,64 62,70 68,70 63,74 65,80 60,76 55,80 57,74 52,70 58,70" fill={C.gold} stroke={C.brown} strokeWidth="1.5"/>
    </svg>
  ),
  smile_shine: (
    <svg viewBox="0 0 120 100">
      <ellipse cx="60" cy="76" rx="16" ry="16" fill="#F06090" stroke={C.brown} strokeWidth="2"/>
      <circle cx="60" cy="53" r="16" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <path d="M52 50 Q55 46 58 50" stroke={C.brown} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M62 50 Q65 46 68 50" stroke={C.brown} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M48 58 Q60 70 72 58" stroke={C.brown} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  grateful_bear: (
    <svg viewBox="0 0 120 100">
      <ellipse cx="60" cy="72" rx="20" ry="18" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <circle cx="60" cy="54" r="18" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <path d="M51 50 Q54 46 57 50" stroke={C.brown} strokeWidth="2.5" fill="none"/>
      <path d="M63 50 Q66 46 69 50" stroke={C.brown} strokeWidth="2.5" fill="none"/>
      <path d="M60 62 C57 59,51 59,51 64 C51 68,56 72,60 75 C64 72,69 68,69 64 C69 59,63 59,60 62Z" fill={C.coral} stroke={C.brown} strokeWidth="1.5"/>
    </svg>
  ),
  bear_hug: (
    <svg viewBox="0 0 120 100">
      <text x="60" y="18" fontSize="18" textAnchor="middle" fill={C.coral}>♥</text>
      <ellipse cx="40" cy="72" rx="16" ry="15" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <circle cx="38" cy="52" r="14" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="80" cy="75" rx="14" ry="13" fill="#E8B060" stroke={C.brown} strokeWidth="2"/>
      <circle cx="82" cy="56" r="12" fill="#E8B060" stroke={C.brown} strokeWidth="2"/>
    </svg>
  ),
  child_bunny: (
    <svg viewBox="0 0 120 100">
      <ellipse cx="70" cy="62" rx="12" ry="10" fill={C.tan} stroke={C.brown} strokeWidth="1.8"/>
      <circle cx="68" cy="52" r="9" fill={C.tan} stroke={C.brown} strokeWidth="1.8"/>
      <ellipse cx="48" cy="74" rx="16" ry="18" fill="#F06090" stroke={C.brown} strokeWidth="2"/>
      <circle cx="48" cy="50" r="15" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <circle cx="43" cy="48" r="2.5" fill={C.brown}/>
      <circle cx="53" cy="48" r="2.5" fill={C.brown}/>
    </svg>
  ),
  earth_hug: (
    <svg viewBox="0 0 120 100">
      <circle cx="60" cy="58" r="28" fill="#60A8D8" stroke={C.brown} strokeWidth="2"/>
      <path d="M45 44 Q52 38 62 42 Q70 40 72 48 Q68 55 60 54 Q50 56 45 50 Z" fill={C.green}/>
      <path d="M55 60 Q64 58 70 64 Q68 72 60 74 Q52 72 50 66 Z" fill={C.green}/>
      <circle cx="54" cy="54" r="2.5" fill={C.brown}/>
      <circle cx="64" cy="54" r="2.5" fill={C.brown}/>
      <path d="M52 60 Q58 66 66 60" stroke={C.brown} strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  sharing: (
    <svg viewBox="0 0 120 100">
      <circle cx="33" cy="55" r="13" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="33" cy="73" rx="14" ry="13" fill="#D8943A" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="60" cy="65" rx="12" ry="11" fill={C.coral} stroke={C.brown} strokeWidth="2"/>
      <circle cx="88" cy="54" r="12" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="88" cy="72" rx="13" ry="12" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <text x="60" y="36" fontSize="14" textAnchor="middle" fill={C.coral}>♥</text>
    </svg>
  ),
  parrot: (
    <svg viewBox="0 0 120 100">
      <path d="M15 78 Q60 72 105 76" stroke="#8B5C20" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <ellipse cx="58" cy="63" rx="18" ry="15" fill="#30B040" stroke={C.brown} strokeWidth="2"/>
      <circle cx="48" cy="48" r="14" fill="#30B040" stroke={C.brown} strokeWidth="2"/>
      <path d="M36 48 L28 45 L30 52 Z" fill="#F08020" stroke={C.brown} strokeWidth="1.5"/>
      <circle cx="50" cy="46" r="3.5" fill={C.brown}/>
    </svg>
  ),
  two_friends: (
    <svg viewBox="0 0 120 100">
      <ellipse cx="38" cy="72" rx="18" ry="15" fill="#90C0E8" stroke={C.brown} strokeWidth="2"/>
      <circle cx="36" cy="50" r="15" fill="#90C0E8" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="82" cy="73" rx="16" ry="14" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <circle cx="82" cy="52" r="13" fill={C.tan} stroke={C.brown} strokeWidth="2"/>
      <text x="61" y="58" fontSize="16" textAnchor="middle" fill={C.coral}>♥</text>
    </svg>
  ),
  elephant_listen: (
    <svg viewBox="0 0 120 100">
      <ellipse cx="68" cy="72" rx="22" ry="17" fill="#90C0E8" stroke={C.brown} strokeWidth="2"/>
      <circle cx="58" cy="52" r="20" fill="#90C0E8" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="36" cy="52" rx="13" ry="17" fill="#78A8D0" stroke={C.brown} strokeWidth="2"/>
      <path d="M44 64 Q34 74 38 84 Q44 88 48 84" stroke="#90C0E8" strokeWidth="8" strokeLinecap="round" fill="none"/>
      <circle cx="54" cy="49" r="3.5" fill={C.brown}/>
      <circle cx="66" cy="49" r="3.5" fill={C.brown}/>
    </svg>
  ),
  sunflower_smile: (
    <svg viewBox="0 0 120 100">
      <line x1="60" y1="90" x2="60" y2="55" stroke={C.green} strokeWidth="5" strokeLinecap="round"/>
      {[0,36,72,108,144,180,216,252,288,324].map((a,i)=>(
        <ellipse key={i}
          cx={60+22*Math.cos(a*Math.PI/180)} cy={38+22*Math.sin(a*Math.PI/180)}
          rx="8" ry="11" fill={C.gold} stroke={C.brown} strokeWidth="1.8"
          transform={`rotate(${a},${60+22*Math.cos(a*Math.PI/180)},${38+22*Math.sin(a*Math.PI/180)})`}/>
      ))}
      <circle cx="60" cy="38" r="17" fill="#904010" stroke={C.brown} strokeWidth="2.2"/>
      <circle cx="55" cy="36" r="2.8" fill="#3C1A08"/>
      <circle cx="65" cy="36" r="2.8" fill="#3C1A08"/>
      <path d="M53 42 Q60 48 67 42" stroke="#3C1A08" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  helping: (
    <svg viewBox="0 0 120 100">
      <ellipse cx="38" cy="72" rx="14" ry="17" fill="#F06090" stroke={C.brown} strokeWidth="2"/>
      <circle cx="38" cy="48" r="14" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <path d="M50 66 Q64 60 74 64" stroke="#F0C890" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <circle cx="84" cy="60" r="13" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="84" cy="78" rx="13" ry="12" fill="#60A0E8" stroke={C.brown} strokeWidth="2"/>
    </svg>
  ),
  sunshine_ray: (
    <svg viewBox="0 0 120 100">
      <circle cx="60" cy="50" r="40" fill="#FFF8C0" opacity="0.35"/>
      {[0,45,90,135,180,225,270,315].map((a,i)=>(
        <line key={i}
          x1={60+26*Math.cos(a*Math.PI/180)} y1={50+26*Math.sin(a*Math.PI/180)}
          x2={60+42*Math.cos(a*Math.PI/180)} y2={50+42*Math.sin(a*Math.PI/180)}
          stroke="#F5C820" strokeWidth="4" strokeLinecap="round"/>
      ))}
      <circle cx="60" cy="50" r="24" fill={C.gold} stroke={C.brown} strokeWidth="2.5"/>
      <circle cx="52" cy="47" r="3.5" fill={C.brown}/>
      <circle cx="68" cy="47" r="3.5" fill={C.brown}/>
      <path d="M49 55 Q60 67 71 55" stroke={C.brown} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  turtle: (
    <svg viewBox="0 0 120 100">
      <ellipse cx="66" cy="60" rx="28" ry="20" fill="#50A830" stroke={C.brown} strokeWidth="2.5"/>
      <ellipse cx="66" cy="60" rx="20" ry="14" fill="#40A020" stroke={C.brown} strokeWidth="1.2"/>
      <circle cx="36" cy="58" r="13" fill="#68B848" stroke={C.brown} strokeWidth="2"/>
      <circle cx="31" cy="55" r="2.8" fill={C.brown}/>
      <circle cx="40" cy="54" r="2.8" fill={C.brown}/>
      <path d="M30 60 Q36 65 42 60" stroke={C.brown} strokeWidth="1.8" fill="none"/>
    </svg>
  ),
  sunrise: (
    <svg viewBox="0 0 120 100">
      <rect x="0" y="0" width="120" height="70" rx="8" fill="#FFF0D8" opacity="0.5"/>
      <circle cx="60" cy="68" r="26" fill={C.gold}/>
      <rect x="0" y="66" width="120" height="34" fill="#D8E8A0"/>
      <path d="M0 78 Q30 60 60 72 Q90 84 120 70 L120 100 L0 100 Z" fill="#C8D890"/>
      <circle cx="56" cy="60" r="3" fill={C.brown}/>
      <circle cx="64" cy="60" r="3" fill={C.brown}/>
    </svg>
  ),
  drawing: (
    <svg viewBox="0 0 120 100">
      <line x1="58" y1="44" x2="44" y2="90" stroke="#8B5C20" strokeWidth="3" strokeLinecap="round"/>
      <line x1="62" y1="44" x2="76" y2="90" stroke="#8B5C20" strokeWidth="3" strokeLinecap="round"/>
      <rect x="42" y="22" width="36" height="30" rx="3" fill="white" stroke={C.brown} strokeWidth="2"/>
      <circle cx="92" cy="54" r="13" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="92" cy="72" rx="13" ry="15" fill="#60A8E0" stroke={C.brown} strokeWidth="2"/>
    </svg>
  ),
  memories: (
    <svg viewBox="0 0 120 100">
      <circle cx="60" cy="28" r="24" fill="white" stroke={C.sky} strokeWidth="2"/>
      <circle cx="38" cy="32" r="16" fill="white" stroke={C.sky} strokeWidth="2"/>
      <circle cx="82" cy="30" r="18" fill="white" stroke={C.sky} strokeWidth="2"/>
      <text x="44" y="26" fontSize="12" textAnchor="middle">🌸</text>
      <text x="60" y="32" fontSize="11" textAnchor="middle">⭐</text>
      <text x="75" y="25" fontSize="11" textAnchor="middle">🌈</text>
      <circle cx="64" cy="82" r="13" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="64" cy="96" rx="14" ry="6" fill="#F080A0" stroke={C.brown} strokeWidth="2"/>
    </svg>
  ),
  silence: (
    <svg viewBox="0 0 120 100">
      <circle cx="60" cy="74" r="7" fill={C.gold} stroke={C.brown} strokeWidth="1.5"/>
      <ellipse cx="60" cy="72" rx="22" ry="10" fill="#F06090" stroke={C.brown} strokeWidth="2"/>
      <ellipse cx="60" cy="63" rx="14" ry="14" fill="#F06090" stroke={C.brown} strokeWidth="2"/>
      <circle cx="60" cy="46" r="15" fill="#F5D0A0" stroke={C.brown} strokeWidth="2"/>
      <path d="M53 44 Q56 40 59 44" stroke={C.brown} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M61 44 Q64 40 67 44" stroke={C.brown} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  journal: (
    <svg viewBox="0 0 120 100">
      <rect x="28" y="30" width="52" height="60" rx="6" fill="#80C0F8" stroke={C.brown} strokeWidth="2.5"/>
      <rect x="36" y="33" width="40" height="57" rx="2" fill="#FFFDF0"/>
      <polygon points="56,40 57.5,45 62,45 58.5,48 60,53 56,50 52,53 53.5,48 50,45 54.5,45" fill={C.gold}/>
      <line x1="76" y1="28" x2="90" y2="55" stroke="#F08020" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  ),
  emotions: (
    <svg viewBox="0 0 120 100">
      <circle cx="28" cy="35" r="16" fill="white" stroke={C.gold} strokeWidth="2.2"/>
      <text x="28" y="41" fontSize="18" textAnchor="middle">😊</text>
      <circle cx="60" cy="35" r="16" fill="white" stroke={C.sky} strokeWidth="2.2"/>
      <text x="60" y="41" fontSize="18" textAnchor="middle">😢</text>
      <circle cx="92" cy="35" r="16" fill="white" stroke={C.coral} strokeWidth="2.2"/>
      <text x="92" y="41" fontSize="18" textAnchor="middle">😠</text>
      <circle cx="28" cy="70" r="16" fill="white" stroke="#C080E0" strokeWidth="2.2"/>
      <text x="28" y="76" fontSize="18" textAnchor="middle">😨</text>
      <circle cx="60" cy="70" r="16" fill="white" stroke={C.green} strokeWidth="2.2"/>
      <text x="60" y="76" fontSize="18" textAnchor="middle">😌</text>
      <circle cx="92" cy="70" r="16" fill="white" stroke="#F090C0" strokeWidth="2.2"/>
      <text x="92" y="76" fontSize="18" textAnchor="middle">🥰</text>
    </svg>
  ),
  butterfly_flower: (
    <svg viewBox="0 0 120 100">
      <path d="M60 92 Q58 78 60 65" stroke={C.green} strokeWidth="4" strokeLinecap="round" fill="none"/>
      {[0,36,72,108,144,180,216,252,288,324].map((a,i)=>(
        <ellipse key={i}
          cx={60+18*Math.cos(a*Math.PI/180)} cy={46+18*Math.sin(a*Math.PI/180)}
          rx="7" ry="10" fill={i%2?"#F080C0":"#F8A0D8"} stroke={C.brown} strokeWidth="1.5"
          transform={`rotate(${a},${60+18*Math.cos(a*Math.PI/180)},${46+18*Math.sin(a*Math.PI/180)})`}/>
      ))}
      <circle cx="60" cy="46" r="13" fill={C.gold} stroke={C.brown} strokeWidth="2"/>
      <path d="M62 36 Q76 22 86 30 Q84 42 68 40 Z" fill="#F08020" stroke={C.brown} strokeWidth="1.8"/>
      <path d="M58 36 Q44 22 34 30 Q36 42 52 40 Z" fill="#F08020" stroke={C.brown} strokeWidth="1.8"/>
    </svg>
  ),
};

const DECK = [
  { id:"C01", n:1,  cat:"Confianza",   badge:"Afirmación", svg:"lion",            lines:["Soy","Valiente"]                       },
  { id:"C02", n:2,  cat:"Confianza",   badge:"Afirmación", svg:"bunny_idea",      lines:["Mis ideas","brillan"]                  },
  { id:"C03", n:3,  cat:"Confianza",   badge:"Afirmación", svg:"plant_heart",     lines:["Crezco","con Amor"]                    },
  { id:"C04", n:4,  cat:"Confianza",   badge:"Afirmación", svg:"sun",             lines:["Soy Luz"]                              },
  { id:"C05", n:5,  cat:"Confianza",   badge:"Afirmación", svg:"sunflower",       lines:["Soy","Suficiente."]                    },
  { id:"C06", n:6,  cat:"Confianza",   badge:"Afirmación", svg:"bird_sing",       lines:["Mi voz","importa"]                     },
  { id:"C07", n:7,  cat:"Confianza",   badge:"Afirmación", svg:"feelings",        lines:["Todo lo que siento","está bien"]       },
  { id:"C08", n:8,  cat:"Confianza",   badge:"Actividad",  svg:"chick_fly",       lines:["Puedo volver","a intentar."]           },
  { id:"AP01",n:9,  cat:"Amor Propio", badge:"Afirmación", svg:"gift",            lines:["Soy un","regalo"]                      },
  { id:"AP02",n:10, cat:"Amor Propio", badge:"Afirmación", svg:"bunny_love",      lines:["Merezco","Amor"]                       },
  { id:"AP03",n:11, cat:"Amor Propio", badge:"Afirmación", svg:"bear_star",       lines:["Confío en","MI"]                       },
  { id:"AP04",n:12, cat:"Amor Propio", badge:"Afirmación", svg:"smile_shine",     lines:["Mi sonrisa","ilumina"]                 },
  { id:"G01", n:13, cat:"Gratitud",    badge:"Afirmación", svg:"grateful_bear",   lines:["GRACIAS por","lo que tengo."]          },
  { id:"AP05",n:14, cat:"Amor Propio", badge:"Actividad",  svg:"bear_hug",        lines:["Abrazo","con Amor"]                    },
  { id:"N01", n:15, cat:"Naturaleza",  badge:"Afirmación", svg:"child_bunny",     lines:["Cuido los","animales"]                 },
  { id:"N02", n:16, cat:"Naturaleza",  badge:"Afirmación", svg:"earth_hug",       lines:["Amo al","planeta"]                     },
  { id:"B01", n:17, cat:"Bondad",      badge:"Afirmación", svg:"sharing",         lines:["Compartir","me hace feliz"]            },
  { id:"B02", n:18, cat:"Bondad",      badge:"Afirmación", svg:"parrot",          lines:["Hablo con","bondad"]                   },
  { id:"B03", n:19, cat:"Bondad",      badge:"Afirmación", svg:"two_friends",     lines:["Soy un buen","Amigo."]                 },
  { id:"B04", n:20, cat:"Bondad",      badge:"Actividad",  svg:"elephant_listen", lines:["Escucho con","el corazón"]             },
  { id:"B05", n:21, cat:"Bondad",      badge:"Actividad",  svg:"sunflower_smile", lines:["Mi sonrisa","alegra"]                  },
  { id:"B06", n:22, cat:"Bondad",      badge:"Actividad",  svg:"helping",         lines:["Ayudar","me hace bien"]                },
  { id:"N03", n:23, cat:"Naturaleza",  badge:"Afirmación", svg:"sunshine_ray",    lines:["Soy un rayito","de Sol"]               },
  { id:"CA01",n:24, cat:"Calma",       badge:"Técnica",    svg:"turtle",          lines:["Respiro","Calma"]                      },
  { id:"G02", n:25, cat:"Gratitud",    badge:"Afirmación", svg:"sunrise",         lines:["Agradezco","mi día"]                   },
  { id:"G03", n:26, cat:"Gratitud",    badge:"Actividad",  svg:"drawing",         lines:["Dibujo mis","emociones"]               },
  { id:"G04", n:27, cat:"Gratitud",    badge:"Actividad",  svg:"memories",        lines:["Recuerdo cosas","bonitas"]             },
  { id:"CA02",n:28, cat:"Calma",       badge:"Actividad",  svg:"silence",         lines:["Hago","silencio"]                      },
  { id:"G05", n:29, cat:"Gratitud",    badge:"Actividad",  svg:"journal",         lines:["Escribo lo que","me alegra"]           },
  { id:"CA03",n:30, cat:"Calma",       badge:"Actividad",  svg:"emotions",        lines:["Nombro mi","emoción"]                  },
  { id:"G06", n:31, cat:"Gratitud",    badge:"Actividad",  svg:"butterfly_flower",lines:["Observo","la belleza"]                 },
];

const CATS = ["Todas","Confianza","Amor Propio","Gratitud","Naturaleza","Calma","Bondad"];
const CAT_COLOR = { Confianza:"#E09020", "Amor Propio":"#D060A0", Gratitud:"#C09010", Naturaleza:"#409020", Calma:"#2090B0", Bondad:"#E07020" };
const CAT_ICON  = { Confianza:"🦋", "Amor Propio":"🌸", Gratitud:"⭐", Naturaleza:"🌿", Calma:"🌊", Bondad:"💛" };

function Card({ card, idx, onClick }) {
  const [hov, setHov] = useState(false);
  const tilts = [-2,0,1.5,-1.5,2,-2.5,1];
  const t = tilts[idx % tilts.length];
  const illustration = SVG[card.svg];

  return (
    <motion.div
      layout
      initial={{ opacity:0, scale:.88, y:20 }}
      animate={{ opacity:1, scale:1, y:0 }}
      exit={{ opacity:0, scale:.85 }}
      transition={{ duration:.3, delay: Math.min(idx*.03,.6) }}
      whileHover={{ y:-14, rotate: t*-1, scale:1.05 }}
      onHoverStart={()=>setHov(true)}
      onHoverEnd={()=>setHov(false)}
      onClick={()=>onClick(card)}
      style={{ cursor:"pointer" }}
    >
      <div style={{
        background: C.bg,
        borderRadius: 20,
        padding: "10px 10px 10px",
        boxShadow: hov ? "0 22px 52px rgba(0,0,0,.18)" : "0 5px 18px rgba(0,0,0,.10)",
        display:"flex", flexDirection:"column",
        aspectRatio:"3/4",
        position:"relative",
        overflow:"hidden",
        transition:"box-shadow .2s",
      }}>
        <div style={{
          position:"absolute", inset:6,
          border: `2px solid ${C.border}`,
          borderRadius:16,
          pointerEvents:"none",
          zIndex:0,
        }}/>
        <div style={{ zIndex:2, padding:"8px 10px 4px", textAlign:"center" }}>
          {card.lines.map((line, i) => (
            <p key={i} style={{
              fontFamily:"'Nunito','Arial Rounded MT Bold',sans-serif",
              fontSize: card.lines.join("").length > 16 ? "clamp(.68rem,2.2vw,.9rem)" : "clamp(.8rem,2.5vw,1.05rem)",
              fontWeight:800,
              color: C.text,
              lineHeight:1.2,
              margin:0,
            }}>{line}</p>
          ))}
        </div>
        <div style={{
          flex:1,
          display:"flex",
          alignItems:"flex-end",
          justifyContent:"center",
          padding:"2px 8px 8px",
          zIndex:2,
        }}>
          <motion.div
            animate={hov ? { y:[0,-5,0], scale:[1,1.05,1.02] } : {}}
            transition={{ duration:.5 }}
            style={{ width:"90%", maxWidth:160 }}
          >
            {illustration || <div style={{fontSize:40,textAlign:"center"}}>🎨</div>}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function Modal({ card, onClose }) {
  if (!card) return null;
  const illustration = SVG[card.svg];
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:"fixed",inset:0,background:"rgba(50,28,5,.72)",backdropFilter:"blur(14px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:16}}
      onClick={onClose}
    >
      <motion.div initial={{scale:.82,y:28}} animate={{scale:1,y:0}} exit={{scale:.85}}
        transition={{type:"spring",stiffness:300,damping:26}}
        onClick={e=>e.stopPropagation()}
        style={{width:"min(420px,94vw)",background:"#FFFDF4",borderRadius:26,boxShadow:"0 40px 100px rgba(0,0,0,.28)",overflow:"hidden"}}
      >
        <div style={{background:C.bg,padding:"20px 24px 16px",display:"flex",gap:18,alignItems:"center",borderBottom:`2px solid ${C.border}30`}}>
          <div style={{width:110,flexShrink:0,background:C.bg,borderRadius:16,padding:"8px",boxShadow:"0 6px 18px rgba(0,0,0,.12)",aspectRatio:"3/4",display:"flex",flexDirection:"column",position:"relative",border:`2px solid ${C.border}`}}>
            <div style={{textAlign:"center",paddingBottom:2}}>
              {card.lines.map((l,i)=>(
                <p key={i} style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:"clamp(.6rem,1.6vw,.76rem)",color:C.text,lineHeight:1.2,margin:0}}>{l}</p>
              ))}
            </div>
            <div style={{flex:1,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"0 4px 4px"}}>
              {illustration && <div style={{width:"100%"}}>{illustration}</div>}
            </div>
          </div>
          <div style={{flex:1}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:5,background:`${CAT_COLOR[card.cat]||C.border}20`,border:`1px solid ${CAT_COLOR[card.cat]||C.border}50`,borderRadius:99,padding:"3px 12px",marginBottom:8}}>
              <span style={{fontSize:13}}>{CAT_ICON[card.cat]}</span>
              <span style={{fontSize:10,color:"#5C3A10",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:700}}>{card.cat}</span>
            </div>
            <p style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:18,color:C.text,lineHeight:1.25,marginBottom:4}}>{card.lines.join(" ")}</p>
            <p style={{fontSize:11,color:"#8A6840"}}>Carta #{card.n} · {card.badge}</p>
          </div>
          <button onClick={onClose} style={{alignSelf:"flex-start",background:"rgba(0,0,0,.08)",border:"none",borderRadius:"50%",width:28,height:28,cursor:"pointer",fontSize:14,color:"#5C3A10",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,flexShrink:0}}>✕</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [cat, setCat] = useState("Todas");
  const [sel, setSel] = useState(null);

  const visible = cat==="Todas" ? DECK : DECK.filter(c=>c.cat===cat);

  return (
    <div style={{ minHeight:"100vh", background:"#EAE0C0", fontFamily:"'Nunito','Helvetica Neue',Arial,sans-serif" }}>
      <div style={{ background:"linear-gradient(90deg,#2A9BB5,#1A7A95)", padding:"14px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:24 }}>🌱</span>
          <div>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:16, color:"white", lineHeight:1 }}>Seeds of Light</p>
            <p style={{ fontSize:10, color:"rgba(255,255,255,.65)", letterSpacing:"0.14em", textTransform:"uppercase", marginTop:2 }}>31 cartas · afirmaciones para niños</p>
          </div>
        </div>
        <a href="/landing.html" style={{ color:"white", fontSize:12, textDecoration:"none", background:"rgba(255,255,255,.2)", padding:"6px 14px", borderRadius:99, fontWeight:600 }}>Landing →</a>
      </div>

      <div style={{ padding:"22px 14px", maxWidth:1000, margin:"0 auto" }}>
        <div style={{ display:"flex", gap:7, flexWrap:"wrap", justifyContent:"center", marginBottom:14 }}>
          {CATS.map(c => {
            const ac = cat===c;
            return (
              <motion.button key={c} whileHover={{scale:1.05}} whileTap={{scale:.96}} onClick={()=>setCat(c)}
                style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 15px", borderRadius:99, background:ac?C.border:"white", color:ac?"#FFF":"#8A6840", border:ac?"none":"1.5px solid rgba(224,144,32,.3)", fontSize:12, fontWeight:ac?800:500, cursor:"pointer", boxShadow:ac?`0 4px 14px ${C.border}50`:"0 2px 6px rgba(0,0,0,.06)", transition:"all .18s" }}>
                {CAT_ICON[c]&&<span>{CAT_ICON[c]}</span>} {c}
                {c!=="Todas"&&<span style={{opacity:.6,fontSize:10}}>({DECK.filter(d=>d.cat===c).length})</span>}
              </motion.button>
            );
          })}
        </div>
        <p style={{ textAlign:"center", fontSize:11, color:"#8A6840", letterSpacing:"0.1em", marginBottom:16, opacity:.7 }}>
          {visible.length} cartas · Clic para ver detalle
        </p>
        <motion.div layout style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(136px,1fr))", gap:14 }}>
          <AnimatePresence mode="popLayout">
            {visible.map((c,i) => <Card key={c.id} card={c} idx={i} onClick={setSel}/>)}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {sel && <Modal card={sel} onClose={()=>setSel(null)}/>}
      </AnimatePresence>
    </div>
  );
}
