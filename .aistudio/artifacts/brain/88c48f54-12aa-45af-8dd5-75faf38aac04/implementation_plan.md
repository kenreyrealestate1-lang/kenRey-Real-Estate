# Kenrey Real Estate: Arquitectura PropTech, Motor de Prospección y Estrategia de Captación Global

Diseño integral de la plataforma PropTech, embudo de adquisición omnicanal y motor de inteligencia de clientes potenciales con alta intención de compra (High-Intent Buyers) para **Kenrey Real Estate**, especializada en el mercado inmobiliario de República Dominicana (Punta Cana, Cap Cana, Las Terrenas, Santo Domingo y Santiago).

---

## User Review & Critical Decisions

> [!IMPORTANT]
> A continuación se resumen las decisiones estratégicas confirmadas en la Fase 1 para la ejecución de la plataforma y el ecosistema de Kenrey Real Estate:

- **Enfoque de la Plataforma**: Portal interactivo integral de doble cara:
  1. *Experiencia de Inversor/Comprador (Front-Facing)*: Buscador de propiedades de alta conversión, calculadoras financieras interactivas (ROI + CONFOTUR + hipotecas) y pre-calificación conversacional instantánea.
  2. *Consola de Estrategia y Asesor (Broker/CTO View)*: Panel de inteligencia con Lead Scoring predictivo, monitor de prospectos calificados, pipeline de HubSpot y simulador de rendimiento de campañas omnicanal.
- **Ecosistema de CRM y Automatización**: **HubSpot CRM Inmobiliario** como núcleo de datos central, integrado con **WhatsApp Business Cloud API** y webhooks bidireccionales para automatizar la velocidad de respuesta (< 3 minutos) y el traspaso a brokers senior.
- **Distribución Geográfica y de Producto**: Enfoque balanceado híbrido:
  - *Turístico & Rentabilidad en Divisas*: Punta Cana, Cap Cana y Las Terrenas (proyectos bajo Ley CONFOTUR, rentas cortas Airbnb/vacacionales, retorno en USD/EUR).
  - *Urbano & Patrimonial Local*: Santo Domingo (Polígono Central: Piantini, Naco, Bella Vista) y Santiago de los Caballeros (proyectos de plusvalía residencial y rentas corporativas).

---

## 1. Overview & Core Concept

### Qué Resuelve la Plataforma
El mercado inmobiliario en República Dominicana enfrenta dos cuellos de botella críticos:
1. **Fricción en compradores internacionales**: Incertidumbre jurídica, desconocimiento de los beneficios fiscales (Ley 158-01 CONFOTUR) y dificultad para proyectar el flujo de caja neto en dólares/euros.
2. **Desperdicio de tiempo de los agentes con leads no calificados**: Cientos de consultas genéricas sin solvencia ni intención real de compra inmediata que saturan los canales tradicionales.

**Kenrey Real Estate PropTech** soluciona esto combinando un buscador de propiedades inteligente con herramientas financieras interactivas que educan y seducen al inversor, alimentando un motor de **Lead Scoring con IA** y un **Pre-screening conversacional** vía WhatsApp y Web que solo asigna llamadas de cierre a los brokers cuando el cliente tiene solvencia y alta intención demostrada.

### Públicos Objetivo y Propuesta de Valor
- **Inversionista Internacional y Diáspora (EE. UU., Canadá, Europa)**:
  - *Interés*: Retorno de inversión en USD (8% - 13% Cap Rate), exención de impuestos (3% de transferencia inmobiliaria y 1% de IPI anual por 15 años vía CONFOTUR), gestión de renta vacacional llave en mano.
  - *Propuesta*: Calculadora de exención fiscal y flujo de caja neto transparente, asesoría legal en remoto y opciones de crédito hipotecario internacional.
- **Comprador e Inversionista Local (República Dominicana)**:
  - *Interés*: Primera y segunda vivienda, patrimonio familiar, facilidades de financiamiento bancario local (tasas fijas en DOP/USD con bancos líderes como Popular, BHD, Banreservas).
  - *Propuesta*: Simulador hipotecario local comparativo, planes de pago fraccionados durante construcción y propiedades con alta plusvalía urbana.

