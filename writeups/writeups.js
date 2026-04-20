const writeups = [
  {
    title: "Mr Robot CTF",
    platform: "thm",
    difficulty: "medium",
    desc: "WordPress exploitation, brute-forcing, and privilege escalation through a Mr. Robot-themed machine.",
    tags: ["web", "wordpress", "privesc"],
    date: "2025-04-01",
    href: "thm-mrrobot.html"
  },
  {
    title: "Basic Pentesting",
    platform: "thm",
    difficulty: "easy",
    desc: "Enumeration, SSH brute-force, and privilege escalation via a weak sudo configuration.",
    tags: ["enum", "ssh", "privesc"],
    date: "2025-01-10",
    href: "thm-basic-pentesting.html"
  },
  {
    title: "Network Services",
    platform: "thm",
    difficulty: "medium",
    desc: "Deep dive into SMB, Telnet, FTP enumeration and exploitation basics.",
    tags: ["smb", "ftp", "network"],
    date: "2025-02-03",
    href: "thm-network-services.html"
  },
  {
    title: "Starting Point — Meow",
    platform: "htb",
    difficulty: "easy",
    desc: "First HTB machine. Telnet misconfiguration giving direct root access.",
    tags: ["telnet", "enum"],
    date: "2025-03-15",
    href: "htb-meow.html"
  },
  {
    title: "picoCTF 2025 — Buffer Overflow",
    platform: "ctf",
    difficulty: "medium",
    desc: "Stack overflow challenge. Buffer analysis and crafting a basic ret2win payload.",
    tags: ["pwn", "bof", "reversing"],
    date: "2025-03-22",
    href: "pico2025-bof.html"
  },
  {
    title: "Advent of Cyber 2024 — Day 1",
    platform: "thm",
    difficulty: "easy",
    desc: "Introduction to OPSEC concepts through a fictional scenario involving malicious YouTube links.",
    tags: ["opsec", "osint", "recon"],
    date: "2024-12-01",
    href: "thm-advent-2024-day1.html"
  }
];

const platformLabel = { thm: "TryHackMe", htb: "HackTheBox", ctf: "CTF" };
const filters = { platform: "all", diff: "all" };

function setFilter(type, value, btn) {
  filters[type] = value;
  document.querySelectorAll('[data-filter="' + type + '"]').forEach(function(b) {
    b.classList.remove("active");
  });
  btn.classList.add("active");
  render();
}

function render() {
  var input = document.getElementById("searchInput");
  var q = input ? input.value.toLowerCase().trim() : "";
  var grid = document.getElementById("grid");

  var filtered = writeups.filter(function(w) {
    var matchPlatform = filters.platform === "all" || w.platform === filters.platform;
    var matchDiff     = filters.diff === "all"     || w.difficulty === filters.diff;
    var matchSearch   = !q
      || w.title.toLowerCase().includes(q)
      || w.desc.toLowerCase().includes(q)
      || w.tags.some(function(t) { return t.includes(q); });
    return matchPlatform && matchDiff && matchSearch;
  });

  document.getElementById("resultsCount").textContent = filtered.length;

  ["thm", "htb", "ctf"].forEach(function(p) {
    var el = document.getElementById("cnt-" + p);
    if (el) el.textContent = writeups.filter(function(w) { return w.platform === p; }).length;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty-state">no writeups match your filters</div>';
    return;
  }

  grid.innerHTML = filtered.map(function(w) {
    return '<a class="card" href="' + w.href + '">' +
      '<div class="card-top">' +
        '<span class="platform-badge badge-' + w.platform + '">' + platformLabel[w.platform] + '</span>' +
        '<span class="diff-badge diff-' + w.difficulty + '">' + w.difficulty + '</span>' +
      '</div>' +
      '<div class="card-title">' + w.title + '</div>' +
      '<div class="card-desc">' + w.desc + '</div>' +
      '<div class="card-tags">' + w.tags.map(function(t) { return '<span class="tag">' + t + '</span>'; }).join("") + '</div>' +
      '<div class="card-footer">' + w.date + '</div>' +
    '</a>';
  }).join("");
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".filter-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      setFilter(btn.dataset.filter, btn.dataset.value, btn);
    });
  });

  var searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", render);
  }

  render();
});
