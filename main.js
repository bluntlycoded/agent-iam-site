(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  /* Theme toggle */
  var toggle = document.querySelector("[data-theme-toggle]");
  var meta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0a0c0f" : "#f6f7f9");
  }

  applyTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("agentiam-theme", next); } catch (e) {}
    });
  }

  /* Live authorization demo */
  var authz = document.querySelector("[data-authz]");
  if (!authz) return;

  var checks = Array.prototype.slice.call(authz.querySelectorAll(".check"));
  var verdict = authz.querySelector(".verdict");
  var verdictMain = authz.querySelector("[data-verdict]");
  var verdictSub = authz.querySelector("[data-verdict-sub]");
  var replay = authz.querySelector("[data-replay]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var timers = [];

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function markDone(check) {
    check.classList.remove("active");
    check.classList.add("done");
    var fail = check.getAttribute("data-fail");
    if (fail) check.classList.add("is-" + fail);
  }

  function showFinal() {
    authz.classList.remove("playing");
    checks.forEach(markDone);
    verdict.classList.add("is-bad");
    verdictMain.textContent = "Blocked";
    verdictSub.textContent = "Denied by policy on the injection score. The transfer never reached the payments API.";
  }

  function reset() {
    clearTimers();
    checks.forEach(function (c) { c.classList.remove("active", "done", "is-warn", "is-bad"); });
    verdict.classList.remove("is-bad");
  }

  function play() {
    reset();
    if (reduceMotion.matches) { showFinal(); return; }
    authz.classList.add("playing");
    verdictMain.textContent = "Checking";
    verdictSub.textContent = "Evaluating the request inline, before it runs.";
    var step = 700;
    checks.forEach(function (check, i) {
      timers.push(setTimeout(function () { check.classList.add("active"); }, i * step + 200));
      timers.push(setTimeout(function () { markDone(check); }, i * step + 200 + step * 0.75));
    });
    timers.push(setTimeout(showFinal, checks.length * step + 300));
  }

  if (replay) replay.addEventListener("click", play);

  // Without JS the final state is already readable in the markup; with JS,
  // run the sequence once the section scrolls into view.
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    showFinal();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { play(); io.disconnect(); }
      });
    }, { threshold: 0.35 });
    io.observe(authz);
  } else {
    showFinal();
  }
})();
