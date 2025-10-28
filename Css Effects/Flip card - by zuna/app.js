// Select necessary elements
const video = document.getElementById('video');
const snapshotCanvas = document.getElementById('snapshot');
const snapshotBtn = document.getElementById('snapshotBtn');
const startBtn = document.getElementById('startBtn');
const timeSnap = document.getElementById('timeSnap');

// Load Face API models from the cloud
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights'),
  faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights'),
  faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights')
]).then(() => {
  console.log('Models loaded successfully');
  startVideo();
});

// Function to start video stream from the camera
function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      console.error("Error accessing the camera:", err);
      alert("Please allow access to the camera.");
    });
}

// Start camera when "Start Camera" button is clicked
startBtn.addEventListener('click', () => {
  startVideo();
});

// Take a snapshot when "Take Snapshot" button is clicked
snapshotBtn.addEventListener('click', () => {
  if (!video.srcObject) {
    alert('Start the camera first.');
    return;
  }

  // Draw the current video frame to the canvas
  const context = snapshotCanvas.getContext('2d');
  snapshotCanvas.width = video.videoWidth;
  snapshotCanvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

  // Display the current time as the timestamp
  const now = new Date();
  timeSnap.textContent = `Snapshot taken at: ${now.toLocaleTimeString()}`;
});

// Detect faces once the video starts playing
video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.querySelector('.container').append(canvas);
  const displaySize = { width: video.videoWidth, height: video.videoHeight };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
  }, 100);
});
