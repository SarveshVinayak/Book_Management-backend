import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/config.js";

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log("Connected to MongoDB");
  server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
  });
});

const unexpectedErrorHandler = (error) => {
  console.error(error);
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
