### Quiz Game

A lightweight, single-page Quiz app with three difficulty levels, smooth UI, and instant feedback. Built with vanilla HTML, CSS, and JavaScript.

## Features
- **Three difficulties**: Easy, Medium, Hard
- **Progress + Score bar**: Live progress and current score
- **Instant feedback**: Highlights correct/incorrect choices after submission
- **Results summary**: Per-question breakdown with your answer and the correct one
- **Accessible**: Radio-group semantics and keyboard-friendly controls

## Quick Start
1. Download or clone this folder.
2. Open `index.html` directly in your browser, or serve locally:
   - VS Code: install Live Server → Right-click `index.html` → "Open with Live Server"
   - Node (optional): `npx serve .` then open the shown URL

## How to Play
1. Choose a difficulty on the start screen.
2. Click "Start Quiz".
3. Select an option and click "Next" to submit.
4. After the final question, view your score and the detailed summary.
5. Click "Restart Quiz" to play again.

## Project Structure
```
Quiz/
├── index.html   # App markup and screens
├── style.css    # Styles (layout, components, states)
└── main.js      # Quiz logic and data
```

## Customize Questions
Questions are defined in `main.js` inside the `questions` object with `easy`, `medium`, and `hard` arrays. Each entry uses:
```js
{ question: "Text", options: ["A", "B", "C", "D"], answer: "A" }
```
- Add/remove questions by editing the respective array.
- Ensure `answer` matches one of the `options` strings exactly.

## Keyboard & Accessibility
- Options are native radios grouped via `role="radiogroup"`.
- Use Arrow keys to move between options, Space/Enter to select, and Tab to reach the Next/Finish button.

## Styling
- Colors, spacing, and component states are in `style.css`.
- Key variables are defined under `:root` (e.g., `--bg`, `--text`, `--accent`).

## Tech
- HTML5, modern CSS, vanilla JavaScript. No build step required.

## License
MIT


