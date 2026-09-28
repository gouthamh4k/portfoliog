import React, { useEffect, useRef, useState } from "react";
import {
  Mail, Phone, Activity, ShieldCheck, Crosshair, Code2,
  Wrench, ClipboardList, Network, Monitor, Award, Bug, Lock, Radar as RadarIcon,
  MapPin, Clock, FileText, Terminal,
} from "lucide-react";

// Custom cursor — the user's uploaded spider-web image, background
// keyed to transparent and cropped, embedded inline so the file
// stays self-contained.
const WEB_CURSOR =
  "data:image/png;base64,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";

// ---------------------------------------------------------------
// Palette
// ---------------------------------------------------------------
const C = {
  bg: "#0d0808",
  panel: "#181111",
  panelBorder: "rgba(255,59,70,0.16)",
  panelBorderStrong: "rgba(255,59,70,0.4)",
  ink: "#e6e0e0",
  inkDim: "#8f7c7c",
  teal: "#ff3b46",
  tealBright: "#ff6b73",
  tealSoft: "rgba(255,59,70,0.08)",
  amber: "#f5a524",
  danger: "#ff1f3d",
};

// ---------------------------------------------------------------
// Resume-derived data
// ---------------------------------------------------------------
const SKILL_GROUPS = [
  { label: "Programming", icon: Code2, items: ["Bash", "Python"] },
  { label: "Offensive Security", icon: Crosshair, items: ["Penetration Testing", "Vulnerability Assessment", "Exploitation Techniques", "Command & Control"] },
  { label: "Defensive Security", icon: ShieldCheck, items: ["SIEM", "Log Analysis", "Incident Response", "Threat Hunting"] },
  { label: "Tools", icon: Wrench, items: ["Burp Suite", "Metasploit", "Wireshark", "Nmap", "Hydra", "John the Ripper", "Nessus", "Nikto", "SQLmap", "Gobuster"] },
  { label: "Frameworks & Compliance", icon: ClipboardList, items: ["OWASP", "ISO 27001", "MITRE ATT&CK", "CVSS"] },
  { label: "System & Network", icon: Network, items: ["Privilege Escalation", "Vulnerability Scanners", "Web App Security", "Active Directory"] },
  { label: "Operating Systems", icon: Monitor, items: ["Windows", "Kali Linux", "Debian", "Fedora"] },
];

const PROJECTS = [
  {
    tag: "DEFENSIVE", sev: "info", icon: Lock,
    title: "SIEM Deployment & Threat Monitoring",
    sub: "Wazuh, Splunk",
    bullets: [
      "Deployed and managed Wazuh agents across Windows 10, Kali Linux, Fedora, and Debian for centralized security event collection.",
      "Configured real-time log monitoring, event correlation, and automated threat detection using threat intelligence feeds.",
      "Analyzed system, authentication, and network traffic logs to investigate incidents and improve response processes.",
      "Integrated Splunk dashboards for log correlation and threat hunting.",
    ],
  },
  {
    tag: "DEFENSIVE", sev: "info", icon: Lock,
    title: "Active Directory Configuration & Hardening",
    sub: "Windows Server, ADDS",
    bullets: [
      "Installed and configured Windows Server with Active Directory Domain Services for centralized authentication.",
      "Implemented group policies and password policies to strengthen domain security and enforce compliance.",
      "Managed users, groups, and OUs to establish role-based access control and reduce privilege abuse.",
      "Monitored event logs and login activity to detect unauthorized access attempts.",
    ],
  },
  {
    tag: "OFFENSIVE", sev: "crit", icon: Bug,
    title: "VAPT — VELS University Student Portal",
    sub: "Burp Suite, Google Dorking, manual testing",
    bullets: [
      "Identified session ID leakage, exposed PDFs, weak CAPTCHA, and predictable password patterns.",
      "Reported high-risk findings including PII exposure and session hijacking risk, with remediation steps.",
      "Prepared a full VAPT report summarizing risk levels, impact, and mitigations.",
    ],
  },
  {
    tag: "OFFENSIVE", sev: "high", icon: Bug,
    title: "VAPT — Joboy.in OTP Brute Force",
    sub: "Burp Suite Intruder · CWE-307",
    bullets: [
      "Simulated a brute-force attack on the OTP verification endpoint.",
      "Found missing rate-limiting, CAPTCHA, and account lockout mechanisms.",
      "Recovered a valid OTP via automated numeric payloads and documented severity as CWE-307.",
      "Recommended account lockout, throttling, OTP expiry, and secure session handling.",
    ],
  },
];

