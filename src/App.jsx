import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── BADGE COLORS (cycling) ────────────────────────────────
const BADGE_COLORS = [
  { bg: "#F9D0D8", text: "#9A3A50" },   // rose
  { bg: "#F7E4A4", text: "#7A5A18" },   // gold
  { bg: "#C6DEC8", text: "#3A6040" },   // sage
  { bg: "#B6D4E2", text: "#285870" },   // sky
];

// ── CARD IMAGES ───────────────────────────────────────────
const CARD_IMAGES = [
  "/cards/card-bunnies.jpg",
  "/cards/card-bear.jpg",
  "/cards/card-fox.jpg",
  "/cards/card-dino.jpg",
  "/cards/card-elephant.jpg",
];

// ── TRANSLATIONS ──────────────────────────────────────────
const T = {
  es: {
    title: "Afirmaciones",
    cartas: "cartas",
    badgeLabel: "Afirmación del día",
    all: "Todas",
    cats: {
      Confianza: "Confianza",
      "Amor Propio": "Amor Propio",
      Gratitud: "Gratitud",
      Naturaleza: "Naturaleza",
      Calma: "Calma",
      Bondad: "Bondad",
    },
  },
  en: {
    title: "Affirmations",
    cartas: "cards",
    badgeLabel: "Affirmation of the day",
    all: "All",
    cats: {
      Confianza: "Confidence",
      "Amor Propio": "Self-Love",
      Gratitud: "Gratitude",
      Naturaleza: "Nature",
      Calma: "Calm",
      Bondad: "Kindness",
    },
  },
};

const CAT_ICON = {
  Confianza: "🦋",
  "Amor Propio": "🌸",
  Gratitud: "⭐",
  Naturaleza: "🌿",
  Calma: "🌊",
  Bondad: "💛",
};

// ── DECK DATA ─────────────────────────────────────────────
const DECK = [
  { id:"C01",  n:1,  cat:"Confianza",   es:["Soy","valiente"],                    en:["I Am","Brave"]                       },
  { id:"C02",  n:2,  cat:"Confianza",   es:["Mis ideas","brillan"],               en:["My Ideas","Shine"]                   },
  { id:"C03",  n:3,  cat:"Confianza",   es:["Crezco","con amor"],                 en:["I Grow","with Love"]                 },
  { id:"C04",  n:4,  cat:"Confianza",   es:["Soy","luz"],                         en:["I Am","Light"]                       },
  { id:"C05",  n:5,  cat:"Confianza",   es:["Soy suficiente","tal como soy"],     en:["I Am","Enough"]                      },
  { id:"C06",  n:6,  cat:"Confianza",   es:["Mi voz","importa"],                  en:["My Voice","Matters"]                 },
  { id:"C07",  n:7,  cat:"Confianza",   es:["Todo lo que siento","está bien"],    en:["All I Feel","Is Okay"]               },
  { id:"C08",  n:8,  cat:"Confianza",   es:["Puedo volver","a intentar"],         en:["I Can Try","Again"]                  },
  { id:"AP01", n:9,  cat:"Amor Propio", es:["Soy un","regalo"],                   en:["I Am","a Gift"]                      },
  { id:"AP02", n:10, cat:"Amor Propio", es:["Merezco","amor"],                    en:["I Deserve","Love"]                   },
  { id:"AP03", n:11, cat:"Amor Propio", es:["Confío","en mí"],                    en:["I Trust","Myself"]                   },
  { id:"AP04", n:12, cat:"Amor Propio", es:["Mi sonrisa","ilumina el mundo"],     en:["My Smile","Lights the World"]        },
  { id:"G01",  n:13, cat:"Gratitud",    es:["Doy gracias","por este día"],        en:["I Am Grateful","for Today"]          },
  { id:"AP05", n:14, cat:"Amor Propio", es:["Soy amado","y valorado"],            en:["I Am Loved","and Valued"]            },
  { id:"N01",  n:15, cat:"Naturaleza",  es:["Cuido los","animales"],              en:["I Care for","Animals"]               },
  { id:"N02",  n:16, cat:"Naturaleza",  es:["Amo al","planeta"],                  en:["I Love","the Planet"]                },
  { id:"B01",  n:17, cat:"Bondad",      es:["Compartir","me hace feliz"],         en:["Sharing","Makes Me Happy"]           },
  { id:"B02",  n:18, cat:"Bondad",      es:["Hablo con","bondad"],                en:["I Speak","with Kindness"]            },
  { id:"B03",  n:19, cat:"Bondad",      es:["Soy un buen","amigo"],               en:["I Am a","Good Friend"]               },
  { id:"B04",  n:20, cat:"Bondad",      es:["Escucho con","el corazón"],          en:["I Listen","with My Heart"]           },
  { id:"B05",  n:21, cat:"Bondad",      es:["Mi corazón","es bondadoso"],         en:["My Heart","Is Kind"]                 },
  { id:"B06",  n:22, cat:"Bondad",      es:["Ayudar","me hace bien"],             en:["Helping","Feels Good"]               },
  { id:"N03",  n:23, cat:"Naturaleza",  es:["Soy un rayito","de sol"],            en:["I Am a Ray","of Sunshine"]           },
  { id:"CA01", n:24, cat:"Calma",       es:["Respiro","paz y calma"],             en:["I Breathe","Peace and Calm"]         },
  { id:"G02",  n:25, cat:"Gratitud",    es:["Hoy elijo","la felicidad"],          en:["Today I Choose","Happiness"]         },
  { id:"G03",  n:26, cat:"Gratitud",    es:["Dibujo mis","emociones"],            en:["I Draw","My Feelings"]               },
  { id:"G04",  n:27, cat:"Gratitud",    es:["Recuerdo cosas","bonitas"],          en:["I Remember","Beautiful Things"]      },
  { id:"CA02", n:28, cat:"Calma",       es:["Eres mi","lugar seguro"],            en:["You Are My","Safe Place"]            },
  { id:"G05",  n:29, cat:"Gratitud",    es:["Escribo lo que","me alegra"],        en:["I Write What","Makes Me Happy"]      },
  { id:"CA03", n:30, cat:"Calma",       es:["Nombro mi","emoción"],               en:["I Name","My Feeling"]                },
  { id:"G06",  n:31, cat:"Gratitud",    es:["Observo","la belleza"],              en:["I Notice","Beauty"]                  },
];

