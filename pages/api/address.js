export default async function getAddresses(req, res) {
  console.log("inside api call");
  console.log(req.body.address, "req");
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=${process.env.ADDRESS_API_KEY}`;
  const response = await fetch(url, { method: "GET" });
  console.log(response);
  res.status(200).json({
    data: response.data,
  });
}
