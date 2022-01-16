"use strict";

/* global chrome, URL */

function save_options() {
  var checkboxadded = document.getElementById('checkboxadd').checked;

  chrome.storage.sync.set({
    blockthese: checkboxadded

  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('controls');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.get(["blocked", "enabled", "blockedd"], function (local) {
    if (!Array.isArray(local.blocked)) {
      chrome.storage.local.set({ blocked: [] });
    }

    if (typeof local.enabled !== "boolean") {
      chrome.storage.local.set({ enabled: true });
    }

    if (!Array.isArray(local.blockedd)) {
      chrome.storage.local.set({ blockedd: [] });
    }
  });
});

if (!window.localStorage.getItem('hasSeenIntro')) {
  window.localStorage.setItem('hasSeenIntro', 'yep');
  chrome.tabs.create({
    url: "main.html"
  });
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  const url = changeInfo.pendingUrl || changeInfo.url;
  if (!url || !url.startsWith("http")) {
    return;
  }

  const hostname = new URL(url).hostname;

  chrome.storage.local.get(["blocked", "enabled", "blockedd"], function (local) {
    const { blocked, enabled } = local;
    if (Array.isArray(blocked) && enabled && blocked.find(domain => hostname.includes(domain))) {
      chrome.tabs.remove(tabId);
    }
    if (Array.isArray(blockedd) && enabled && blockedd.find(domain => hostname.includes(domain))) {
      chrome.tabs.remove(tabId);
    }
  });
});
