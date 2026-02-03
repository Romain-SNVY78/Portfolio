/* =========================
PORTFOLIO E5 — BTS SIO SLAM
========================= */

/* ====== CONFIG ====== */
const PROFILE = {
  name: "Romain SANJIVY",
  chips: ["Java", "PHP", "JavaScript", "SQL", "Docker", "Git"]
};

// 💡 On ne garde que TES 3 PROJETS
const PROJECTS = [
  {
    id: "p4",
    titre: "RMS Ticket",
    contexte: "Projet de groupe",
    periode: "2025-2026",
    desc: "Application web de gestion de tickets développée en équipe.",
    tags: ["Groupe", "Web", "PHP", "MySQL", "Back-end"],
    liens: [{ label: "GitHub", url: "#" }]
  },
  {
    id: "p5",
    titre: "Le Muscle Sympa",
    contexte: "Projet individuel",
    periode: "2025-2026",
    desc: "Site web vitrine pour une salle de sport développé en autonomie.",
    tags: ["Solo", "PHP", "MySQL", "JavaScript", "CSS"],
    liens: [
      { label: "Voir le site", url: "http://lms.testoxylog.fr/" },
      { label: "GitHub", url: "https://github.com/Romain-SNVY78/Le_Muscle_Sympa" }
    ]
  },
  {
    id: "p6",
    titre: "Maison de Vacances",
    contexte: "Projet personnel (hors formation)",
    periode: "2025-2026",
    desc: "Site web de réservation pour une maison de vacances, conçu pour un usage personnel.",
    tags: ["Perso", "HTML", "CSS", "JavaScript", "Front-end"],
    liens: [
      { label: "Voir le site", url: "http://typierrot.testoxylog.fr/" },
      { label: "GitHub", url: "https://github.com/Romain-SNVY78/Maison_Kerlouan" }
    ]
  }
];

/* ====== UTILITAIRES ====== */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ====== RENDU HERO ====== */
function renderHero() {
  const chipsUl = $("#accueil .chips");
  if (chipsUl) {
    chipsUl.innerHTML = "";
    PROFILE.chips.forEach(c => {
      const li = document.createElement("li");
      li.textContent = c;
      chipsUl.appendChild(li);
    });
  }
  const h1 = $("#accueil h1");
  if (h1) h1.textContent = PROFILE.name;
}

/* ====== RENDU PROJETS ====== */
function renderProjects() {
  const grid = $("#projectsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const tpl = $("#projectCardTpl")?.content;

  PROJECTS.forEach(p => {
    let cardEl;

    if (tpl) {
      const node = tpl.cloneNode(true);
      $(".project-title", node).textContent = p.titre;
      $(".project-meta", node).textContent  = `${p.contexte} • ${p.periode}`;
      $(".project-desc", node).textContent  = p.desc;

      const tagsUl = $(".project-tags", node);
      p.tags.forEach(t => {
        const li = document.createElement("li");
        li.className = "chip";
        li.textContent = t;
        tagsUl.appendChild(li);
      });

      const linksDiv = $(".project-links", node);
      p.liens.forEach(l => {
        const a = document.createElement("a");
        a.href = l.url; a.target = "_blank"; a.rel = "noopener";
        a.textContent = l.label;
        linksDiv.appendChild(a);
      });

      cardEl = node.querySelector(".card").cloneNode(true);
    } else {
      const card = document.createElement("article");
      card.className = "card project";
      const body = document.createElement("div");
      body.className = "card-body";

      const h3 = document.createElement("h3");
      h3.className = "project-title";
      h3.textContent = p.titre;

      const meta = document.createElement("p");
      meta.className = "project-meta";
      meta.textContent = `${p.contexte} • ${p.periode}`;

      const desc = document.createElement("p");
      desc.className = "project-desc";
      desc.textContent = p.desc;

      const tagsUl = document.createElement("ul");
      tagsUl.className = "chips project-tags";
      p.tags.forEach(t => {
        const li = document.createElement("li");
        li.className = "chip";
        li.textContent = t;
        tagsUl.appendChild(li);
      });

      const linksDiv = document.createElement("div");
      linksDiv.className = "project-links";
      p.liens.forEach(l => {
        const a = document.createElement("a");
        a.href = l.url; a.target = "_blank"; a.rel = "noopener";
        a.textContent = l.label;
        linksDiv.appendChild(a);
      });

      body.append(h3, meta, desc, tagsUl, linksDiv);
      card.appendChild(body);
      cardEl = card;
    }

    cardEl.dataset.tags = p.tags.join(",");
    grid.appendChild(cardEl);
  });
}

/* ====== FILTRES ====== */
function bindFilters() {
  const chips = $$(".filters .chip");
  if (!chips.length) return;

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const filter = chip.dataset.filter;
      $$("#projectsGrid .project").forEach(card => {
        const tags = card.dataset.tags || "";
        card.style.display = (filter === "all" || !filter) ? "" : (tags.includes(filter) ? "" : "none");
      });
    });
  });
}

/* ====== NAV BURGER ====== */
function bindNav() {
  $("#navToggle")?.addEventListener("click", () => {
    const menu = $("#navMenu");
    const expanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", String(!expanded));
  });

  $$(".site-nav a").forEach(a => {
    a.addEventListener("click", e => {
      const href = a.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        $("#navMenu")?.setAttribute("aria-expanded", "false");
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ====== PRINT ====== */
function bindPrint() {
  $("#printBtn")?.addEventListener("click", () => window.open('documents/CV_Romain_SANJIVY.pdf', '_blank'));
}

/* ====== INIT ====== */
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderProjects();
  bindFilters();
  bindNav();
  bindPrint();
});
