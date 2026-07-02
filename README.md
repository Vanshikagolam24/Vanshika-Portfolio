# Full-Stack Portfolio Website

This repository contains a modern personal portfolio website for **Vanshika Golam**.

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express, MongoDB

## Project Structure

```
portfolio/
  frontend/
    index.html
    style.css
    script.js
  backend/
    server.js
    package.json
    .env.example
    routes/
      contact.js
    models/
      Message.js
    database/
      connection.js
  .gitignore
  README.md
```

## STEP 1: Install Required Tools

1. Install **VS Code** from https://code.visualstudio.com/
2. Install **Node.js** from https://nodejs.org/ (LTS version recommended)
3. Install **MongoDB** Community Server from https://www.mongodb.com/try/download/community

## STEP 2: Open the Project Folder in VS Code

1. Open VS Code.
2. Choose `File > Open Folder...`.
3. Select the folder `Vanshika Portfolio`.

## STEP 3: Frontend Setup

The frontend files are in `frontend/`.

- `frontend/index.html` contains the page structure and sections.
- `frontend/style.css` contains the styling, dark/light theme, responsive layout, and animations.
- `frontend/script.js` handles menu, theme toggle, scroll effects, typing effect, and the contact form.

## STEP 4: Backend Setup

The backend files are in `backend/`.

- `backend/server.js` starts the Express server and loads routes.
- `backend/routes/contact.js` defines the `POST /contact` API and saves form data.
- `backend/models/Message.js` defines the MongoDB schema for messages.
- `backend/database/connection.js` connects to MongoDB using environment variables.

## STEP 5: Install Dependencies

1. Open a terminal in VS Code.
2. Run these commands:

```bash
cd backend
npm install
```

This installs `express`, `mongoose`, `cors`, `dotenv`, and `nodemon`.

## STEP 6: Create Backend Environment File

1. Copy `.env.example` to `.env` inside `backend/`.
2. Open `backend/.env`.

Example contents:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
```

3. If you are using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

## STEP 7: Run the Backend Server

From the `backend` folder run:

```bash
npm run dev
```

You should see:

```
Connected to MongoDB
Server running on http://localhost:5000
```

## STEP 8: Run the Frontend

Open `frontend/index.html` directly in the browser, or use a simple HTTP server.

### Option 1: Open directly
- Right-click `frontend/index.html` and open in browser.

### Option 2: Use a lightweight server
If you want better local behavior, install `live-server` or use VS Code Live Server extension.

## STEP 9: Test Everything

1. Open the page in your browser.
2. Verify responsiveness and theme toggle.
3. Scroll and confirm animations appear.
4. Fill the contact form and submit.
5. Confirm the backend responds with success.

### Confirm data is saved
Open MongoDB and check the `portfolio` database, `messages` collection.

## STEP 10: Deploy

### Deploy frontend
- Use **Netlify** or **Vercel**.
- Upload the `frontend` folder or connect your repo.

### Deploy backend
- Use **Render** or **Railway**.
- Deploy from the `backend` folder.
- Set environment variables: `PORT` and `MONGO_URI`.

### Connect frontend to deployed backend
- Update `frontend/script.js` fetch URL from `http://localhost:5000/contact` to your deployed API URL.

## How the App Works

### Frontend
The browser loads `index.html` and applies styles from `style.css`.
JavaScript in `script.js` handles:
- responsive navigation menu
- dark/light theme toggling
- typing animation in the hero section
- scroll progress indicator
- contact form submission to the backend

### Backend
The Express server listens for `POST /contact` requests.
When the form is submitted, the backend:
- receives JSON with `name`, `email`, and `message`
- validates the input
- saves the message to MongoDB
- returns a success or error response

### MongoDB Storage
Messages are stored in the `portfolio` database with the `messages` collection. Each document includes:
- `name`
- `email`
- `message`
- `createdAt`

## Common Errors and Fixes

- `MONGO_URI is required in .env`
  - Create `backend/.env` and add `MONGO_URI`.

- `ECONNREFUSED` when connecting to MongoDB
  - Start MongoDB locally, or use a valid Atlas connection string.

- `Failed to fetch` in frontend
  - Ensure backend is running on `http://localhost:5000`.
  - Check browser console and CORS settings.

## Notes
- Replace `(Add my email)` and `(Add my phone number)` with your real values.
- Replace GitHub, LinkedIn, and Instagram links once available.
- Replace `resume.pdf` with your actual resume file.
