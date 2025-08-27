document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('smokeCanvas');
  const ctx = canvas.getContext('2d');
  
  // Загрузка текстуры дыма
  const smokeImg = new Image();
  smokeImg.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/15388/smoke.png';
  
  // Настройки эмиттера
  const config = {
    x: window.innerWidth / 2,
    y: window.innerHeight + 50,
    size: 70,
    particles: 150,
    speed: {
      x: -2,
      y: -2.5,
      fade: 150,
      acceleration: 200
    }
  };
  
  // Массив частиц
  const particles = [];
  
  // Класс частицы
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = config.x + Math.random() * 100 - 50;
      this.y = config.y + Math.random() * 20 - 10;
      this.size = config.size;
      this.speedX = Math.random() * config.speed.x;
      this.speedY = Math.random() * config.speed.y;
      this.opacity = Math.random();
      this.initialSize = this.size;
    }
    
    update() {
      if(this.opacity > 0) {
        this.opacity -= (Math.random() / config.speed.fade);
      }
      
      if(this.opacity <= 0) {
        this.reset();
      }
      
      this.speedX -= Math.random() / config.speed.acceleration;
      this.speedY -= Math.random() / config.speed.acceleration;
      this.x += this.speedX;
      this.y += this.speedY;
      this.size = this.initialSize + Math.random() * 10;
    }
    
    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.drawImage(
        smokeImg, 
        0, 0, smokeImg.width, smokeImg.height,
        this.x, this.y, this.size, this.size
      );
    }
  }
  
  // Инициализация частиц
  function initParticles() {
    for(let i = 0; i < config.particles; i++) {
      particles.push(new Particle());
    }
  }
  
  // Очистка canvas
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  // Основной цикл анимации
  function animate() {
    clearCanvas();
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  // Обработчик изменения размера окна
  function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    config.x = window.innerWidth / 2;
    config.y = window.innerHeight + 50;
  }
  
  // Запуск эффекта после загрузки изображения
  smokeImg.onload = function() {
    handleResize();
    initParticles();
    animate();
  };
  
  window.addEventListener('resize', handleResize);
});