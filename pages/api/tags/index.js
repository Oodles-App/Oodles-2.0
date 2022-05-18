import prisma from "../../../db";
import { apiHandler } from "../../../helpers/api";

export default apiHandler({
  get: getTags,
});

async function getTags(req, res) {
  try {
    const allTags = await prisma.tag.findMany();
    res.status(200).json(allTags);
  } catch (error) {
    console.log(error); //TODO: error handling
  }
}
