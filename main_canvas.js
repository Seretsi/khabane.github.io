(function() {
            'use strict';
            
            const canvas = document.getElementById('snowfall');
            const ctx = canvas.getContext('2d');
            let particles = [];
            let animationId;
            
            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            
            function createParticle() {
                return {
                    x: Math.random() * canvas.width,
                    y: -10,
                    radius: Math.random() * 3 + 1,
                    speed: Math.random() * 1.5 + 0.5,
                    drift: Math.random() * 0.5 - 0.25,
                    opacity: Math.random() * 0.6 + 0.2
                };
            }
            
            function init() {
                resize();
                particles = [];
                const count = Math.floor(canvas.width / 15);
                for (let i = 0; i < count; i++) {
                    const p = createParticle();
                    p.y = Math.random() * canvas.height;
                    particles.push(p);
                }
            }
            
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                if (Math.random() < 0.3) {
                    particles.push(createParticle());
                }
                
                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    p.y += p.speed;
                    p.x += p.drift + Math.sin(p.y * 0.01) * 0.3;
                    
                    if (p.y > canvas.height + 10) {
                        particles.splice(i, 1);
                        continue;
                    }
                    
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                    ctx.fill();
                }
                
                animationId = requestAnimationFrame(animate);
            }
            
            window.addEventListener('resize', function() {
                resize();
                if (particles.length > canvas.width / 10) {
                    particles.length = Math.floor(canvas.width / 10);
                }
            });
            
            init();
            animate();
        })();