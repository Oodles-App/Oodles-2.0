export default async function getAddresses(req, res) {
  try {
    console.log(req.query, "req query");
    const address = req.query.input;
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=589d58eb199f4f898d2194bfad9ec7b5`;
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=589d58eb199f4f898d2194bfad9ec7b5`
    );
    console.log(response.ok, "response ok");
    if (response.ok) {
      response.json();
      console.log(response);
      res.status(200).json({
        data: response.data,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${req.address}&type=formatted&format=json&apiKey=${process.env.ADDRESS_API_KEY}`;
