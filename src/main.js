const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

require("./bootstrap").then(() => {
  const PORT = process.env.PORT || 3000;
  const ENV_DEV = process.env.NODE_ENV !== "production";

  if (ENV_DEV) {
    const morgan = require("morgan");
    app.use(morgan("dev"));
  }

  app.use(require("./middleware"));
  app.use(require("./routes"));
  app.use((req, res) => res.status(404).end());

  app.listen(
    PORT,
    () =>
      ENV_DEV && console.log(`server is running on http://localhost:${PORT}`)
  );
});
