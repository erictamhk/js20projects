const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

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
