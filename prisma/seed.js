const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// async function article() {
//     const article = await prisma.Article.create({
//         data: {
//             title,
//             author,
//             url,
//             id
//         }
//     })
// }

// const article1 = article( "The Problem of Food Waste","FoodPrint", "https://foodprint.org/issues/the-problem-of-food-waste/", 1)
// const article2 = article("Food Waste in America: Facts and Statistics","Rubicon","https://foodprihttps://www.rubicon.com/blog/food-waste-facts/nt.org/issues/the-problem-of-food-waste/",2)
// const article3 = article("Food Loss and Waste", "FDA", "https://www.fda.gov/food/consumers/food-loss-and-waste", 3)
const article1 = async() => await prisma.Article.create({
    data: {
        title: "The Problem of Food Waste",
        author: "FoodPrint",
        url: "https://foodprint.org/issues/the-problem-of-food-waste/",
        id: 1
    }
})
const article2= async() => await prisma.Article.create({
    data: {
        title: "Food Waste in America: Facts and Statistics",
        author: "Rubicon",
        url: "https://foodprihttps://www.rubicon.com/blog/food-waste-facts/nt.org/issues/the-problem-of-food-waste/",
        id: 2
    }
})
const article3 = async() => await prisma.Article.create({
    data: {
        title: "Food Loss and Waste",
        author: "FDA",
        url: "https://www.fda.gov/food/consumers/food-loss-and-waste",
        id: 3
    }
})
// async function main() {
//     const alice = await prisma.user.upsert({
//       where: { email: 'alice@prisma.io' },
//       update: {},
//       create: {
//         email: 'alice@prisma.io',
//         name: 'Alice',
//         posts: {
//           create: {
//             title: 'Check out Prisma with Next.js',
//             content: 'https://www.prisma.io/nextjs',
//             published: true,
//           },
//         },
//       },
//     })
  
//     const bob = await prisma.user.upsert({
//       where: { email: 'bob@prisma.io' },
//       update: {},
//       create: {
//         email: 'bob@prisma.io',
//         name: 'Bob',
//         posts: {
//           create: [
//             {
//               title: 'Follow Prisma on Twitter',
//               content: 'https://twitter.com/prisma',
//               published: true,
//             },
//             {
//               title: 'Follow Nexus on Twitter',
//               content: 'https://twitter.com/nexusgql',
//               published: true,
//             },
//           ],
//         },
//       },
//     })
//     console.log({ alice, bob })
//   }
  
//   main()
//     .catch((e) => {
//       console.error(e)
//       process.exit(1)
//     })
//     .finally(async () => {
//       await prisma.$disconnect()
// //     })
