"use strict";

/* global chrome, window, document */

const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");
const checkboxadd = document.getElementById("checkboxadd")

textarea.placeholder = [
  "facebook.com",
  "instagram.com",
  "youtube.com",
  "twitter.com",
  "tiktok.com",
  "reddit.com"
].join("\n");

save.addEventListener("click", () => {
  const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);

  chrome.storage.local.set({ blocked });
});

// this is to add the checkboxed ones to the list of blocked.
checkboxadd.addEventListener("change", (event) => {
  const blockedd = checkboxadd.valuee.map(s => s.trim()).filter(Boolean);
    
  chrome.storage.local.set({ blockedd });
});
  
checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;

  chrome.storage.local.set({ enabled });
});


window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["blocked", "enabled", "blockedd"], function (local) {
    const { blocked, enabled, blockedd } = local;
    if (!Array.isArray(blocked)) {
      return;
    }

    if (!Array.isArray(blockedd)) {
      return;
    }

    // blocked
    var value = blocked.join("\r\n"); // display every blocked in new line
    textarea.value = value;

    // blockedd
    var valuee = blockedd; // display every blocked in new line
    checkboxadd.valuee = valuee;

    // enabled
    checkbox.checked = enabled;

    // show controls
    document.body.classList.add("ready");
  });
});

