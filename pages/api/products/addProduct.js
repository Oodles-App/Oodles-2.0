import prisma from "../../../db";

export default async function addProduct(req, res) {
  try {
    const productObj = JSON.parse(req.body);
    //const { product: productData } = req.body;
    console.log(productObj);
    const product = await prisma.product.create({
      data: {
        name: productObj.product.name,
        amount: Number(productObj.product.amount),
        measurement: productObj.product.measurement,
        userId: productObj.product.userId,
      },
    });
    res.status(201);
    res.json({ product });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error: "Unable to save product to database" });
  }
}
