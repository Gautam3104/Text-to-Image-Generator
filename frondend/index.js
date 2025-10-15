const themetoggle = document.querySelector(".theme-toggle");
const promptInput = document.querySelector(".prompt-input");
const promptForm = document.querySelector(".prompt-form");
const promptBtn = document.querySelector(".prompt-btn");
const generateBtn = document.querySelector(".generate-btn");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");  
const grideGallary = document.querySelector(".gallary-grid"); 
//const API_KEY = ;
// Replace with your Hugging Face API key

const examplePrompts = [
  "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
  "An underwater kingdom with merpeople and glowing coral buildings",
  "A floating island with waterfalls pouring into clouds below",
  "A witch's cottage in fall with magic herbs in the garden",
  "A robot painting in a sunny studio with art supplies around it",
  "A magical library with floating glowing books and spiral staircases",
  "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
  "A cosmic beach with glowing sand and an aurora in the night sky",
  "A medieval marketplace with colorful tents and street performers",
  "A cyberpunk city with neon signs and flying cars at night",
  "A peaceful bamboo forest with a hidden ancient temple",
  "A giant turtle carrying a village on its back in the ocean",
];
let isGenerating = false;

//Set theme based on saved preference or local storage
(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDarkTheme = savedTheme === "dark" || (savedTheme === null && prefersDark);

    document.body.classList.toggle("dark-theme", isDarkTheme);
    themetoggle.querySelector("i").className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
})();   

// Function to calculate image dimensions based on aspect ratio
const getImageDimensions = (aspectRatio, baseSize = 512) => {
    const [widthRatio, heightRatio] = aspectRatio.split("/").map(Number);
    const scaleFactor = baseSize/ Math.sqrt(widthRatio * heightRatio); 
    
    let width = Math.round(widthRatio * scaleFactor);
    let height = Math.round(heightRatio * scaleFactor);

    // Ensure dimensions are multiples of 16 (AI model requirement)
    width = Math.floor(width / 16) * 16;
    height = Math.floor(height / 16) * 16;

    return{ width, height };
}

// Replace the loading spinner with actual image
const updateImageCard = (indexImg, imageURL) => {
    const imgCard = document.getElementById(`img-card-${indexImg}`);
    if(!imgCard) return;

    imgCard.classList.remove("loading");
    imgCard.innerHTML = `<img src=${imageURL} class="result-img"  alt="Image"/>
                        <div class="img-overplay">
                            <a href="${imageURL}" class="img-download-btn" download="${Date.now()}.png">
                            <i class="fa-solid fa-download"></i>
                        </a> 
                        </div>`;
};

// send request to Hugging Face API to generate images  
const generateImages = async (model, count, ratio, prompt) => {
 const MODEL_URL = `http://localhost:5000/generate`;
 const{width, height} = getImageDimensions(ratio);
//  generateBtn.setAttribute("disabled","true");

 //image generation promises
 const imagePromises = Array.from({length: count}, async(_,i)=>{
    try { // send POST request to Hugging Face API

    const response = await fetch(MODEL_URL, {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({
    model: model,
    prompt: prompt,
    width,
    height
    })
  });


      
    // const response = await fetch(MODEL_URL,
    // {
    //   method: "POST",
    //   headers: {
    //     "Authorization": `Bearer ${API_KEY}`,
    //     "Content-Type": "application/json",
    //     "x-use-cache": "false",
    //   },
    //   body: JSON.stringify({
    //     inputs: prompt,
    //     parameters: {width,height},
    //     options: { wait_for_model: true, use_cache: false },
    //   })
    // });

    if(!response.ok){
        throw new Error((await response.json())?.error || "Failed to generate image");
    }

    //convert response to blob and update the image card
    const data= await response.json();
    updateImageCard(i, data.image);
 } catch (error) {
    console.log(error);
    const imgCard = document.getElementById(`img-card-${i}`);
    if(imgCard){
        imgCard.classList.remove("loading");
        imgCard.querySelector(".status-text").textContent = "Error generating image";
        imgCard.querySelector(".fa-triangle-exclamation").style.display = "block";
        imgCard.querySelector(".spinner").remove(); 
    }
}  
 })
 await Promise.allSettled(imagePromises);
 //generateBtn.removeAttribute("disabled");           
};
// create a placeholder cards with loading spinners
const createImageCards = async (selectModel, imageCount, aspectRatio, promptText) =>{
    for(let i = 0 ; i< imageCount; i++){
        grideGallary.innerHTML += `<div class="img-card loading" id="img-card-${i}" style="aspect-ratio: ${aspectRatio}">
                    <div class="status-container">
                        <div class="spinner"></div>
                          <i class="fa-solid fa-triangle-exclamation"></i>
                        <p class="status-text">Generating...</p>
                    </div>
                </div>`;
        }
       await generateImages(selectModel, imageCount, aspectRatio, promptText);
};

// switched between dark and light themes on clicking the theme toggle button
themetoggle.addEventListener("click",()=> {
    const isDarkTheme = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    themetoggle.querySelector("i").className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
});

// Functionality to generate image based on prompt
promptBtn.addEventListener("click", () => {
    const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    promptInput.value = prompt;
    promptInput.focus();
});

// enter each key to trigger the prompt button click
promptInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    promptBtn.click();
  }
});

promptForm.addEventListener("submit", async (e) => {
    e.preventDefault();
     if (isGenerating) return; // Prevent multiple calls
    isGenerating = true;
    generateBtn.setAttribute("disabled","true");

    const selectModel = modelSelect.value;
    const imageCount = parseInt(countSelect.value) || 1;
    const aspectRatio = ratioSelect.value || "1/1";
    const promptText = promptInput.value.trim();

    grideGallary.innerHTML = "";


    try {
        await createImageCards(selectModel, imageCount, aspectRatio, promptText);
    } finally {
        isGenerating = false;
        generateBtn.removeAttribute("disabled");
    }
})