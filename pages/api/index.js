const cars = {
  cars: {
    Nissan: [
      { model: "Sentra", doors: 4 },
      { model: "Maxima", doors: 4 },
      { model: "Skyline", doors: 2 },
    ],
    Ford: [
      { model: "Taurus", doors: 4 },
      { model: "Escort", doors: 4 },
    ],

    Toyota: [
      { model: "Highlander", doors: 2 },
      { model: "Rav4", doors: 1 },
    ],
  },
};

import { apiHandler, omit } from "../../helpers/api";

export default apiHandler({
  get: getUsers,
});

function getUsers(req, res) {
  // return users without hashed passwords in the response
  const response = usersRepo.getAll().map((x) => omit(x, "hash"));
  return res.status(200).json(cars);
}
