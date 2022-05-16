const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { apiHandler } from "../../../helpers/api";

export default apiHandler({
  get: getTags,
  post: createTag,
});

async function getTags(req, res) {
  try {
    const allTags = await prisma.tag.findMany();
    res.status(200).json(allTags);
  } catch (error) {
    console.log(error); //TODO: error handling
  }
}

async function createTag(req, res) {
  try {
    const newTag = await prisma.tag.create({ data: req.body });
    res.status(201).json(newTag);
  } catch (error) {
    console.log(error);
  }
}
