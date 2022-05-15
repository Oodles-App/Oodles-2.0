import { PrismaClient } from "@prisma/client"

export default async function addProduct(req, res){
  const prisma = new PrismaClient({log: ["query"]})
  try {
    const productObj = JSON.parse(req.body);
    //const { product: productData } = req.body;
    console.log(productObj);
    const product = await prisma.product.create({
      data: {
        name: productObj.product.name,
        amount: Number(productObj.product.amount),
        measurement: productObj.product.measurement
      }
    });
    res.status(201);
    res.json({product});
  } catch(error) {
    console.log(error);
    res.status(500);
    res.json({error: "Unable to save product to database"})
  } finally {
    await prisma.$disconnect()
  }

}
