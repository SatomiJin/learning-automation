const TRACKS = {
  python: {
    pageTitle: "Lộ Trình Automation Test — Playwright & Python",
    sidebarSub: "Playwright + Python · 4 tháng",
    heroBadge: "📚 Study Guide · Python",
    heroTitle: "Lộ Trình <span>Automation Test</span><br>Playwright + Python",
    heroDesc:
      "Dành cho QC chưa biết Python. Từ cú pháp cơ bản đến framework hoàn chỉnh sẵn sàng apply vị trí Automation Tester.",
    stats: { months: 4, weeks: 16, milestones: 4 },
    phases: [
      { id: "phase1-placeholder", file: "phase1.html" },
      { id: "phase2-placeholder", file: "phase2.html" },
      { id: "phase3-placeholder", file: "phase3.html" },
      { id: "phase4-placeholder", file: "phase4.html" },
    ],
    navTitles: {
      p1: "Phase 1 — Python",
      p2: "Phase 2 — Playwright",
      p3: "Phase 3 — Advanced",
      p4: "Phase 4 — Enterprise UI",
    },
    navLabels: {
      "p1-w1": "Tuần 1 · Syntax & Types",
      "p1-w2": "Tuần 2 · Collections",
      "p1-w3": "Tuần 3 · File & Exceptions",
      "p1-w4": "Tuần 4 · OOP",
      "p1-milestone": "Bài tập lớn Phase 1",
      "p2-w5": "Tuần 5 · Setup & Locators",
      "p2-w6": "Tuần 6 · Actions & Assertions",
      "p2-w7": "Tuần 7 · Waits & Network",
      "p2-w8": "Tuần 8 · pytest",
      "p2-milestone": "Bài tập lớn Phase 2",
      "p3-w9": "Tuần 9 · POM",
      "p3-w10": "Tuần 10 · Reporting",
      "p3-w11": "Tuần 11 · API & CI/CD",
      "p3-w12": "Tuần 12 · Best Practices",
      "p3-milestone": "Capstone Project",
      "p4-w13": "Tuần 13 · Angular DOM",
      "p4-w14": "Tuần 14 · AntD & Material",
      "p4-w15": "Tuần 15 · Table & Overlay",
      "p4-w16": "Tuần 16 · Debug & Contracts",
      "p4-milestone": "Enterprise Challenge",
    },
  },
  typescript: {
    pageTitle: "Lộ Trình Automation Test — Playwright & TypeScript",
    sidebarSub: "Playwright + TypeScript · 4 tháng",
    heroBadge: "📚 Study Guide · TypeScript",
    heroTitle:
      "Lộ Trình <span>Automation Test</span><br>Playwright + TypeScript",
    heroDesc:
      "Dành cho QC muốn đi theo hệ JavaScript/TypeScript. Từ type system cơ bản đến Playwright Test production-ready.",
    stats: { months: 4, weeks: 16, milestones: 4 },
    phases: [
      { id: "phase1-placeholder", file: "ts-phase1.html" },
      { id: "phase2-placeholder", file: "ts-phase2.html" },
      { id: "phase3-placeholder", file: "ts-phase3.html" },
      { id: "phase4-placeholder", file: "ts-phase4.html" },
    ],
    navTitles: {
      p1: "Phase 1 — TypeScript",
      p2: "Phase 2 — Playwright + TS",
      p3: "Phase 3 — Advanced",
      p4: "Phase 4 — Enterprise UI",
    },
    navLabels: {
      "p1-w1": "Tuần 1 · Setup & Types",
      "p1-w2": "Tuần 2 · Functions & Objects",
      "p1-w3": "Tuần 3 · Async & Modules",
      "p1-w4": "Tuần 4 · Classes & DOM",
      "p1-milestone": "Bài tập lớn Phase 1",
      "p2-w5": "Tuần 5 · Setup & Locators",
      "p2-w6": "Tuần 6 · Actions & Assertions",
      "p2-w7": "Tuần 7 · Waits & Network",
      "p2-w8": "Tuần 8 · Playwright Test",
      "p2-milestone": "Bài tập lớn Phase 2",
      "p3-w9": "Tuần 9 · POM",
      "p3-w10": "Tuần 10 · Reporting",
      "p3-w11": "Tuần 11 · API & CI/CD",
      "p3-w12": "Tuần 12 · Best Practices",
      "p3-milestone": "Capstone Project",
      "p4-w13": "Tuần 13 · Angular DOM",
      "p4-w14": "Tuần 14 · AntD & Material",
      "p4-w15": "Tuần 15 · Table & Overlay",
      "p4-w16": "Tuần 16 · Debug & Contracts",
      "p4-milestone": "Enterprise Challenge",
    },
  },
};

