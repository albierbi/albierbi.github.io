const writeups = [
  {
    title: "Mr Robot CTF",
    platform: "thm",
    difficulty: "medium",
    desc: "WordPress exploitation, brute-forcing, and privilege escalation through a Mr. Robot-themed machine.",
    tags: ["web", "wordpress", "privesc"],
    date: "2025-04-01",
    href: "writeups/thm-mrrobot.html"
  },
  {
    title: "Basic Pentesting",
    platform: "thm",
    difficulty: "easy",
    desc: "Enumeration, SSH brute-force, and privilege escalation via a weak sudo configuration.",
    tags: ["enum", "ssh", "privesc"],
    date: "2025-01-10",
    href: "writeups/thm-basic-pentesting.html"
  },
  {
    title: "Network Services",
    platform: "thm",
    difficulty: "medium",
    desc: "Deep dive into SMB, Telnet, FTP enumeration and exploitation basics.",
    tags: ["smb", "ftp", "network"],
    date: "2025-02-03",
    href: "writeups/thm-network-services.html"
  },
  {
    title: "Starting Point — Meow",
    platform: "htb",
    difficulty: "easy",
    desc: "First HTB machine. Telnet misconfiguration giving direct root access.",
    tags: ["telnet", "enum"],
    date: "2025-03-15",
    href: "writeups/htb-meow.html"
  },
  {
    title: "picoCTF 2025 — Buffer Overflow",
    platform: "ctf",
    difficulty: "medium",
    desc: "Stack overflow challenge. Buffer analysis and crafting a basic ret2win payload.",
    tags: ["pwn", "bof", "reversing"],
    date: "2025-03-22",
    href: "writeups/pico2025-bof.html"
  },
  {
    title: "Advent of Cyber 2024 — Day 1",
    platform: "thm",
    difficulty: "easy",
    desc: "Introduction to OPSEC concepts through a fictional scenario involving malicious YouTube links.",
    tags: ["opsec", "osint", "recon"],
    date: "2024-12-01",
    href: "writeups/thm-advent-2024-day1.html"
  }
];

const platformLabel = { thm: "TryHackMe", htb: "HackTheBox", ctf: "CTF" };
const filters = { platform: "all", diff: "all" };

function setFilter(type, value, btn) {
  filters[type] = value;
  document.querySelectorAll('[data-filter="' + type + '"]').forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  render();
}

function render() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  const grid = document.getElementById("grid");

  const filtered = writeups.filter(w => {
    const matchPlatform = filters.platform === "all" || w.platform === filters.platform;
    const matchDiff     = filters.diff === "all"     || w.difficulty === filters.diff;
    const matchSearch   = !q
      || w.title.toLowerCase().includes(q)
      || w.desc.toLowerCase().includes(q)
      || w.tags.some(t => t.includes(q));
    return matchPlatform && matchDiff && matchSearch;
  });

  document.getElementById("resultsCount").textContent = filtered.length;

  ["thm","htb","ctf"].forEach(p => {
    document.getElementById("cnt-" + p).textContent =
      writeups.filter(w => w.platform === p).length;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty-state">no writeups match your filters</div>';
    return;
  }

  grid.innerHTML = filtered.map(w =>
    '<a class="card" href="' + w.href + '">' +
      '<div class="card-top">' +
        '<span class="platform-badge badge-' + w.platform + '">' + platformLabel[w.platform] + '</span>' +
        '<span class="diff-badge diff-' + w.difficulty + '">' + w.difficulty + '</span>' +
      '</div>' +
      '<div class="card-title">' + w.title + '</div>' +
      '<div class="card-desc">' + w.desc + '</div>' +
      '<div class="card-tags">' + w.tags.map(t => '<span class="tag">' + t + '</span>').join("") + '</div>' +
      '<div class="card-footer">' + w.date + '</div>' +
    '</a>'
  ).join("");
}

render();
