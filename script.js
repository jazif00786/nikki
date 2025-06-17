// Start playing music as soon as possible
window.addEventListener('load', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const hiddenPlayButton = document.getElementById('hiddenPlayButton');
    
    if (backgroundMusic) {
        backgroundMusic.volume = 0.5;
        
        // Try to play immediately
        const playAttempt = () => {
            // Try multiple approaches
            backgroundMusic.play();
            
            // Simulate a click on the hidden button
            if (hiddenPlayButton) {
                hiddenPlayButton.click();
            }
            
            // Try again after a very short delay
            setTimeout(() => {
                backgroundMusic.play();
                if (hiddenPlayButton) {
                    hiddenPlayButton.click();
                }
            }, 50);
        };

        // Try to play multiple times
        playAttempt();
        setTimeout(playAttempt, 100);
        setTimeout(playAttempt, 500);
        setTimeout(playAttempt, 1000);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Common elements
    const backgroundMusic = document.getElementById('backgroundMusic');
    const preloader = document.getElementById('preloader');
    const container = document.querySelector('.container');

    // Ensure background music is playing
    if (backgroundMusic) {
        // Set volume
        backgroundMusic.volume = 0.5;
        
        // Function to force play music
        const forcePlayMusic = () => {
            // Try multiple approaches to play
            backgroundMusic.play();
            
            // Try again after a short delay
            setTimeout(() => {
                backgroundMusic.play();
            }, 100);

            // Try again after another delay
            setTimeout(() => {
                backgroundMusic.play();
            }, 500);

            // Try again after preloader
            if (preloader) {
                setTimeout(() => {
                    backgroundMusic.play();
                }, 4000);
            }
        };

        // Force play immediately
        forcePlayMusic();

        // Try to play on any possible event
        ['click', 'touchstart', 'mousemove', 'keydown', 'scroll'].forEach(event => {
            document.addEventListener(event, () => {
                if (backgroundMusic.paused) {
                    forcePlayMusic();
                }
            }, { once: true });
        });

        // Try to play when the page becomes visible
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && backgroundMusic.paused) {
                forcePlayMusic();
            }
        });
    }

    // Handle preloader if it exists (index page)
    if (preloader && container) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                preloader.style.display = 'none';
                container.style.display = 'block';
            }, 500);
        }, 4000);
    }

    // Handle download button (breach page)
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const glitchSound = document.getElementById('glitchSound');
            if (glitchSound) {
                glitchSound.currentTime = 0;
                glitchSound.play().catch(function(error) {
                    console.log("Sound playback failed:", error);
                });
            }
            document.body.classList.add('glitch-effect');
            setTimeout(() => {
                window.location.href = 'final.html';
            }, 1000);
        });
    }

    // Index page specific elements
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const welcomeBox = document.querySelector('.welcome-box');
    const noSound = document.getElementById('noSound');
    const yesSound = document.getElementById('yesSound');
    const easterEggSound = document.getElementById('easterEggSound');

    if (noBtn && yesBtn) {
        // Easter egg messages
        const easterEggMessages = [
           
            "DONT TRY HARD NIKKI",
            "This button is shy! 🙈",
            "Keep trying! 😅",
            
            "YOU ARE LESB NIKKI",
            "Just accept it NIKKI! 🌈",
            "The NO button knows the truth! 😏",
            "Stop denying it NIKKI! 💖",
            "Your persistence is cute! 😘",
            "The YES button is waiting for you! 💕",
            "You can't escape the truth! 🏳️‍🌈"
        ];

        // Function to get random position within the welcome box
        function getRandomPosition() {
            const boxRect = welcomeBox.getBoundingClientRect();
            const btnRect = noBtn.getBoundingClientRect();
            
            const maxX = boxRect.width - btnRect.width;
            const maxY = boxRect.height - btnRect.height;
            
            return {
                x: Math.random() * maxX,
                y: Math.random() * maxY
            };
        }

        // Function to show easter egg message
        function showEasterEggMessage() {
            const message = easterEggMessages[Math.floor(Math.random() * easterEggMessages.length)];
            const messageElement = document.createElement('div');
            messageElement.className = 'easter-egg-message';
            messageElement.textContent = message;
            messageElement.style.position = 'absolute';
            messageElement.style.left = Math.random() * (window.innerWidth - 200) + 'px';
            messageElement.style.top = Math.random() * (window.innerHeight - 100) + 'px';
            document.body.appendChild(messageElement);
            
            setTimeout(() => {
                messageElement.remove();
            }, 2000);
        }

        // Move NO button when hovered or mouse moves over it
        function moveNoBtn() {
            const newPos = getRandomPosition();
            noBtn.style.position = 'absolute';
            noBtn.style.left = newPos.x + 'px';
            noBtn.style.top = newPos.y + 'px';
            
            if (noSound) {
                noSound.currentTime = 0;
                noSound.play().catch(function(error) {
                    console.log("Sound playback failed:", error);
                });
            }
            showEasterEggMessage();
        }

        noBtn.addEventListener('mouseover', moveNoBtn);
        noBtn.addEventListener('mousemove', moveNoBtn);
        noBtn.addEventListener('mousedown', moveNoBtn);

        // Prevent NO button from being clicked
        noBtn.addEventListener('click', function(e) {
            e.preventDefault();
            moveNoBtn();
        });

        // Handle YES button click
        yesBtn.addEventListener('click', function() {
            if (yesSound) {
                yesSound.currentTime = 0;
                yesSound.play().catch(function(error) {
                    console.log("Sound playback failed:", error);
                });
            }
            document.body.classList.add('glitch-effect');
            setTimeout(() => {
                window.location.href = 'breach.html';
            }, 1000);
        });

        // Easter egg: Click on the title
        const title = document.querySelector('h1');
        if (title) {
            let clickCount = 0;
            title.addEventListener('click', function() {
                clickCount++;
                if (clickCount === 5) {
                    if (easterEggSound) {
                        easterEggSound.currentTime = 0;
                        easterEggSound.play().catch(function(error) {
                            console.log("Sound playback failed:", error);
                        });
                    }
                    title.style.animation = 'rainbow 2s infinite';
                    clickCount = 0;
                }
            });
        }

        // Easter egg: Secret key combination
        let konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;
        document.addEventListener('keydown', function(e) {
            if (e.key === konami[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konami.length) {
                    if (easterEggSound) {
                        easterEggSound.currentTime = 0;
                        easterEggSound.play().catch(function(error) {
                            console.log("Sound playback failed:", error);
                        });
                    }
                    document.body.style.background = 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ff0000)';
                    document.body.style.backgroundSize = '400% 400%';
                    document.body.style.animation = 'gradient 15s ease infinite';
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }
});

// Popup functionality
function showPopups() {
    const popups = document.querySelectorAll('.popup');
    let delay = 0;

    popups.forEach((popup, index) => {
        // Random position within viewport
        const x = Math.random() * (window.innerWidth - 200);
        const y = Math.random() * (window.innerHeight - 100);
        
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;

        // Show popup with delay
        setTimeout(() => {
            popup.classList.add('show');
            
            // Hide popup after 2 seconds
            setTimeout(() => {
                popup.classList.remove('show');
            }, 2000);
        }, delay);

        delay += 200; // Reduced delay between each popup
    });
}

// Show popups when page loads
document.addEventListener('DOMContentLoaded', () => {
    showPopups();
    
    // Show popups continuously with minimal delay
    setInterval(showPopups, 2500);
}); 