const TRACK_STORAGE_KEY = "aqc_learning_track_v1";
let currentTrack = loadTrackPreference();

function loadTrackPreference() {
  const saved = localStorage.getItem(TRACK_STORAGE_KEY);
  return saved && TRACKS[saved] ? saved : "python";
}

function saveTrackPreference(track) {
  localStorage.setItem(TRACK_STORAGE_KEY, track);
}

function getNotesStorageKey() {
  return `aqc_notes_${currentTrack}_v2`;
}

function getProgressStorageKey() {
  return `aqc_progress_${currentTrack}_v2`;
}

function renderTrackUi() {
  const track = TRACKS[currentTrack];
  document.title = track.pageTitle;

  const sidebarSub = document.getElementById("sidebarSub");
  const heroBadge = document.getElementById("heroBadge");
  const heroTitle = document.getElementById("heroTitle");
  const heroDesc = document.getElementById("heroDesc");
  const heroMonths = document.getElementById("heroMonths");
  const heroWeeks = document.getElementById("heroWeeks");
  const heroMilestones = document.getElementById("heroMilestones");

  if (sidebarSub) sidebarSub.textContent = track.sidebarSub;
  if (heroBadge) heroBadge.textContent = track.heroBadge;
  if (heroTitle) heroTitle.innerHTML = track.heroTitle;
  if (heroDesc) heroDesc.textContent = track.heroDesc;
  if (heroMonths) heroMonths.textContent = String(track.stats.months);
  if (heroWeeks) heroWeeks.textContent = String(track.stats.weeks);
  if (heroMilestones) heroMilestones.textContent = String(track.stats.milestones);

  ["python", "typescript"].forEach((name) => {
    const btn = document.getElementById(`track-${name}`);
    if (!btn) return;
    const isActive = name === currentTrack;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  ["p1", "p2", "p3", "p4"].forEach((phaseId) => {
    const titleEl = document.getElementById(`nav-title-${phaseId}`);
    if (titleEl) titleEl.textContent = track.navTitles[phaseId];
  });

  Object.entries(track.navLabels).forEach(([id, label]) => {
    const labelEl = document.getElementById(`nav-label-${id}`);
    if (labelEl) labelEl.textContent = label;
  });
}

/* ══════════════════════════════════════
   1. TOPIC ACCORDION
══════════════════════════════════════ */
function toggleTopic(header) {
  const body = header.nextElementSibling;
  const toggle = header.querySelector(".topic-toggle");
  const isOpen = body.classList.contains("open");
  body.classList.toggle("open", !isOpen);
  toggle.classList.toggle("open", !isOpen);
}

/* ══════════════════════════════════════
   2. COPY CODE
══════════════════════════════════════ */
function copyCode(btn) {
  const pre = btn.closest(".code-block").querySelector("pre");
  navigator.clipboard.writeText(pre.innerText).then(() => {
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = "Copy"), 2000);
  });
}

/* ══════════════════════════════════════
   3. SMOOTH SCROLL
══════════════════════════════════════ */
document.querySelectorAll(".nav-item[href]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const el = document.getElementById(link.getAttribute("href").slice(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update active nav item after scroll completes
      setTimeout(updateActiveNavItem, 500);
    }
  });
});

