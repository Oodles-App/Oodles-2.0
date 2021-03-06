const { PrismaClient, BusinessType } = require("@prisma/client");
let prisma = new PrismaClient();

const bcrypt = require("bcryptjs");
const tags = require("./data/tags");
const organizations = require("./data/organizations");
const reservations = require("./data/reservations");
const products = require("./data/products");

async function createOrgs() {
  await Promise.all(
    organizations.map((organization) =>
      prisma.user.create({ data: organization })
    )
  );
}

async function createTags() {
  await Promise.all(tags.map((tag) => prisma.tag.create({ data: tag })));
}

async function createReservations() {
  await Promise.all(
    reservations.map((reservation) =>
      prisma.reservation.create({ data: reservation })
    )
  );
}

async function createProducts() {
  await Promise.all(
    products.map((product) => prisma.product.create({ data: product }))
  );
}

async function createArticles() {
  await prisma.Article.create({
    data: {
      title: "The Problem of Food Waste",
      author: "FoodPrint",
      url: "https://foodprint.org/issues/the-problem-of-food-waste/",
    },
  });
  await prisma.Article.create({
    data: {
      title: "Food Waste in America: Facts and Statistics",
      author: "Rubicon",
      url: "https://foodprihttps://www.rubicon.com/blog/food-waste-facts/nt.org/issues/the-problem-of-food-waste/",
    },
  });
  await prisma.Article.create({
    data: {
      title: "Food Loss and Waste",
      author: "FDA",
      url: "https://www.fda.gov/food/consumers/food-loss-and-waste",
    },
  });
  await prisma.Article.create({
    data: {
      title:
        "Food waste in the United States: A contributing factor toward environmental instability ",
      author: "Michael E. Hickey and Gulnihal Ozabay",
      url: "https://www.frontiersin.org/articles/10.3389/fenvs.2014.00051/full",
    },
  });
  await prisma.Article.create({
    data: {
      title: "Reducing Food Waste in Your Kitchen During a Pandemic",
      author: "Jeremy Hobson and Allison Hagan",
      url: "https://www.unep.org/thinkeatsave/news/story/reducing-food-waste-your-kitchen-during-pandemic",
    },
  });
  await prisma.Article.create({
    data: {
      title:
        "All-Purpose Cleaner is Made Entirely of Food Waste Collected in NYC",
      author: "Andy Corbley",
      url: "https://www.unep.org/thinkeatsave/news/story/all-purpose-cleaner-made-entirely-food-waste-collected-nyc-and-ditches-plastic-spray",
    },
  });
  await prisma.Article.create({
    data: {
      title: "Preventing Food Waste",
      author: "Jane Black",
      url: "https://www.worldwildlife.org/magazine/issues/fall-2018/articles/preventing-food-waste",
    },
  });
  await prisma.Article.create({
    data: {
      title: "Preventing Wasted Food at Home",
      author: "EPA",
      url: "https://www.epa.gov/recycle/preventing-wasted-food-home",
    },
  });
  await prisma.Article.create({
    data: {
      title: "Examining Plastic and Food Waste: A Package Deal",
      author: "Minnie Ringland",
      url: "https://refed.org/articles/plastic-and-food-waste-a-package-deal/",
    },
  });
  await prisma.Article.create({
    data: {
      title:
        "GUEST BLOG: How to EatOrToss is Empowering Consumers to Waste Less By Understanding their Food Better ",
      author: "Rachael Jackson",
      url: "https://refed.org/articles/guest-blog-how-eatortoss-is-empowering-consumers-to-waste-less-by-understanding-their-food-better/",
    },
  });
}

