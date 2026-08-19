---
name: Risk Builder
description: Sandbox interno de Clara para simular reglas de crédito sobre una cartera en vivo
colors:
  navy: "#16213E"
  teal: "#17A673"
  teal-tint: "rgba(23, 166, 115, 0.12)"
  bg: "#F7F8FA"
  white: "#FFFFFF"
  text-muted: "#5B6478"
  border: "#E1E4EA"
  amber: "#C87F0A"
  amber-tint: "rgba(200, 127, 10, 0.12)"
  red: "#C0392B"
  red-tint: "rgba(192, 57, 43, 0.12)"
typography:
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "32px"
    fontWeight: 700
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 700
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 500
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.03em"
rounded:
  sm: "8px"
  md: "10px"
  lg: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
components:
  button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.navy}"
    rounded: "{rounded.md}"
    padding: "14px 26px"
  button-secondary:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.navy}"
    rounded: "{rounded.md}"
    padding: "14px 26px"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.lg}"
  chip-ok:
    backgroundColor: "{colors.teal-tint}"
    textColor: "{colors.teal}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  chip-warning:
    backgroundColor: "{colors.amber-tint}"
    textColor: "{colors.amber}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  chip-danger:
    backgroundColor: "{colors.red-tint}"
    textColor: "{colors.red}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  nav-link-active:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
---

# Design System: Risk Builder

## Overview

**Creative North Star: "The Control Room"**

Risk Builder es una consola de mando calmada: los equipos de producto, riesgo, fraude y data science de Clara mueven palancas (las 6 reglas) y observan cómo la consecuencia se propaga de inmediato por una cartera completa — tasas de aprobación, cupo, pérdida esperada, y la decisión individual de cada empresa. Nada en el sistema compite por atención con esa consecuencia: el navy institucional ancla la estructura, el teal aparece solo para señalar "esto está bien" o "esto está activo", y el resto es blanco, gris y espacio.

Es una herramienta interna (modo Operate), no una pieza de marketing: no hay imágenes heroicas, ilustraciones ni texto persuasivo. El sistema se siente **preciso y sin fricción** — cada control responde de inmediato y sin ambigüedad, para que el usuario nunca dude si su ajuste ya se registró en las métricas o en el detalle de la empresa seleccionada.

**Key Characteristics:**
- Navy institucional como color dominante de estructura (sidebar, texto, títulos), nunca decorativo.
- Teal escaso: solo marca lo que está activo, aprobado, o es la acción principal.
- Plano con aire: casi sin sombra; el whitespace y el contraste tonal separan las superficies.
- Tipografía del sistema operativo (sin fuente de marca cargada) — refuerza que esto es una herramienta de trabajo, no una superficie de marca.
- Jerarquía servida por tamaño y peso, no por color: rojo/ámbar se reservan estrictamente para estados de riesgo.

## Colors

Paleta de tres roles funcionales sobre una base neutra casi monocromática: institucional (navy), señal (teal), y estado (ámbar/rojo), usados con extrema disciplina.

### Primary
- **Navy Institucional** (`#16213E`): color dominante de la interfaz — fondo del sidebar, texto principal, encabezados, avatar de perfil. Transmite que las decisiones que se toman aquí importan.

### Secondary
- **Teal Señal-Verde** (`#17A673`): el único acento de acción. Aparece en el ítem activo del menú, botones primarios, el thumb de los sliders, y el chip "ok"/aprobado. Su escasez es la señal: cuando algo es teal, es porque está bien o es la acción a tomar.
- **Teal Tenue** (`rgba(23, 166, 115, 0.12)`): fondo tinte de teal al 12% de opacidad — usado detrás del texto teal en chips, badges y el valor activo de los sliders, nunca como color sólido de fondo grande.

### Tertiary (estado)
- **Ámbar de Alerta** (`#C87F0A`) con su tinte (`rgba(200, 127, 10, 0.12)`): reservado para "en revisión" / señales intermedias — nunca para acción ni marca.
- **Rojo de Riesgo** (`#C0392B`) con su tinte (`rgba(192, 57, 43, 0.12)`): reservado para "rechazado" / alerta alta — el color de mayor peso semántico del sistema, por eso el más restringido.

