// navigation.js — apparition progressive des sections au défilement,
// bouton de changement de langue dans le footer, respect de
// prefers-reduced-motion (§23, §25).

document.addEventListener("DOMContentLoaded", () => {
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	document.querySelectorAll("[data-game-link]").forEach((el) => {
		el.setAttribute("href", CONFIG.GAME_URL);
	});

	if (!reducedMotion && "IntersectionObserver" in window) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("in-view");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15 }
		);
		document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
	} else {
		document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
	}

	const tabButtons = document.querySelectorAll(".install-tab-btn");
	tabButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			tabButtons.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");
			document.querySelectorAll(".install-panel").forEach((p) => p.classList.remove("active"));
			document.getElementById(`install-${btn.dataset.tab}`).classList.add("active");
		});
	});

	document.querySelectorAll("[data-switch-lang]").forEach((el) => {
		el.addEventListener("click", () => setLanguage(el.dataset.switchLang));
	});
});
