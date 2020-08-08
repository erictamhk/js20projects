const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

// Toggle Dark Light Mode
function toggleDarkLightMode(mode) {
  let isDark = false;
  if (mode === "dark") {
    isDark = true;
  }

  isDark
    ? document.documentElement.setAttribute("data-theme", "dark")
    : document.documentElement.setAttribute("data-theme", "light");

  nav.style.backgroundColor = isDark
    ? "rgb(0 0 0 / 50%)"
    : "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = isDark
    ? "rgb(255 255 255 / 50%)"
    : "rgb(0 0 0 / 50%)";
  toggleIcon.children[0].textContent = isDark ? "Dark Mode" : "Light Mode";
  isDark
    ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");

  image1.src = `img/undraw_proud_coder_${mode}.svg`;
  image2.src = `img/undraw_feeling_proud_${mode}.svg`;
  image3.src = `img/undraw_conceptual_idea_${mode}.svg`;
}

// Switch Theme Dynamically
function switchTheme(event) {
  console.log(event.target.checked);
  if (event.target.checked) {
    toggleDarkLightMode("dark");
    localStorage.setItem("theme", "dark");
  } else {
    toggleDarkLightMode("light");
    localStorage.setItem("theme", "light");
  }
}

// Event Listener
toggleSwitch.addEventListener("change", switchTheme);

// Check Local Storage For Theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    toggleDarkLightMode("dark");
  } else {
    toggleSwitch.checked = false;
    toggleDarkLightMode("light");
  }
}