### Neutral
- **Fondo de App** (`#F7F8FA`): el lienzo detrás de todas las tarjetas blancas; también el fondo de inputs y del riel de los sliders.
- **Blanco de Superficie** (`#FFFFFF`): todas las tarjetas, la topbar, los popups de estado activo del switch de idioma.
- **Texto Secundario** (`#5B6478`): labels, descripciones, texto de apoyo — nunca texto primario o accionable.
- **Borde/Divisor** (`#E1E4EA`): línea de 1px para separar topbar, inputs, encabezados de tabla y bloques del panel de detalle. No hay un segundo peso de borde en el sistema.

### Named Rules
**The Scarce Teal Rule.** El teal sólido nunca cubre más del ítem activo, un botón, o un ícono a la vez. Si dos elementos teal compiten por atención en la misma vista, uno de los dos está mal.

**The Tint-Over-Fill Rule.** Ningún estado (ok/alerta/riesgo) se comunica con relleno sólido de color sobre fondo grande — siempre es texto de color pleno sobre un tinte del mismo color al 12% de opacidad. Esto mantiene la densidad visual baja incluso cuando una tabla o panel muestra muchos estados a la vez.

## Typography

**Body/Display/Label Font:** system-ui (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`) — una sola familia para todo el sistema.

**Character:** No hay una fuente de marca cargada; la fuente nativa del sistema operativo del usuario es una decisión deliberada, coherente con "The Control Room" — esto es una herramienta de trabajo diario, no una superficie que necesita voz tipográfica propia.

### Hierarchy
- **Headline** (700, 32px): reservado para un título de página a escala hero si una superficie futura lo necesita; no está en uso en la página actual — el `<h1>` de la introducción se distilló a la escala `Title` (ver Do's and Don'ts) para funcionar como header de tarea compacto, no como hero.
- **Title** (700, 22px): encabezados de sección (`<h2>` de "Panel de reglas", "Resultados", "Cartera sintética") y el `<h1>` del header de tarea en la introducción. Una variante de 18px/700 se usa para el nombre de la empresa en el panel de detalle — mismo peso, un paso más pequeño para no competir con el título de sección.
- **Body** (500, 14px): la mayoría del texto de interfaz — labels de controles, valores de detalle, texto de tabla. El peso sube a 600-700 quirúrgicamente para lo que el usuario debe leer primero (nombre de empresa en fila activa, valores de métricas).
- **Label** (600, 12px, uppercase, letter-spacing 0.03em): encabezados de columna de tabla y cualquier texto de clasificación de máxima densidad.

### Named Rules
**The No-Decoration Rule.** Ningún texto usa itálica, subrayado, o una segunda familia tipográfica. La jerarquía se logra solo con tamaño, peso y color — nunca con adornos.

## Layout

Layout de aplicación de dos zonas: un sidebar fijo de 240px (navy, `position: sticky`, altura completa de viewport) y un área principal fluida a la derecha. Dentro del área principal, una topbar de 72px (blanco, borde inferior de 1px) antecede al contenido scrolleable.

El contenido vive dentro de un `.container` con `max-width: 1100px` centrado y `24px` de padding lateral. Cada sección (`.controls`, `.metrics`, `.companies`) se apila verticalmente con `padding-bottom` generoso (24–64px) que crece con la importancia visual de la sección.

Los datos se organizan en grids explícitos, nunca en flujo libre:
- Panel de reglas: grid de 2 columnas, `gap: 32px 40px` (colapsa a 1 columna bajo 640px).
- Resultados: grid de 5 columnas, `gap: 20px` (colapsa a 3 columnas bajo 1100px, 2 columnas bajo 640px).
- Cartera + detalle: grid `3fr 2fr`, `gap: 24px` (colapsa a 1 columna apilada bajo 900px).

### Named Rules
**The Grid-Not-Flow Rule.** Cualquier colección de datos relacionados (reglas, métricas, empresas) vive en un grid con columnas explícitas y un breakpoint de colapso definido — nunca en un flujo de texto libre.

## Elevation & Depth

Plano con aire: el sistema evita la sombra como mecanismo de jerarquía. Existe exactamente una sombra ambiental (`0 2px 8px rgba(22, 33, 62, 0.06)`) que separa las tarjetas blancas del fondo `#F7F8FA` — es casi imperceptible a propósito, y no comunica interactividad ni presionabilidad, solo "esto es una superficie distinta". Dos usos adicionales, más pequeños, cumplen roles puntuales: un realce de 1px bajo el pill activo del switch de idioma (`0 1px 3px rgba(22, 33, 62, 0.12)`), y un anillo de contorno de 1px alrededor del thumb de los sliders (`0 0 0 1px rgba(22, 33, 62, 0.15)`) — este último es un borde de precisión, no una sombra de profundidad.

### Shadow Vocabulary
- **card-ambient** (`box-shadow: 0 2px 8px rgba(22, 33, 62, 0.06)`): toda tarjeta blanca sobre el fondo de la app.
- **active-lift** (`box-shadow: 0 1px 3px rgba(22, 33, 62, 0.12)`): el segmento activo dentro de un control segmentado (switch de idioma).

### Named Rules
**The Flat-by-Default Rule.** Las superficies están en reposo plano. La única sombra del sistema existe para separar, no para jerarquizar — nunca se usa sombra para simular que un elemento "flota" sobre otro con intención de interacción.

## Shapes

Vocabulario de esquinas de cuatro pasos: `8px` (ítems de navegación), `10px` (botones, inputs, el marco del logo), `16px` (todas las tarjetas contenedoras — el radio "de marca" del sistema), y `999px` (pills: badges de estado, el valor activo de un slider, el switch de idioma). Un quinto valor, `12px`, aparece una sola vez en los tiles de highlight del panel de detalle — una variante menor del paso `md`, no un escalón nuevo del sistema.

No hay bordes decorativos: el único borde real es la línea divisoria de 1px (`#E1E4EA`) usada para separar bloques (topbar, encabezados de tabla, secciones del panel de detalle). El avatar de perfil es el único elemento circular (`border-radius: 50%`).

### Named Rules
**The Pill-Means-Status Rule.** El radio `999px` está reservado para elementos que comunican estado o selección activa (badges, chips, valor de slider, switch de idioma) — nunca se usa en un contenedor de contenido general.

## Components

### Buttons
- **Shape:** `10px` de radio (`rounded.md`).
- **Primary:** fondo teal sólido, texto navy (blanco sobre teal no cumple contraste WCAG AA), sin borde, `padding: 14px 26px`. Es la única acción de peso total permitida en una vista.
- **Secondary:** fondo `bg` (`#F7F8FA`), texto navy, borde de 1px (`#E1E4EA`, igual que un input) para que se lea como botón incluso sobre una tarjeta blanca — mismo radio y padding que el primario, para que el par se lea como un grupo de decisión, no como dos componentes distintos.
- **Hover:** `opacity: 0.9` en ambos — la única transición de estado en botones, deliberadamente sutil.

### Chips / Badges (`badge-pill`)
- **Style:** texto en color pleno sobre un tinte del mismo color al 12% de opacidad, radio `999px`, `padding: 3px 10px`, `font-size: 12px/600`.
- **Variantes:** `ok` (teal — aprobado, identidad sin alerta, buró disponible), `warning` (ámbar — en revisión, fraude medio, historial intermedio), `danger` (rojo — rechazado, fraude alto).
- **Uso:** siempre para valores discretos con connotación de riesgo; nunca para etiquetar contenido neutral. Un valor que alimenta la pérdida esperada pero no participa en ninguna de las 6 reglas activas (ej. variabilidad de flujo) no debe llevar color de riesgo — usa `.detail-stat` (texto `text-muted`, sin pill) para no implicar un veredicto que el sistema de reglas no está emitiendo.

### Cards / Containers
- **Corner Style:** `16px` (`rounded.lg`).
- **Background:** blanco sólido sobre el fondo `#F7F8FA` de la app.
- **Shadow Strategy:** `card-ambient` únicamente (ver Elevation & Depth).
- **Border:** ninguno — la sombra y el contraste de fondo son suficientes para definir el borde de la tarjeta.
- **Internal Padding:** varía por densidad de contenido: `40px 48px` para el header de tarea de la introducción, `40px` para el panel de reglas, `32px` para el panel de detalle, `24px` para las tarjetas de métrica, `0` cuando la tarjeta envuelve directamente una tabla con scroll propio.

### Inputs / Fields (Select)
- **Style:** borde de 1px (`#E1E4EA`), fondo blanco, radio `10px`, flecha inline en SVG (no fuente de íconos), `padding: 10px 14px`.
- **Focus:** el borde cambia a teal sólido — sin glow ni anillo adicional.

### Range Slider
- **Style:** riel de `6px` de alto, color de fondo `bg`, completamente redondeado; thumb circular de `18px` en teal sólido con un borde blanco de `3px` y un anillo de precisión de `1px` (`rgba(22, 33, 62, 0.15)`).
- **Valor actual:** se muestra en un chip pill teal-tint junto al label, actualizado en cada evento `input` — nunca solo al soltar.

### Navigation (Sidebar)
- **Style:** enlaces de `14px/500` en blanco al 65% de opacidad sobre navy; `padding: 10px 12px`, radio `8px`.
- **Hover:** blanco al 6% de opacidad de fondo, texto sube a blanco 100%.
- **Active:** fondo teal sólido, texto navy 100% (blanco sobre teal no cumple contraste WCAG AA) — el único uso de teal como relleno grande en todo el sistema, reservado exclusivamente para "dónde estoy".

### Table (Cartera sintética)
- **Header:** fondo `bg`, texto `label` (12px/600, uppercase, letter-spacing 0.03em, color `text-muted`), borde inferior de 1px.
- **Rows:** borde inferior de 1px (`#F0F1F4`, una variante aún más tenue del borde estándar); filas interactivas (`company-row`) muestran cursor pointer y un fondo teal-tint al 4% en hover, 12% cuando están seleccionadas — con el nombre de la empresa cambiando a teal en la fila activa.

### Metric / Stat Tile (Resultados, highlights del detalle)
- **Style:** las tarjetas de métrica son `card` estándar con `padding: 24px`; el label va arriba en `text-muted` 13px, el valor abajo en navy 26px/700. Los highlights dentro del panel de detalle (línea recomendada, confianza) usan la misma jerarquía pero en miniatura, sobre un fondo `bg` en vez de blanco, para diferenciarlos visualmente de una tarjeta de primer nivel.

## Do's and Don'ts

### Do:
- **Do** usar teal sólido únicamente para el ítem activo de navegación, botones primarios, y el thumb del slider — en cualquier otro lugar, usa el tinte al 12%.
- **Do** mantener el radio `16px` para toda tarjeta contenedora de primer nivel; reserva `999px` estrictamente para elementos de estado o selección.
- **Do** representar cada estado de riesgo (ok/alerta/rechazo) con el par texto-pleno + tinte-12%, nunca con relleno sólido de color.
- **Do** actualizar cualquier valor derivado (chip de slider, métricas, panel de detalle) en el evento `input`, no en `change` ni al soltar — la respuesta inmediata es el punto central de "Sala de Control".

### Don't:
- **Don't** introducir un segundo color de acento que compita con el teal por la acción primaria.
- **Don't** usar sombras más pesadas que `card-ambient` (`0 2px 8px rgba(22, 33, 62, 0.06)`) — rompe el sistema "plano con aire".
- **Don't** bajar el texto de body por debajo de `14px` ni el de label por debajo de `12px`, ni quitar el uppercase/letter-spacing de los labels — es lo que mantiene legible una interfaz densa en datos tabulares.
- **Don't** agregar imágenes heroicas, ilustraciones, o copy persuasivo — Risk Builder es una herramienta interna (modo Operate), no una superficie de marketing.
