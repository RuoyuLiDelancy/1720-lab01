import { update_quotes } from "../api.js";

let inputMapping = {
  defaultColor: "default",
  neutralColor: "neutral",
  positiveColor: "positive",
  negativeColor: "negative",
};
let toggleColorMapping = {
  0: "#ee5934",
  1: "#34eea7",
};
let toggle = false;

window.addEventListener("load", (event) => {
  load_config();
  document.getElementById("update").addEventListener("click", update_config);
  document.getElementById("reset").addEventListener("click", reset_config);
  document.getElementById("toggle").addEventListener("click", toggle_extension);
  document.querySelector("#fetch").addEventListener("click", request_quotes);
});

let update_config = () => {
  let color = {};
  for (let i in inputMapping) {
    let color_code = document.querySelector(`#${i}`).value;
    color[inputMapping[i]] = {
      id: i,
      color: color_code,
    };
  }

  let config = {
    toggle: toggle,
    elements: document.querySelector("#elementsList").value.split(","),
    color: color,
    quotesMode: document.querySelector("#quotesMode").checked,
    quotesDate: new Date().toString(),
  };
  dispatchConfigUpdate(config);

  chrome.storage.sync.set(
    {
      mood_config: config,
    },
    function () {
      notify(true, "Updated config");
    }
  );
};

let reset_config = () => {
  chrome.runtime.sendMessage(
    { action: "get_default_config" },
    function (response) {
      let config = response.config;
      chrome.storage.sync.set(
        {
          mood_config: config,
        },
        function () {
          notify(true, "Reset config");
          update_ui(config);
        }
      );
    }
  );
};

let load_config = () => {
  notify(true, "Loading config");
  chrome.storage.sync.get(["mood_config"], function (config) {
    if (config["mood_config"] != undefined) {
      let c = config["mood_config"];
      toggle = c.toggle;
      update_ui(c);
      notify(true, "Loaded config");
    } else {
      notify(true, "Error retriving config");
      return;
    }
  });
};

let toggle_extension = () => {
  toggle = !toggle;
  document.querySelector("#toggle").style.background = toggle
    ? toggleColorMapping[1]
    : toggleColorMapping[0];
  return update_config();
};

let update_ui = (config) => {
  let elements = config.elements.join(",");
  document.querySelector("#elementsList").value = elements;
  document.querySelector("#quotesMode").checked = config.quotesMode;
  for (let k in config.color) {
    let color = config.color[k];
    document.querySelector(`#${color.id}`).value = color.color;
  }
  document.querySelector("#toggle").style.background = toggle
    ? toggleColorMapping[1]
    : toggleColorMapping[0];

  document.querySelector(
    "#quotesDate"
  ).innerText = `Quotes was updated on ${parseDate(config.quotesDate)}`;
};

let dispatchConfigUpdate = (config) => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { mood_config: config });
  });
};

let notify = (show, content) => {
  let notification_div = document.querySelector(".notification");
  if (show == false) {
    notification_div.style.display = "none";
    return;
  }
  notification_div.style.display = "block";
  document.querySelector("#notification_content").innerText = content;
  setTimeout(() => {
    notification_div.style.display = "none";
  }, 2000);
};

let parseDate = (str) => {
  let date = new Date(Date.parse(str));
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

let sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let request_quotes = async () => {
  document.querySelector("#fetch").disabled = true;
  document.querySelector("#fetch").innerText = "Updating";
  let updated_time = await update_quotes();
  await sleep(1000);
  document.querySelector(
    "#quotesDate"
  ).innerText = `Quotes was updated on ${parseDate(updated_time)}`;
  document.querySelector("#fetch").disabled = false;
  document.querySelector("#fetch").innerText = "Fetch Quotes";
};
