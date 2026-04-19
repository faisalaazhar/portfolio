// ============================================================
//  PORTFOLIO DATA  — edit this file to update your portfolio
// ============================================================

export const defaultData = {
  // ── Personal ─────────────────────────────────────────────
  personal: {
    name: 'Md Faisal Ahmed Ridoy',
    shortName: 'Faisal',
    title: 'Full Stack Software Developer',
    tagline: 'I build robust, user-centred web applications with Java, Spring Boot, Angular, and modern JavaScript.',
    email: 'faisalazhar.itu@gmail.com',
    phone: '07946 746 605',
    location: 'Southall, Greater London, UB2 4WN',
    linkedin: 'https://linkedin.com/in/faisalaazhar',  // update with real URL
    github: 'https://github.com/faisalaazhar',
    status: 'available',   // "available" | "working" | "open"   — controls the hero badge
    image: './profile.jpg', // place your photo in /public/profile.jpg
    bio: `I am a dedicated Full Stack Software Developer with over a year and a half of hands-on experience building web applications. I have been developing software since my bachelor's degree, and my recent employment at Era InfoTech allowed me to level my experience further — working with Java, Spring Boot, and Angular on core banking solutions.\n\nI am always looking for new ways to grow and improve my skills. I am excited to find a place where I can use my experience to help a team succeed and create excellent solutions.`,
  },

  // ── Status badge labels ──────────────────────────────────
  statusLabels: {
    available: '✦ Available for work',
    working: '⚙ Currently employed',
    open: '✦ Open to opportunities',
  },

  // ── Experience ───────────────────────────────────────────
  experience: [
    {
      id: 'exp-1',
      role: 'Associate Software Engineer',
      company: 'Era InfoTech Ltd.',
      location: 'Dhaka, Bangladesh',
      period: 'Jun 2023 – Oct 2024',
      bullets: [
        'Developed core banking solutions for leading banks.',
        'Collaborated across graphics, marketing, and QA/testing teams.',
        'Managed source control in Azure DevOps following agile methodology.',
        'Contributed as a full-stack developer to two projects — one using Java Struts, another using Angular and Spring Boot.',
      ],
    },
    {
      id: 'exp-2',
      role: 'Public Relations Officer',
      company: 'East West University Robotics Club',
      location: 'Dhaka, Bangladesh',
      period: 'Aug 2022 – Sep 2023',
      bullets: [
        'Handled social media communications with collaborators and club members.',
        'Organised and managed events, workshops, and competitions with industry experts.',
        'Connected alumni to strengthen the club\'s network and growth.',
      ],
    },
  ],

  // ── Education ────────────────────────────────────────────
  education: [
    {
      id: 'edu-1',
      degree: 'MSc Computer Science',
      institution: 'University College Birmingham',
      location: 'Birmingham, UK',
      period: 'Sep 2024 – Present',
      details: 'Core modules: Computer Networks & Virtualisation, Human-Computer Interaction, OOP, AI & Machine Learning, Data Warehousing, and Web Engineering.',
    },
    {
      id: 'edu-2',
      degree: 'BSc Computer Science and Engineering',
      institution: 'East West University',
      location: 'Dhaka, Bangladesh',
      period: 'Sep 2019 – Jan 2023',
      details: 'Majored in Software Engineering. CGPA: 3.43 / 4.00.',
    },
  ],

  // ── Projects ─────────────────────────────────────────────
  projects: [
    {
      id: 'proj-1',
      name: 'Hybrid Cryptography',
      year: '2023',
      tag: 'Security / Cloud',
      emoji: '🔐',
      color: 'from-amber-50 to-orange-100',
      description: 'Final-year project implementing a hybrid cryptographic algorithm (AES + ECC + SHA-512) for quantum-level secure data storage in cloud computing.',
      stack: ['Python', 'AES', 'ECC', 'SHA-512', 'Cloud Computing'],
      github: '',
      live: '',
    },
    {
      id: 'proj-2',
      name: 'OpenLib',
      year: '2022',
      tag: 'Full Stack',
      emoji: '📚',
      color: 'from-emerald-50 to-teal-100',
      description: 'An online library management web application supporting book cataloguing, member management, and borrowing workflows.',
      stack: ['Django', 'MySQL', 'MongoDB'],
      github: 'https://github.com/faisalaazhar/OpenLib',
      live: '',
    },
    {
      id: 'proj-3',
      name: 'MeetHunger',
      year: '2022',
      tag: 'Full Stack',
      emoji: '🍔',
      color: 'from-rose-50 to-pink-100',
      description: 'An online food delivery and donation platform connecting restaurants, customers, and charity organisations.',
      stack: ['Flask', 'MongoDB', 'Bootstrap'],
      github: 'https://github.com/faisalaazhar/MeetHunger',
      live: '',
    },
    {
      id: 'proj-4',
      name: 'Relgari',
      year: '2022',
      tag: 'Mobile',
      emoji: '🚂',
      color: 'from-sky-50 to-blue-100',
      description: 'An Android application enabling users to buy train tickets online — built as a native Android app.',
      stack: ['Android Studio', 'Java'],
      github: '',
      live: '',
    },
    {
      id: 'proj-5',
      name: 'FaiShop',
      year: '2021',
      tag: 'E-commerce',
      emoji: '🛒',
      color: 'from-violet-50 to-purple-100',
      description: 'A full-stack e-commerce website with product listings, cart, checkout, and user authentication.',
      stack: ['Node.js', 'Express.js', 'React', 'MongoDB'],
      github: 'https://github.com/faisalaazhar/FaiShop',
      live: '',
    },
    {
      id: 'proj-6',
      name: 'Construction Management',
      year: '2020',
      tag: 'No-Code',
      emoji: '🏗️',
      color: 'from-yellow-50 to-amber-100',
      description: 'A client-facing app built with Google AppSheet that creates input fields from Excel data and provides data visualisation dashboards.',
      stack: ['Google AppSheet', 'Excel'],
      github: '',
      live: '',
    },
  ],

  // ── Skills ───────────────────────────────────────────────
  skills: [
    {
      id: 'sk-1',
      category: 'Languages',
      emoji: '💻',
      items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'PL/SQL', 'HTML', 'CSS'],
    },
    {
      id: 'sk-2',
      category: 'Frameworks & Libraries',
      emoji: '🧩',
      items: ['Spring Boot', 'Angular', 'React', 'Node.js', 'Express.js', 'Django', 'Flask', 'Java Struts', 'Tailwind CSS', 'Bootstrap'],
    },
    {
      id: 'sk-3',
      category: 'Databases',
      emoji: '🗄️',
      items: ['MySQL', 'MongoDB', 'Oracle', 'Firebase'],
    },
    {
      id: 'sk-4',
      category: 'Tools & Platforms',
      emoji: '🛠️',
      items: ['Git', 'Azure DevOps', 'Jenkins', 'Docker', 'Linux', 'Postman', 'Android Studio', 'VS Code'],
    },
  ],

  // ── Interests ────────────────────────────────────────────
  interests: ['Travelling', 'Cooking', 'Reading tech news', 'Watching anime', 'Photography', 'Videography', 'Learning new skills'],
};
