import prisma from "../../db";

export default async function makeReservation(req, res) {
  try {
    //const reservationObj = JSON.parse(req.body);
    const { reservation: reservationData } = req.body;
    const reservation = await prisma.reservation.create({
      data: {
        pickupTime: Number(reservationData.pickupTime),
        status: "ACTIVE",
        userId: Number(reservationData.userId),
      },
    });
    res.status(201);
    res.json({ reservation });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error: "Unable to save reservation to database" });
  }
}
