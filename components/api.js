let update_quotes = async () => {
  return new Promise(async (resolve, reject) => {
    let positive = await fetch_quotes("happiness");
    let negative = await fetch_quotes("sad");
    let quotes = { positive: positive, negative: negative };
    console.log(quotes);
    chrome.storage.local.set(
      {
        mood_quotes: quotes,
      },
      function () {}
    );
    chrome.storage.sync.get(["mood_config"], function (config) {
      if (config["mood_config"] != undefined) {
        let c = config["mood_config"];
        c.quotesDate = new Date().toString();
        chrome.storage.sync.set(
          {
            mood_config: c,
          },
          function () {
            resolve(new Date().toString());
          }
        );
        console.log(`Updated config to ${c}`);
      }
    });
  });
};

let fetch_quotes = async (keyword) => {
  console.log(`Fetching quotes for keyword ${keyword}`);
  let res = await fetch(`https://zenquotes.io/api/quotes/keyword=${keyword}`);
  if (res.status == 200) {
    let data = res.json();
    return data;
  }
  return;
};

export { update_quotes, fetch_quotes };
