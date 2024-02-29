
function LocomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
LocomotiveAnimation()

gsap.to("#nav-part1 svg",{
    transform:"translateY(-100%)",
    scrollTrigger:{
        trigger:"#page1",
        scroller:"#main",
        start:"top 0",
        end:"top -10%",
        scrub:true,
        
    }
})

gsap.to("#nav-part-2 #links",{
    transform:"translateY(-120%)",
    opacity:0,
    scrollTrigger:{
        trigger:"#page1",
        scroller:"#main",
        start:"top 0",
        end:"top -5%",
        scrub:true,
        
    }
})


function videoConAnimation(){
    var videoContainer= document.getElementById("videoContainer")
    var playdiv= document.getElementById("play")
videoContainer.addEventListener("mousemove",function(dets){
    
    gsap.to(playdiv,{
        left:dets.x-50,
        top:dets.y-50, 
    })
})

videoContainer.addEventListener("mouseenter",function(){
    gsap.to(playdiv,{
        opacity:1,
        scale:1
    })
})

videoContainer.addEventListener("mouseleave",function(){
    gsap.to(playdiv,{
        opacity:0,
        scale:0
    })
})

}
videoConAnimation();

function loadingAnimation(){
    gsap.from("#page1 h1",{
        y:100,
        opacity:0,
        delay:.5,
        duration:.5,
        stagger:.3
    })

    gsap.from("#page1 #videoContainer",{
        scale:0.8,
        opacity:0,
        delay:.5,
        duration:.5,
    })
}
loadingAnimation()

function cursorAnimation(){
    
document.addEventListener("mousemove",function(dets){
    gsap.to("#cursor",{
        left:dets.x,
        top:dets.y
    })
})

document.querySelectorAll(".child").forEach(function(elm){
    elm.addEventListener("mouseenter",function(){
        gsap.to("#cursor",{
            transform:"translate(-50%,-50%) scale(1)"
        })
    })
})
document.querySelectorAll(".child").forEach(function(elm){
    elm.addEventListener("mouseleave",function(){
        gsap.to("#cursor",{
            transform:"translate(-50%,-50%) scale(0)"
        })
    })
})
}
cursorAnimation()