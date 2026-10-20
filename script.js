/* ==========================================================
   DATA
   All page content comes from this object. Edit the text and
   links here, and add or remove items as needed.
   ========================================================== */
const DATA = {
  fullName: "Michael Jemmy Tanzel",
  photo: "profile.jpg",
  name: ["Michael", "Tanzel"],
  role: "Computer Science student at BINUS University, focused on frontend development and database engineering.",
  about:
    "I'm a Computer Science student who loves turning ideas into practical software, with an eye on both the technology and the people using it. I learn best by doing, through hands-on projects, case studies, and plenty of teamwork. I believe good software comes as much from clear communication as from good code.",

  links: [
    { label: "GitHub", href: "https://github.com/MichaelTanzel" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/michael-tanzel-851167326" }
  ],

  skills: [
    { group: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Responsive Design", "Figma"] },
    { group: "Data visualization", items: ["Leaflet", "Recharts"] },
    { group: "Currently learning", items: ["Software Engineering", "Database Systems"] },
    { group: "Working style", items: ["Communication", "Collaboration", "Problem-solving", "Adaptability"] }
  ],

  /* hue: a number from 0 to 360 that tints the preview card */
  websites: [
    {
      title: "StairsLife",
      role: "My role: Frontend Developer",
      desc: "A freelance platform that connects Indonesian university students with small businesses and startups for short-term micro-tasks. Clients post projects, students apply, both sides agree on a contract and chat in real time, and payment is held in escrow until the work is approved. Includes an admin dashboard and email verification. The frontend is built with Vite and vanilla JavaScript, on top of a NestJS and Supabase backend.",
      url: "https://stairslife.com",
      repo: "https://github.com/MichaelTanzel/StairLifeWeb",
      stack: ["JavaScript", "Vite", "CSS", "NestJS", "Supabase", "Socket.io"],
      hue: 28
    },
    {
      title: "Noisecore",
      role: "Solo project for my Human-Computer Interaction (HCI) course",
      desc: "A responsive five-page website for an audio technology brand, with a filterable product catalog, deals and promo codes, and a membership form with validation and a password strength indicator. Prototyped in Figma, then built in plain HTML, CSS, and JavaScript.",
      url: "https://noicecore-michael.vercel.app",
      stack: ["HTML5", "CSS3", "JavaScript", "Figma", "Vercel"],
      hue: 262
    }
  ],

  projects: [
    {
      title: "FloodGuard AI",
      kind: "AI web platform",
      year: "2025",
      desc: "An intelligent system that predicts and visualizes flood risk across Jakarta from integrated environmental variables. It shows risk levels and preventive recommendations, and includes public education content to support residents, researchers, and governments in flood mitigation.",
      facts: [
        ["My role", "Content preparation, editing, visualizing the app flow and system results, and code contributions"],
        ["Team", "4 members"]
      ],
      stack: ["React", "TypeScript", "Tailwind CSS", "Express", "PostgreSQL", "Drizzle ORM", "Leaflet", "Recharts"]
    }
  ],

  contact: {
    heading: "Looking for an intern? Let's talk.",
    text: "I'm open to internships in frontend and database engineering. Send me a message and I'll get back to you soon.",
    email: "michaeltanzel15@gmail.com"
  },

  tagline: "Computer Science student passionate about software development, teamwork, and creating meaningful solutions through technology."
};

/* ==========================================================
   Helpers
   ========================================================== */
const $ = (id) => document.getElementById(id);

const render = (id, html) => {
  $(id).innerHTML = html;
};

const esc = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* Web links open in a new tab; mailto links stay in the same tab. */
const hrefAttr = (url) =>
  `href="${esc(url)}"` + (url.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "");

const chip = (label, url, primary = false) =>
  `<li><a class="chip${primary ? " primary" : ""}" ${hrefAttr(url)}>${esc(label)}</a></li>`;

/* ==========================================================
   Templates
   ========================================================== */
const tags = (list) => `<ul class="tags">${list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;

const websiteCard = (w) => `
  <article class="site">
    <a class="frame" ${hrefAttr(w.url)} aria-label="Open ${esc(w.title)}">
      <div class="bar"><span class="url">${esc(new URL(w.url).host)}</span></div>
      <div class="shot" style="--hue: ${Number(w.hue)}"></div>
    </a>
    <h3>${esc(w.title)}</h3>
    ${w.role ? `<p class="site-role">${esc(w.role)}</p>` : ""}
    <p>${esc(w.desc)}</p>
    ${tags(w.stack)}
    <div class="site-actions">
      <a class="btn" ${hrefAttr(w.url)}>Visit site</a>
      ${w.repo ? `<a class="btn ghost" ${hrefAttr(w.repo)}>View code</a>` : ""}
    </div>
  </article>`;

const projectItem = (p, index) => `
  <details class="proj"${index === 0 ? " open" : ""}>
    <summary>
      <span class="title">${esc(p.title)}</span>
      <span class="meta">
        <span class="kind">${esc(p.kind)}, ${esc(p.year)}</span>
        <span class="plus" aria-hidden="true"></span>
      </span>
    </summary>
    <div class="detail">
      <div>
        <p>${esc(p.desc)}</p>
        ${tags(p.stack)}
      </div>
      <dl>${p.facts.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join("")}</dl>
    </div>
  </details>`;

/* ==========================================================
   Renderers
   ========================================================== */
function renderHero() {
  const heading = $("name");

  $("role").textContent = DATA.role;
  heading.setAttribute("aria-label", DATA.fullName);
  heading.innerHTML = DATA.name
    .map((part) => `<span class="line" aria-hidden="true"><span class="inner">${esc(part)}</span></span>`)
    .join("");

  render(
    "chips",
    chip("Email me", `mailto:${DATA.contact.email}`, true) + DATA.links.map((l) => chip(l.label, l.href)).join("")
  );
}

function renderContent() {
  const portrait = $("portrait");
  portrait.src = DATA.photo;
  portrait.alt = `Portrait of ${DATA.fullName}`;
  $("about-text").textContent = DATA.about;

  render(
    "skills-list",
    DATA.skills.map((g) => `<div class="group"><dt>${esc(g.group)}</dt><dd>${g.items.map(esc).join(", ")}</dd></div>`).join("")
  );
  render("website-list", DATA.websites.map(websiteCard).join(""));
  render("project-list", DATA.projects.map(projectItem).join(""));
}

function renderFooter() {
  const { heading, text, email } = DATA.contact;
  const mailto = `mailto:${email}`;
  const cta = $("cta-mail");

  $("cta-heading").textContent = heading;
  $("cta-text").textContent = text;
  cta.href = mailto;
  cta.textContent = email;

  $("foot-brand").textContent = DATA.fullName;
  $("foot-tagline").textContent = DATA.tagline;
  render("foot-contact", `<li><a href="${esc(mailto)}">${esc(email)}</a></li>`);
  render("foot-links", DATA.links.map((l) => `<li><a ${hrefAttr(l.href)}>${esc(l.label)}</a></li>`).join(""));
  $("copy").textContent = `© ${new Date().getFullYear()} ${DATA.fullName}. All rights reserved.`;
}

renderHero();
renderContent();
renderFooter();
