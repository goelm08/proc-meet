document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const cameraPreview = document.getElementById("camera-preview");
    const snapshotCanvas = document.getElementById("snapshot-canvas");
    const captureSnapshotButton = document.getElementById("capture-snapshot");
    const snapshotPreview = document.getElementById("snapshot-preview");
    
    // Initialize the camera and take a snapshot.
  async function initCameraAndTakeSnapshot() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      cameraPreview.srcObject = stream;
      cameraPreview.play();
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  }
  
  // Capture the snapshot and display it.
  function captureSnapshot() {
    snapshotCanvas.width = cameraPreview.videoWidth;
    snapshotCanvas.height = cameraPreview.videoHeight;
    snapshotCanvas.getContext("2d").drawImage(cameraPreview, 0, 0);
    snapshotPreview.src = snapshotCanvas.toDataURL("image/jpeg");
    snapshotPreview.style.display = "block";
  }
  
  captureSnapshotButton.addEventListener("click", captureSnapshot);
  
    async function sendUserData(url, email, password) {
      try {
        const snapshot = snapshotCanvas.toDataURL("image/jpeg");
        // const response = await fetch(url, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ email, password, snapshot }),
        // });
  
        // if (!response.ok) {
        //   throw new Error(`Error: ${response.statusText}`);
        // }
  
        return true;
      } catch (err) {
        console.error("Error sending user data:", err);
        return null;
      }
    }
  
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
  
      await initCameraAndTakeSnapshot();
  
      // Replace with your backend authentication endpoint.
      const url = "https://your-backend-authentication-endpoint.example.com/login";
      const result = await sendUserData(url, email, password);
  
      if (result) {
        // Process successful login, e.g., redirect to the user dashboard.
        console.log("YOooo");
      } else {
        // Handle unsuccessful login.
        console.log("waon waon");
      }
    });
  
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;
  
      await initCameraAndTakeSnapshot();
  
      // Replace with your backend registration endpoint.
      const url = "https://your-backend-registration-endpoint.example.com/register";
      const result = await sendUserData(url, email, password);
  
      if (result) {
        // Process successful registration, e.g., show a success message.
        console.log("YOooo");
      } else {
        // Handle unsuccessful registration, e.g., show an error message and retake the snapshot.
        console.log("waon waon");
        // await initCameraAndTakeSnapshot();
      }
    });
  });
  