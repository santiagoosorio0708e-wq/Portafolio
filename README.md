<a name="readme-top"></a>

<div align="center">

  <h1>⚡ PORTAFOLIO PROFESIONAL INTERACTIVO</h1>
  <p><strong>Plataforma Web de Demostración Continua, Simulador de Proyectos en Vivo y Showcase Técnico</strong></p>

  <!-- Badges / Insignias Dinámicas -->
  <p>
    <a href="https://github.com/santiagoosorio0708e-wq/Portafolio"><img src="https://img.shields.io/github/stars/santiagoosorio0708e-wq/Portafolio?style=for-the-badge&logo=github&color=6366f1" alt="Stars" /></a>
    <a href="https://github.com/santiagoosorio0708e-wq/Portafolio"><img src="https://img.shields.io/github/forks/santiagoosorio0708e-wq/Portafolio?style=for-the-badge&logo=github&color=06b6d4" alt="Forks" /></a>
    <a href="https://github.com/santiagoosorio0708e-wq/Portafolio/issues"><img src="https://img.shields.io/github/issues/santiagoosorio0708e-wq/Portafolio?style=for-the-badge&logo=github&color=10b981" alt="Issues" /></a>
    <a href="https://github.com/santiagoosorio0708e-wq/Portafolio/blob/main/LICENSE"><img src="https://img.shields.io/badge/Licencia-MIT-green.svg?style=for-the-badge" alt="Licencia" /></a>
    <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/HTML5-Semántico-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-Neo--Cyber_Glass-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/Netlify-Despliegue_Continuo-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify" />
  </p>

</div>

<br />

<details>
  <summary><strong> Tabla de Contenidos (Clic para desplegar)</strong></summary>
  <ol>
    <li><a href="#acerca-del-proyecto">Acerca del Proyecto</a></li>
    <li><a href="#construido-con">Construido con</a></li>
    <li><a href="#arquitectura-del-sistema">Arquitectura del Sistema</a></li>
    <li><a href="#prerrequisitos">Prerrequisitos</a></li>
    <li><a href="#instalación">Instalación</a></li>
    <li><a href="#uso-y-características">Uso y Características</a></li>
    <li><a href="#pruebas">Pruebas</a></li>
    <li><a href="#hoja-de-ruta">Hoja de Ruta (Roadmap con checkboxes)</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

<br />

---

## 📌 Acerca del Proyecto

El **Portafolio Profesional de Daniel Santiago Osorio Garces** es una plataforma web interactiva de alto impacto diseñada con una estética **Neo-Cyber Dark y Glassmorphism 2.0**, orientada a reclutadores, líderes técnicos y equipos de desarrollo.

A diferencia de los portafolios estáticos tradicionales, incorpora el **Interactive Demo Studio**, un simulador visual en vivo que reproduce el funcionamiento y la interfaz de los **6 proyectos anclados en su perfil de GitHub** tanto en modo de reproducción continua (**Estilo GIF animado**) como en **Modo Interactivo** funcional en el navegador.

### Principales aspectos diferenciales:
* **Simulaciones en Vivo de Proyectos Pinned:** Permite probar directamente y en tiempo real el flujo de *Banco ACME*, *DeliveryBot*, *Chatbot Contaduría con IA*, *Simulador F1 Multihilo*, *E-Commerce de Moda* y *Agencia de Viajes en Python*.
* **Terminal CLI de Desarrollador Integrada:** Consola interactiva con comandos ejecutables (`help`, `about`, `projects`, `skills`, `contact`, `matrix`, `clear`).
* **Sintetizador de Audio con Web Audio API:** Efectos auditivos y hápticos sutiles autocontenidos sin archivos pesados ni dependencias externas.
* **Internacionalización Completa (ES / EN):** Alternancia bilingüe dinámica instantánea con persistencia en `localStorage`.
* **Rendimiento Nativo de Cero Dependencias:** Construido exclusivamente con tecnologías web nativas (Vanilla JS, CSS3 moderno con variables y HTML5 semántico) para carga inmediata y accesibilidad total.

