let byteCount = 0;
let bytesPerClick = 0.1;
let bytesPerSecond = 0;

const clickk = document.getElementById('click');
const totalElement = document.getElementById('total');

function formatBytes(bytes) {
  if (bytes < 1024) return bytes.toFixed(1) + "B";

  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB", "RWB", "QWB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = parseFloat((bytes / Math.pow(1024, i)).toFixed(1));

  return value + " : " + units[i];
}

function updateUI() {
  if (totalElement) {
    totalElement.textContent = formatBytes(byteCount);
  }
}

if (clickk) {
  clickk.addEventListener('click', () => {
    byteCount += bytesPerClick;
    console.log("click");
    updateUI();
  });
}

setInterval(() => {
  byteCount += bytesPerSecond;
  updateUI();
}, 1000);