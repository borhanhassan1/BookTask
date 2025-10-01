const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { apiLimiter } = require("./utils/rateLimiter");
const sanitizeInput = require("./middlewares/sanitizerMiddleware");
const { swaggerUi, specs } = require("./config/swagger");

const app = express();

app.use(helmet());
app.use(cors({ origin: false }));
app.use("/api", apiLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeInput);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/books", require("./routes/bookRoute"));

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.use((req, res, next) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});
module.exports = app;