---

## 2. User Experience & Visual Design

### Dirección Estética y Lenguaje Visual (Anti-Slop & Editorial Luxury)
Inspirado en la sofisticación de *Engel & Völkers* y la agilidad de datos de *Compass* y *Redfin*:
- **Canvas y Paleta**:
  - *Fondo y Superficies*: Blanco puro (`#FFFFFF`) y fondo neutral cálido marfil/travertino (`#F8F9FA` / `#F4F1EA`) con bordes sutiles de 1px (`#E5E7EB`).
  - *Color Primario*: Azul marino caribeño profundo (`#0B192C` o `#0F2027`) que transmite solidez fiduciaria, seguridad legal y exclusividad.
  - *Acento de Conversión*: Ámbar dorado cálido (`#D97706` / `#B45309`) y verde esmeralda institucional (`#059669`) para estados financieros positivos.
- **Tipografía**:
  - *Display / Títulos*: `Plus Jakarta Sans` en peso bold con tracking ajustado (`tracking-tight`) para modernidad corporativa PropTech.
  - *Cuerpo*: `DM Sans` con alta legibilidad en párrafos informativos.
  - *Datos Numéricos y Financieros*: Tabular numerals (`tabular-nums font-mono`) para alinear flujos de caja, ROI, precios y cuotas mensuales.
- **Top Bar Contract**:
  - *Zona 1*: Wordmark de marca limpio: **Kenrey Real Estate** (sin badges ni subtítulos en el header).
  - *Zona 2*: Enlaces directos: *Propiedades*, *Calculadora ROI & CONFOTUR*, *Financiamiento*, *Estrategia & CRM*.
  - *Zona 3*: Acción principal: Botón `"Hablar con un Asesor"` / Selector de vista (Inversor vs Consola CTO/Broker).

### Módulos Principales de la Experiencia
1. **Hero Estratégico & Buscador Predictivo**:
   - Selector inteligente de propósito: *"Quiero Invertir en Turismo (USD)"* vs *"Quiero Vivienda / Patrimonio (DOP/USD)"*.
   - Filtros por Destino (Punta Cana, Cap Cana, Santo Domingo, Las Terrenas, Santiago), Presupuesto, Estado (Plano, Construcción, Entrega Inmediata) y Beneficio CONFOTUR.
2. **Catálogo de Propiedades Curado con Etiquetas de Rentabilidad**:
   - Tarjetas sin "pills" genéricas: tipografía limpia con métricas clave visibles: Precio, Cap Rate estimado, Plusvalía proyectada y Ahorro tributario CONFOTUR.
3. **Calculadora Interactiva de Inversión & CONFOTUR (Interactive Tax & ROI Engine)**:
   - Permite ajustar precio de compra, porcentaje de ocupación estimada en Airbnb (45% a 85%), tarifa por noche promedio ($120 a $650 USD), costos operativos (mantenimiento, gestión de propiedad del 20%) y ver el Retorno Neto anual.
   - Desglose instantáneo del **Ahorro por Ley CONFOTUR**: Exención del 3% de impuesto de transferencia inmobiliaria + 1% anual del Impuesto al Patrimonio Inmobiliario (IPI) por 15 años.
4. **Simulador Hipotecario Dual (Extranjeros vs Locales)**:
   - *Extranjeros*: Financiamiento con bancos locales para no residentes (préstamos en USD con pasaporte, hasta 60-70% LTV).
   - *Locales*: Simulación en DOP con tasas del mercado dominicano (bancos locales) y planes de pago durante construcción (10% reserva, 40% durante obra, 50% contra entrega).
