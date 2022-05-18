import { PrismaClient } from "@prisma/client";

export default async function getProducts(req, res){
  const prisma = new PrismaClient({log: ["query"]})
  try {
    const products = await prisma.product.findMany();
    res.json({products});
  } catch(error) {
        res.status(500);
        res.json({error: "Unable to get products from database"})
  } finally {
    await prisma.$disconnect()
  }

}
