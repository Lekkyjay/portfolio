const particles = [];

//setup is called 1ce automatically by p5.js after window loads
function setup() {
  //creates canvas that covers whole window
  createCanvas(window.innerWidth, window.innerHeight);

  //number of particles to be created based on width of window
  const particlesLength = Math.floor(window.innerWidth / 10)

  //create as many particles as particlesLength by creating new instances of the Particle class
  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle)
  }
}

//draw is automatically called repeatedly(several times per sec) by p5.js after window loads
function draw() {
  //background(55, 100, 144)
  background(0, 0, 0)
  particles.forEach((p, index) => {
    p.update()
    p.draw()
    p.connectParticles(particles.slice(index))
  })
}

class Particle {
  constructor() {
    //position
    this.pos = createVector(random(width), random(height))  //width is equivalent of windows.innerwidth computed by p5.js
    //velocity - the higher the number the faster the particles move randomly in x or y direction
    this.vel = createVector(random(-1, 1), random(-1, 1))
    //size
    this.size = 10
  }

  //updates movement by adding velocity
  update() {
    this.pos.add(this.vel)
    this.edges()
  }

  //draw single particle of radius(size=10px )
  draw() {
    noStroke()
    fill('rgba(248, 255, 13, 0.2)')
    circle(this.pos.x, this.pos.y, this.size)
  }

  //detect edges
  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1
    }
  }

  //connect particles
  connectParticles(particles) {
    particles.forEach(particle => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
      if (d < 120) {
        stroke('rgba(255, 255, 255, 0.1)')
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
      }
    })
  }
}