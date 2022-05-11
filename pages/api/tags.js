const mockTags = [
  { name: "ingredient" },
  { name: "meal" },
  { name: "fruit" },
  { name: "meat" },
  { name: "vegetarian" },
];

export default function handler(req, res) {
  console.log("inside tags api");
  const fetchTags = () => {
    //query database here
    res.status(200).send(mockTags);
  };
  const addTag = () => {
    //expect tags li
    //add tag to database here
    const newTag = req.body;
    mockTags.push(newTag);
    res.status(201).json(newTag);
  };

  const error = () => {
    res.status(404).send("Invalid method or method not found.");
  };

  switch (req.method) {
    case "GET":
      fetchTags();
    case "POST":
      addTag();
    default:
      error();
  }
}
