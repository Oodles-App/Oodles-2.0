export default async function getOrganizations(req, res) {
  try {
    const response = await fetch(
      "https://projects.propublica.org/nonprofits/api/v2/state%5Bid%5D=NY",
      { method: "GET" }
    );
    if (response.ok) {
      const result = await response.json();
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
