


// console.clear();

gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  multiplier: 1.0,
  mobile: {
     smooth: true,
     touchMultiplier: 2
  },
  smartphone: {
    smooth: true,
    touchMultiplier: 2
  },
  tablet: {
    smooth: true
  },
});


// Locomotive scroll height gets updated according to Dom Height
new ResizeObserver(() => locoScroll.update()).observe(
  document.querySelector("[data-scroll-container]")
);


locoScroll.on('scroll', (position) => {
  if ((position.scroll.y) > 5) {
    document.querySelector('body').classList.add('scrolled');
  } else {
    document.querySelector('body').classList.remove('scrolled');
  }
});


locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
});


// Image swap anim
gsap.set(".showcase_view", { zIndex: (i, target, targets) => targets.length - i });
var images = gsap.utils.toArray(".showcase_view:not(.last)");
images.forEach((image, i) => {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".showcase_panel",
      scroller: "[data-scroll-container]",
      start: () => "top -" + window.innerHeight * (i + 0.5),
      end: () => "+=" + window.innerHeight,
      scrub: true,
      toggleActions: "play none reverse none",
      invalidateOnRefresh: true
    }
  });

  tl.fromTo(image, { height: () => { return "100%" } }, { height: () => { return "0%" }, ease: "none" })  
});
// Image swap anim ends



// Text swap anim
gsap.set(".showcase_card", { zIndex: (i, target, targets) => targets.length - i });
var texts = gsap.utils.toArray(".showcase_card");
texts.forEach((text, i) => {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".showcase_panel",
      scroller: "[data-scroll-container]",
      start: () => "top -" + window.innerHeight * i,
      end: () => "+=" + window.innerHeight,
      scrub: true,
      toggleActions: "play none reverse none",
      invalidateOnRefresh: true
    }
  });
  if (i) {
    tl.to(text, { duration: 0.33, autoAlpha: 1, y: "0%" });
  }
  if (texts[i + 1]) {
    tl.to(text, { duration: 0.33, autoAlpha: 0, y: "0%" }, 0.66);
  }
});

let barTween;
  if ($(window).width() > 1550) {
    barTween = gsap.to(".bar", {y: 410, ease: "none"});
  }
  else { barTween = gsap.to(".bar", { y: 297, ease: "none"});
  }


  let mb = gsap.matchMedia();

    mb.add("(min-width: 768px)", () => {  
      ScrollTrigger.create({
        scroller: "[data-scroll-container]",
        trigger: ".showcase_panel",
        scrub: true,
        // markers: true,
        pin: true,
        start: () => "top 8%",
        end: () => "+=" + (images.length + 1) * window.innerHeight,
        invalidateOnRefresh: true,
        animation: barTween
      });
  
  });

  mb.add("(max-width: 767px)", () => {  
    ScrollTrigger.create({
      scroller: "[data-scroll-container]",
      trigger: ".showcase_panel",
      scrub: true,
      markers: false,
      pin: true,
      start: () => "top 6%",
      end: () => "+=" + (images.length + 1) * window.innerHeight,
      invalidateOnRefresh: true,
      animation: barTween
    });
  });



// Portfolio section cursor effect
var $circle = $('.block_bubble');
function moveCircle(e) {
  TweenLite.to($circle, 0.3, {
    css: {
      left: e.pageX,
      top: e.pageY
    }
  });
}

$(window).on('mousemove', moveCircle);
$('.showcase_visuals').mouseover(function () {
    $('.showcase_panel').removeClass("cursor-btn");
});
$('.showcase_visuals').on('mouseleave', function () {
  $('.showcase_panel').addClass("cursor-btn");
});



// Cards hover animation
const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  card.addEventListener('mouseover', () => {
    if (!card.hasAttribute('active')) {
      updateActiveCard(card);
    }
  });
});

function updateActiveCard(activeCard) {
  cards.forEach((card) => {
    if (card === activeCard) {
      card.setAttribute('active', '');
    } else {
      card.removeAttribute('active');
    }
  })
}





let mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {  
  // we are sparkout animation 
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".we_sparkout_inner",
      scroller: "[data-scroll-container]",
      scrub: 1,
      pin: true,
      markers: false,
      start: 'top top',
      end: '+=1000',
      toggleActions: "play none reverse none",
      ease: "power1.inOut",
      immediateRender: false
    }
  })

  tl2.to(".we_r", 0.2, { y: -30, ease: Expo.easeInOut, autoAlpha: 0 })
          .to(".sparkout_img_mast", 1, { ease: Sine.easeInOut, scale: 160 }, "<0.2")
          .to(".talk_us_inner", 0.1, { ease: Sine.easeInOut, css: { autoAlpha: 1 } }, "<0.5");

        
  // Video play & pause on zoom 
  let videoElem = document.querySelector(".appi_zm_video");
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".appi_zm_video",
      scroller: "[data-scroll-container]",
      scrub: 1,
      markers: false,
      start: 'top -50%',
      end: '+=1000',
      ease: "power1.inOut",
      onEnter: () => videoElem.play(),
      onEnterBack: () => videoElem.play(),
      onLeave: () => videoElem.pause(),
      onLeaveBack: () => videoElem.pause(),
      immediateRender: false
    }
}) 
});

