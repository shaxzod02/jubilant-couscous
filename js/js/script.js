window.addEventListener("DOMContentLoaded", () => {
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    loader = document.querySelector(".loader");

  // Loader
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 2000);

  // Tabs
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, idx) => {
        if (target == item) {
          hideTabContent();
          showTabContent(idx);
        }
      });
    }
  });

  // Timer

  const deadline = "2025-08-11";

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const timer = Date.parse(endtime) - Date.parse(new Date());

    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((timer / 1000 / 60) % 60);
      seconds = Math.floor((timer / 1000) % 60);
    }

    return { timer, days, hours, minutes, seconds };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updatClock, 1000);

    updatClock();

    function updatClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.timer <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Modal
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target == modal || e.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // const modalTimerId = setTimeout(openModal, 5000)

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // Class
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 11000;
      this.chageToUZS();
    }

    chageToUZS() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((classname) => element.classList.add(classname));
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
        </div>
      `;

      this.parent.append(element);
    }
  }

  async function getRecource(url) {
    const res = await fatch(url);
  }

  new MenuCard(
    "img/tabs/1.png",
    "usual",
    'Plan "Usual"',
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
    10,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/2.jpg",
    "plan",
    "Plan “Premium”",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
    20,
    ".menu .container",
    "menu__item"
  ).render();

  new MenuCard(
    "img/tabs/3.jpg",
    "vip",
    "Plan VIP",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
    30,
    ".menu .container",
    "menu__item"
  ).render();

  // Form
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    postData(form);
  });

  async function postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/jons",
      },
      body: data,
    });
    return res.json();
  }

  const msg = {
    loading: "img/spinner.svg",
    success: "Thank's for submitting our form",
    failura: "Something went wrong",
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = msg.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;`;

      form.insertAajacentElemt("afterend", statusMessage);
      const request = new XMLHttpRequest();
      request.open("POST", "server php");
      request.setRequestHeader("Content-Type", "application/json");

      const obj = {};

      const json = JSON.stringify(obj);
      request.send(json);

      request,
        addEventListener("load", () => {
          if ((request.status = 200)) {
            console.log(request.response);
            showThanksModal(msg.success);
            form.resrt();
            setTimeout(() => {
              statusMessage.remove();
            }, 2000);
          } else {
            statusMessage.textContent(msg.failura);
          }
        });
    });
  }

  function showThanksModal() {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const ThanksModal = document.createElement("div");
    ThanksModal.classList.add("modal__dialog");
    ThanksModal.innerHTML = `
      <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
       <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".molal").append(ThanksModal);
    setTimeout(() => {
      ThanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  const slides = document.querySelectorAll(".offer__slide"),
    next = document.querySelector(".offer__slider-next"),
    prev = document.querySelector(".offer__slider-prev");
  total = document.querySelector("#total");
  current = document.querySelector("#current");

  let slideIndex = 1;

  showSlides(slideIndex);

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }

  function showSlides(idx) {
    if (idx > slides.length) {
      slideIndex = 1;
    }
    if (idx < 1) {
      slideIndex = slides.length;
    }
    slides.forEach((item) => (item.style.display = "none"));
    slides[slideIndex - 1].style.display = "block";

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function plusSlides(idx) {
    showSlides((slideIndex += idx));
  }

  next.addEventListener("click", () => {
    plusSlides(1);
  });

  prev.addEventListener("click", () => {
    plusSlides(-1);
  });
});

