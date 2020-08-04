// Unsplash API
const count = 10;
const apiKey = "YXxy925Nixz0hZE1gX1HnTfHqzQL7vRc_hyeZAVAbXA";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// On Load
getPhotos();