5. **Asistente Inteligente de Pre-calificación (Kenrey AI Concierge)**:
   - Chat interactivo integrado que perfila al comprador en 4 preguntas clave:
     1. Ubicación de residencia y origen de fondos (EE. UU., RD, Europa, etc.).
     2. Rango de inversión disponible (Down payment líquido).
     3. Horizonte de tiempo (Listo para comprar en <30 días, 3 meses, o explorando).
     4. Objetivo (Renta vacacional en USD, retiro o residencia familiar).
   - Calcula el **Lead Score en tiempo real (0-100)** y genera el enlace directo a WhatsApp Business con el contexto pre-cargado para el asesor asignado.
6. **Consola del Asesor / Director Comercial (Internal CRM & Lead Hub)**:
   - Vista de prospectos entrantes clasificados por nivel: *Hot / High-Intent* (Score 80+), *Warm* (Score 50-79), *Nurturing* (<50).
   - Visualización de la integración con HubSpot (Deal Stage, canal de origen: Google Search, Meta Ads, Referral bancario).
   - Métricas de adquisición: CAC estimado por mercado, tasa de conversión y valor de comisiones potenciales.

---

## 3. Estrategia de Captación Omnicanal (High-Conversion Acquisition Funnel)

### A. Para Extranjeros, Diáspora e Inversionistas Internacionales

```
[ Tráfico Internacional ]
  ├── Google Search (High Intent: "buy condo punta cana confotur", "cap cana real estate roi")
  ├── Meta Ads (Expatriados, Real Estate Investors Miami/NY/Toronto/Madrid)
  └── SEO Internacional & Contenido en Inglés/Español ("Dominican Republic Tax Incentives")
         │
         ▼
[ Landing Page Dinámica Hiper-Personalizada ]
  - Moneda: USD / EUR
  - Foco en Ley CONFOTUR (0% impuestos por 15 años) + Gestión Vacacional Llave en Mano
  - Prueba Social: Testimonios de compradores de EE. UU. y Canadá con título de propiedad en mano
         │
         ▼
[ Lead Magnet & Calculadora de Retorno ]
  - "Descarga el Dossier de Rentabilidad 2026: Cap Cana & Punta Cana con CONFOTUR"
  - Simulación interactiva de Cash Flow y Exención Fiscal
         │
         ▼
[ Pre-calificación Instantánea vía WhatsApp / Web ]
  - Filtro financiero y agenda de videollamada de 20 minutos vía Zoom con Asesor Bilingüe
```

- **Campañas de Google Ads (Search & Performance Max)**:
  - Palabras clave exactas de compra: `"punta cana condos for sale under 250k"`, `"cap cana beachfront properties"`, `"dominican republic confotur law explained"`, `"buy villa las terrenas"`.
  - Extensiones de llamada, enlaces a calculadoras de ROI y páginas de aterrizaje en inglés y español.
- **Campañas de Meta Ads (Facebook & Instagram)**:
  - Segmentación por intereses: *Real estate investing, Luxury lifestyle, Caribbean tourism, Vacation rental management*.
  - Segmentación geográfica: Tri-State (Nueva York, Nueva Jersey, Connecticut), Florida (Miami, Orlando), Ontario (Toronto), Montreal, Madrid.
  - Formatos: Video recorridos inmersivos en 4K ("Walkthrough" de villas en Cap Cana) con ganchos financieros: *"Cómo generar 11.5% de retorno anual en dólares sin pagar impuestos en República Dominicana"*.
- **SEO Internacional**:
  - Arquitectura con hreflang (inglés/español).
  - Guías maestras de compra para extranjeros: *"Complete Guide to Buying Real Estate in the Dominican Republic as an American or Canadian"*, *"How the CONFOTUR Law Protects Your Investment"*.

### B. Para Compradores e Inversionistas Locales

- **Alianzas Estratégicas con la Banca Dominicana**:
  - Acuerdos de referimiento y pre-aprobaciones con ejecutivos de préstamos hipotecarios de **Banco Popular Dominicano**, **Banco BHD** y **Banreservas**.
  - Módulos en la web con cálculo de cuotas basados en las tasas de feria inmobiliaria de los bancos.
