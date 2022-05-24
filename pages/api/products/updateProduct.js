import { PrismaClient } from "@prisma/client";

export default async function updateProduct(req, res){
    const prisma = new PrismaClient({log: ["query"]})
    try {
        const product = JSON.parse(req.body);
        const id = product.product.product.id
        const updateProductQuantity = product.product.product.amount - product.product.quantity
        
        await prisma.product.update({
            where : {
                id: id
            }, 
            data: {
                amount: updateProductQuantity
            }
        })
        res.status(201);
        res.json({"Message" : "Products Updated"});
    } catch(error) {
          res.status(500);
          res.json({error: "Unable to get products from database"})
    } finally {
      await prisma.$disconnect()
    }
  
}
  
