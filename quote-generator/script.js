const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = "https://api.allorigins.win/raw?url=";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    const data = await response.json();
    showQuote(data.quoteText, data.quoteAuthor, false);
  } catch (error) {
    showQuote(error, "Get Quote Error", true);
  }
  removeLoadingSpinner();
}

// Show Quote
function showQuote(quote, author, isError) {
  // If author is blank, add 'Unknown'
  if (author === "") {
    authorText.innerText = "Unknown";
  } else {
    authorText.innerText = author;
  }
  // Reduce font size for long quotes
  if (quote.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.innerText = quote;

  if (isError) {
    quoteText.classList.add("error");
  } else {
    quoteText.classList.remove("error");
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
