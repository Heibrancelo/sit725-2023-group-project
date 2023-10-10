// Wait for the HTML document to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Find all elements with the class "sidenav" and initialize them as side navigation menus
    const elems = document.querySelectorAll(".sidenav");
    const instances = M.Sidenav.init(elems);
  
    // Call 'fetchStalls' when fully loaded
    fetchStalls();
  });
  
  // Function to fetch stalls from an API
  function fetchStalls() {
    console.log("sad")
    // Make a network request to a specified API endpoint 
    fetch("http://localhost:3000/")
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => displayStalls(data)) // Call the "displayStalls" function with the fetched data
      .catch((error) =>
        console.error("There was an error fetching the data", error)
      ); // Handle any errors that occur during the fetch operation
  }
  
  // Function to display the fetched stalls on the web page
  function displayStalls(stalls) {
    // Find the HTML element with the class "list-of-stalls" and select its child elements
    const container = document.querySelector(".list-of-stalls .container .row");
  
    // Clear any existing stalls from the container
    container.innerHTML = "";
  
    // Loop through each stall in the fetched data
    stalls.forEach((stall) => {
      // Create a new column element with appropriate classes
      const col = document.createElement("div");
      col.className = "col s12 m6 l3";
  
      // Create a card element to display stall information
      const card = document.createElement("div");
      card.className = "card";
  
      // Create a card image element and set its source to the stall's image
      const cardImage = document.createElement("div");
      cardImage.className = "card-image";
      const img = document.createElement("img");
      img.src = stall.image;
      cardImage.appendChild(img);
  
      // Create a card content element with stall name and description
      const cardContent = document.createElement("div");
      cardContent.className = "card-content";
      const span = document.createElement("span");
      span.className = "card-title";
      span.textContent = stall.name;
      cardContent.appendChild(span);
      const p = document.createElement("p");
      p.textContent = stall.description;
      cardContent.appendChild(p);
  
      // Create a card action element with a link to "Enter"
      const cardAction = document.createElement("div");
      cardAction.className = "card-action center";
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = "Enter";
      cardAction.appendChild(a);
  
      // Append the card elements to the column, and the column to the container
      card.appendChild(cardImage);
      card.appendChild(cardContent);
      card.appendChild(cardAction);
      col.appendChild(card);
      container.appendChild(col);
    });
  }
  