/* ══════════════════════════════════════
   4. READ PROGRESS BAR (scroll)
══════════════════════════════════════ */
function updateActiveNavItem() {
  const navItems = document.querySelectorAll(".nav-item[href]");
  let currentSection = null;
  let maxVisibility = 0;

  // Find section with largest visible area in viewport
  navItems.forEach((item) => {
    const sectionId = item.getAttribute("href").slice(1);
    const section = document.getElementById(sectionId);
    if (!section) return;

    const rect = section.getBoundingClientRect();

    // Calculate how much of the section is visible
    const viewportTop = 0;
    const viewportBottom = window.innerHeight;

    const elementTop = Math.max(rect.top, viewportTop);
    const elementBottom = Math.min(rect.bottom, viewportBottom);

    const visibleHeight = Math.max(0, elementBottom - elementTop);

    // Pick section with most visible area, prioritize sections that start above viewport
    if (visibleHeight > 0) {
      let score = visibleHeight;
      // If section header is above viewport, give it bonus (it's the one we're reading)
      if (rect.top < 100 && rect.bottom > 100) {
        score *= 1.5;
      }

      if (score > maxVisibility) {
        maxVisibility = score;
        currentSection = item;
      }
    }
  });

  // Remove active classes from all nav items
  navItems.forEach((item) => {
    item.classList.remove("active", "p2-active", "p3-active", "p4-active");
  });

  // Add appropriate active class to current section's nav item
  if (currentSection) {
    const sectionId = currentSection.getAttribute("href").slice(1);
    if (sectionId.startsWith("p1-")) {
      currentSection.classList.add("active");
    } else if (sectionId.startsWith("p2-")) {
      currentSection.classList.add("p2-active");
    } else if (sectionId.startsWith("p3-")) {
      currentSection.classList.add("p3-active");
    } else if (sectionId.startsWith("p4-")) {
      currentSection.classList.add("p4-active");
    }
  }
}

const scrollContainer = document.querySelector(".main") || window;

function getScrollInfo() {
  if (scrollContainer === window) {
    const docH = document.documentElement.scrollHeight;
    const winH = window.innerHeight;
    const scrollY = window.scrollY;
    return { scrollTop: scrollY, scrollHeight: docH, clientHeight: winH };
  }
  return {
    scrollTop: scrollContainer.scrollTop,
    scrollHeight: scrollContainer.scrollHeight,
    clientHeight: scrollContainer.clientHeight,
  };
}

function updateProgressBar() {
  const info = getScrollInfo();
  const docH = info.scrollHeight - info.clientHeight;
  const pct = docH > 0 ? Math.round((info.scrollTop / docH) * 100) : 0;
  const el = document.getElementById("progressFill");
  if (el) el.style.width = `${pct}%`;
}

function onScrollHandler() {
  updateProgressBar();
  updateActiveNavItem();
}

if (scrollContainer === window) {
  window.addEventListener("scroll", onScrollHandler);
} else {
  scrollContainer.addEventListener("scroll", onScrollHandler);
}

/* ══════════════════════════════════════
   5. THEME TOGGLE (Light / Dark)
══════════════════════════════════════ */
function initTheme() {
  const saved = localStorage.getItem("aqc_theme") || "dark";
  applyTheme(saved, false);
}

function applyTheme(theme, save = true) {
  const isLight = theme === "light";
  document.documentElement.classList.toggle("light", isLight);
  const btn = document.getElementById("themeBtn");
  if (btn) btn.textContent = isLight ? "☀️" : "🌙";
  if (save) localStorage.setItem("aqc_theme", theme);
}

function toggleTheme() {
  const isLight = document.documentElement.classList.contains("light");
  applyTheme(isLight ? "dark" : "light");
}

/* ══════════════════════════════════════
   6. SEARCH
══════════════════════════════════════ */
let searchTimer = null;

function onSearch(val) {
  clearTimeout(searchTimer);
  const clearBtn = document.getElementById("clearBtn");
  if (clearBtn) clearBtn.classList.toggle("show", val.length > 0);
  searchTimer = setTimeout(() => runSearch(val.trim()), 180);
}

