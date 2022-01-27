# PageWithMood

A browser extension that adds emotion to web pages

<img width="415" alt="m-overview" src="https://user-images.githubusercontent.com/98135779/150696050-bc6644f2-3e68-4ca8-967e-83280ce8c7bc.png">

## Function
The browser extension changes the elements of the web page by analyzing the positive and negative words in each paragraph of the text of the web page, with features such as:

- Modify the background color of a web element according to the mood represented by its text content
- Replace the text in a web element with a quote of the same emotion according to the emotion represented by the content of the text
- Customizable list of HTML DOM elements to be monitored
- Customizable colors for different moods
- Quote data that can be updated automatically/manually (via third-party API)
- Automatic storage and restoration of user's settings (using local storage for the list of quotes, sync storage for program settings)

## Technical Details
- Modular programming
- Application of RegEx (Filtering web elements that do not need to be monitored)
- Fetch data from third-party APIs （list of quotes）
- Application of localStorage and syncStorage API (to store user settings and offline quotes data)

## User Manual (UI)

**Remember to click the 'update' button after each change to the settings**

### Toggle Button

<img width="223" alt="m-toggle" src="https://user-images.githubusercontent.com/98135779/150696324-4a670124-44c0-4938-8ce5-c18e5cdc7503.png">
<img width="222" alt="m-toggle-off" src="https://user-images.githubusercontent.com/98135779/150696573-e64e9191-38dd-4c1c-9587-f25b09a6a9b3.png">


Enable and disable extension through UI

---

### Target Elements

<img width="393" alt="m-keyword" src="https://user-images.githubusercontent.com/98135779/150696074-cbd40c61-7c33-45ba-a2c2-d7bb2f4b4c23.png">

Define the DOM elements to be monitored
- Input a list of DOM elements name, seprated by comma

---

### Color Panel

<img width="355" alt="m-colorList" src="https://user-images.githubusercontent.com/98135779/150696105-d4b6d660-d9f3-4306-919d-5798a8aa7a9a.png">

<img width="386" alt="m-colorDetail" src="https://user-images.githubusercontent.com/98135779/150696111-322b4d7e-19c1-41a5-8cc5-1c185cccdb49.png">

Define the color corresponding to each emotion
- Click on the color button representing the corresponding emotion according to the label, and change the color by manipulating the color panel

---

### Overide with quotes

<img width="218" alt="m-quoteButton" src="https://user-images.githubusercontent.com/98135779/150696120-392d4aac-d263-4907-a781-6fd0a9c90ca4.png">
<img width="311" alt="m-quoteStatus" src="https://user-images.githubusercontent.com/98135779/150696122-0f446976-cc68-4f2d-a063-d9c44b9dde1a.png">

Enable this feature to automatically replace each paragraph (not including paragraph with neutral/undetected emotion) of web text with a quote that corresponds to an emotion

---

### Fetch Quotes

<img width="119" alt="m-fetchButton" src="https://user-images.githubusercontent.com/98135779/150696131-01776735-18d9-4f76-b5cc-174ed25676cc.png">

Click this button to manually update the list of quotes, this feature sends two GET requests to the ZenQuotes API 

In addition, the browser extension itself will record the time of each update of the quotes list by the user. The list of quotes will be automatically updated after 24 hours.

## Example

Example webpage: https://nationalpost.com/category/news/politics/

In this example, the extension monitored the 'span' and 'p' elements of the page, and used RegEx to exlcude comments/dates elements during the filtering process.

### Color midification

<img width="916" alt="m-example-color" src="https://user-images.githubusercontent.com/98135779/150696396-e783c76c-03b5-486b-a8eb-c6332ffe03eb.png">

### Text Modification

<img width="935" alt="m-example-text" src="https://user-images.githubusercontent.com/98135779/150696415-59110e2f-bfe7-46be-b694-b2d09019cba1.png">





