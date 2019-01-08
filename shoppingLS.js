// Shopping List - OOP - Classes
// Watch Previous Video - Shopping List - OOP - CLASSES
// Add Local Storage Functionality

class ShopItem {
  constructor(item) {
    this.item = item;
  }
  addToList(newShopItem) {
    const ulList = document.getElementById("shopList");
    // create li element
    const li = document.createElement("li");
    // insert HTML into li
    li.innerHTML = `${newShopItem}<a href="#" class="float-right" id="deleteItem">X</a><hr>`;
    // append li to ul
    ulList.appendChild(li);
  }
  clearValue() {
    document.getElementById("shopItem").value = "";
  }
  displayMsg(msg, classType) {
    // create div
    const div = document.createElement("div");
    // add bootstrap classes
    div.className = `alert alert-${classType}`;
    // append text node with msg
    div.appendChild(document.createTextNode(msg));
    // insert below h1
    const mainDiv = document.getElementById("mainDiv");
    const shopForm = document.getElementById("shopForm");
    mainDiv.insertBefore(div, shopForm);
    // remove message after 2 seconds
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 2000);
  }
  deleteShopItem(target) {
    if (target.id === "deleteItem") {
      if (confirm("Do you want to remove item from shopping list?")) {
        target.parentElement.remove();
      }
    }
  }
}
// LOCAL STORAGE CLASS
class LocalStorage {
  // static implies Class need not be instantiated to use methods
  static getItems() {
    // note: we will need to get the items before adding/deleting/displaying
    let allItems;
    if (localStorage.getItem("items") === null) {
      allItems = [];
    } else {
      // local storage is a key value pair in string format
      // we need to convert it so we can modify before returning it to LS
      allItems = JSON.parse(localStorage.getItem("items"));
    }
    return allItems;
  }
  static addItem(latestItem) {
    const newItem = LocalStorage.getItems();
    // modify by pushing onto the array the latest item
    newItem.push(latestItem);
    // convert back to a string and set it back to LS
    localStorage.setItem("items", JSON.stringify(newItem));
  }
  static displayItems() {
    const displayItems = LocalStorage.getItems();
    displayItems.forEach(function(item) {
      const shopItem = new ShopItem();
      shopItem.addToList(item);
    });
  }
  static removeItem(theContentTextX) {
    const rmItem = LocalStorage.getItems();
    rmItem.forEach(function(item, index) {
      if (`${item}X` === theContentTextX) {
        rmItem.splice(index, 1);
      }
      localStorage.setItem("items", JSON.stringify(rmItem));
    });
  }
}
// on Load of the DOM - display all items from LS
document.addEventListener("DOMContentLoaded", LocalStorage.displayItems);

// Event Listeners
document.getElementById("shopForm").addEventListener("submit", e => {
  const newShopItem = document.querySelector("#shopItem").value;
  // instantiate a ShopItem
  const theItem = new ShopItem(newShopItem);
  // validate
  if (newShopItem === "") {
    // display error msg
    theItem.displayMsg("Your item is empty", "danger");
  } else {
    // display success msg
    theItem.displayMsg("Your item has been added", "success");
    // add item to list
    theItem.addToList(newShopItem);
    // add newShopItem to LOCAL STORAGE
    LocalStorage.addItem(newShopItem);
    // clear newShopItem value field
    theItem.clearValue();
  }

  e.preventDefault();
});

// event listener - delete (not in DOM unless added - target ul)
document.getElementById("shopList").addEventListener("click", e => {
  const delShopItem = new ShopItem();
  delShopItem.deleteShopItem(e.target);
  // Remove from LS
  LocalStorage.removeItem(e.target.parentElement.textContent);
  delShopItem.displayMsg("Your item has been removed", "success");
  e.preventDefault();
});
