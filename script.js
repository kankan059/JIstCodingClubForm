let ezaz = () => {
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const cards = gsap.utils.toArray(".card");
    const introCard = cards[0];

    const titles = gsap.utils.toArray(".card-title h1");
    titles.forEach((title) => {
      const split = new SplitText(title, {
        type: "char",
        charsClass: "char",
        tag: "div",
      });

      split.chars.forEach((char) => {
        char.innerHTML = `${char.textContent}`;
      });
    });

    const cardImgWrapper = introCard.querySelector(".card-img");
    const cardImg = introCard.querySelector(".card-img img");
    gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: "400px" });
    gsap.set(cardImg, { scale: 1.5 });

    function animateContentIn(titleChars, description) {
      gsap.to(titleChars, {
        x: "0%",
        duration: 0.75,
        ease: "power4.out",
        stagger: 0.02,
      });
      gsap.to(description, {
        x: 0,
        opacity: 1,
        duration: 0.75,
        delay: 0,
        ease: "power4.out",
      });
    }

    function animateContentOut(titleChars, description) {
      gsap.to(titleChars, {
        x: "100%",
        duration: 0.5,
        ease: "power4.out",
      });
      gsap.to(description, {
        x: "40px",
        opacity: 0,
        duration: 0.5,
        ease: "power4.out",
      });
    }

    const marquee = introCard.querySelector(".card-marquee .marquee");
    const titleChars = introCard.querySelectorAll(".char");
    const description = introCard.querySelector(".card-description");

    ScrollTrigger.create({
      trigger: introCard,
      start: "top top",
      end: "+=300vh",
      onUpdate: (self) => {
        const progress = self.progress;
        const imgScale = 0.5 + progress * 0.5;
        const borderRadius = 400 - progress * 200;
        const innerImgScale = 1.5 - progress * 0.5;

        gsap.set(cardImgWrapper, {
          scale: imgScale,
          borderRadius: borderRadius + "px",
        });
        gsap.set(cardImg, { scale: innerImgScale });

        if (imgScale >= 0.5 && imgScale <= 0.75) {
          const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
          gsap.set(marquee, { opacity: 1 - fadeProgress });
        } else if (imgScale < 0.5) {
          gsap.set(marquee, { opacity: 1 });
        } else if (imgScale > 0.75) {
          gsap.set(marquee, { opacity: 0 });
        }

        if (progress >= 1 && !introCard.contentRevealed) {
          introCard.contentRevealed = true;
          animateContentIn(titleChars, description);
        }

        if (progress < 1 && introCard.contentRevealed) {
          introCard.contentRevealed = false;
          animateContentOut(titleChars, description);
        }
      },
    });

    cards.slice(1).forEach((card, index) => {
      const isLastCard = index === cards.length - 1;
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: isLastCard ? "+=100vh" : "top top",
        endTrigger: isLastCard ? null : cards[cards.length - 1],
        pin: true,
        pinSpacing: isLastCard,
      });
    });

    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        const cardWrapper = card.querySelector(".card-wrapper");
        ScrollTrigger.create({
          trigger: cards[index + 1],
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(cardImgWrapper, {
              scale: 1 - progress * 0.25,
              opacity: 1 - progress,
            });
          },
        });
      }
    });

    cards.forEach((card, index) => {
      if (index > 0) {
        const cardImg = card.querySelector(".card-img img");
        const imgContainer = card.querySelector(".card-img");
        ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(cardImg, { scale: 2 - progress });
            gsap.set(imgContainer, {
              borderRadius: 150 - progress * 125 + "px",
            });
          },
        });
      }
    });

    cards.forEach((card, index) => {
      if (index == 0) return;

      const cardDescription = card.querySelector(".card-description");
      const cardTitleChars = card.querySelectorAll(".char span");

      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        onEnter: () => animateContentIn(cardTitleChars, cardDescription),
        onLeaveBack: () => animateContentOut(cardTitleChars, cardDescription),
      });
    });

    const marqueeContent = document.querySelector(".marquee");
    const marqueeWidth = marqueeContent.offsetWidth;

    marqueeContent.innerHTML += marqueeContent.innerHTML;

    gsap.to(marqueeContent, {
      x: -marqueeWidth,
      duration: 7,
      ease: "linear",
      repeat: -1,
    });
  });
};

let kk = () => {
  let gsapIntro = () => {
    document
      .querySelector("#intro > img")
      .addEventListener("mouseenter", () => {
        gsap.to("#intro > img", {
          scale: 0.9,
          duration: 0.4,
        });
      });
    document
      .querySelector("#intro > img")
      .addEventListener("mouseleave", () => {
        gsap.to("#intro > img", {
          scale: 1,
          duration: 0.3,
        });
      });

    gsap.from("#intro .intro-h1 .hero-title > h2", {
      y: 900,
      duration: 1,
      opacity: 0,
      stagger: 0.3,
    });
    gsap.from("#intro > img", {
      scale: 0.9,
      duration: 1,
      opacity: 0,
      stagger: 0.3,
    });
  };

  let gsapSecond = () => {
    let st = gsap.timeline({
      scrollTrigger: {
        trigger: "#second-page",
        scroller: "body",
        start: "top 70%",
        end: "top 30%",
        scrub: 2,
      },
    });
    st.from("#second-page #first-part-second > h4", {
      scale: 0.4,
      opacity: 0,
    });
    st.to('#intro .intro-h1 > h1',{
        opacity: 0,
    })

    let st2 = gsap.timeline({
        scrollTrigger : {
            trigger : ".cards",
            scroller : "body",
            start : "top 50%",
            end : "top 20%",
            scrub: 2,

        }
    })
    st2.from('.cards .card',{
        opacity: 0,
        duration : 0.6,
        stagger : 0.2
    })
    st2.to('#second-page #first-part-second > h4',{
        opacity: 0,
        duration : 0.61,
        stagger : 0.2
    })
  };
  let gsapOutro = () =>{
     let st2 = gsap.timeline({
        scrollTrigger : {
            trigger : ".outro",
            scroller : "body",
            start : "top 70%",
            end : "top -10%",
            scrub: 2,
        }
    })
    st2.from('.outro',{
      opacity: 0,
      duration : 0.4,
      scale: 0.7,
      stagger: 0.4
    })
    st2.from('#footer',{
      scale: 0.9,
      opacity: 0,
      duration: 0.8
    })
  }

  gsapIntro();
  gsapSecond();
  gsapOutro();
};


// let button = document.querySelector('.container')

ezaz();
kk();
