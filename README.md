# 🖼️ Text-to-Image Generator using Hugging Face API

This is a **Text-to-Image Generator** web app that converts text prompts into AI-generated images using the **Hugging Face API**.
It features a **theme toggle (dark/light)**, **example prompts**, **image download option**, and smooth UI interactions built with HTML, CSS, and JavaScript.
The project is structured with a **frontend and backend** for **secure API key handling**.

---

## 🚀 Features

* 🧠 Generate images from text prompts using **Hugging Face Inference API** (third-party AI service)
* 🌗 Toggle between dark and light mode
* 🎨 Random example prompts with a single click
* 🖱️ Simple, responsive, and user-friendly UI
* 💾 Download generated images directly
* 🔐 Secure API key handling via backend and environment variables

---

## 🧩 Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express
* **AI Model:** Hugging Face Text-to-Image Model (e.g., `stabilityai/stable-diffusion-2`)
* **API:** Hugging Face Inference API
* **Deployment:** Vercel (frontend) / Render (backend)

---

## ⚙️ How It Works

1. The user enters a prompt or selects a random example.
2. The **frontend sends a request to the backend server**.
3. The **backend calls the Hugging Face API** using a secure API key.
4. The API returns the AI-generated image.
5. The image is displayed in the frontend UI, with an option to **download it**.

---

## 🔐 Securing Your API Key

> ❗ Never expose your API key directly in your frontend code.

**Steps:**

1. Store your API key in `.env` in the backend folder:

```bash
HUGGINGFACE_API_KEY=your_api_key_here
FRONTEND_URL=https://your-frontend-url.vercel.app
PORT=5000
```

2. Access it in your Node.js server using `process.env.HUGGINGFACE_API_KEY`.
3. Only the **backend communicates with Hugging Face**; the frontend calls your backend endpoint.

---

## 📁 Project Structure

```
ai-image-generator/
├─ frontend/       # Vanilla JS frontend
│   ├─ index.html
│   ├─ script.js
│   └─ styles.css
├─ server/         # Node.js backend
│   ├─ index.js    # Express server
│   ├─ package.json
│   └─ .env        # API key and env variables
└─ README.md
```

---

## ⚡ Setup Instructions

### Backend

```bash
cd server
npm install express dotenv cors node-fetch
npm start
```

* API endpoint (local): `http://localhost:5000/generate`
* After deployment on **Render**, use the live URL in frontend.

### Frontend

```bash
cd frontend
```

* Update the backend URL in `script.js`:

```javascript
const MODEL_URL = "https://your-backend-live-url.onrender.com/generate";
```

* Open `index.html` in browser or deploy frontend to **Vercel**.

---

## 🌐 Deployment

1. Deploy **backend** on **Render** and get the live URL.
2. Update `MODEL_URL` in frontend with the backend live URL.
3. Deploy **frontend** on **Vercel / Netlify**.

---

## 💡 Future Improvements

* User authentication and image saving per account
* Multiple AI models for image generation
* Image editing options (crop, resize, style transfer)
* Rate limiting and usage analytics