const TOTAL = DECK.length;

const CATS_ES = ["Todas", "Confianza", "Amor Propio", "Gratitud", "Naturaleza", "Calma", "Bondad"];
const CATS_EN = ["All",   "Confidence","Self-Love",   "Gratitude","Nature",    "Calm",  "Kindness"];
const EN_TO_CAT = { All:"Todas", Confidence:"Confianza", "Self-Love":"Amor Propio", Gratitude:"Gratitud", Nature:"Naturaleza", Calm:"Calma", Kindness:"Bondad" };

// ── CARD ─────────────────────────────────────────────────
function Card({ card, idx, lang, badgeLabel, onClick }) {
  const badge  = BADGE_COLORS[idx % BADGE_COLORS.length];
  const imgSrc = CARD_IMAGES[card.n % CARD_IMAGES.length];
  const num    = String(card.n).padStart(2, "0");
  const tot    = String(TOTAL).padStart(2, "0");
  const lines  = card[lang];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.55) }}
      whileHover={{ y: -10, transition: { duration: 0.18 } }}
      onClick={() => onClick(card)}
      style={{ cursor: "pointer" }}
    >
      <div style={{
        background: "white",
        borderRadius: 20,
        padding: "14px 12px 10px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        aspectRatio: "3/4",
        position: "relative",
        transition: "box-shadow 0.2s",
      }}>

        {/* Badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <span style={{
            background: badge.bg,
            color: badge.text,
            fontSize: 9,
            fontWeight: 700,
            padding: "4px 11px",
            borderRadius: 99,
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
          }}>
            {badgeLabel}
          </span>
        </div>

        {/* Animal image */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6px",
          overflow: "hidden",
        }}>
          <img
            src={imgSrc}
            alt={lines.join(" ")}
            style={{
              width: "90%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Affirmation text */}
        <p style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(0.9rem, 2.6vw, 1.15rem)",
          fontWeight: 600,
          color: "#5A3D30",
          textAlign: "center",
          lineHeight: 1.28,
          margin: "10px 4px 4px",
        }}>
          {lines.join("\n")}
        </p>

        {/* Card number */}
        <p style={{
          fontSize: 9,
          color: "#C0AFA0",
          textAlign: "right",
          margin: "2px 4px 0",
          letterSpacing: "0.08em",
        }}>
          {num} / {tot}
        </p>
      </div>
    </motion.div>
  );
}