const CREDENTIALS = [
  { name: "Certified Ethical Hacker (CEH v13)", org: "EC-Council", yr: "In progress" },
  { name: "Advanced Diploma in Cyber Defense (ADCD v3)", org: "RedTeam Hacker Academy", yr: "2024 – 2025" },
  { name: "B.Sc. Computer Science", org: "Sri Manakula Vinayagar Engineering College", yr: "2021 – 2024" },
];

const OTHER = [
  "Foundational networking training — Cisco Networking Academy",
  "LetsDefend SIEM Training — log analysis, alert triage, threat detection",
  "Actively follows cybersecurity blogs, news sites, and podcasts",
];

const SOFT_SKILLS = ["Communication", "Critical Thinking", "Risk Assessment", "Time Management", "Collaboration"];
const SEV_COLOR = { crit: C.danger, high: C.amber, info: C.inkDim };

const NAV = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certs", label: "Certs" },
  { id: "contact", label: "Contact" },
];

// ---------------------------------------------------------------
// Mouse-tracking network canvas
// ---------------------------------------------------------------
function MouseNetwork() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w, h, points, raf;
    const spacing = 56;
    const radius = 170;

    function build() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      points = [];
      for (let x = spacing / 2; x < w; x += spacing) {
        for (let y = spacing / 2; y < h; y += spacing) points.push({ x, y });
      }
    }
    build();
    window.addEventListener("resize", build);

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }
    function onLeave() { mouse.current.x = -9999; mouse.current.y = -9999; }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my } = mouse.current;

      ctx.fillStyle = "rgba(255,59,70,0.10)";
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      const near = points.filter((p) => Math.hypot(p.x - mx, p.y - my) < radius);
      for (const p of near) {
        const d = Math.hypot(p.x - mx, p.y - my);
        const t = 1 - d / radius;
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(255,59,70,${t * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6 + t * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,107,115,${0.3 + t * 0.7})`;
        ctx.fill();
      }
      for (let i = 0; i < near.length; i++) {
        for (let j = i + 1; j < near.length; j++) {
          const a = near[i], b = near[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < spacing * 1.6) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "rgba(255,59,70,0.12)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      if (mx > -100) {
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fillStyle = C.tealBright;
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}

// ---------------------------------------------------------------
// Live-updating "secure dashboard" illustration
// ---------------------------------------------------------------
function DashboardGraphic({ width = 420 }) {
  const [bars, setBars] = useState([22, 40, 30, 55, 38, 60, 45]);
  const [health, setHealth] = useState(92);
  const [linePts, setLinePts] = useState([130, 110, 120, 90, 100, 70, 85, 60, 75]);

  useEffect(() => {
    const t = setInterval(() => {
      setBars((b) => b.map((v) => Math.max(12, Math.min(70, v + (Math.random() * 14 - 7)))));
      setHealth((h) => Math.max(88, Math.min(98, h + (Math.random() * 2 - 1))));
      setLinePts((pts) => pts.map((v) => Math.max(50, Math.min(140, v + (Math.random() * 10 - 5)))));
    }, 1400);
    return () => clearInterval(t);
  }, []);

  const gaugeAngle = -90 + ((health - 80) / 20) * 180; // maps 80-100 -> -90..90 deg roughly
  const line = linePts.map((y, i) => `${30 + i * 25},${y}`).join(" ");

  return (
    <svg width={width} viewBox="0 0 420 300" style={{ overflow: "visible" }}>
      <defs>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width="420" height="300" rx="14" fill={C.panel} stroke={C.panelBorder} />
      <rect x="0" y="0" width="420" height="30" rx="14" fill="#10151a" />
      <circle cx="18" cy="15" r="3.5" fill={C.danger} opacity="0.7" />
      <circle cx="32" cy="15" r="3.5" fill={C.amber} opacity="0.7" />
      <circle cx="46" cy="15" r="3.5" fill={C.teal} opacity="0.9">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <text x="70" y="19" fontFamily="monospace" fontSize="10" fill={C.inkDim}>soc-monitor — live</text>

      <rect x="18" y="46" width="220" height="110" rx="8" fill="#10151a" stroke={C.panelBorder} />
      <text x="26" y="60" fontFamily="monospace" fontSize="9" fill={C.inkDim}>THREAT SCORE</text>
      <polyline points={line} fill="none" stroke={C.teal} strokeWidth="2" filter="url(#glow)" style={{ transition: "all 1s ease" }} />

      <rect x="18" y="164" width="220" height="120" rx="8" fill="#10151a" stroke={C.panelBorder} />
      <text x="26" y="180" fontFamily="monospace" fontSize="9" fill={C.inkDim}>ALERTS / HR</text>
      {bars.map((h, i) => (
        <rect key={i} x={28 + i * 28} y={270 - h} width="14" height={h} rx="2" fill={i % 3 === 0 ? C.teal : "rgba(255,59,70,0.35)"} style={{ transition: "y 1.2s ease, height 1.2s ease" }} />
      ))}

      <rect x="250" y="46" width="152" height="238" rx="8" fill="#10151a" stroke={C.panelBorder} />
      <text x="262" y="66" fontFamily="monospace" fontSize="9" fill={C.inkDim}>SYSTEM HEALTH</text>
      <g transform="translate(326,150)">
        <path d="M -60 0 A 60 60 0 0 1 60 0" fill="none" stroke="rgba(255,59,70,0.2)" strokeWidth="10" />
        <path d="M -60 0 A 60 60 0 0 1 20 -56" fill="none" stroke={C.teal} strokeWidth="10" filter="url(#glow)" />
        <line x1="0" y1="0" x2={18 * Math.cos((gaugeAngle * Math.PI) / 180) / 0.36} y2={18 * Math.sin((gaugeAngle * Math.PI) / 180) / 0.36 - 40}
          stroke={C.tealBright} strokeWidth="2" style={{ transition: "all 1.2s ease" }} />
        <circle cx="0" cy="0" r="4" fill={C.tealBright} />
        <text x="0" y="30" textAnchor="middle" fontFamily="monospace" fontSize="16" fill={C.ink}>{health.toFixed(0)}%</text>
      </g>
      <rect x="262" y="230" width="128" height="1" fill={C.panelBorder} />
      <text x="262" y="250" fontFamily="monospace" fontSize="9" fill={C.inkDim}>UPTIME 99.2%</text>
      <text x="262" y="266" fontFamily="monospace" fontSize="9" fill={C.inkDim}>NODES 12 ACTIVE</text>
    </svg>
  );
}

// ---------------------------------------------------------------
// Typewriter text
// ---------------------------------------------------------------
function Typewriter({ text, speed = 28, startDelay = 300 }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    let i = 0;
    const start = setTimeout(function tick() {
      i++;
      setShown(i);
      if (i < text.length) setTimeout(tick, speed);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);
  return (
    <span>
      {text.slice(0, shown)}
      <span style={{ borderRight: `2px solid ${C.teal}`, marginLeft: 2, animation: "blinkCursor 0.9s step-end infinite" }} />
    </span>
  );
}

// ---------------------------------------------------------------
// Sticky nav with scroll-spy
// ---------------------------------------------------------------
function StickyNav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      <div
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 28px",
    background: scrolled ? "rgba(13,17,20,0.85)" : "transparent",
    backdropFilter: scrolled ? "blur(8px)" : "none",
    borderBottom: scrolled
      ? `1px solid ${C.panelBorder}`
      : "1px solid transparent",
    transition: "background 0.3s ease, border-color 0.3s ease",
  }}
>
        <span style={{ fontWeight: 700, fontSize: "0.95rem", color: C.ink }}>
          GOUTHAM<span style={{ color: C.teal }}>.</span>
        </span>
        <div style={{
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontSize: "0.82rem"
}}>
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              style={{
                padding: "6px 12px", borderRadius: 6, textDecoration: "none",
                color: active === n.id ? C.teal : C.inkDim,
                background: active === n.id ? C.tealSoft : "transparent",
                transition: "color 0.2s ease, background 0.2s ease",
              }}
            >
              {n.label}
            </a>
          ))}
        </div>
      </div>

      {/* side progress dots */}
      <div style={{ position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 30, display: "flex", flexDirection: "column", gap: 10 }}>
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} title={n.label} style={{ display: "block" }}>
            <span style={{
              display: "block", width: active === n.id ? 9 : 6, height: active === n.id ? 9 : 6,
              borderRadius: "50%", background: active === n.id ? C.teal : "rgba(255,255,255,0.18)",
              boxShadow: active === n.id ? `0 0 8px ${C.teal}` : "none",
              transition: "all 0.25s ease",
            }} />
          </a>
        ))}
      </div>
    </>
  );
}

// ---------------------------------------------------------------
// Tilt card wrapper — subtle 3D response to mouse position
// ---------------------------------------------------------------
function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 8 });
  }
  function onLeave() { setTilt({ x: 0, y: 0 }); }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------
// Spider-web corner motif — original geometric web + a generic
// spider silhouette (not any copyrighted character), playing on
// "web security".
// ---------------------------------------------------------------
function SpiderWeb({ size = 220, corner = "top-right", opacity = 0.5 }) {
  const cx = corner.includes("right") ? size : 0;
  const cy = corner.includes("top") ? 0 : size;
  const rings = [0.3, 0.55, 0.8, 1.05, 1.3].map((f) => f * (size * 0.55));
  const spokes = 7;
  const spokeLines = Array.from({ length: spokes }).map((_, i) => {
    const angle = (Math.PI / 2) * (i / (spokes - 1)) * (corner.includes("right") ? -1 : 1) + (corner.includes("top") ? Math.PI : 0);
    const baseAngle = corner === "top-right" ? Math.PI + (Math.PI / 2) * (i / (spokes - 1))
      : corner === "top-left" ? (Math.PI / 2) * (i / (spokes - 1)) - Math.PI / 2
      : corner === "bottom-right" ? (Math.PI / 2) * (i / (spokes - 1)) + Math.PI / 2
      : (Math.PI / 2) * (i / (spokes - 1));
    const len = rings[rings.length - 1];
    return { x: cx + len * Math.cos(baseAngle), y: cy + len * Math.sin(baseAngle) };
  });

  const posStyle = {
    position: "absolute",
    top: corner.includes("top") ? 0 : "auto",
    bottom: corner.includes("bottom") ? 0 : "auto",
    left: corner.includes("left") ? 0 : "auto",
    right: corner.includes("right") ? 0 : "auto",
    opacity,
    pointerEvents: "none",
  };

  return (
    <svg width={size} height={size} style={posStyle}>
      {rings.map((r, i) => (
        <path
          key={i}
          d={describeArcQuarter(cx, cy, r, corner)}
          fill="none"
          stroke={C.teal}
          strokeWidth="1"
          opacity={0.5}
        />
      ))}
      {spokeLines.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={C.teal} strokeWidth="1" opacity={0.45} />
      ))}
      {/* dew-drop glints along a couple of strands */}
      <circle cx={cx + rings[2] * 0.6} cy={cy + rings[2] * 0.5 * (corner.includes("top") ? 1 : -1)} r="2" fill={C.tealBright} opacity="0.8" />
      <circle cx={cx + rings[3] * 0.4} cy={cy + rings[3] * 0.75 * (corner.includes("top") ? 1 : -1)} r="1.6" fill={C.tealBright} opacity="0.6" />
    </svg>
  );
}

// A thin horizontal strand with a few draped threads and anchor
// dots, used in place of plain section borders.
function WebDivider() {
  const anchors = [40, 130, 230, 340, 440, 560, 680, 800, 900];
  return (
    <svg width="100%" height="26" viewBox="0 0 940 26" preserveAspectRatio="none" style={{ display: "block", opacity: 0.55 }}>
      <line x1="0" y1="1" x2="940" y2="1" stroke={C.panelBorder} strokeWidth="1" />
      {anchors.map((x, i) => (
        <path key={i} d={`M ${x} 1 Q ${x + 20} 16 ${x + 45} 1`} fill="none" stroke={C.panelBorder} strokeWidth="1" />
      ))}
      {anchors.map((x, i) => (
        <circle key={"d" + i} cx={x} cy={1} r="1.6" fill={C.teal} opacity="0.6" />
      ))}
    </svg>
  );
}

// Small spider that eases toward the cursor with a little lag and
// lightly bobs — a companion, not a copyrighted character.
function CrawlingSpider() {
  const target = useRef({ x: -200, y: -200 });
  const pos = useRef({ x: -200, y: -200 });
  const [render, setRender] = useState({ x: -200, y: -200, angle: 0 });

  useEffect(() => {
    const onMove = (e) => { target.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    let raf;
    function tick() {
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      pos.current.x += dx * 0.08;
      pos.current.y += dy * 0.08;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      setRender({ x: pos.current.x, y: pos.current.y, angle });
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <div style={{ position: "fixed", left: render.x - 30, top: render.y + 18, zIndex: 44, pointerEvents: "none", transform: `rotate(${render.angle}deg)` }}>
      <SpiderSilhouette size={22} style={{ opacity: 0.75 }} />
    </div>
  );
}
function describeArcQuarter(cx, cy, r, corner) {
  let startAngle, endAngle;
  if (corner === "top-right") { startAngle = 90; endAngle = 180; }
  else if (corner === "top-left") { startAngle = 0; endAngle = 90; }
  else if (corner === "bottom-right") { startAngle = 180; endAngle = 270; }
  else { startAngle = 270; endAngle = 360; }
  const toRad = (a) => (a * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
}

// Simple, generic spider silhouette — plain oval body + 8 legs,
// not based on any character design.
function SpiderSilhouette({ size = 26, style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 60 42" style={style}>
      <g stroke={C.ink} strokeWidth="2" fill="none" strokeLinecap="round">
        <line x1="26" y1="18" x2="4" y2="6" />
        <line x1="26" y1="20" x2="2" y2="18" />
        <line x1="26" y1="24" x2="4" y2="32" />
        <line x1="26" y1="26" x2="8" y2="40" />
        <line x1="34" y1="18" x2="56" y2="6" />
        <line x1="34" y1="20" x2="58" y2="18" />
        <line x1="34" y1="24" x2="56" y2="32" />
        <line x1="34" y1="26" x2="52" y2="40" />
      </g>
      <ellipse cx="30" cy="16" rx="6" ry="5" fill={C.ink} />
      <ellipse cx="30" cy="27" rx="10" ry="9" fill={C.ink} />
    </svg>
  );
}

// ---------------------------------------------------------------
// Scroll-reveal
// ---------------------------------------------------------------
function Reveal({ children, style = {}, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", ...style }}>
      {children}
    </div>
  );
}

function useParallax(factor = 0.1) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setOffset((rect.top - window.innerHeight / 2) * factor);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [factor]);
  return [ref, offset];
}

function Chip({ children }) {
  return (
    <span style={{ fontFamily: "monospace", fontSize: "0.66rem", color: C.inkDim, border: `1px solid ${C.panelBorder}`, padding: "4px 9px", borderRadius: 6, display: "inline-block", background: "rgba(255,255,255,0.02)" }}>
      {children}
    </span>
  );
}

function SectionHead({ icon: Icon, title, meta }) {
  return (
    <div
  className="flex items-baseline justify-between"
  style={{
    marginBottom: 22,
    width: "100%",
  }}
>
      <h2 className="flex items-center gap-3" style={{ fontWeight: 700, fontSize: "1.35rem", margin: 0, color: C.ink }}>
        <span className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${C.panelBorderStrong}`, background: C.tealSoft }}>
          <Icon size={17} color={C.teal} />
        </span>
        {title}
      </h2>
      {meta && <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: C.inkDim }}>{meta}</span>}
    </div>
  );
}

