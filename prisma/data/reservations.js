const products = require("./products");

const randomNum = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

const randomId = (type) => {
  const add = type === "restaurant" ? 0 : 10;
  return randomNum(10) + add;
};

function randomDate() {
  const start = new Date(2021, 0, 1);
  const end = new Date();
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date;
}

const randomTime = () => {
  const times = ["5:00", "7:00", "9:00", "11:00", "10:00", "1:00"];
  return times[Math.floor(Math.random() * 6)];
};

console.log(randomTime());
function pickUpDate(resDate) {
  const strDate = resDate.toString();
  const dateNoTime = strDate.slice(0, 11);
  const prevDay = Number(dateNoTime.slice(4, 6));
  let newDay = prevDay + randomNum(3);
  if (newDay > 28) {
    newDay = "01";
  }
  const newFullDate = `${dateNoTime.slice(0, 3)} ${newDay} ${randomTime()}`;

  return newFullDate;
}

const randomProduct = () => {
  return products[Math.floor(Math.random() * products.length)];
};

const randomCart = () => {
  let cart = {};
  for (let i = 0; i < randomNum(2); i++) {
    const product = randomProduct();
    cart[product.name] = product;
  }
  return cart;
};

const reservationCreator = () => {
  const reservation = {
    organizationId: randomId("organization"),
    restaurantId: randomId("restaurant"),
    reserveTime: randomDate(),
    cart: randomCart(),
    status: "COMPLETED",
  };

  reservation["pickupTime"] = pickUpDate(reservation.reserveTime);

  return reservation;
};

const reservations = [
  {
    organizationId: 100,
    restaurantId: randomId("restaurant"),
    reserveTime: randomDate(),
    pickupTime: "May 26, 2022, 5:00PM",
    status: "ACTIVE",
    cart: {
      milk: {
        product: { name: "milk", measurement: "individual" },
        quantity: 2,
      },
      eggs: {
        product: { name: "eggs", measurement: "boxes" },
        quantity: 24,
      },
    },
  },
  {
    organizationId: 100,
    restaurantId: randomId("restaurant"),
    reserveTime: randomDate(),
    pickupTime: "May 24, 2022, 5:00PM",
    status: "PENDING",
    cart: {
      beans: {
        product: { name: "beans", measurement: "cans" },
        quantity: 5,
      },
      apples: {
        product: { name: "apples", measurement: "bags" },
        quantity: 10,
      },
    },
  },
  {
    organizationId: 100,
    restaurantId: randomId("restaurant"),
    reserveTime: randomDate(),
    pickupTime: "April 20, 2022, 3:00PM",
    status: "COMPLETED",
    cart: {
      beans: {
        product: { name: "beans", measurement: "cans" },
        quantity: 20,
      },
      chicken: {
        product: { measurement: "lbs", name: "chicken" },
        quantity: 5,
      },
    },
  },
];

for (let i = 0; i < 100; i++) {
  reservations.push(reservationCreator());
}

module.exports = reservations;
