const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const tagsGenerator = () => {
  const randomNumOfTags = () => {
    return Math.floor(Math.random() * 6) + 1;
  };
  const emptyArr = new Array(randomNumOfTags()).fill(null);

  const randomId = () => {
    return Math.floor(Math.random() * 9) + 1;
  };
  return emptyArr.map(() => {
    return { id: randomId() };
  });
};

const organizations = [
  {
    id: 21,
    email: "oodles@gmail.com",
    businessName: "Oodles",
    contactNum: "1118675309",
    address: "2202 Oodles Street, New York, NY",
    businessType: "organization",
    hash: bcrypt.hashSync("oodles2202", 10),
    lat: 40.7128,
    lng: -74.006,
    contactNum: "7188675309",
    biography:
      "Oodles is an application bringing restaurants and non-profit organizations together with the common goal of eliminating food waste. Restaurant owners can use our application to donate specified food products to non-profit organizations seeking food donations. While Non-profit organizations in search of donations can use our application to find and contact local restaurants offering food items.",
    imageUrl:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370",
    tags: {
      connect: [
        { id: 1 },
        { id: 2 },
        { id: 4 },
        { id: 6 },
        { id: 8 },
        { id: 5 },
      ],
    },
  },
  {
    businessName: "Action Against Hunger",
    businessType: "organization",
    email: "actionAgainstHunger@gmail.com",
    address: "39 Broadway, New York, NY 10038",
    lat: 40.9387,
    lng: -73.9612,
    hash: bcrypt.hashSync("actionAgainstHunger", 10),
    contactNum: faker.phone.phoneNumber("718-###-###"),
    biography:
      "Food Bank For New York City has been working to end food poverty in our five boroughs since 1983. As the city’s largest hunger-relief organization, we employ a multifaceted approach centered on helping low-income New Yorkers overcome their circumstances and achieve greater independence.",
    imageUrl:
      "https://www.foodbanknyc.org/wp-content/uploads/2022/03/mothers-day-distribution.jpg",
    tags: { connect: tagsGenerator() },
  },
  {
    businessName: "City Harvest",
    businessType: "organization",
    email: "cityharvest@gmail.com",
    address: "6 East 32nd Street, New York, NY 10016",
    lat: 40.746369,
    lng: -73.983052,
    hash: bcrypt.hashSync("cityHarvest", 10),
    contactNum: faker.phone.phoneNumber("718-###-###"),
    biography:
      "City Harvest is New York City’s largest food rescue organization, helping to feed the more than 1.5 million New Yorkers who are struggling to put meals on their tables. We will rescue 100 million pounds of food this year and deliver it, free of charge, to hundreds of food pantries, soup kitchens and other community partners across the five boroughs. Our programs help food-insecure New Yorkers access nutritious food that fits their needs and desires; increase our partners’ capacity; and strengthen the local food system, building a path to a food-secure future for all New Yorkers.",
    imageUrl:
      "https://www.cityharvest.org/wp-content/uploads/2016/05/210327_CityHarvest_0521.jpg",
    tags: { connect: tagsGenerator() },
  },
  {
    businessName: "Campaign Against Hunger",
    businessType: "organization",
    email: "campaign@gmail.com",
    address: "2010 Fulton, Brooklyn, NY 11233",
    lat: 43.192226,
    lng: -76.25178,
    hash: bcrypt.hashSync("campaignAgainstHunger", 10),
    contactNum: "7187733551",
    biography:
      "Over the past twenty-two years, The Campaign Against Hunger has grown and stretched from operating out of a small pantry in a church basement to meeting some of the day’s toughest challenges–like youth empowerment, nutrition education, and community engagement–head-on. We have experienced a few name changes (Grace International → Bed-Stuy Campaign Against Hunger → The Campaign Against Hunger), served neighbors in 150 zip codes with food and other vital programs and services, and sought to bring food justice to New York City along the way.",
    imageUrl: "https://www.tcahnyc.org/wp-content/uploads/2020/11/vol2.png",
    tags: { connect: tagsGenerator() },
  },
  {
    businessName: "Just Food",
    businessType: "organization",
    email: "justFood@gmail.com",
    address: "424 W 54th St, New York, NY 10019",
    lat: 40.9387,
    lng: -73.9612,
    hash: bcrypt.hashSync("justFood", 10),
    contactNum: faker.phone.phoneNumber("718-###-###"),
    biography:
      "At Just Food, we work passionately to shift the power, health, and wealth of historically marginalized communities that have been purposely divested from by developing community-driven solutions to inequities within the New York regional food system. We catalyze action and create change through our learner-centered trainings, annual conferences, and vibrant network of small- to mid-scale regional farmers. We have made racial, economic, and environmental equity our north star.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/58bf039ca5790aac4a8a0561/1551147961388-7L19TKN5BQ1I16EXR3YJ/MARKET2.jpg?format=300w",
    tags: { connect: tagsGenerator() },
  },
  {
    businessName: "Slow Food",
    businessType: "organization",
    email: "slowFood@gmail.com",
    address: "77 E 4th St, New York, NY 10003",
    lat: 40.726719,
    lng: -73.990128,
    hash: bcrypt.hashSync("slowFood", 10),
    contactNum: faker.phone.phoneNumber("718-###-###"),
    biography:
      "Slow Food NYC works to create a food system based on the principles of high quality and taste, environmental sustainability, and social justice—in essence, a food system that is good, clean, and fair. We seek to move our culture away from the destructive effects of an industrial food system and towards the cultural, social, health, and economic benefits of a sustainable food system, regional food traditions, and the pleasures of the table.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/5797778115d5dbda8adb842b/1521084015158-EES6QJBMIJKHQGITCQPA/_H6A6149.jpg?format=500w",
    tags: { connect: tagsGenerator() },
  },
  {
    businessName: "Hunger Free NYC",
    businessType: "organization",
    email: "hungerFreeNYC@gmail.com",
    address: "938 Sheridan Ave, Bronx, NY, 10451",
    lat: 40.82795,
    lng: -73.92013,
    hash: bcrypt.hashSync("hungerFreeNYC", 10),
    contactNum: faker.phone.phoneNumber("718-###-###"),
    biography:
      "Hunger Free NYC serves low-income New Yorkers. We are the New York City affiliate of Hunger Free America.",
    imageUrl:
      "https://images.prismic.io/hfa-website/18aa9ad0-ba53-4a04-9c78-cf34a3d4e25c_caridad+y+filomena+outreach+%281%29_cropped+4.jpg?auto=compress,format",
    tags: { connect: tagsGenerator() },
  },
  {
    businessName: "Holy Apostles Soup Kitchen",
    businessType: "organization",
    email: "holyApostles@gmail.com",
    address: "296 9th Ave, New York, NY 10001",
    lat: 40.758228,
    lng: -73.992752,
    hash: bcrypt.hashSync("holyApostles", 10),
    contactNum: faker.phone.phoneNumber("718-###-###"),
    biography:
      "Nourishing hungry New Yorkers since 1982 in an atmosphere of respect and hospitality.",
    imageUrl:
      "https://images.unsplash.com/photo-1628428799437-d886d7d2e9b2?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171",
    tags: { connect: tagsGenerator() },
  },
  {
    businessName: "New York Common Pantry",
    businessType: "organization",
    email: "commonPantry@gmail.com",
    address: "8 East 109th Street, New York, NY 10029",
    lat: 40.7958,
    lng: -73.94921,
    hash: bcrypt.hashSync("commonPantry", 10),
    contactNum: faker.phone.phoneNumber("718-###-###"),
    biography:
      "New York Common Pantry reduces hunger and promotes dignity, health and self-sufficiency.",
    imageUrl:
      "https://nycommonpantry.org/wp-content/uploads/2021/12/DSC_1242-Edit-Edit-Edit_R01-scaled.jpeg",
    tags: { connect: tagsGenerator() },
  },
  {
    businessName: "West Side",
    businessType: "organization",
    email: "westside@gmail.com",
    address: "263 West 86th Street, New York, NY 10024",
    lat: 40.7889381,
    lng: -73.977291,
    hash: bcrypt.hashSync("westside", 10),
    contactNum: faker.phone.phoneNumber("718-###-###"),
    biography:
      "West Side Campaign Against Hunger is on a mission to alleviate hunger by ensuring that all New Yorkers have access with dignity to a choice of healthy food and supportive services.",
    imageUrl:
      "https://www.wscah.org/wp-content/uploads/2021/10/0J3A7035-resized-683x1024.jpg",
    tags: { connect: tagsGenerator() },
  },
  {
    businessName: "The Bowery Mission",
    businessType: "organization",
    email: "bowery@gmail.com",
    address: "355 Lexington Ave, Floor 19, New York, NY 10017",
    lat: 40.741895,
    lng: -73.989308,
    hash: bcrypt.hashSync("bowery", 10),
    contactNum: faker.phone.phoneNumber("718-###-###"),
    biography:
      "The Bowery Mission serves homeless and hungry New Yorkers and provides services that meet their immediate needs and transforms their lives from poverty and hopelessness to hope.",
    imageUrl:
      "https://s7d2.scene7.com/is/image/TWCNews/bowery_mission_pkg4211803012000501072_11242021",
    tags: { connect: tagsGenerator() },
  },
];

module.exports = organizations;
