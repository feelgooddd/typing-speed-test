# ⌨️ Typing Test App

🌐 **Live Demo:** [https://a-typing-test.netlify.app/](https://a-typing-test.netlify.app/)

A modern, responsive typing test built with **React + Vite**. This app supports both **timed** and **untimed** modes, tracks **WPM**, **accuracy**, and **personal bests**, and focuses on clean UX with clear test flow.

This project was built as part of a **Frontend Mentor hackathon**, with a focus on deepening understanding of **React state management**, **effects**, and **component-driven UI design** while delivering a polished, real-world frontend experience.

---

## ✨ Features

* ⏱️ **Timed mode** (countdown)
* ♾️ **Untimed mode** (count-up)
* 📊 Real-time **WPM** and **accuracy** tracking
* 🏆 **Personal Best (PB)** tracking with `localStorage`
* 🔁 Clean test reset & replay flow
* 🧠 Multiple difficulty levels
* 📱 Responsive layout

---

## 🛠️ Tech Stack

* **React** (hooks-based)
* **Vite** (fast dev + build)
* **JavaScript (ES6+)**
* **CSS** (custom styling)
* **LocalStorage** (persistent PB)
* **Fetch API** (loading test data from `data.json`)

---

## 🧩 Project Structure

The app is component-driven, with clear separation of concerns:

* `App` — Global state owner and test flow controller
* `Header` — App branding and PB display
* `Timing` — Timer display and mode/difficulty controls
* `TypingTest` — Core typing logic and input handling
* `Results` — End-of-test summary and replay controls

Typing content is loaded via a `fetch` call inside a `useEffect`, pulling word data from a local `data.json` file at runtime.

State is intentionally lifted where needed to ensure consistent test behavior across modes.

---

## 🔄 Test Flow Overview

1. User selects **mode** and **difficulty**
2. Test starts on first input
3. Timer begins (countdown or count-up depending on mode)
4. Typing stats update in real time
5. Test finishes when:

   * Timed mode reaches `0:00`, or
   * Untimed mode is manually completed
6. Results are calculated **once per test**
7. PB is updated if applicable

Special care is taken to prevent duplicate finish logic using guarded effects.

---

## 🚀 Getting Started

```bash
# install dependencies
npm install

# start dev server
npm run dev
```

Then open the local Vite URL in your browser.

---

## 🎯 Goals of This Project

* Practice **real-world React state coordination**
* Learn to manage **timers and side effects** safely
* Avoid common pitfalls with `useEffect` dependency loops
* Build a complete, polished mini-application from scratch

---

## 📈 Possible Future Improvements

* User accounts & cloud-synced PBs
* Per-difficulty leaderboards
* Custom text input
* Improved analytics (consistency, streaks)
* Animations and micro-interactions

---

## 🧑‍💻 Author

Built by **Ryan Goods** as a focused React learning project.

---

Thanks for checking it out! Feedback and suggestions are always welcome.
