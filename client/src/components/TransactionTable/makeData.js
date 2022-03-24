// import namor from 'namor'
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  names,
} = require("unique-names-generator");

const randomName = uniqueNamesGenerator({
  dictionaries: [adjectives, colors, animals],
}); // big_red_donkey

const shortName = uniqueNamesGenerator({
  dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
  separator: "",
  length: 2,
  style: "capital",
}); // BigDonkey

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  const maxValue = 869146267513168673;
  const minValue = 138395448847717863;
  const randomSentence1 = [
    "voted Yes on Member Proposal",
    "sponsored Trade Proposal",
  ];

  const randomSentence2 = [
    "Boilerray Requesting Sweat Share",
    "Tokenized Engagement",
    "Transfer",
    "Deposit Ether For",
    "Atomic Match_",
  ];

  const randomType = [
    "Receive",
    "Receive",
    "Receive",
    "Receive",
    "Receive",
    "Deposit",
    "N/A",
    "Exchange-out",
  ];

  return {
    // profileImg: CatProfile,
    TxnHash:
      (Math.random() * (maxValue - minValue) + minValue).toString(16) +
      (Math.random() * (maxValue - minValue) + minValue).toString(16),
    Type: randomType[parseInt(Math.random() * 7)],
    Result: "Success",
    Title:
      uniqueNamesGenerator({
        dictionaries: [names], // colors can be omitted here as not used
        length: 1,
        style: "capital",
      }) +
      " " +
      randomSentence1[parseInt(Math.random())] +
      " : " +
      randomSentence2[parseInt(Math.random() * 4)],
    Time: "5 days ago"
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