// ---------------------------------------------------------------
// Main component
// ---------------------------------------------------------------
export default function GouthamDashboardPortfolio() {
  const [dashRef, dashOffset] = useParallax(0.06);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.ink, fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif", position: "relative", cursor: `url(${WEB_CURSOR}) 2 2, auto` }}>
      <style>{`
        @keyframes blinkCursor { 50% { border-color: transparent; } }
        @keyframes dangleSwing {
          0%, 100% { transform: rotate(-6deg) translateY(0); }
          50% { transform: rotate(6deg) translateY(4px); }
        }
        a, button { cursor: inherit; }
      `}</style>
      <MouseNetwork />
      <StickyNav />
      <CrawlingSpider />

      <div style={{ position: "fixed", top: 0, right: 0, zIndex: 2, pointerEvents: "none" }}>
        <SpiderWeb size={200} corner="top-right" opacity={0.4} />
        <div style={{ position: "absolute", top: 92, right: 46, transformOrigin: "top center", animation: "dangleSwing 4s ease-in-out infinite" }}>
          <div style={{ width: 1, height: 34, background: C.panelBorderStrong, margin: "0 auto" }} />
          <SpiderSilhouette size={22} />
        </div>
      </div>


      <div
  style={{
    width: "100%",
    maxWidth: 900,
    margin: "0 auto",
    padding: "0 24px",
    position: "relative",
    zIndex: 1,
  }}
>
        {/* HERO */}
        <section
  id="hero"
  style={{
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr 420px",
    alignItems: "center",
    gap: 40,
    paddingTop: 60,
    paddingBottom: 40,
    position: "relative",
  }}
>
          <SpiderWeb size={240} corner="top-right" opacity={0.45} />
          <SpiderWeb size={150} corner="bottom-left" opacity={0.28} />
          <div style={{ flex: "1 1 380px", textAlign: "left" }}>
            <div className="flex items-center gap-2" style={{ marginBottom: 18 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.teal, boxShadow: `0 0 8px ${C.teal}` }} />
              <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: C.inkDim, letterSpacing: "0.02em" }}>MONITORING ACTIVE</span>
              <SpiderSilhouette size={20} style={{ marginLeft: 8, opacity: 0.6 }} />
            </div>
            <h1 style={{ fontWeight: 800, fontSize: "clamp(2.4rem, 6vw, 3.6rem)", lineHeight: 1.05, margin: 0, letterSpacing: "-0.02em", textAlign: "left" }}>
              Goutham
            </h1>
            <div style={{ color: C.teal, fontWeight: 500, fontSize: "1.05rem", marginTop: 8, minHeight: "1.4em", textAlign: "left" }}>
              <Typewriter text="Cybersecurity Analyst — Security Monitoring & Threat Analysis" />
            </div>
            <p style={{ color: C.inkDim, marginTop: 18, maxWidth: 460, lineHeight: 1.6, textAlign: "left" }}>
              Enthusiastic cybersecurity professional with a foundation in ethical hacking, penetration testing, and
              incident response — focused on threat analysis, vulnerability assessment, and day-to-day security operations.
            </p>
            <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 26,
    justifyContent: "flex-start",
    maxWidth: 520,
  }}
