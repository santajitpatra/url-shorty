const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");

const app = express();
const port = 8000;

connectToMongoDB("mongodb://127.0.0.1:27017/short_url").then(
  console.log("mongodb://127.0.0.1:27017/short_url successfully connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/url", urlRoute);
app.use("/", staticRoute);


app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  // if (entry) {
  res.redirect(entry.redirectURL);
  // } else {
  //   res.status(404).send("Short URL not found");
  // }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
