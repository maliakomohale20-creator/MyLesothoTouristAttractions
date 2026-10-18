


var themeButton = document.getElementById("themeButton");

function setTheme(mode) {
  document.documentElement.setAttribute("data-bs-theme", mode);
  localStorage.setItem("theme", mode);   // save the choice

  if (themeButton) {
    if (mode == "dark") {
      themeButton.textContent = "Dark";
    } else {
      themeButton.textContent = "Light";
    }
  }
}


var savedTheme = localStorage.getItem("theme");
if (savedTheme == "dark") {
  setTheme("dark");
} else {
  setTheme("light");
}

// when the button is clicked, switch the theme
if (themeButton) {
  themeButton.addEventListener("click", function () {
    var now = document.documentElement.getAttribute("data-bs-theme");
    if (now == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  });
}


var searchBox = document.getElementById("searchBox");
var filterButtons = document.querySelectorAll(".filter-button");
var currentFilter = "All";

function showItems() {
  var items = document.querySelectorAll(".item");
  var searchText = "";
  if (searchBox) {
    searchText = searchBox.value.toLowerCase();
  }

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var words = item.textContent.toLowerCase();
    var category = item.getAttribute("data-category");

    var matchSearch = words.includes(searchText);
    var matchFilter = (currentFilter == "All") || category.includes(currentFilter);

    if (matchSearch && matchFilter) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  }
}

if (searchBox) {
  searchBox.addEventListener("keyup", showItems);
}

for (var b = 0; b < filterButtons.length; b++) {
  filterButtons[b].addEventListener("click", function () {
    // remove "active" from all buttons, then add to the clicked one
    for (var j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }
    this.classList.add("active");
    currentFilter = this.getAttribute("data-filter");
    showItems();
  });
}



var services = [
  { id: 1, name: "Pony Trekking Tours", price: 900, unit: "day", category: "Adventure Culture",
    picture: "ponytek.jpg", text: "Multi day mountain treks with local guides. Ride like a local, stay in villages." },
  { id: 2, name: "Sani Pass 4x4 Trips", price: 1200, unit: "trip", category: "Adventure",
    picture: "sanipass44.jpg", text: "Guided 4x4 experience up the legendary pass. Scenic stops and viewpoints." },
  { id: 3, name: "Maletsunyane Falls Hiking", price: 650, unit: "half-day", category: "Adventure",
    picture: "Maletsunyane.webp", text: "Hike to the 192m falls. Perfect day hike." },
  { id: 4, name: "Cultural Homestays", price: 750, unit: "night", category: "Culture",
    picture: "komecaves.jpg", text: "Stay with a Basotho family. Meals, storytelling and village life." },
  { id: 5, name: "Waterfall Abseiling", price: 850, unit: "half-day", category: "Adventure",
    picture: "abseiling.jpg", text: "Abseil down the falls with a trained guide. Safety gear provided." },
  { id: 6, name: "Craft & Weaving Workshops", price: 400, unit: "workshop", category: "Workshops Culture",
    picture: "basothocrafts.jpg", text: "Learn traditional weaving. Materials provided. Support local artisans." },
  { id: 7, name: "Thabana Ntlenyana Summit Hike", price: 1500, unit: "day", category: "Adventure",
    picture: "hiking.jpg", text: "Trek to Southern Africa's highest peak 3,482m. Challenging full-day hike for experienced hikers." },
  { id: 8, name: "Mountain Biking Trails", price: 700, unit: "day", category: "Adventure",
    picture: "sanipassmoto.webp", text: "Ride through highland trails and villages. Bike rental and guide included." },
  { id: 9, name: "Afriski Snowboarding & Skiing", price: 1100, unit: "day", category: "Adventure Winter",
    picture: "snowboarding.jpg", text: "Africa's only ski resort. Board/ski rental, lift pass and lessons available June-Aug." },
  { id: 10, name: "Mohale Dam  Boating", price: 600, unit: "day", category: "Adventure",
    picture: "boating.jpg", text: "Boating and scenic picnics on the dam. Gear and boat included." },
  { id: 11, name: "Cultural Dances at Thaba-Bosiu", price: 450, unit: "person", category: "Culture",
    picture: "dance.jpg", text: "Traditional Mohobelo dance at the mountain fortress. Live drumming, Basotho costumes and history tour of King Moshoeshoe I's stronghold." },
  { id: 12, name: "Moshoeshoe Walk", price: 1500, unit: "3 days", category: "Adventure Culture",
    picture: "moshoeshoewalk.jpg", text: "Annual 116km historic walk from Menkhoaneng to Thaba-Bosiu. Follow the footsteps of King Moshoeshoe I. 3day trek through villages, camping and cultural stops." }
];

