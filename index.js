// ================ Variables ================
const navHamburgerBtn = document.querySelector(".nav-hamburger-btn");
const navMobileWrap = document.querySelector(".nav-mobile-wrap");
const navMobileLinks = document.querySelectorAll(".nav-mobile-link");

const slides = document.querySelectorAll(".home-slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const dots = document.querySelectorAll(".home-slide-dot");
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
	addActiveDotClass();
	resetAutoSlideInterval();
});

prev.addEventListener("click", () => {
	prevSlide();
	addActiveDotClass();
	resetAutoSlideInterval();
});

// Dot events
dots.forEach((dot, index) => {
	dot.addEventListener("click", () => {
		// Remove active class for dots and slides
		dots.forEach((dot) => {
			if (dot.classList.contains("home-slide-dot-active")) {
				dot.classList.remove("home-slide-dot-active");
			}
		});
		slides.forEach((slide) => {
			if (slide.classList.contains("home-slide-current")) {
				slide.classList.remove("home-slide-current");
			}
		});

		// Add active class to dot and slide
		slides[index].classList.add("home-slide-current");
		addActiveDotClass();

		resetAutoSlideInterval();
	});
});

const addActiveDotClass = () => {
	dots.forEach((dot) => {
		if (dot.classList.contains("home-slide-dot-active")) {
			dot.classList.remove("home-slide-dot-active");
		}
	});
	slides.forEach((slide, index) => {
		if (slide.classList.contains("home-slide-current")) {
			dots[index].classList.add("home-slide-dot-active");
		}
	});
};

const resetAutoSlideInterval = () => {
	if (auto) {
		clearInterval(slideInterval);
		slideInterval = setInterval(() => {
			nextSlide();
			addActiveDotClass();
		}, intervalTime);
	}
};

// Auto slide
if (auto) {
	slideInterval = setInterval(() => {
		nextSlide();
		addActiveDotClass();
	}, intervalTime);
}

// ================ Menu ================
const homeMenuSelectionContent = document.querySelector(
	".home-menu-selection-content"
);
const menuBtns = document.querySelectorAll(".home-menu-selection-btn");
const mealsList = [];

const getMeals = async () => {
	const response = await fetch("./meals.json");
	const meals = await response.json();

	for (const key in meals) mealsList.push(meals[key]);

	displayMeals();
};

const displayMeals = () => {
	mealsList.forEach((meal, index) => {
		const domItem = document.createElement("div");
		domItem.className = "home-menu-selection-item";
		domItem.setAttribute("data-tags", meal.tags);
		domItem.innerHTML = `
            <div class="home-menu-selection-item-img-wrap">
                    <img src="./img/menu_${index + 1}.jpg" alt="" />
            </div>
            <div
                class="home-menu-selection-item-content-wrap"
            >
                <h3
                    class="home-menu-section-item-content-title"
                >
                    ${meal.name}
                </h3>
                <div
                    class="home-menu-selection-item-content-list"
                >
                    <div
                        class="home-menu-selection-item-content-list-column"
                    >
                        <p
                            class="home-menu-selection-item-content-list-text"
                        >
                            - Juice Fruit
                        </p>
                        <p
                            class="home-menu-selection-item-content-list-text"
                        >
                            - Vegetable
                        </p>
                        <p
                            class="home-menu-selection-item-content-list-text"
                        >
                            - Tomato
                        </p>
                    </div>
                    <div
                        class="home-menu-selection-item-content-list-column"
                    >
                        <p
                            class="home-menu-selection-item-content-list-text"
                        >
                            - Chicken
                        </p>
                        <p
                            class="home-menu-selection-item-content-list-text"
                        >
                            - Milk
                        </p>
                        <p
                            class="home-menu-selection-item-content-list-text"
                        >
                            - Chilli
                        </p>
                    </div>
                    <div
                        class="home-menu-selection-item-content-list-column"
                    >
                        <p
                            class="home-menu-selection-item-content-list-text"
                        >
                            - Cherry
                        </p>
                        <p
                            class="home-menu-selection-item-content-list-text"
                        >
                            - Potato
                        </p>
                        <p
                            class="home-menu-selection-item-content-list-text"
                        >
                            - Sesame
                        </p>
                    </div>
                </div>
            </div>
            <div
                class="home-menu-selection-item-price-wrap"
            >
                <h4 class="home-menu-selection-item-price">
                    $20.00
                </h4>
            </div>
        `;

		homeMenuSelectionContent.appendChild(domItem);
	});
};

const filterMeals = (tagParam) => {
	let tag = tagParam.toLowerCase();
	const items = [...homeMenuSelectionContent.children];

	if (tag === "all") {
		items.forEach((item) => (item.style.display = "flex"));
	} else {
		items.forEach((item) => {
			if (item.getAttribute("data-tags").split(",").includes(tag)) {
				item.style.display = "flex";
			} else {
				item.style.display = "none";
			}
		});
	}
};

menuBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		// Clear and set active class
		menuBtns.forEach((btn) => {
			if (btn.classList.contains("home-menu-selection-btn-active")) {
				btn.classList.remove("home-menu-selection-btn-active");
			}
		});

		btn.classList.add("home-menu-selection-btn-active");

		// Filter Meals
		filterMeals(btn.textContent.trim());
	});
});

getMeals();