const restaurants = [
  {
    id: 1,
    name: "Mission Chinese Food",
    username: "MCF",
    email: "missionChineseFood@gmail.com ",
    neighborhood: "Manhattan",
    photograph: "1.jpg",
    address: "171 E Broadway, New York, NY 10002",
    contactNum: "347-448-6040",
    latlng: {
      lat: 40.713829,
      lng: -73.989667,
    },
    cuisine_type: "Asian",
    biography:
      "Mission Chinese is a New York based restaurant that creates Sichuan-style dishes that surpass the traditional. Inspired by the nuances of all cuisines, Mission merges unique flavors for food that are delightful and unexpected.",
    operating_hours: {
      Monday: "5:30 pm - 11:00 pm",
      Tuesday: "5:30 pm - 12:00 am",
      Wednesday: "5:30 pm - 12:00 am",
      Thursday: "5:30 pm - 12:00 am",
      Friday: "5:30 pm - 12:00 am",
      Saturday: "12:00 pm - 4:00 pm, 5:30 pm - 12:00 am",
      Sunday: "12:00 pm - 4:00 pm, 5:30 pm - 11:00 pm",
    },
    reviews: [
      {
        name: "Steve",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "Mission Chinese Food has grown up from its scrappy Orchard Street days into a big, two story restaurant equipped with a pizza oven, a prime rib cart, and a much broader menu. Yes, it still has all the hits ??? the kung pao pastrami, the thrice cooked bacon ???but chef/proprietor Danny Bowien and executive chef Angela Dimayuga have also added a raw bar, two generous family-style set menus, and showstoppers like duck baked in clay. And you can still get a lot of food without breaking the bank.",
      },
      {
        name: "Morgan",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "This place is a blast. Must orders: GREEN TEA NOODS, sounds gross (to me at least) but these were incredible!, Kung pao pastrami (but you already knew that), beef tartare was a fun appetizer that we decided to try, the spicy ma po tofu SUPER spicy but delicous, egg rolls and scallion pancake i could have passed on... I wish we would have gone with a larger group, so much more I would have liked to try!",
      },
      {
        name: "Jason",
        date: "October 26, 2016",
        rating: 3,
        comments:
          "I was VERY excited to come here after seeing and hearing so many good things about this place. Having read much, I knew going into it that it was not going to be authentic Chinese. The place was edgy, had a punk rock throwback attitude, and generally delivered the desired atmosphere. Things went downhill from there though. The food was okay at best and the best qualities were easily overshadowed by what I believe to be poor decisions by the kitchen staff.",
      },
    ],
  },
  {
    id: 2,
    name: "Emily",
    username: "EM",
    email: "emily@gmail.com",
    neighborhood: "Brooklyn",
    photograph: "2.jpg",
    address: "919 Fulton St, Brooklyn, NY 11238",
    contactNum: "212-394-1735",
    latlng: {
      lat: 40.683555,
      lng: -73.966393,
    },
    cuisine_type: "Pizza",
    biography:
      "Both wood burning ovens at our locations center as the hearths where you will find Matt and our team cooking pizzas from dough made with care and mozzarella made by hand. Matt???s outlook on cooking for others is that when you put genuine love into the preparation of a meal, those who eat it can taste the sentiment behind it. I am thrilled to be the namesake of my husband???s restaurant and am proud to offer to you pizza and other delicious fare from our hearts made and served with love.",
    operating_hours: {
      Monday: "5:30 pm - 11:00 pm",
      Tuesday: "5:30 pm - 11:00 pm",
      Wednesday: "5:30 pm - 11:00 pm",
      Thursday: "5:30 pm - 11:00 pm",
      Friday: "5:30 pm - 11:00 pm",
      Saturday: "5:00 pm - 11:30 pm",
      Sunday: "12:00 pm - 3:00 pm, 5:00 pm - 11:00 pm",
    },
    reviews: [
      {
        name: "Steph",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "Five star food, two star atmosphere. I would definitely get takeout from this place - but dont think I have the energy to deal with the hipster ridiculousness again. By the time we left the wait was two hours long.",
      },
      {
        name: "Steve",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "This cozy Clinton Hill restaurant excels at both straightforward and unusual wood-fired pizzas. If you want a taste of the latter, consider ordering the Emily, which is topped with mozzarella, pistachios, truffled sottocenere cheese, and honey. The menu includes salads and a handful of starters, as well as a burger that some meat connoisseurs consider to be among the best in the city.",
      },
      {
        name: "Sam",
        date: "October 26, 2016",
        rating: 5,
        comments:
          "5 star atmosphere as it is very cozy with great staff. 5 star food as their Emmy burger is outrageously good. and its on a pretzel bun.. Too juicy for its own good and downright addicting. Also try the Colony pizza. Many others looked like worth competitors, but the Colony really found its way to my heart. when you start with a great crust, top it with top notch cheese and sauce, you've got a winner. But, if you go a step further and add the salty from the pepperoni, the sweet from the honey, and the spicy from the chili oil.... your mouth is confused and happy at the same time.",
      },
    ],
  },
  {
    id: 3,
    name: "Kang Ho Dong Baekjeong",
    neighborhood: "Manhattan",
    username: "KHDB",
    email: "KHDB@gmail.com",
    photograph: "3.jpg",
    address: "1 E 32nd St, New York, NY 10016",
    contactNum: "718-293-5850",
    latlng: {
      lat: 40.747143,
      lng: -73.985414,
    },
    cuisine_type: "Asian",
    biography:
      "Baekjeong, the Korean word for 'butcher', reflects our commitment to serve only the highest quality meats and offer a truly outstanding Korean cultural dining experience, showcasing the rich authentic flavors and the unique qualities of Korean barbecue. Owned and operated by Kijung Hospitality Group, we opened the first US Baekjeong in Los Angeles in October 2012 and quickly expanded to 7 restaurants in California and New York, making us the #1 choice for Korean barbecue in North America. From our innovative grill to our nationwide expansion, Baekjeong is widely recognized by leading food critics as the gold standard and industry leader in Korean barbecue.",
    operating_hours: {
      Monday: "11:30 am - 2:00 am",
      Tuesday: "11:30 am - 2:00 am",
      Wednesday: "11:30 am - 2:00 am",
      Thursday: "11:30 am - 2:00 am",
      Friday: "11:30 am - 6:00 am",
      Saturday: "11:30 am - 6:00 am",
      Sunday: "11:30 am - 2:00 am",
    },
    reviews: [
      {
        name: "Steve",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "The tables at this 32nd Street favorite are outfitted with grills for cooking short ribs, brisket, beef tongue, rib eye, and pork jowl. The banchan plates are uniformly good, and Deuki Hong???s menu also includes winning dishes like stir-fried squid noodles, kimchi stew, and seafood pancakes. If it???s available, make sure to order the kimchi and rice ???lunchbox.??? Baekjeong is a great place for large groups and birthday parties.",
      },
      {
        name: "ZS",
        date: "October 26, 2016",
        rating: 5,
        comments:
          "I've been to Korea before and many other Korean BBQ places. We had the regular pork belly and a beef (forgot which cut) and a seafood tofu soup. Two meat and a soup was just prefect for the two of us. We could have done one meat and one soup. The portions of the meat are great! The beef was juicy, tender and so good. The sides were excellent. ",
      },
      {
        name: "Emily",
        date: "October 26, 2016",
        rating: 2,
        comments:
          "MEH. I've tried their Jersey location as well but Kang Ho Dong meat quality is severely decreasing. A Korean bbq place with whatever meat? I think NOT!",
      },
    ],
  },
  {
    id: 4,
    name: "Katz's Delicatessen",
    neighborhood: "Manhattan",
    username: "Katz",
    email: "katz@gmail.com",
    photograph: "4.jpg",
    address: "205 E Houston St, New York, NY 10002",
    contactNum: "212-701-3921",
    latlng: {
      lat: 40.722216,
      lng: -73.987501,
    },
    cuisine_type: "American",
    biography:
      "Each week thousands of visitors from around the world flock to Katz's to dine in this legendary deli, and to feast on the most delectable sandwiches, platters and meats. But it's really New Yorkers have made Katz's Delicatessen what it is, making Katz's an inherent part of the city's culture and history. They enthusiastically spread the word, brought their friends in, wrote books, shot films, and kept coming back for a pastrami on rye. Building a reputation on longevity alone is nothin' to brag about, which is why we've built ours on quality. Now that's somethin' special. We only select the best cuts of beef for our corned beef, pastrami, brisket, and other fine foods. Our corned beef and pastrami is cured using a slower method, which best flavors the meat, without injecting chemicals, water, or other additives to speed the process. Our finished product can take up to a full 30 days to cure, while commercially prepared corned beef is often pressure-injected (or 'pumped') to cure in 36 hours. Yep, you read that right. 30 days vs. 36 hours. Now, which sounds like the better meat to you?",
    operating_hours: {
      Monday: "8:00 am - 10:30 pm",
      Tuesday: "8:00 am - 10:30 pm",
      Wednesday: "8:00 am - 10:30 pm",
      Thursday: "8:00 am - 2:30 am",
      Friday: "8:00 am - Sat",
      Saturday: "Open 24 hours",
      Sunday: "Sat - 10:30 pm",
    },
    reviews: [
      {
        name: "Steve",
        date: "October 26, 2016",
        rating: 5,
        comments:
          "In 127 years, little has changed at Katz's. It remains one of New York's ??? and the country's ??? essential Jewish delicatessens. Every inch of the massive Lower East Side space smells intensely of pastrami and rye loaves. The sandwiches are massive, so they are best when shared. Order at the counter, and don't forget to tip your slicer ??? your sandwich will be better for it.",
      },
      {
        name: "Allen",
        date: "October 26, 2016",
        rating: 5,
        comments:
          "If I lived in NY and got diabetes from eating here every single time I ate, I would do it over and over and over again just for that first bite. These guys know how to make a sandwich. The heart attack comes free of charge! Came by while I was visiting NYC. First pit-stop when I come back :)!",
      },
      {
        name: "David",
        date: "October 26, 2016",
        rating: 2,
        comments:
          "Ok so four of us came. One more later who didn't order becauase it's so expensive and simple. Seriously, a bunch of meat albeit you can sample beforehand on rye/white/wheat bread. Cheese extra. Pickles free, you can just ask them at the pickup counter. But seriously 20 bucks gone for an non-flavored half sandwich. And a line that is long, especially if you want seating. I'm down to just take a quick look where Sally and Harry sat and leave to the other delis all around NYC. Oh and they accept Samsung pay.",
      },
    ],
  },
  {
    id: 5,
    name: "Roberta's Pizza",
    neighborhood: "Brooklyn",
    username: "RP",
    email: "RP@gmail.com",
    photograph: "5.jpg",
    address: "261 Moore St, Brooklyn, NY 11206",
    contactNum: "908-291-5674",
    latlng: {
      lat: 40.705089,
      lng: -73.933585,
    },
    cuisine_type: "Pizza",
    biography:
      "Down a nearly forgotten corner of Bushwick whose neighbors include abandoned factories and gritty warehouses, you???ll find an old shipping container, a fiery red pizza oven imported from Italy and New York royalty--Beyonc?? and Jay-Z. Why? Let???s just leave it as... it???s Brooklyn. Waiting in hour long lines wrapped around a graffiti-tagged garage, New Yorkers gather around long picnic tables as they dine on some of the city???s best Neapolitan-inspired pizza, lit under the romantic glow of holiday twinkle lights. Simplicity is key here. Each pizza is topped with a fresh tomato sauce and creamy, house-made mozzarella as flames lick the edges of their airy, yet crisp crust in an imported wood-burning oven.",
    operating_hours: {
      Monday: "11:00 am - 12:00 am",
      Tuesday: "11:00 am - 12:00 am",
      Wednesday: "11:00 am - 12:00 am",
      Thursday: "11:00 am - 12:00 am",
      Friday: "11:00 am - 12:00 am",
      Saturday: "10:00 am - 12:00 am",
      Sunday: "10:00 am - 12:00 am",
    },
    reviews: [
      {
        name: "Steve",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "Roberta's is the epicenter of the modern Brooklyn food scene.The pizzas are fantastic, but the restaurant really flexes its muscles with the vegetable dishes. In addition to the pies, consider ordering the radishes, the romaine salad, the roasted beets, and some of the charcuterie.",
      },
      {
        name: "Raymond",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "Roberta's, one of the better pizzas I have had in my life. Very trendy and hipsterish spot. Came here for lunch on a random weekday afternoon and when we arrived, there was a line forming already. The space is a bit cramped. You'll get to know your neighbors soon enough. The pizza is just delightful and delicious. It's a ncie plus that you get to see them firing up the pizzas in the corner. The major issue with Roberta's is the trek out to the Williamsburg/Bushwick.",
      },
      {
        name: "Laurel",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "The pizza is fantastic, not THE best I've ever had, but would definitely go back since it has great food and great ambiance. Definitely worth going to. It has A LOT of hype in the New York food scene, and I question if it deserves all of it, but it's still a totally great spot to hit up when in the area!!",
      },
    ],
  },
  {
    id: 6,
    name: "Hometown BBQ",
    neighborhood: "Brooklyn",
    photograph: "6.jpg",
    username: "HBBQ",
    email: "HBBQ@gmail.com",
    address: "454 Van Brunt St, Brooklyn, NY 11231",
    contactNum: "718-293-1284",
    latlng: {
      lat: 40.674925,
      lng: -74.016162,
    },
    cuisine_type: "American",
    operating_hours: {
      Monday: "Closed",
      Tuesday: "12:00 pm - 10:00 pm",
      Wednesday: "12:00 pm - 10:00 pm",
      Thursday: "12:00 pm - 10:00 pm",
      Friday: "12:00 pm - 11:00 pm",
      Saturday: "12:00 pm - 11:00 pm",
      Sunday: "12:00 pm - 9:00 pm",
    },
    reviews: [
      {
        name: "Steve",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "Barbecue aficionados agree that Billy Durney is cooking up some of the best Texas-style barbecue in the city. Straightforward classics like smoked brisket and baby back ribs are always a strong choice, but there are also options like pork belly tacos and a lamb belly banh mi. The space is sprawling in a way that feels like the real deal, and Durney himself can usually be found working the room, and keeping a watchful eye on the smoking meats. It's counter service only, and there's often a line, but for the scene and certainly for the meat, it's easily worth the trip to Red Hook.",
      },
      {
        name: "Michelle",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "Overall, a great try of New York BBQ. The restaurant d??cor is rustic with a good amount of seats to sit and enjoy the meal. I definitely would love to come back and try that monster of a beef rib!",
      },
      {
        name: "Ai-Mei",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "mmmmmm, what a gem this is in bklyn! I loveeee how soft their brisket is here. Their pork tacos are to die for, their different variety of ribs and lastly, their lamb is not gamey at all. Super wallet friendly for the amount they give you. I highly recommend this spot- after eating here, you can definitely walk over for Steve's key lime pies.",
      },
    ],
  },
  {
    id: 7,
    name: "Superiority Burger",
    neighborhood: "Manhattan",
    username: "SB",
    email: "SB@gmail.com",
    photograph: "7.jpg",
    address: "430 E 9th St, New York, NY 10009",
    contactNum: "212-237-0841",
    latlng: {
      lat: 40.727397,
      lng: -73.983645,
    },
    cuisine_type: "American",
    biography:
      "Punk-rock drummer and former fine-dining pastry chef extraor??dinaire, total badass and wearer of paper soda-jerk hats ??? if you were looking for someone to give vegetarian fast-food a spectacular high-low makeover, to make it cool, cravable, and also, you know, nutritious, you couldn???t do much better than Brooks Headley. Everything on his Superiority menu ??? veggie burger, faux Sloppy Joe, burnt-broccoli salad ??? is mysteriously satisfying and as good as you???ve heard, except the Superiority Wrap (a.k.a. the Hippie Wrap), which is better than you???ve heard. Nor do daily specials like vegan pump-cheese nachos disappoint. Have an expert Arnold Palmer while you wait for the savory stuff. Then take your salubrious fast-food feast to a Tompkins Square Park bench, or, if one???s available, grab an old-fashioned swing-tray seat at the restaurant and imagine you???re dining at the late, great, decidedly nonvegetarian Prime Burger on 51st Street.",
    operating_hours: {
      Monday: "11:30 am - 10:00 pm",
      Tuesday: "Closed",
      Wednesday: "11:30 am - 10:00 pm",
      Thursday: "11:30 am - 10:00 pm",
      Friday: "11:30 am - 10:00 pm",
      Saturday: "11:30 am - 10:00 pm",
      Sunday: "11:30 am - 10:00 pm",
    },
    reviews: [
      {
        name: "Steve",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "Brooks Headley???s tiny East Village cafe is so much more than a veggie burger spot ??? it's one of the best bang-for-your-buck restaurants in Lower Manhattan. Headley and his crew turn seasonal vegetables into delectable salads and riffs on American comfort food favorites. The specials menu changes daily, and the rest of the menu is constantly evolving. You can get a lot of food to eat here for under $15 per person.",
      },
      {
        name: "Gabriel",
        date: "October 26, 2016",
        rating: 5,
        comments:
          "I was turned on to this place following the glowing NYT review. Its near my area of the city so I figured why not go? Man they weren't kidding, Superiority Burger is probably the best vegetarian experience I've ever had!",
      },
      {
        name: "Shivi",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "Great flavors and very satisfying. Craving a sandwich, I stopped by on a Friday night with a vegetarian friend. Super small location with just a few seats inside. Ambiance is a bit industrial, good is definitely much more sophisticated than the look of the place! Ordered the superiority burger anda side of potato salad. The potato salad was very light and tasted clean ( less mayo, lots of dill and some cucumber) -- refreshing for a humid summer night! Sandwich was surprisingly delicious - it is very small ( funny allusion to a White Castle burger) but it packs a punch! Not only are there layers of flavors ( amazing sauces) but the party itself had a great texture Ahmed flavor-- well done and so wonderful! Will definitely stop by again for an overall amazing burger/sandwich. Staff was super nice and accommodating but not out of the way friendly.",
      },
    ],
  },
  {
    id: 8,
    name: "The Dutch",
    username: "TD",
    email: "TD@gmail.com",
    neighborhood: "Manhattan",
    photograph: "8.jpg",
    address: "131 Sullivan St, New York, NY 10012",
    contactNum: "212=825-1112",
    latlng: {
      lat: 40.726584,
      lng: -74.002082,
    },
    cuisine_type: "American",
    biography:
      "The Dutch is an American restaurant, bar and oyster room inspired by local cafes, country inns, corner taverns, neighborhood bistros, seaside shacks, roadside joints and the same mix of cultural influences that make New York City great. Award-winning Chef Andrew Carmellini's roots-inspired American menu features fresh fish and shellfish, choice meats, local produce and the best of what's around.",
    operating_hours: {
      Monday: "11:30 am - 3:00 pm, 5:30 pm - 11:00 pm",
      Tuesday: "11:30 am - 3:00 pm, 5:30 pm - 11:00 pm",
      Wednesday: "11:30 am - 3:00 pm, 5:30 pm - 11:00 pm",
      Thursday: "11:30 am - 3:00 pm, 5:30 pm - 11:00 pm",
      Friday: "11:30 am - 3:00 pm, 5:30 pm - 11:30 pm",
      Saturday: "10:00 am - 3:00 pm, 5:30 pm - 11:30 pm",
      Sunday: "10:00 am - 3:00 pm, 5:30 pm - 11:00 pm",
    },
    reviews: [
      {
        name: "Steve",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "Over the last five years, The Dutch has turned into the quintessential American restaurant that chef Andrew Carmellini and partners Josh Pickard and Luke Ostrom sought to evoke when it first opened. It???s a great choice when you???re craving a steak, a burger, or oysters, and the menu always includes plentiful seafood options as well as pastas. The Dutch is now an indelible part of the Soho landscape.",
      },
      {
        name: "Loren",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "I randomly came here on a Saturday night. I was pleasantly surprised with the food and the service. We had the calamari and the ceviche with avocado, and then the catfish. Oh! Then we had the banana souffl?? for dessert with ice cream. It was all delicious and well put together. Would love to eat here again.",
      },
      {
        name: "Lori",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "Aside from the slightly claustrophobic dining area and the fact that you may have difficulty hearing your dining companion, I'd return to The Dutch without hesitation. The food is surprisingly well-executed and conceived, and our dinner service flowed smoothly without a hitch. Just make sure to get a reservation in advance, as I'm sure more than just a few other people will have the same idea.",
      },
    ],
  },
  {
    id: 9,
    name: "Mu Ramen",
    username: "MR",
    email: "MR@gmail.com",
    neighborhood: "Queens",
    photograph: "9.jpg",
    address: "1209 Jackson Ave, Queens, NY 11101",
    contactNum: "212-900-7832",
    latlng: {
      lat: 40.743797,
      lng: -73.950652,
    },
    cuisine_type: "Asian",
    biography:
      "Mu offers ramen and other recipes prepared with New York influences. Originally starting out as a late-night pop-up eatery in Long Island City, owner and chef Joshua Smookler combines fresh, high quality ingredients into memorable meals. Dinners at Mu Ramen can start with selections from the treats offerings, which include charred edamame, okonomiyaki, tebasaki gyoza and U.N.I. Ramen choices include tonkotsu, spicy miso, and shoyu.",
    operating_hours: {
      Monday: "5:00 pm - 10:00 pm",
      Tuesday: "5:00 pm - 10:00 pm",
      Wednesday: "5:00 pm - 10:00 pm",
      Thursday: "5:00 pm - 10:00 pm",
      Friday: "5:00 pm - 11:00 pm",
      Saturday: "5:00 pm - 11:00 pm",
      Sunday: "5:00 pm - 10:00 pm",
    },
    reviews: [
      {
        name: "Steve",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "Joshua Smookler???s two-year-old ramen shop serves one of the best tonkotsu broths around. Beyond ramen, Mu also offers some high minded plates, like foie gras-stuffed chicken wings, as well as dry-aged Japanese Wagyu beef specials. Mu is just 10 short minutes away from Midtown via the 7-train.",
      },
      {
        name: "Brittany",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "Overall, I would definitely recommend this place if you enjoy thick curly noodles with a thick, intense broth.  If you don't there are still other options but I can't vouch for those.",
      },
      {
        name: "Sally",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "One of the tastiest and most unique ramen places I've been to in NYC, but also the priciest. I think overall its worth the try. Not an everyday casual ramen shop though.",
      },
    ],
  },
  {
    id: 10,
    name: "Casa Enrique",
    username: "CE",
    email: "CE@gmail.com",
    neighborhood: "Queens",
    photograph: "10.jpg",
    address: "5-48 49th Ave, Queens, NY 11101",
    contactNum: "347-448-6040",
    latlng: {
      lat: 40.743394,
      lng: -73.954235,
    },
    cuisine_type: "Mexican",
    biography:
      "Casa Enrique opened its doors on March 15th 2012, and quickly established itself as a local hotspot in Long Island City. In September 2014, Casa Enrique was awarded its first ever Michelin star. ???We are very proud to serve our family???s recipes to our friends and customers and share a taste of home with them???. Casa Enrique continues this same tradition till this day, while being awarded another 6 Michelin stars in as many years. In addition, Chef Cosme is also a James Beard award nominee for excellence in Mexican cuisine. Join us on this unique gastronomical journey & experience first hand the magic that is Casa Enrique. Buen Provecho.",
    operating_hours: {
      Monday: "5:00 pm - 12:00 am",
      Tuesday: "5:00 pm - 12:00 am",
      Wednesday: "5:00 pm - 12:00 am",
      Thursday: "5:00 pm - 12:00 am",
      Friday: "5:00 pm - 12:00 am",
      Saturday: "11:00 am - 12:00 am",
      Sunday: "11:00 am - 12:00 am",
    },
    reviews: [
      {
        name: "Steve",
        date: "October 26, 2016",
        rating: 5,
        comments:
          "Head to this laid-back Long Island City restaurant for beef tongue tacos, chicken smothered in a heady mole sauce, and a monster crab tostada. New York's only Michelin-starred Mexican restaurant is an especially cool choice for lunch during the week or drinks after work. Eater critic Ryan Sutton awarded this restaurant two stars.",
      },
      {
        name: "Rob",
        date: "October 26, 2016",
        rating: 5,
        comments:
          "The hype was real. Please go. Get the ceviche. And the tres leches. You're welcome",
      },
      {
        name: "Jason",
        date: "October 26, 2016",
        rating: 4,
        comments:
          "For a Michelin star restaurant, it's fairly priced and the food is fairly good. Started with a strawberry margarita which was good in flavor but not much alcohol. Had the chicken enchiladas with salsa verde and it was really good. Great balance in flavor and a good portion. Extra tasty with their hot sauces. My wife had the lamb but it was a bit too salty for our taste. Although, it was cooked very well and fell off the bone. The highlight of the night was the tres leches cake. Probably the best I've ever had to be honest. Not too sweet and very milky. Overall, one of my top 3 favorite Mexican in NY.",
      },
    ],
  },
];

const createRestaurants = async () => {
  for (let i = 0; i < restaurants.length; i++) {
    const restaurant = restaurants[i];
    await prisma.User.create({
      data: {
        email: restaurant.email,
        businessName: restaurant.name,
        username: restaurant.username,
        address: restaurant.address,
        lat: restaurant.latlng.lat,
        lng: restaurant.latlng.lng,
        businessType: BusinessType.restaurant,
        contactNum: "123",
        contactNum: restaurant.contactNum,
        biography: restaurant.biography,
        hash: bcrypt.hashSync("12345678", 10),
      },
    });
  }
};

async function main() {
  await createTags();
  await createArticles();
  await createRestaurants();
  await createOrgs();
  await createProducts();
  await createReservations();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
