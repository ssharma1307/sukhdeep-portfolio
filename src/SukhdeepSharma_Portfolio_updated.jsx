import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/* -------------------------------------------------------------------- */
/* Content — pulled from Sukhdeep's resume                              */
/* -------------------------------------------------------------------- */

const PROFILE = {
  name: 'Sukhdeep Sharma',
  title: 'Software Engineer',
  tagline: 'Java · Spring · AWS · Microservices · SQL/NoSQL',
  location: 'Ontario, Canada',
  phone: '(705) 305-8630',
  email: 'sharma.sukhdeep30@gmail.com',
  linkedin: 'linkedin.com/in/sukhdeep-sharma-3a9b57288',
  linkedinUrl: 'https://linkedin.com/in/sukhdeep-sharma-3a9b57288',
};

const SUMMARY =
  "I build backend systems in Java and Spring Boot — REST APIs, microservices, and the AWS infrastructure " +
  "that runs them. I care about clean data models, code that survives a peer review, and shipping features " +
  "that actually hold up in production. Two years in, still sharpening the fundamentals every sprint.";

const EXPERIENCE = [
  {
    role: 'Software Developer',
    company: 'SparkBrain AI',
    location: 'Remote',
    period: 'Sep 2025 – Apr 2026',
    points: [
      'Developed backend features and enhancements for web applications using Java and Spring Boot as part of an Agile development team.',
      'Built, tested, and maintained RESTful/JSON APIs and microservices, integrating with third-party APIs.',
      'Built and deployed scalable backend components on AWS (Lambda, ECS, DynamoDB, API Gateway).',
      'Designed and optimized database schemas, entities, and SQL queries for relational databases.',
      'Debugged production issues and implemented fixes, contributing to application support documentation.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'Ricoh Canada',
    location: 'Kitchener, ON',
    period: 'Nov 2023 – Aug 2024',
    points: [
      'Collaborated within an Agile team to design, build, and test secure, low-latency Java applications and internal REST APIs for enterprise embedded systems.',
      'Developed web applications using Core Java, OOP, Spring, Spring Boot, and Spring Data/JPA, contributing to a 15% increase in user satisfaction.',
      'Built and enhanced microservices within a distributed architecture, deploying on Docker to optimize resource utilization.',
      'Applied Oracle SQL and MySQL to query, process, and troubleshoot relational data for production applications.',
      'Reduced the scope of errors by 20% through improved error handling and peer code reviews.',
    ],
  },
  {
    role: 'Student Software Developer',
    company: 'Live Deftsoft Pvt Ltd',
    location: 'India',
    period: 'Mar 2020 – Apr 2021',
    points: [
      'Designed and implemented backend logic and web pages using Java, Spring Framework, HTML, React JS, JavaScript, and CSS.',
      'Built backend services using C# alongside Node.js, contributing to API development and server-side logic.',
      'Developed RESTful APIs using Spring, achieving a 30% reduction in API response time.',
      'Applied OOP principles and design patterns (Singleton, Factory), reducing code complexity by 25%.',
      'Used JIRA and Confluence for project management, improving team efficiency by 15%.',
    ],
  },
];

const PROJECTS = [
  {
    name: 'Student Management System',
    stack: 'Java · Spring Boot · REST APIs · MySQL',
    description: 'Implemented authentication, role-based access control, and CRUD operations.',
  },
  {
    name: 'Employee Management System',
    stack: 'Java · JDBC · SQL',
    description: 'Built a reporting module, search functionality, and an object-oriented data model.',
  },
  {
    name: 'Inventory Management System',
    stack: 'Java · SQL',
    description: 'Developed inventory tracking, a reporting dashboard, and relational database integration.',
  },
];

const SKILLS = [
  { group: 'Core Java', items: [
    { label: 'Java', icon: 'coffee' },
    { label: 'OOP', icon: 'cpu' },
    { label: 'Design Patterns', icon: 'grid' },
  ] },
  { group: 'Frameworks', items: [
    { label: 'Spring', icon: 'leaf' },
    { label: 'Spring Boot', icon: 'leaf' },
    { label: 'Spring Data / JPA', icon: 'layers' },
    { label: 'REST / JSON', icon: 'link' },
    { label: 'Microservices', icon: 'layers' },
  ] },
  { group: 'Cloud & DevOps', items: [
    { label: 'AWS Lambda', icon: 'cloud' },
    { label: 'AWS ECS', icon: 'cloud' },
    { label: 'DynamoDB', icon: 'database' },
    { label: 'API Gateway', icon: 'link' },
    { label: 'Docker', icon: 'box' },
    { label: 'CI/CD', icon: 'refresh' },
  ] },
  { group: 'Databases', items: [
    { label: 'Oracle', icon: 'database' },
    { label: 'MySQL', icon: 'database' },
    { label: 'SQL Server', icon: 'database' },
    { label: 'MongoDB', icon: 'database' },
    { label: 'JDBC', icon: 'database' },
  ] },
  { group: 'Tools', items: [
    { label: 'Git', icon: 'git-branch' },
    { label: 'GitHub', icon: 'git-branch' },
    { label: 'Postman', icon: 'send' },
    { label: 'Maven', icon: 'package' },
    { label: 'IntelliJ IDEA', icon: 'terminal' },
    { label: 'Eclipse', icon: 'terminal' },
  ] },
  { group: 'Practices', items: [
    { label: 'Agile / Scrum', icon: 'users' },
    { label: 'TDD', icon: 'check-circle' },
    { label: 'Peer Code Review', icon: 'eye' },
    { label: 'Secure Coding', icon: 'shield' },
    { label: 'API Documentation', icon: 'file-text' },
  ] },
];

/* Small self-contained line-icon set (no external assets/fonts required) */
const ICON_PATHS = {
  coffee: <><path d="M4 8h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" /><path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17" /><path d="M7 3.5c0 .8-.7 1-.7 1.9S7 6.9 7 7.7" /><path d="M10.5 3.5c0 .8-.7 1-.7 1.9s.7 1.5.7 2.3" /></>,
  leaf: <><path d="M5 20c9 0 14-5 14-15-10 0-15 5-15 15z" /><path d="M6 19c3-4 6-7 12-13" /></>,
  cpu: <><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M9 3.5V7M12 3.5V7M15 3.5V7M9 17v3.5M12 17v3.5M15 17v3.5M3.5 9H7M3.5 12H7M3.5 15H7M17 9h3.5M17 12h3.5M17 15h3.5" /></>,
  grid: <><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></>,
  layers: <><path d="M12 3.5 21 8l-9 4.5L3 8z" /><path d="m3 12 9 4.5 9-4.5" /><path d="m3 16 9 4.5 9-4.5" /></>,
  link: <><path d="M9.5 14.5 14.5 9.5" /><path d="M11 6.5 12.7 4.8a3.5 3.5 0 0 1 5 5L15.9 11.4" /><path d="M13 17.5 11.3 19.2a3.5 3.5 0 0 1-5-5L8.1 12.6" /></>,
  cloud: <path d="M7 18h10.5a3.5 3.5 0 0 0 0-7 5.5 5.5 0 0 0-10.6-1.6A4 4 0 0 0 7 18z" />,
  box: <><path d="M12 3.5 20 7.5 12 11.5 4 7.5z" /><path d="M4 7.5V16l8 4.5 8-4.5V7.5" /><path d="M12 11.5V20.5" /></>,
  refresh: <><path d="M20 11a8 8 0 0 0-14.3-4.9M4 13a8 8 0 0 0 14.3 4.9" /><path d="M4 4v4.5H8.5" /><path d="M20 20v-4.5H15.5" /></>,
  database: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /></>,
  'git-branch': <><circle cx="6.5" cy="6" r="2" /><circle cx="6.5" cy="18" r="2" /><circle cx="17" cy="9.5" r="2" /><path d="M6.5 8v8" /><path d="M6.5 8a6 6 0 0 0 6 6H15" /></>,
  send: <path d="M4 12 20.5 4 15 20.5l-4-7.5z" />,
  package: <><path d="M12 3.5 20 7.5 12 11.5 4 7.5z" /><path d="M4 7.5V16l8 4.5 8-4.5V7.5" /><path d="M8 5.5l8 4" /></>,
  terminal: <><rect x="3.5" y="4.5" width="17" height="15" rx="1.5" /><path d="M7 9.5 10.5 12 7 14.5" /><path d="M12.5 14.5h4.5" /></>,
  users: <><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /><path d="M16 8.5a2.7 2.7 0 1 1 0-5.4" /><path d="M15 14c2.5.3 4.5 2.2 4.5 5" /></>,
  'check-circle': <><circle cx="12" cy="12" r="8.5" /><path d="m8.5 12.3 2.4 2.4 4.6-5.2" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.7" /></>,
  shield: <path d="M12 3.5 19 6.5v5c0 5-3 7.7-7 9-4-1.3-7-4-7-9v-5z" />,
  'file-text': <><path d="M7 3.5h7l4 4v13H7z" /><path d="M14 3.5V7.5h4" /><path d="M9.5 12.5h5M9.5 15.5h5M9.5 9.5h1.5" /></>,
  sun: <><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></>,
  moon: <path d="M20 14.2A8.5 8.5 0 1 1 9.8 4a7 7 0 0 0 10.2 10.2z" />,
  download: <><path d="M12 3.5v11" /><path d="M7.5 10.5 12 15l4.5-4.5" /><path d="M4.5 17v2.5a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V17" /></>,
  'table-tennis': <><circle cx="15.5" cy="8.5" r="4.2" /><path d="M12.4 11.6 4 20" /><circle cx="6" cy="18" r="1.1" fill="currentColor" stroke="none" /></>,
  dumbbell: <><rect x="2.5" y="9.5" width="3" height="5" rx="0.8" /><rect x="18.5" y="9.5" width="3" height="5" rx="0.8" /><path d="M5.5 12h1.5M17 12h1.5" /><rect x="7" y="10.3" width="10" height="3.4" rx="0.6" /></>,
  'music-note': <><circle cx="7" cy="18" r="2.6" /><circle cx="17" cy="16" r="2.6" /><path d="M9.5 18V6.5L19.5 4v11.5" /></>,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17" /><path d="M12 3.5c2.6 2.3 4 5.3 4 8.5s-1.4 6.2-4 8.5c-2.6-2.3-4-5.3-4-8.5s1.4-6.2 4-8.5z" /></>,
  person: <><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5" /></>,
};

function SkillIcon({ name, size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}



const BIO =
  "I like my problems the way I like my table tennis rallies: fast, focused, and best solved one clean shot at a time. " +
  "Outside of shipping code, you'll find me at the gym working on consistency, or with a good playlist on while I think " +
  "through a tricky bug. That same discipline — show up, put in the reps, keep a level head — is what I bring to a team.";

const HOBBIES = [
  { label: 'Table Tennis', icon: 'table-tennis' },
  { label: 'Gym', icon: 'dumbbell' },
  { label: 'Listening to Music', icon: 'music-note' },
];

const LANGUAGES = [
  { label: 'English', level: 'Fluent' },
  { label: 'Hindi', level: 'Fluent' },
  { label: 'Punjabi', level: 'Fluent' },
  { label: 'French', level: 'Learning' },
];

const EDUCATION = [
  {
    program: 'Post-Graduate Diploma, Software Development',
    school: 'Conestoga College, Ontario',
  },
  {
    program: 'Bachelor of Technology, Computer Science Engineering',
    school: 'Manav Rachna International University, India',
  },
];

const TECH_NODES = [
  { label: 'Java', color: 0x5fa8ff },
  { label: 'Spring Boot', color: 0x5fa8ff },
  { label: 'AWS', color: 0xf2a65a },
  { label: 'Docker', color: 0x5fa8ff },
  { label: 'Microservices', color: 0xf2a65a },
  { label: 'MySQL', color: 0x5fa8ff },
  { label: 'MongoDB', color: 0x5fa8ff },
  { label: 'Git', color: 0xf2a65a },
];

/* -------------------------------------------------------------------- */
/* 3D hero — orbiting tech-stack network                                */
/* -------------------------------------------------------------------- */

function makeLabelSprite(text, textColor, haloColor) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const fontSize = 44;
  ctx.font = `500 ${fontSize}px 'Space Grotesk', sans-serif`;
  const padding = 10;
  const textWidth = ctx.measureText(text).width;
  canvas.width = textWidth + padding * 2;
  canvas.height = fontSize + padding * 2;
  ctx.font = `500 ${fontSize}px 'Space Grotesk', sans-serif`;
  ctx.textBaseline = 'middle';
  // Soft halo instead of a solid background chip, so only the text is visible
  ctx.lineWidth = 7;
  ctx.strokeStyle = haloColor;
  ctx.lineJoin = 'round';
  ctx.strokeText(text, padding, canvas.height / 2 + 2);
  ctx.fillStyle = textColor;
  ctx.fillText(text, padding, canvas.height / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  const scale = 0.013;
  sprite.scale.set(canvas.width * scale, canvas.height * scale, 1);
  return sprite;
}

function fibonacciSphere(count, radius) {
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }
  return points;
}

function TechOrbit({ theme }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isLight = theme === 'light';
    const labelText = isLight ? '#171A2B' : '#E9EAF0';
    const labelHalo = isLight ? '#F6F7FB' : '#0F1320';
    const lineColor = isLight ? 0xc3c9dc : 0x3a4160;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.x = -0.15;
    scene.add(group);

    const coreGeo = new THREE.IcosahedronGeometry(1.1, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x5fa8ff, wireframe: true, transparent: true, opacity: 0.5 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const coreDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.11, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xf2a65a })
    );
    group.add(coreDot);

    const nodeGroup = new THREE.Group();
    group.add(nodeGroup);

    const positions = fibonacciSphere(TECH_NODES.length, 3.05);
    positions.forEach((pos, i) => {
      const tech = TECH_NODES[i];

      const nodeMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.085, 16, 16),
        new THREE.MeshBasicMaterial({ color: tech.color })
      );
      nodeMesh.position.copy(pos);
      nodeGroup.add(nodeMesh);

      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), pos]);
      const lineMat = new THREE.LineBasicMaterial({ color: lineColor, transparent: true, opacity: 0.55 });
      nodeGroup.add(new THREE.Line(lineGeo, lineMat));

      const label = makeLabelSprite(tech.label, labelText, labelHalo);
      label.position.copy(pos.clone().multiplyScalar(1.2));
      nodeGroup.add(label);
    });

    // Drag-to-rotate (mouse + touch, via Pointer Events)
    const drag = { active: false, lastX: 0, lastY: 0 };
    const onPointerDown = (e) => {
      drag.active = true;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      container.style.cursor = 'grabbing';
      container.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e) => {
      if (!drag.active) return;
      const dx = e.clientX - drag.lastX;
      const dy = e.clientY - drag.lastY;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      group.rotation.y += dx * 0.006;
      group.rotation.x += dy * 0.006;
      group.rotation.x = Math.max(-1.3, Math.min(1.3, group.rotation.x));
    };
    const onPointerUp = () => {
      drag.active = false;
      container.style.cursor = 'grab';
    };
    container.style.cursor = 'grab';
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    let frameId;
    const animate = () => {
      if (!prefersReducedMotion && !drag.active) {
        group.rotation.y += 0.0022;
      }
      core.rotation.y -= 0.003;
      core.rotation.x += 0.0015;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (obj.material.map) obj.material.map.dispose();
          obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="orbit-canvas"
      role="img"
      aria-label="Interactive 3D network of Sukhdeep's core technologies orbiting a central node. Drag to rotate."
    />
  );
}