<p align="right">(<a href="#readme-top">Volver al inicio ⬆</a>)</p>

---

## 🛠 Construido con

El ecosistema técnico que conforma este proyecto incluye:

* [![JavaScript][javascript-shield]][javascript-url]
* [![HTML5][html5-shield]][html5-url]
* [![CSS3][css3-shield]][css3-url]
* [![Web Audio API][audio-shield]][audio-url]
* [![Netlify][netlify-shield]][netlify-url]
* [![Git][git-shield]][git-url]

<p align="right">(<a href="#readme-top">Volver al inicio ⬆</a>)</p>

---

## 🏛 Arquitectura del Sistema

La estructura del repositorio sigue un estándar modular, limpio e intuitivo:

```text
portafolio/
│
├── index.html                  # Punto de entrada y maquetación semántica del portafolio
├── style.css                   # Sistema de diseño Neo-Cyber, tokens CSS, componentes y animaciones
├── script.js                   # Motor interactivo, simulador de proyectos, terminal y audio
├── README.md                   # Documentación técnica exhaustiva del repositorio
│
└── img/                        # Recursos gráficos y multimedia optimizados
    └── foto daniel1.png        # Fotografía de perfil profesional
```

<p align="right">(<a href="#readme-top">Volver al inicio ⬆</a>)</p>

---

## 📋 Prerrequisitos

Para inspeccionar, ejecutar o desplegar este portafolio localmente únicamente se requiere:

* **Navegador Web Moderno:** Google Chrome, Microsoft Edge, Mozilla Firefox o Safari con soporte para ES6+ y CSS Grid.
* **Node.js (Opcional):** Versión 18+ o superior si se desea levantar un servidor estático local mediante `npx serve` o `Live Server`.
* **Control de Versiones:** Git 2.40+ configurado en el sistema operativo.

<p align="right">(<a href="#readme-top">Volver al inicio ⬆</a>)</p>

---

## 🚀 Instalación

Siga los siguientes pasos en su terminal para clonar y ejecutar el portafolio en su entorno local:

```bash
# 1. Clonar el repositorio oficial
git clone https://github.com/santiagoosorio0708e-wq/Portafolio.git

# 2. Acceder a la carpeta del proyecto
cd Portafolio

# 3. Opción A: Abrir directamente en el navegador predeterminado (Windows)
start index.html

# 4. Opción B: Ejecutar mediante un servidor estático ligero con Node.js
npx serve .
```

<p align="right">(<a href="#readme-top">Volver al inicio ⬆</a>)</p>

---

## 💻 Uso y Características

### 1. Laboratorio de Demos en Vivo (Demo Studio)
Cada proyecto principal anclado al GitHub cuenta con su propio simulador:
* **Banco ACME (SPA Transaccional):** Tarjeta holográfica con balance en vivo, selector de destinatario, formulario de transferencia y libro contable (*ledger*) en tiempo real.
* **DeliveryBot Cafetería:** Mockup de teléfono en Telegram con teclado interactivo, pedidos de bebidas, validación de inventario con Google Sheets y stepper de despacho.
* **Chatbot Contaduría:** Interfaz WhatsApp Web con asesoría fiscal colombiana respaldada por Google Gemini AI, horarios diurnos y detección de *handoff* humano.
* **Fórmula 1 Java:** Telemetría en tiempo real, circuito animado con cálculo dinámico de trayectoria SVG, alternancia de clima (Seco vs. Lluvia Torrencial) y parada en pits de 2.4s.
* **E-Commerce Moda:** Catálogo dinámico con chips de talla, variantes de color, cálculo de descuento y simulación de checkout con carrito interactivo.
* **Agencia de Viajes en Python:** Cotizador con motor de conversión de divisas en tiempo real (COP / USD / EUR) y generación de pase de abordar digital con código de barras.

### 2. Terminal de Desarrollador (Live CLI)
* Comandos disponibles: `help`, `about`, `projects`, `skills`, `demo`, `contact`, `matrix`, `clear`.
* Permite interacción directa con el teclado o a través de chips de comando rápido.

