'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

const pageWidth = select('.width');
const pageHeight = select('.height');
const pageOrientation = select('.orientation');
const batteryCheck = select('.battery');
const statusCheck = select('.status');
const laptopName = select('.laptop-name');
const browser = select('.browser');
const language = select('.language');
const button = select('.btn');

function getLaptopName() {
  const userAgent = window.navigator.userAgent;

  switch(true) {
    case userAgent.indexOf('Win') !== -1:
      return 'Windows';
    case userAgent.indexOf('Mac') !== -1:
      return 'Mac/iOS';
    case userAgent.indexOf('X11') !== -1:
      return 'UNIX';
    case userAgent.indexOf('Linux') !== -1:
      return 'Linux';  
    default:
      return 'Unknown OS';    
  }
}

function getBrowser() {
  const userAgent = navigator.userAgent;

  switch(true) {
    case userAgent.indexOf('Edg') !== -1:
      return 'Microsoft Edge';
    case userAgent.indexOf('Firefox') !== -1:
      return 'Firefox';
    case userAgent.indexOf('Chrome') !== -1:
      return 'Chrome';
      case userAgent.indexOf('Safari') !== -1:
        return 'Safari';
    default:
      return 'Unknown Browser';   
  }
}

function getLanguage() {
  return navigator.language;
}

function updateWindowSize() {
  pageWidth.innerText = window.innerWidth;
  pageHeight.innerText = window.innerHeight;
  pageOrientation.innerText = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
}

// I use asyn and await keywords for more readability here 
//async declares  asynchronous operation which can handal using await 
//means wait for the result and then execute. This is helpful in error handling as well.
let battery; 
async function checkBatteryStatus() { 
  if (navigator.getBattery) {
    const battery = await navigator.getBattery();
    batteryCheck.innerText = Math.round(battery.level * 100) + '%';
    statusCheck.innerText = battery.charging ? 'charging' : 'not charging';
    
    listen('levelchange', battery, () => {
      batteryCheck.innerText = Math.round(battery.level * 100) + '%';
    });
    listen('chargingchange', battery, () => {
      statusCheck.innerText = battery.charging ? 'charging' : 'not charging';
    });

  } else {
    batteryCheck.innerText = 'not available';
    statusCheck.innerText = 'not available';
  }
}

function updateNetworkStatus() {
  if (navigator.onLine) {
      button.innerText = 'ONLINE';
      button.style.backgroundColor = '#28a745';
      button.classList.remove('offline');
  } else {
      button.innerText = 'OFFLINE';
      button.classList.add('offline');
      button.style.backgroundColor = '#dc3545';
      button.classList.add('offline');
  }
}

listen('online', window, updateNetworkStatus);
listen('offline', window, updateNetworkStatus);

listen('load', window, () => {
  browser.innerText = getBrowser();
  laptopName.innerText = getLaptopName();
  language.innerText = getLanguage();
  updateWindowSize();
  checkBatteryStatus();
  updateNetworkStatus();
});

listen('resize', window, () => {
  updateWindowSize();
});