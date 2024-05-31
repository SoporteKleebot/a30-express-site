import Lenis from '@studio-freight/lenis'
import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

const textAnimations = document.querySelectorAll(".titles")
const ventajas = document.querySelectorAll(".ventaja")
const linesAnimations = document.querySelectorAll(".lines")
const imgRotates = document.querySelectorAll('.hide');


  document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los elementos con la clase .plan
    const plans = document.querySelectorAll('.plan');
    const planesSection = document.querySelector('.planes');
    //lenis
    const lenis = new Lenis({
      wheelMultiplier: 0.85,
      touchMultiplier: 0.8,
      syncTouch: true,
      autoResize: true
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time)=>{
      lenis.raf(time * 700)
    })

    gsap.ticker.lagSmoothing(0)


    gsap.set(planesSection, {
      backgroundColor: 'white', // Color de fondo original
    })

    // Añadir eventos hover a cada .plan
    plans.forEach(plan => {
        plan.addEventListener('mouseenter', () => {
            console.log('Mouse entra en el plan:', plan);
            // Obtener el color específico según el plan
            let bgColor;
            switch (plan.classList[1]) {
                case 'ultra':
                    bgColor = '#F6CF2B';
                    break;
                case 'light':
                    bgColor = '#01C5D5';
                    break;
                case 'estandar':
                    bgColor = '#54AD46';
                    break;
                case 'premium':
                    bgColor = '#EE8D1C';
                    break;
                default:
                    bgColor = 'red';
            }
            gsap.to(planesSection, {
                backgroundColor: bgColor,
                duration: 0.2
            });
            gsap.to('.plan-titulo', {
              color: '#fff',
              duration: 0.2
            })
        });

        plan.addEventListener('mouseleave', () => {
            console.log('Mouse sale del plan:', plan);
            gsap.to(planesSection, {
                backgroundColor: 'white', // Color de fondo original
                duration: 0.2
            });
            gsap.to('.plan-titulo', {
              color: '#3C4B5D',
              duration: 0.2
            })
        });
    });


    //titles
    textAnimations.forEach((textLine) => {
      const split = new SplitType(textLine, {
        types: "chars"
      });

      gsap.from(split.chars, {
        yPercent: 250,
        stagger: 0.03,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textLine,
          start: "top 85%",
          end: "top center",
          scrub: true
        }
      });
    });

    //phars
    linesAnimations.forEach((textLine) => {
      const split = new SplitType(textLine, {
        types: "lines"
      });

      gsap.from(split.lines, {
        yPercent: 300,
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out',
        stagger: 0.035,
        scrollTrigger: {
          trigger: textLine,
          start: 'top 80%',
          end: 'top center',
          toggleActions: 'play none resume reverse'
        }
      });
    });

    ventajas.forEach((ventaja, index) => {
      gsap.from(ventaja, {
        yPercent: 100,
        opacity: 0,
        delay: index * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ventaja,
          start: "top bottom",
          end: "top 65%",
          scrub: true
        }
      });
    });

    gsap.to(imgRotates, {
      y: '-5px',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

});

