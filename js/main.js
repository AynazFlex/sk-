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
        document.body.style.overflow === "auto" ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
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
