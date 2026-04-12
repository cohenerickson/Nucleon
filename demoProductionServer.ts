import routes from "./app/routes";
import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static("./build/client"));

// Register route listeners for each defined route
for (const route of routes) {
  if (route.index) {
    app.get("/", (req, res) => {
      res.sendFile(path.resolve("./build/client/index.html"));
    });
  } else {
    app.get(`/${route.path}`, (req, res) => {
      res.sendFile(path.resolve("./build/client/index.html"));
    });
  }
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
