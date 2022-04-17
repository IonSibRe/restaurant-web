const navHamburgerBtn = document.querySelector(".nav-hamburger-btn");
const navMobileWrap = document.querySelector(".nav-mobile-wrap");
const navMobileLinks = document.querySelectorAll(".nav-mobile-link");

navHamburgerBtn.addEventListener("click", () => {
	let linksHeight = 16 * navMobileLinks.length;
	navMobileLinks.forEach((link) => (linksHeight += link.clientHeight));

	if (!navMobileWrap.style.height || navMobileWrap.style.height === "0px") {
		navMobileWrap.style.height = `${linksHeight}px`;
	} else {
		navMobileWrap.style.height = "0px";
	}
});
