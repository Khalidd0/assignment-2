# Assignment 2 – Interactive Portfolio  
**Author:** Khaled Mathbaq  
**Course:** Web Programming – Assignment 2  
**Due:** Week 9 | Weight: 2 %

---

## 🎯 Objective
This assignment builds upon **Assignment 1**, transforming the static portfolio into a **dynamic, interactive web application**.  
The goal is to demonstrate modern web development techniques, data handling, animations, and ethical AI-assisted improvements.

---

## 🧱 Project Overview
An enhanced personal portfolio built with **HTML**, **CSS**, and **JavaScript**, featuring:

- ⏰ Personalized greeting that changes with time and saved username  
- 🌓 Light / dark theme toggle (saved in localStorage)  
- 🔍 Live search, filter, and sort for project cards  
- 🪄 Smooth fade-in animations via Intersection Observer  
- 📨 Validated contact form with loading spinner and feedback messages  
- 💬 Quote API demo ( https://api.quotable.io/random )  
- 💾 LocalStorage draft-saving for form input  
- ⚠️ Friendly error handling and retry buttons  
- 🧠 AI assistance documented in docs/ai-usage-report.md

---

## 🗂 Folder Structure
```
assignment-2/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── README.md
```

---

## 🚀 How to Run
### Option 1 – Open Directly
Open `index.html` in any modern browser.

### Option 2 – Run with a local server
```bash
# Python 3
python -m http.server 5173
# Visit http://localhost:5173
```

---

## 🧠 AI Usage Summary
A full log is in docs/ai-usage-report.md.  
**Summary:**
- **Tools:** ChatGPT (GPT-5), GitHub Copilot  
- **Used for:** brainstorming features, code review, and documentation drafting  
- **Edited:** every AI output was reviewed and customized  
- **Learned:** better understanding of localStorage, form validation, and UX animation

---

## 🌐 Deployment
You can deploy the portfolio easily using:

- **GitHub Pages:** Settings → Pages → Deploy from branch → Select `main`  
- **Netlify / Vercel:** Import from GitHub → Deploy → View live URL  

---

## 🧩 Technologies Used
- **HTML5** – semantic structure  
- **CSS3** – variables, grid layout, transitions, animations  
- **JavaScript (ES6+)** – DOM manipulation and data handling  
- **LocalStorage API** – save preferences and drafts  
- **Fetch API** – retrieve data from external sources  
- **ARIA / Accessibility Features** – inclusive and keyboard-friendly design

---

## 🧪 Testing Checklist
✅ Theme toggle persists after refresh  
✅ Greeting updates after saving name  
✅ Search, filter, and sort projects work in real time  
✅ API fetch shows loader and error message on failure  
✅ Contact form validates inputs and shows success/error states  
✅ Animations respect prefers-reduced-motion

---

## 🧱 Learning Outcomes
- Implemented dynamic UI interactions without frameworks  
- Practiced clean state management with JavaScript  
- Enhanced user experience through transitions and feedback  
- Applied ethical AI assistance for development efficiency  
- Strengthened skills in debugging and frontend architecture  

---

## ✅ Author & License
© 2025 Khaled Mathbaq.  
For educational use only (Assignment 2 submission).
