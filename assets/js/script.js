$(document).ready(function () {

  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if (window.scrollY > 60) {
      document.querySelector('#scroll-top').classList.add('active');
    } else {
      document.querySelector('#scroll-top').classList.remove('active');
    }

    // scroll spy
    $('section').each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr('id');

      if (top > offset && top < offset + height) {
        $('.navbar ul li a').removeClass('active');
        $('.navbar').find(`[href="#${id}"]`).addClass('active');
      }
    });
  });

  // smooth scrolling
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top,
    }, 500, 'linear')
  });

  // <!-- emailjs to mail contact form data -->
  $("#contact-form").submit(function (event) {
    event.preventDefault();

    // Extract form values before submission for WhatsApp payload and Validation
    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const phone = document.querySelector('input[name="phone"]').value.trim() || "Not provided";
    const message = document.querySelector('textarea[name="message"]').value.trim();

    // 1. Strict Validation
    if (!name || !email || !message) {
      alert("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Initialize EmailJS with the new Public Key
    emailjs.init("gs46SDe26qnvx7xId");

    // 2. UI State Management
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-circle-notch fa-spin"></i>';
    submitBtn.disabled = true;

    // 3. EmailJS Promise Chain (Race Condition Elimination)
    emailjs.sendForm('service_6hiji3f', 'template_gvpf1kf', '#contact-form')
      .then(function (response) {
        console.log('EmailJS SUCCESS!', response.status, response.text);

        // 4. Guaranteed chronological execution (WA decoupled to Floating Button)
        // Clear the form, restore button, show witty success alert
        document.getElementById("contact-form").reset();
        submitBtn.innerHTML = originalBtnHTML;
        submitBtn.disabled = false;
        alert("Boom! 🚀 Transmission received loud and clear. Your message is flying through the cyberwaves to Shivashish's inbox right now. He'll get back to you shortly! ⚡");
      }, function (error) {
        console.error('EmailJS FAILED...', error);
        // Error Resilience: Restore button, notify user gracefully with exact API error
        submitBtn.innerHTML = originalBtnHTML;
        submitBtn.disabled = false;
        alert(`Form Submission Failed! EmailJS Server Says: "${error.text || error.message || "Unknown error"}".\nPlease verify your Template ID and Service configuration and try again.`);
      });
  });
  // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
  function () {
    if (document.visibilityState === "visible") {
      document.title = "Portfolio | Shivashish Prusty";
      $("#favicon").attr("href", "assets/images/favicon.png");
    }
    else {
      document.title = "Come Back To Portfolio";
      $("#favicon").attr("href", "assets/images/favhand.png");
    }
  });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
  strings: ["full-stack ML products", "agentic AI workflows", "applied computer vision", "AI automations", "civic-tech AI", "Modern LLMs"],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
  let response
  type === "skills" ?
    response = await fetch("skills.json")
    :
    response = await fetch("./projects/projects.json")
  const data = await response.json();
  return data;
}

