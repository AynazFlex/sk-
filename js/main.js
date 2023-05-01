"use strict";

const nav = document.body.querySelector(".nav");
const burger = nav.querySelector(".nav__burger");
const links = nav.querySelectorAll(".nav__links>li>a");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("close");
  nav.classList.toggle("open");
  document.body.style.overflow === "auto" ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
});

links.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    if(e.currentTarget.hash) {
      document.body
        .querySelector(e.currentTarget.hash)
        .scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        burger.classList.remove("active");
        nav.classList.add("close");
        nav.classList.remove("open");
        document.body.style.overflow = "auto"
    }
  });
});

window.addEventListener("scroll", () => {
  nav.style.top = "-80px";
  clearTimeout(window.scrollEndTimer);
  window.scrollEndTimer = setTimeout(() => {
    nav.style.top = "0px";
  }, 200);
});

const sliderTarget = document.body.querySelector(".works__swiper")

class Slider {
    constructor({init, next, prev}) {
        this.init = init;
        this.next = next;
        this.prev = prev;
        // this.activeId = 0;
        // this.prevId = 0;
        this.slides = this.init.querySelectorAll(".works__swiper-item")
        this.length = this.slides.length;
    }

    // _move(index) {
    //     const width = this.init.getBoundingClientRect().width
    //     this.activeId = index
    //     this.init.scrollTo({
    //         left: index*width,
    //         behavior: "smooth",
    //     })
    // }

    start() {
        this.next.onclick = () => {
            // if(this.activeId < this.length-1) {
            //     this._move(this.prevId + 1)
            // }
            this.init.style.animation = "move 200ms linear"
            this.init.prepend(this.init.querySelectorAll(".works__swiper-item")[this.length - 1])
        }

        this.prev.onclick = () => {
            // if(this.activeId > 0) {
            //     this._move(this.prevId - 1)
            // }
            this.init.style.animation = "move 200ms linear"
            this.init.append(this.init.querySelectorAll(".works__swiper-item")[0])
        }

        // this.init.onscroll = () => {
        //     clearTimeout(window.scrollEndTimer)
        //     window.scrollEndTimer = setTimeout(() => {
        //       this.prevId = this.activeId
        //     }, 100)
        // }

        this.init.onanimationend = ({currentTarget}) => {
          currentTarget.style = null
        }

        // window.onresize = () => {
        //     this.init.scrollTo({
        //         left: this.init.getBoundingClientRect().width*this.prevId
        //     })
        // }
    }
}

const slider = new Slider({
    init: sliderTarget.querySelector(".works__swiper-container"),
    next: sliderTarget.querySelector(".works__swiper-next"),
    prev: sliderTarget.querySelector(".works__swiper-prev"),
})

slider.start()
