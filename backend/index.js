require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const client = require("prom-client");

const app = express();
app.use(cors());
app.use(express.json());

const register = new client.Registry();

client.collectDefaultMetrics({
  register,
  prefix: "ecommerce_",
});

const httpRequestsTotal = new client.Counter({
  name: "ecommerce_http_requests_total",
  help: "Total number of HTTP requests processed by the backend",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

const httpRequestDurationSeconds = new client.Histogram({
  name: "ecommerce_http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5],
  registers: [register],
});

app.use((req, res, next) => {
  const end = httpRequestDurationSeconds.startTimer();

  res.on("finish", () => {
    const route = req.route?.path || req.path;

    httpRequestsTotal.inc({
      method: req.method,
      route,
      status_code: res.statusCode,
    });

    end({
      method: req.method,
      route,
      status_code: res.statusCode,
    });
  });

  next();
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5432,
});

const healthHandler = async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Backend is running!",
      database_time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection error:", err.stack);
  } else {
    console.log("✅ Database connected!");
    release();
  }
});
app.get("/", healthHandler);
app.get("/api", healthHandler);
app.get("/api/", healthHandler);

app.get("/api/products", async (req, res) => {
  res.json({
    products: [
      { id: 1, name: "Laptop", price: 999.99 },
      { id: 2, name: "Mouse", price: 29.99 },
      { id: 3, name: "Keyboard", price: 79.99 },
    ],
  });
});

const serveMetrics = async (req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.end(await register.metrics());
};

app.get("/metrics", serveMetrics);
app.get("/metric", serveMetrics);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend on http://localhost:${PORT}`));
