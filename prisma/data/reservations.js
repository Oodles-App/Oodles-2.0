const randomRestaurantId = () => {
  return Math.floor(Math.random() * 10) + 1;
};

function randomDate() {
  const start = new Date(2021, 0, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const reservations = [
  {
    organizationId: 21,
    restaurantId: randomRestaurantId(),
    reserveTime: randomDate(),
    pickupTime: "May 26, 2022, 5:00PM",
    status: "ACTIVE",
    cart: {
      milk: { name: "milk", quantity: 2, measurement: "individual" },
      eggs: { name: "eggs", quantity: 24, measurement: "boxes" },
    },
  },
  {
    organizationId: 21,
    restaurantId: randomRestaurantId(),
    reserveTime: randomDate(),
    pickupTime: "May 24, 2022, 5:00PM",
    status: "PENDING",
    cart: {
      beans: { name: "beans", quantity: 5, measurement: "cans" },
      apples: { name: "apples", quantity: 10, measurement: "bags" },
    },
  },
  {
    organizationId: 21,
    restaurantId: randomRestaurantId(),
    reserveTime: randomDate(),
    pickupTime: "April 20, 2022, 3:00PM",
    status: "COMPLETED",
    cart: {
      beans: { name: "beans", quantity: 20, measurement: "cans" },
      chicken: { name: "chicken", quantity: 5, measurement: "lbs" },
    },
  },
];

module.exports = reservations;