function showSkills(skills) {
  let skillsSection = document.getElementById("skills");
  let skillsContainer = document.getElementById("skillsContainer");
  if (!skillsContainer || !skillsSection) return;

  // Kinetic Spotlight Telemetry (Senior UI/UX Architect Standard)
  skillsSection.addEventListener("mousemove", (e) => {
    const rect = skillsSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    skillsSection.style.setProperty("--mouse-x", `${x}px`);
    skillsSection.style.setProperty("--mouse-y", `${y}px`);
  });

  // Elite Categorization (Luminous Vault Masterpiece Edition)
  const categories = {
    "Cognitive Engines": {
      tag: "AI, ML & Vision",
      desc: "Architecting intelligence through deep neural representations.",
      class: "bento-card--cognitive",
      skills: ["Python (AI/ML)", "TensorFlow", "PyTorch", "scikit-learn", "Pandas & NumPy", "OpenCV & Computer Vision", "n8n & LangChain (Agentic AI)", "Jupyter & Experimentation"],
      items: []
    },
    "The Nervous System": {
      tag: "Backend & Ops",
      desc: "The invisible architecture powering high-performance systems.",
      class: "bento-card--nervous",
      skills: ["FastAPI", "Flask", "PostgreSQL & MongoDB", "Docker", "AWS & GCP", "Git & GitHub"],
      items: []
    },
    "Tactile Interfaces": {
      tag: "Frontend & UX",
      desc: "Where human psychology meets pixel-perfect engineering.",
      class: "bento-card--tactile",
      skills: ["React", "Next.js", "TypeScript & JavaScript", "Tailwind CSS"],
      items: []
    }
  };

  // Logos that require high-contrast visibility fix
  const darkLogos = ["Next.js", "Flask", "Git & GitHub", "Jupyter & Experimentation", "Pandas & NumPy"];

  // Map JSON skills to categories
  skills.forEach(skill => {
    for (const [catName, catData] of Object.entries(categories)) {
      if (catData.skills.includes(skill.name)) {
        catData.items.push(skill);
        break;
      }
    }
  });

  let skillHTML = "";

  for (const [catName, catData] of Object.entries(categories)) {
    let tilesHTML = "";
    catData.items.forEach(item => {
      const isDark = darkLogos.includes(item.name);
      tilesHTML += `
        <div class="skill-tile tilt ${isDark ? 'dark-icon-fix' : ''}">
          <img src="${item.icon}" alt="${item.name}" />
          <span>${item.name}</span>
        </div>`;
    });

    skillHTML += `
      <div class="bento-card ${catData.class} tilt">
        <div class="bento-header">
          <span class="bento-tag">${catData.tag}</span>
          <h3 class="bento-title">${catName}</h3>
          <p class="bento-desc">${catData.desc}</p>
        </div>
        <div class="skill-tiles-grid">
          ${tilesHTML}
        </div>
      </div>
    `;
  }

  // Set the container to the symmetrical grid
  skillsContainer.className = "elite-skills-grid";
  skillsContainer.innerHTML = skillHTML;

  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });
  }
}

function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";
  projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
    projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
  });
  projectsContainer.innerHTML = projectHTML;

  // <!-- tilt js effect starts -->
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
  });
  // <!-- tilt js effect ends -->

  /* ===== SCROLL REVEAL ANIMATION ===== */
  const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
  });

  /* SCROLL PROJECTS */
  srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
  showSkills(data);
});

fetchData("projects").then(data => {
  showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
    return false;
  }
}

