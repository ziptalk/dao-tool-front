// import namor from 'namor'
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
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
  return {
    // profileImg: CatProfile,
    profile: uniqueNamesGenerator({
      dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
      separator: "",
      length: 2,
      style: "capital",
    }),
    walletAddress: "0x" + (Math.random() * (maxValue - minValue) + minValue).toString(16) + (Math.random() * (maxValue - minValue) + minValue).toString(16),
    joinedAt: "2022.01.20",
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