function clearSearch() {
  const inp = document.getElementById("searchInput");
  if (inp) {
    inp.value = "";
    inp.focus();
  }
  const clearBtn = document.getElementById("clearBtn");
  if (clearBtn) clearBtn.classList.remove("show");
  runSearch("");
}

function runSearch(term) {
  const noRes = document.getElementById("noResults");
  const termEl = document.getElementById("noResultsTerm");

  // Remove old highlights
  document.querySelectorAll(".search-highlight").forEach((el) => {
    el.outerHTML = el.textContent;
  });

  if (!term) {
    // Reset: show everything
    document.querySelectorAll(".topic-card, .week-block").forEach((el) => {
      el.classList.remove("search-hidden", "search-match");
    });
    if (noRes) noRes.style.display = "none";
    return;
  }

  const termLower = term.toLowerCase();
  let anyVisible = false;

  document.querySelectorAll(".topic-card").forEach((card) => {
    // Search in topic name + desc + theory text (exclude code)
    const nameEl = card.querySelector(".topic-name");
    const descEl = card.querySelector(".topic-desc");
    const theoryEls = card.querySelectorAll(
      ".theory-section p, .tip-content, .section-label",
    );

    const searchableText = [
      nameEl?.textContent || "",
      descEl?.textContent || "",
      ...[...theoryEls].map((el) => el.textContent),
    ]
      .join(" ")
      .toLowerCase();

    const matches = searchableText.includes(termLower);

    card.classList.toggle("search-hidden", !matches);
    card.classList.toggle("search-match", matches);

    if (matches) {
      anyVisible = true;
      // Highlight matches in topic-name and topic-desc
      [nameEl, descEl, ...theoryEls].forEach((el) => {
        if (!el) return;
        highlightInElement(el, term);
      });
      // Auto-open body
      const body = card.querySelector(".topic-body");
      const toggle = card.querySelector(".topic-toggle");
      if (body) body.classList.add("open");
      if (toggle) toggle.classList.add("open");
    }
  });

  // Hide week-blocks that have no visible cards
  document.querySelectorAll(".week-block").forEach((week) => {
    const visibleCards = [...week.querySelectorAll(".topic-card")].filter(
      (c) => !c.classList.contains("search-hidden"),
    );
    week.classList.toggle("search-hidden", visibleCards.length === 0);
  });

  if (noRes) {
    noRes.style.display = anyVisible ? "none" : "block";
    if (termEl) termEl.textContent = term;
  }
}

function highlightInElement(el, term) {
  // Only highlight in text nodes, skip children with complex content
  if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
    const text = el.textContent;
    const idx = text.toLowerCase().indexOf(term.toLowerCase());
    if (idx === -1) return;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + term.length);
    const after = text.slice(idx + term.length);
    el.innerHTML = `${escHtml(before)}<span class="search-highlight">${escHtml(match)}</span>${escHtml(after)}`;
  }
}

function escHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ══════════════════════════════════════
   7. NOTES SYSTEM
══════════════════════════════════════ */
function loadNotes() {
  try {
    return JSON.parse(localStorage.getItem(getNotesStorageKey())) || {};
  } catch {
    return {};
  }
}
function saveNotes(notes) {
  localStorage.setItem(getNotesStorageKey(), JSON.stringify(notes));
}

function getNoteKeyFromTextarea(ta) {
  return ta?.dataset.noteKey || ta?.id.replace("note-text-", "");
}

function initNotes() {
  const notes = loadNotes();
  document.querySelectorAll(".note-textarea").forEach((ta) => {
    const tid = getNoteKeyFromTextarea(ta);
    const saved = notes[tid] || "";
    ta.value = saved;
    updateNoteDot(tid, saved);
    updateNoteBtn(tid, saved);
  });
}

