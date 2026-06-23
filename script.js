const SOCIAL_ICONS = {
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.5 15.6V8.4L15.8 12l-6.3 3.6z"/></svg>`,
  discord: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.22 6.34 6.34 0 0 0 9.34 21.6a6.34 6.34 0 0 0 6.34-6.34V8.5a8.28 8.28 0 0 0 4.25 1.19V6.3a4.85 4.85 0 0 1-1.34-.61z"/></svg>`,
};

const SOCIAL_LABELS = {
  youtube: "YouTube",
  discord: "Discord",
  tiktok: "TikTok",
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseYouTubeId(input) {
  if (!input) return null;

  if (typeof input === "object") {
    return parseYouTubeId(input.id || input.url || "");
  }

  const value = String(input).trim();
  if (!value) return null;

  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
    return value;
  }

  try {
    const url = new URL(value);
    const host = url.hostname.replace("www.", "");

    if (host === "youtu.be") {
      return url.pathname.slice(1).split("/")[0] || null;
    }

    if (host.includes("youtube.com")) {
      if (url.pathname.startsWith("/embed/")) {
        return url.pathname.split("/")[2] || null;
      }

      if (url.pathname.startsWith("/shorts/")) {
        return url.pathname.split("/")[2] || null;
      }

      return url.searchParams.get("v");
    }
  } catch {
    return null;
  }

  return null;
}

function getVideoData(video) {
  const id = parseYouTubeId(video);
  if (!id) return null;

  const title =
    typeof video === "object" && video.title ? video.title : "YouTube video";
  const description =
    typeof video === "object" && video.description ? video.description : "";

  return {
    id,
    title,
    description,
    url: `https://www.youtube.com/watch?v=${id}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`,
    thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  };
}

function init() {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("hero-name").textContent = CONFIG.name;
  document.getElementById("hero-tagline").textContent = CONFIG.tagline;
  document.getElementById("hero-desc").textContent = CONFIG.description;

  document.getElementById("hero-discord").href = CONFIG.socials.discord;
  document.getElementById("youtube-channel").href = CONFIG.socials.youtube;
  document.getElementById("community-desc").textContent = CONFIG.communityDescription;
  document.getElementById("community-discord").href = CONFIG.socials.discord;
  document.getElementById("cta-youtube").href = CONFIG.socials.youtube;
  document.getElementById("cta-discord").href = CONFIG.socials.discord;

  const collabEmail = document.getElementById("collab-email");
  collabEmail.textContent = CONFIG.collabEmail;
  collabEmail.href = `mailto:${CONFIG.collabEmail}`;

  renderFeatures();
  renderVideos();
  renderCollabs();
  renderSocials();
  initNav();
}

function renderFeatures() {
  const grid = document.getElementById("features-grid");
  if (!grid || !CONFIG.features) return;

  grid.innerHTML = CONFIG.features
    .map(
      (feature) => `
    <article class="feature-card">
      <span class="feature-icon" aria-hidden="true">${feature.icon}</span>
      <h3>${feature.title}</h3>
      <p>${feature.description}</p>
    </article>
  `
    )
    .join("");
}

function renderVideos() {
  const grid = document.getElementById("video-grid");
  const empty = document.getElementById("video-empty");
  const videos = CONFIG.videos.map(getVideoData).filter(Boolean);

  if (!videos.length) {
    grid.innerHTML = "";
    empty.classList.remove("hidden");
    empty.querySelector("p").textContent = "Geen geldige YouTube video's gevonden.";
    empty.querySelector(".empty-hint").innerHTML =
      'Gebruik een volledige URL of video ID in <code>config.js</code>, bijv. <code>https://www.youtube.com/watch?v=...</code>';
    return;
  }

  empty.classList.add("hidden");
  grid.innerHTML = videos
    .map(
      (video) => `
    <article class="video-card">
      <div class="video-embed" data-embed-url="${video.embedUrl}" data-video-title="${escapeHtml(video.title)}">
        <button type="button" class="video-poster" aria-label="Video afspelen: ${escapeHtml(video.title)}">
          <img src="${video.thumbnailUrl}" alt="" loading="lazy" />
          <span class="video-play-btn" aria-hidden="true">
            <svg viewBox="0 0 68 48" width="68" height="48"><path d="M66.52 7.74a8 8 0 0 0-5.64-5.66C55.3 1.5 34 1.5 34 1.5s-21.3 0-26.88 1.58A8 8 0 0 0 1.48 7.74 83.5 83.5 0 0 0 0 24a83.5 83.5 0 0 0 1.48 16.26 8 8 0 0 0 5.64 5.66C12.7 46.5 34 46.5 34 46.5s21.3 0 26.88-1.58a8 8 0 0 0 5.64-5.66A83.5 83.5 0 0 0 68 24a83.5 83.5 0 0 0-1.48-16.26z" fill="#f00"/><path d="M45 24 27 14v20" fill="#fff"/></svg>
          </span>
        </button>
      </div>
      <div class="video-info">
        <span class="video-label">// Uitgelichte upload</span>
        <h3>${video.title}</h3>
        ${
          video.description
            ? `<p class="video-desc">${video.description}</p>`
            : ""
        }
        <a href="${video.url}" class="video-link" target="_blank" rel="noopener">Bekijk op YouTube →</a>
      </div>
    </article>
  `
    )
    .join("");

  initVideoPlayers();
}

function initVideoPlayers() {
  document.querySelectorAll(".video-poster").forEach((button) => {
    button.addEventListener("click", () => {
      const embed = button.closest(".video-embed");
      const embedUrl = embed.dataset.embedUrl;
      const title = embed.dataset.videoTitle;

      embed.innerHTML = `
        <iframe
          src="${embedUrl}&autoplay=1"
          title="${title}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      `;
    });
  });
}

function renderCollabs() {
  const grid = document.getElementById("collab-grid");
  grid.innerHTML = CONFIG.collabs
    .map((collab) => {
      const avatar = collab.image
        ? `<img src="assets/${collab.image}" alt="${collab.name}" class="collab-image" />`
        : `<div class="collab-avatar">${collab.name.charAt(0).toUpperCase()}</div>`;

      return `
    <a href="${collab.link}" class="collab-card" target="_blank" rel="noopener">
      ${avatar}
      <h3>${collab.name}</h3>
      <p>${collab.description}</p>
      <span class="collab-link">Bekijk →</span>
    </a>
  `;
    })
    .join("");
}

function renderSocials() {
  const grid = document.getElementById("social-grid");
  grid.innerHTML = Object.entries(CONFIG.socials)
    .filter(([, url]) => url && !url.includes("JOUW-INVITE"))
    .map(
      ([key, url]) => `
    <a href="${url}" class="social-link ${key}" target="_blank" rel="noopener">
      ${SOCIAL_ICONS[key] || ""}
      ${SOCIAL_LABELS[key] || key}
    </a>
  `
    )
    .join("");
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
