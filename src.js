function submitButton(text) {
  if (!isEmptyOrWhitespace(text)) {
    console.log(text);
    if (localStorage.getItem("itemCounter") == null) {
      localStorage.setItem("itemCounter", 0)
    }
    var itemCounter = localStorage.getItem("itemCounter")
    var key = "item" + itemCounter
    localStorage.setItem(key, text);
    itemCounter = parseInt(itemCounter) + 1
    localStorage.setItem("itemCounter", itemCounter)
    location.reload();
  }

}

function displayItems() {
  var item = document.getElementById('list-group').innerHTML
  for (let i = 0; i < localStorage.getItem("itemCounter"); i++) {
    const itemId = "item" + i; // Get the key at the current index
    const value = localStorage.getItem(itemId); // Get the value associated with the key

    if (value != null) {
      item = item + createListItem(value, itemId)
    }


  }
  document.getElementById('list-group').innerHTML = item;
}

function isEmptyOrWhitespace(str) {
  return !str || str.trim().length === 0;
}

displayItems()

function createListItem(value, itemId) {
  return `<a href="#" class="list-group-item list-group-item-action">
            ${value}
            <button class="btn-danger btn-sm hover-button" onClick="removeItem('${itemId}')">Delete</button>
            <button class="btn-primary btn-sm hover-button" onClick="getUserInput('${itemId}')">Edit</button>
            
        </a>`
}

function removeItem(itemId) {
  localStorage.removeItem(itemId)
  location.reload();
}

function getUserInput(itemId) {
  // Create the overlay div
  let overlay = document.createElement("div");
  overlay.classList.add("overlay");

  // Create a modal-like div
  let modal = document.createElement("div");
  modal.classList.add("modal-box");

  // Create close button
  let closeButton = document.createElement("button");
  closeButton.innerHTML = "&times;"; // '×' symbol for close
  closeButton.classList.add("btn", "btn-danger", "btn-sm", "position-absolute", "top-0", "end-0", "m-2");

  // Close overlay on click
  closeButton.addEventListener("click", () => document.body.removeChild(overlay));

  // Create input box
  let inputBox = document.createElement("input");
  inputBox.type = "text";
  inputBox.value = localStorage.getItem(itemId);
  inputBox.classList.add("form-control", "mb-2");

  // Create submit button
  let button = document.createElement("button");
  button.textContent = "Submit";
  button.classList.add("btn", "btn-primary", "w-100");

  // Append elements
  modal.appendChild(closeButton);
  modal.appendChild(inputBox);
  modal.appendChild(button);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Handle button click
  button.addEventListener("click", () => {
    editItemInLocalStorage(inputBox.value, itemId);
    document.body.removeChild(overlay); // Remove overlay on submit
  });
}

function editItemInLocalStorage(text, itemId) {
  localStorage.setItem(itemId, text);
  location.reload();
}
