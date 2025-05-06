import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copyText } from "./utils/index";
import { mapEach } from "./utils/dom";
// import Home from "./pages/home";
import Time from "./components/Time";

const toContactButtons = document.querySelectorAll(".contact-scroll");
const footer = document.getElementById("js-footer");
const scrollEl = document.querySelector("[data-scroll-container]");
const emailButton = document.querySelector("button.email");
const toCopyText = document.querySelector(".to-copy span");
// const body = document.body;
const time = new Time();

gsap.registerPlugin(ScrollTrigger);

const scroll = new LocomotiveScroll({
  el: scrollEl,
  smooth: true,
  lerp: 0.06,
  tablet: {
    breakpoint: 768,
  },
});

setTimeout(() => {
  scroll.update();
}, 1000);

scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(scroll.el, {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },

  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

export default class Home {
  constructor(scroll) {
    this.locomotive = scroll;
    this.heroTextAnimation();
    this.homeIntro();
    this.homeAnimations();
    this.homeActions();
  }

  homeActions() {
    mapEach(toContactButtons, (button) => {
      button.onclick = () => {
        this.locomotive.scrollTo(footer);
      };
    });

    emailButton.addEventListener("click", (e) => {
      copyText(e);
      toCopyText.textContent = "copied";

      setTimeout(() => {
        toCopyText.textContent = "Click To Copy";
      }, 2000);
    });
  }

  homeIntro() {
    const tl = gsap.timeline();

    gsap.to(scrollEl, {
      autoAlpha: 1,
    });

    tl.from(".home__nav", {
      duration: 0.5,
      delay: 0.3,
      opacity: 0,
      yPercent: -100,
      ease: "power4.out",
    })
      .from(".hero__title [title-overflow]", {
        duration: 0.7,
        yPercent: 100,
        stagger: {
          amount: 0.2,
        },
        ease: "power4.out",
      })
      .from(
        ".hero__title .bottom__right",
        {
          duration: 1,
          yPercent: 100,
          opacity: 0,
          ease: "power4.out",
        },
        "<20%"
      )
      .set(".hero__title .overflow", { overflow: "unset" })
      .from(
        ".hero__title .mobile",
        {
          duration: 0.7,
          yPercent: 100,
          stagger: {
            amount: 0.2,
          },
          ease: "power4.out",
        },
        "-=1.4"
      );
  }

  homeAnimations() {
    gsap.to(".home__projects__line", { autoAlpha: 1 });
    gsap.utils.toArray(".home__projects__line").forEach((el) => {
      const line = el.querySelector("span");
      gsap.from(line, {
        duration: 1.5,
        scrollTrigger: {
          trigger: el,
          scroller: "[data-scroll-container]",
        },
        scaleX: 0,
      });
    });

    gsap.utils.toArray("[data-fade-in]").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          scroller: "[data-scroll-container]",
        },
        duration: 1.5,
        yPercent: 100,
        opacity: 0,
        ease: "power4.out",
      });
    });

    if (window.innerWidth <= 768) {
      gsap.utils.toArray(".home__projects__project").forEach((el) => {
        const text = el.querySelector(".title__main");
        const link = el.querySelector(".project__link");
        gsap.from([text, link], {
          scrollTrigger: {
            trigger: el,
            scroller: "[data-scroll-container]",
          },
          duration: 1.5,
          yPercent: 100,
          stagger: {
            amount: 0.2,
          },
          ease: "power4.out",
        });
      });

      const awardsTl = gsap.timeline({
        defaults: {
          ease: "power1.out",
        },
        scrollTrigger: {
          trigger: ".home__awards",
          scroller: "[data-scroll-container]",
        },
      });
      awardsTl.from(".awards__title span", {
        duration: 1,
        opacity: 0,
        yPercent: 100,
        stagger: {
          amount: 0.2,
        },
      });
    }
  }

  heroTextAnimation() {
    gsap.to(".hero__title__dash.desktop", {
      scrollTrigger: {
        trigger: ".hero__title",
        scroller: "[data-scroll-container]",
        scrub: true,
        start: "-8% 9%",
        end: "110% 20%",
      },
      scaleX: 4,
      ease: "none",
    });
  }
}

document.querySelectorAll('.techitem').forEach(item => {
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.className = 'tech-particle';
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    item.appendChild(particle);
  }
});

// Mouse interaction for tech items
document.querySelectorAll('.techitem').forEach(item => {
  item.addEventListener('mouseenter', () => {
    // Animate progress bar
    const progressBar = item.querySelector('.tech-progress-bar');
    const currentWidth = progressBar.style.width;
    progressBar.style.width = '0';
    setTimeout(() => {
      progressBar.style.width = currentWidth;
    }, 50);
    
    // Animate particles
    const particles = item.querySelectorAll('.tech-particle');
    particles.forEach(particle => {
      particle.style.opacity = '1';
      
      // Random animation for each particle
      const duration = 0.5 + Math.random() * 1.5;
      const delay = Math.random() * 0.3;
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      
      particle.style.transition = `transform ${duration}s ease-out ${delay}s, opacity 0.3s ease`;
      particle.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    const main = document.getElementById("mainContent");
    
    // Only hide loader AFTER page is fully loaded
    loader.style.display = "none";
    main.style.display = "block";
  });
  
  // Mouse move effect
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Stronger tilt effect
    const tiltX = (y - 0.5) * 15;
    const tiltY = (x - 0.5) * -15;
    
    // Apply transform with scale and perspective
    item.style.transform = `translateY(-12px) scale(1.03) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    
    // Dynamic glow effect that follows cursor
    const glowX = x * 100;
    const glowY = y * 100;
    item.style.boxShadow = `
      0 15px 30px rgba(255, 102, 0, 0.2),
      0 0 0 1px rgba(255, 102, 0, 0.1),
      inset 0 0 60px rgba(255, 102, 0, ${0.1 + x * y * 0.2})
    `;
    
    // Move the tech icon based on cursor position
    const icon = item.querySelector('.tech-icon');
    const moveX = (x - 0.5) * 10;
    const moveY = (y - 0.5) * 10;
    icon.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2) rotate(${moveX}deg)`;
    
    // Gradient follows mouse
    item.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, #2a2a2a 0%, #1a1a1a 70%)`;
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
    item.style.boxShadow = '';
    item.style.background = '';
    
    const icon = item.querySelector('.tech-icon');
    icon.style.transform = '';
    
    // Reset particles
    const particles = item.querySelectorAll('.tech-particle');
    particles.forEach(particle => {
      particle.style.opacity = '0';
      particle.style.transform = 'translate(0, 0)';
    });
  });
});


new Home(scroll);
