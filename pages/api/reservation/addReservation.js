import { PrismaClient } from "@prisma/client"

export default async function Reservation(req, res){
  const prisma = new PrismaClient({log: ["query"]})
  try {
    const reservationData = JSON.parse(req.body);
    console.log("reservationData", reservationData);
    const reservation = await prisma.reservation.create({
      data: {
        pickupTime:reservationData.reservation.pickupTime,
        status: "ACTIVE",
        userId: reservationData.reservation.userId,
        cart: reservationData.reservation.cart
      }
    });
    res.status(201);
    res.json({reservation});
  } catch(error) {
    console.log("ERROR", error);
    res.status(500);
    res.json({error: "Unable to save reservation to database"})
  } finally {
    await prisma.$disconnect()
  }

}