function toggleNote(tid) {
  const area = document.getElementById(`note-area-${tid}`);
  const ta = document.getElementById(`note-text-${tid}`);
  if (!area) return;
  const isOpen = area.classList.contains("open");
  area.classList.toggle("open", !isOpen);
  if (!isOpen && ta) setTimeout(() => ta.focus(), 60);
}

function handleNoteInput(ta) {
  const tid = getNoteKeyFromTextarea(ta);
  autoSaveNote(tid);
}

let noteSaveTimers = {};
function autoSaveNote(tid) {
  clearTimeout(noteSaveTimers[tid]);
  noteSaveTimers[tid] = setTimeout(() => {
    const ta = document.getElementById(`note-text-${tid}`);
    if (!ta) return;
    const val = ta.value;
    const notes = loadNotes();
    if (val.trim()) {
      notes[tid] = val;
    } else {
      delete notes[tid];
    }
    saveNotes(notes);
    updateNoteDot(tid, val);
    updateNoteBtn(tid, val);
    // Flash saved message
    const savedMsg = document.getElementById(`note-saved-${tid}`);
    if (savedMsg) {
      savedMsg.classList.add("show");
      setTimeout(() => savedMsg.classList.remove("show"), 1800);
    }
  }, 600);
}

function clearNote(tid) {
  const ta = document.getElementById(`note-text-${tid}`);
  if (ta) ta.value = "";
  const notes = loadNotes();
  delete notes[tid];
  saveNotes(notes);
  updateNoteDot(tid, "");
  updateNoteBtn(tid, "");
}

function updateNoteDot(tid, val) {
  const area = document.getElementById(`note-area-${tid}`);
  if (!area) return;
  const card = area.closest(".topic-card");
  if (!card) return;
  const dot = card.querySelector(".note-dot");
  if (dot) dot.classList.toggle("show", val.trim().length > 0);
}

function updateNoteBtn(tid, val) {
  const btn = document.getElementById(`note-btn-${tid}`);
  if (!btn) return;
  const hasNote = val.trim().length > 0;
  btn.classList.toggle("has-note", hasNote);
  btn.textContent = hasNote ? "📝 Ghi chú (có nội dung)" : "📝 Ghi chú";
}

/* ══════════════════════════════════════
   8. CHECKBOX + PROGRESS SYSTEM
══════════════════════════════════════ */
function loadState() {
  try {
    return JSON.parse(localStorage.getItem(getProgressStorageKey())) || {};
  } catch {
    return {};
  }
}
function saveState(state) {
  localStorage.setItem(getProgressStorageKey(), JSON.stringify(state));
}

function getProgressKey(cb) {
  return cb.dataset.progressKey || cb.id;
}

function initCheckboxes() {
  const state = loadState();
  document.querySelectorAll(".ex-check").forEach((cb) => {
    const key = getProgressKey(cb);
    if (state[key]) {
      cb.checked = true;
      cb.closest(".ex-item").classList.add("done");
    } else {
      cb.checked = false;
      cb.closest(".ex-item").classList.remove("done");
    }
  });
  document.querySelectorAll(".milestone-check").forEach((cb) => {
    const key = getProgressKey(cb);
    if (state[key]) {
      cb.checked = true;
      cb.closest("li").classList.add("done");
    } else {
      cb.checked = false;
      cb.closest("li").classList.remove("done");
    }
  });
  updateAllProgress();
}

function onCheck(cb) {
  const state = loadState();
  state[getProgressKey(cb)] = cb.checked;
  saveState(state);
  cb.closest(".ex-item").classList.toggle("done", cb.checked);
  updateAllProgress();
}

function toggleMilestone(li) {
  const cb = li.querySelector(".milestone-check");
  cb.checked = !cb.checked;
  const state = loadState();
  state[getProgressKey(cb)] = cb.checked;
  saveState(state);
  li.classList.toggle("done", cb.checked);
  updateAllProgress();
}

