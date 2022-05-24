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
    organizationId: 21,
    restaurantId: randomRestaurantId(),
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
    organizationId: 21,
    restaurantId: randomRestaurantId(),
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

module.exports = reservations;
