document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.main-logo');
  const title = document.querySelector('.hero-title');
  const video = document.querySelector('.smoke-video');

  // Загрузка JSON с ссылками
  fetch('links.json')
    .then(response => response.json())
    .then(data => {
      const linkButtons = document.getElementById('link-buttons');
      data.forEach(link => {
        const button = document.createElement('a');
        button.className = `bubbly-button ${link.class}`;
        button.textContent = link.text;
        if (link.href) {
          button.href = link.href;
          button.target = '_blank';
          button.rel = 'noopener noreferrer';
        } else {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            button.classList.add('clicked-unavailable');
            setTimeout(() => button.classList.remove('clicked-unavailable'), 500);
          });
        }
        linkButtons.appendChild(button);
      });

      // Анимация пузырей для кнопок
      document.querySelectorAll('.bubbly-button:not(.unavailable)').forEach(button => {
        button.addEventListener('click', () => {
          button.classList.add('animate');
          setTimeout(() => button.classList.remove('animate'), 700);
        });
      });
    })
    .catch(error => console.error('Ошибка загрузки links.json:', error));

  // Видео дыма
  video.addEventListener('loadeddata', () => {
    video.classList.add('loaded');
  });

  // Эффект клика на логотип
  logo.addEventListener('click', () => {
    logo.classList.add('clicked');
    setTimeout(() => logo.classList.remove('clicked'), 300);
  });

  // Эффект клика на заголовок
  title.addEventListener('click', () => {
    title.classList.add('clicked');
    setTimeout(() => title.classList.remove('clicked'), 300);
  });

  // Падающие звёзды
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particlesArray = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 2 + 2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
      if (particlesArray[i].size <= 0.2) {
        particlesArray.splice(i, 1);
        i--;
        particlesArray.push(new Particle());
      }
    }
    requestAnimationFrame(animateParticles);
  }

  init();
  animateParticles();
});
