import { PrismaClient } from "@prisma/client"

export default function addProduct(req, res){
  const prisma = new PrismaClient({log: ["query"]})
  try {
    const product = await.prisma.
  } catch(error) {
    res.status(500);
    res.json({error: "Unable to save product to database"})
  } finally {
    await prisma.disconnect();
  }

  res.json({name: "saved"})
}