function calcPhaseProgress(phaseNum) {
  // Primary: count trong phase block (nếu tồn tại)
  const phaseEl = document.querySelector(`[data-phase="${phaseNum}"]`);
  let checkEls = [];

  if (phaseEl) {
    checkEls = [...phaseEl.querySelectorAll(".ex-check, .milestone-check")];
  }

  // Fallback: nếu phase block thiếu tuần, đảm bảo lấy theo week id pattern
  if (!checkEls.length) {
    checkEls = [
      ...document.querySelectorAll(
        `.week-block[id^="p${phaseNum}-"] .ex-check, .week-block[id^="p${phaseNum}-"] .milestone-check`,
      ),
    ];
  }

  // Nếu phaseEl có nhưng vẫn thiếu, thêm check từ tuần tương ứng luôn
  if (phaseEl) {
    const extra = [
      ...document.querySelectorAll(
        `.week-block[id^="p${phaseNum}-"] .ex-check, .week-block[id^="p${phaseNum}-"] .milestone-check`,
      ),
    ];
    extra.forEach((el) => {
      if (!checkEls.includes(el)) checkEls.push(el);
    });
  }

  const done = checkEls.filter((cb) => cb.checked).length;
  return { done, total: checkEls.length };
}

function updateAllProgress() {
  let totalDone = 0,
    totalAll = 0;
  const phaseNumbers = TRACKS[currentTrack].phases.map((_, index) => index + 1);
  phaseNumbers.forEach((p) => {
    const { done, total } = calcPhaseProgress(p);
    totalDone += done;
    totalAll += total;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const barEl = document.getElementById(`bar-phase${p}`);
    const pctEl = document.getElementById(`pct-phase${p}`);
    const taskEl = document.getElementById(`tasks-phase${p}`);
    const ppEl = document.getElementById(`p${p}pct`);
    if (barEl) barEl.style.width = pct + "%";
    if (pctEl) pctEl.textContent = pct + "%";
    if (taskEl) taskEl.textContent = `${done} / ${total} nhiệm vụ hoàn thành`;
    if (ppEl) ppEl.textContent = pct + "%";
  });
  const overallPct =
    totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;
  const fillEl = document.getElementById("overallBarFill");
  const pctEl2 = document.getElementById("overallPct");
  const heroEl = document.getElementById("heroTotalTasks");
  const badgeEl = document.getElementById("doneBadge");
  if (fillEl) fillEl.style.width = overallPct + "%";
  if (pctEl2) pctEl2.textContent = overallPct + "%";
  if (heroEl) heroEl.textContent = totalAll;
  if (badgeEl) {
    badgeEl.innerHTML =
      overallPct === 100 ? "🎉 Hoàn thành!" : `${totalDone}/${totalAll} tasks`;
    badgeEl.style.color = overallPct === 100 ? "var(--p2)" : "";
  }
  // Sidebar week dots
  document.querySelectorAll(".week-block[id]").forEach((week) => {
    const checks = week.querySelectorAll(".ex-check, .milestone-check");
    if (!checks.length) return;
    const done = [...checks].filter((cb) => cb.checked).length;
    const allDone = done === checks.length;
    const navLink = document.querySelector(`.nav-item[href="#${week.id}"]`);
    if (!navLink) return;
    let prog = navLink.querySelector(".nav-progress");
    if (!prog) {
      prog = document.createElement("span");
      prog.className = "nav-progress";
      navLink.appendChild(prog);
    }
    prog.textContent = `${done}/${checks.length}`;
    navLink.classList.toggle("all-done", allDone);
  });
}

function normalizeExerciseIds() {
  document.querySelectorAll(".ex-item").forEach((item, index) => {
    const cb = item.querySelector(".ex-check");
    if (!cb) return;

    const oldId = cb.id || `ex-${index + 1}`;
    const weekId =
      cb.closest(".week-block")?.id ||
      cb.closest(".milestone-card")?.id ||
      `track-${currentTrack}`;
    const newId = `${currentTrack}-${weekId}-exercise-${index + 1}`;

    cb.id = newId;
    cb.dataset.progressKey = newId;

    const label = item.querySelector(`label[for="${oldId}"]`);
    if (label) label.setAttribute("for", newId);
  });

  document.querySelectorAll(".milestone-check").forEach((cb, index) => {
    const phaseId =
      cb.closest(".milestone-card")?.id ||
      cb.closest("[data-phase]")?.dataset.phase ||
      "milestone";
    const newId = `${currentTrack}-${phaseId}-milestone-${index + 1}`;
    cb.id = newId;
    cb.dataset.progressKey = newId;
  });
}

