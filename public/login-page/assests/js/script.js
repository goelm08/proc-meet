const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("capture-btn");
const retakeBtn = document.getElementById("retake-btn");
const preview = document.getElementById("preview");
const emailInput = document.getElementById("register-email");
const passwordInput = document.getElementById("register-password");

const constraints = {
  audio: false,
  video: true,
};
let stream = null;

// Get access to the camera
navigator.mediaDevices
  .getUserMedia(constraints)
  .then((mediaStream) => {
    stream = mediaStream;
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error(err);
  });

// Take snapshot on button click
captureBtn.addEventListener("click", (event) => {
  event.preventDefault();
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL("image/png");
  preview.src = dataURL;
  preview.style.display = "block";
  video.style.display = "none";
  captureBtn.style.display = "none";
  retakeBtn.style.display = "block";
});

// Retake snapshot on button click
retakeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  preview.style.display = "none";
  video.style.display = "block";
  captureBtn.style.display = "block";
  retakeBtn.style.display = "none";
  stream.getTracks().forEach((track) => {
    if (track.readyState === "ended" && typeof track.start === "function") {
      track.start();
    }
  });
});

function dataURLtoBlob(dataUrl) {
  const binary = atob(dataUrl.split(",")[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
}

const myButton = document.querySelector('#my-button');

myButton.addEventListener('click', (event) => {
  event.preventDefault();
  const blob = dataURLtoBlob(preview.src);
  const formData = new FormData();
  formData.append('image', blob.stream());
  formData.append('email', emailInput.value);
  formData.append('password', passwordInput.value);
  console.log(formData.get("image"))
  // Set the request URL and options
  const url = "/register";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  // Send the request
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        // The request was successful
        return response.json();
      } else {
        // There was an error with the request
        throw new Error("Error:", response.statusText);
      }
    })
    .then((data) => {
      // Do something with the response data
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
})
