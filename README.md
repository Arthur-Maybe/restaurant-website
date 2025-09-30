# restaurant-website

This project is a modern, single-page restaurant website template featuring a dark, gold-themed aesthetic, parallax scrolling effects, smooth transitions, and a custom cursor. It is designed to be elegant, engaging, and fully responsive across all devices.

---

## ✨ Features

* **Elegant Design:** A striking dark mode theme with gold accents for a premium feel.
* **Single-Page Application (SPA) Style:** Uses custom JavaScript for quick, smooth page transitions between sections (`Home`, `Menu`, `Gallery`, `Reserve`) without full page reloads.
* **Interactive Elements:**
    * **Custom Cursor:** A gold dot and outline that provide visual feedback on interactive elements.
    * **3D Hover Effects:** Menu and gallery items tilt and scale on mouse hover.
* **Dynamic Scroll Effects:** Navbar shrinks and gains a background on scroll. (Note: Most parallax effects were intentionally removed for standard scrolling, but the floating particle background remains.)
* **Animated Reservations:** The form submission features a "Processing" state, a "Confirmed" state, and a confetti celebratory effect.
* **Fully Responsive:** Optimized for both desktop and mobile devices with a collapsing hamburger menu.

---

## 🏗️ Project Structure

The project is built entirely with standard web technologies:

| File Name | Purpose |
| :--- | :--- |
| `index.html` | The main structure of the website, containing all page content (Home, Menu, Gallery, Reserve). |
| `style.css` | All styling for the site, including the custom dark mode, gold palette, animations, and responsive breakpoints. |
| `script.js` | Handles all dynamic functionality, including page transitions, animations, custom cursor logic, form submission, and scroll events. |
| `README.md` | This file. |

---

## 🚀 Getting Started

To view and run this project locally, follow these simple steps.

### Prerequisites

You need a modern web browser (Chrome, Firefox, Edge, Safari). No server software is required to run the client-side code.

### Installation & Execution

1.  **Clone or Download:** Get a copy of the repository or download the project files to your local machine.
2.  **Open Index.html:** Navigate to the project folder and double-click the `index.html` file.

The website will open in your default web browser.

---

## 🛠️ Customization

### Color Palette

The primary colors are controlled in `style.css`. To change the main accent color:

* **Main Gold:** `#d4af37`
* **Lighter Gold/Accent:** `#f4e5c3`
* **Dark Backgrounds:** `#0a0a0a` / `#0f0f0f`

### Page Navigation

All navigation is managed by the `showPage(pageName)` function in `script.js` and the corresponding links in `index.html`.

* To add a new page, create a new `<section class="page" id="[NEW-ID]">` in `index.html` and add a corresponding link: `<a onclick="showPage('[NEW-ID]')">New Link</a>`.

### Removed Parallax Effects

The scroll-based parallax effects for images and the hero section were **commented out** in `script.js` to ensure a standard scrolling experience. If you wish to re-enable them, refer to the commented code block inside the `window.addEventListener('scroll', ...)` function.

---

## 🔗 Deployment

This project is a static site and can be deployed easily to any static hosting service.

1.  **GitHub Pages:** Upload the files to a GitHub repository, go to **Settings > Pages**, and select the `main` branch. The site will be hosted at `https://[username].github.io/[repo-name]`.
2.  **Vercel / Netlify:** Use the platform's CLI or connect to your GitHub repository for instant deployment.

---

## 📄 License

This project is open-source and free to use.
