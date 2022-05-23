import prisma from "../../../db";

export default async function createChannel(req, res) {
  try {
    const channelData = JSON.parse(req.body);
    const chatChannel = await prisma.chatChannel.upsert({
      where: {
        orgId_restaurantId: {
          orgId: channelData.orgId,
          restaurantId: channelData.restaurantId,
        },
      },
      update: {},
      create: {
        orgId: channelData.orgId,
        restaurantId: channelData.restaurantId,
        name: `oodles-livechat-${channelData.orgId}-${channelData.restaurantId}`,
      },
    });
    res.status(201);
    res.json({ chatChannel });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ error: "Unable to create Live Chat Channel" });
  }
}