>
              <a href="mailto:goutham.cyber@proton.me" className="flex items-center gap-2" style={{ fontFamily: "monospace", fontSize: "0.78rem", border: `1px solid ${C.panelBorder}`, padding: "9px 12px", borderRadius: 8, color: C.ink, textDecoration: "none", background: C.panel, flexShrink:0 }}>
                <Mail size={14} color={C.teal} /> goutham.cyber@proton.me
              </a>
              <a href="tel:8072408520" className="flex items-center gap-2" style={{ fontFamily: "monospace", fontSize: "0.78rem", border: `1px solid ${C.panelBorder}`, padding: "9px 12px", borderRadius: 8, color: C.ink, textDecoration: "none", background: C.panel, whiteSpace:"nowrap" }}>
                <Phone size={14} color={C.teal} /> 8072408520
              </a>
              <a href="https://www.linkedin.com/in/gouthamh4k" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" style={{ fontFamily: "monospace", fontSize: "0.78rem", border: `1px solid ${C.panelBorder}`, padding: "9px 12px", borderRadius: 8, color: C.ink, textDecoration: "none", background: C.panel }}>
                <Network size={14} color={C.teal} /> linkedin.com/in/gouthamh4k
              </a>
            </div>
          </div>

          <div
  ref={dashRef}
  style={{
    width: "100%",
    transform: `translateY(${dashOffset}px)`,
    transition: "transform 0.1s linear",
  }}
