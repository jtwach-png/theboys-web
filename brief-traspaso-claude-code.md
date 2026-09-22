# The Boys (theboys.cl) — Brief de construcción para Claude Code

Este documento resume TODAS las decisiones ya tomadas para el rediseño de theboys.cl.
No cuestionar estas decisiones, están validadas. El hero adjunto (`theboys-hero-prototipo.html`)
es la referencia visual y técnica exacta a seguir para el resto del sitio.

## 1. Stack técnico

- **Framework:** Astro (arquitectura de islas, solo carga JS donde hay interactividad real)
- **Animación de scroll:** GSAP + ScrollTrigger
- **CMS:** Storyblok o Sanity (headless, desacoplado, para editar contenido sin tocar código)
- **Hosting:** Vercel
- **Por qué no WordPress + Elementor:** genera HTML/CSS/JS inflado en todas las secciones aunque se use el 10% de sus funciones. Es la causa raíz de que el sitio actual (theboys.cl) sea lento. No es optimizable después, hay que migrar de arquitectura.
- **Requisito no negociable:** velocidad de carga. No es una optimización posterior.

## 2. Sistema de diseño (tokens exactos)

### Color
```
--ink: #000000       /* fondo, negro puro (coincide con el logo y con los videos/renders */
--paper: #FAFAFA      /* texto principal sobre fondo negro */
--red: #FF2D2D        /* USO EXCLUSIVO: trazos a mano / acentos decorativos. NUNCA en botones */
--lime: #00FF00       /* verde de marca real (extraído del logo vectorial). USO: CTAs, logo "boys", detalles de acción */
--lila: #C9B8FF       /* USO EXCLUSIVO: Brave Labs (el diferenciador), en ningún otro lugar */
```

Regla dura: cada color cumple un solo rol. No repetir el mismo color en dos funciones distintas
dentro de una misma vista (aprendido en la iteración del hero: rojo en botón + trazo a la vez
generaba fatiga visual).

### Tipografía
- **Display/titulares:** Anton (Google Fonts), mayúsculas, condensada
- **Cuerpo:** Inter (Google Fonts)
- Tamaños de titular grande: usar `clamp()` calibrado al ancho de columna real, no a vw del
  viewport completo (un titular en columna angosta necesita un tope máximo menor o se desborda)

### Espaciado
Escala base 8px. Usar múltiplos consistentes (16, 24, 32, 40...), nunca números sueltos.
Evitar mezclar valores como 12px, 20px, 40px sin relación entre sí, se percibe como
"desordenado" aunque no se sepa nombrar por qué.

### Bordes de botones
Radio moderado (10px), NO pastilla completa (border-radius: 999px). El pill-shape es el
default genérico de cualquier IA/plantilla SaaS, no es de marca.

### Motion
- Ninguna animación de scroll dura más de 0.8s
- Un solo movimiento orquestado por sección, no varios compitiendo
- Distorsión de texto reactiva al cursor en el titular del hero (ver implementación en el HTML
  adjunto: filtro SVG feTurbulence + feDisplacementMap, actualizado con velocidad del mouse)
- Respetar siempre `prefers-reduced-motion`

## 3. Identidad de marca (del brief original, no inventar)

- Razón social: Marketing y Publicidad Moob SpA. Nombre de fantasía: The Boys
- Founders: José Tomás Wachtendorff (CSO) y Miguel Ángel Barahona (CCO)
- Tagline: "think brave!" — es texto de comunicación (headline), NO es el logo. El logo
  completo (cuadro + wordmark + tagline) es un asset aparte, uso como sello/marca de refuerzo,
  no como headline.
- Framework propio: Relevant Punch = Marca + Sociedad + Momentos
- Fotografía real de personas con actitud irreverente/rebelde es un recurso de marca
  documentado. El busto de David con lentes (video adjunto) es la ejecución actual de ese
  recurso, más distintivo que una foto de stock.
- Premios de Cannes Lions, Clio, Effie, etc. son trayectoria PERSONAL de Miguel Ángel Barahona,
  no de la agencia. Deben etiquetarse así explícitamente en su propia sección.

## 4. Estructura de página y orden de los 8 servicios

