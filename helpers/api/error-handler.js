export function errorHandler(err, res) {
  //db errors
  if (err.meta && err.meta.target) {
    const target = err.meta.target[0];
    let error = {};
    switch (target) {
      case "email":
        error = { message: `A user already exists with this email.` };
        break;
      case "businessName":
        error = { message: `An user with this name already exists.` };
        break;
      case "address":
        error = { message: `Invaid or non-unique address.` };
        break;
      default:
        error = { message: `Database error.` };
    }
    console.error(err);
    return res.status(500).json(error);
  }

  // jwt authentication error
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Invalid Token" });
  }

  //if hardcoded err was thrown for alert creation
  if (err.status && err.message) {
    return res.status(err.status).json(err);
  }

  // default to 500 sever error
  console.error(err);
  return res.status(500).json({ message: err.message });
}