- **Estrategia de Contenido y Liderazgo de Opinión Local**:
  - Podcasts y clips cortos en Instagram/TikTok/LinkedIn analizando la plusvalía por metro cuadrado en Santo Domingo (Piantini, Bella Vista, Naco, Evaristo Morales) y proyectos en Santiago.
  - Webinars mensuales: *"Masterclass: Cómo invertir en planos en Santo Domingo y duplicar tu plusvalía antes de la entrega"*.
- **Campañas de Remarketing Local**:
  - Remarketing a visitantes locales con proyectos de primera vivienda en Santo Domingo Este, Santo Domingo Norte y Santiago con planes de pago de $500 - $1,500 USD mensuales durante la construcción.

---

## 4. Embudo de Prospección y Automatización de Clientes Potenciales

### Arquitectura de Automatización: Flujo de Respuesta en Menos de 3 Minutos

```
[ Prospecto Ingresa por Web / Anuncio / WhatsApp ]
                       │
                       ▼
         [ Pre-Screening Kenrey Bot ]
         - 4 preguntas: Presupuesto, Plazo, Destino, Financiamiento
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
[ Score ≥ 80: High Intent ]    [ Score < 80: Nurture ]
         │                           │
         ▼                           ▼
- Alerta SMS/WhatsApp a Broker     - Inclusión en Flujo de Nutrición
- Asignación de reunión Zoom       - Cadencia de Emails Educativos
- Creación de Trato en HubSpot     - Boletín de Oportunidades Quincenal
```

### Protocolo de Calificación (Lead Scoring Matrix)

| Criterio | Factores Evaluados | Ponderación |
| :--- | :--- | :--- |
| **Capacidad Financiera** | Capital líquido disponible para separación/inicial (Cash vs Hipoteca) | 35% |
| **Intención & Urgencia** | Fecha prevista de compra (< 30 días = 100 pts; 1-3 meses = 75 pts; > 6 meses = 30 pts) | 25% |
| **Interacción con Herramientas** | Uso de calculadora de ROI, simulación de hipoteca, descarga de brochure | 20% |
| **Completitud del Perfil** | Teléfono validado por WhatsApp, país de residencia, empleo/actividad económica | 20% |

### Cadencia de Nutrición Automatizada (HubSpot + WhatsApp)
- **Minuto 0**: Mensaje interactivo de WhatsApp Business API confirmando la recepción y enviando el dossier digital de la propiedad consultada en PDF.
- **Minuto 15**: Mensaje con simulación de ROI y ahorro CONFOTUR personalizado al presupuesto del cliente.
- **Día 2**: Video mensaje del broker especialista de la zona (Punta Cana o Santo Domingo) con invitación a una videollamada virtual de 15 minutos.
- **Día 5**: Caso de éxito de un inversor extranjero o local con testimonio real sobre la seguridad jurídica y el título de propiedad expedido por el Registro Inmobiliario de RD.
- **Día 10**: Notificación de últimas unidades disponibles en plano o aumento programado de lista de precios por avance de obra.

---

## 5. Plan de Implementación y Stack Tecnológico Recomendado

### Arquitectura de Sistemas y Stack PropTech

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CAPA DE EXPERIENCIA DE USUARIO                       │
│  React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons            │
│  - Buscador inteligente de propiedades (Filtros por zona, USD/DOP)     │
│  - Calculadora interactiva CONFOTUR & ROI                              │
│  - Simulador hipotecario local & extranjero                            │
│  - Asistente de pre-calificación interactivo (Kenrey AI Concierge)      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     CAPA DE INTEGRACIÓN & LÓGICA                       │
│  - Motor de Lead Scoring Predictivo                                    │
│  - Adaptador Webhook REST / Server Proxy Routes                        │
│  - Google Gemini API (Análisis inteligente de perfil del inversor)     │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
                    ▼                                ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│       HUBSPOT CRM INMOBILIARIO       │  │  WHATSAPP BUSINESS CLOUD API │
