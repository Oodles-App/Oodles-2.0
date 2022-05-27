const cannedProductNames = [
  "Beans",
  "Corn",
  "Chickpeas",
  "Pineapple",
  "Chicken Broth",
  "Peas",
];
const individualProductNames = [
  "Chicken Sandwiches",
  "Pizzas",
  "Steaks",
  "Breakfast Sandwiches",
];
const produceNames = [
  "Apples",
  "Strawberries",
  "Peaches",
  "Cherries",
  "Bananas",
  "Tomatoes",
  "Cucumbers",
  "Onions",
  "Garlic",
  "Peppers",
  "Carrots",
  "Beets",
  "Green Beans",
];

const dairyNames = ["Eggs", "Milk", "Cheese"];

const pantryNames = [
  "Baguettes",
  "Bread Loaves",
  "Rice",
  "Sugar",
  "Flour",
  "Quinoa",
  "Crackers",
];

const meatNames = ["Steak", "Chicken Breast", "Chicken Wings", "Ham", "Turkey"];

const randomAmount = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

const randomRestaurantId = () => {
  return Math.floor(Math.random() * 10) + 1;
};

const productCreator = () => {
  const products = [];
  products.push(
    ...cannedProductNames.map((product) => {
      return {
        name: product,
        amount: randomAmount(20),
        measurement: "cans",
        tags: { connect: [{ value: "ingredient" }] },
      };
    })
  );
  products.push(
    ...individualProductNames.map((product) => {
      return {
        name: product,
        amount: randomAmount(20),
        measurement: "individual",
        tags: { connect: [{ value: "meal" }] },
      };
    })
  );
  products.push(
    ...produceNames.map((product) => {
      return {
        name: product,
        amount: randomAmount(10),
        measurement: "boxes",
        tags: { connect: [{ value: "produce" }, { value: "ingredient" }] },
      };
    })
  );
  products.push(
    ...dairyNames.map((product) => {
      return {
        name: product,
        amount: randomAmount(5),
        measurement: "bags",
        tags: { connect: [{ value: "dairy" }, { value: "ingredient" }] },
      };
    })
  );
  products.push(
    ...pantryNames.map((product) => {
      return {
        name: product,
        amount: randomAmount(10),
        measurement: "boxes",
        tags: { connect: [{ value: "pantry" }, { value: "ingredient" }] },
      };
    })
  );
  products.push(
    ...meatNames.map((product) => {
      return {
        name: product,
        amount: randomAmount(7),
        measurement: "lbs",
        tags: { connect: [{ value: "ingredient" }, { value: "meat" }] },
      };
    })
  );

  const completeProducts = products.map((product) => {
    return { ...product, userId: randomRestaurantId() };
  });

  return completeProducts;
};

const products = productCreator();

module.exports = products;
