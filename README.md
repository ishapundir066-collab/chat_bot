🧠 AllWorkChatbot

A lightweight Node.js + Express project that serves multiple assistant HTML pages along with a static public/ directory. This repository demonstrates a minimal Express setup for serving client-side assistant interfaces.

✨ Features

Two assistant pages:

assistant.html

assistant2.html

Static site assets served from the public/ folder:

index.html

script.js

Copies of assistant pages

Minimal Express server (server.js) for serving static and root-level files

📦 Prerequisites

Node.js (v16 or higher recommended)

npm (comes bundled with Node.js)

⚙️ Installation

Install project dependencies using:

npm install

▶️ Running the Project

This project does not include a start script by default.

Option 1: Run directly with Node.js
node server.js

Option 2: Run using npm (recommended)

Add the following to package.json:

"scripts": {
  "start": "node server.js"
}


Then start the server:

npm start

🗂️ Project Structure
AllWorkChatbot
│-- assistant.html        # Root-level assistant page
│-- assistant2.html       # Alternate assistant page
│-- package.json          # Project manifest
│-- server.js             # Express server
│
└── public
    │-- index.html        # Static homepage
    │-- script.js         # Client-side JavaScript
    │-- assistant.html    # Static assistant page
    │-- assistant2.html   # Static assistant page

📝 Notes

The package.json file currently includes only a test script.

Adding a start script is recommended for easier execution.

If environment variables or configurations are introduced (e.g., .env), update this README accordingly.

📄 License

This project currently does not include a license.
Add an appropriate license if you plan to publish or distribute this project.