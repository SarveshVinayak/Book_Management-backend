import express from "express";

import userAuth from "./user/authRoutes.js";
import bookRoute from "./user/bookRoutes.js";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/user/auth",
    route: userAuth,
  },
  {
    path: "/user/books",
    route: bookRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
