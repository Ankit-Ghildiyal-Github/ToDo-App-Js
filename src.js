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
      item = createListItem(value, itemId)
      document.querySelector("#list-group").appendChild(item);
    }
  }
}

function isEmptyOrWhitespace(str) {
  return !str || str.trim().length === 0;
}

function createListItem(value, itemId) {
  let anchor = document.createElement("a");
  anchor.href = "#";
  anchor.classList.add("list-group-item", "list-group-item-action");
  if (value.startsWith("?")) {
    anchor.classList.add("strikethrough");
    value = value.slice(1);
  }
  anchor.innerHTML = `${value}`; // Insert text content

  // Create delete button
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("btn-danger", "btn-sm", "hover-button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => removeItem(itemId); // Attach click event

  // Create edit button
  let editButton = document.createElement("button");
  editButton.classList.add("btn-primary", "btn-sm", "hover-button");
  editButton.textContent = "Edit";
  editButton.onclick = () => getUserInput(itemId); // Attach click event

  // Create done button
  let doneButton = document.createElement("button");
  doneButton.classList.add("btn-success", "btn-sm", "hover-button");
  doneButton.textContent = "Done";
  doneButton.onclick = () => markAsDone(itemId); // Attach click event

  // Append buttons to the anchor
  anchor.appendChild(deleteButton);
  anchor.appendChild(editButton);
  anchor.appendChild(doneButton);

  //document.querySelector(".list-group-item").classList.add("completed");

  return anchor;
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

function markAsDone(itemId) {
  const value = "?" + localStorage.getItem(itemId);
  localStorage.setItem(itemId, value)
  location.reload();
}

displayItems()
