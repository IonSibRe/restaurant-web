// ================ Variables ================
const navHamburgerBtn = document.querySelector(".nav-hamburger-btn");
const navMobileWrap = document.querySelector(".nav-mobile-wrap");
const navMobileLinks = document.querySelectorAll(".nav-mobile-link");

const slides = document.querySelectorAll(".home-slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const auto = true; // Auto scroll
const intervalTime = 5000;
let slideInterval;

// ================ Navbar ================
navHamburgerBtn.addEventListener("click", () => {
	let linksHeight = 16 * navMobileLinks.length;
	navMobileLinks.forEach((link) => (linksHeight += link.clientHeight));

	if (!navMobileWrap.style.height || navMobileWrap.style.height === "0px") {
		navMobileWrap.style.height = `${linksHeight}px`;
	} else {
		navMobileWrap.style.height = "0px";
	}
});

// ================ Slideshow ================
const nextSlide = () => {
	const current = document.querySelector(".home-slide-current");
	current.classList.remove("home-slide-current");

	if (current.nextElementSibling) {
		current.nextElementSibling.classList.add("home-slide-current");
	} else {
		slides[0].classList.add("home-slide-current");
	}
};

const prevSlide = () => {
	const current = document.querySelector(".home-slide-current");
	current.classList.remove("home-slide-current");

	if (current.previousElementSibling) {
		current.previousElementSibling.classList.add("home-slide-current");
	} else {
		slides[slides.length - 1].classList.add("home-slide-current");
	}
};

// Button events
next.addEventListener("click", () => {
	nextSlide();
	if (auto) {
		clearInterval(slideInterval);
		slideInterval = setInterval(nextSlide, intervalTime);
	}
});

prev.addEventListener("click", () => {
	prevSlide();
	if (auto) {
		clearInterval(slideInterval);
		slideInterval = setInterval(nextSlide, intervalTime);
	}
});

// Auto slide
if (auto) slideInterval = setInterval(nextSlide, intervalTime);
