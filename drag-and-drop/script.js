const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");
// Item Lists
const listColumns = document.querySelectorAll(".drag-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];

// Drag Functionality
let draggedItem;
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem("kanbanBoard")) {
    const localObj = JSON.parse(localStorage.kanbanBoard);
    ({
      backlog: backlogListArray,
      progress: progressListArray,
      complete: completeListArray,
      onHold: onHoldListArray,
    } = localObj);
  } else {
    backlogListArray = ["Release the course", "Sit back and relax"];
    progressListArray = ["Work on projects", "Listen to music"];
    completeListArray = ["Being cool", "Getting stuff done"];
    onHoldListArray = ["Being uncool"];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  const localObj = {
    backlog: backlogListArray,
    progress: progressListArray,
    complete: completeListArray,
    onHold: onHoldListArray,
  };
  localStorage.setItem("kanbanBoard", JSON.stringify(localObj));
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // console.log("columnEl:", columnEl);
  // console.log("column:", column);
  // console.log("item:", item);
  // console.log("index:", index);
  // List Item
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute("ondragstart", "drag(event)");
  listEl.contentEditable = true;
  listEl.id = `${column}_${index}`;
  listEl.setAttribute("onfocusout", `updateItem(${index},${column})`);
  // Append
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  // Backlog Column
  backlogList.textContent = "";
  backlogListArray = filterArray(backlogListArray);
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogList, 0, backlogItem, index);
  });
  // Progress Column
  progressList.textContent = "";
  progressListArray = filterArray(progressListArray);
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressList, 1, progressItem, index);
  });
  // Complete Column
  completeList.textContent = "";
  completeListArray = filterArray(completeListArray);
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeList, 2, completeItem, index);
  });
  // On Hold Column
  onHoldList.textContent = "";
  onHoldListArray = filterArray(onHoldListArray);
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldList, 3, onHoldItem, index);
  });
  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();
}

// return array by the column number
function returnArray(col) {
  switch (col) {
    case 0:
      return backlogListArray;
      break;
    case 1:
      return progressListArray;
      break;
    case 2:
      return completeListArray;
      break;
    case 3:
      return onHoldListArray;
      break;
    default:
      return [];
      break;
  }
}
// Filter Array
function filterArray(array) {
  const filteredArray = array.filter((item) => item !== null && item !== "");
  return filteredArray;
}

// Update Item - Delete if necessary, or update Array value
function updateItem(idx, col) {
  const selectedArray = returnArray(col);
  const selectedColumnEl = listColumns[col].children;
  const selectedText = selectedColumnEl[idx].textContent;
  if (!selectedText) {
    delete selectedArray[idx];
  } else {
    selectedArray[idx] = selectedText;
  }
  updateDOM();
}

// Add Item to Column
function addToColumn(col) {
  const itemText = addItems[col].textContent;
  addItems[col].textContent = "";
  const selectedArray = returnArray(col);
  selectedArray.push(itemText);
  updateDOM();
}

// Show Add Item Input Box
function showInputBox(col) {
  addBtns[col].style.visibility = "hidden";
  saveItemBtns[col].style.display = "flex";
  addItemContainers[col].style.display = "flex";
}

// Hide Add Item Input Box
function hideInputBox(col) {
  addBtns[col].style.visibility = "visible";
  saveItemBtns[col].style.display = "none";
  addItemContainers[col].style.display = "none";
  addToColumn(col);
}

// Allows arrays to reflect Drap and Drop items
function rebuildArrays() {
  backlogListArray = [];
  progressListArray = [];
  completeListArray = [];
  onHoldListArray = [];
  for (let i = 0; i < backlogList.children.length; i++) {
    backlogListArray.push(backlogList.children[i].textContent);
  }
  for (let i = 0; i < progressList.children.length; i++) {
    progressListArray.push(progressList.children[i].textContent);
  }
  for (let i = 0; i < completeList.children.length; i++) {
    completeListArray.push(completeList.children[i].textContent);
  }
  for (let i = 0; i < onHoldList.children.length; i++) {
    onHoldListArray.push(onHoldList.children[i].textContent);
  }
  updateDOM();
}

// When Item Starts Dragging
function drag(e) {
  draggedItem = e.target;
}

// Column Allows for Item to Drop
function allowDrop(e) {
  e.preventDefault();
}

// Dropping Item in Column
function drop(e) {
  e.preventDefault();
  // Remove Background Color/Padding
  listColumns.forEach((col) => {
    col.classList.remove("over");
  });
  // Add Item to Column
  const parent = listColumns[currentColumn];
  parent.appendChild(draggedItem);
  rebuildArrays();
}

function dropEnter(column) {
  listColumns.forEach((col) => {
    col.classList.remove("over");
  });
  listColumns[column].classList.add("over");
  currentColumn = column;
}

// On Load
updateDOM();
