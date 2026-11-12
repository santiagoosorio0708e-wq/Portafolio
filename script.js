/* ==========================================================================
   DANIEL SANTIAGO OSORIO GARCES - PORTAFOLIO PROFESIONAL
   Motor Interactivo 60 FPS • Simulador F1 con Rotación de Pistas Cada 4s
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SISTEMA DE NOTIFICACIONES TOAST (LIGERO Y SIN EMOTICONOS)
       ========================================================================== */
    const toastContainer = document.getElementById('toast-container');
    function showToast(message, type = 'info') {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const prefix = type === 'success' ? '[OK]' : '[INFO]';
        toast.innerHTML = `<span class="text-cyan">${prefix}</span> <span>${message}</span>`;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 2800);
    }

    /* ==========================================================================
       2. AMBIENT CANVAS PARTICLES (OPTIMIZADO A 60 FPS, CERO TIRONES)
       ========================================================================== */
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }, 150);
        });

        const particles = [];
        const particleCount = Math.min(Math.floor(width / 60), 24);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                radius: Math.random() * 1.5 + 0.8,
                color: i % 2 === 0 ? 'rgba(99, 102, 241, 0.35)' : 'rgba(6, 182, 212, 0.35)'
            });
        }

        let mouse = { x: -1000, y: -1000 };
        let mouseTicking = false;
        window.addEventListener('mousemove', (e) => {
            if (!mouseTicking) {
                requestAnimationFrame(() => {
                    mouse.x = e.clientX;
                    mouse.y = e.clientY;
                    mouseTicking = false;
                });
                mouseTicking = true;
            }
        });

        window.addEventListener('mouseout', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        function animateCanvas() {
            if (document.hidden) {
                requestAnimationFrame(animateCanvas);
                return;
            }

            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Connect nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < 10000) { // 100px squared
                        const dist = Math.sqrt(distSq);
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        }
        requestAnimationFrame(animateCanvas);
    }

    /* ==========================================================================
       3. CABECERA & NAVEGACIÓN MÓVIL
       ========================================================================== */
    const header = document.getElementById('main-header');
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 40) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenuWrapper = document.getElementById('nav-menu-wrapper');
    if (mobileToggle && navMenuWrapper) {
        mobileToggle.addEventListener('click', () => {
            navMenuWrapper.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenuWrapper.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       4. SISTEMA DE IDIOMA (ES / EN)
       ========================================================================== */
    const langToggleBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');
    let currentLang = localStorage.getItem('daniel_lang') || 'es';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('daniel_lang', lang);
        document.documentElement.lang = currentLang;
        if (langText) langText.textContent = currentLang === 'es' ? 'EN' : 'ES';

        document.querySelectorAll('.i18n').forEach(el => {
            const translation = el.getAttribute(`data-${currentLang}`);
            if (translation) {
                el.innerHTML = translation;
            }
        });
    }
    setLanguage(currentLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const nextLang = currentLang === 'es' ? 'en' : 'es';
            setLanguage(nextLang);
            showToast(nextLang === 'es' ? 'Idioma: Español' : 'Language: English', 'info');
        });
    }

    /* ==========================================================================
       5. EFECTO TYPEWRITER EN HERO (FLUIDO)
       ========================================================================== */
    const typewriterEl = document.getElementById('typewriter-text');
    const phrasesEs = [
        'Desarrollador Backend & APIs RESTful',
        'Especialista en Automatización & n8n',
        'Integrador de Modelos de IA & Chatbots',
        'Arquitectura Limpia & Docker Compose'
    ];
    const phrasesEn = [
        'Backend Developer & RESTful APIs',
        'Automation & n8n Specialist',
        'AI Models & Chatbots Integrator',
        'Clean Architecture & Docker Compose'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        if (!typewriterEl) return;
        const phrases = currentLang === 'es' ? phrasesEs : phrasesEn;
        const currentPhrase = phrases[phraseIndex % phrases.length];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeDelay = isDeleting ? 35 : 75;

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeDelay = 2200; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex++;
            typeDelay = 350; // Pause before typing next
        }

        setTimeout(typeWriter, typeDelay);
    }
    typeWriter();

    /* ==========================================================================
       6. FLAGSHIP: INTERACTIVE DEMO STUDIO ENGINE
       ========================================================================== */
    const studioTabs = document.querySelectorAll('.studio-tab');
    const demoScreens = document.querySelectorAll('.demo-screen');
    const modeAutoBtn = document.getElementById('mode-auto-btn');
    const modeInteractiveBtn = document.getElementById('mode-interactive-btn');
    const studioPlayToggle = document.getElementById('studio-play-toggle');
    const playPauseIcon = document.getElementById('play-pause-icon');
    const demoProgressBar = document.getElementById('demo-progress-bar');
    const studioStatusText = document.getElementById('studio-status-text');

    let currentProject = 'banco';
    let isAutoMode = true;
    let isPlaying = true;
    let autoLoopTimer = null;
    let loopStartTime = Date.now();
    const LOOP_DURATION_MS = 8000;

    function switchProject(projectKey) {
        currentProject = projectKey;

        studioTabs.forEach(tab => {
            const isActive = tab.getAttribute('data-project') === projectKey;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        demoScreens.forEach(screen => {
            const isTarget = screen.id === `demo-screen-${projectKey}`;
            screen.classList.toggle('active', isTarget);
        });

        triggerProjectAutoAction(projectKey);
        loopStartTime = Date.now();
    }

    studioTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const projectKey = tab.getAttribute('data-project');
            switchProject(projectKey);
        });
    });

    document.querySelectorAll('.switch-to-demo').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            switchProject(target);
            const studioSec = document.getElementById('demo-studio');
            if (studioSec) {
                studioSec.scrollIntoView({ behavior: 'smooth' });
            }
            showToast(`Cargando demostración de ${target.toUpperCase()}`, 'info');
        });
    });

    if (modeAutoBtn && modeInteractiveBtn) {
        modeAutoBtn.addEventListener('click', () => {
            isAutoMode = true;
            modeAutoBtn.classList.add('active');
            modeInteractiveBtn.classList.remove('active');
            if (studioStatusText) studioStatusText.textContent = 'AUTO-GIF ACTIVO';
            loopStartTime = Date.now();
            showToast('Modo Auto-GIF activado (bucle continuo)', 'info');
        });

        modeInteractiveBtn.addEventListener('click', () => {
            isAutoMode = false;
            modeInteractiveBtn.classList.add('active');
            modeAutoBtn.classList.remove('active');
            if (studioStatusText) studioStatusText.textContent = 'MODO INTERACTIVO';
            if (demoProgressBar) demoProgressBar.style.width = '0%';
            showToast('Modo Interactivo activado: pruébalo manualmente', 'success');
        });
    }

    if (studioPlayToggle) {
        studioPlayToggle.addEventListener('click', () => {
            isPlaying = !isPlaying;
            if (playPauseIcon) playPauseIcon.textContent = isPlaying ? 'PAUSA' : 'PLAY';
            if (studioStatusText) {
                studioStatusText.textContent = isPlaying ? 'AUTO-GIF ACTIVO' : 'EN PAUSA';
            }
            if (isPlaying) loopStartTime = Date.now();
        });
    }

    // Auto-loop cycle using requestAnimationFrame to prevent interval stutter
    function updateAutoLoop() {
        if (isAutoMode && isPlaying && !document.hidden) {
            const elapsed = Date.now() - loopStartTime;
            const progress = Math.min((elapsed / LOOP_DURATION_MS) * 100, 100);
            if (demoProgressBar) demoProgressBar.style.width = `${progress}%`;

            if (elapsed >= LOOP_DURATION_MS) {
                const projects = ['banco', 'delivery', 'chatbot', 'f1', 'ecommerce', 'viajes'];
                const curIdx = projects.indexOf(currentProject);
                const nextProject = projects[(curIdx + 1) % projects.length];
                switchProject(nextProject);
            }
        }
        requestAnimationFrame(updateAutoLoop);
    }
    requestAnimationFrame(updateAutoLoop);

    /* ==========================================================================
       DEMO 1: BANCO ACME (Simulación de Transferencia)
       ========================================================================== */
    const bancoBalanceDisplay = document.getElementById('banco-balance-display');
    const bancoBtnTransfer = document.getElementById('banco-btn-transfer');
    const bancoBtnReset = document.getElementById('banco-btn-reset');
    const bancoTransferFeedback = document.getElementById('banco-transfer-feedback');
    const bancoLedgerList = document.getElementById('banco-ledger-list');
    const bancoAmountInput = document.getElementById('banco-amount');
    const bancoRecipientSelect = document.getElementById('banco-recipient');

    let currentBalance = 4850000;

    function executeBancoTransfer(amount = 150000, recipient = 'Camila Gómez') {
        if (currentBalance < amount) {
            if (bancoTransferFeedback) {
                bancoTransferFeedback.innerHTML = `<span class="text-red">[ERROR] Saldo insuficiente para $${amount.toLocaleString()} COP</span>`;
            }
            return;
        }

        if (bancoTransferFeedback) {
            bancoTransferFeedback.innerHTML = `<span class="text-cyan">[VALIDANDO] Web Component transaccional...</span>`;
        }
        if (bancoBtnTransfer) bancoBtnTransfer.disabled = true;

        setTimeout(() => {
            currentBalance -= amount;
            if (bancoBalanceDisplay) bancoBalanceDisplay.textContent = `$${currentBalance.toLocaleString()} COP`;
            if (bancoTransferFeedback) {
                bancoTransferFeedback.innerHTML = `<span class="text-green">[EXITO] Transferencia enviada a ${recipient}!</span>`;
            }
            if (bancoBtnTransfer) bancoBtnTransfer.disabled = false;

            if (bancoLedgerList) {
                const item = document.createElement('div');
                item.className = 'ledger-item negative';
                item.innerHTML = `
                    <span class="ledger-badge">[OUT]</span>
                    <div class="ledger-details">
                        <span class="ledger-name">Transferencia a ${recipient}</span>
                        <span class="ledger-date">Ahora mismo</span>
                    </div>
                    <span class="ledger-amt">-$${amount.toLocaleString()} COP</span>
                `;
                bancoLedgerList.prepend(item);
            }
        }, 500);
    }

    if (bancoBtnTransfer) {
        bancoBtnTransfer.addEventListener('click', () => {
            const amt = parseInt(bancoAmountInput.value) || 150000;
            const rec = bancoRecipientSelect.value;
            executeBancoTransfer(amt, rec);
        });
    }

    if (bancoBtnReset) {
        bancoBtnReset.addEventListener('click', () => {
            currentBalance = 4850000;
            if (bancoBalanceDisplay) bancoBalanceDisplay.textContent = `$${currentBalance.toLocaleString()} COP`;
            if (bancoTransferFeedback) {
                bancoTransferFeedback.innerHTML = `<span class="text-muted">Saldo restablecido a $4,850,000 COP</span>`;
            }
        });
    }

    /* ==========================================================================
       DEMO 2: DELIVERYBOT (Telegram Cafetería & n8n)
       ========================================================================== */
    const tgMessagesArea = document.getElementById('tg-messages-area');
    const tgUserInput = document.getElementById('tg-user-input');
    const tgSendBtn = document.getElementById('tg-send-btn');
    const tgStepper = document.getElementById('tg-stepper');
    const tgBtnReset = document.getElementById('tg-btn-reset');
    const stockCafe = document.getElementById('stock-cafe');

    let cafeStock = 12;

    function addTgMessage(text, isBot = true, extraHTML = '') {
        if (!tgMessagesArea) return;
        const msg = document.createElement('div');
        msg.className = `tg-msg ${isBot ? 'bot' : 'user'}`;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        msg.innerHTML = `
            <div class="tg-bubble">${text} ${extraHTML}</div>
            <span class="tg-time">${time}</span>
        `;
        tgMessagesArea.appendChild(msg);
        tgMessagesArea.scrollTop = tgMessagesArea.scrollHeight;
    }

    function handleTgAction(action) {
        if (action === 'cat_bebidas') {
            addTgMessage('Has seleccionado la categoría <strong>Bebidas</strong>.<br>Stock sincronizado en vivo con Google Sheets:<br><br>• <strong>Café Americano</strong> - $3.500 COP (Stock: ' + cafeStock + ')', true, `
                <div class="tg-keyboard">
                    <button class="tg-btn" id="tg-add-cafe">+ Agregar Café al Carrito</button>
                </div>
            `);
            const btnAdd = document.getElementById('tg-add-cafe');
            if (btnAdd) btnAdd.onclick = () => handleTgAction('add_cafe');
        } else if (action === 'add_cafe') {
            if (cafeStock > 0) {
                cafeStock--;
                if (stockCafe) stockCafe.textContent = cafeStock;
                addTgMessage('<strong>Carrito temporal actualizado</strong> (Tabla <code>SESSIONS</code>):<br>• 1x Café Americano ($3.500 COP)<br><br>¿Confirmar pedido?', true, `
                    <div class="tg-keyboard">
                        <button class="tg-btn" id="tg-confirm-order">Confirmar Pedido</button>
                    </div>
                `);
                const btnConfirm = document.getElementById('tg-confirm-order');
                if (btnConfirm) btnConfirm.onclick = () => handleTgAction('confirm');
            } else {
                addTgMessage('Aviso: El producto Café Americano se encuentra agotado en stock.', true);
            }
        } else if (action === 'confirm') {
            addTgMessage('Pedido <strong>#ORD-2026-94</strong> registrado.<br>Notificación webhook n8n enviada a cocina. Tiempo estimado: <strong>8 minutos</strong>.', true);
            if (tgStepper) {
                tgStepper.style.display = 'flex';
                document.getElementById('st-1')?.classList.add('active');
                setTimeout(() => document.getElementById('st-2')?.classList.add('active'), 1000);
                setTimeout(() => document.getElementById('st-3')?.classList.add('active'), 2000);
            }
        }
    }

    document.querySelectorAll('[data-tg-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const act = btn.getAttribute('data-tg-action');
            handleTgAction(act);
        });
    });

    if (tgSendBtn && tgUserInput) {
        tgSendBtn.addEventListener('click', () => {
            const val = tgUserInput.value.trim();
            if (!val) return;
            addTgMessage(val, false);
            tgUserInput.value = '';
            setTimeout(() => {
                if (val.includes('menu') || val.includes('pedir') || val.includes('start')) {
                    handleTgAction('cat_bebidas');
                } else {
                    addTgMessage('Comando recibido. Para ver el menú usa <code>/menu</code> o selecciona una categoría.', true);
                }
            }, 400);
        });
    }

    if (tgBtnReset) {
        tgBtnReset.addEventListener('click', () => {
            tgMessagesArea.innerHTML = `
                <div class="tg-msg bot">
                    <div class="tg-bubble">¡Hola Daniel! Bienvenido a la cafetería universitaria. Te ayudamos a ordenar sin filas.</div>
                    <span class="tg-time">10:14</span>
                </div>
            `;
            if (tgStepper) tgStepper.style.display = 'none';
            cafeStock = 12;
            if (stockCafe) stockCafe.textContent = cafeStock;
        });
    }

    /* ==========================================================================
       DEMO 3: CHATBOT CONTADURÍA (WhatsApp + Gemini AI)
       ========================================================================== */
    const waChatWindow = document.getElementById('wa-chat-window');
    const waTextInput = document.getElementById('wa-text-input');
    const waSendBtn = document.getElementById('wa-send-btn');

    function addWaMessage(text, isBot = true) {
        if (!waChatWindow) return;
        const bubble = document.createElement('div');
        bubble.className = `wa-bubble ${isBot ? 'wa-bot' : 'wa-user'}`;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        bubble.innerHTML = `<p>${text}</p><span class="wa-time">${time}</span>`;
        waChatWindow.appendChild(bubble);
        waChatWindow.scrollTop = waChatWindow.scrollHeight;
    }

    function askWaBot(queryType) {
        if (queryType === 'renta') {
            addWaMessage('¿Cuándo inician los vencimientos de renta para persona natural este año?', false);
            setTimeout(() => {
                addWaMessage('<strong>Calendario DIAN 2026:</strong><br>Los vencimientos inician en <strong>agosto de 2026</strong> y finalizan en octubre, según los dos últimos dígitos de tu NIT o cédula. Si eres asalariado con ingresos superiores a 1.400 UVT debes presentarla. ¿Deseas verificar si superas los topes?', true);
            }, 600);
        } else if (queryType === 'retencion') {
            addWaMessage('¿Cómo calculo la retención en la fuente de honorarios?', false);
            setTimeout(() => {
                addWaMessage('Para personas no declarantes la tarifa general es del <strong>10%</strong>. Si declaras renta es del <strong>11%</strong> sobre el valor antes de IVA. ¿Quieres liquidar un valor exacto?', true);
            }, 600);
        } else if (queryType === 'asesor') {
            addWaMessage('Solicito hablar con la contadora principal', false);
            setTimeout(() => {
                addWaMessage('<strong>Handoff activado:</strong> He derivado esta conversación a la contadora y pausado temporalmente mis respuestas automáticas. Te contactará en breve. (Envía <code>/reactivar</code> para reanudar la IA).', true);
            }, 600);
        }
    }

    document.querySelectorAll('.wa-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const q = chip.getAttribute('data-query');
            askWaBot(q);
        });
    });

    if (waSendBtn && waTextInput) {
        waSendBtn.addEventListener('click', () => {
            const val = waTextInput.value.trim();
            if (!val) return;
            addWaMessage(val, false);
            waTextInput.value = '';
            setTimeout(() => {
                addWaMessage('<strong>Respuesta Gemini AI:</strong> Entendida tu consulta sobre "' + val + '". Según la normativa fiscal colombiana, es preciso validar tus certificados de ingresos y retenciones del año gravable.', true);
            }, 600);
        });
    }

    /* ======================================================================================
       DEMO 4: FORMULA 1 JAVA (ROTACIÓN DE PISTAS CADA 4 SEGUNDOS & PRE-SAMPLED 60 FPS)
       ====================================================================================== */
    const f1CircuitPath = document.getElementById('f1-circuit-path');
    const f1CircuitPathBg = document.getElementById('f1-circuit-path-bg');
    const f1CircuitName = document.getElementById('f1-circuit-name');
    const f1CircuitBadge = document.getElementById('f1-circuit-badge');
    const f1CircuitTimerBar = document.getElementById('f1-circuit-timer-bar');
    const f1CircuitSec = document.getElementById('f1-circuit-sec');
    const f1Speed = document.getElementById('f1-speed');
    const f1RainOverlay = document.getElementById('f1-rain-overlay');
    const f1ToggleWeatherBtn = document.getElementById('f1-toggle-weather');
    const f1PitstopBtn = document.getElementById('f1-pitstop-btn');
    const f1NextCircuitBtn = document.getElementById('f1-next-circuit-btn');
    const f1WeatherBtnText = document.getElementById('f1-weather-btn-text');
    const f1PitMsg = document.getElementById('f1-pit-msg');
    const f1TireLabel = document.getElementById('f1-tire-label');
    const f1RowTire = document.getElementById('f1-row-tire');

    const car1 = document.getElementById('car-1');
    const car2 = document.getElementById('car-2');
    const car3 = document.getElementById('car-3');
    const car4 = document.getElementById('car-4');

    // 4 Circuitos de F1 completamente visibles dentro de viewBox="0 0 800 280"
    const F1_CIRCUITS = [
        {
            name: 'Monza (Italia) - 5.793 km',
            badge: 'Pista Activa: Monza',
            desc: 'Templo de la Velocidad',
            // Rectangular con Parabolica, Curva Grande y Variante Ascari (Margen seguro 50-750 x 45-225)
            d: 'M 260,220 L 620,220 C 660,220 680,200 680,170 C 680,120 670,80 620,60 C 570,45 530,75 480,75 C 430,75 390,55 340,65 C 280,75 220,60 170,80 C 120,100 70,140 70,180 C 70,215 120,220 180,220 Z'
        },
        {
            name: 'Silverstone (Reino Unido) - 5.891 km',
            badge: 'Pista Activa: Silverstone',
            desc: 'Maggotts, Becketts & Chapel',
            // Curvas fluidas en S y largas rectas (Margen seguro 70-740 x 50-230)
            d: 'M 120,190 C 80,170 70,120 110,80 C 150,50 220,60 270,100 C 310,130 350,130 390,90 C 430,55 500,50 560,70 C 630,90 710,80 730,130 C 740,175 690,210 630,220 C 560,230 480,190 420,190 C 360,190 320,230 250,230 C 190,230 150,205 120,190 Z'
        },
        {
            name: 'Spa-Francorchamps (Bélgica) - 7.004 km',
            badge: 'Pista Activa: Spa',
            desc: 'Eau Rouge & Raidillon',
            // Triángulo clásico con curvas técnicas (Margen seguro 70-740 x 50-230)
            d: 'M 100,160 C 70,120 100,60 170,60 C 230,60 290,110 370,80 C 430,60 520,50 630,55 C 720,60 740,110 710,150 C 670,190 620,150 560,160 C 490,170 470,230 390,230 C 320,230 290,180 230,190 C 170,200 130,190 100,160 Z'
        },
        {
            name: 'Red Bull Ring (Austria) - 4.318 km',
            badge: 'Pista Activa: Red Bull Ring',
            desc: 'Subida a Remus & Curvas Rápidas',
            // Rectas y horquillas de alta aceleración (Margen seguro 100-730 x 50-220)
            d: 'M 110,210 L 110,110 C 110,65 160,50 230,50 L 530,50 C 620,50 710,80 720,130 C 730,180 670,220 590,220 L 410,220 C 360,220 330,170 280,170 C 230,170 200,210 150,210 Z'
        }
    ];

    let currentCircuitIndex = 0;
    let circuitRotationStart = Date.now();
    const CIRCUIT_ROTATION_MS = 4000; // Exactamente 4 segundos por pista

    // Pre-muestreo de puntos: 400 coordenadas por pista precalculadas para 0% de lag
    const precomputedTracks = [];

    function sampleTrack(pathString, sampleCount = 400) {
        const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        tempPath.setAttribute('d', pathString);
        const len = tempPath.getTotalLength();
        const points = [];
        for (let i = 0; i < sampleCount; i++) {
            const p = tempPath.getPointAtLength((i / sampleCount) * len);
            points.push({ x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10 });
        }
        return points;
    }

    // Inicializar pre-muestreo de todas las pistas una sola vez
    F1_CIRCUITS.forEach(c => {
        precomputedTracks.push(sampleTrack(c.d, 400));
    });

    function applyCircuit(index) {
        currentCircuitIndex = index % F1_CIRCUITS.length;
        const circuit = F1_CIRCUITS[currentCircuitIndex];

        if (f1CircuitPath) f1CircuitPath.setAttribute('d', circuit.d);
        if (f1CircuitPathBg) f1CircuitPathBg.setAttribute('d', circuit.d);
        if (f1CircuitName) f1CircuitName.textContent = circuit.name;
        if (f1CircuitBadge) f1CircuitBadge.textContent = circuit.badge;

        circuitRotationStart = Date.now();
    }
    applyCircuit(0);

    // Posición de los 4 pilotos a lo largo de la pista (0.0 a 1.0)
    let p1Pos = 0.00;
    let p2Pos = 0.28;
    let p3Pos = 0.55;
    let p4Pos = 0.82;
    let isRaining = false;

    // Bucle de animación F1 a 60 FPS con búsqueda en array O(1)
    function runF1Simulation() {
        if (!document.hidden) {
            // Actualizar rotación cada 4 segundos
            const now = Date.now();
            const elapsed = now - circuitRotationStart;
            const progress = Math.min((elapsed / CIRCUIT_ROTATION_MS) * 100, 100);
            
            if (f1CircuitTimerBar) f1CircuitTimerBar.style.width = `${progress}%`;
            if (f1CircuitSec) {
                const remaining = Math.max(0, Math.ceil((CIRCUIT_ROTATION_MS - elapsed) / 1000));
                f1CircuitSec.textContent = `${remaining}s`;
            }

            if (elapsed >= CIRCUIT_ROTATION_MS) {
                applyCircuit(currentCircuitIndex + 1);
            }

            // Mover monoplazas sobre la pista actual
            const trackPoints = precomputedTracks[currentCircuitIndex];
            if (trackPoints && trackPoints.length > 0) {
                const speed = isRaining ? 0.0022 : 0.0035;

                p1Pos = (p1Pos + speed * 1.02) % 1;
                p2Pos = (p2Pos + speed * 0.99) % 1;
                p3Pos = (p3Pos + speed * 1.01) % 1;
                p4Pos = (p4Pos + speed * 0.98) % 1;

                const pt1 = trackPoints[Math.floor(p1Pos * 400) % 400];
                const pt2 = trackPoints[Math.floor(p2Pos * 400) % 400];
                const pt3 = trackPoints[Math.floor(p3Pos * 400) % 400];
                const pt4 = trackPoints[Math.floor(p4Pos * 400) % 400];

                if (car1 && pt1) { car1.setAttribute('cx', pt1.x); car1.setAttribute('cy', pt1.y); }
                if (car2 && pt2) { car2.setAttribute('cx', pt2.x); car2.setAttribute('cy', pt2.y); }
                if (car3 && pt3) { car3.setAttribute('cx', pt3.x); car3.setAttribute('cy', pt3.y); }
                if (car4 && pt4) { car4.setAttribute('cx', pt4.x); car4.setAttribute('cy', pt4.y); }
            }
        }
        requestAnimationFrame(runF1Simulation);
    }
    requestAnimationFrame(runF1Simulation);

    // Controles F1
    function toggleF1Weather() {
        isRaining = !isRaining;
        if (isRaining) {
            f1RainOverlay?.classList.add('active');
            if (f1TireLabel) f1TireLabel.textContent = 'Intermediates / Wets';
            if (f1WeatherBtnText) f1WeatherBtnText.textContent = 'Cambiar a Pista Seca';
            if (f1RowTire) f1RowTire.textContent = 'Wet';
            if (f1Speed) f1Speed.textContent = '285 km/h';
            showToast('Clima: Pista húmeda activada', 'info');
        } else {
            f1RainOverlay?.classList.remove('active');
            if (f1TireLabel) f1TireLabel.textContent = 'Soft (Desgaste 72%)';
            if (f1WeatherBtnText) f1WeatherBtnText.textContent = 'Cambiar Clima (Pista Húmeda)';
            if (f1RowTire) f1RowTire.textContent = 'Soft';
            if (f1Speed) f1Speed.textContent = '328 km/h';
            showToast('Clima: Pista seca restaurada', 'info');
        }
    }

    if (f1ToggleWeatherBtn) f1ToggleWeatherBtn.addEventListener('click', toggleF1Weather);

    if (f1NextCircuitBtn) {
        f1NextCircuitBtn.addEventListener('click', () => {
            applyCircuit(currentCircuitIndex + 1);
            showToast(`Pista cambiada a: ${F1_CIRCUITS[currentCircuitIndex].name}`, 'info');
        });
    }

    if (f1PitstopBtn) {
        f1PitstopBtn.addEventListener('click', () => {
            if (f1PitMsg) f1PitMsg.textContent = 'PIT STOP EN CURSO: 2.4s...';
            f1PitstopBtn.disabled = true;

            setTimeout(() => {
                if (f1PitMsg) f1PitMsg.textContent = 'PIT STOP EXITOSO: 2.38s! NEUMATICOS NUEVOS';
                if (f1TireLabel) f1TireLabel.textContent = isRaining ? 'Wet Nuevos (100%)' : 'Soft Nuevos (100%)';
                f1PitstopBtn.disabled = false;
                showToast('Parada en boxes completada en 2.38s', 'success');
            }, 2400);
        });
    }

    /* ==========================================================================
       DEMO 5: E-COMMERCE MODA
       ========================================================================== */
    const ecomAddBtn = document.getElementById('ecom-add-btn');
    const ecomCartToast = document.getElementById('ecom-cart-toast');
    const ecomCartCount = document.getElementById('ecom-cart-count');
    const ecomCheckoutBtn = document.getElementById('ecom-checkout-btn');
    let cartTotal = 0;

    const productsData = {
        chaqueta: { title: 'Chaqueta Cuero Vintage', price: '$89.00', desc: 'Confección en cuero sintético de alta resistencia con acabados mate y forro térmico transpirable.' },
        vestido: { title: 'Vestido Amarillo Solar', price: '$55.00', desc: 'Tejido suave en algodón orgánico con corte estilizado para eventos de verano.' },
        bolso: { title: 'Bolso Urbano Crimson', price: '$42.00', desc: 'Compartimientos reforzados y correa ajustable impermeable de alta durabilidad.' }
    };

    document.querySelectorAll('.ecom-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.ecom-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const pKey = card.getAttribute('data-product');
            const data = productsData[pKey];
            if (data) {
                document.getElementById('ecom-active-title').textContent = data.title;
                document.getElementById('ecom-active-desc').textContent = data.desc;
                document.getElementById('ecom-cur-price').textContent = data.price;
            }
        });
    });

    if (ecomAddBtn) {
        ecomAddBtn.addEventListener('click', () => {
            cartTotal++;
            if (ecomCartCount) ecomCartCount.textContent = cartTotal;
            if (ecomCartToast) ecomCartToast.style.display = 'flex';
            showToast('Producto agregado al carrito dinámico', 'success');
        });
    }

    if (ecomCheckoutBtn) {
        ecomCheckoutBtn.addEventListener('click', () => {
            showToast('Pago completado con éxito. Pedido #SHOP-912 emitido', 'success');
            if (ecomCartToast) ecomCartToast.style.display = 'none';
            cartTotal = 0;
            if (ecomCartCount) ecomCartCount.textContent = '0';
        });
    }

    /* ==========================================================================
       DEMO 6: AGENCIA DE VIAJES (Clean Architecture & Conversor de Divisas)
       ========================================================================== */
    const viajesOrigin = document.getElementById('viajes-origin');
    const viajesDest = document.getElementById('viajes-dest');
    const bpFrom = document.getElementById('bp-from');
    const bpTo = document.getElementById('bp-to');
    const viajesBasePrice = document.getElementById('viajes-base-price');
    const viajesTotalPrice = document.getElementById('viajes-total-price');
    const viajesBtnBook = document.getElementById('viajes-btn-book');
    const bpStatus = document.getElementById('bp-status');

    let currentCurrency = 'COP';

    function updateFlightDisplay() {
        if (bpFrom && viajesOrigin) bpFrom.textContent = viajesOrigin.value;
        if (bpTo && viajesDest) bpTo.textContent = viajesDest.value;
    }

    if (viajesOrigin) viajesOrigin.addEventListener('change', updateFlightDisplay);
    if (viajesDest) viajesDest.addEventListener('change', updateFlightDisplay);

    document.querySelectorAll('.curr-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.curr-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCurrency = pill.getAttribute('data-curr');

            if (currentCurrency === 'COP') {
                viajesBasePrice.textContent = '$3,450,000 COP';
                viajesTotalPrice.textContent = '$3,450,000 COP';
            } else if (currentCurrency === 'USD') {
                viajesBasePrice.textContent = '$820 USD';
                viajesTotalPrice.textContent = '$820 USD';
            } else if (currentCurrency === 'EUR') {
                viajesBasePrice.textContent = '€760 EUR';
                viajesTotalPrice.textContent = '€760 EUR';
            }
        });
    });

    if (viajesBtnBook) {
        viajesBtnBook.addEventListener('click', () => {
            if (bpStatus) {
                bpStatus.textContent = 'EMITIENDO...';
                bpStatus.className = 'bp-val text-amber';
            }

            setTimeout(() => {
                if (bpStatus) {
                    bpStatus.textContent = 'EMITIDO & CONFIRMADO (SQLITE OK)';
                    bpStatus.className = 'bp-val text-green';
                }
                showToast('Boleto aéreo reservado y registrado en la base de datos', 'success');
            }, 600);
        });
    }

    /* Acciones automáticas del modo Auto-GIF */
    function triggerProjectAutoAction(project) {
        if (!isAutoMode) return;
        if (project === 'banco') {
            setTimeout(() => executeBancoTransfer(150000, 'Camila Gómez'), 1200);
        } else if (project === 'delivery') {
            setTimeout(() => handleTgAction('cat_bebidas'), 1000);
            setTimeout(() => handleTgAction('add_cafe'), 2800);
        } else if (project === 'chatbot') {
            setTimeout(() => askWaBot('renta'), 1200);
        } else if (project === 'f1') {
            setTimeout(() => applyCircuit(currentCircuitIndex + 1), 2000);
        } else if (project === 'ecommerce') {
            setTimeout(() => {
                if (ecomAddBtn) ecomAddBtn.click();
            }, 1500);
        } else if (project === 'viajes') {
            setTimeout(() => {
                const usdPill = document.querySelector('.curr-pill[data-curr="USD"]');
                if (usdPill) usdPill.click();
            }, 1200);
        }
    }

    /* ==========================================================================
       7. CONSOLA INTERACTIVA TERMINAL DEVELOPER (SIN EMOTICONOS)
       ========================================================================== */
    const terminalScreen = document.getElementById('terminal-screen');
    const terminalInput = document.getElementById('terminal-input');

    function printTerminal(text, className = '') {
        if (!terminalScreen) return;
        const line = document.createElement('div');
        line.className = `terminal-output-line ${className}`;
        line.innerHTML = text;
        terminalScreen.appendChild(line);
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }

    function runTerminalCommand(rawCmd) {
        const cmd = rawCmd.trim().toLowerCase();
        printTerminal(`<span class="text-green">daniel@dev:~$</span> ${rawCmd}`);

        switch (cmd) {
            case 'help':
                printTerminal('Comandos disponibles:');
                printTerminal('  <span class="text-cyan">about</span>       - Perfil profesional y trayectoria');
                printTerminal('  <span class="text-cyan">cv / hdv</span>    - Descargar Hojas de Vida (ATS y Campuslands)');
                printTerminal('  <span class="text-cyan">projects</span>    - Los 6 repositorios anclados en GitHub');
                printTerminal('  <span class="text-cyan">skills</span>      - Stack tecnológico (Java, Docker, n8n, etc.)');
                printTerminal('  <span class="text-cyan">demo</span>        - Ir directamente al Simulador Interactivo');
                printTerminal('  <span class="text-cyan">contact</span>     - Canales de contacto profesional');
                printTerminal('  <span class="text-cyan">matrix</span>      - Mensaje de arquitectura');
                printTerminal('  <span class="text-cyan">clear</span>       - Limpiar pantalla de terminal');
                break;
            case 'cv':
            case 'hdv':
            case 'resume':
                printTerminal('<strong>Hojas de Vida Disponibles (Descarga Directa & Drive):</strong>');
                printTerminal('• [01] <strong>HDV ATS (PDF):</strong> <a href="cv/HojaDeVida_ATS_DanielOsorio.pdf" download="Hoja_de_Vida_ATS_Daniel_Osorio.pdf" class="text-cyan">Descargar PDF</a> | <a href="https://drive.google.com/file/d/1bQABV_C9gZE0iSe6uRBOpIkgEr5aiXaP/view?usp=sharing" target="_blank" class="text-green">Ver en Google Drive ↗</a>');
                printTerminal('• [02] <strong>HDV Campuslands (PDF):</strong> <a href="cv/HojaDeVida_Campuslands_DanielOsorio.pdf" download="Hoja_de_Vida_Campuslands_Daniel_Osorio.pdf" class="text-cyan">Descargar PDF</a> | <a href="https://drive.google.com/file/d/1xJmhhROu52DpJHZ2JbXHRRwl4OWtTp86/view?usp=sharing" target="_blank" class="text-green">Ver en Google Drive ↗</a>');
                printTerminal('Formato estándar ATS para reclutadores + diseño institucional de Campuslands.', 'text-muted');
                break;
            case 'about':
                printTerminal('<strong>Daniel Santiago Osorio Garces</strong>');
                printTerminal('Técnico laboral en desarrollo de software (Campuslands).');
                printTerminal('Especializado en arquitecturas limpias, Java/Spring Boot, Docker, n8n e IA.');
                break;
            case 'projects':
                printTerminal('<strong>Repositorios Anclados (GitHub):</strong>');
                printTerminal('1. [01] <a href="https://github.com/santiagoosorio0708e-wq/Banco-ACME" target="_blank" class="text-cyan">Banco-ACME</a> (SPA Transaccional modular)');
                printTerminal('2. [02] <a href="https://github.com/santiagoosorio0708e-wq/delivery-bot" target="_blank" class="text-cyan">delivery-bot</a> (Telegram + n8n + Sheets)');
                printTerminal('3. [03] <a href="https://github.com/santiagoosorio0708e-wq/chatbot-contaduria" target="_blank" class="text-cyan">chatbot-contaduria</a> (WhatsApp + Gemini)');
                printTerminal('4. [04] <a href="https://github.com/santiagoosorio0708e-wq/Formula1-java" target="_blank" class="text-cyan">Formula1-java</a> (Swing multihilo concurrente)');
                printTerminal('5. [05] <a href="https://github.com/santiagoosorio0708e-wq/E-commerce" target="_blank" class="text-cyan">E-commerce</a> (Tienda dinámica)');
                printTerminal('6. [06] <a href="https://github.com/santiagoosorio0708e-wq/empresa-viajes" target="_blank" class="text-cyan">empresa-viajes</a> (Python Clean Architecture)');
                break;
            case 'skills':
                printTerminal('<strong>Tecnologías Principales:</strong>');
                printTerminal('• Backend: Java 21, Spring Boot, Node.js, Python 3.10+, Express');
                printTerminal('• DevOps: Docker, Docker Compose, Render, Netlify, GitFlow');
                printTerminal('• IA & Workflows: Google Gemini AI, n8n, Baileys WebSocket');
                printTerminal('• Bases de Datos: PostgreSQL, MySQL, SQLite, Postman');
                break;
            case 'contact':
                printTerminal('Email: <a href="mailto:santiagoosorio0708e@gmail.com" class="text-cyan">santiagoosorio0708e@gmail.com</a>');
                printTerminal('WhatsApp: <a href="https://wa.me/573014609110" target="_blank" class="text-green">+57 301 460 9110</a>');
                printTerminal('LinkedIn: <a href="https://www.linkedin.com/in/daniel-santiago-osorio-garc%C3%A9s-03b7633a6/" target="_blank" class="text-cyan">in/daniel-santiago-osorio-garcés</a>');
                printTerminal('GitHub: <a href="https://github.com/santiagoosorio0708e-wq" target="_blank" class="text-cyan">github.com/santiagoosorio0708e-wq</a>');
                break;
            case 'demo':
                const studioEl = document.getElementById('demo-studio');
                if (studioEl) studioEl.scrollIntoView({ behavior: 'smooth' });
                printTerminal('Desplazando hacia el Simulador de Proyectos en Vivo...');
                break;
            case 'matrix':
                printTerminal('01000100 01100001 01101110 01101001 01100101 01101100 00100000 01000100 01100101 01110110', 'text-green');
                printTerminal('"El software bien diseñado parece magia, pero es pura arquitectura y disciplina."', 'text-cyan');
                break;
            case 'clear':
                terminalScreen.innerHTML = '';
                break;
            case 'date':
                printTerminal(new Date().toString());
                break;
            case 'sudo':
                printTerminal('Acceso denegado: Daniel ya cuenta con permisos de administrador root en el sistema.', 'text-amber');
                break;
            default:
                printTerminal(`Comando no reconocido: '${rawCmd}'. Escribe <span class="text-green">'help'</span> para ver la lista.`, 'text-red');
                break;
        }
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = terminalInput.value;
                if (val) {
                    runTerminalCommand(val);
                    terminalInput.value = '';
                }
            }
        });
    }

    document.querySelectorAll('.term-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            runTerminalCommand(cmd);
        });
    });

    /* ==========================================================================
       8. COPIAR CORREO AL PORTAPAPELES
       ========================================================================== */
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast('Correo copiado: ' + textToCopy, 'success');
                });
            } else {
                showToast('Correo: ' + textToCopy, 'info');
            }
        });
    });

    /* ==========================================================================
       9. ANIMACIONES DE SCROLL (IntersectionObserver)
       ========================================================================== */
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.project-card, .skills-card, .timeline-item, .pillar-card, .contact-method-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        scrollObserver.observe(el);
    });

});