// language.js — détection de la langue du navigateur (sans jamais
// l'imposer) et mémorisation du choix (§9 du cahier des charges).

const LANG_KEY = "jieeplay_landing_lang";

function getPreferredLanguage() {
	const saved = localStorage.getItem(LANG_KEY);
	if (saved === "fr" || saved === "en") return saved;

	const browserLang = (navigator.language || "fr").toLowerCase();
	return browserLang.startsWith("fr") ? "fr" : "en";
}

function setLanguage(lang) {
	localStorage.setItem(LANG_KEY, lang);
}

/** Pour la page racine : suggère la langue du navigateur en la mettant
 * en avant visuellement, sans jamais rediriger automatiquement — le
 * visiteur choisit toujours lui-même (§9). */
function suggestBrowserLanguage() {
	const browserLang = (navigator.language || "").toLowerCase();
	const suggested = browserLang.startsWith("fr") ? "fr" : "en";
	const btn = document.querySelector(`[data-lang-btn="${suggested}"]`);
	if (btn) btn.classList.add("lang-suggested");
}