>
            <TiltCard>
              <DashboardGraphic width={420} />
            </TiltCard>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={{ padding: "60px 0" }}>
          <WebDivider />
          <Reveal><SectionHead icon={Activity} title="Technical Skills" meta="7 domains" /></Reveal>
          <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
  }}
>
            {SKILL_GROUPS.map((g, i) => {
              const Icon = g.icon;
              return (
                <Reveal key={g.label} delay={i * 50}>
                  <TiltCard style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 12, padding: 20 }}>
                    <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  }}
>
                      <Icon size={16} color={C.teal} />
                      <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>{g.label}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((item) => <Chip key={item}>{item}</Chip>)}
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" style={{ padding: "42px 0" }}>
          <WebDivider />
          <Reveal><SectionHead icon={RadarIcon} title="Projects" meta={`${PROJECTS.length} engagements`} /></Reveal>
        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 16,
    alignItems: "stretch",
  }}
>
            {PROJECTS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={idx * 60}>
                  <TiltCard
  style={{
    background: C.panel,
    border: `1px solid ${C.panelBorder}`,
    borderRadius: 12,
    padding: 18,
    minHeight: 290,
    height: "100%",
    boxSizing: "border-box",
    textAlign: "left",
  }}
>
                    <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 7, background: C.tealSoft }}>
                        <Icon size={14} color={C.teal} />
                      </span>
                      <span style={{ fontFamily: "monospace", fontSize: "0.66rem", padding: "3px 8px", borderRadius: 6, border: `1px solid ${SEV_COLOR[p.sev]}`, color: SEV_COLOR[p.sev] }}>{p.tag}</span>
                    </div>
                    <h3
  style={{
    fontWeight: 600,
    fontSize: "0.98rem",
    lineHeight: 1.35,
    margin: 0,
    color: C.ink,
    textAlign: "left",
  }}
