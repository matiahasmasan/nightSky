import express from "express";
import fetch from "node-fetch";
import path from "path";

const app = express();
const port = 3000;

app.use(express.json());

// Serve static files (HTML, CSS, JS)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

// Your proxy route
const API_ENDPOINT = "https://api.astronomyapi.com/api/v2/studio/star-chart";
const authString = btoa(
  `ed552e1c-30ea-486a-9b12-1b8984c67fcc:fe33bdec1af59627394437d21ca24db47d5a62f3d2449f5f3e8b5cf812268b7bfcee80c8664094afa5abaad01d72c886383df73497b8f54bb76e0cdba6509f9c094e21278edfd0a9e8989ceba19768efd8b07c605388ecd86306f2a01ba0c28a31406eba9050be497b88a176d10af5a6`
);
//const API_KEY = "YOUR_API_KEY";

app.post("/proxy/star-chart", async (req, res) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sky chart data" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