### 3. Modos Auto-GIF e Interactivo
* **Auto-GIF:** Reproduce un bucle cronometrado de 8 segundos por proyecto con barra de progreso, mostrando las acciones de manera continua.
* **Interactivo:** Otorga el control completo al usuario para probar botones, entradas y selectores.

<p align="right">(<a href="#readme-top">Volver al inicio ⬆</a>)</p>

---

## 🧪 Pruebas

Para garantizar la estabilidad y experiencia de usuario en cualquier dispositivo, se ejecutan las siguientes comprobaciones:

* **Pruebas de Responsividad:** Validación en resoluciones móviles (360px - 480px), tablets (768px - 1024px) y pantallas de alta resolución (>1440px).
* **Validación de Accesibilidad y Semántica:** Cumplimiento de estándares WAI-ARIA en botones de acción, tabs y navegación por teclado.
* **Compatibilidad de Audio:** Comprobación de políticas de reproducción automática (*Autoplay Policy*) de AudioContext en navegadores modernos.
* **Pruebas de Rendimiento:** Cero advertencias en consola y puntuaciones superiores a 95 en Google Lighthouse.

```bash
# Inspección del estado de las ramas y commits
git status
git log --oneline -n 5
```

<p align="right">(<a href="#readme-top">Volver al inicio ⬆</a>)</p>

---

## 🗺 Hoja de Ruta (Roadmap con checkboxes)

- [x] Rediseño integral bajo la línea estética Neo-Cyber y Glassmorphism 2.0.
- [x] Implementación del **Interactive Demo Studio** con pestañas dedicadas para los 6 proyectos anclados.
- [x] Soporte para modo **Auto-Demo (Estilo GIF)** y **Modo Interactivo**.
- [x] Integración de la consola interactiva **Developer Terminal**.
- [x] Sistema de internacionalización bilingüe (Español / Inglés).
- [x] Sintetizador auditivo autocontenido con Web Audio API y botón de mute.
- [x] Efecto de constelación reactivo en tiempo real con Canvas HTML5.
- [x] Despliegue continuo en la plataforma de alojamiento Netlify.
- [ ] Adición de modo de alto contraste accesible.
- [ ] Integración de selector de temas cromáticos (Cyan, Emerald, Violet).

<p align="right">(<a href="#readme-top">Volver al inicio ⬆</a>)</p>

---

## 📬 Contacto

**Daniel Santiago Osorio Garces**  
*Desarrollador de Software | Java, Spring Boot, Node.js, Docker, Automatización e Inteligencia Artificial*

* **Sitio Web / Portafolio Oficial:** [https://zingy-toffee-b7c66c.netlify.app](https://zingy-toffee-b7c66c.netlify.app)
* **Correo Electrónico:** [santiagoosorio0708e@gmail.com](mailto:santiagoosorio0708e@gmail.com)
* **Perfil de GitHub:** [https://github.com/santiagoosorio0708e-wq](https://github.com/santiagoosorio0708e-wq)
* **WhatsApp Directo:** [+57 301 460 9110](https://wa.me/573014609110)

<p align="right">(<a href="#readme-top">Volver al inicio ⬆</a>)</p>

<!-- MARKDOWN LINKS & SHIELDS -->
[javascript-shield]: https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[javascript-url]: https://developer.mozilla.org/es/docs/Web/JavaScript
[html5-shield]: https://img.shields.io/badge/HTML5-Semántico-E34F26?style=for-the-badge&logo=html5&logoColor=white
[html5-url]: https://developer.mozilla.org/es/docs/Web/HTML
[css3-shield]: https://img.shields.io/badge/CSS3-Modern_Variables-1572B6?style=for-the-badge&logo=css3&logoColor=white
[css3-url]: https://developer.mozilla.org/es/docs/Web/CSS
[audio-shield]: https://img.shields.io/badge/Web_Audio-API-blueviolet?style=for-the-badge
[audio-url]: https://developer.mozilla.org/es/docs/Web/API/Web_Audio_API
[netlify-shield]: https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white
[netlify-url]: https://www.netlify.com/
[git-shield]: https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white
[git-url]: https://git-scm.com/