1. Hero (ver HTML adjunto, ya resuelto)
2. Relevant Punch (framework, aún sin construir)
3. **8 servicios**, en este orden (Brave Labs se subió del puesto 8 al 3 a propósito, es el
   diferenciador competitivo real, no debe quedar al final del scroll):
   1. Creativity
   2. Business Strategy
   3. **Brave Labs** (neurociencia aplicada: eye tracking, facial coding, tests de asociación
      implícita, UX, modelos predictivos — única agencia en Chile con laboratorio propio)
   4. Brand Strategy · Design
   5. Media · Analytics
   6. Experience
   7. Digital · Now
   8. Inside The Company
4. Clientes (logos reales, sin adornos): CMPC, Correos Chile, Candelaria (Lundin Mining), Paris
   (Cencosud), Universidad Autónoma de Chile, Líder (Walmart), Adidas, McDonald's, Banco
   Falabella, Visa, Unired, BICE, Mitsubishi, Nissan, BMW, Land Rover, MetLife, Bilz y Pap, Kem
   Xtreme, HC Group, Andrómaco, Uppi, Coopeuch, Universidad San Sebastián, AeroMéxico, PAG,
   Corona, DuocUC, Royal Canin, Sindelen, Philips, Haka Honu, Pedigree, Viña Casas del Bosque,
   Rosen, Colmena, Vías Chile, Ruta del Maipo, In Motion, Komatsu, Costa, Carozzi, Ambrosoli,
   Movistar, Gobierno de Chile, Cruz Verde, Laboratorios Maver, Beiersdorf, Sanofi
5. Trayectoria de Miguel Ángel (premios), en sección propia, etiquetada como personal del CCO
6. Contacto: José Tomás Wachtendorff (josetomas@theboys.cl, +56 9 8219 0769) y Miguel Ángel
   Barahona (miguelangel@theboys.cl, +56 9 9188 4340)

## 5. SEO

- La etiqueta técnica (H2 real) de la sección de servicios debe incluir la palabra "servicios"
  (mejor SEO, coincide con intención de búsqueda real). El copy visual puede seguir diciendo
  "los 8 pilares" como recurso de tono de marca, siempre que el H2/meta real diga "servicios".
- "Pilares" es jerga interna sin volumen de búsqueda, no debe ser la etiqueta técnica principal.

## 6. Hero: implementación de referencia (ya resuelta, no rehacer desde cero)

Archivo: `theboys-hero-prototipo.html` (adjunto)

- Grid de 3 columnas en desktop (≥900px): `minmax(0,540px) minmax(0,360px) minmax(0,420px)`,
  gap de 2vw entre columna 1 y 2, y 3vw extra antes de la columna 3 (video), para que el salto
  hacia el video se sienta mayor que el espacio entre las columnas de texto.
- Columna 1: kicker + titular "THINK BRAVE!" + trazo a mano animado
- Columna 2: subhead + credencial de Brave Labs + CTA
- Columna 3: video del busto (ver sección 7)
- El video se sincroniza en altura con la columna 1 vía JavaScript
  (`getBoundingClientRect().height`), recalculado en resize y tras `document.fonts.ready`. No
  es un valor fijo.
- Bajo 900px: una sola columna, video oculto por completo (no hay espacio vacío que resolver en
  mobile)
- Altura del hero: `min-height: 82vh` + `padding: 6vh 6vw` (NO usar 100vh, deja demasiado
  espacio vacío con el contenido repartido en columnas)

## 7. Assets adjuntos

- `theboys-hero-prototipo.html` — hero completo funcionando, usar como referencia exacta de
  código y diseño
- `the-boys-wordmark.svg` — logo recortado y derecho (sin cuadro ni rotación), para header.
  El SVG original tenía las letras ya dibujadas rectas, solo el cuadro de fondo estaba rotado
- `theboys-hero-bust-cropped.mp4` — video del busto con lentes, recortado al encuadre real
  (320×442, sin el margen negro del render original), 230KB, sin audio, listo para loop
- El fondo del video es negro puro (#000000), coincide exactamente con `--ink`. NO intentar
  quitar el fondo con chroma key: se probó y el marco negro de los lentes es casi el mismo
  negro que el fondo, el recorte por color daña el arte. No hace falta canal alfa, el negro
  puro ya resuelve la integración.

## 8. Pendiente / no resuelto todavía

- Contenido completo de Relevant Punch (solo existe el framework, falta el copy y diseño)
- Diseño de la sección de clientes (solo hay la lista, falta el tratamiento visual)
- Sección de trayectoria de Miguel Ángel
- Footer y sección de contacto
- Dónde usar el sello completo (logo + cuadro + "think brave!") como elemento decorativo,
  quedó pendiente de decidir en qué sección va
