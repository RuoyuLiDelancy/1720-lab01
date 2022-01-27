let word_base = {};
let quotes = {};
let config = {};

let init = () => {
  chrome.runtime.sendMessage({ action: "get_data" }, function (response) {
    console.log(response);
    word_base = response.word_base;
    quotes = response.quotes;
    chrome.storage.local.get(["mood_quotes"], function (data) {
      if (data["mood_quotes"] != undefined) {
        quotes = data["mood_quotes"];
        console.log(quotes);
      }
    });
    chrome.storage.sync.get(["mood_config"], function (data) {
      if (data["mood_config"] != undefined) {
        parse(data["mood_config"]);
      }
    });
  });
};

let parse = (new_config) => {
  config = new_config;
  if (!config.toggle) {
    return;
  }
  console.log(word_base);
  console.log(quotes);
  console.log(config);
  elements = [].concat(
    ...config.elements.map((e) => {
      return Array.from(document.querySelectorAll(e));
    })
  );
  elements.forEach((span) => {
    mood_type = analyze(span);
    render(span, mood_type);
  });
};

let analyze = (span) => {
  let text = span.innerText;
  if (text == "" || is_date_element(text) || is_commnets_element(text)) {
    return;
  }
  let positive_count = 0;
  let negative_count = 0;
  text.split(" ").forEach((word) => {
    if (word_base.negative_words.includes(word)) {
      negative_count += 1;
    } else if (word_base.positive_words.includes(word)) {
      positive_count += 1;
    }
  });

  console.log({
    positive_count: positive_count,
    negative_count: negative_count,
    content: text,
  });

  if (positive_count == negative_count) {
    return positive_count > 0 ? "neutral" : "default";
  } else {
    return positive_count > negative_count ? "positive" : "negative";
  }
};

let render = (ele, mood_type) => {
  if (mood_type == undefined) {
    return;
  }
  ele.style.backgroundColor = config.color[mood_type].color;
  if (
    config.quotesMode == true &&
    ["negative", "positive"].includes(mood_type)
  ) {
    ele.innerText =
      quotes[mood_type][Math.floor(Math.random() * quotes[mood_type].length)].q;
    // ele.insertAdjacentHTML(
    //   "beforeend",
    //   quotes[Math.floor(Math.random() * quotes.length)].h
    // );
  }
};

let onNewConfig = (msg, sender, response) => {
  c = msg["mood_config"];
  if (c.quotesMode != config.quotesMode) {
    location.reload();
    return;
  }
  parse(c);
};

let is_date_element = (text) => {
  var re = new RegExp("([0-9]+).+day[s]?.+ago");
  return re.test(text);
};

let is_commnets_element = (text) => {
  var re = new RegExp("([0-9]+).+Comment(s)?");
  return re.test(text);
};

chrome.runtime.onMessage.addListener(onNewConfig);

window.addEventListener("load", (event) => {
  init();
});
