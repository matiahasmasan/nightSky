function setupImageUpload() {
  const dropZone = document.querySelector(".image-upload-container");
  const fileInput = document.querySelector("#imageUpload");

  // Handle drag and drop events
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    const files = e.dataTransfer.files;
    if (files.length) {
      handleImageUpload(files[0]);
    }
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      handleImageUpload(e.target.files[0]);
    }
  });
}

function handleImageUpload(file) {
  if (!file.type.startsWith("image/")) {
    alert("Please upload an image file");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const uploadedImage = document.querySelector(".uploadedImage");
    uploadedImage.src = e.target.result;
    uploadedImage.style.display = "block";
  };
  reader.readAsDataURL(file);
}

function validateAndUpdateDetails() {
  const myName = document.querySelector(".myName").value;
  const yourName = document.querySelector(".yourName").value;
  const city = document.querySelector(".input").value;
  const date = document.querySelector(".dateBox").value;
  const errorElement = document.querySelector(".error");

  if (!myName || !yourName || !city || !date) {
    errorElement.style.display = "block";
    return;
  } else {
    errorElement.style.display = "none";
  }

  updateDetails(myName, yourName, city, date);
}

async function updateDetails(myName, yourName, city, date) {
  const namesElement = document.querySelector(".names");
  const cityElement = document.querySelector(".city");
  const dateElement = document.querySelector(".date");
  const coordinatesElement = document.querySelector(".coordinates");
  const timeElement = document.querySelector(".time");
  const messageElement = document.querySelector(".message");
  const skyChartImage = document.querySelector(".skyChart");
  const lovelyMessage = document.querySelector(".lovelyMessage").value;

  // Update names and city
  namesElement.textContent = `${myName} & ${yourName}`;
  cityElement.textContent = city;

  // Update date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  dateElement.textContent = formattedDate;

  // Calculate time difference
  const currentDate = new Date();
  const inputDate = new Date(date);
  const timeDifferenceInDays = Math.floor(
    (currentDate - inputDate) / (1000 * 60 * 60 * 24)
  );

  const years = Math.floor(timeDifferenceInDays / 365);
  const remainingDays = timeDifferenceInDays % 365;

  timeElement.textContent =
    years > 0
      ? `${years} year(s) and ${remainingDays} day(s)`
      : `${timeDifferenceInDays} day(s)`;

  //geocoding API
  let lat = null,
    lon = null;
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${city}&format=json`
    );
    const data = await response.json();
    if (data.length > 0) {
      lat = data[0].lat;
      lon = data[0].lon;
      coordinatesElement.textContent = `${lat} N, ${lon} W`;
    } else {
      coordinatesElement.textContent = "Coordinates not found";
    }
  } catch (error) {
    coordinatesElement.textContent = "Error fetching coordinates";
  }

  messageElement.textContent = lovelyMessage ? `"${lovelyMessage}"` : "";

  //astronomyAPI
  if (lat && lon) {
    try {
      const astronomyResponse = await fetch(
        "http://localhost:3000/proxy/star-chart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            style: "navy",
            observer: {
              latitude: parseFloat(lat),
              longitude: parseFloat(lon),
              date: date,
            },
            view: {
              type: "constellation",
              parameters: {
                constellation: "and",
              },
            },
          }),
        }
      );

      const astronomyData = await astronomyResponse.json();
      const imageUrl = astronomyData.data.imageUrl;
      skyChartImage.src = imageUrl;
      skyChartImage.style.display = "block";
    } catch (error) {
      skyChartImage.alt = "Error fetching sky chart";
      skyChartImage.style.display = "block";
    }
  }

  document.querySelector(".night").style.display = "block";
  document.querySelector(".error").style.display = "none";
  document.querySelector(".search").style.display = "none";
}

// Initialize image upload functionality when the page loads
document.addEventListener("DOMContentLoaded", setupImageUpload);
