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
        
        // Horas y minutos (HH:MM)
        let hours = now.getHours();
        let minutes = now.getMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const timeString = `${hours}:${minutes}`;
        
        // Actualizar barra de estado y pantalla de bloqueo
        document.querySelectorAll(".current-time-text").forEach(el => el.textContent = timeString);
        const lockTimeEl = document.getElementById("lock-time");
        if (lockTimeEl) lockTimeEl.textContent = timeString;

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
            noteStamp.textContent = `${dayNum} de ${monthName} de ${now.getFullYear()}, ${timeString}`;
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
    let maxDrag = 0;

    if (slideHandle && slideTrack) {
        // Poner la barra de estado inicial en formato lockscreen (transparente y letras blancas)
        statusBar.classList.add("lock-screen-status-bar");
        
        // Calcular recorrido máximo
        const updateMaxDrag = () => {
            maxDrag = slideTrack.clientWidth - slideHandle.clientWidth - 4; // margen
        };
        
        window.addEventListener("resize", updateMaxDrag);
        updateMaxDrag();

        // Eventos mouse
        slideHandle.addEventListener("mousedown", dragStart);
        window.addEventListener("mousemove", dragMove);
        window.addEventListener("mouseup", dragEnd);

        // Eventos táctiles (móvil)
        slideHandle.addEventListener("touchstart", dragStart, { passive: true });
        window.addEventListener("touchmove", dragMove, { passive: false });
        window.addEventListener("touchend", dragEnd);

        function dragStart(e) {
            initAudioContext();
            isDragging = true;
            slideHandle.style.transition = "none";
            startX = (e.touches ? e.touches[0].clientX : e.clientX) - currentX;
        }

        function dragMove(e) {
            if (!isDragging) return;
            if (e.cancelable) e.preventDefault(); // Evitar scroll
            
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            let x = clientX - startX;
            
            // Forzar límites
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
                currentX = 0;
            }
        }

        function unlockiPhone() {
            // Animación final de desbloqueo
            slideHandle.style.transition = "transform 0.15s ease-out";
            slideHandle.style.transform = `translateX(${maxDrag}px)`;
            
            // Sonido
            playUnlockSound();
            
            // Transición de salida de Lock Screen
            lockScreen.classList.add("unlocked");
            statusBar.classList.remove("lock-screen-status-bar");
            
            setTimeout(() => {
                lockScreen.classList.add("hidden");
                homeScreen.classList.remove("hidden");
                
                // Efecto de pop de las notificaciones
                setTimeout(() => {
                    document.getElementById("noti-booking")?.classList.add("active");
                }, 300);
            }, 500);
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

    // Evento de Botón Físico Home
    if (homeButton) {
        homeButton.addEventListener("click", () => {
            initAudioContext();
            playClickSound();
            
            // Si la pantalla de bloqueo está oculta y hay app abierta, volvemos al Home
            if (currentOpenAppId) {
                const appWin = document.getElementById(currentOpenAppId);
                if (appWin) {
                    // Animación de Zoom out al cerrar
                    appWin.style.animation = "appZoomOut 0.25s cubic-bezier(0.34, 0, 0.64, 1) both";
                    setTimeout(() => {
                        appWin.classList.add("hidden");
                    }, 250);
                }
                currentOpenAppId = null;
                
                // Si la música está sonando en el iPod, no la detenemos para simular multitarea clásica de iOS!
            } else if (homeScreen.classList.contains("hidden")) {
                // Si no hay app y estamos bloqueados, no hace nada, o despierta la pantalla
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
    // 6. APP DE YOUTUBE (Wooden TV interactivo)
    // ==========================================================================
    const tvDialV = document.getElementById("tv-dial-v");
    const tvDialH = document.getElementById("tv-dial-h");
    const tvPowerBtn = document.getElementById("tv-power-btn");
    const tvScreen = document.querySelector(".tv-inner-screen");
    const ytPlayer = document.getElementById("youtube-player");

    let dialVAngle = 0;
    let dialHAngle = 0;
    let isTvPowerOn = true;

    if (tvDialV) {
        tvDialV.addEventListener("click", () => {
            initAudioContext();
            playClickSound();
            dialVAngle += 30;
            tvDialV.querySelector(".dial-indicator").style.transform = `rotate(${dialVAngle}deg)`;
        });
    }

    if (tvDialH) {
        tvDialH.addEventListener("click", () => {
            initAudioContext();
            playClickSound();
            dialHAngle += 30;
            tvDialH.querySelector(".dial-indicator").style.transform = `rotate(${dialHAngle}deg)`;
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
                // Recargar iframe para reanudar el reproductor
                ytPlayer.src = "https://www.youtube.com/embed/S_B71s-2rpo?enablejsapi=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&controls=1";
            } else {
                toggle.classList.add("on"); // Visualmente apagado empujándolo a la derecha
                tvScreen.style.filter = "brightness(0) contrast(0)";
                tvScreen.style.opacity = "0.05"; // Un destello pequeñísimo del fósforo de la pantalla
                // Eliminar el src para detener el video al apagar
                ytPlayer.src = "";
            }
        });
    }


    // ==========================================================================
    // 7. APP DE FOTOS (Carrete y Lightbox interactivo)
    // ==========================================================================
    
    // Lista de tus fotos reales de eventos
    const eventPhotos = [
        {
            src: "photos/A7409555.jpg",
            caption: "Presentación en Vivo - Sunset Session"
        },
        {
            src: "photos/A7409646.jpg",
            caption: "Cabina DJ - Close Up"
        },
        {
            src: "photos/A7409733.jpg",
            caption: "Energy in the Crowd - Club Night"
        },
        {
            src: "photos/0E8A7135.JPG",
            caption: "Lu Valenzuela - Retrato de Prensa"
        },
        {
            src: "photos/0E8A7139.JPG",
            caption: "Sunset Festival Stage"
        }
    ];

    const photosGrid = document.getElementById("photos-grid");
    const photoLightbox = document.getElementById("photo-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCounter = document.getElementById("lightbox-counter");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    let currentPhotoIdx = 0;

    // Renderizar fotos en el Grid
    if (photosGrid) {
        eventPhotos.forEach((photo, i) => {
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
        const photo = eventPhotos[currentPhotoIdx];
        lightboxImg.src = photo.src;
        lightboxCaption.textContent = photo.caption;
        lightboxCounter.textContent = `${currentPhotoIdx + 1} de ${eventPhotos.length}`;
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
            if (currentPhotoIdx < 0) currentPhotoIdx = eventPhotos.length - 1;
            updateLightbox();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener("click", () => {
            initAudioContext();
            playClickSound();
            currentPhotoIdx++;
            if (currentPhotoIdx >= eventPhotos.length) currentPhotoIdx = 0;
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
    
    // Configuración del botón de contacto llamar
    const callBookingBtn = document.getElementById("btn-call-booking");
    if (callBookingBtn) {
        callBookingBtn.addEventListener("click", (e) => {
            // Evitar que intente disparar el protocolo nativo en pc para probar
            initAudioContext();
            playFakeRingTone();
        });
    }
});