var serviceList = document.getElementById("serviceList");
var cartList = document.getElementById("cartList");
var cartTotal = document.getElementById("cartTotal");
var cartCount = document.getElementById("cartCount");


var cart = JSON.parse(localStorage.getItem("cart")) || [];


function showServices() {
  var html = "";
  for (var i = 0; i < services.length; i++) {
    var s = services[i];
    html += '<div class="col-12 col-md-6 col-xl-4 item" data-category="' + s.category + '">';
    html += '  <div class="my-card">';
    html += '    <div class="picture-box">';
    html += '      <img src="' + s.picture + '" class="card-picture" alt="' + s.name + '">';
    html += '      <span class="price-tag">From LSL ' + s.price + ' / ' + s.unit + '</span>';
    html += '    </div>';
    html += '    <h3 class="h5 mt-2" style="text-transform:none;">' + s.name + '</h3>';
    html += '    <p class="small">' + s.text + '</p>';
    html += '    <button class="blue-button" onclick="addToCart(' + s.id + ')">Add to Cart &rarr;</button> ';
    html += '    <button class="outline-button" onclick="showDetails(' + s.id + ')">View Details</button>';
    html += '  </div>';
    html += '</div>';
  }
  serviceList.innerHTML = html;
}


function addToCart(id) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      cart[i].quantity = cart[i].quantity + 1;   // already in cart, add one more
      saveCart();
      return;
    }
  }

  for (var j = 0; j < services.length; j++) {
    if (services[j].id == id) {
      cart.push({ id: id, name: services[j].name, price: services[j].price, quantity: 1 });
    }
  }
  saveCart();
}


function removeFromCart(id) {
  var newCart = [];
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id != id) {
      newCart.push(cart[i]);
    }
  }
  cart = newCart;
  saveCart();
}


function changeQuantity(id, change) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      cart[i].quantity = cart[i].quantity + change;
      if (cart[i].quantity < 1) {
        removeFromCart(id);
        return;
      }
    }
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}


function showCart() {
  var html = "";
  var total = 0;
  var count = 0;

  if (cart.length == 0) {
    html = "<p>Your cart is empty.</p>";
  }

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    total = total + item.price * item.quantity;
    count = count + item.quantity;

    html += '<div class="mb-2 small">';
    html += '<strong>' + item.name + '</strong><br>';
    html += '<button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(' + item.id + ', -1)">-</button> ';
    html += item.quantity + ' x LSL ' + item.price + ' ';
    html += '<button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(' + item.id + ', 1)">+</button> ';
    html += '<button class="btn btn-sm btn-danger" onclick="removeFromCart(' + item.id + ')">Remove</button>';
    html += '</div>';
  }

  cartList.innerHTML = html;
  cartTotal.textContent = "Total: LSL " + total;
  cartCount.textContent = count;
}


function showDetails(id) {
  for (var i = 0; i < services.length; i++) {
    if (services[i].id == id) {
      document.getElementById("detailsTitle").textContent = services[i].name;
      document.getElementById("detailsText").textContent = services[i].text;
      document.getElementById("detailsPrice").textContent = "From LSL " + services[i].price + " / " + services[i].unit;
      document.getElementById("detailsPicture").src = services[i].picture;
    }
  }
  var box = new bootstrap.Modal(document.getElementById("detailsModal"));
  box.show();
}


var checkoutButton = document.getElementById("checkoutButton");
if (checkoutButton) {
  checkoutButton.addEventListener("click", function () {
    if (cart.length == 0) {
      alert("Your cart is empty. Please add a tour first.");
    } else {
      alert("Thank you! Your booking request was sent. We will contact you soon.");
      cart = [];
      saveCart();
    }
  });
}


if (serviceList) {
  showServices();
  showCart();
}


var galleryPictures = document.querySelectorAll(".gallery-picture");
var galleryIndex = 0;

