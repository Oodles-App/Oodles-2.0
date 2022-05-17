import { errorHandler, jwtMiddleware } from "../../helpers/api";

export function apiHandler(handler) {
  return async (req, res) => {
    const method = req.method.toLowerCase();

    // check handler supports HTTP method
    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
      // global middleware
      await jwtMiddleware(req, res);

      // route handler
      await handler[method](req, res);
    } catch (err) {
      console.log("about to call errorHandler inside api handler: ", err);
      errorHandler(err, res);
    }
  };
}
