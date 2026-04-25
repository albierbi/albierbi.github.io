const writeups = [
  {
    title: "mKingdom",
    platform: "thm",
    difficulty: "medium",
    desc: "PHP reverse shell via CMS file upload misconfiguration, lateral movement through plaintext creds found with linpeas, root via cronjob hijacking through /etc/hosts poisoning.",
    tags: ["web", "php", "reverse-shell", "linpeas", "privesc", "cronjob"],
    date: "2025-07-06",
    href: "thm-mkingdom.html"
  },
  {
    title: "Basic Pentesting",
    platform: "thm",
    difficulty: "easy",
    desc: "Enumeration with enum4linux and gobuster, SSH brute-force with Hydra, then privilege escalation by cracking an SSH key passphrase with john.",
    tags: ["enum", "ssh", "hydra", "john", "privesc", "smb"],
    date: "2025-01-10",
    href: "thm-basic-pentesting.html"
  },
  {
    title: "OverTheWire: Bandit",
    platform: "owt",
    difficulty: "easy",
    desc: "All 33 levels of the Bandit wargame covering Linux fundamentals, file manipulation, networking, SSH, and Git through hands-on challenges.",
    tags: ["linux", "bash", "ssh", "git", "crypto", "shell-escape"],
    date: "2026-04-20",
    href: "owt-bandit.html"
  },
  {
  title: "Publisher",
  platform: "thm",
  difficulty: "easy",
  desc: "SPIP CMS RCE via known CVE, SSH key exfiltration for a stable shell, AppArmor policy bypass, and root via PATH injection on a SUID binary.",
  tags: ["web", "spip", "rce", "metasploit", "ssh", "apparmor", "suid", "path-injection"],
  date: "2026-04-25",
  href: "thm-publisher.html"
 }
];

const platformLabel = { thm: "TryHackMe", htb: "HackTheBox", ctf: "CTF", owt: "OverTheWire" };
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

  ["thm", "htb", "ctf", "owt"].forEach(function(p) {
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
