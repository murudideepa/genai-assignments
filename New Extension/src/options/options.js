"use strict";

const settingsForm = document.querySelector("#settings-form");
const apiUrlField = document.querySelector("#api-url");
const modelField = document.querySelector("#model");
const status = document.querySelector("#status");
const DEFAULT_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-120b";

function getSettings() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(["apiUrl", "model"], (settings) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }

      resolve(settings);
    });
  });
}

function saveSettings(settings) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(settings, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }

      resolve();
    });
  });
}

getSettings()
  .then((settings) => {
    apiUrlField.value = settings.apiUrl || DEFAULT_API_URL;
    modelField.value = settings.model || DEFAULT_MODEL;
  })
  .catch((error) => {
    status.textContent = `Could not load settings: ${error.message}`;
  });

settingsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!settingsForm.reportValidity()) {
    return;
  }

  let endpoint;
  try {
    endpoint = new URL(apiUrlField.value.trim());
  } catch {
    status.textContent = "Enter a valid full URL for the chat-completions endpoint.";
    return;
  }

  if (!["https:", "http:"].includes(endpoint.protocol)) {
    status.textContent = "The endpoint must use HTTPS, except for localhost development servers.";
    return;
  }
  if (endpoint.protocol === "http:" && !["localhost", "127.0.0.1"].includes(endpoint.hostname)) {
    status.textContent = "HTTP is allowed only for localhost. Use an HTTPS endpoint.";
    return;
  }

  try {
    await saveSettings({
      apiUrl: endpoint.href,
      model: modelField.value.trim(),
    });
    status.textContent = "Provider settings saved.";
  } catch (error) {
    status.textContent = `Could not save settings: ${error.message}`;
  }
});
