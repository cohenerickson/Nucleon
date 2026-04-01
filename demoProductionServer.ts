import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static("./build/client"));

// For any other requests, serve the index.html file (for client-side routing)
app.use((req, res) => {
  res.sendFile(path.resolve("./build/client/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