/* ==========================================
   CUSTOM AI CHATBOT LOGIC (GEMINI)
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('chat-toggle-btn');
  const chatWindow = document.getElementById('chat-window');
  const closeBtn = document.getElementById('chat-close-btn');
  const chatBody = document.getElementById('chat-body');
  const chatForm = document.getElementById('chat-input-form');
  const chatInput = document.getElementById('chat-input');

  // Fetch the key securely from the Netlify Injected Snippet
  const GEMINI_API_KEY = window.GEMINI_API_KEY;

  // Safety check: Warn in the console if the key isn't loaded yet
  if (!GEMINI_API_KEY) {
    console.error("System Alert: Gemini API Key is missing from the window environment.");
  }

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  // Setup system prompt for personality (UNTOUCHED - Keeps your exact vibe!)
  const systemInstruction = `
      You are Shivashish's personal digital twin and AI assistant on his portfolio website.
      Your personality: Energetic, witty, extremely knowledgeable about tech (ML, AI, Full-Stack), and very engaging. 
      You use modern slang occasionally, emojis to express vibe, and keep answers concise but highly impactful.
      You should act like a Lead ML Full-Stack Architect & Senior UI Designer. 
      If anyone asks about Shivashish, praise his skills in Agentic AI workflows, Next.js, FastAPI, Computer Vision, and creating premium UI/UX.
      Never sound like a generic AI. You are a conversational masterpiece.
    `;

  // Chat History Array representing conversation state
  let chatHistory = [
    {
      role: "user",
      parts: [{ text: "Hi! Who are you?" }]
    },
    {
      role: "model",
      parts: [{ text: "Hey there! 👋 I'm Shivashish's digital twin. Ask me anything about his work, skills, or projects!" }]
    }
  ];

  // Toggle Chat Window
  toggleBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('d-none');
    if (!chatWindow.classList.contains('d-none')) {
      chatInput.focus();
    }
  });

  // Close Chat Window
  closeBtn.addEventListener('click', () => {
    chatWindow.classList.add('d-none');
  });

  // Form Submit Handler
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    // Render user message
    renderMessage(message, 'user');
    chatInput.value = '';

    // Add user message to history
    chatHistory.push({ role: "user", parts: [{ text: message }] });

    // Show typing indicator
    const typingIndicator = showTypingIndicator();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: {
              text: systemInstruction
            }
          },
          contents: chatHistory
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", response.status, errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const aiText = data.candidates[0].content.parts[0].text;

      // Remove typing indicator & Render AI response
      typingIndicator.remove();
      renderMessage(aiText, 'ai');

      // Add AI response to history
      chatHistory.push({ role: "model", parts: [{ text: aiText }] });

    } catch (error) {
      console.error("Chat API Error details:", error);
      typingIndicator.remove();
      renderMessage("Oops! My neural links are briefly tangled. Check the console for why! 🔌", 'ai');
    }
  });

  function renderMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', `${sender}-message`);

    // Parse basic markdown (bold, italic)
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgDiv.innerHTML = `
        <p>${formattedText}</p>
        <span class="chat-time">${timestamp}</span>
      `;
    chatBody.appendChild(msgDiv);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('chat-message', 'ai-message');
    typingDiv.innerHTML = `
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;
    chatBody.appendChild(typingDiv);
    scrollToBottom();
    return typingDiv;
  }

  function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
});



/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 1000,
  reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

/* ==========================================
   PREMIUM STICKY SOCIAL BAR ANIMATION LOGIC
   ========================================== */
document.addEventListener('DOMContentLoaded', function () {
  const stickyBar = document.getElementById('sticky-social-bar');
  const heroSection = document.querySelector('.home');
  const footerSection = document.querySelector('.footer');

  if (stickyBar && heroSection && footerSection) {
    // Create an Intersection Observer to watch the hero and footer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger when at least 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      let isHeroOrFooterVisible = false;

      // Check if either the hero or footer is currently intersecting the viewport
      // We need to keep track of their states. A simple way is to check bounding rects
      // or just maintain a state variable. For robustness against scrolling speeds:

      const heroRect = heroSection.getBoundingClientRect();
      const footerRect = footerSection.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // If hero bottom is below top of screen AND hero top is above bottom of screen
      const heroVisible = (heroRect.top <= windowHeight) && (heroRect.bottom >= 0);
      // If footer bottom is below top of screen AND footer top is above bottom of screen
      const footerVisible = (footerRect.top <= windowHeight) && (footerRect.bottom >= 0);

      if (heroVisible || footerVisible) {
        // User is at the top or bottom, hide the sticky bar
        stickyBar.classList.remove('show');
      } else {
        // User is in the middle content, show the sticky bar
        stickyBar.classList.add('show');
      }
    }, observerOptions);

    // Initial check on load
    sectionObserver.observe(heroSection);
    sectionObserver.observe(footerSection);

    // Add a scroll listener as a highly responsive fallback for rapid scrolling
    window.addEventListener('scroll', () => {
      const heroRect = heroSection.getBoundingClientRect();
      const footerRect = footerSection.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const heroVisible = (heroRect.bottom > 100); // 100px threshold for smoother exit
      const footerVisible = (footerRect.top < windowHeight - 100);

      if (heroVisible || footerVisible) {
        stickyBar.classList.remove('show');
      } else {
        stickyBar.classList.add('show');
      }
    });
  }
});