>
  {p.title}
</h3>
                    <div
  style={{
    fontSize: "0.72rem",
    color: C.inkDim,
    margin: "5px 0 12px",
    textAlign: "left",
  }}
>
  {p.sub}
</div>
                    <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                      {p.bullets.map((b, i) => (
                        <li
  key={i}
  style={{
    fontSize: "0.76rem",
    color: "#a7b0b3",
    paddingLeft: 14,
    position: "relative",
    marginBottom: 7,
    lineHeight: 1.45,
    textAlign: "left",
  }}
>
                          <span style={{ position: "absolute", left: 0, color: C.teal }}>›</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certs" style={{ padding: "42px 0" }}>
          <WebDivider />
          <Reveal><SectionHead icon={Award} title="Certifications & Education" /></Reveal>
          <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 14,
  }}
>
            {CREDENTIALS.map((c, idx) => (
              <Reveal key={c.name} delay={idx * 50}>
                <div
  style={{
    background: C.panel,
    border: `1px solid ${C.panelBorder}`,
    borderRadius: 10,
    padding: "14px 16px",
    minHeight: 96,
    boxSizing: "border-box",
  }}
>
                  <div
  style={{
    fontWeight: 600,
    fontSize: "0.82rem",
    lineHeight: 1.35,
    color: C.ink,
  }}
>
  {c.name}
</div>
                  <div
  style={{
    fontSize: "0.72rem",
    color: C.inkDim,
    marginTop: 5,
    lineHeight: 1.35,
  }}
>
  {c.org}
</div>
                  <div
  style={{
    fontFamily: "monospace",
    fontSize: "0.68rem",
    color: C.teal,
    marginTop: 8,
  }}
>
  {c.yr}
</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ marginTop: 24 }}>
            <div style={{ fontWeight: 600, fontSize: "0.82rem", marginBottom: 10, color: C.ink, textAlign: "left"}}>Other</div>
            <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
              {OTHER.map((o, i) => (
                <li
  key={i}
  style={{
    fontSize: "0.78rem",
    color: "#a7b0b3",
    paddingLeft: 14,
    position: "relative",
    marginBottom: 7,
    lineHeight: 1.5,
    textAlign: "left",
  }}
>
                  <span style={{ position: "absolute", left: 0, color: C.teal }}>›</span>{o}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal style={{ marginTop: 24 }}>
            <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: 10, color: C.ink, textAlign: "left" }}>Soft Skills</div>
            <div style={{
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
}}>
              {SOFT_SKILLS.map((s) => <Chip key={s}>{s}</Chip>)}
            </div>
            <div style={{ fontSize: "0.85rem", color: C.inkDim, marginTop: 14, textAlign: "left" }}>Languages: Tamil · English</div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "42px 0" }}>
          <WebDivider />
          <Reveal>
            <h2 style={{ fontWeight: 700, fontSize: "1.8rem", marginBottom: 10, color: C.ink }}>Contact &amp; Profiles</h2>
            <div style={{ width: 90, height: 2, background: `linear-gradient(90deg, ${C.teal}, transparent)`, marginBottom: 36 }} />
          </Reveal>

          {/* primary contact cards */}
          <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    marginBottom: 28,
  }}
