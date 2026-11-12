/* ==========================================================================
   DANIEL SANTIAGO OSORIO GARCES - PORTAFOLIO PROFESIONAL
   Motor Interactivo • Simulador de Proyectos en Vivo • Terminal & Audio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SISTEMA DE AUDIO (Web Audio API Synthesizer - 100% Autocontenido)
       ========================================================================== */
    let audioContext = null;
    let audioEnabled = true;

    function initAudio() {
        if (!audioContext) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                audioContext = new AudioCtx();
            }
        }
    }

    function playSound(type = 'click') {
        if (!audioEnabled) return;
        try {
            initAudio();
            if (!audioContext || audioContext.state === 'suspended') {
                audioContext?.resume();
            }
            if (!audioContext) return;

            const now = audioContext.currentTime;
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);

            if (type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
            } else if (type === 'success') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, now); // C5
                osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
                osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.start(now);
                osc.stop(now + 0.35);
            } else if (type === 'tab') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            }
        } catch (e) {
            // Audio policy fallback
        }
    }

    const audioToggleBtn = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            audioEnabled = !audioEnabled;
            audioIcon.textContent = audioEnabled ? '🔊' : '🔇';
            showToast(audioEnabled ? 'Efectos de sonido activados' : 'Efectos de sonido silenciados', 'info');
            playSound('click');
        });
    }

    /* ==========================================================================
       2. NOTIFICACIONES TOAST
       ========================================================================== */
    const toastContainer = document.getElementById('toast-container');
    function showToast(message, type = 'info') {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icon = type === 'success' ? '✅' : '⚡';
        toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    /* ==========================================================================
       3. AMBIENT CANVAS PARTICLES (Efecto Constelación Cyber)
       ========================================================================== */
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const particleCount = Math.min(Math.floor(width / 35), 45);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                radius: Math.random() * 1.8 + 0.8,
                color: i % 3 === 0 ? 'rgba(99, 102, 241, 0.4)' : (i % 3 === 1 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(16, 185, 129, 0.3)')
            });
        }

        let mouse = { x: null, y: null, maxDist: 120 };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        function animateParticles() {
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

                // Mouse interaction
                if (mouse.x !== null) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.maxDist) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.25 * (1 - dist / mouse.maxDist)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }

                // Connect particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    /* ==========================================================================
       4. CABECERA & NAVEGACIÓN MÓVIL
       ========================================================================== */
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenuWrapper = document.getElementById('nav-menu-wrapper');
    if (mobileToggle && navMenuWrapper) {
        mobileToggle.addEventListener('click', () => {
            navMenuWrapper.classList.toggle('active');
            playSound('click');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenuWrapper.classList.remove('active');
                playSound('click');
            });
        });
    }

    /* ==========================================================================
       5. SISTEMA DE IDIOMA (ES / EN)
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
            playSound('tab');
            showToast(nextLang === 'es' ? 'Idioma cambiado a Español' : 'Language switched to English', 'info');
        });
    }

    /* ==========================================================================
       6. EFECTO TYPEWRITER EN HERO
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
    let typeDelay = 100;

    function typeWriter() {
        const phrases = currentLang === 'es' ? phrasesEs : phrasesEn;
        const currentPhrase = phrases[phraseIndex % phrases.length];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 40;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeDelay = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex++;
            typeDelay = 400; // Pause before typing next
        }

        setTimeout(typeWriter, typeDelay);
    }
    if (typewriterEl) typeWriter();

    /* ==========================================================================
       7. FLAGSHIP: INTERACTIVE DEMO STUDIO ENGINE (Auto-GIF & Modo Interactivo)
       ========================================================================== */
    const studioTabs = document.querySelectorAll('.studio-tab');
    const demoScreens = document.querySelectorAll('.demo-screen');
    const modeAutoBtn = document.getElementById('mode-auto-btn');
    const modeInteractiveBtn = document.getElementById('mode-interactive-btn');
    const studioPlayToggle = document.getElementById('studio-play-toggle');
    const demoProgressBar = document.getElementById('demo-progress-bar');
    const studioStatusText = document.getElementById('studio-status-text');

    let currentProject = 'banco';
    let isAutoMode = true;
    let isPlaying = true;
    let autoTimer = null;
    let progressTimer = null;
    let progressVal = 0;
    const LOOP_DURATION_MS = 8000; // 8 seconds per project in Auto-GIF mode

    function switchProject(projectKey) {
        currentProject = projectKey;
        playSound('tab');

        studioTabs.forEach(tab => {
            const isActive = tab.getAttribute('data-project') === projectKey;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        demoScreens.forEach(screen => {
            const isTarget = screen.id === `demo-screen-${projectKey}`;
            screen.classList.toggle('active', isTarget);
        });

        // Trigger project-specific auto animations if in Auto Mode
        triggerProjectAutoAction(projectKey);
        resetProgressBar();
    }

    studioTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const projectKey = tab.getAttribute('data-project');
            switchProject(projectKey);
        });
    });

    // Support "Probar Demo" buttons from project cards grid
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

    // Mode Toggle
    if (modeAutoBtn && modeInteractiveBtn) {
        modeAutoBtn.addEventListener('click', () => {
            isAutoMode = true;
            modeAutoBtn.classList.add('active');
            modeInteractiveBtn.classList.remove('active');
            studioStatusText.textContent = 'AUTO-GIF ACTIVO (LOOP CONTINUO)';
            startAutoLoop();
            playSound('click');
            showToast('Modo Auto-GIF activado: ciclo de animación automática', 'info');
        });

        modeInteractiveBtn.addEventListener('click', () => {
            isAutoMode = false;
            modeInteractiveBtn.classList.add('active');
            modeAutoBtn.classList.remove('active');
            studioStatusText.textContent = 'MODO INTERACTIVO ABIERTO';
            stopAutoLoop();
            playSound('click');
            showToast('Modo Interactivo activado: ¡pruébalo tú mismo!', 'success');
        });
    }

    // Play / Pause Toggle
    if (studioPlayToggle) {
        studioPlayToggle.addEventListener('click', () => {
            isPlaying = !isPlaying;
            studioPlayToggle.textContent = isPlaying ? '⏸️' : '▶️';
            if (isPlaying) {
                startAutoLoop();
                studioStatusText.textContent = 'AUTO-GIF ACTIVO';
            } else {
                stopAutoLoop();
                studioStatusText.textContent = 'SIMULADOR EN PAUSA';
            }
            playSound('click');
        });
    }

    function resetProgressBar() {
        progressVal = 0;
        if (demoProgressBar) demoProgressBar.style.width = '0%';
    }

    function startAutoLoop() {
        stopAutoLoop();
        if (!isAutoMode || !isPlaying) return;

        const updateInterval = 80;
        const step = (updateInterval / LOOP_DURATION_MS) * 100;

        progressTimer = setInterval(() => {
            progressVal += step;
            if (demoProgressBar) demoProgressBar.style.width = `${Math.min(progressVal, 100)}%`;

            if (progressVal >= 100) {
                progressVal = 0;
                // Move to next project
                const projects = ['banco', 'delivery', 'chatbot', 'f1', 'ecommerce', 'viajes'];
                const curIdx = projects.indexOf(currentProject);
                const nextProject = projects[(curIdx + 1) % projects.length];
                switchProject(nextProject);
            }
        }, updateInterval);
    }

    function stopAutoLoop() {
        clearInterval(progressTimer);
        clearTimeout(autoTimer);
    }
    startAutoLoop();

    /* ==========================================================================
       DEMO 1: BANCO ACME (Simulación de Transferencia & Saldos)
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
            bancoTransferFeedback.innerHTML = `<span class="text-red">❌ Saldo insuficiente para transferir $${amount.toLocaleString()} COP</span>`;
            return;
        }

        bancoTransferFeedback.innerHTML = `<span class="text-cyan">⏳ Procesando validación Web Component...</span>`;
        bancoBtnTransfer.disabled = true;

        setTimeout(() => {
            currentBalance -= amount;
            bancoBalanceDisplay.textContent = `$${currentBalance.toLocaleString()} COP`;
            bancoTransferFeedback.innerHTML = `<span class="text-green">✅ ¡Transferencia enviada exitosamente a ${recipient}!</span>`;
            bancoBtnTransfer.disabled = false;
            playSound('success');

            // Add item to ledger
            if (bancoLedgerList) {
                const item = document.createElement('div');
                item.className = 'ledger-item negative';
                item.innerHTML = `
                    <span class="ledger-icon">📤</span>
                    <div class="ledger-details">
                        <span class="ledger-name">Transferencia a ${recipient}</span>
                        <span class="ledger-date">Ahora mismo</span>
                    </div>
                    <span class="ledger-amt">-$${amount.toLocaleString()} COP</span>
                `;
                bancoLedgerList.prepend(item);
            }
        }, 800);
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
            bancoBalanceDisplay.textContent = `$${currentBalance.toLocaleString()} COP`;
            bancoTransferFeedback.innerHTML = `<span class="text-muted">Saldo restablecido a $4,850,000 COP</span>`;
            playSound('click');
        });
    }

    /* ==========================================================================
       DEMO 2: DELIVERYBOT (Simulador Telegram con Stock en Sheets)
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
        if (isBot) playSound('click');
    }

    function handleTgAction(action) {
        if (action === 'cat_bebidas') {
            addTgMessage('☕ Has seleccionado la categoría <strong>Bebidas</strong>.<br>Stock sincronizado en vivo con Google Sheets:<br><br>• <strong>Café Americano</strong> - $3.500 COP (Stock: ' + cafeStock + ')', true, `
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
                addTgMessage('🛒 <strong>Carrito temporal actualizado</strong> (Tabla <code>SESSIONS</code>):<br>• 1x Café Americano ($3.500 COP)<br><br>¿Deseas confirmar la orden?', true, `
                    <div class="tg-keyboard">
                        <button class="tg-btn" id="tg-confirm-order">✅ Confirmar Pedido</button>
                    </div>
                `);
                const btnConfirm = document.getElementById('tg-confirm-order');
                if (btnConfirm) btnConfirm.onclick = () => handleTgAction('confirm');
            } else {
                addTgMessage('⚠️ ¡Lo sentimos! El producto Café Americano se ha agotado en el inventario.', true);
            }
        } else if (action === 'confirm') {
            addTgMessage('🎉 ¡Pedido <strong>#ORD-2026-94</strong> recibido!<br>Webhook enviado a la cocina. Tiempo estimado de entrega: <strong>8 minutos</strong>.', true);
            if (tgStepper) {
                tgStepper.style.display = 'flex';
                document.getElementById('st-1')?.classList.add('active');
                setTimeout(() => document.getElementById('st-2')?.classList.add('active'), 1200);
                setTimeout(() => document.getElementById('st-3')?.classList.add('active'), 2500);
            }
            playSound('success');
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
            }, 500);
        });
    }

    if (tgBtnReset) {
        tgBtnReset.addEventListener('click', () => {
            tgMessagesArea.innerHTML = `
                <div class="tg-msg bot">
                    <div class="tg-bubble">¡Hola Daniel! ☕ Bienvenido a la cafetería universitaria. Te ayudamos a ordenar sin filas.</div>
                    <span class="tg-time">10:14</span>
                </div>
            `;
            if (tgStepper) tgStepper.style.display = 'none';
            cafeStock = 12;
            if (stockCafe) stockCafe.textContent = cafeStock;
            playSound('click');
        });
    }

    /* ==========================================================================
       DEMO 3: CHATBOT CONTADURIA (WhatsApp + Google Gemini)
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
        if (isBot) playSound('click');
    }

    function askWaBot(queryType) {
        if (queryType === 'renta') {
            addWaMessage('¿Cuándo inician los vencimientos de renta para persona natural este año?', false);
            setTimeout(() => {
                addWaMessage('⚖️ <strong>Calendario DIAN 2026:</strong><br>Los vencimientos inician en <strong>agosto de 2026</strong> y finalizan en octubre, según los dos últimos dígitos de tu NIT o cédula. Si eres asalariado con ingresos superiores a 1.400 UVT debes presentarla. ¿Deseas verificar si superas los topes?', true);
                playSound('success');
            }, 800);
        } else if (queryType === 'retencion') {
            addWaMessage('¿Cómo calculo la retención en la fuente de honorarios?', false);
            setTimeout(() => {
                addWaMessage('📊 Para personas no declarantes la tarifa general es del <strong>10%</strong>. Si declaras renta es del <strong>11%</strong> sobre el valor antes de IVA. ¿Quieres calcular una cifra específica?', true);
            }, 800);
        } else if (queryType === 'asesor') {
            addWaMessage('Quiero hablar directamente con la contadora principal', false);
            setTimeout(() => {
                addWaMessage('🔄 <strong>Handoff detectado:</strong> He notificado a la contadora y pausado temporalmente mis respuestas automáticas en este chat. La asesora te responderá en breve. (Envía <code>/reactivar</code> para volver al bot).', true);
            }, 800);
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
                addWaMessage('🤖 <strong>Respuesta Gemini AI:</strong> Entendido tu consulta sobre "' + val + '". Basado en la legislación tributaria colombiana, este procedimiento requiere validar tus soportes de retención y certificados de ingresos.', true);
            }, 800);
        });
    }

    /* ==========================================================================
       DEMO 4: FORMULA 1 JAVA (Simulación de Carrera Multihilo)
       ========================================================================== */
    const f1Speed = document.getElementById('f1-speed');
    const f1Gear = document.getElementById('f1-gear');
    const f1WeatherLabel = document.getElementById('f1-weather-label');
    const f1TireLabel = document.getElementById('f1-tire-label');
    const f1RainOverlay = document.getElementById('f1-rain-overlay');
    const f1ToggleWeatherBtn = document.getElementById('f1-toggle-weather');
    const f1PitstopBtn = document.getElementById('f1-pitstop-btn');
    const f1WeatherBtnText = document.getElementById('f1-weather-btn-text');
    const f1PitMsg = document.getElementById('f1-pit-msg');
    const f1RowTire = document.getElementById('f1-row-tire');

    let isRaining = false;
    let car1Pos = 0;
    let car2Pos = 0.35;
    let car3Pos = 0.70;

    // Animate cars on SVG path
    const circuitPath = document.getElementById('f1-circuit-path');
    const car1 = document.getElementById('car-1');
    const car2 = document.getElementById('car-2');
    const car3 = document.getElementById('car-3');

    function animateF1Cars() {
        if (circuitPath && car1 && car2 && car3) {
            const pathLength = circuitPath.getTotalLength();
            const speed = isRaining ? 0.0016 : 0.0028;

            car1Pos = (car1Pos + speed) % 1;
            car2Pos = (car2Pos + speed * 0.98) % 1;
            car3Pos = (car3Pos + speed * 1.02) % 1;

            const p1 = circuitPath.getPointAtLength(car1Pos * pathLength);
            car1.setAttribute('cx', p1.x);
            car1.setAttribute('cy', p1.y);

            const p2 = circuitPath.getPointAtLength(car2Pos * pathLength);
            car2.setAttribute('cx', p2.x);
            car2.setAttribute('cy', p2.y);

            const p3 = circuitPath.getPointAtLength(car3Pos * pathLength);
            car3.setAttribute('cx', p3.x);
            car3.setAttribute('cy', p3.y);
        }
        requestAnimationFrame(animateF1Cars);
    }
    requestAnimationFrame(animateF1Cars);

    function toggleF1Weather() {
        isRaining = !isRaining;
        if (isRaining) {
            f1RainOverlay?.classList.add('active');
            if (f1WeatherLabel) f1WeatherLabel.textContent = '🌧️ Lluvia Torrencial (Wet)';
            if (f1TireLabel) f1TireLabel.textContent = '🔵 Intermediates / Wets';
            if (f1WeatherBtnText) f1WeatherBtnText.textContent = 'Cambiar a Pista Seca (Dry)';
            if (f1RowTire) f1RowTire.textContent = '🔵 Wet';
            if (f1Speed) f1Speed.textContent = '285 km/h';
            showToast('Clima dinámico activado: Lluvia Torrencial', 'info');
        } else {
            f1RainOverlay?.classList.remove('active');
            if (f1WeatherLabel) f1WeatherLabel.textContent = '☀️ Pista Seca (Dry)';
            if (f1TireLabel) f1TireLabel.textContent = '🔴 Soft (Desgaste 72%)';
            if (f1WeatherBtnText) f1WeatherBtnText.textContent = 'Cambiar a Lluvia Torrencial';
            if (f1RowTire) f1RowTire.textContent = '🔴 Soft';
            if (f1Speed) f1Speed.textContent = '328 km/h';
            showToast('Clima dinámico: Pista Seca restaurada', 'info');
        }
        playSound('click');
    }

    if (f1ToggleWeatherBtn) f1ToggleWeatherBtn.addEventListener('click', toggleF1Weather);

    if (f1PitstopBtn) {
        f1PitstopBtn.addEventListener('click', () => {
            if (f1PitMsg) f1PitMsg.textContent = 'BOX IN: CAMBIO DE NEUMÁTICOS... (2.4s)';
            f1PitstopBtn.disabled = true;
            playSound('tab');

            setTimeout(() => {
                if (f1PitMsg) f1PitMsg.textContent = '✅ PIT STOP PERFECTO: 2.38s! NEUMÁTICOS NUEVOS';
                if (f1TireLabel) f1TireLabel.textContent = isRaining ? '🔵 Wet Nuevos (100%)' : '🔴 Soft Nuevos (100%)';
                f1PitstopBtn.disabled = false;
                playSound('success');
            }, 2400);
        });
    }

    /* ==========================================================================
       DEMO 5: E-COMMERCE MODA (Catálogo Dinámico & Carrito)
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
            playSound('click');
        });
    });

    if (ecomAddBtn) {
        ecomAddBtn.addEventListener('click', () => {
            cartTotal++;
            if (ecomCartCount) ecomCartCount.textContent = cartTotal;
            if (ecomCartToast) ecomCartToast.style.display = 'flex';
            playSound('success');
            showToast('Producto agregado al carrito dinámico', 'success');
        });
    }

    if (ecomCheckoutBtn) {
        ecomCheckoutBtn.addEventListener('click', () => {
            showToast('🎉 ¡Pago completado con éxito! Pedido #SHOP-912 emitido', 'success');
            playSound('success');
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
    const baseCopPrice = 3450000;

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
            playSound('tab');
        });
    });

    if (viajesBtnBook) {
        viajesBtnBook.addEventListener('click', () => {
            if (bpStatus) {
                bpStatus.textContent = 'EMITIENDO...';
                bpStatus.className = 'bp-val text-amber';
            }
            playSound('click');

            setTimeout(() => {
                if (bpStatus) {
                    bpStatus.textContent = 'EMITIDO & CONFIRMADO (SQLITE OK)';
                    bpStatus.className = 'bp-val text-green';
                }
                playSound('success');
                showToast('Boleto aéreo reservado y registrado en la base de datos', 'success');
            }, 900);
        });
    }

    /* Auto action triggers for Auto-GIF Mode */
    function triggerProjectAutoAction(project) {
        if (!isAutoMode) return;
        if (project === 'banco') {
            setTimeout(() => executeBancoTransfer(150000, 'Camila Gómez'), 1400);
        } else if (project === 'delivery') {
            setTimeout(() => handleTgAction('cat_bebidas'), 1200);
            setTimeout(() => handleTgAction('add_cafe'), 3200);
        } else if (project === 'chatbot') {
            setTimeout(() => askWaBot('renta'), 1500);
        } else if (project === 'f1') {
            setTimeout(() => toggleF1Weather(), 2000);
        } else if (project === 'ecommerce') {
            setTimeout(() => {
                if (ecomAddBtn) ecomAddBtn.click();
            }, 1800);
        } else if (project === 'viajes') {
            setTimeout(() => {
                const usdPill = document.querySelector('.curr-pill[data-curr="USD"]');
                if (usdPill) usdPill.click();
            }, 1500);
        }
    }

    /* ==========================================================================
       8. CONSOLA INTERACTIVA TERMINAL DEVELOPER
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
        playSound('click');

        switch (cmd) {
            case 'help':
                printTerminal('Comandos disponibles:');
                printTerminal('  <span class="text-cyan">about</span>       - Resumen del perfil profesional y trayectoria');
                printTerminal('  <span class="text-cyan">projects</span>    - Lista de los 6 repositorios anclados en GitHub');
                printTerminal('  <span class="text-cyan">skills</span>      - Stack tecnológico (Java, Docker, n8n, etc.)');
                printTerminal('  <span class="text-cyan">demo</span>        - Navega directo al Simulador Interactivo');
                printTerminal('  <span class="text-cyan">contact</span>     - Canales de contacto directo');
                printTerminal('  <span class="text-cyan">matrix</span>      - Efecto visual terminal');
                printTerminal('  <span class="text-cyan">clear</span>       - Limpiar pantalla');
                break;
            case 'about':
                printTerminal('<strong>Daniel Santiago Osorio Garces</strong>');
                printTerminal('Técnico laboral en desarrollo de software (Campuslands).');
                printTerminal('Especializado en arquitecturas limpias, Java/Spring Boot, Docker, n8n e IA.');
                break;
            case 'projects':
                printTerminal('<strong>Repositorios Anclados (GitHub):</strong>');
                printTerminal('1. 🏦 <a href="https://github.com/santiagoosorio0708e-wq/Banco-ACME" target="_blank" class="text-cyan">Banco-ACME</a> (SPA Transaccional modular)');
                printTerminal('2. 🤖 <a href="https://github.com/santiagoosorio0708e-wq/delivery-bot" target="_blank" class="text-cyan">delivery-bot</a> (Telegram + n8n + Sheets)');
                printTerminal('3. 💬 <a href="https://github.com/santiagoosorio0708e-wq/chatbot-contaduria" target="_blank" class="text-cyan">chatbot-contaduria</a> (WhatsApp + Gemini)');
                printTerminal('4. 🏎️ <a href="https://github.com/santiagoosorio0708e-wq/Formula1-java" target="_blank" class="text-cyan">Formula1-java</a> (Swing multihilo concurrente)');
                printTerminal('5. 🛍️ <a href="https://github.com/santiagoosorio0708e-wq/E-commerce" target="_blank" class="text-cyan">E-commerce</a> (Tienda dinámica)');
                printTerminal('6. ✈️ <a href="https://github.com/santiagoosorio0708e-wq/empresa-viajes" target="_blank" class="text-cyan">empresa-viajes</a> (Python Clean Architecture)');
                break;
            case 'skills':
                printTerminal('<strong>Tecnologías Principales:</strong>');
                printTerminal('• <strong>Backend:</strong> Java 21, Spring Boot, Node.js, Python 3.10+, Express');
                printTerminal('• <strong>DevOps:</strong> Docker, Docker Compose, Render, Netlify, GitFlow');
                printTerminal('• <strong>IA & Workflows:</strong> Google Gemini AI, n8n, Baileys WebSocket');
                printTerminal('• <strong>Bases de Datos:</strong> PostgreSQL, MySQL, SQLite, Postman');
                break;
            case 'contact':
                printTerminal('Email: <a href="mailto:santiagoosorio0708e@gmail.com" class="text-cyan">santiagoosorio0708e@gmail.com</a>');
                printTerminal('WhatsApp: <a href="https://wa.me/573014609110" target="_blank" class="text-green">+57 301 460 9110</a>');
                printTerminal('GitHub: <a href="https://github.com/santiagoosorio0708e-wq" target="_blank" class="text-cyan">@santiagoosorio0708e-wq</a>');
                break;
            case 'demo':
                const studioEl = document.getElementById('demo-studio');
                if (studioEl) studioEl.scrollIntoView({ behavior: 'smooth' });
                printTerminal('⚡ Desplazando hacia el Simulador de Proyectos en Vivo...');
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
                printTerminal('Acceso denegado: Daniel ya tiene permisos root en este sistema ;)', 'text-amber');
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
       9. COPIAR CORREO AL PORTAPAPELES
       ========================================================================== */
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast('Correo copiado al portapapeles: ' + textToCopy, 'success');
                    playSound('success');
                });
            } else {
                showToast('Correo: ' + textToCopy, 'info');
            }
        });
    });

    /* ==========================================================================
       10. ANIMACIONES DE SCROLL (IntersectionObserver)
       ========================================================================== */
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .skills-card, .timeline-item, .pillar-card, .contact-method-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        scrollObserver.observe(el);
    });

});