


// Image swap anim
gsap.set(".showcase_view2", { zIndex: (i, target, targets) => targets.length - i });
var images = gsap.utils.toArray(".showcase_view2:not(.last)");
images.forEach((image, i) => {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".showcase_panel2",
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
gsap.set(".showcase_card2", { zIndex: (i, target, targets) => targets.length - i });
var texts = gsap.utils.toArray(".showcase_card2");
texts.forEach((text, i) => {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".showcase_panel2",
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
    barTween = gsap.to(".bar2", {y: 410, ease: "none"});
  }
  else { barTween = gsap.to(".bar2", { y: 297, ease: "none"});
  }


  let mb = gsap.matchMedia();

    mb.add("(min-width: 768px)", () => {  
      ScrollTrigger.create({
        scroller: "[data-scroll-container]",
        trigger: ".showcase_panel2",
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
      trigger: ".showcase_panel2",
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
var $circle = $('.block_bubble2');
function moveCircle(e) {
  TweenLite.to($circle, 0.3, {
    css: {
      left: e.pageX,
      top: e.pageY
    }
  });
}

$(window).on('mousemove', moveCircle);
$('.showcase_visuals2').mouseover(function () {
    $('.showcase_panel2').removeClass("cursor-btn");
});
$('.showcase_visuals2').on('mouseleave', function () {
  $('.showcase_panel2').addClass("cursor-btn");
});