>
            <Reveal>
              <a href="mailto:goutham.cyber@proton.me" style={{ display: "block", textDecoration: "none", textAlign: "center", padding: "28px 16px", background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 10 }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: C.tealSoft, marginBottom: 12 }}>
                  <Mail size={18} color={C.teal} />
                </div>
                <div style={{ fontWeight: 700, color: C.teal, marginBottom: 6 }}>Email</div>
                <div style={{ fontFamily: "monospace", fontSize: "0.85rem", color: C.ink }}>goutham.cyber@proton.me</div>
              </a>
            </Reveal>
            <Reveal delay={60}>
              <a href="tel:+918072408520" style={{ display: "block", textDecoration: "none", textAlign: "center", padding: "28px 16px", background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 10 }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: C.tealSoft, marginBottom: 12 }}>
                  <Phone size={18} color={C.teal} />
                </div>
                <div style={{ fontWeight: 700, color: C.teal, marginBottom: 6 }}>Phone</div>
                <div style={{ fontFamily: "monospace", fontSize: "0.85rem", color: C.ink }}>+91 8072408520</div>
              </a>
            </Reveal>
            <Reveal delay={120}>
              <a href="https://www.linkedin.com/in/gouthamh4k" target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", textAlign: "center", padding: "28px 16px", background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 10 }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: C.tealSoft, marginBottom: 12 }}>
                  <Network size={18} color={C.teal} />
                </div>
                <div style={{ fontWeight: 700, color: C.teal, marginBottom: 6 }}>LinkedIn</div>
                <div style={{ fontFamily: "monospace", fontSize: "0.85rem", color: C.ink }}>Click here</div>
              </a>
            </Reveal>
          </div>

          {/* secondary info row */}
          <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
  }}
