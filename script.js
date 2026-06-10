const navLinks = document.querySelectorAll("header nav a");
const logoLink = document.querySelector(".logo");
const sections = document.querySelectorAll("section");
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("header nav");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

const activePage = () => {
  const header = document.querySelector("header");
  const barsBox = document.querySelector(".bars-box");

  header.classList.remove("active");
  setTimeout(() => {
    header.classList.add("active");
  }, 1100);

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  barsBox.classList.remove("active");
  setTimeout(() => {
    barsBox.classList.add("active");
  }, 1100);

  sections.forEach((sections) => {
    sections.classList.remove("active");
  });

  navbar.classList.remove("active");
};
navLinks.forEach((link, idx) => {
  link.addEventListener("click", () => {
    if (!link.classList.contains("active")) {
      activePage();
      link.classList.add("active");

      setTimeout(() => {
        sections[idx].classList.add("active");
      }, 1100);
    }
  });
});

logoLink.addEventListener("click", () => {
  if (!navLinks[0].classList.contains("active")) {
    activePage();

    navLinks[0].classList.add("active");

    setTimeout(() => {
      sections[0].classList.add("active");
    }, 1100);
  }
});

const resumeBtns = document.querySelectorAll(".resume-btn");
resumeBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const resumeDetails = document.querySelectorAll(".resume-detail");
    resumeBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");

    resumeDetails.forEach((detail) => {
      detail.classList.remove("active");
    });
    resumeDetails[idx].classList.add("active");
  });
});

const arrowRight = document.querySelector(
  ".portfolio-box .navigation .arrow-right",
);
const arrowLeft = document.querySelector(
  ".portfolio-box .navigation .arrow-left",
);

let index = 0;
const activePortfolio = () => {
  const imgSlide = document.querySelector(".portfolio-carousel .img-slide");
  const portfolioDetails = document.querySelectorAll(".portfolio-detail");
  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
  portfolioDetails.forEach((detail) => {
    detail.classList.remove("active");
  });
  portfolioDetails[index].classList.add("active");
};

arrowRight.addEventListener("click", () => {
  if (index < 2) {
    index++;
    arrowLeft.classList.remove("disabled");
  } else {
    index = 3;
    arrowRight.classList.add("disabled");
  }
  activePortfolio();
});

arrowLeft.addEventListener("click", () => {
  if (index > 1) {
    index--;
    arrowRight.classList.remove("disabled");
  } else {
    index = 0;
    arrowLeft.classList.add("disabled");
  }
  activePortfolio();
});

const arrowRight1 = document.querySelector(
  ".portfolio-box1 .navigation .arrow-right",
);
const arrowLeft1 = document.querySelector(
  ".portfolio-box1 .navigation .arrow-left",
);

let indexa = 0;
const activePortfolio1 = () => {
  const imgSlide1 = document.querySelector(".portfolio-carousel1 .img-slide");
  const portfolioDetails1 = document.querySelectorAll(".portfolio-detail1");
  imgSlide1.style.transform = `translateX(calc(${indexa * -100}% - ${indexa * 2}rem))`;
  portfolioDetails1.forEach((detail) => {
    detail.classList.remove("active");
  });
  portfolioDetails1[indexa].classList.add("active");
};

arrowRight1.addEventListener("click", () => {
  if (indexa < 12) {
    indexa++;
    arrowLeft1.classList.remove("disabled");
  } else {
    indexa = 13;
    arrowRight1.classList.add("disabled");
  }
  activePortfolio1();
});

arrowLeft1.addEventListener("click", () => {
  if (indexa > 1) {
    indexa--;
    arrowRight1.classList.remove("disabled");
  } else {
    indexa = 0;
    arrowLeft1.classList.add("disabled");
  }
  activePortfolio1();
});

const form = document.getElementById("form");
const msg = document.getElementById("msg");

form.addEventListener("submit", async function (e) {
  e.preventDefault(); // 🚨 مهم جداً

  const data = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/mpqyggwj", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      msg.style.display = "block";
      form.reset();
    } else {
      alert("Something went wrong ❌");
    }
  } catch (error) {
    alert("Error sending message ❌");
  }
});