│  - Pipeline: Lead -> Qualified ->    │  │  - Disparo de mensajes de    │
│    Tour -> Negociación -> Cierre     │  │    bienvenida instantáneos   │
│  - Segmentación: Extranjero / Local  │  │  - Enlace directo al broker  │
│  - Tracking de CAC por campaña       │  │    con contexto pre-cargado  │
└──────────────────────────────────────┘  └──────────────────────────────┘
```

### Stack Tecnológico Recomendado (No-Code vs Custom Code)
- **Frontend & Motor Interactivo (Custom Code)**: Single Page App construida en React + TypeScript + Tailwind CSS para máxima velocidad de carga (< 1.2s), experiencia fluida en móviles y micro-interacciones de alta fidelidad.
- **CRM Inmobiliario Central**: **HubSpot CRM Professional** (Inbound Marketing + Deals Pipeline + Automatización de Workflows).
- **Mensajería Omnicanal**: **Meta Cloud API for WhatsApp** conectado mediante webhooks a HubSpot para sincronizar todas las conversaciones.
- **Agendamiento Automatizado**: **Calendly / HubSpot Meetings** integrado con Google Calendar del equipo de ventas.

### Cuadro de KPIs y Métricas de Rendimiento (CAC & Conversión)

| Métrica Clave | Meta Benchmark (Punta Cana / Santo Domingo) | Modo de Medición |
| :--- | :--- | :--- |
| **Costo por Lead (CPL) Extranjero** | $18 - $38 USD (Google/Meta Ads) | Gasto publicitario / Leads totales |
| **Costo por Lead (CPL) Local** | $8 - $18 USD | Gasto publicitario / Leads locales |
| **Tasa de Calificación (Lead-to-MQL)** | $\ge 28\%$ de leads calificados con Score 70+ | Leads con score 70+ / Leads totales |
| **Speed to Lead (Tiempo de respuesta)** | $< 3\text{ minutos}$ vía WhatsApp automatizado | Timestamp de entrada vs primer contacto |
| **Tasa de Show-Up a Tour/Zoom** | $\ge 55\%$ de reuniones agendadas completadas | Reuniones realizadas / Reuniones pautadas |
| **Costo de Adquisición de Cliente (CAC)** | $\$800 - \$1,800\text{ USD}$ por comprador | Gasto total de ventas y marketing / Cierres |
| **Retorno sobre Inversión (ROI de Marketing)**| $\mathbf{8x - 15x}$ (Comisión promedio: $10,000 - $35,000 USD) | Ingreso por comisiones / Inversión de captación |

---

## 6. Fases de Implementación en el Código

1. **Fase 1: Datos y Modelos de Negocio**:
   - Catálogo exhaustivo de proyectos en República Dominicana (Punta Cana, Cap Cana, Las Terrenas, Santo Domingo Piantini/Naco, Santiago).
   - Datos reales de rentabilidad (Cap Rate 8.5% - 12.8%), precios en USD y DOP, estatus CONFOTUR, amenities y avance de obra.
2. **Fase 2: Motor de Búsqueda y Filtros de Inversión**:
   - Filtros dinámicos por país de origen del comprador, zona geográfica, tipo de propiedad, presupuesto y beneficios tributarios.
   - Vistas detalladas de propiedades con galería visual, desglose de rentabilidad e información legal clara.
3. **Fase 3: Herramientas Financieras Interactivas**:
   - Calculadora de Retorno de Inversión (ROI) y ahorro fiscal por Ley CONFOTUR (cálculo de 3% transferencia y 1% IPI a 15 años).
   - Simulador hipotecario interactivo con modos para no residentes (préstamos internacionales) y compradores dominicanos locales.
4. **Fase 4: Asistente Conversacional & Lead Scoring**:
   - Chatbot interactivo de pre-calificación que calcula el score del lead en tiempo real y ofrece conexión directa a WhatsApp.
5. **Fase 5: Consola Estratégica del Asesor y Métricas de Captación**:
   - Tablero de control de brokers con embudo de prospección, estado de sincronización con HubSpot CRM y simulador de rendimiento de campañas (Google vs Meta Ads, CAC y ROI).
