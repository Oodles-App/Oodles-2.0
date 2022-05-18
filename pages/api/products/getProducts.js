import prisma from "../../../db";

export default async function getProducts(req, res) {
  try {
    const products = await prisma.product.findMany();
    res.json({ products });
  } catch (error) {
    res.status(500);
    res.json({ error: "Unable to get products from database" });
  }
}