// ── MODAL ─────────────────────────────────────────────────
function Modal({ card, lang, badgeLabel, onClose }) {
  if (!card) return null;
  const badge  = BADGE_COLORS[card.n % BADGE_COLORS.length];
  const imgSrc = CARD_IMAGES[card.n % CARD_IMAGES.length];
  const lines  = card[lang];
  const num    = String(card.n).padStart(2, "0");
  const tot    = String(TOTAL).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(60,40,30,0.65)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 999, padding: 20,
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.84, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.88 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: "min(380px, 92vw)",
          background: "white",
          borderRadius: 24,
          boxShadow: "0 40px 100px rgba(0,0,0,0.25)",
          overflow: "hidden",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(0,0,0,0.08)", border: "none",
            borderRadius: "50%", width: 30, height: 30,
            cursor: "pointer", fontSize: 14, color: "#5C3A10",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, zIndex: 10,
          }}
        >✕</button>

        {/* Card preview */}
        <div style={{ padding: "28px 28px 0", display: "flex", justifyContent: "center" }}>
          <div style={{
            width: 180,
            background: "white",
            borderRadius: 18,
            padding: "12px 10px 8px",
            boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
            display: "flex",
            flexDirection: "column",
            aspectRatio: "3/4",
          }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <span style={{
                background: badge.bg, color: badge.text,
                fontSize: 8, fontWeight: 700,
                padding: "3px 10px", borderRadius: 99,
              }}>
                {badgeLabel}
              </span>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={imgSrc} alt={lines.join(" ")} style={{ width: "85%", objectFit: "contain" }} />
            </div>
            <p style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "0.95rem", fontWeight: 600,
              color: "#5A3D30", textAlign: "center",
              lineHeight: 1.28, margin: "8px 2px 2px",
            }}>
              {lines.join("\n")}
            </p>
            <p style={{ fontSize: 8, color: "#C0AFA0", textAlign: "right", margin: "2px 2px 0" }}>
              {num} / {tot}
            </p>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "20px 28px 28px", textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: "#F5F2EF", borderRadius: 99,
            padding: "4px 14px", marginBottom: 12,
          }}>
            <span style={{ fontSize: 13 }}>{CAT_ICON[card.cat]}</span>
            <span style={{ fontSize: 11, color: "#8A7060", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
              {card.cat}
            </span>
          </div>
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "1.5rem", fontWeight: 700,
            color: "#3A2820", lineHeight: 1.25,
          }}>
            {lines.join(" ")}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── APP ───────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("es");
  const [cat,  setCat]  = useState("Todas");
  const [sel,  setSel]  = useState(null);

  const t    = T[lang];
  const CATS = lang === "es" ? CATS_ES : CATS_EN;

  const visible = cat === "Todas"
    ? DECK
    : DECK.filter(c => c.cat === cat);

  function handleCatClick(displayName) {
    const key = lang === "es" ? displayName : (EN_TO_CAT[displayName] || "Todas");
    setCat(key);
  }

  function getActiveCatDisplay() {
    if (lang === "es") return cat;
    const map = { Todas:"All", Confianza:"Confidence", "Amor Propio":"Self-Love", Gratitud:"Gratitude", Naturaleza:"Nature", Calma:"Calm", Bondad:"Kindness" };
    return map[cat] || "All";
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F5F2EF" }}>

      {/* HEADER */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
          marginBottom: 6,
        }}>
          {/* Title */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <h1 style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
              fontWeight: 700,
              color: "#3A2820",
              margin: 0,
              lineHeight: 1,
            }}>
              {t.title}
            </h1>
            <span style={{
              fontSize: "0.68rem",
              letterSpacing: "0.28em",
              color: "#B0A090",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>
              {visible.length} {t.cartas}
            </span>
          </div>

          {/* Lang toggle */}
          <div style={{
            display: "flex", background: "#EAE5E0",
            borderRadius: 99, padding: 3, gap: 2,
          }}>
            {["es","en"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: "5px 14px", borderRadius: 99,
                border: "none", cursor: "pointer",
                background: lang === l ? "white" : "transparent",
                color: lang === l ? "#3A2820" : "#90807A",
                fontWeight: lang === l ? 700 : 500,
                fontSize: 11, letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "all .18s",
                boxShadow: lang === l ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
              }}>
                {l === "es" ? "ES" : "EN"}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid #DDD8D2", margin: "10px 0 20px" }} />

        {/* Category pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {CATS.map(c => {
            const isActive = getActiveCatDisplay() === c;
            const internalCat = lang === "es" ? c : (EN_TO_CAT[c] || "Todas");
            return (
              <motion.button
                key={c}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleCatClick(c)}
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "7px 16px", borderRadius: 99,
                  background: isActive ? "#5A3D30" : "white",
                  color: isActive ? "white" : "#8A7060",
                  border: "none",
                  fontSize: 12,
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  boxShadow: isActive
                    ? "0 4px 14px rgba(90,61,48,0.30)"
                    : "0 1px 5px rgba(0,0,0,0.07)",
                  transition: "all .18s",
                }}
              >
                {c !== CATS[0] && CAT_ICON[internalCat] && (
                  <span style={{ fontSize: 13 }}>{CAT_ICON[internalCat]}</span>
                )}
                {c}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* CARD GRID */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 48px" }}>
        <motion.div layout style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
          gap: 16,
        }}>
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => (
              <Card
                key={c.id}
                card={c}
                idx={i}
                lang={lang}
                badgeLabel={t.badgeLabel}
                onClick={setSel}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {sel && (
          <Modal
            card={sel}
            lang={lang}
            badgeLabel={t.badgeLabel}
            onClose={() => setSel(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
