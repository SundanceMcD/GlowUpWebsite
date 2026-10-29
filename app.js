// Kit Locker – app logic
// Plain JavaScript, no libraries. Seed items come from data.js.

// ----- Saving and loading -----

// Keys used to save data in the browser's localStorage
const STORAGE_KEY_ITEMS = "kitLocker.items";
const STORAGE_KEY_NAME = "kitLocker.name";

// Make a fresh copy of the seed items so we never change the originals
function copySeedItems() {
  return SEED_ITEMS.map(function (item) {
    return Object.assign({}, item);
  });
}

// Load saved items, or fall back to the seed data
function loadItems() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    // Storage blocked or data broken: just use the seed data
  }
  return copySeedItems();
}

// Save the current items so a refresh keeps bookings
function saveItems() {
  try {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
  } catch (error) {
    // Storage blocked: the app still works until the page is closed
  }
}

function loadName() {
  try {
    return localStorage.getItem(STORAGE_KEY_NAME) || "";
  } catch (error) {
    return "";
  }
}

function saveName(name) {
  try {
    localStorage.setItem(STORAGE_KEY_NAME, name);
  } catch (error) {
    // Ignore: the name just won't be remembered
  }
}

// ----- State -----

let items = loadItems();
let currentFilter = "All";

// ----- Page elements -----

const nameInput = document.getElementById("member-name");
const statusMessage = document.getElementById("status-message");
const categoryFilters = document.getElementById("category-filters");
const kitTableBody = document.getElementById("kit-table-body");
const myBookingsList = document.getElementById("my-bookings");
const noBookingsMessage = document.getElementById("no-bookings-message");
const resetButton = document.getElementById("reset-button");

// ----- Helpers -----

// The name typed in the box, without extra spaces
function getCurrentName() {
  return nameInput.value.trim();
}

// Names match regardless of capitals, so "sam" and "Sam" are the same member
function isSameName(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}

function showStatus(message) {
  statusMessage.textContent = message;
}

// ----- Actions -----

function bookItem(itemId) {
  const name = getCurrentName();
  if (name === "") {
    showStatus("Please enter your name before booking.");
    nameInput.focus();
    return;
  }

  const item = items.find(function (i) { return i.id === itemId; });
  if (!item || item.bookedBy) {
    showStatus("Sorry, that item is already booked.");
    render();
    return;
  }

  item.bookedBy = name;
  saveItems();
  render();
  showStatus("Booked.");
}

function returnItem(itemId) {
  const item = items.find(function (i) { return i.id === itemId; });
  if (!item || !item.bookedBy) {
    return;
  }

  item.bookedBy = null;
  saveItems();
  render();
  showStatus("Returned.");
}

function setFilter(category) {
  currentFilter = category;
  render();
}

function resetAll() {
  items = copySeedItems();
  currentFilter = "All";
  saveItems();
  render();
  showStatus("All bookings reset.");
}

// ----- Drawing the page -----

// Category buttons: "All" plus one per category
function renderFilters() {
  categoryFilters.innerHTML = "";
  const options = ["All"].concat(CATEGORIES);

  options.forEach(function (category) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-button";
    if (category === currentFilter) {
      button.classList.add("active");
    }
    button.textContent = category;
    button.addEventListener("click", function () {
      setFilter(category);
    });
    categoryFilters.appendChild(button);
  });
}

// The kit table, showing only items in the chosen category
function renderKitTable() {
  kitTableBody.innerHTML = "";

  const visibleItems = items.filter(function (item) {
    return currentFilter === "All" || item.category === currentFilter;
  });

  visibleItems.forEach(function (item) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    const categoryCell = document.createElement("td");
    categoryCell.textContent = item.category;
    row.appendChild(categoryCell);

    const statusCell = document.createElement("td");
    const badge = document.createElement("span");
    if (item.bookedBy) {
      badge.className = "badge badge-booked";
      badge.textContent = "Booked";
    } else {
      badge.className = "badge badge-available";
      badge.textContent = "Available";
    }
    statusCell.appendChild(badge);
    row.appendChild(statusCell);

    const actionCell = document.createElement("td");
    if (!item.bookedBy) {
      const bookButton = document.createElement("button");
      bookButton.type = "button";
      bookButton.className = "button button-primary";
      bookButton.textContent = "Book";
      bookButton.addEventListener("click", function () {
        bookItem(item.id);
      });
      actionCell.appendChild(bookButton);
    }
    row.appendChild(actionCell);

    kitTableBody.appendChild(row);
  });
}

// The list of items booked by the name in the box
function renderMyBookings() {
  myBookingsList.innerHTML = "";
  const name = getCurrentName();

  if (name === "") {
    noBookingsMessage.textContent = "Enter your name to see your bookings.";
    return;
  }

  const myItems = items.filter(function (item) {
    return item.bookedBy && isSameName(item.bookedBy, name);
  });

  if (myItems.length === 0) {
    noBookingsMessage.textContent = "You have no bookings yet.";
    return;
  }
  noBookingsMessage.textContent = "";

  myItems.forEach(function (item) {
    const listItem = document.createElement("li");
    listItem.className = "booking-item";

    const label = document.createElement("span");
    label.textContent = item.name + " (" + item.category + ")";
    listItem.appendChild(label);

    const returnButton = document.createElement("button");
    returnButton.type = "button";
    returnButton.className = "button button-secondary";
    returnButton.textContent = "Return";
    returnButton.addEventListener("click", function () {
      returnItem(item.id);
    });
    listItem.appendChild(returnButton);

    myBookingsList.appendChild(listItem);
  });
}

function render() {
  renderFilters();
  renderKitTable();
  renderMyBookings();
}

// ----- Start up -----

nameInput.value = loadName();

// Update "My bookings" as the name is typed, and remember the name
nameInput.addEventListener("input", function () {
  saveName(getCurrentName());
  renderMyBookings();
});

resetButton.addEventListener("click", resetAll);

render();
