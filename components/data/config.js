let default_config = {
  toggle: true,
  elements: ["span", "p"],
  color: {
    default: { id: "defaultColor", color: "#B3B3B3" },
    neutral: { id: "neutralColor", color: "#7365B8" },
    positive: { id: "positiveColor", color: "#86EAD6" },
    negative: { id: "negativeColor", color: "#F47B7B" },
  },
  quotesMode: false,
  //quotesDate: '01/22/2022'
  quotesDate: new Date().toString(),
};

export default default_config;
