import positive_words from "../data/positive.js";
import negative_words from "../data/negative.js";
import default_config from "../data/config.js";
import { update_quotes, fetch_quotes } from "../api.js";

let word_base = {
  positive_words: positive_words,
  negative_words: negative_words,
};

// chrome.storage.sync.set(
//   {
//     mood_config: default_config,
//   },
//   function () {}
// );

let check_config = () => {
  console.log("Word_base", word_base);
  chrome.storage.sync.get(["mood_config"], function (config) {
    if (config["mood_config"] == undefined) {
      chrome.storage.sync.set(
        {
          mood_config: default_config,
        },
        function () {
          update_quotes();
        }
      );
      console.log(`Missing config: Update to default config`);
    } else {
      let c = config["mood_config"];
      console.log(`Loaded config: `, c);
      if (new Date() - Date.parse(c.quotesDate) >= 86400000) {
        console.log("Updating quotes data");
        update_quotes();
      } else {
        console.log("Quotes is up to date");
      }
    }
  });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log(request);
  if (request.action == "get_data") {
    sendResponse({ word_base: word_base });
  } else if (request.action == "get_default_config") {
    sendResponse({ config: default_config });
  }
});

check_config();
