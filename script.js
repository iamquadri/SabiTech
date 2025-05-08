

window.addEventListener(`scroll`, () => {
    document.querySelector('nav').classList.toggle
    ('window-scroll', window.scrollY > 0)
})



//showHide nav menu

const menu = document.querySelector(".nav_menu");
const menuBtn = document.querySelector("#open-menu-btn");
const closeBtn = document.querySelector("#close-menu-btn");


menuBtn.addEventListener('click', () => {
    menu.style.display = "flex";
    menuBtn.style.display ="none";
    closeBtn.style.display = "inline-block";
})

// close nav menu
const closeNav = () => {
    menu.style.display = "none";
    closeBtn.style.display = "none";
    menuBtn.style.display = "inline-block";
}

closeBtn.addEventListener('click', closeNav);





 //Signup JavaScript 


function sendOTP() {
  const phone = document.getElementById("phone").value;
  if (phone.length >= 10) {
    // Simulate OTP sending
    alert("OTP sent to " + phone);
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
  } else {
    alert("Enter a valid phone number");
  }
}

function verifyOTP() {
  const otp = document.getElementById("otp").value;
  if (otp === "1234") {
    // Simulate OTP verified
    alert("Phone verified");
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
  } else {
    alert("Invalid OTP. Try 1234 as demo.");
  }
}

function finishSignup() {
  const location = document.getElementById("location").value;
  const email = document.getElementById("email").value;
  if (location && email) {
    // Save basic user info (in-memory/localStorage for demo)
    localStorage.setItem("userLocation", location);
    localStorage.setItem("userEmail", email);
    window.location.href = "index.html";
  } else {
    alert("Please complete all fields.");
  }
}


//JavaScript feed

const sampleItems = [
//   { id: 1, title: "Bag of Rice", location: "Isolo", category: "food", image: "" },
//   { id: 2, title: "Old Shoes", location: "Ketu", category: "non-food", image: "https://via.placeholder.com/200" },
//   { id: 3, title: "Yam Tubers", location: "Shomolu", category: "food", image: "https://via.placeholder.com/200" },
//   { id: 4, title: "Used Books", location: "Isolo", category: "non-food", image: "https://via.placeholder.com/200" },
//   { id: 3, title: "Spaghetinni", location: "Shomolu", category: "food", image: "https://via.placeholder.com/200" },
//   { id: 3, title: "Arm Chairs", location: "Ketu", category: "non-food", image: "https://via.placeholder.com/200" }
];

function renderItems(category) {
  const container = document.getElementById("item-list");
  container.innerHTML = "";

  const filtered = sampleItems.filter(item => item.category === category);
  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <h4>${item.title}</h4>
      <small>${item.location}</small><br/>
      <button onclick="viewDetails(${item.id})">Request</button>
    `;
    container.appendChild(card);
  });
}

function filterItems(type) {
  renderItems(type);
  document.getElementById("food-tab").classList.remove("active");
  document.getElementById("non-food-tab").classList.remove("active");

  if (type === "food") {
    document.getElementById("food-tab").classList.add("active");
  } else {
    document.getElementById("non-food-tab").classList.add("active");
  }
}

function viewDetails(itemId) {
  // Store selected item ID and navigate
  localStorage.setItem("selectedItemId", itemId);
  window.location.href = "details.html";
}

function goToUpload() {
  window.location.href = "upload.html";
}

// Auto-render on home page load
if (document.getElementById("item-list")) {
  renderItems("food"); // default tab
}




//Upload item page
function submitItem() {
    const title = document.getElementById("itemTitle").value;
    const category = document.getElementById("itemCategory").value;
    const description = document.getElementById("itemDescription").value;
    const imageInput = document.getElementById("itemImage");
  
    if (!title || !category || !description || imageInput.files.length === 0) {
      alert("upload an image.");
      return;
    };
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const newItem = {
        id: Date.now(),
        title,
        category,
        location: localStorage.getItem("userLocation") || "Unknown",
        description,
        image: e.target.result
      };
  
      // Save to localStorage (simple array)
      const existing = JSON.parse(localStorage.getItem("items") || "[]");
      existing.push(newItem);
      localStorage.setItem("items", JSON.stringify(existing));
  
      alert("Item uploaded successfully!");
      window.location.href = "upload.html";
    };
  
    reader.readAsDataURL(imageInput.files[0]);
  }
  
  
  /// Render items 
  
  
  function renderItems(category) {
    const container = document.getElementById("item-list");
    container.innerHTML = "";
  
    const stored = JSON.parse(localStorage.getItem("items") || "[]");
    const combined = sampleItems.concat(stored);
    const filtered = combined.filter(item => item.category === category);
  
    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" />
        <h4>${item.title}</h4>
        <small>${item.location}</small><br/>
        <button onclick="viewDetails(${item.id})">Request</button>
      `;
      container.appendChild(card);
    });
  }



  //chat javascript
  if (window.location.pathname.includes("details.html")) {
    const itemId = parseInt(localStorage.getItem("selectedItemId"));
    const stored = JSON.parse(localStorage.getItem("items") || "[]");
    const combined = sampleItems.concat(stored);
    const item = combined.find(it => it.id === itemId);
  
    if (item) {
      document.getElementById("detailImage").src = item.image;
      document.getElementById("detailTitle").textContent = item.title;
      document.getElementById("detailDescription").textContent = item.description;
      document.getElementById("detailLocation").textContent = "Location: " + item.location;
    } else {
      alert("Item found.");
      window.location.href = "home.html";
    }
  }
  
  function startChat() {
    // Simulate user chat session by saving itemId
    localStorage.setItem("chatItemId", localStorage.getItem("selectedItemId"));
    window.location.href = "chat.html";
  }


  //chat message



  
function loadChat() {
    const chatId = localStorage.getItem("chatItemId");
    const chatKey = `chat_${chatId}`;
    const messages = JSON.parse(localStorage.getItem(chatKey) || "[]");
    const chatBox = document.getElementById("chatBox");
  
    chatBox.innerHTML = "";
    messages.forEach(msg => {
      const div = document.createElement("div");
      div.textContent = msg;
      div.style.marginBottom = "6px";
      chatBox.appendChild(div);
    });
  
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  function sendMessage() {
    const chatId = localStorage.getItem("chatItemId");
    const chatKey = `chat_${chatId}`;
    const input = document.getElementById("chatMessage");
    const text = input.value.trim();
  
    if (text) {
      const messages = JSON.parse(localStorage.getItem(chatKey) || "[]");
      messages.push("You: " + text);
      messages.push("Giver: Sure, let's  arrange pickup.");
      messages.push("Giver: they deliver and recieve.");
      localStorage.setItem(chatKey, JSON.stringify(messages));
      input.value = "";
      loadChat();
    }
  }
  
  function goHome() {
    window.location.href = "home.html";
  }
  
  // Auto-load chat if on chat.html
  if (window.location.pathname.includes("chat.html")) {
    loadChat();
  }



  // profile page: 

document.querySelectorAll('.card button').forEach(button => {
  button.addEventListener('click', function() {
    if (this.innerText === 'Edit') {
      alert('Edit Item');
      // Redirect to the item edit page or show edit form
    } else if (this.innerText === 'Delete') {
      alert('Delete');
      // Add logic to delete the item
    } else if (this.innerText === 'Request') {
      alert('Request Item');
      // Add logic to handle item request
    }
  });
});


