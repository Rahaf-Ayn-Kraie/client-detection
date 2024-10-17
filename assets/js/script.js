'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

const width = select('.width');
const height = select('.height');
const laptopName = select('.laptop-name');
const language = select('.language');
const browser = select('.browser');
const batteryLevel = select('.battery');
const batteryStatus = select('.status');
const orientation = select('.orientation');
const button = select('.btn');

function readWindow() {
  width.innerText = `${window.innerWidth}px`;
  height.innerText = `${window.innerHeight}px`;
}

function readWindow() {
  width.innerText = `${window.innerWidth}px`;
  height.innerText = `${window.innerHeight}px`;
}

function detectOS() {
  let os = "Unknown OS";
  const userAgent = window.navigator.userAgent;

  if (userAgent.indexOf("Win") !== -1) os = "Windows";
  else if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
  else if (userAgent.indexOf("X11") !== -1 || userAgent.indexOf("Linux") !== -1) os = "Linux";

  laptopName.innerText = os;
}

function detectLanguage() {
  language.innerText = navigator.language || navigator.userLanguage;
}

function detectBrowser() {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown Browser";

  if (userAgent.indexOf("Edg") !== -1) browserName = "Microsoft Edge";
  else if (userAgent.indexOf("Chrome") !== -1) browserName = "Chrome";
  else if (userAgent.indexOf("Safari") !== -1) browserName = "Safari";
  else if (userAgent.indexOf("Firefox") !== -1) browserName = "Firefox";
  else if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident") !== -1) browserName = "Internet Explorer";
  
  browser.innerText = browserName;
}

function detectBattery() {
  navigator.getBattery().then(function(battery) {
    batteryLevel.innerText = `${Math.round(battery.level * 100)}%`;
    batteryStatus.innerText = battery.charging ? "Charging" : "Not Charging";

    battery.addEventListener('levelchange', function() {
      batteryLevel.innerText = `${Math.round(battery.level * 100)}%`;
    });

    battery.addEventListener('chargingchange', function() {
      batteryStatus.innerText = battery.charging ? "Charging" : "Not Charging";
    });
  });
}

function detectNetwork() {
  function updateNetworkStatus() {
    if (navigator.onLine) {
      button.innerText = "ONLINE";
      button.classList.remove('offline');
    } else {
      button.innerText = "OFFLINE";
      button.classList.add('offline');
    }
  }

  listen('online', window, updateNetworkStatus);
  listen('offline', window, updateNetworkStatus);

  updateNetworkStatus();
}

function detectOrientation() {
  if (window.innerHeight > window.innerWidth) {
    orientation.innerText = 'Portrait';
  } else {
    orientation.innerText = 'Landscape';
  }
}

listen('load', window, () => {
  readWindow();
  detectOS();
  detectLanguage();
  detectBrowser();
  detectBattery();
  detectNetwork();
  detectOrientation();
});

listen('resize', window, () => {
  readWindow();
  detectOrientation();
});