function showGalleryPicture() {
  var visible = [];
  for (var i = 0; i < galleryPictures.length; i++) {
    if (galleryPictures[i].closest(".item").style.display != "none") {
      visible.push(galleryPictures[i]);
    }
  }
  if (visible.length == 0) { return; }

  if (galleryIndex >= visible.length) { galleryIndex = 0; }
  if (galleryIndex < 0) { galleryIndex = visible.length - 1; }

  var pic = visible[galleryIndex];
  document.getElementById("bigPicture").src = pic.src;
  document.getElementById("bigPicture").alt = pic.alt;
  document.getElementById("bigTitle").textContent = pic.getAttribute("data-title");
  document.getElementById("downloadLink").href = pic.src;
}

for (var g = 0; g < galleryPictures.length; g++) {
  galleryPictures[g].addEventListener("click", function () {

    var visible = [];
    for (var i = 0; i < galleryPictures.length; i++) {
      if (galleryPictures[i].closest(".item").style.display != "none") {
        visible.push(galleryPictures[i]);
      }
    }
    galleryIndex = visible.indexOf(this);
    showGalleryPicture();
    var box = new bootstrap.Modal(document.getElementById("galleryModal"));
    box.show();
  });
}

var nextButton = document.getElementById("nextButton");
var previousButton = document.getElementById("previousButton");
var shareButton = document.getElementById("shareButton");

if (nextButton) {
  nextButton.addEventListener("click", function () {
    galleryIndex = galleryIndex + 1;
    showGalleryPicture();
  });
}

if (previousButton) {
  previousButton.addEventListener("click", function () {
    galleryIndex = galleryIndex - 1;
    showGalleryPicture();
  });
}

if (shareButton) {
  shareButton.addEventListener("click", function () {
    alert("Share this page with your friends: " + window.location.href);
  });
}



function emailIsGood(email) {
  var pattern = /^[^ ]+@[^ ]+\.[^ ]+$/;
  return pattern.test(email);
}


function showError(input, message) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  var errorBox = input.parentElement.querySelector(".error-message");
  if (errorBox) { errorBox.textContent = message; }
}


function showGood(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}


var contactForm = document.getElementById("contactForm");

if (contactForm) {
  
  var oldName = localStorage.getItem("username");
  if (oldName) {
    document.getElementById("welcomeBack").textContent = "Welcome back, " + oldName + "!";
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();  

    var name = document.getElementById("contactName");
    var email = document.getElementById("contactEmail");
    var subject = document.getElementById("contactSubject");
    var message = document.getElementById("contactMessage");
    var allGood = true;

    if (name.value.trim().length < 2) {
      showError(name, "Please enter your full name.");
      allGood = false;
    } else { showGood(name); }

    if (!emailIsGood(email.value.trim())) {
      showError(email, "Please enter a correct email address.");
      allGood = false;
    } else { showGood(email); }

    if (subject.value.trim() == "") {
      showError(subject, "Please enter a subject.");
      allGood = false;
    } else { showGood(subject); }

    if (message.value.trim().length < 10) {
      showError(message, "Your message must have at least 10 letters.");
      allGood = false;
    } else { showGood(message); }

    if (allGood) {
      localStorage.setItem("username", name.value.trim());  
      document.getElementById("contactSuccess").classList.remove("d-none");
      contactForm.reset();
      name.classList.remove("is-valid");
      email.classList.remove("is-valid");
      subject.classList.remove("is-valid");
      message.classList.remove("is-valid");
    }
  });
}



var bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  var tourSelect = document.getElementById("bookTour");
  var peopleBox = document.getElementById("bookPeople");
  var costText = document.getElementById("bookCost");

  // work out the cost
  function calculateCost() {
    var price = Number(tourSelect.value);
    var people = Number(peopleBox.value);
    if (people < 1) { people = 1; }
    costText.textContent = "Estimated cost: LSL " + (price * people);
  }

  tourSelect.addEventListener("change", calculateCost);
  peopleBox.addEventListener("keyup", calculateCost);
  peopleBox.addEventListener("change", calculateCost);
  calculateCost();

  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("bookName");
    var email = document.getElementById("bookEmail");
    var date = document.getElementById("bookDate");
    var allGood = true;

    if (name.value.trim().length < 2) {
      showError(name, "Enter your name.");
      allGood = false;
    } else { showGood(name); }

    if (!emailIsGood(email.value.trim())) {
      showError(email, "Enter a correct email.");
      allGood = false;
    } else { showGood(email); }

    if (date.value == "") {
      showError(date, "Choose a date.");
      allGood = false;
    } else { showGood(date); }

    if (allGood) {
      document.getElementById("bookSuccess").classList.remove("d-none");
      localStorage.setItem("username", name.value.trim());
    }
  });
}