/* -------------------------------------------------------------------- */
/* Scroll-reveal wrapper                                                */
/* -------------------------------------------------------------------- */

function Reveal({ children, delay = 0, as = 'div', className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------- */
/* Contact form — no backend, opens a prefilled email                   */
/* -------------------------------------------------------------------- */

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'a visitor'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form className="sh-contact-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label>
          Name
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
      </div>
      <label>
        Message
        <textarea name="message" rows="4" value={form.message} onChange={handleChange} required />
      </label>
      <div className="form-actions">
        <button type="submit" className="sh-btn primary">Send message</button>
        {sent && <span className="sent-note">Opening your email client…</span>}
      </div>
    </form>
  );
}

const NAV_LINKS = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'personal', label: 'Personal' },
  { id: 'contact', label: 'Contact' },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const nav = document.querySelector('.sh-nav');
  const offset = (nav ? nav.offsetHeight : 70) + 16;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* -------------------------------------------------------------------- */
/* Page                                                                  */
/* -------------------------------------------------------------------- */

export default function Portfolio() {
  const [theme, setTheme] = useState('dark');
  return (
    <div className="sh-portfolio" data-theme={theme}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

        .nav-profile-image {
            width: 34px;
            height: 34px;
            min-width: 34px;
            max-width: 34px;
            min-height: 34px;
            max-height: 34px;
            border-radius: 50%;
            object-fit: cover;
            object-position: center;
            display: block;
            flex-shrink: 0;
          }

        .sh-portfolio {
          --bg: #0F1320;
          --bg-panel: #161B2E;
          --line: #262C42;
          --text: #E9EAF0;
          --text-muted: #8A90A6;
          --accent: #5FA8FF;
          --accent-warm: #F2A65A;
          --nav-bg: rgba(15, 19, 32, 0.86);

          background: var(--bg);
          color: var(--text);
          font-family: 'IBM Plex Sans', system-ui, sans-serif;
          line-height: 1.6;
          min-height: 100vh;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .sh-portfolio[data-theme='light'] {
          --bg: #F6F7FB;
          --bg-panel: #FFFFFF;
          --line: #DFE3EE;
          --text: #171A2B;
          --text-muted: #5B6178;
          --accent: #2F6FE0;
          --accent-warm: #B9660F;
          --nav-bg: rgba(246, 247, 251, 0.86);
        }
        .sh-portfolio * { box-sizing: border-box; }
        .sh-portfolio a { color: var(--accent); text-decoration: none; }
        .sh-portfolio a:hover { text-decoration: underline; }
        .sh-portfolio :focus-visible { outline: 2px solid var(--accent-warm); outline-offset: 3px; }
        .sh-portfolio h1, .sh-portfolio h2, .sh-portfolio h3 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-weight: 600;
          margin: 0;
          color: var(--text);
        }

        .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .sh-portfolio * { transition: none !important; animation: none !important; }
        }

        .sh-nav {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 6vw;
          background: var(--nav-bg);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--line);
          transition: background 0.3s ease;
        }
        .sh-nav .mark { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 1.05rem; }
        .sh-nav-right { display: flex; align-items: center; gap: 28px; }
        .sh-nav ul { list-style: none; display: flex; gap: 28px; margin: 0; padding: 0; }
        .sh-nav ul a { color: var(--text-muted); font-size: 0.92rem; position: relative; }
        .sh-nav ul a::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -5px;
          height: 1px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .sh-nav ul a:hover { color: var(--text); text-decoration: none; }
        .sh-nav ul a:hover::after { transform: scaleX(1); }
        .theme-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--text);
          cursor: pointer;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .theme-toggle:hover { border-color: var(--accent); transform: rotate(15deg); }

        .sh-section { padding: 72px 6vw; max-width: 1180px; margin: 0 auto; scroll-margin-top: 84px; }
        .sh-section + .sh-section { border-top: 1px solid var(--line); }
        .sh-kicker {
          font-size: 0.85rem;
          color: var(--accent);
          font-family: 'Space Grotesk', sans-serif;
          margin: 0 0 10px 0;
        }
        .sh-section h2 { font-size: 1.7rem; margin-bottom: 32px; }

        .sh-hero {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          align-items: center;
          gap: 40px;
          padding: 60px 6vw 80px;
          max-width: 1180px;
          margin: 0 auto;
          min-height: 78vh;
        }
        .sh-hero > * { min-width: 0; }
        .sh-hero h1 { font-size: clamp(2.4rem, 4.2vw, 3.6rem); line-height: 1.08; }
        .sh-hero .role { font-size: 1.15rem; color: var(--accent-warm); margin-top: 10px; font-family: 'Space Grotesk', sans-serif; }
        .sh-hero .tagline { color: var(--text-muted); margin-top: 18px; max-width: 46ch; }
        .sh-hero .contact-line { margin-top: 22px; color: var(--text-muted); font-size: 0.92rem; }
        .sh-hero .contact-line span { margin-right: 14px; }
        .sh-cta { display: flex; gap: 14px; margin-top: 30px; flex-wrap: wrap; }
        .sh-btn {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.92rem;
          padding: 12px 22px;
          border-radius: 4px;
          border: 1px solid var(--line);
        }
        .sh-btn { transition: transform 0.2s ease, opacity 0.2s ease, border-color 0.2s ease; display: inline-flex; align-items: center; gap: 8px; }
        .sh-btn:hover { transform: translateY(-2px); }
        .sh-btn.primary { background: var(--accent); color: #0F1320; border-color: var(--accent); font-weight: 600; }
        .sh-btn.primary:hover { text-decoration: none; opacity: 0.9; }
        .sh-btn.secondary { color: var(--text); }
        .sh-btn.secondary:hover { border-color: var(--accent); text-decoration: none; }

        .orbit-canvas { width: 100%; height: 420px; max-width: 100%; overflow: hidden; cursor: grab; touch-action: none; }
        .orbit-canvas canvas { display: block; width: 100% !important; height: 100% !important; }
        .orbit-hint { margin-top: 8px; font-size: 0.78rem; color: var(--text-muted); text-align: center; }

        .sh-summary p { max-width: 68ch; color: var(--text-muted); font-size: 1.02rem; }

        .sh-timeline { position: relative; padding-left: 28px; }
        .sh-timeline::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 6px;
          bottom: 6px;
          width: 1px;
          background: var(--line);
        }
        .sh-role { position: relative; margin-bottom: 46px; }
        .sh-role:last-child { margin-bottom: 0; }
        .sh-role::before {
          content: '';
          position: absolute;
          left: -28px;
          top: 6px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: var(--bg);
          border: 2px solid var(--accent);
        }
        .sh-role-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px; margin-bottom: 4px; }
        .sh-role-head h3 { font-size: 1.15rem; }
        .sh-role-head .company { color: var(--accent-warm); font-family: 'Space Grotesk', sans-serif; }
        .sh-role-meta { color: var(--text-muted); font-size: 0.88rem; margin-bottom: 14px; }
        .sh-role ul { margin: 0; padding-left: 20px; color: var(--text-muted); }
        .sh-role li { margin-bottom: 8px; }

        .sh-projects { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .sh-project-card {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 6px;
          padding: 24px;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .sh-project-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.22);
        }
        .sh-project-card h3 { font-size: 1.05rem; margin-bottom: 10px; }
        .sh-project-card .stack { color: var(--accent); font-size: 0.82rem; font-family: 'Space Grotesk', sans-serif; margin-bottom: 12px; display: block; }
        .sh-project-card p { color: var(--text-muted); font-size: 0.92rem; margin: 0; }

        .sh-skills { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px 32px; }
        .sh-skill-group h3 { font-size: 0.95rem; color: var(--accent-warm); font-family: 'Space Grotesk', sans-serif; margin-bottom: 12px; }
        .sh-tags { display: flex; flex-wrap: wrap; gap: 10px; list-style: none; margin: 0; padding: 0; }
        .sh-tags li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-muted);
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 7px 12px 7px 8px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .sh-tags li:hover { border-color: var(--accent); transform: translateY(-2px); }
        .icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 5px;
          background: rgba(95, 168, 255, 0.12);
          color: var(--accent);
          flex-shrink: 0;
        }

        .sh-education { display: grid; gap: 18px; }
        .sh-edu-item { border-left: 2px solid var(--line); padding-left: 18px; }
        .sh-edu-item h3 { font-size: 1.02rem; }
        .sh-edu-item p { color: var(--text-muted); margin: 4px 0 0; font-size: 0.92rem; }

        .sh-personal { display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; margin-top: 8px; }
        .sh-personal-intro { display: flex; gap: 20px; align-items: flex-start; }
        .avatar-badge {
          flex-shrink: 0;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          overflow: hidden;
        }
        .avatar-illustration { width: 100%; height: 100%; display: block; }
        .about-profile-image { width: 100%; height: 100%; display: block; object-fit: cover; object-position: center; }
        .sh-personal-intro .bio { color: var(--text-muted); font-size: 1rem; max-width: 52ch; margin: 0; }
        .sh-personal-side { display: flex; flex-direction: column; gap: 28px; }
        .sh-personal-side h3 {
          font-size: 0.95rem;
          color: var(--accent-warm);
          font-family: 'Space Grotesk', sans-serif;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sh-languages { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; max-width: 260px; }
        .sh-languages li {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          padding: 8px 0;
          border-bottom: 1px solid var(--line);
          color: var(--text);
        }
        .lang-level { color: var(--text-muted); font-size: 0.82rem; }

        @media (max-width: 860px) {
          .sh-personal { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 520px) {
          .sh-personal-intro { flex-direction: column; align-items: flex-start; }
        }

        .sh-footer {
          padding: 56px 6vw 64px;
          text-align: left;
          color: var(--text-muted);
          border-top: 1px solid var(--line);
          scroll-margin-top: 84px;
        }
        .sh-footer h2 { margin-bottom: 12px; }
        .sh-footer .links { margin-top: 18px; display: flex; gap: 22px; flex-wrap: wrap; }
        .sh-footer .fine { margin-top: 40px; font-size: 0.8rem; color: #565C74; }

        .sh-contact-form { display: flex; flex-direction: column; gap: 16px; margin-top: 32px; max-width: 540px; }
        .sh-contact-form .field-row { display: flex; gap: 16px; }
        .sh-contact-form label { display: flex; flex-direction: column; gap: 6px; font-size: 0.85rem; color: var(--text-muted); flex: 1; }
        .sh-contact-form input, .sh-contact-form textarea {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 10px 12px;
          color: var(--text);
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.92rem;
          resize: vertical;
          transition: border-color 0.2s ease;
        }
        .sh-contact-form input:focus, .sh-contact-form textarea:focus { outline: none; border-color: var(--accent); }
        .form-actions { display: flex; align-items: center; gap: 14px; }
        .sent-note { font-size: 0.85rem; color: var(--accent); }
        @media (max-width: 520px) {
          .sh-contact-form .field-row { flex-direction: column; }
        }

        @media (max-width: 860px) {
          .sh-hero { grid-template-columns: 1fr; min-height: auto; padding-top: 40px; padding-left: 5vw; padding-right: 5vw; }
          .orbit-canvas { height: 280px; order: -1; }
          .sh-projects { grid-template-columns: 1fr; }
          .sh-skills { grid-template-columns: 1fr 1fr; }
          .sh-nav ul { gap: 16px; }
        }
        @media (max-width: 520px) {
          .sh-nav ul { display: none; }
          .sh-skills { grid-template-columns: 1fr; }
        }
        .sh-hero > div:last-child { min-width: 0; }
      `}
      </style>

      <nav className="sh-nav">
              <span className="mark">
                <img
                  src={`${import.meta.env.BASE_URL}about-profile.jpeg`}
                  alt="Sukhdeep Sharma"
                  className="nav-profile-image"
                />
              </span>
        <div className="sh-nav-right">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="theme-toggle"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            type="button"
          >
            <SkillIcon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
        </div>
      </nav>

      <header className="sh-hero">
        <div>
          <h1>{PROFILE.name}</h1>
          <div className="role">{PROFILE.title}</div>
          <p className="tagline">{PROFILE.tagline}</p>
          <div className="contact-line">
            <span>{PROFILE.location}</span>
            <span>{PROFILE.phone}</span>
          </div>
          <div className="sh-cta">
            <a className="sh-btn primary" href={`mailto:${PROFILE.email}`}>Email me</a>
            <a className="sh-btn secondary" href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
            {/* Place your résumé PDF at /public/resume.pdf in your project for this link to work */}
            <a className="sh-btn secondary" href="./resume.pdf" download>
              <SkillIcon name="download" /> Résumé
            </a>
          </div>
        </div>
        <div>
          <TechOrbit theme={theme} />
          <p className="orbit-hint">Drag to rotate</p>
        </div>
      </header>

      <section className="sh-section sh-summary" id="about">
        <Reveal>
          <p className="sh-kicker">About</p>
          <h2>A bit about how I work</h2>
          <p>{SUMMARY}</p>
        </Reveal>
      </section>

      <section className="sh-section" id="experience">
        <p className="sh-kicker">Career</p>
        <h2>Experience</h2>
        <div className="sh-timeline">
          {EXPERIENCE.map((job, idx) => (
            <Reveal as="div" className="sh-role" delay={idx * 100} key={job.company}>
              <div className="sh-role-head">
                <h3>{job.role}</h3>
                <span className="company">{job.company}</span>
              </div>
              <div className="sh-role-meta">{job.location} · {job.period}</div>
              <ul>
                {job.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sh-section" id="projects">
        <p className="sh-kicker">Build log</p>
        <h2>Projects</h2>
        <div className="sh-projects">
          {PROJECTS.map((project, idx) => (
            <Reveal as="div" className="sh-project-card" delay={idx * 90} key={project.name}>
              <h3>{project.name}</h3>
              <span className="stack">{project.stack}</span>
              <p>{project.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sh-section" id="skills">
        <p className="sh-kicker">Toolbox</p>
        <h2>Skills</h2>
        <div className="sh-skills">
          {SKILLS.map((group, idx) => (
            <Reveal as="div" className="sh-skill-group" delay={idx * 70} key={group.group}>
              <h3>{group.group}</h3>
              <ul className="sh-tags">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <span className="icon-wrap"><SkillIcon name={item.icon} /></span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sh-section" id="education">
        <p className="sh-kicker">Background</p>
        <h2>Education</h2>
        <div className="sh-education">
          {EDUCATION.map((edu, idx) => (
            <Reveal as="div" className="sh-edu-item" delay={idx * 80} key={edu.program}>
              <h3>{edu.program}</h3>
              <p>{edu.school}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sh-section" id="personal">
        <Reveal>
          <p className="sh-kicker">Beyond the code</p>
          <h2>Personal</h2>
        </Reveal>
        <div className="sh-personal">
          <Reveal as="div" className="sh-personal-intro">
            <div className="avatar-badge">
              <img src={`${import.meta.env.BASE_URL}about-profile.jpeg`} alt="Portrait of Sukhdeep Sharma" className="about-profile-image" />
            </div>
            <p className="bio">{BIO}</p>
          </Reveal>
          <Reveal as="div" className="sh-personal-side" delay={100}>
            <div>
              <h3>Hobbies</h3>
              <ul className="sh-tags">
                {HOBBIES.map((hobby) => (
                  <li key={hobby.label}>
                    <span className="icon-wrap"><SkillIcon name={hobby.icon} /></span>
                    {hobby.label}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3><SkillIcon name="globe" size={16} /> Languages</h3>
              <ul className="sh-languages">
                {LANGUAGES.map((lang) => (
                  <li key={lang.label}>
                    <span>{lang.label}</span>
                    <span className="lang-level">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="sh-footer" id="contact">
        <Reveal>
          <h2>Let's talk</h2>
          <p>Open to Software Engineer roles. Reach out any time.</p>
          <div className="links">
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <a href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer">{PROFILE.linkedin}</a>
            <span>{PROFILE.phone}</span>
          </div>
          <ContactForm />
          <p className="fine">{PROFILE.name} — {PROFILE.location}</p>
        </Reveal>
      </footer>
    </div>
  );
}
