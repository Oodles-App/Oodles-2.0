import { PrismaClient } from "@prisma/client"

export default async function addProduct(req, res){
  const prisma = new PrismaClient({log: ["query"]})
  try {
    const { product: productData } = req.body;
    console.log(productData);
    const product = await prisma.product.create({
      data: {
        name: productData.name,
        amount: productData.amount,
        measurement: productData.measurement
      }
    });
    res.status(201);
    res.json({product});
  } catch(error) {
    res.status(500);
    res.json({error: "Unable to save product to database"})
  } finally {
    await prisma.$disconnect()
  }

}