function normalizeNoteIds() {
  document.querySelectorAll(".note-area").forEach((area, index) => {
    const uniqueKey = `${currentTrack}-note-${index + 1}`;
    const textarea = area.querySelector(".note-textarea");
    const savedMsg = area.querySelector(".note-saved-msg");
    const clearBtn = area.querySelector(".note-clear-btn");
    const toggleBtn =
      area.parentElement?.querySelector(".note-toggle-btn") || null;
    const dot = area.closest(".topic-card")?.querySelector(".note-dot");

    area.id = `note-area-${uniqueKey}`;

    if (textarea) {
      textarea.id = `note-text-${uniqueKey}`;
      textarea.dataset.noteKey = uniqueKey;
      textarea.setAttribute("oninput", "handleNoteInput(this)");
    }

    if (savedMsg) savedMsg.id = `note-saved-${uniqueKey}`;
    if (clearBtn) clearBtn.setAttribute("onclick", `clearNote('${uniqueKey}')`);
    if (toggleBtn) {
      toggleBtn.id = `note-btn-${uniqueKey}`;
      toggleBtn.setAttribute("onclick", `toggleNote('${uniqueKey}')`);
    }
    if (dot) dot.id = `note-dot-${uniqueKey}`;
  });
}

function normalizeInteractiveElements() {
  normalizeExerciseIds();
  normalizeNoteIds();
}

function clearSearchState() {
  const inp = document.getElementById("searchInput");
  if (inp) inp.value = "";
  const clearBtn = document.getElementById("clearBtn");
  if (clearBtn) clearBtn.classList.remove("show");
}

function resetPhasePlaceholders() {
  document.querySelectorAll(".phase-placeholder").forEach((placeholder) => {
    placeholder.innerHTML = "";
    placeholder.classList.remove("loaded");
  });
}

function switchTrack(track) {
  if (!TRACKS[track] || track === currentTrack) return;
  currentTrack = track;
  saveTrackPreference(track);
  clearSearchState();

  if (scrollContainer !== window) {
    scrollContainer.scrollTop = 0;
  } else {
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  loadPhases();
}

/* ── Bootstrap ── */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderTrackUi();
  loadPhases();
});

/* ══════════════════════════════════════
   9. DYNAMIC PHASE LOADING
══════════════════════════════════════ */
async function loadPhases() {
  renderTrackUi();
  resetPhasePlaceholders();

  const phases = TRACKS[currentTrack].phases;

  for (const phase of phases) {
    try {
      const response = await fetch(phase.file);
      if (response.ok) {
        const html = await response.text();
        const placeholder = document.getElementById(phase.id);
        if (placeholder) {
          placeholder.innerHTML = html;
          placeholder.classList.add("loaded");
        }
      } else {
        console.error(`Failed to load ${phase.file}: ${response.status}`);
        const placeholder = document.getElementById(phase.id);
        if (placeholder) {
          placeholder.innerHTML = `<div class="phase-error">Không thể tải ${phase.file}</div>`;
        }
      }
    } catch (error) {
      console.error(`Error loading ${phase.file}:`, error);
      const placeholder = document.getElementById(phase.id);
      if (placeholder) {
        placeholder.innerHTML = `<div class="phase-error">Lỗi khi tải ${phase.file}</div>`;
      }
    }
  }

  normalizeInteractiveElements();
  initCheckboxes();
  initNotes();
  runSearch(document.getElementById("searchInput")?.value.trim() || "");

  setTimeout(() => {
    updateActiveNavItem();
    updateProgressBar();
  }, 100);
}
