const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// export const articles = [
//     {title: "The Problem of Food Waste",
//     author: "FoodPrint",
//     url: "https://foodprint.org/issues/the-problem-of-food-waste/",
//     id: 1},
//     {title: "Food Waste in America: Facts and Statistics",
//     author: "Rubicon",
//     url: "https://foodprihttps://www.rubicon.com/blog/food-waste-facts/nt.org/issues/the-problem-of-food-waste/",
//     id: 2},
//     {title: "Food Loss and Waste",
//     author: "FDA",
//     url: "https://www.fda.gov/food/consumers/food-loss-and-waste",
//     id: 3}

// ]

// async function main() {
//     await prisma.Article.createMany({
//       data: articles,
//     });
//   }

async function main() {
    const article1 = await prisma.Article.create({
        data: {
            title: "The Problem of Food Waste",
            author: "FoodPrint",
            url: "https://foodprint.org/issues/the-problem-of-food-waste/",
            id: 1
        }
    })
    const article2 = await prisma.Article.create({
        data: {
            title: "Food Waste in America: Facts and Statistics",
            author: "Rubicon",
            url: "https://foodprihttps://www.rubicon.com/blog/food-waste-facts/nt.org/issues/the-problem-of-food-waste/",
            id: 2
        }
    })
    const article3 = await prisma.Article.create({
        data: {
            title: "Food Loss and Waste",
            author: "FDA",
            url: "https://www.fda.gov/food/consumers/food-loss-and-waste",
            id: 3
        }
    })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })