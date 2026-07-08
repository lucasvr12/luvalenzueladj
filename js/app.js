/* ==========================================================================
   iOS 6 INTERACTIVE MAESTRO SCRIPT
   DJ Press Kit - 100% Vanilla JS & Web Audio API
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. SINTETIZADOR DE AUDIO (Web Audio API)
    // ==========================================================================
    let audioCtx = null;

    function initAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    // Sintetizar sonido mecánico de bloqueo (Click seco)
    function playLockSound() {
        initAudioContext();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.05);
        
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    }

    // Sintetizar el icónico sonido "click-clack" + Chime de desbloqueo de iOS 6
    function playUnlockSound() {
        initAudioContext();
        const now = audioCtx.currentTime;
        
        // Parte 1: Click-clack mecánico
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(120, now);
        osc1.frequency.setValueAtTime(80, now + 0.03);
        gain1.gain.setValueAtTime(0.4, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
        osc1.start(now);
        osc1.stop(now + 0.06);

        // Parte 2: Campana digital (Chime clásico)
        setTimeout(() => {
            const osc2 = audioCtx.createOscillator();
            const osc3 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            
            osc2.connect(gain2);
            osc3.connect(gain2);
            gain2.connect(audioCtx.destination);
            
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(880, audioCtx.currentTime); // Nota La5
            osc3.type = 'sine';
            osc3.frequency.setValueAtTime(1320, audioCtx.currentTime); // Nota Mi6 (Armónico)
            
            gain2.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
            
            osc2.start();
            osc3.start();
            osc2.stop(audioCtx.currentTime + 0.35);
            osc3.stop(audioCtx.currentTime + 0.35);
        }, 60);
    }

    // Sintetizar un click genérico de botones de la interfaz
    function playClickSound() {
        initAudioContext();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.03);
        
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.03);
    }

    // Sintetizar Frecuencias Duales DTMF para el teclado telefónico clásico
    function playDTMF(digit) {
        initAudioContext();
        
        // Mapeo estándar de frecuencias DTMF
        const dtmfFreqs = {
            '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
            '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
            '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
            '*': [941, 1209], '0': [941, 1336], '#': [941, 1477]
        };
        
        if (!dtmfFreqs[digit]) return;
        
        const freqs = dtmfFreqs[digit];
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc1.type = 'sine';
        osc1.frequency.value = freqs[0];
        
        osc2.type = 'sine';
        osc2.frequency.value = freqs[1];
        
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        
        osc1.start();
        osc2.start();
        osc1.stop(audioCtx.currentTime + 0.25);
        osc2.stop(audioCtx.currentTime + 0.25);
    }

    // Sintetizar tono de llamada (Ring Ring)
    function playFakeRingTone() {
        initAudioContext();
        const now = audioCtx.currentTime;
        
        // Simular dos pitidos oscilantes de teléfono analógico
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc1.type = 'sine';
        osc1.frequency.value = 400;
        osc2.type = 'sine';
        osc2.frequency.value = 450;
        
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.setValueAtTime(0, now + 1.2);
        
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.5);
        osc2.stop(now + 1.5);
    }


    // ==========================================================================
    // 2. RELOJ Y FECHA EN TIEMPO REAL (Español)
    // ==========================================================================
    function updateClock() {
        const now = new Date();
        
        // Formato 12 horas para la barra de estado y visuales
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // La hora '0' debe ser '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        // Reloj de la barra superior (formato corto 12h: ej: 10:33 PM)
        const statusBarTimeString = `${hours}:${minutes} ${ampm}`;
        
        // Reloj gigante del Lock Screen (ej: 10:33)
        const lockScreenTimeString = `${hours}:${minutes}`;
        
        // Actualizar barra de estado y pantalla de bloqueo
        document.querySelectorAll(".current-time-text").forEach(el => el.textContent = statusBarTimeString);
        const lockTimeEl = document.getElementById("lock-time");
        if (lockTimeEl) lockTimeEl.textContent = lockScreenTimeString;

        // Fecha larga en español para la pantalla de bloqueo
        const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        
        const dayName = days[now.getDay()];
        const dayNum = now.getDate();
        const monthName = months[now.getMonth()];
        const dateString = `${dayName}, ${dayNum} de ${monthName}`;
        
        const lockDateEl = document.getElementById("lock-date");
        if (lockDateEl) lockDateEl.textContent = dateString;

        // Actualizar la fecha stamp de la App de Notas
        const noteStamp = document.getElementById("note-date-stamp");
        if (noteStamp) {
            noteStamp.textContent = `${dayNum} de ${monthName} de ${now.getFullYear()}, ${statusBarTimeString}`;
        }
    }
    
    // Ejecutar cada segundo
    setInterval(updateClock, 1000);
    updateClock();


    // ==========================================================================
    // 3. SLIDE TO UNLOCK INTERACTIVO (Arrastre física clásica)
    // ==========================================================================
    const slideHandle = document.getElementById("slide-handle");
    const slideTrack = slideHandle ? slideHandle.parentElement : null;
    const slideText = document.getElementById("slide-text");
    const lockScreen = document.getElementById("lock-screen");
    const homeScreen = document.getElementById("home-screen");
    const statusBar = document.querySelector(".ios-status-bar");
    
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let maxDrag = 220; // Valor por defecto de seguridad (recorrido típico del slider)

    if (slideHandle && slideTrack) {
        // Poner la barra de estado inicial en formato lockscreen (transparente y letras blancas)
        statusBar.classList.add("lock-screen-status-bar");
        
        // Calcular recorrido máximo dinámicamente
        const updateMaxDrag = () => {
            const trackWidth = slideTrack.clientWidth || slideTrack.offsetWidth || 280;
            const handleWidth = slideHandle.clientWidth || slideHandle.offsetWidth || 56;
            maxDrag = trackWidth - handleWidth - 4; // margen de seguridad
            
            // Si por alguna razón el cálculo da <= 0, usar un fallback razonable
            if (maxDrag <= 0) {
                maxDrag = 220;
            }
        };
        
        // Calcular inicialmente
        updateMaxDrag();
        window.addEventListener("resize", updateMaxDrag);

        // Eventos mouse (Computadora)
        slideHandle.addEventListener("mousedown", dragStart);
        document.addEventListener("mousemove", dragMove);
        document.addEventListener("mouseup", dragEnd);

        // Eventos táctiles (Móviles - Vinculados directamente al Handle para evitar bloqueos pasivos)
        slideHandle.addEventListener("touchstart", dragStart, { passive: false });
        slideHandle.addEventListener("touchmove", dragMove, { passive: false });
        slideHandle.addEventListener("touchend", dragEnd);
        
        // También dar soporte por si el dedo se sale ligeramente del botón
        slideTrack.addEventListener("touchmove", dragMove, { passive: false });
        slideTrack.addEventListener("touchend", dragEnd);

        function dragStart(e) {
            initAudioContext();
            
            // Forzar actualización de límites al presionar
            updateMaxDrag();
            
            isDragging = true;
            slideHandle.style.transition = "none";
            
            // Obtener coordenadas
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            
            // Prevenir drag de imagen nativo sólo en escritorio para no bloquear touchstarts
            if (!e.touches) {
                e.preventDefault();
            }
            
            startX = clientX - currentX;
        }

        function dragMove(e) {
            if (!isDragging) return;
            
            // Prevenir scroll de fondo en móviles al arrastrar el slider
            if (e.cancelable) {
                e.preventDefault();
            }
            
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            let x = clientX - startX;
            
            // Limitar arrastre
            if (x < 0) x = 0;
            if (x > maxDrag) x = maxDrag;
            
            currentX = x;
            slideHandle.style.transform = `translateX(${x}px)`;
            
            // Reducir opacidad del texto indicador mientras avanza
            const opacity = 1 - (x / maxDrag);
            slideText.style.opacity = opacity.toString();
        }

        function dragEnd() {
            if (!isDragging) return;
            isDragging = false;
            
            // Si supera el 85% desbloquea el iPhone
            if (currentX >= maxDrag * 0.85) {
                unlockiPhone();
            } else {
                // Retroceso elástico skeuomórfico
                slideHandle.style.transition = "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                slideHandle.style.transform = "translateX(0px)";
                slideText.style.transition = "opacity 0.25s ease";
                slideText.style.opacity = "1";
            }
        }

        function unlockiPhone() {
            // Animación final de desbloqueo
            if (slideHandle) {
                slideHandle.style.transition = "transform 0.15s ease-out";
                slideHandle.style.transform = `translateX(${maxDrag || 220}px)`;
            }
            
            // Sonido
            try {
                playUnlockSound();
            } catch (e) {
                console.log("Audio not allowed yet:", e);
            }
            
            // Transición de salida de Lock Screen
            if (lockScreen) lockScreen.classList.add("unlocked");
            if (statusBar) statusBar.classList.remove("lock-screen-status-bar");
            
            setTimeout(() => {
                if (lockScreen) lockScreen.classList.add("hidden");
                if (homeScreen) homeScreen.classList.remove("hidden");
                
                // Efecto de pop de las notificaciones
                setTimeout(() => {
                    document.getElementById("noti-booking")?.classList.add("active");
                }, 300);
            }, 500);
        }
    }

    // Bindeo del botón de desbloqueo para Desktop de forma global y segura
    const desktopUnlockBtn = document.getElementById("btn-desktop-unlock");
    if (desktopUnlockBtn) {
        desktopUnlockBtn.addEventListener("click", () => {
            // Intentar inicializar audio de forma segura
            try {
                initAudioContext();
            } catch (e) {
                console.log("Audio Context initialization failed:", e);
            }
            
            // Forzar desbloqueo directamente
            const lockScreen = document.getElementById("lock-screen");
            const homeScreen = document.getElementById("home-screen");
            const statusBar = document.querySelector(".ios-status-bar");
            const slideHandle = document.getElementById("slide-handle");
            
            if (slideHandle) {
                slideHandle.style.transition = "transform 0.15s ease-out";
                slideHandle.style.transform = `translateX(220px)`;
            }
            
            try {
                playUnlockSound();
            } catch(e) {}

            if (lockScreen) lockScreen.classList.add("unlocked");
            if (statusBar) statusBar.classList.remove("lock-screen-status-bar");
            
            setTimeout(() => {
                if (lockScreen) lockScreen.classList.add("hidden");
                if (homeScreen) homeScreen.classList.remove("hidden");
                
                setTimeout(() => {
                    document.getElementById("noti-booking")?.classList.add("active");
                }, 300);
            }, 500);
        });
    }
            });
        }
    }


    // ==========================================================================
    // 4. SISTEMA DE APERTURA Y CIERRE DE APPS (ZOOM ANIMATIONS)
    // ==========================================================================
    const apps = document.querySelectorAll(".app-icon-wrapper");
    const appWindows = document.querySelectorAll(".ios-app-window");
    const homeButton = document.getElementById("hw-home-button");
    let currentOpenAppId = null;

    apps.forEach(app => {
        app.addEventListener("click", () => {
            const appId = app.getAttribute("data-app");
            if (!appId) return;

            initAudioContext();
            playClickSound();

            const appWin = document.getElementById(appId);
            if (appWin) {
                // Configurar animación de apertura zoom
                appWin.classList.remove("hidden");
                appWin.style.animation = "appZoomIn 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) both";
                currentOpenAppId = appId;
            }
        });
    });

    // Función para cerrar la app actual (Zoom Out clásico)
    function closeCurrentApp() {
        if (currentOpenAppId) {
            const appWin = document.getElementById(currentOpenAppId);
            if (appWin) {
                appWin.style.animation = "appZoomOut 0.25s cubic-bezier(0.34, 0, 0.64, 1) both";
                setTimeout(() => {
                    appWin.classList.add("hidden");
                }, 250);
            }
            currentOpenAppId = null;
        }
    }

    // Agregar evento a los botones "🏠 Home" en las cabeceras de las apps
    document.querySelectorAll(".home-back-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Evitar comportamientos extraños
            initAudioContext();
            playClickSound();
            closeCurrentApp();
        });
    });

    // Evento de Botón Físico Home (Para pantallas de Desktop)
    if (homeButton) {
        homeButton.addEventListener("click", () => {
            initAudioContext();
            playClickSound();
            
            // Si la pantalla de bloqueo está oculta y hay app abierta, volvemos al Home
            if (currentOpenAppId) {
                closeCurrentApp();
            } else if (homeScreen.classList.contains("hidden")) {
                // Si no hay app y estamos bloqueados, despierta la pantalla
            }
        });
    }


    // ==========================================================================
    // 5. APP DE MÚSICA - IPOD (HTML5 Audio Completo)
    // ==========================================================================
    
    // Playlist con tu música real en formato WAV
    const playlist = [
        {
            title: "La Niebla (Remastered)",
            artist: "Lu Valenzuela",
            album: "Antigraviti Sessions",
            src: "music/La Niebla  (Remastered).wav",
            art: "photos/A7409646.jpg",
            duration: "4:32"
        },
        {
            title: "La montaña (Remastered)",
            artist: "Lu Valenzuela",
            album: "Antigraviti Sessions",
            src: "music/La montaña (Remastered).wav",
            art: "photos/A7409646.jpg",
            duration: "4:14"
        },
        {
            title: "el bosque (Remastered)",
            artist: "Lu Valenzuela",
            album: "Antigraviti Sessions",
            src: "music/el bosque (Remastered).wav",
            art: "photos/A7409646.jpg",
            duration: "7:48"
        }
    ];

    let currentTrackIdx = 0;
    const audioPlayer = new Audio();
    audioPlayer.volume = 0.7; // Volumen por defecto

    // Referencias del DOM de iPod
    const ipodPlayPauseBtn = document.getElementById("ipod-play-pause");
    const ipodPrevBtn = document.getElementById("ipod-prev");
    const ipodNextBtn = document.getElementById("ipod-next");
    const ipodAlbumArt = document.getElementById("ipod-album-art");
    const vinylDisc = document.getElementById("vinyl-disc");
    const ipodTitle = document.getElementById("ipod-song-title");
    const ipodArtist = document.getElementById("ipod-song-artist");
    const ipodAlbum = document.getElementById("ipod-song-album");
    const ipodElapsed = document.getElementById("ipod-time-elapsed");
    const ipodRemaining = document.getElementById("ipod-time-remaining");
    const ipodProgressTrack = document.getElementById("ipod-progress-track");
    const ipodProgressFill = document.getElementById("ipod-progress-fill");
    const ipodProgressThumb = document.getElementById("ipod-progress-thumb");
    const ipodVolumeTrack = document.getElementById("ipod-volume-track");
    const ipodVolumeFill = document.getElementById("ipod-volume-fill");
    const ipodVolumeThumb = document.getElementById("ipod-volume-thumb");
    const ipodListToggle = document.getElementById("ipod-list-toggle");
    const ipodBackBtn = document.getElementById("ipod-back-btn");
    const ipodPlayerView = document.getElementById("ipod-player-view");
    const ipodListView = document.getElementById("ipod-list-view");
    const ipodHeaderTitle = document.getElementById("ipod-header-title");
    const songsList = document.getElementById("songs-list");

    let isVinylSpinning = false;
    let vinylAngle = 0;
    let vinylAnimationTimer = null;

    // Cargar pista inicial
    loadTrack(currentTrackIdx);
    renderSongsTable();

    function loadTrack(idx) {
        currentTrackIdx = idx;
        const track = playlist[idx];
        audioPlayer.src = track.src;
        ipodTitle.textContent = track.title;
        ipodArtist.textContent = track.artist;
        ipodAlbum.textContent = track.album;
        ipodAlbumArt.src = track.art;
        
        // Reset tiempos
        ipodElapsed.textContent = "0:00";
        ipodRemaining.textContent = "-" + track.duration;
        ipodProgressFill.style.width = "0%";
        ipodProgressThumb.style.left = "0%";
        
        // Marcar la activa en la lista
        document.querySelectorAll(".song-item").forEach((item, i) => {
            if (i === idx) item.classList.add("active");
            else item.classList.remove("active");
        });
    }

    function playTrack() {
        initAudioContext();
        audioPlayer.play();
        ipodPlayPauseBtn.classList.add("paused");
        startVinylRotation();
    }

    function pauseTrack() {
        audioPlayer.pause();
        ipodPlayPauseBtn.classList.remove("paused");
        stopVinylRotation();
    }

    function startVinylRotation() {
        if (isVinylSpinning) return;
        isVinylSpinning = true;
        
        function spin() {
            if (!isVinylSpinning) return;
            vinylAngle += 1;
            vinylDisc.style.transform = `rotate(${vinylAngle}deg)`;
            vinylAnimationTimer = requestAnimationFrame(spin);
        }
        spin();
    }

    function stopVinylRotation() {
        isVinylSpinning = false;
        if (vinylAnimationTimer) {
            cancelAnimationFrame(vinylAnimationTimer);
        }
    }

    // Toggle Play/Pause
    ipodPlayPauseBtn.addEventListener("click", () => {
        if (audioPlayer.paused) {
            playTrack();
        } else {
            pauseTrack();
        }
    });

    // Siguiente track
    ipodNextBtn.addEventListener("click", () => {
        let nextIdx = currentTrackIdx + 1;
        if (nextIdx >= playlist.length) nextIdx = 0;
        loadTrack(nextIdx);
        playTrack();
    });

    // Pista anterior
    ipodPrevBtn.addEventListener("click", () => {
        let prevIdx = currentTrackIdx - 1;
        if (prevIdx < 0) prevIdx = playlist.length - 1;
        loadTrack(prevIdx);
        playTrack();
    });

    // Actualización del progreso
    audioPlayer.addEventListener("timeupdate", () => {
        if (!audioPlayer.duration) return;
        
        const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        ipodProgressFill.style.width = pct + "%";
        ipodProgressThumb.style.left = pct + "%";
        
        // Formatear minutos/segundos transcurridos
        const elapsedMin = Math.floor(audioPlayer.currentTime / 60);
        const elapsedSec = Math.floor(audioPlayer.currentTime % 60);
        ipodElapsed.textContent = `${elapsedMin}:${elapsedSec < 10 ? '0' + elapsedSec : elapsedSec}`;
        
        // Formatear tiempo restante
        const remainingTime = audioPlayer.duration - audioPlayer.currentTime;
        const remainingMin = Math.floor(remainingTime / 60);
        const remainingSec = Math.floor(remainingTime % 60);
        ipodRemaining.textContent = `-${remainingMin}:${remainingSec < 10 ? '0' + remainingSec : remainingSec}`;
    });

    // Al finalizar la pista pasar a la siguiente automáticamente
    audioPlayer.addEventListener("ended", () => {
        let nextIdx = currentTrackIdx + 1;
        if (nextIdx >= playlist.length) nextIdx = 0;
        loadTrack(nextIdx);
        playTrack();
    });

    // Salto interactivo de la barra de progreso
    ipodProgressTrack.addEventListener("mousedown", (e) => {
        seekAudio(e);
    });

    function seekAudio(e) {
        if (!audioPlayer.duration) return;
        const rect = ipodProgressTrack.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, clickX / rect.width));
        audioPlayer.currentTime = pct * audioPlayer.duration;
    }

    // Lógica para arrastrar el thumb de la barra de progreso
    let isDraggingProgress = false;
    ipodProgressThumb.addEventListener("mousedown", () => isDraggingProgress = true);
    window.addEventListener("mouseup", () => isDraggingProgress = false);
    window.addEventListener("mousemove", (e) => {
        if (isDraggingProgress) {
            seekAudio(e);
        }
    });

    // Control de Volumen interactivo
    ipodVolumeTrack.addEventListener("mousedown", (e) => {
        changeVolume(e);
    });

    function changeVolume(e) {
        const rect = ipodVolumeTrack.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, clickX / rect.width));
        
        audioPlayer.volume = pct;
        ipodVolumeFill.style.width = (pct * 100) + "%";
        ipodVolumeThumb.style.left = (pct * 100) + "%";
    }

    let isDraggingVolume = false;
    ipodVolumeThumb.addEventListener("mousedown", () => isDraggingVolume = true);
    window.addEventListener("mouseup", () => isDraggingVolume = false);
    window.addEventListener("mousemove", (e) => {
        if (isDraggingVolume) {
            changeVolume(e);
        }
    });

    // Renderizar la tabla de canciones en iPod list view
    function renderSongsTable() {
        songsList.innerHTML = "";
        playlist.forEach((track, i) => {
            const li = document.createElement("li");
            li.className = "song-item";
            if (i === currentTrackIdx) li.classList.add("active");
            
            li.innerHTML = `
                <span class="song-item-num">${i + 1}</span>
                <div class="song-item-details">
                    <span class="song-item-name">${track.title}</span>
                    <span class="song-item-artist">${track.artist}</span>
                </div>
                <span class="song-item-duration">${track.duration}</span>
            `;
            
            li.addEventListener("click", () => {
                loadTrack(i);
                playTrack();
                // Regresar a la vista del reproductor automáticamente
                showPlayerView();
            });
            
            songsList.appendChild(li);
        });
    }

    // Cambio de vistas en el iPod
    ipodListToggle.addEventListener("click", () => {
        if (ipodListView.classList.contains("hidden")) {
            showListView();
        } else {
            showPlayerView();
        }
    });

    ipodBackBtn.addEventListener("click", showPlayerView);

    function showListView() {
        ipodPlayerView.classList.add("hidden");
        ipodListView.classList.remove("hidden");
        ipodBackBtn.classList.remove("hidden");
        ipodHeaderTitle.textContent = "Canciones";
        ipodListToggle.textContent = "Ahora son.";
    }

    function showPlayerView() {
        ipodListView.classList.add("hidden");
        ipodPlayerView.classList.remove("hidden");
        ipodBackBtn.classList.add("hidden");
        ipodHeaderTitle.textContent = "Ahora suena";
        ipodListToggle.textContent = "Canciones";
    }


    // ==========================================================================
    // 6. APP DE YOUTUBE (Wooden TV interactivo - Video Local)
    // ==========================================================================
    const tvDialV = document.getElementById("tv-dial-v");
    const tvDialH = document.getElementById("tv-dial-h");
    const tvPowerBtn = document.getElementById("tv-power-btn");
    const tvScreen = document.querySelector(".tv-inner-screen");
    const tvLocalVideo = document.getElementById("tv-local-video");
 
    let dialVAngle = 0;
    let dialHAngle = 0;
    let isTvPowerOn = true;
 
    if (tvDialV) {
        tvDialV.addEventListener("click", () => {
            initAudioContext();
            playClickSound();
            dialVAngle += 30;
            tvDialV.querySelector(".dial-indicator").style.transform = `rotate(${dialVAngle}deg)`;
            
            // Perilla vertical: Adelantar video 15 segundos de forma interactiva
            if (tvLocalVideo && isTvPowerOn) {
                tvLocalVideo.currentTime = Math.min(tvLocalVideo.duration || 0, tvLocalVideo.currentTime + 15);
            }
        });
    }
 
    if (tvDialH) {
        tvDialH.addEventListener("click", () => {
            initAudioContext();
            playClickSound();
            dialHAngle += 30;
            tvDialH.querySelector(".dial-indicator").style.transform = `rotate(${dialHAngle}deg)`;
            
            // Perilla horizontal: Retroceder video 15 segundos
            if (tvLocalVideo && isTvPowerOn) {
                tvLocalVideo.currentTime = Math.max(0, tvLocalVideo.currentTime - 15);
            }
        });
    }
 
    if (tvPowerBtn) {
        tvPowerBtn.addEventListener("click", () => {
            initAudioContext();
            playClickSound();
            
            const toggle = tvPowerBtn.querySelector(".switch-toggle");
            isTvPowerOn = !isTvPowerOn;
            
            if (isTvPowerOn) {
                toggle.classList.remove("on");
                tvScreen.style.filter = "none";
                tvScreen.style.opacity = "1";
                // Reanudar video local al encender
                if (tvLocalVideo) {
                    tvLocalVideo.play().catch(() => {});
                }
            } else {
                toggle.classList.add("on"); // Visualmente apagado empujándolo a la derecha
                tvScreen.style.filter = "brightness(0) contrast(0)";
                tvScreen.style.opacity = "0.05"; // Destello del fósforo
                // Pausar video local al apagar
                if (tvLocalVideo) {
                    tvLocalVideo.pause();
                }
            }
        });
    }


    // ==========================================================================
    // 7. APP DE FOTOS (Carrete, Álbumes y Lightbox interactivo)
    // ==========================================================================
    
    // Álbum 1: Fotos reales de eventos
    const eventPhotos = [
        { src: "photos/A7409555.jpg", caption: "Presentación en Vivo - Sunset Session" },
        { src: "photos/A7409646.jpg", caption: "Cabina DJ - Close Up" },
        { src: "photos/A7409733.jpg", caption: "Energy in the Crowd - Club Night" },
        { src: "photos/0E8A7135.JPG", caption: "Lu Valenzuela - Retrato de Prensa" },
        { src: "photos/0E8A7139.JPG", caption: "Sunset Festival Stage" }
    ];

    // Álbum 2: Gigs (Screenshots de Instagram)
    const gigsPhotos = [
        { src: "photos/gigs/Screenshot_20260707_134034_Instagram.jpg", caption: "Gig de Instagram @luvalenzueladj" },
        { src: "photos/gigs/Screenshot_20260707_134036_Instagram.jpg", caption: "Live Mix Promo" },
        { src: "photos/gigs/Screenshot_20260707_134046_Instagram.jpg", caption: "Club Set - Monterrey Sessions" },
        { src: "photos/gigs/Screenshot_20260707_134049_Instagram.jpg", caption: "Event Gig Poster" },
        { src: "photos/gigs/Screenshot_20260707_134054_Instagram.jpg", caption: "Live at Sunset Terrace" },
        { src: "photos/gigs/Screenshot_20260707_134059_Instagram.jpg", caption: "Special Tech House Release" },
        { src: "photos/gigs/Screenshot_20260707_134102_Instagram.jpg", caption: "Live Sound Check" },
        { src: "photos/gigs/Screenshot_20260707_134105_Instagram.jpg", caption: "Nightclub Mainroom" },
        { src: "photos/gigs/Screenshot_20260707_134109_Instagram.jpg", caption: "Gig Promo Feed" },
        { src: "photos/gigs/Screenshot_20260707_134112_Instagram.jpg", caption: "Monochrome Vibes" },
        { src: "photos/gigs/Screenshot_20260707_134117_Instagram.jpg", caption: "Warehouse Rave Crowd" },
        { src: "photos/gigs/Screenshot_20260707_134140_Instagram.jpg", caption: "Club Deck Session" },
        { src: "photos/gigs/Screenshot_20260707_134143_Instagram.jpg", caption: "Groove & Bass Tech" },
        { src: "photos/gigs/Screenshot_20260707_134150_Instagram.jpg", caption: "Visuals and Sound Stage" },
        { src: "photos/gigs/Screenshot_20260707_134153_Instagram.jpg", caption: "Outdoor Mainstage festival" },
        { src: "photos/gigs/Screenshot_20260707_134156_Instagram.jpg", caption: "Mixing Deck Controls" },
        { src: "photos/gigs/Screenshot_20260707_134200_Instagram.jpg", caption: "Rhythm & Lights Show" },
        { src: "photos/gigs/Screenshot_20260707_134213_Instagram.jpg", caption: "Weekend Gig Poster" },
        { src: "photos/gigs/Screenshot_20260707_134217_Instagram.jpg", caption: "Terrace Sunset Beats" },
        { src: "photos/gigs/Screenshot_20260707_134224_Instagram.jpg", caption: "Tech House Mix Recording" },
        { src: "photos/gigs/Screenshot_20260707_134227_Instagram.jpg", caption: "Festival Sound System" },
        { src: "photos/gigs/Screenshot_20260707_134234_Instagram.jpg", caption: "Lu Valenzuela Dj Set" }
    ];

    const photosAlbumsView = document.getElementById("photos-albums-view");
    const photosGridView = document.getElementById("photos-grid-view");
    const photosGrid = document.getElementById("photos-grid");
    const photosGridAlbumTitle = document.getElementById("photos-grid-album-title");
    
    // Referencias de Cabecera en Fotos
    const photosHomeBtn = document.getElementById("photos-home-btn");
    const photosAlbumBackBtn = document.getElementById("photos-album-back-btn");
    const photosHeaderTitle = document.getElementById("photos-header-title");
    const photosHeaderSpacer = document.getElementById("photos-header-spacer");

    // Referencias del Lightbox
    const photoLightbox = document.getElementById("photo-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCounter = document.getElementById("lightbox-counter");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    let currentPhotoIdx = 0;
    let activePhotoset = []; // Apuntará dinámicamente a eventPhotos o a gigsPhotos

    // Manejar clics en las carpetas de álbumes
    document.querySelectorAll(".album-folder-card").forEach(card => {
        card.addEventListener("click", () => {
            initAudioContext();
            playClickSound();

            const albumId = card.getAttribute("data-album-id");
            if (albumId === "album-events") {
                activePhotoset = eventPhotos;
                photosGridAlbumTitle.textContent = "Fotos";
                photosHeaderTitle.textContent = "Fotos";
            } else if (albumId === "album-gigs") {
                activePhotoset = gigsPhotos;
                photosGridAlbumTitle.textContent = "Gigs";
                photosHeaderTitle.textContent = "Gigs";
            }

            renderPhotosGrid(activePhotoset);

            // Transición de Vista: Ocultar álbumes, mostrar rejilla
            photosAlbumsView.classList.add("hidden");
            photosGridView.classList.remove("hidden");

            // Ajustar botones del Header
            photosHomeBtn.classList.add("hidden");
            photosAlbumBackBtn.classList.remove("hidden");
            photosHeaderSpacer.style.width = "0px";
        });
    });

    // Botón para retroceder de la Rejilla a la vista de Álbumes
    if (photosAlbumBackBtn) {
        photosAlbumBackBtn.addEventListener("click", () => {
            initAudioContext();
            playClickSound();

            // Transición de Vista: Ocultar rejilla, mostrar álbumes
            photosGridView.classList.add("hidden");
            photosAlbumsView.classList.remove("hidden");

            // Restaurar botones del Header
            photosAlbumBackBtn.classList.add("hidden");
            photosHomeBtn.classList.remove("hidden");
            photosHeaderTitle.textContent = "Álbumes";
            photosHeaderSpacer.style.width = "52px";
        });
    }

    // Renderizar la rejilla de miniaturas
    function renderPhotosGrid(photoset) {
        photosGrid.innerHTML = "";
        photoset.forEach((photo, i) => {
            const wrapper = document.createElement("div");
            wrapper.className = "photo-thumb-wrapper";
            wrapper.innerHTML = `<img src="${photo.src}" alt="${photo.caption}">`;
            
            wrapper.addEventListener("click", () => {
                initAudioContext();
                playClickSound();
                openLightbox(i);
            });
            photosGrid.appendChild(wrapper);
        });
    }

    function openLightbox(idx) {
        currentPhotoIdx = idx;
        photoLightbox.classList.remove("hidden");
        updateLightbox();
    }

    function updateLightbox() {
        if (!activePhotoset.length) return;
        const photo = activePhotoset[currentPhotoIdx];
        lightboxImg.src = photo.src;
        lightboxCaption.textContent = photo.caption;
        lightboxCounter.textContent = `${currentPhotoIdx + 1} de ${activePhotoset.length}`;
    }

    if (lightboxClose) {
        lightboxClose.addEventListener("click", () => {
            initAudioContext();
            playClickSound();
            photoLightbox.classList.add("hidden");
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener("click", () => {
            initAudioContext();
            playClickSound();
            currentPhotoIdx--;
            if (currentPhotoIdx < 0) currentPhotoIdx = activePhotoset.length - 1;
            updateLightbox();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener("click", () => {
            initAudioContext();
            playClickSound();
            currentPhotoIdx++;
            if (currentPhotoIdx >= activePhotoset.length) currentPhotoIdx = 0;
            updateLightbox();
        });
    }


    // ==========================================================================
    // 8. APP DE TELÉFONO (Teclado DTMF clásico e interfaz interactiva)
    // ==========================================================================
    const phoneTabButtons = document.querySelectorAll(".phone-tab-btn");
    const phoneTabContents = document.querySelectorAll(".phone-tab-content");
    const dialedNumberEl = document.getElementById("dialed-number");
    const dialedClearBtn = document.getElementById("dialer-backspace");
    const keypadKeys = document.querySelectorAll(".keypad-key");
    const dialerCallBtn = document.getElementById("dialer-call-btn");

    // Lógica para cambiar de pestañas en Teléfono (Teclado vs Booking Contactos)
    phoneTabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            initAudioContext();
            playClickSound();
            
            const targetTab = btn.getAttribute("data-tab");
            
            phoneTabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            phoneTabContents.forEach(content => {
                if (content.id === targetTab) {
                    content.classList.remove("hidden");
                } else {
                    content.classList.add("hidden");
                }
            });
        });
    });

    // Teclado numérico
    keypadKeys.forEach(key => {
        key.addEventListener("click", () => {
            const digit = key.getAttribute("data-digit");
            if (!digit) return;

            // Reproducir frecuencia DTMF exacta
            playDTMF(digit);

            dialedNumberEl.textContent += digit;
            dialedClearBtn.classList.add("visible");
            
            // Efecto físico al pulsar
            key.classList.add("active");
            setTimeout(() => key.classList.remove("active"), 100);
        });
    });

    // Botón borrar dígito
    if (dialedClearBtn) {
        dialedClearBtn.addEventListener("click", () => {
            initAudioContext();
            playClickSound();
            
            let val = dialedNumberEl.textContent;
            if (val.length > 0) {
                val = val.substring(0, val.length - 1);
                dialedNumberEl.textContent = val;
            }
            if (val.length === 0) {
                dialedClearBtn.classList.remove("visible");
            }
        });
    }

    // Simular llamada de teléfono interactiva
    if (dialerCallBtn) {
        dialerCallBtn.addEventListener("click", () => {
            const number = dialedNumberEl.textContent.trim();
            if (!number) return; // Si no hay número no hace nada

            initAudioContext();
            playFakeRingTone();
            
            // Simular pantalla de llamada conectando
            dialerCallBtn.textContent = "Conectando...";
            dialerCallBtn.style.background = "linear-gradient(to bottom, #f57f17 0%, #e65100 100%)";
            dialerCallBtn.style.borderColor = "#b71c1c";
            
            let callTimer = 0;
            const originalCallBtn = dialerCallBtn.textContent;
            
            setTimeout(() => {
                dialerCallBtn.textContent = "Llamando...";
                
                setTimeout(() => {
                    dialerCallBtn.textContent = "Línea Ocupada";
                    playLockSound(); // clic sordo
                    
                    setTimeout(() => {
                        // Resetear dialer
                        dialerCallBtn.textContent = "Llamar";
                        dialerCallBtn.style.background = "";
                        dialerCallBtn.style.borderColor = "";
                        dialedNumberEl.textContent = "";
                        dialedClearBtn.classList.remove("visible");
                    }, 1500);
                }, 3000);
            }, 1500);
        });
    }
    
            });
        });
    }

    // ==========================================================================
    // 9. LÓGICA DE LAS NUEVAS APPS (Notas PDF, Clima, Calendario, iMessage)
    // ==========================================================================

    /* A. NOTAS: Alternar entre Libreta de Biografía y Visor PDF */
    const btnNoteBio = document.getElementById("btn-note-bio");
    const btnNotePdf = document.getElementById("btn-note-pdf");
    const noteBioContent = document.getElementById("note-bio-content");
    const notePdfContent = document.getElementById("note-pdf-content");

    if (btnNoteBio && btnNotePdf) {
        btnNoteBio.addEventListener("click", () => {
            initAudioContext();
            playClickSound();
            
            // Botones
            btnNoteBio.classList.add("active");
            btnNoteBio.style.background = "linear-gradient(to bottom, #fce0a2 0%, #e2ab39 100%)";
            btnNoteBio.style.color = "#4a3e20";
            btnNoteBio.style.borderColor = "#a07010";

            btnNotePdf.classList.remove("active");
            btnNotePdf.style.background = "linear-gradient(to bottom, #f5f5f5 0%, #d8d8d8 100%)";
            btnNotePdf.style.color = "#666";
            btnNotePdf.style.borderColor = "#aaa";

            // Contenidos
            noteBioContent.classList.remove("hidden");
            notePdfContent.classList.add("hidden");
        });

        btnNotePdf.addEventListener("click", () => {
            initAudioContext();
            playClickSound();

            // Botones
            btnNotePdf.classList.add("active");
            btnNotePdf.style.background = "linear-gradient(to bottom, #fce0a2 0%, #e2ab39 100%)";
            btnNotePdf.style.color = "#4a3e20";
            btnNotePdf.style.borderColor = "#a07010";

            btnNoteBio.classList.remove("active");
            btnNoteBio.style.background = "linear-gradient(to bottom, #f5f5f5 0%, #d8d8d8 100%)";
            btnNoteBio.style.color = "#666";
            btnNoteBio.style.borderColor = "#aaa";

            // Contenidos
            noteBioContent.classList.add("hidden");
            notePdfContent.classList.remove("hidden");
        });
    }

    /* B. CALENDARIO: Generación de Gigs y Rejilla Interactiva */
    const calendarDaysGrid = document.getElementById("calendar-days-grid");
    const calendarEventsList = document.getElementById("calendar-events-list");

    // Lista de Gigs (Julio 2026)
    const gigsList = [
        { day: 10, title: "Club Room Session - Warm Up", loc: "Monterrey, Nuevo León", time: "10:00 PM" },
        { day: 17, title: "Showcase Sunset Terrace - Headliner Set", loc: "Monterrey, Nuevo León", time: "11:30 PM" },
        { day: 24, title: "Tech House Warehouse Rave", loc: "Guadalajara, Jalisco", time: "01:00 AM" },
        { day: 31, title: "Private Pool Party Session", loc: "Santiago, Nuevo León", time: "06:00 PM" }
    ];

    function initCalendar() {
        if (!calendarDaysGrid) return;
        
        calendarDaysGrid.innerHTML = "";
        
        // Julio 2026 inicia en Miércoles (Día 3 de la semana, indexado 0-6: D=0, L=1, M=2, Mi=3)
        const startDayOffset = 3;
        const totalDays = 31;

        // Celdas vacías iniciales
        for (let i = 0; i < startDayOffset; i++) {
            const emptyCell = document.createElement("span");
            emptyCell.className = "calendar-day-cell inactive";
            emptyCell.innerHTML = "";
            calendarDaysGrid.appendChild(emptyCell);
        }

        // Celdas de los días
        for (let day = 1; day <= totalDays; day++) {
            const cell = document.createElement("span");
            cell.className = "calendar-day-cell";
            cell.textContent = day;

            // Marcar si hoy es 17 (coincidiendo con el día del icono)
            if (day === 17) {
                cell.classList.add("today");
            }

            // Validar si este día tiene evento/gig
            const hasEvent = gigsList.some(g => g.day === day);
            if (hasEvent) {
                cell.classList.add("has-event");
            }

            cell.addEventListener("click", () => {
                initAudioContext();
                playClickSound();
                
                // Quitar selección de otras
                document.querySelectorAll(".calendar-day-cell").forEach(c => c.style.outline = "none");
                cell.style.outline = "2px solid #ba2020";

                renderEventsForDay(day);
            });

            calendarDaysGrid.appendChild(cell);
        }

        // Renderizar lista de eventos completa al inicio
        renderEventsForDay(null);
    }

    function renderEventsForDay(day) {
        if (!calendarEventsList) return;
        calendarEventsList.innerHTML = "";

        // Filtrar gigs
        const filtered = day ? gigsList.filter(g => g.day === day) : gigsList;

        if (filtered.length === 0) {
            calendarEventsList.innerHTML = `<p style="font-size: 13px; color: #888; text-align: center; padding: 10px;">No hay eventos agendados para este día.</p>`;
            return;
        }

        filtered.forEach(gig => {
            const card = document.createElement("div");
            card.className = "calendar-event-card";
            card.innerHTML = `
                <span class="calendar-event-time">📅 Julio ${gig.day}, 2026 - ${gig.time}</span>
                <div class="calendar-event-title">${gig.title}</div>
                <span class="calendar-event-loc">📍 ${gig.loc}</span>
            `;
            calendarEventsList.appendChild(card);
        });
    }

    initCalendar();

    /* C. IMESSAGE: Conversación Humorística y Chat */
    const imessageHistory = document.getElementById("imessage-history");
    const imessageInput = document.getElementById("imessage-input");
    const imessageSendBtn = document.getElementById("imessage-send-btn");

    const chatScript = [
        { type: "timestamp", text: "Martes 10:24 PM" },
        { type: "received", text: "Oye bro, ¿puedes abrir con algo más tranquilo? Estás tocando demasiado duro y la gente ya está muy activa para mi set..." },
        { type: "sent", text: "Jaja bro, la pista manda. El groove de Tech House no se frena 🎛️⚡" },
        { type: "received", text: "Pero es que tocaste mi remix inédito!!" },
        { type: "sent", text: "Una disculpa, bro, sonaba demasiado bien como para guardarla 😉" },
        { type: "received", text: "jajaja bueno, me debes una cerveza en el backstage." }
    ];

    function loadMessageHistory() {
        if (!imessageHistory) return;
        imessageHistory.innerHTML = "";

        chatScript.forEach(msg => {
            appendMessageToHistory(msg.type, msg.text);
        });
        scrollToBottomChat();
    }

    function appendMessageToHistory(type, text) {
        if (!imessageHistory) return;

        if (type === "timestamp") {
            const el = document.createElement("div");
            el.className = "imessage-timestamp";
            el.textContent = text;
            imessageHistory.appendChild(el);
        } else {
            const bubble = document.createElement("div");
            bubble.className = `imessage-bubble ${type}`;
            bubble.textContent = text;
            imessageHistory.appendChild(bubble);
        }
    }

    function scrollToBottomChat() {
        if (imessageHistory) {
            imessageHistory.scrollTop = imessageHistory.scrollHeight;
        }
    }

    if (imessageSendBtn && imessageInput) {
        // Enviar al pulsar botón
        imessageSendBtn.addEventListener("click", () => {
            sendMessage();
        });

        // Enviar al presionar enter
        imessageInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                sendMessage();
            }
        });
    }

    function sendMessage() {
        const text = imessageInput.value.trim();
        if (!text) return;

        initAudioContext();
        // Sonido de envío de iMessage (reutilizamos click sound por skeuomorfismo)
        playClickSound();

        appendMessageToHistory("sent", text);
        imessageInput.value = "";
        scrollToBottomChat();

        // Auto-respuesta humorística aleatoria del DJ Random después de 1.5s
        setTimeout(() => {
            const randomAnswers = [
                "Ya ando en la cabina, apúrate para el cambio de DJ! 🎧",
                "Oye ese bajo se escucha brutal hasta el baño, qué canción es?",
                "¿Me dejas tocar la última canción contigo? Hacemos B2B 🙌",
                "La rompiste bro! Excelente set.",
                "Pasa el playlist porfa!"
            ];
            const responseText = randomAnswers[Math.floor(Math.random() * randomAnswers.length)];
            
            // Tono de llegada (reutilizamos el sonido de ringtone en tono súper corto o click)
            playClickSound();
            appendMessageToHistory("received", responseText);
            scrollToBottomChat();
        }, 1500);
    }

    loadMessageHistory();

    /* D. ACTUALIZACIÓN DINÁMICA DE FECHA EN ICONO DE CALENDARIO */
    function updateCalendarIconDate() {
        const iconMonth = document.getElementById("icon-cal-month");
        const iconDay = document.getElementById("icon-cal-day");
        
        if (iconMonth && iconDay) {
            const today = new Date();
            const monthsShort = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
            
            iconMonth.textContent = monthsShort[today.getMonth()];
            iconDay.textContent = today.getDate();
        }
    }
    
    updateCalendarIconDate();
});

