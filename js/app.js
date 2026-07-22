/* BoomTap site — drum grid demo + page interactions */
(function () {
  "use strict";

  /* ============ sequencer data ============ */

  var STEPS = 16;
  var ROWS = [
    { id: "kick", label: "Kick" },
    { id: "snare", label: "Snare" },
    { id: "chh", label: "Hat" },
    { id: "ohh", label: "Open hat" }
  ];

  // Fixed micro-timing per step, as a fraction of one 16th note.
  // This is the "groove template": deterministic, human-ish, never random.
  var GROOVE = [0, 0.16, -0.1, 0.2, 0.02, 0.14, -0.07, 0.24,
                0, 0.11, -0.12, 0.18, 0.03, 0.15, -0.08, 0.26];

  var PRESETS = {
    boots: {
      bpm: 92,
      kick:  [1, 0, 0, 0, 0, 0, 0, .8, 0, 0, 1, 0, 0, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      chh:   [.8, 0, .5, 0, .8, 0, .5, 0, .8, 0, .5, 0, .8, 0, 0, .4],
      ohh:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
    },
    trap: {
      bpm: 140,
      kick:  [1, 0, 0, .9, 0, 0, 0, 0, 0, 0, .9, 0, 0, .8, 0, 0],
      snare: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      chh:   [.7, .4, .6, .4, .7, .4, .6, .4, .7, .4, .6, .4, .7, .5, .8, .5],
      ohh:   [0, 0, 0, 0, 0, 0, 0, .6, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    house: {
      bpm: 122,
      kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      snare: [0, 0, 0, 0, .9, 0, 0, 0, 0, 0, 0, 0, .9, 0, 0, 0],
      chh:   [.5, 0, 0, .35, .5, 0, 0, .35, .5, 0, 0, .35, .5, 0, 0, .35],
      ohh:   [0, 0, .8, 0, 0, 0, .8, 0, 0, 0, .8, 0, 0, 0, .8, 0]
    }
  };

  // Bass notes for Produced mode, one per step (Hz, A minor-ish line).
  var BASS_LINE = [55, 0, 0, 55, 0, 0, 65.41, 0, 49, 0, 0, 49, 0, 58.27, 0, 0];

  var pattern = {};
  var bpm = 92;
  var quantize = 0.65;   // 0 loose .. 1 tight
  var produced = false;
  var playing = false;

  function loadPreset(name) {
    var p = PRESETS[name];
    ROWS.forEach(function (row) {
      pattern[row.id] = p ? p[row.id].slice() : new Array(STEPS).fill(0);
    });
    if (p && p.bpm) setBpm(p.bpm);
  }
  loadPreset("boots");

  /* ============ audio engine ============ */

  var ctx = null;
  var master = null;
  var noiseBuf = null;

  function audio() {
    if (ctx) return ctx;
    var AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.85;
    var comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 5;
    master.connect(comp);
    comp.connect(ctx.destination);
    var len = ctx.sampleRate;
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    var data = noiseBuf.getChannelData(0);
    for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return ctx;
  }

  function env(t, peak, decay) {
    var g = ctx.createGain();
    g.gain.setValueAtTime(peak, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + decay);
    g.connect(master);
    return g;
  }

  function noiseSource(t, dur) {
    var src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    src.loop = true;
    src.start(t);
    src.stop(t + dur);
    return src;
  }

  function playKick(t, vel) {
    var osc = ctx.createOscillator();
    osc.type = "sine";
    var decay = produced ? 0.5 : 0.22;
    var startF = produced ? 130 : 160;
    var endF = produced ? 46 : 52;
    osc.frequency.setValueAtTime(startF, t);
    osc.frequency.exponentialRampToValueAtTime(endF, t + (produced ? 0.11 : 0.06));
    osc.connect(env(t, vel * (produced ? 1.15 : 0.95), decay));
    osc.start(t);
    osc.stop(t + decay + 0.05);
    // attack click
    var click = noiseSource(t, 0.015);
    var hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1200;
    click.connect(hp);
    hp.connect(env(t, vel * 0.25, 0.015));
  }

  function playSnare(t, vel) {
    var body = ctx.createOscillator();
    body.type = "triangle";
    body.frequency.setValueAtTime(196, t);
    body.frequency.exponentialRampToValueAtTime(140, t + 0.08);
    body.connect(env(t, vel * 0.5, 0.1));
    body.start(t);
    body.stop(t + 0.15);
    var dur = produced ? 0.26 : 0.16;
    var n = noiseSource(t, dur);
    var bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = produced ? 2200 : 1700;
    bp.Q.value = 0.9;
    n.connect(bp);
    bp.connect(env(t, vel * (produced ? 0.85 : 0.7), dur));
  }

  function playHat(t, vel, open) {
    var dur = open ? (produced ? 0.5 : 0.35) : (produced ? 0.09 : 0.06);
    var n = noiseSource(t, dur);
    var hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = produced ? 8200 : 6800;
    n.connect(hp);
    hp.connect(env(t, vel * (open ? 0.5 : 0.4), dur));
  }

  function playBass(t, freq, vel) {
    var osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    var lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(650, t);
    lp.frequency.exponentialRampToValueAtTime(220, t + 0.25);
    lp.Q.value = 3;
    osc.connect(lp);
    lp.connect(env(t, vel * 0.55, 0.3));
    osc.start(t);
    osc.stop(t + 0.35);
  }

  /* ============ scheduler ============ */

  var currentStep = 0;
  var nextNoteTime = 0;
  var timerId = null;
  var drawQueue = [];
  var LOOKAHEAD_MS = 25;
  var AHEAD_S = 0.12;

  function sixteenth() { return 60 / bpm / 4; }

  function scheduleStep(step, t) {
    var loose = 1 - quantize;
    var offset = GROOVE[step] * sixteenth() * loose;
    var when = Math.max(t + offset, ctx.currentTime + 0.001);
    if (pattern.kick[step]) playKick(when, pattern.kick[step]);
    if (pattern.snare[step]) playSnare(when, pattern.snare[step]);
    if (pattern.chh[step]) playHat(when, pattern.chh[step], false);
    if (pattern.ohh[step]) playHat(when, pattern.ohh[step], true);
    if (produced && BASS_LINE[step]) playBass(when, BASS_LINE[step], 0.9);
    drawQueue.push({ step: step, time: t });
  }

  function schedulerTick() {
    while (nextNoteTime < ctx.currentTime + AHEAD_S) {
      scheduleStep(currentStep, nextNoteTime);
      nextNoteTime += sixteenth();
      currentStep = (currentStep + 1) % STEPS;
    }
  }

  function start() {
    audio();
    if (ctx.state === "suspended") ctx.resume();
    playing = true;
    currentStep = 0;
    nextNoteTime = ctx.currentTime + 0.06;
    timerId = setInterval(schedulerTick, LOOKAHEAD_MS);
    requestAnimationFrame(drawLoop);
  }

  function stop() {
    playing = false;
    clearInterval(timerId);
    drawQueue = [];
    clearPlayhead();
  }

  /* ============ grid UI ============ */

  var gridEl = document.getElementById("seq-grid");
  var cellsByRow = {};

  function buildGrid() {
    ROWS.forEach(function (row) {
      var rowEl = document.createElement("div");
      rowEl.setAttribute("role", "row");
      rowEl.style.display = "contents";
      var label = document.createElement("span");
      label.className = "seq-row-label";
      label.setAttribute("role", "rowheader");
      label.textContent = row.label;
      rowEl.appendChild(label);
      cellsByRow[row.id] = [];
      for (var s = 0; s < STEPS; s++) {
        var cell = document.createElement("button");
        cell.type = "button";
        cell.className = "seq-cell" + (s % 4 === 0 ? " beat-mark" : "");
        cell.setAttribute("role", "gridcell");
        cell.dataset.row = row.id;
        cell.dataset.step = s;
        cell.setAttribute("aria-label", row.label + ", step " + (s + 1));
        rowEl.appendChild(cell);
        cellsByRow[row.id].push(cell);
      }
      gridEl.appendChild(rowEl);
    });
    gridEl.addEventListener("click", function (e) {
      var cell = e.target.closest(".seq-cell");
      if (!cell) return;
      var row = cell.dataset.row;
      var s = +cell.dataset.step;
      pattern[row][s] = pattern[row][s] ? 0 : 1;
      paintCell(cell, pattern[row][s]);
      if (pattern[row][s] && !playing) {
        audio();
        if (ctx.state === "suspended") ctx.resume();
        previewHit(row);
      }
    });
    paintAll();
  }

  function previewHit(row) {
    var t = ctx.currentTime + 0.01;
    if (row === "kick") playKick(t, 1);
    else if (row === "snare") playSnare(t, 1);
    else if (row === "chh") playHat(t, 1, false);
    else playHat(t, 1, true);
  }

  function paintCell(cell, vel) {
    cell.classList.toggle("is-on", !!vel);
    cell.classList.toggle("vel-soft", !!vel && vel < 0.6);
    cell.setAttribute("aria-pressed", vel ? "true" : "false");
  }

  function paintAll() {
    ROWS.forEach(function (row) {
      cellsByRow[row.id].forEach(function (cell, s) {
        paintCell(cell, pattern[row.id][s]);
      });
    });
  }

  var litStep = -1;
  function drawLoop() {
    if (!playing) return;
    while (drawQueue.length && drawQueue[0].time <= ctx.currentTime) {
      setPlayhead(drawQueue.shift().step);
    }
    requestAnimationFrame(drawLoop);
  }

  function setPlayhead(step) {
    if (litStep >= 0) togglePlayheadClass(litStep, false);
    togglePlayheadClass(step, true);
    litStep = step;
  }

  function clearPlayhead() {
    if (litStep >= 0) togglePlayheadClass(litStep, false);
    litStep = -1;
  }

  function togglePlayheadClass(step, on) {
    ROWS.forEach(function (row) {
      cellsByRow[row.id][step].classList.toggle("is-current", on);
    });
  }

  /* ============ transport controls ============ */

  var playBtn = document.getElementById("play-btn");
  var bpmSlider = document.getElementById("bpm-slider");
  var bpmOut = document.getElementById("bpm-out");
  var qSlider = document.getElementById("quantize-slider");
  var qOut = document.getElementById("q-out");
  var modeFaithful = document.getElementById("mode-faithful");
  var modeProduced = document.getElementById("mode-produced");
  var machineNote = document.getElementById("machine-note");

  var NOTE_FAITHFUL = "Faithful mode: your pattern on a dry kit, exactly as played. Flip to Produced to hear the same pattern with an 808, brighter hats and a bassline locked to your kicks.";
  var NOTE_PRODUCED = "Produced mode: same pattern, same timing — now with an 808 kick, brighter hats and a bassline that follows your groove. In the app, this step goes through the full cloud arrangement.";

  playBtn.addEventListener("click", function () {
    if (playing) { stop(); } else { start(); }
    playBtn.classList.toggle("is-playing", playing);
    playBtn.setAttribute("aria-pressed", playing ? "true" : "false");
    playBtn.querySelector(".play-label").textContent = playing ? "Stop" : "Play";
  });

  function setBpm(v) {
    bpm = v;
    bpmSlider.value = v;
    bpmOut.textContent = v;
  }

  bpmSlider.addEventListener("input", function () { setBpm(+bpmSlider.value); });

  qSlider.addEventListener("input", function () {
    quantize = +qSlider.value / 100;
    qOut.textContent = qSlider.value;
  });

  function setMode(isProduced) {
    produced = isProduced;
    modeFaithful.classList.toggle("is-active", !isProduced);
    modeProduced.classList.toggle("is-active", isProduced);
    modeFaithful.setAttribute("aria-pressed", String(!isProduced));
    modeProduced.setAttribute("aria-pressed", String(isProduced));
    machineNote.textContent = isProduced ? NOTE_PRODUCED : NOTE_FAITHFUL;
  }
  modeFaithful.addEventListener("click", function () { setMode(false); });
  modeProduced.addEventListener("click", function () { setMode(true); });

  document.querySelectorAll(".chip[data-preset]").forEach(function (chip) {
    chip.addEventListener("click", function () {
      document.querySelectorAll(".chip[data-preset]").forEach(function (c) {
        c.classList.toggle("is-active", c === chip && chip.dataset.preset !== "clear");
      });
      loadPreset(chip.dataset.preset === "clear" ? null : chip.dataset.preset);
      paintAll();
    });
  });

  buildGrid();

  /* ============ page interactions ============ */

  // mobile nav
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");
  navToggle.addEventListener("click", function () {
    var open = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  siteNav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // pricing region toggle
  var regionUS = document.getElementById("region-us");
  var regionIN = document.getElementById("region-in");
  function setRegion(region) {
    var isUS = region === "us";
    regionUS.classList.toggle("is-active", isUS);
    regionIN.classList.toggle("is-active", !isUS);
    regionUS.setAttribute("aria-pressed", String(isUS));
    regionIN.setAttribute("aria-pressed", String(!isUS));
    document.querySelectorAll("[data-us]").forEach(function (el) {
      el.textContent = isUS ? el.dataset.us : el.dataset.in;
    });
  }
  regionUS.addEventListener("click", function () { setRegion("us"); });
  regionIN.addEventListener("click", function () { setRegion("in"); });

  // beta form
  var form = document.getElementById("beta-form");
  var status = document.getElementById("form-status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = document.getElementById("beta-email").value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    status.classList.toggle("is-error", !valid);
    if (!valid) {
      status.textContent = "That email doesn't look right — one more try?";
      return;
    }
    status.textContent = "You're on the list. We'll write when the beta opens — no spam, just beats.";
    form.reset();
  });

  // scroll reveal
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      ".section-head, .step, .feature, .persona, .price-card, .phase, .mode-card, .stat, .pull-card"
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (el) {
      el.classList.add("reveal");
      io.observe(el);
    });
  }
})();
