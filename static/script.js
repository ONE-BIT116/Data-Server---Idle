let byteCount = 0;
let bytesPerClick = 1;
let bytesPerSecond = 0;
let routerCost = 15;
let routerPerSecond = 0.1;
let routerTotal = 0;

const clickk = document.getElementById('click');
const totalElement = document.getElementById('total');
const buybtn = document.getElementById('buy-button');
const totalRouter = document.getElementById('colvo');
const routerCostt = document.getElementById('router-cost');
const PerSecondElement = document.getElementById('per-second');

function formatBytes(bytes) {
  if (bytes < 1024) return bytes.toFixed(1) + "B";

  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB", "RWB", "QWB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = parseFloat((bytes / Math.pow(1024, i)).toFixed(1));

  return value + units[i];
}

function updateUI() {
  if (totalElement) {
    totalElement.textContent = formatBytes(byteCount);
  }

  if (PerSecondElement) {
    PerSecondElement.textContent = formatBytes(bytesPerSecond)
  }
}

function updateRouterUI() {
  if (totalRouter) {
    totalRouter.textContent = routerTotal;
  }

  if (routerCostt) {
    routerCostt.textContent = routerCost;
  }
}

function saveGame() {
  localStorage.setItem('byteCount', byteCount);
  localStorage.setItem('bytesPerSecond', bytesPerSecond);
  localStorage.setItem('bytesPerClick', bytesPerClick);
  localStorage.setItem('routerCost', routerCost);
  localStorage.setItem('routerTotal', routerTotal);
}

function loadGame() {
  const savedByteCount = localStorage.getItem('byteCount');
  const savedBytesPerClick = localStorage.getItem('bytesPerClick');
  const savedBytesPerSecond = localStorage.getItem('bytesPerSecond');
  const savedrouterCost = localStorage.getItem('routerCost');
  const savedrouterTotal = localStorage.getItem('routerTotal');

  if (savedByteCount !== null) byteCount = parseFloat(savedByteCount);
  if (savedBytesPerClick !== null) bytesPerClick = parseFloat(savedBytesPerClick);
  if (savedBytesPerSecond !== null) bytesPerSecond = parseFloat(savedBytesPerSecond);
  if (savedrouterCost !== null) routerCost = parseFloat(savedrouterCost);
  if (savedrouterTotal !== null) routerTotal = parseFloat(savedrouterTotal);

  updateUI();
  updateRouterUI();
}

if (clickk) {
  clickk.addEventListener('click', () => {
    byteCount += bytesPerClick;
    console.log("click");
    updateUI();
  });
}

if (buybtn) {
  buybtn.addEventListener('click', () => {
    if (byteCount >= routerCost) {
      byteCount -= routerCost;
      bytesPerSecond += routerPerSecond;
      routerTotal += 1;
      routerCost = Math.floor(routerCost * 1.5);
      updateRouterUI();
      updateUI();
    }
  });
}

setInterval(() => {
  byteCount += bytesPerSecond;
  updateUI();
}, 1000);

setInterval(() => {
  saveGame()
  updateUI();
}, 60000);


loadGame()