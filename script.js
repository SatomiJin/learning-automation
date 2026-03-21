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
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ══════════════════════════════════════
   4. READ PROGRESS BAR (scroll)
══════════════════════════════════════ */
window.addEventListener("scroll", () => {
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct = Math.round((window.scrollY / docH) * 100);
  const el = document.getElementById("progressFill");
  if (el) el.style.width = pct + "%";
});

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
const NOTES_KEY = "aqc_notes_v1";

function loadNotes() {
  try {
    return JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
  } catch {
    return {};
  }
}
function saveNotes(notes) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function initNotes() {
  const notes = loadNotes();
  document.querySelectorAll('[id^="note-text-"]').forEach((ta) => {
    const tid = ta.id.replace("note-text-", "");
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
  const tid = ta.id.replace("note-text-", "");
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
  // Find dot: it's in same topic-card as the note-area
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
const STORE_KEY = "aqc_progress_v1";

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch {
    return {};
  }
}
function saveState(state) {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function initCheckboxes() {
  const state = loadState();
  document.querySelectorAll(".ex-check").forEach((cb) => {
    if (state[cb.id]) {
      cb.checked = true;
      cb.closest(".ex-item").classList.add("done");
    }
  });
  document.querySelectorAll(".milestone-check").forEach((cb) => {
    if (state[cb.id]) {
      cb.checked = true;
      cb.closest("li").classList.add("done");
    }
  });
  updateAllProgress();
}

function onCheck(cb) {
  const state = loadState();
  state[cb.id] = cb.checked;
  saveState(state);
  cb.closest(".ex-item").classList.toggle("done", cb.checked);
  updateAllProgress();
}

function toggleMilestone(li) {
  const cb = li.querySelector(".milestone-check");
  cb.checked = !cb.checked;
  const state = loadState();
  state[cb.id] = cb.checked;
  saveState(state);
  li.classList.toggle("done", cb.checked);
  updateAllProgress();
}

function calcPhaseProgress(phaseNum) {
  const phaseEl = document.querySelector(`[data-phase="${phaseNum}"]`);
  if (!phaseEl) return { done: 0, total: 0 };
  const all = phaseEl.querySelectorAll(".ex-check, .milestone-check");
  const done = [...all].filter((cb) => cb.checked).length;
  return { done, total: all.length };
}

function updateAllProgress() {
  let totalDone = 0,
    totalAll = 0;
  [1, 2, 3].forEach((p) => {
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

/* ── Bootstrap ── */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCheckboxes();
  initNotes();
  loadPhases();
});

/* ══════════════════════════════════════
   9. DYNAMIC PHASE LOADING
══════════════════════════════════════ */
async function loadPhases() {
  const phases = [
    { id: "phase1-placeholder", file: "phase1.html" },
    { id: "phase2-placeholder", file: "phase2.html" },
    { id: "phase3-placeholder", file: "phase3.html" },
  ];

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
}
