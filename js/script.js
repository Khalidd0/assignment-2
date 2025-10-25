(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // STATE
  const STATE = {
    theme: localStorage.getItem("theme") || "light",
    username: localStorage.getItem("username") || "",
    projects: [
      {
        id: 1,
        title: "Pipelined Processor Design",
        category: "systems",
        date: "2025-02-10",
        tags: ["Digital", "5-stage", "Hazards"],
        img: "assets/images/project1.png",
        description:
          "Designed a 5-stage pipelined CPU (IF, ID, EX, MEM, WB) with hazard handling and improved throughput."
      },
      {
        id: 2,
        title: "KFUPM Transportation System",
        category: "app",
        date: "2025-01-25",
        tags: ["Maps", "Campus", "UX"],
        img: "assets/images/project2.png",
        description:
          "Campus navigation app for KFUPM with building search and optimized routes tailored to student needs."
      }
    ],
    filter: "all",
    sort: "recent",
    search: ""
  };

  // THEME TOGGLE
  document.documentElement.setAttribute("data-theme", STATE.theme);
  const themeToggle = $("#theme-toggle");
  const setThemeUI = () => {
    themeToggle.textContent = STATE.theme === "dark" ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-pressed", String(STATE.theme === "dark"));
  };
  setThemeUI();
  themeToggle.addEventListener("click", () => {
    STATE.theme = STATE.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", STATE.theme);
    localStorage.setItem("theme", STATE.theme);
    setThemeUI();
  });

  // GREETING
  const greetingName = $("#greeting-name");
  const greetingTime = $("#greeting-time");
  const greetingComma = $("#greeting-comma");
  const partOfDay = () => {
    const h = new Date().getHours();
    return h < 12 ? "morning" : h < 18 ? "afternoon" : "evening";
  };
  const setGreeting = () => {
    greetingTime.textContent = partOfDay();
    if (STATE.username) {
      greetingName.textContent = STATE.username;
      greetingComma.hidden = false;
    } else {
      greetingName.textContent = "there";
      greetingComma.hidden = true;
    }
  };
  setGreeting();

  $("#set-name").addEventListener("click", () => {
    const name = prompt("What is your name?");
    if (name && name.trim().length >= 2) {
      STATE.username = name.trim();
      localStorage.setItem("username", STATE.username);
      setGreeting();
    }
  });

  // PROJECT RENDERING
  const grid = $("#projects-grid");
  const emptyState = $("#empty-state");
  const renderProjects = () => {
    let data = [...STATE.projects];
    if (STATE.filter !== "all") data = data.filter(p => p.category === STATE.filter);
    if (STATE.search) {
      const q = STATE.search.toLowerCase();
      data = data.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.tags.join(" ").toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    switch (STATE.sort) {
      case "recent": data.sort((a, b) => b.date.localeCompare(a.date)); break;
      case "oldest": data.sort((a, b) => a.date.localeCompare(b.date)); break;
      case "az": data.sort((a, b) => a.title.localeCompare(b.title)); break;
      case "za": data.sort((a, b) => b.title.localeCompare(a.title)); break;
    }
    grid.innerHTML = "";
    if (!data.length) { emptyState.hidden = false; return; }
    emptyState.hidden = true;
    for (const p of data) {
      const card = document.createElement("article");
      card.className = "project fade-in";
      card.innerHTML = `
        ${p.img ? `<img src="${p.img}" alt="${p.title}">` : ""}
        <h4>${p.title}</h4>
        <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <small class="muted">Category: ${p.category} • ${new Date(p.date).toLocaleDateString()}</small>
        <details>
          <summary>Details</summary>
          <p>${p.description}</p>
        </details>`;
      grid.appendChild(card);
    }
    observeInView();
  };
  $("#filter").addEventListener("change", e => { STATE.filter = e.target.value; renderProjects(); });
  $("#sort").addEventListener("change", e => { STATE.sort = e.target.value; renderProjects(); });
  $("#search").addEventListener("input", e => { STATE.search = e.target.value; renderProjects(); });

  // FADE-IN ANIMATIONS
  const observeInView = () => {
    const els = $$(".fade-in");
    const io = new IntersectionObserver((entries) => {
      for (const ent of entries) if (ent.isIntersecting) ent.target.classList.add("in-view");
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    els.forEach(el => io.observe(el));
  };

 
  const factEl = $("#fact-text");
  const factLoading = $("#fact-loading");
  const factError = $("#fact-error");

  const OFFLINE_QUOTES = [
    { q: "Code is like humor. When you have to explain it, it’s bad.", a: "Cory House" },
    { q: "Simplicity is the soul of efficiency.", a: "Austin Freeman" },
    { q: "The best error message is the one that never shows up.", a: "Thomas Fuchs" },
    { q: "The only way to learn a new programming language is by writing programs in it.", a: "Dennis Ritchie" },
  ];

  async function loadFact() {
    factError.hidden = true;
    factLoading.hidden = false;
    try {
      const res = await fetch("https://dummyjson.com/quotes/random", { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      factEl.textContent = `“${data.quote}” — ${data.author}`;
    } catch (err) {
      console.error("Quote fetch failed:", err);
      const fallback = OFFLINE_QUOTES[Math.floor(Math.random() * OFFLINE_QUOTES.length)];
      factEl.textContent = `“${fallback.q}” — ${fallback.a} (offline)`;
      factError.hidden = false;
    } finally {
      factLoading.hidden = true;
    }
  }

  $("#load-fact").addEventListener("click", loadFact);
  $("#fact-retry").addEventListener("click", loadFact);

  // CONTACT FORM
  const form = $("#contact-form");
  const errName = $("#err-name");
  const errEmail = $("#err-email");
  const errMsg = $("#err-message");
  const loading = $("#form-loading");
  const ok = $("#form-success");
  const fail = $("#form-failure");
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  const draftKey = "contactDraft";

  const syncDraftFromUI = () => {
    const draft = { name: $("#name").value, email: $("#email").value, message: $("#message").value };
    localStorage.setItem(draftKey, JSON.stringify(draft));
  };
  const loadDraft = () => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d.name) $("#name").value = d.name;
      if (d.email) $("#email").value = d.email;
      if (d.message) $("#message").value = d.message;
    } catch {}
  };
  ["input", "change"].forEach(evt => form.addEventListener(evt, syncDraftFromUI));
  loadDraft();

  const show = (el, on = true) => (el.hidden = !on);
  const validate = () => {
    let good = true;
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const msg = $("#message").value.trim();
    show(errName, name.length < 1); if (name.length < 1) good = false;
    show(errEmail, !emailRegex.test(email)); if (!emailRegex.test(email)) good = false;
    show(errMsg, msg.length < 10); if (msg.length < 10) good = false;
    return good;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    ok.hidden = true; fail.hidden = true; show(loading, true);
    if (!validate()) { show(loading, false); return; }
    try {
      await new Promise(r => setTimeout(r, 900));
      ok.hidden = false;
      localStorage.removeItem(draftKey);
      form.reset();
    } catch (err) {
      console.error(err);
      fail.hidden = false;
    } finally {
      show(loading, false);
    }
  });

  $("#year").textContent = new Date().getFullYear();
  renderProjects();
  observeInView();
})();
