export default async function getAddresses(req, res) {
  try {
    const address = req.query.input;
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=${process.env.ADDRESS_API_KEY}`
    );
    if (response.ok) {
      const result = await response.json();
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
