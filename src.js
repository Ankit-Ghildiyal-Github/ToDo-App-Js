function submitButton(text){
  if(!isEmptyOrWhitespace(text)){
  console.log(text);
  if(localStorage.getItem("itemCounter")==null){
    localStorage.setItem("itemCounter", 0)
  }
  var itemCounter = localStorage.getItem("itemCounter")
  var key = "item"+itemCounter
  localStorage.setItem(key, text);
  itemCounter = parseInt(itemCounter)+1
  localStorage.setItem("itemCounter", itemCounter)
  location.reload();
}

}

function displayItems(){
  var item = document.getElementById('list-group').innerHTML
  for (let i = 0; i < localStorage.getItem("itemCounter"); i++) {
    const itemId = "item"+i; // Get the key at the current index
    const value = localStorage.getItem(itemId); // Get the value associated with the key
    
    if(value!=null){
       item = item + createListItem(value, itemId)
    }

    
}
document.getElementById('list-group').innerHTML = item;
}

function isEmptyOrWhitespace(str) {
  return !str || str.trim().length === 0;
}

displayItems()

function createListItem(value, itemId){
  return `<a href="#" class="list-group-item list-group-item-action">
            ${value}
            <button class="btn-danger btn-sm hover-button" onClick="removeItem('${itemId}')">Delete</button>
            <button class="btn-primary btn-sm hover-button" onClick="getUserInput('${itemId}')">Edit</button>
            
        </a>`
}

function removeItem(itemId){
  localStorage.removeItem(itemId)
  location.reload();
}

function getUserInput(itemId) {
  // Create input field
  let inputBox = document.createElement("input");
  inputBox.type = "text";
  inputBox.value = localStorage.getItem(itemId);
  document.body.appendChild(inputBox);

  // Create submit button
  let button = document.createElement("button");
  button.textContent = "Submit";
  document.body.appendChild(button);

  // Handle button click
  button.addEventListener("click", () => {
      console.log("User entered:", inputBox.value);
      console.log("Item Id:", itemId);
      editItemInLocalStorage(inputBox.value, itemId);
      document.body.removeChild(inputBox);
      document.body.removeChild(button);
  });
}

function editItemInLocalStorage(text, itemId){
  localStorage.setItem(itemId, text);
  location.reload();
}
