/* Standalone runtime for the Sander Kleinenberg homepage replica.
   Reimplements, in plain JS, the behaviour the React components provide:
   the shared SoundCloud player, the mixtape panel, the release coverflow,
   the rotating hero, the Instagram rail, the archive shuffle and the
   show countdown. Markup produced here mirrors the components 1:1. */
(function () {
  "use strict";

  var D = window.__SITE_DATA__;
  var FILL = "position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent";
  var FIVE_K = "/images/5k-original.png";

  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------------------------------------------------------------- player */

  function formatTime(ms) {
    var t = Math.floor(ms / 1000);
    return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0");
  }

  function embedUrl(href) {
    return "https://w.soundcloud.com/player/?url=" + encodeURIComponent(href) +
      "&color=%23102f87&auto_play=false&hide_related=true&show_comments=false" +
      "&show_user=true&show_reposts=false&show_teaser=true&visual=false";
  }

  var scApiPromise = null;
  function getSoundCloudApi() {
    if (window.SC) return Promise.resolve(window.SC);
    if (scApiPromise) return scApiPromise;
    scApiPromise = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = "https://w.soundcloud.com/player/api.js";
      s.onload = function () { window.SC ? resolve(window.SC) : reject(new Error("SoundCloud player API unavailable")); };
      s.onerror = function () { reject(new Error("SoundCloud player API failed to load")); };
      document.head.appendChild(s);
    });
    return scApiPromise;
  }

  var Player = {
    track: null, isPlaying: false, position: 0, duration: 0, artworkUrl: null,
    widget: null, bound: false, shouldPlay: false,
    listeners: [],
    onChange: function (fn) { this.listeners.push(fn); },
    emit: function () { this.listeners.forEach(function (fn) { fn(); }); },

    iframe: function () { return $(".soundcloud-engine"); },

    configure: function (iframe) {
      var self = this;
      getSoundCloudApi().then(function (api) {
        var widget = api.Widget(iframe);
        self.widget = widget;
        var refreshDuration = function () { widget.getDuration(function (d) { self.duration = d; self.emit(); }); };
        var refreshArtwork = function () {
          widget.getCurrentSound(function (sound) {
            var art = (sound && (sound.artwork_url || (sound.user && sound.user.avatar_url))) || null;
            self.artworkUrl = art ? art.replace("-large", "-t500x500") : null;
            self.emit();
          });
        };
        if (self.bound) return;
        self.bound = true;
        widget.bind(api.Widget.Events.READY, function () {
          refreshDuration(); refreshArtwork();
          if (self.shouldPlay) { widget.play(); self.shouldPlay = false; }
        });
        widget.bind(api.Widget.Events.PLAY, function () { self.isPlaying = true; self.emit(); });
        widget.bind(api.Widget.Events.PAUSE, function () { self.isPlaying = false; self.emit(); });
        widget.bind(api.Widget.Events.FINISH, function () { self.isPlaying = false; self.emit(); });
        widget.bind(api.Widget.Events.PLAY_PROGRESS, function (p) {
          self.position = (p && p.currentPosition) || 0; self.emit();
        });
        refreshDuration(); refreshArtwork();
        if (self.shouldPlay) { widget.play(); self.shouldPlay = false; }
      }).catch(function () { self.isPlaying = false; self.emit(); });
    },

    setTrack: function (track) {
      var self = this;
      var iframe = this.iframe();
      this.track = track;
      if (!iframe) return;
      var changed = iframe.dataset.track !== track.href;
      var shouldPlay = this.shouldPlay;
      if (changed) {
        iframe.dataset.track = track.href;
        this.isPlaying = false; this.position = 0; this.duration = 0; this.artworkUrl = null;
        this.emit();
        if (this.widget) {
          var widget = this.widget;
          widget.load(track.href, {
            auto_play: shouldPlay,
            callback: function () {
              widget.getDuration(function (d) { self.duration = d; self.emit(); });
              widget.getCurrentSound(function (sound) {
                var art = (sound && (sound.artwork_url || (sound.user && sound.user.avatar_url))) || null;
                self.artworkUrl = art ? art.replace("-large", "-t500x500") : null;
                self.emit();
              });
              if (self.shouldPlay) { widget.play(); self.shouldPlay = false; }
            }
          });
        } else {
          this.bound = false;
          iframe.addEventListener("load", function () { self.configure(iframe); }, { once: true });
          iframe.src = embedUrl(track.href);
        }
      } else if (shouldPlay && this.widget) {
        this.widget.play(); this.shouldPlay = false;
      }
      this.emit();
    },

    play: function (track) {
      if (this.track && this.track.href === track.href && this.widget) {
        this.widget.play(); this.shouldPlay = false; return;
      }
      this.shouldPlay = true;
      this.setTrack(track);
    },
    load: function (track) { this.shouldPlay = false; this.setTrack(track); },
    pause: function () {
      if (this.widget) this.widget.pause();
      this.isPlaying = false; this.emit();
    },
    seek: function (ms) {
      if (this.widget) this.widget.seekTo(ms);
      this.position = ms; this.emit();
    }
  };

  /* ------------------------------------------------------------------ dock */

  function renderDock() {
    var host = $("#replica-dock");
    if (!host) return;
    var t = Player.track;
    if (!t) { host.innerHTML = ""; return; }
    var max = Math.max(Player.duration, 1);
    var pct = Player.duration ? (Player.position / Player.duration) * 100 : 0;
    host.innerHTML =
      '<aside class="soundcloud-dock" aria-label="Now playing">' +
        '<div class="soundcloud-dock-header">' +
          (Player.artworkUrl ? '<img src="' + esc(Player.artworkUrl) + '" alt=""/>' : "") +
          "<div>" +
            "<p>NOW PLAYING</p>" +
            "<strong>" + esc(t.title) + "</strong>" +
            (t.subtitle ? "<span>" + esc(t.subtitle) + "</span>" : "") +
          "</div>" +
          '<button type="button" data-dock="close" aria-label="Close player">×</button>' +
        "</div>" +
        '<div class="soundcloud-dock-controls">' +
          '<button type="button" data-dock="toggle">' + (Player.isPlaying ? "Pause" : "Play") + "</button>" +
          "<span>SoundCloud</span>" +
        "</div>" +
        '<div class="soundcloud-dock-progress">' +
          '<input type="range" min="0" max="' + max + '" value="' + Math.min(Player.position, max) +
            '" step="1000" aria-label="Seek through ' + esc(t.title) + '" style="--progress:' + pct + '%"/>' +
          "<div><span>" + formatTime(Player.position) + "</span><span>" + formatTime(Player.duration) + "</span></div>" +
        "</div>" +
      "</aside>";
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-dock]");
    if (!btn) return;
    if (btn.dataset.dock === "close") { Player.pause(); Player.track = null; Player.emit(); }
    if (btn.dataset.dock === "toggle") { Player.isPlaying ? Player.pause() : Player.play(Player.track); }
  });
  document.addEventListener("input", function (e) {
    if (e.target.matches(".soundcloud-dock-progress input")) Player.seek(Number(e.target.value));
  });

  /* -------------------------------------------------------- deepest mixtapes */

  function activeMixtape() {
    var t = Player.track;
    for (var i = 0; i < D.mixtapes.length; i++) if (t && D.mixtapes[i].href === t.href) return D.mixtapes[i];
    return D.mixtapes[0];
  }

  function renderMixtapes() {
    var root = $(".deepest-mixtapes");
    if (!root) return;
    var t = Player.track;
    var active = activeMixtape();
    var art = Player.artworkUrl || FIVE_K;
    var onActive = t && t.href === active.href && Player.isPlaying;
    var max = Math.max(Player.duration, 1);
    var pct = Player.duration ? (Player.position / Player.duration) * 100 : 0;
    var title = (t && t.title) || "THE DEEPEST MIXTAPE #" + active.number;

    root.innerHTML =
      '<img class="deepest-mixtapes-artwork" src="' + esc(art) + '" alt="' + esc(title) + ' cover art"/>' +
      '<p class="eyebrow">THE DEEPEST MIXTAPES</p>' +
      '<div class="deepest-mixtapes-now-playing">' +
        '<img src="' + esc(art) + '" alt=""/>' +
        '<div class="onsite-player-meta"><p>SANDER KLEINENBERG RADIO</p><strong>' + esc(title) + "</strong></div>" +
        '<button type="button" class="onsite-player-play" data-mix="toggle" aria-label="' +
          (onActive ? "Pause mixtape" : "Play mixtape") + '">' + (onActive ? "Ⅱ" : "▶") + "</button>" +
      "</div>" +
      '<div class="deepest-mixtapes-progress">' +
        '<input type="range" min="0" max="' + max + '" value="' + Math.min(Player.position, max) +
          '" step="1000" aria-label="Seek through ' + esc(title) + '" style="--progress:' + pct + '%"/>' +
        "<div><span>" + formatTime(Player.position) + "</span><span>" + formatTime(Player.duration) + "</span></div>" +
      "</div>" +
      '<div class="deepest-mixtapes-queue" aria-label="Deepest Mixtape playlist">' +
        D.mixtapes.map(function (m) {
          var on = t && m.href === t.href;
          return '<button type="button" data-mix-href="' + esc(m.href) + '" data-mix-number="' + esc(m.number) +
            '" aria-pressed="' + (on ? "true" : "false") + '"><span>#' + esc(m.number) + "</span><span>" +
            (on && Player.isPlaying ? "Playing" : "Play") + "</span></button>";
        }).join("") +
      "</div>";
  }

  document.addEventListener("click", function (e) {
    var q = e.target.closest("[data-mix-href]");
    if (q) {
      Player.play({ href: q.dataset.mixHref, title: "THE DEEPEST MIXTAPE #" + q.dataset.mixNumber, subtitle: "SANDER KLEINENBERG" });
      return;
    }
    var toggle = e.target.closest('[data-mix="toggle"]');
    if (toggle) {
      var active = activeMixtape();
      var t = Player.track;
      if (t && t.href === active.href && Player.isPlaying) Player.pause();
      else Player.play({ href: active.href, title: "THE DEEPEST MIXTAPE #" + active.number, subtitle: "SANDER KLEINENBERG" });
    }
  });
  document.addEventListener("input", function (e) {
    if (e.target.matches(".deepest-mixtapes-progress input")) Player.seek(Number(e.target.value));
  });

  /* ------------------------------------------------------------- coverflow */

  var activeRelease = 2;

  function coverOffset(index) {
    var offset = index - activeRelease;
    var half = Math.floor(D.releases.length / 2);
    if (offset > half) offset -= D.releases.length;
    if (offset < -half) offset += D.releases.length;
    return offset;
  }

  function renderCoverflow() {
    var root = $(".release-coverflow");
    if (!root) return;
    var current = D.releases[activeRelease];
    root.innerHTML =
      '<div class="release-coverflow-rail">' +
        D.releases.map(function (r, i) {
          var off = coverOffset(i);
          var isActive = i === activeRelease;
          return '<a href="' + esc(r.href) + '" target="_blank" rel="noopener noreferrer" class="release-cover release-cover--' + off +
            '" data-cover="' + i + '" aria-label="' + (isActive ? "Open " : "Show ") + esc(r.title) + " by " + esc(r.artists) + '"' +
            (isActive ? ' aria-current="true"' : "") + ' style="z-index:' + (10 - Math.abs(off)) + '">' +
            '<span class="release-art"><img alt="' + esc(r.title) + ' cover art" width="440" height="440" decoding="async" data-nimg="1" style="color:transparent" src="' + esc(r.artwork) + '"/></span></a>';
        }).join("") +
      "</div>" +
      '<div class="release-current">' +
        '<p class="release-number">' + String(activeRelease + 1).padStart(2, "0") + " / " + String(D.releases.length).padStart(2, "0") + "</p>" +
        "<h3>" + esc(current.title) + "</h3>" +
        "<p>" + esc(current.artists) + "</p>" +
        '<div class="release-services" aria-label="Listen to ' + esc(current.title) + '">' +
          current.services.map(function (s) {
            return '<a href="' + esc(s.href) + '" target="_blank" rel="noopener noreferrer" aria-label="Listen on ' + esc(s.name) +
              '" title="' + esc(s.name) + '"><img src="' + esc(s.icon) + '" alt=""/></a>';
          }).join("") +
        "</div>" +
      "</div>";
  }

  document.addEventListener("click", function (e) {
    var cover = e.target.closest("[data-cover]");
    if (!cover) return;
    var i = Number(cover.dataset.cover);
    if (i !== activeRelease) { e.preventDefault(); activeRelease = i; renderCoverflow(); }
  });

  /* ----------------------------------------------------------- archive blast */

  var blastStart = Math.floor(Math.random() * D.memories.length);
  var blastStep = 0;

  function renderBlast() {
    var host = $(".blast-section .site-shell");
    var card = $(".blast-card");
    if (!host || !card) return;
    var m = D.memories[(blastStart + blastStep) % D.memories.length];
    var t = Player.track;
    var onSet = t && t.href === m.href && Player.isPlaying;
    var external = m.href.indexOf("http") === 0;
    var visual;
    if (m.type === "VIDEO" && m.videoId) {
      visual = '<iframe class="blast-video-frame" src="https://www.youtube-nocookie.com/embed/' + esc(m.videoId) +
        '?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1" title="Sander Kleinenberg — ' + esc(m.title) +
        ' (official video)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    } else if (m.image) {
      visual = '<img alt="" loading="lazy" decoding="async" data-nimg="fill" class="blast-image" style="' + FILL + '" src="' + esc(m.image) + '"/>';
    } else {
      visual = '<div class="set-visual">' +
        '<img alt="5K" width="624" height="604" decoding="async" data-nimg="1" class="five-k-mark " style="color:transparent" src="' + FIVE_K + '"/>' +
        '<div class="set-wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
        '<button type="button" class="blast-play-set" data-blast="set">' + (onSet ? "Pause set" : "Play in site player") + "</button>" +
      "</div>";
    }
    var action = m.type === "DJ SET"
      ? '<button type="button" class="text-link text-link-button" data-blast="set">' + (onSet ? "Pause set" : esc(m.cta)) + "</button>"
      : '<a href="' + esc(m.href) + '" class="text-link"' + (external ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + esc(m.cta) + "</a>";

    card.className = "blast-card blast-" + m.type.toLowerCase().replace(" ", "-");
    card.innerHTML =
      '<div class="blast-visual">' + visual + (m.credit ? '<span class="image-credit">' + esc(m.credit) + "</span>" : "") + "</div>" +
      '<div class="blast-copy">' +
        '<div class="blast-meta"><span>' + esc(m.type) + "</span><span>" + esc(m.year) + "</span></div>" +
        "<h3>" + esc(m.title) + "</h3>" +
        "<p>" + esc(m.copy) + "</p>" +
        action +
        '<button type="button" data-blast="next" class="next-memory">Another memory <span>→</span></button>' +
      "</div>";
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-blast]");
    if (!b) return;
    if (b.dataset.blast === "next") { blastStep = (blastStep + 1) % D.memories.length; renderBlast(); return; }
    var m = D.memories[(blastStart + blastStep) % D.memories.length];
    var t = Player.track;
    if (t && t.href === m.href && Player.isPlaying) Player.pause();
    else Player.play({ href: m.href, title: m.title, subtitle: m.year });
  });

  /* --------------------------------------------------------------- hero, etc */

  function startHero() {
    var frames = $$(".hero-portrait");
    if (frames.length < 2) return;
    var i = 0;
    setInterval(function () {
      frames[i].classList.remove("is-active");
      i = (i + 1) % frames.length;
      frames[i].classList.add("is-active");
    }, 7500);
  }

  function startInstagram() {
    var rail = $(".instagram-scroll");
    if (!rail || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var paused = false;
    var half = function () { return rail.scrollWidth / 2; };
    var tick = function () {
      if (!paused) {
        rail.scrollLeft += 0.38;
        if (rail.scrollLeft >= half()) rail.scrollLeft -= half();
      }
      requestAnimationFrame(tick);
    };
    rail.addEventListener("pointerenter", function () { paused = true; });
    rail.addEventListener("pointerleave", function () { paused = false; });
    rail.addEventListener("focusin", function () { paused = true; });
    rail.addEventListener("focusout", function () { paused = false; });
    rail.addEventListener("scroll", function () { if (rail.scrollLeft >= half()) rail.scrollLeft -= half(); }, { passive: true });
    requestAnimationFrame(tick);
  }

  function daysRemaining(date) {
    var start = new Date(date + "T00:00:00+02:00").getTime();
    return Math.max(0, Math.ceil((start - Date.now()) / 86400000));
  }

  function startCountdowns() {
    var refresh = function () {
      $$("[data-countdown]").forEach(function (el) {
        var d = daysRemaining(el.dataset.countdown);
        el.textContent = d === 0 ? "TODAY" : d + " DAYS TO GO";
      });
    };
    refresh();
    setInterval(refresh, 60000);
  }

  /* ------------------------------------------------------------------- boot */

  Player.onChange(function () { renderDock(); renderMixtapes(); renderBlast(); });

  renderCoverflow();
  renderMixtapes();
  renderBlast();
  startHero();
  startInstagram();
  startCountdowns();

  // Match the React panel, which cues the newest mixtape on mount without playing.
  Player.load({
    href: D.mixtapes[0].href,
    title: "THE DEEPEST MIXTAPE #" + D.mixtapes[0].number,
    subtitle: "SANDER KLEINENBERG"
  });
})();
