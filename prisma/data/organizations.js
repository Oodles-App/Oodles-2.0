const { faker } = require("@faker-js/faker");

const fetchRealOrgs = async () => {
  const res = await fetch(`/api/organizations`);
  const result = await res.json();
  console.log(result, "result");
};
fetchRealOrgs();
console.log(faker.name.findName());
const names = ["International", "Relief", "Fund", "Project", "", "", ""];

const arr50 = new Array(3).fill(null);
const organizations = arr50.map((el) => {
  return {
    name: faker.name.lastName(),
    email: faker.internet.email(),
  };
});

console.log(organizations[0]);
console.log(organizations[1]);
console.log(organizations[2]);

// const organizations = [{
//     email:
// }];
// {
//     id: 1,
//     name: "Mission Chinese Food",
//     username: "MCF",
//     email: "missionChineseFood@gmail.com ",
//     neighborhood: "Manhattan",
//     photograph: "1.jpg",
//     address: "171 E Broadway, New York, NY 10002",
//     latlng: {
//       lat: 40.713829,
//       lng: -73.989667,
//     },
//     cuisine_type: "Asian",
//     operating_hours: {
//       Monday: "5:30 pm - 11:00 pm",
//       Tuesday: "5:30 pm - 12:00 am",
//       Wednesday: "5:30 pm - 12:00 am",
//       Thursday: "5:30 pm - 12:00 am",
//       Friday: "5:30 pm - 12:00 am",
//       Saturday: "12:00 pm - 4:00 pm, 5:30 pm - 12:00 am",
//       Sunday: "12:00 pm - 4:00 pm, 5:30 pm - 11:00 pm",
//     },