>
            <Reveal>
              <div style={{ borderLeft: `2px solid ${C.teal}`, paddingLeft: 16 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                  <MapPin size={15} color={C.teal} />
                  <span style={{ fontWeight: 700, color: C.teal, fontSize: "0.95rem" }}>Based In</span>
                </div>
                <div style={{ color: "#a7b0b3", fontSize: "0.9rem" }}>Puducherry, India</div>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div style={{ borderLeft: `2px solid ${C.teal}`, paddingLeft: 16 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                  <Clock size={15} color={C.teal} />
                  <span style={{ fontWeight: 700, color: C.teal, fontSize: "0.95rem" }}>Availability</span>
                </div>
                <div style={{ color: "#a7b0b3", fontSize: "0.9rem" }}>Open to full-time roles in cyber offense &amp; defense</div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ borderLeft: `2px solid ${C.teal}`, paddingLeft: 16 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                  <FileText size={15} color={C.teal} />
                  <span style={{ fontWeight: 700, color: C.teal, fontSize: "0.95rem" }}>Resume</span>
                </div>
                <a href="mailto:goutham.cyber@proton.me?subject=Resume%20request" style={{ color: C.teal, fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}>
                  Request by email
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <footer style={{ textAlign: "center", padding: "40px 0 36px" }}>
          <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    width: "100%",
  }}
>
            <a
              href="https://tryhackme.com/p/UsrSpider"
              target="_blank" rel="noopener noreferrer"
              title="TryHackMe"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 42, height: 42, borderRadius: "50%",
                border: `1px solid ${C.panelBorderStrong}`, color: C.teal,
                fontFamily: "monospace", fontSize: "0.68rem", fontWeight: 700,
                textDecoration: "none", background: C.panel,
              }}
            >
              THM
            </a>
          </div>
          <div style={{ fontFamily: "monospace", fontSize: "0.72rem", color: C.inkDim }}>
            © {new Date().getFullYear()} Goutham. All rights reserved.
          </div>
          <div style={{ fontFamily: "monospace", fontSize: "0.66rem", color: "#5a4a4a", marginTop: 4 }}>
            This site uses zero tracking cookies. Your privacy is respected.
          </div>
        </footer>
      </div>
    </div>
  );
}
