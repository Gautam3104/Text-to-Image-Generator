# 🖼️ Text-to-Image Generator using Hugging Face API

This is a **Text-to-Image Generator** web app that converts text prompts into AI-generated images using the **Hugging Face API**.  
It features a **theme toggle (dark/light)**, **example prompts**, and smooth UI interactions built with HTML, CSS, and JavaScript.  
The project is structured with a **frontend** and **backend** for secure API key handling.

---

## 🚀 Features

- 🧠 Generate images from text prompts using Hugging Face Inference API  
- 🌗 Toggle between dark and light mode  
- 🎨 Random example prompts with a single click  
- 🖱️ Simple, responsive, and user-friendly UI  
- 🔐 Secure API key handling via backend and environment variables  

---

## 🧩 Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express  
- **AI Model:** Hugging Face Text-to-Image Model (e.g., `stabilityai/stable-diffusion-2`)  
- **API:** Hugging Face Inference API  
- **Deployment:** Vercel (frontend) / Railway (backend)  

---

## ⚙️ How It Works

1. The user enters a prompt or selects a random example.  
2. The frontend sends a request to the **backend server**.  
3. The backend calls the **Hugging Face API** using a secure API key.  
4. The API returns the AI-generated image.  
5. The image is displayed in the frontend UI.  

---

## 🔐 Securing Your API Key

> ❗ Never expose your API key directly in your frontend code.

### Steps:

1. Store your API key in `.env` in the **backend folder**:

```env
HUGGINGFACE_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:3000
PORT=5000

Access it in your Node.js server using process.env.HUGGINGFACE_API_KEY.

Only the backend communicates with Hugging Face; the frontend calls your backend endpoint.

ai-image-generator/
├─ frontend/       # React / Vanilla JS frontend
│   └─ index.html, script.js, styles.css
├─ server/         # Node.js backend
│   ├─ index.js    # Express server
│   ├─ package.json
│   └─ .env        # API key and env variables
└─ README.md

⚡ Setup Instructions
Backend
cd server
npm install express dotenv cors node-fetch
npm start


API endpoint: http://localhost:5000/generate

Frontend
cd frontend


Update the backend URL in script.js:

const MODEL_URL = "http://localhost:5000/generate"; // Use live URL after deployment


Open index.html in browser or deploy frontend to Vercel.

🌐 Deployment

Deploy backend on Railway / Render and get the live URL.

Update the MODEL_URL in frontend to the backend live URL.

Deploy frontend on Vercel / Netlify.

💡 Future Improvements

User authentication and image saving per account

Multiple AI models for image generation

Image editing options (crop, resize, style transfer)

Rate limiting and usage analytics