# Technical Documentation  
**Course:** Web Programming – Assignment 2  
**Student:** Khaled Mathbaq  
**Project:** Interactive Personal Portfolio  
**Due:** Week 9 | Weight 2%

---

## 🧱 Overview
This project is an upgraded version of my Assignment 1 portfolio.  
It transforms a static personal webpage into a **dynamic, interactive, and user-friendly web application** using only **HTML**, **CSS**, and **JavaScript** (no frameworks).

The portfolio demonstrates skills in:
- DOM manipulation and event handling  
- Data storage and retrieval using `localStorage`  
- API integration with proper error handling  
- Smooth animations and transitions  
- Accessibility and responsive design  
- Ethical AI-assisted development

---

## 🧩 File Structure
assignment-2/
├── index.html
├── css/
│ └── styles.css
├── js/
│ └── script.js
├── assets/
│ └── images/
├── docs/
│ ├── ai-usage-report.md
│ └── technical-documentation.md
└── README.md

markdown
Copy code

---

## ⚙️ Technical Architecture

### 1️⃣ HTML (index.html)
- Uses a **semantic structure**: `<header>`, `<main>`, `<section>`, `<footer>`.
- Each section (`About`, `Projects`, `Contact`) is linked through accessible navigation.  
- Includes **interactive elements**:
  - Buttons for theme toggle and username setup  
  - Dynamic greeting text placeholders (`#greeting-name`, `#greeting-time`)  
  - Form with inline validation messages and loading indicators  
- Uses ARIA attributes (`aria-label`, `aria-live`, etc.) to improve accessibility.  
- Footer contains a live copyright year.

---

### 2️⃣ CSS (css/styles.css)
- Implements **CSS variables** for light and dark theme colors.  
- Applies a **responsive grid** layout for projects using `display: grid` and `auto-fit`.  
- Adds **animations**:
  - Fade-in effect on scroll via `.fade-in` class and `IntersectionObserver` in JS  
  - Button hover transitions and spinner animations for loading states  
- Includes **prefers-reduced-motion** media query for accessibility.  
- Visual consistency achieved with `:root` color tokens and rounded cards.

---

### 3️⃣ JavaScript (js/script.js)

#### 🔹 State Management
All dynamic data and user preferences are stored in the `STATE` object:
```js
const STATE = {
  theme: localStorage.getItem("theme") || "light",
  username: localStorage.getItem("username") || "",
  projects: [...],
  filter: "all",
  sort: "recent",
  search: ""
};
🔹 Features Implemented
Theme Toggle

Toggles between light/dark modes.

Saves user preference to localStorage.

Updates immediately on page load.

Dynamic Greeting

Detects current time of day (morning/afternoon/evening).

Displays a personalized greeting using a saved name.

Allows user to set their name via a button prompt.

Projects Section (Dynamic Rendering)

Projects are stored as objects inside STATE.projects.

Implements:

Live Search – filters by title or tags.

Category Filter – filters by type (web, app, systems).

Sorting – by newest, oldest, or alphabetically.

Uses <details> for collapsible project descriptions.

Displays an empty-state message if no results are found.

External API Integration

Fetches a random quote using fetch("https://api.quotable.io/random").

Displays a loading spinner while waiting.

Handles network or API errors gracefully and provides a retry button.

Contact Form Handling

Validates input for:

Non-empty name

Valid email format

Message of at least 10 characters

Shows inline feedback messages instead of alerts.

Includes a fake “sending” loader and success/failure messages.

Saves form draft to localStorage (contactDraft) so input isn’t lost on refresh.

Animations and Transitions

Elements with .fade-in class animate when they enter the viewport.

Implemented with IntersectionObserver for efficiency.

Buttons and cards use subtle transitions for a polished feel.

Accessibility Enhancements

ARIA roles for live updates and tab navigation.

Focus automatically moves to section headings on tab change.

Color contrast verified for both themes.

Motion-reduction support for users with sensitive visual preferences.

📡 Data Handling Summary
Data	Storage / Source	Purpose
Theme Preference	localStorage("theme")	Remember light/dark mode
Username	localStorage("username")	Personalize greeting
Contact Draft	localStorage("contactDraft")	Persist unsent form text
Quote	External API (api.quotable.io)	Demonstrate data fetching and error handling

🧮 Error Handling & Feedback
Form validation: Inline messages, focus retention on invalid fields.

API failure: Shows a friendly retry message.

Empty results: Displays “No projects found.”

Loading states: Animated spinner while fetching or “sending.”

🧠 AI Enhancement Summary
AI tools were used for:

Brainstorming new features and code structure.

Drafting documentation and improving readability.

Suggesting accessibility and UX improvements.

All AI outputs were reviewed, edited, and customized by me to ensure understanding and originality.
Full details documented in ai-usage-report.md.

⚡ Performance Considerations
Vanilla JS and CSS only (no heavy frameworks).

Efficient DOM updates (rerenders only the project grid).

Intersection Observer avoids costly scroll listeners.

Minimized external requests (single lightweight API call).

🧪 Testing Checklist
✅ Verify theme toggle persists after refresh.
✅ Add a name, reload, confirm greeting updates.
✅ Search/filter/sort projects and confirm live updates.
✅ Submit contact form with/without valid data.
✅ Disconnect internet and test quote fetch error handling.
✅ Check reduced-motion preference in browser settings.

🚀 Future Improvements
Add service worker for offline caching.

Use URLSearchParams to persist filter state in the URL.

Add email API (e.g., EmailJS) for real message sending.

Integrate keyboard shortcuts for accessibility.

✅ Conclusion
This project demonstrates a solid understanding of:

Front-end interactivity and user-centric design.

State and data management in the browser.

Ethical and responsible use of AI tools in web development.

The portfolio now feels modern, responsive, and professional — a major improvement over Assignment 1.
