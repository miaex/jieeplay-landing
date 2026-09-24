// navigation.js — apparition progressive au scroll, onglets PWA,
// transition de sortie vers le jeu, respect de prefers-reduced-motion.

document.addEventListener("DOMContentLoaded", () => {
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	document.querySelectorAll("[data-game-link]").forEach((el) => {
		el.setAttribute("href", CONFIG.GAME_URL);
	});

	// Apparition progressive des sections au scroll.
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

	// Onglets Android / iPhone.
	const tabButtons = document.querySelectorAll(".install-tab-btn");
	tabButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			tabButtons.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");
			document.querySelectorAll(".install-panel").forEach((p) => p.classList.remove("active"));
			document.getElementById(`install-${btn.dataset.tab}`).classList.add("active");
		});
	});

	// Changement de langue.
	document.querySelectorAll("[data-switch-lang]").forEach((el) => {
		el.addEventListener("click", () => setLanguage(el.dataset.switchLang));
	});

	// Transition douce avant d'entrer dans le jeu (§19) : un bref voile
	// plutôt qu'une navigation brutale. Ignorée si prefers-reduced-motion,
	// et jamais utilisée sur les liens sans véritable destination ("#").
	const veil = document.getElementById("exit-veil");
	if (veil) {
		document.querySelectorAll("[data-transition]").forEach((link) => {
			link.addEventListener("click", (e) => {
				const href = link.getAttribute("href");
				if (!href || href === "#") return; // GAME_URL pas encore configurée
				if (reducedMotion) return; // navigation normale, immédiate

				e.preventDefault();
				link.classList.add("btn-transitioning");
				veil.classList.add("active");
				setTimeout(() => { window.location.href = href; }, 420);
			});
		});
	}
});
