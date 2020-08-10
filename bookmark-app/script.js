const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = [];

// Hide/Show Modal, Focus on Input
function hideShowModal(hideShow) {
  if (hideShow === "show") {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
  } else {
    modal.classList.remove("show-modal");
  }
}

// Modal Event Listeners
modalShow.addEventListener("click", () => hideShowModal("show"));
modalClose.addEventListener("click", () => hideShowModal("hide"));
window.addEventListener("click", (e) =>
  e.target === modal ? hideShowModal("hide") : false
);

// Validate Form
function validate(nameValue, urlValue) {
  const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields.");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address.");
    return false;
  }
  // Valid
  return true;
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    // Create bookmarks array in localStorage
    bookmarks = [
      {
        name: "20 Projects",
        url: "https://erictamhk.github.io/js20projects/",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
}

// Handle Data from Form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("http://", "https://")) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  bookmarkForm.reset();
  websiteNameEl.focus();

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Event Listeners
bookmarkForm.addEventListener("submit", storeBookmark);

// On Load
fetchBookmarks();
