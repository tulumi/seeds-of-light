#!/usr/bin/env node
/**
 * Seeds of Light — PDF Generator
 * Genera: seeds-of-light-cartas.pdf y seeds-of-light-libro.pdf
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const CARDS_DIR  = path.join(__dirname, '../public/cards');
const OUTPUT_DIR = path.join(__dirname, '../pdfs');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

// ─── PALETA ─────────────────────────────────────────────────
const C = {
  dark:    '#3C3228',
  cream:   '#FAF6F0',
  creamD:  '#F2EBE0',
  gold:    '#C89040',
  goldL:   '#E8C878',
  blush:   '#D4A090',
  sage:    '#A8BFA8',
  soft:    '#A89880',
  mid:     '#7A6A58',
  white:   '#FFFFFF',
};

const BADGE = [
  { bg:'#F9D0D8', text:'#9A3A50' },
  { bg:'#F7E4A4', text:'#7A5A18' },
  { bg:'#C6DEC8', text:'#3A6040' },
  { bg:'#B6D4E2', text:'#285870' },
  { bg:'#F0D0C0', text:'#8A4530' },
  { bg:'#D4C8E8', text:'#504070' },
  { bg:'#B8E0D8', text:'#286858' },
];

// ─── DATOS COMPLETOS DE LAS 40 CARTAS ────────────────────────
const DECK = [
  // Afirmaciones (32 cartas)
  { n:1,  cat:'Afirmación', badge:'Afirmación del día', title:'El espejo del amor',       lines:['Soy amado','y valorado'],          q1:'¿Cómo le demuestras tu amor hoy sin palabras?',               q2:'¿Quién te hizo sentir amado cuando eras niño?',              age:'3–7', min:2 },
  { n:2,  cat:'Afirmación', badge:'Afirmación del día', title:'Lugar seguro',              lines:['Eres mi','lugar seguro'],           q1:'¿Qué lugar en casa te hace sentir más protegido?',             q2:'¿Cómo haces sentir seguro a alguien que amas?',              age:'3–7', min:2 },
  { n:3,  cat:'Afirmación', badge:'Afirmación del día', title:'Tu sonrisa ilumina',        lines:['Mi sonrisa','ilumina el mundo'],    q1:'¿Cuándo fue la última vez que alguien te hizo sonreír de verdad?', q2:'¿Qué hace que tu hijo sonría más?',                     age:'3–7', min:2 },
  { n:4,  cat:'Afirmación', badge:'Afirmación del día', title:'Soy suficiente',            lines:['Soy suficiente','tal como soy'],    q1:'¿Hay algo de ti que desearías cambiar? ¿Por qué?',             q2:'¿Qué es lo que más te gusta de tu hijo exactamente como es?', age:'3–7', min:3 },
  { n:5,  cat:'Afirmación', badge:'Afirmación del día', title:'Elijo la felicidad',        lines:['Hoy elijo','la felicidad'],         q1:'¿Qué pequeña cosa te hace feliz hoy?',                         q2:'¿Puedes elegir sentirte bien incluso en días difíciles?',    age:'3–7', min:2 },
  { n:6,  cat:'Afirmación', badge:'Afirmación del día', title:'Respiro paz',               lines:['Respiro paz','y calma'],            q1:'¿Cuándo sientes más calma en el día?',                         q2:'Respira juntos 3 veces. ¿Cómo se siente tu cuerpo ahora?',  age:'3–7', min:3 },
  { n:7,  cat:'Afirmación', badge:'Afirmación del día', title:'Gracias por hoy',           lines:['Doy gracias','por este día'],       q1:'¿Qué es lo mejor que pasó hoy?',                               q2:'¿A quién le agradeces algo este día?',                       age:'3–7', min:2 },
  { n:8,  cat:'Afirmación', badge:'Afirmación del día', title:'Corazón bondadoso',         lines:['Mi corazón','es bondadoso'],        q1:'¿Cuándo fuiste amable hoy sin que nadie te lo pidiera?',       q2:'¿Cómo se siente ser bondadoso?',                             age:'3–7', min:2 },
  { n:9,  cat:'Afirmación', badge:'Afirmación del día', title:'Soy paciente',              lines:['Soy paciente','conmigo mismo'],     q1:'¿Qué te cuesta más ser paciente?',                             q2:'¿Cómo te ayudas cuando te frustras?',                        age:'4–7', min:3 },
  { n:10, cat:'Afirmación', badge:'Afirmación del día', title:'Mi voz importa',            lines:['Mi voz','importa'],                 q1:'¿Cuándo sientes que alguien te escucha de verdad?',            q2:'¿Qué quieres que tu hijo sepa que siempre puede decirte?',   age:'3–7', min:2 },
  { n:11, cat:'Afirmación', badge:'Afirmación del día', title:'Me encanta aprender',       lines:['Me encanta','aprender'],            q1:'¿Qué cosa nueva aprendiste esta semana?',                      q2:'¿Qué le gustaría aprender a tu hijo?',                       age:'3–7', min:2 },
  { n:12, cat:'Afirmación', badge:'Afirmación del día', title:'Soy luz y alegría',         lines:['Soy luz','y alegría'],              q1:'¿Cuándo se te ilumina la cara sin darte cuenta?',              q2:'¿Quién trae más alegría a tu familia?',                      age:'3–7', min:2 },
  { n:13, cat:'Afirmación', badge:'Afirmación del día', title:'Soy valiente',              lines:['Soy','valiente'],                   q1:'¿Cuándo hiciste algo que te daba miedo?',                      q2:'¿De qué momento valiente te sientes más orgulloso/a?',       age:'3–7', min:2 },
  { n:14, cat:'Afirmación', badge:'Afirmación del día', title:'Creativo y brillante',      lines:['Soy creativo','y brillante'],       q1:'¿Qué cosas creativas hiciste esta semana?',                    q2:'¿En qué crees que tu hijo tiene un talento especial?',       age:'3–7', min:2 },
  { n:15, cat:'Afirmación', badge:'Afirmación del día', title:'Puedo lograr todo',         lines:['Puedo lograr','grandes cosas'],     q1:'¿Qué quieres lograr cuando seas grande?',                      q2:'¿Qué hace tu familia para apoyar los sueños de tu hijo?',   age:'4–7', min:3 },
  { n:16, cat:'Afirmación', badge:'Afirmación del día', title:'Merezco amor',              lines:['Merezco amor','y alegría'],         q1:'¿Hay algo que hiciste y sigues castigándote por eso?',         q2:'¿Cómo le enseñas a tu hijo que merece amor sin condiciones?', age:'4–7', min:3 },
  { n:17, cat:'Afirmación', badge:'Afirmación del día', title:'Corazón grande',            lines:['Tengo un','corazón grande'],        q1:'¿Quién cabe en el corazón de tu hijo?',                        q2:'¿Cómo cuidas tu propio corazón como padre/madre?',           age:'3–7', min:2 },
  { n:18, cat:'Afirmación', badge:'Afirmación del día', title:'Disfruto el presente',      lines:['Disfruto','cada momento'],          q1:'¿Cuál fue el momento más disfrutado hoy?',                     q2:'¿Qué pasa cuando dejas el teléfono y solo estás con tu hijo?', age:'3–7', min:2 },
  { n:19, cat:'Afirmación', badge:'Afirmación del día', title:'Todo estará bien',          lines:['Todo','estará bien'],               q1:'¿Hay algo que te preocupa ahora? ¿Puedes soltarlo un momento?', q2:'¿Cómo le dices a tu hijo que todo estará bien cuando llora?', age:'3–7', min:3 },
  { n:20, cat:'Afirmación', badge:'Afirmación del día', title:'Cuerpo fuerte y sano',      lines:['Mi cuerpo es','fuerte y sano'],     q1:'¿Qué le agradeces a tu cuerpo hoy?',                           q2:'¿Cómo cuidan juntos su salud?',                              age:'3–7', min:2 },
  { n:21, cat:'Afirmación', badge:'Afirmación del día', title:'Imaginación mágica',        lines:['Mi imaginación','es mágica'],       q1:'¿Qué inventarías si pudieras crear cualquier cosa?',           q2:'¿Cuándo fue la última vez que jugaron a imaginar juntos?',   age:'3–6', min:2 },
  { n:22, cat:'Afirmación', badge:'Afirmación del día', title:'Brillo desde adentro',      lines:['Brillo','desde adentro'],           q1:'¿Qué es lo que más brilla de tu hijo?',                        q2:'¿Qué te hace brillar a ti?',                                 age:'3–7', min:2 },
  { n:23, cat:'Afirmación', badge:'Afirmación del día', title:'Libre de soñar',            lines:['Soy libre','de soñar'],             q1:'¿Cuál es el sueño más grande de tu hijo ahora mismo?',        q2:'¿Qué sueños tenías tú a su edad?',                           age:'4–7', min:3 },
  { n:24, cat:'Afirmación', badge:'Afirmación del día', title:'Respiro profundo',          lines:['Respiro','profundo'],               q1:'Haz 3 respiraciones juntos ahora. ¿Cómo se siente?',           q2:'¿En qué momentos del día te vendría bien recordar respirar?', age:'3–7', min:3 },
  { n:25, cat:'Afirmación', badge:'Afirmación del día', title:'Cuido la naturaleza',       lines:['Cuido a','la naturaleza'],          q1:'¿Qué animal o planta le llama la atención a tu hijo?',         q2:'¿Qué pequeña acción pueden hacer juntos por el planeta?',    age:'3–7', min:2 },
  { n:26, cat:'Afirmación', badge:'Afirmación del día', title:'Feliz siendo yo',           lines:['Soy feliz','siendo yo'],            q1:'¿Qué le hace única/único a tu hijo?',                          q2:'¿Te sientes feliz siendo quien eres? ¿Cuándo más?',          age:'4–7', min:3 },
  { n:27, cat:'Afirmación', badge:'Afirmación del día', title:'Confío en mi camino',       lines:['Confío en','mi camino'],            q1:'¿Hay algo difícil que estás atravesando con tu hijo ahora?',  q2:'¿Cómo le enseñas que los errores son parte del camino?',     age:'4–7', min:3 },
  { n:28, cat:'Afirmación', badge:'Afirmación del día', title:'Todo empieza con amor',     lines:['Todo empieza','con amor'],          q1:'¿Cuál es el acto de amor más pequeño de hoy?',                q2:'¿Cómo comienza tu día cuando empieza con calma?',            age:'3–7', min:2 },
  { n:29, cat:'Afirmación', badge:'Afirmación del día', title:'Compartir es amar',         lines:['Compartir','es amar'],              q1:'¿Qué compartiste hoy con alguien?',                            q2:'¿Qué es difícil de compartir y por qué?',                    age:'3–6', min:2 },
  { n:30, cat:'Afirmación', badge:'Afirmación del día', title:'Escucho mi corazón',        lines:['Escucho a','mi corazón'],           q1:'¿Qué le dice tu corazón que hagas hoy?',                      q2:'¿Cómo le enseñas a tu hijo a confiar en sus sentimientos?',  age:'4–7', min:3 },
  { n:31, cat:'Afirmación', badge:'Afirmación del día', title:'Mi familia es mi hogar',    lines:['Mi familia','es mi hogar'],         q1:'¿Qué hace que tu casa se sienta hogar?',                       q2:'¿Cuál es el recuerdo familiar favorito de tu hijo?',         age:'3–7', min:2 },
  { n:32, cat:'Afirmación', badge:'Afirmación del día', title:'Soy especial',              lines:['Soy','especial'],                   q1:'¿Qué hace a tu hijo absolutamente especial e irrepetible?',   q2:'¿Cuándo fue la última vez que se lo dijiste?',               age:'3–7', min:2 },
  // Mindfulness (8 cartas)
  { n:33, cat:'Mindfulness', badge:'Actividad de mindfulness', title:'Viaje al arcoíris',   lines:['Cierra los ojos.','Imagina un arcoíris','brillando en ti'],            q1:'¿De qué color se siente tu corazón hoy?',                      q2:'¿Puedes imaginar ese color llenándote de calma?',            age:'3–7', min:4 },
  { n:34, cat:'Mindfulness', badge:'Actividad de mindfulness', title:'5 cosas felices',     lines:['Busca 5 cosas','que te hagan feliz','y cuéntaselas a mamá'],           q1:'¿Cuál de las 5 cosas te sorprendió más?',                      q2:'¿Por qué esas cosas te hacen feliz?',                        age:'3–7', min:5 },
  { n:35, cat:'Mindfulness', badge:'Actividad de mindfulness', title:'Respiración de barriga', lines:['Respira profundo','3 veces, llenando','tu barriga'],              q1:'¿Sientes cómo se mueve tu barriga?',                           q2:'¿Cuándo más podrías usar esta respiración?',                 age:'3–7', min:3 },
  { n:36, cat:'Mindfulness', badge:'Actividad de mindfulness', title:'El abrazo más fuerte', lines:['Abraza fuerte','a quien más amas'],                                   q1:'¿Cuántos segundos pueden aguantar abrazados?',                 q2:'¿Cómo te sientes después de un abrazo largo?',               age:'3–7', min:3 },
  { n:37, cat:'Mindfulness', badge:'Actividad de mindfulness', title:'Contar las nubes',     lines:['Mira al cielo','y cuenta','las nubes'],                               q1:'¿De qué te recuerdan las nubes?',                              q2:'¿Puedes dejar que tus pensamientos pasen como nubes?',       age:'3–7', min:4 },
  { n:38, cat:'Mindfulness', badge:'Actividad de mindfulness', title:'Siente tu corazón',    lines:['Pon la mano','en tu corazón','y siente latir'],                       q1:'¿Cuántas veces late por minuto?',                              q2:'¿Qué le dirías a tu corazón si pudiera escucharte?',         age:'4–7', min:4 },
  { n:39, cat:'Mindfulness', badge:'Actividad de mindfulness', title:'Dibuja tus emociones',  lines:['Dibuja cómo','te sientes','hoy'],                                   q1:'¿Qué colores usaste y por qué?',                               q2:'¿Hay algo en el dibujo que quieras hablar?',                 age:'3–7', min:5 },
  { n:40, cat:'Mindfulness', badge:'Actividad de mindfulness', title:'Raíces fuertes',        lines:['Imagina raíces','bajo tus pies.','Eres fuerte'],                    q1:'¿Cómo se siente estar enraizado/a como un árbol?',             q2:'¿Qué te hace sentir fuerte y seguro/a?',                     age:'3–7', min:4 },
];

// ─── HELPERS ────────────────────────────────────────────────
function hex(h) {
  const r = parseInt(h.slice(1,3),16);
  const g = parseInt(h.slice(3,5),16);
  const b = parseInt(h.slice(5,7),16);
  return [r/255, g/255, b/255];
}
function setFill(doc, h)   { const [r,g,b]=hex(h); doc.fillColor([r*255,g*255,b*255].map(Math.round)); }
function setStroke(doc, h) { const [r,g,b]=hex(h); doc.strokeColor([r*255,g*255,b*255].map(Math.round)); }

// ─── PDF DE CARTAS ───────────────────────────────────────────
async function generateCardsPDF() {
  console.log('📄 Generando seeds-of-light-cartas.pdf...');

  // A4 horizontal: 841.89 × 595.28 pt (1pt = 1/72 inch)
  const doc = new PDFDocument({ size:'A4', layout:'landscape', margin:0, info:{
    Title:'Seeds of Light — Cartas de Afirmación',
    Author:'Seeds of Light',
    Subject:'40 cartas para imprimir',
  }});

  const out = fs.createWriteStream(path.join(OUTPUT_DIR,'seeds-of-light-cartas.pdf'));
  doc.pipe(out);

  const PW = 841.89, PH = 595.28;
  const MARGIN = 24;
  const GAP = 10;
  const COLS = 4, ROWS = 2;
  const CARDS_PER_PAGE = COLS * ROWS;

  // Tamaño de cada carta (proporción 2:3)
  const available_w = PW - MARGIN*2 - GAP*(COLS-1);
  const available_h = PH - MARGIN*2 - GAP*(ROWS-1);
  const CW = Math.floor(available_w / COLS);
  const CH = Math.floor(available_h / ROWS);
  const RADIUS = 12;

  for (let pageStart = 0; pageStart < DECK.length; pageStart += CARDS_PER_PAGE) {
    if (pageStart > 0) doc.addPage();

    // Fondo de página
    doc.rect(0,0,PW,PH).fill('#FAF6F0');

    // Marca de recorte (guías sutiles)
    doc.lineWidth(.3).dash(4,{space:4});
    for (let col=0; col<COLS+1; col++) {
      const x = MARGIN + col*(CW+GAP) - GAP/2;
      doc.moveTo(x,0).lineTo(x,PH).strokeColor('#CCC').stroke();
    }
    for (let row=0; row<ROWS+1; row++) {
      const y = MARGIN + row*(CH+GAP) - GAP/2;
      doc.moveTo(0,y).lineTo(PW,y).strokeColor('#CCC').stroke();
    }
    doc.undash();

    // Render cartas
    for (let i=0; i<CARDS_PER_PAGE; i++) {
      const cardIdx = pageStart + i;
      if (cardIdx >= DECK.length) break;
      const card = DECK[cardIdx];
      const badge = BADGE[card.n % BADGE.length];

      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const x = MARGIN + col*(CW+GAP);
      const y = MARGIN + row*(CH+GAP);

      // Fondo carta
      doc.roundedRect(x,y,CW,CH,RADIUS).fill('#FFFFFF');

      // Borde suave
      doc.roundedRect(x,y,CW,CH,RADIUS).lineWidth(.8).strokeColor('#E8D8C8').stroke();

      // Badge categoria
      const bW = 90, bH = 14;
      const bX = x + (CW-bW)/2;
      const bY = y + 12;
      doc.roundedRect(bX,bY,bW,bH,7).fill(badge.bg);
      doc.fillColor(badge.text).fontSize(6).font('Helvetica-Bold')
        .text(card.badge.toUpperCase(), bX, bY+4, {width:bW, align:'center'});

      // Imagen de la carta
      const imgFile = path.join(CARDS_DIR, `c${String(card.n).padStart(2,'0')}.png`);
      if (fs.existsSync(imgFile)) {
        const imgSize = Math.min(CW*.62, CH*.45);
        const imgX = x + (CW-imgSize)/2;
        const imgY = bY + bH + 8;
        doc.image(imgFile, imgX, imgY, {width:imgSize, height:imgSize, fit:[imgSize,imgSize]});
      }

      // Afirmación
      const textY = y + CH - 50;
      doc.fillColor('#5A3D30').fontSize(7.5).font('Helvetica-Oblique')
        .text(card.lines.join(' '), x+8, textY, {width:CW-16, align:'center'});

      // Número
      doc.fillColor('#C0AFA0').fontSize(5.5).font('Helvetica')
        .text(`${String(card.n).padStart(2,'0')} / 40`, x+8, y+CH-14, {width:CW-16, align:'center'});

      // Estrellas decorativas
      doc.fillColor('#D4A85C').fontSize(6).font('Helvetica')
        .text('✦ ✦ ✦', x+8, y+CH-22, {width:CW-16, align:'center'});
    }

    // Número de página
    const pageNum = Math.floor(pageStart/CARDS_PER_PAGE)+1;
    const totalPages = Math.ceil(DECK.length/CARDS_PER_PAGE);
    doc.fillColor('#C0AFA0').fontSize(7).font('Helvetica')
      .text(`Seeds of Light — Cartas para imprimir — Página ${pageNum} de ${totalPages}`, 0, PH-14, {width:PW, align:'center'});
  }

  doc.end();
  await new Promise(r => out.on('finish', r));
  console.log('✅ seeds-of-light-cartas.pdf generado (', DECK.length, 'cartas,', Math.ceil(DECK.length/CARDS_PER_PAGE), 'páginas)');
}

// ─── PDF DEL LIBRO GUÍA ──────────────────────────────────────
async function generateBookPDF() {
  console.log('📖 Generando seeds-of-light-libro.pdf...');

  const doc = new PDFDocument({ size:'A4', layout:'portrait', margin:0, info:{
    Title:'Seeds of Light — Libro Guía para Familias',
    Author:'Seeds of Light',
    Subject:'Guía de acompañamiento emocional para cada carta',
  }});

  const out = fs.createWriteStream(path.join(OUTPUT_DIR,'seeds-of-light-libro.pdf'));
  doc.pipe(out);

  const PW = 595.28, PH = 841.89;

  // ── PORTADA ──
  doc.rect(0,0,PW,PH).fill('#FAF6F0');

  // Franja dorada superior
  doc.rect(0,0,PW,8).fill('#C89040');

  // Logo / título
  doc.fillColor('#3C3228').fontSize(38).font('Helvetica')
    .text('Seeds of Light', 0, 160, {width:PW, align:'center'});

  doc.fillColor('#D4A090').fontSize(22).font('Helvetica-Oblique')
    .text('Semillas de Luz', 0, 206, {width:PW, align:'center'});

  // Imagen representativa (primera carta)
  const coverImg = path.join(CARDS_DIR,'c01.png');
  if (fs.existsSync(coverImg)) {
    const iS = 200;
    doc.image(coverImg, (PW-iS)/2, 260, {width:iS, height:iS, fit:[iS,iS]});
  }

  doc.fillColor('#7A6A58').fontSize(14).font('Helvetica')
    .text('Libro Guía para Familias', 0, 480, {width:PW, align:'center'});

  doc.fillColor('#A89880').fontSize(10).font('Helvetica')
    .text('Cómo acompañar emociones difíciles\ny fortalecer la conexión con tus hijos', 0, 504, {width:PW, align:'center'});

  // Línea decorativa
  doc.moveTo(PW/2-60,560).lineTo(PW/2+60,560).lineWidth(1).strokeColor('#E8C878').stroke();

  doc.fillColor('#C89040').fontSize(8).font('Helvetica')
    .text('✦   40 cartas · Afirmaciones · Mindfulness   ✦', 0, 572, {width:PW, align:'center'});

  // Franja inferior
  doc.rect(0,PH-8,PW,8).fill('#C89040');

  // ── PÁGINA DE INTRODUCCIÓN ──
  doc.addPage();
  doc.rect(0,0,PW,PH).fill('#FFFFFF');
  doc.rect(0,0,PW,6).fill('#C89040');
  doc.rect(0,PH-6,PW,6).fill('#C89040');

  const M = 56;
  doc.fillColor('#3C3228').fontSize(22).font('Helvetica')
    .text('Cómo usar este libro', M, 70, {width:PW-M*2});

  doc.fillColor('#A89880').fontSize(9).font('Helvetica')
    .text('GUÍA PARA PADRES, MADRES Y CUIDADORES', M, 100, {width:PW-M*2, characterSpacing:1.2});

  doc.moveDown(.3);

  const intro = [
    'Seeds of Light nació con una sola intención: ayudarte a crear un momento de conexión real con tu hijo cada día — sin esfuerzo, sin complicaciones.',
    '',
    'Este libro es tu guía de acompañamiento. Por cada una de las 40 cartas encontrarás:',
    '  ✦  La afirmación completa',
    '  ✦  Preguntas para conversar juntos',
    '  ✦  El tiempo sugerido y la edad recomendada',
    '',
    'Cómo empezar:',
    '1. Deja que tu hijo elija la carta que más le llame.',
    '2. Léela en voz alta juntos.',
    '3. Usa las preguntas para iniciar una conversación.',
    '4. No hay respuestas correctas — solo escucha.',
    '',
    'No necesitas seguir el orden. No necesitas hacerlo perfecto.',
    'Solo necesitas estar presente.',
  ];

  let ty = 120;
  intro.forEach(line => {
    if (line === '') { ty += 10; return; }
    const isBold = line.startsWith('Cómo') || line.startsWith('Seeds');
    doc.fillColor(line.startsWith('  ✦') ? '#C89040' : '#5A3D30')
      .fontSize(isBold ? 11 : 10)
      .font(isBold ? 'Helvetica-Bold' : 'Helvetica')
      .text(line, M, ty, {width:PW-M*2, lineGap:3});
    ty += (isBold ? 20 : 16);
  });

  // ── PÁGINAS DE CARTAS (una por carta) ──
  for (const card of DECK) {
    doc.addPage();
    doc.rect(0,0,PW,PH).fill('#FAF6F0');

    const badge = BADGE[card.n % BADGE.length];
    const isMind = card.cat === 'Mindfulness';
    const accentColor = isMind ? '#7090B0' : '#D4A090';

    // Franja de color superior
    doc.rect(0,0,PW,6).fill(accentColor);

    // Header: categoría + número
    doc.fillColor(accentColor).fontSize(7).font('Helvetica-Bold')
      .text(card.cat.toUpperCase(), M, 22, {characterSpacing:1.8});
    doc.fillColor('#C0AFA0').fontSize(7).font('Helvetica')
      .text(`Carta ${String(card.n).padStart(2,'0')} / 40`, 0, 22, {width:PW-M, align:'right'});

    // Imagen
    const imgFile = path.join(CARDS_DIR, `c${String(card.n).padStart(2,'0')}.png`);
    const imgSize = 130;
    const imgX = (PW-imgSize)/2;
    if (fs.existsSync(imgFile)) {
      doc.image(imgFile, imgX, 44, {width:imgSize, height:imgSize, fit:[imgSize,imgSize]});
    }

    // Título de la carta
    doc.fillColor('#3C3228').fontSize(18).font('Helvetica-Oblique')
      .text(card.title, 0, 184, {width:PW, align:'center'});

    // Afirmación (grande, en color)
    doc.fillColor(accentColor).fontSize(20).font('Helvetica-Oblique')
      .text(card.lines.join(' '), 0, 212, {width:PW, align:'center', lineGap:4});

    // Línea divisoria
    doc.moveTo(M+20,270).lineTo(PW-M-20,270).lineWidth(.8).strokeColor('#E8D0B8').stroke();

    // Sección de preguntas
    doc.fillColor('#A89880').fontSize(7.5).font('Helvetica-Bold')
      .text('PARA CONVERSAR JUNTOS', M, 282, {width:PW-M*2, align:'center', characterSpacing:1.4});

    // Pregunta 1
    doc.roundedRect(M,300,PW-M*2,52,8).fill('#FFFFFF');
    doc.roundedRect(M,300,PW-M*2,52,8).lineWidth(.6).strokeColor('#E8D0B8').stroke();
    doc.fillColor('#8A6A50').fontSize(8).font('Helvetica-Oblique')
      .text(card.q1, M+14, 312, {width:PW-M*2-28, lineGap:3});

    // Pregunta 2
    doc.roundedRect(M,362,PW-M*2,52,8).fill('#FFFFFF');
    doc.roundedRect(M,362,PW-M*2,52,8).lineWidth(.6).strokeColor('#E8D0B8').stroke();
    doc.fillColor('#8A6A50').fontSize(8).font('Helvetica-Oblique')
      .text(card.q2, M+14, 374, {width:PW-M*2-28, lineGap:3});

    // Espacio para notas
    doc.fillColor('#C0AFA0').fontSize(7).font('Helvetica')
      .text('Notas y reflexiones:', M, 428, {width:PW-M*2});
    doc.moveTo(M,444).lineTo(PW-M,444).lineWidth(.4).strokeColor('#D8C8B0').stroke();
    doc.moveTo(M,462).lineTo(PW-M,462).lineWidth(.4).strokeColor('#D8C8B0').stroke();
    doc.moveTo(M,480).lineTo(PW-M,480).lineWidth(.4).strokeColor('#D8C8B0').stroke();
    doc.moveTo(M,498).lineTo(PW-M,498).lineWidth(.4).strokeColor('#D8C8B0').stroke();

    // Footer: edad y tiempo
    doc.rect(0,PH-44,PW,44).fill(isMind ? '#EEF2F8' : '#FFF5F2');
    doc.fillColor('#A89880').fontSize(7.5).font('Helvetica')
      .text(`Edad recomendada: ${card.age} años`, M, PH-32, {width:(PW-M*2)/2});
    doc.fillColor('#A89880').fontSize(7.5).font('Helvetica')
      .text(`Tiempo sugerido: ~ ${card.min} min`, PW/2, PH-32, {width:(PW-M*2)/2, align:'right'});

    // Franja inferior
    doc.rect(0,PH-6,PW,6).fill(accentColor);
  }

  doc.end();
  await new Promise(r => out.on('finish', r));
  console.log('✅ seeds-of-light-libro.pdf generado (', DECK.length+2, 'páginas)');
}

// ─── MAIN ────────────────────────────────────────────────────
(async () => {
  try {
    await generateCardsPDF();
    await generateBookPDF();
    console.log('\n🎉 PDFs listos en /pdfs:');
    console.log('   📄 seeds-of-light-cartas.pdf — 40 cartas para imprimir (8 por hoja A4)');
    console.log('   📖 seeds-of-light-libro.pdf  — libro guía completo (42 páginas)');
  } catch(e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
})();
