"use strict";

const nav = document.body.querySelector(".nav");
const burger = nav.querySelector(".nav__burger");
const links = nav.querySelectorAll(".nav__links>li>a");
const about = document.body.querySelector(".about__container");
const about_items = about.querySelector(".about__items");
const about_forward = about.querySelector(".about__forward");
const about_back = about.querySelector(".about__back");
const header = document.body.querySelector('.header');

window.onload = async () => {
  await new Promise((res) => {
    setTimeout(res, 500)
  })
  await anim_sync(header.querySelector('.header__title'), 'header__anim', 'header__loading');
  await anim_sync(header.querySelector('.header__subtitle'), 'header__anim', 'header__loading');
}

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("nav__close");
  nav.classList.toggle("open");
  document.body.style.overflow === "auto"
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");
});

links.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.currentTarget.hash) {
      document.body.querySelector(e.currentTarget.hash).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      burger.classList.remove("active");
      nav.classList.add("nav__close");
      nav.classList.remove("open");
      document.body.style.overflow = "auto";
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

about_forward.onclick = () => {
  about_items.scrollBy({
    left: 300,
    behavior: 'smooth'
  })
}

about_back.onclick = () => {
  about_items.scrollBy({
    left: -300,
    behavior: 'smooth'
  })
}

const sliderTarget = document.body.querySelector(".works__swiper");

class Slider {
  constructor({ init, next, prev, slides_class }) {
    this.init = init;
    this.next = next;
    this.prev = prev;
    // this.activeId = 0;
    // this.prevId = 0;
    this.length = this.init.querySelectorAll(`.${slides_class}`).length;
    this.slides_class = slides_class;
  }

  // _move(index) {
  //     const width = this.init.getBoundingClientRect().width
  //     this.activeId = index
  //     this.init.scrollTo({
  //         left: index*width,
  //         behavior: "smooth",
  //     })
  // }

  _anim(elem_1, elem_2) {
    return Promise.all([
      new Promise(resolve => {
        elem_1.addEventListener('animationend', ({currentTarget}) => {
          currentTarget.style = null;
          resolve()
        }, {
          once: true,
        })
      }),
      new Promise(resolve => {
        elem_2.addEventListener('animationend', ({currentTarget}) => {
          currentTarget.style = null;
          resolve()
        }, {
          once: true,
        })
      })
    ])
  }

  start() {
    this.next.onclick = () => {
      // if(this.activeId < this.length-1) {
      //     this._move(this.prevId + 1)
      // }
      const prev = this.init.querySelectorAll(`.${this.slides_class}`)[0];
      const next = this.init.querySelectorAll(`.${this.slides_class}`)[1];
      prev.style.animation = "next_1 1000ms ease";
      next.style.animation = "next_2 1000ms ease";
      this._anim(prev, next).then(() => this.init.append(prev))
    };

    this.prev.onclick = () => {
      // if(this.activeId > 0) {
      //     this._move(this.prevId - 1)
      // }
      this.init.prepend(
        this.init.querySelectorAll(`.${this.slides_class}`)[this.length - 1]
      );
      const prev = this.init.querySelectorAll(`.${this.slides_class}`)[0];
      const next = this.init.querySelectorAll(`.${this.slides_class}`)[1];
      prev.style.animation = "prev_2 1000ms ease";
      next.style.animation = "prev_1 1000ms ease";
      this._anim(prev, next)
    };

    // this.init.onscroll = () => {
    //     clearTimeout(window.scrollEndTimer)
    //     window.scrollEndTimer = setTimeout(() => {
    //       this.prevId = this.activeId
    //     }, 100)
    // }

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
  slides_class: "works__swiper-item",
});

slider.start();

sliderTarget.onclick = ({ target }) => {
  if (target.matches(".works__swiper-item_img>button")) {
    target
      .closest(".works__swiper-item_img")
      .querySelector(".photos__swiper")
      .classList.remove("close");
    document.body.style.overflow = "hidden";
  }
  if (
    target.closest(".photos__swiper") &&
    (target.closest(".photos__swiper-close") ||
      (!target.closest(".photos__swiper-container") &&
        !target.closest(".photos__swiper-prev") &&
        !target.closest(".photos__swiper-next")))
  ) {
    target
      .closest(".works__swiper-item_img")
      .querySelector(".photos__swiper")
      .classList.add("close");
    document.body.style.overflow = "auto";
  }
};

sliderTarget.querySelectorAll(".works__swiper-item").forEach((item) => {
  new Slider({
    init: item.querySelector(".photos__swiper-container"),
    next: item.querySelector(".photos__swiper-next"),
    prev: item.querySelector(".photos__swiper-prev"),
    slides_class: "photos__swiper-item",
  }).start();
});

async function anim_sync(elem, className, classDelete) {
  elem.classList.add(className);
  return new Promise(res => {
    elem.addEventListener('animationend', () => {
      elem.classList.remove(className);
      elem.classList.remove(classDelete)
      res()
    })
  })
}