const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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
