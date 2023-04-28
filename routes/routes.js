import express from "express";
import auth from "../middleware/auth.js";

import { catchErrors } from "../helpers.js";
import {
  addRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomControllers.js";

import {
  registrer,
  login,
  logout,
  loggedIn,
} from "../controllers/userControllers.js";
import {
  addCustomer,
  getCustomers,
} from "../controllers/customerControllers.js";
const router = express.Router();

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filname = fileURLToPath(import.meta.url);
const __dirname = dirname(__filname);
router.get("/", (req, res) => {
  res.send("hello les hardcoders ok");
});

// SECTION ROOMS

router.get("/api/rooms", catchErrors(getRooms));

router.get("/api/rooms/:room_id", catchErrors(getRoom));

router.post("/api/rooms", catchErrors(addRoom));

router.patch("/api/rooms/:room_id", catchErrors(updateRoom));

router.delete("/api/rooms/:room_id", catchErrors(deleteRoom));

// SECTION USERS

// NOTE register
router.post("/api/users", catchErrors(registrer));

// NOTE login
router.post("/api/login", catchErrors(login));

// NOTE logout
router.get("/api/logout", catchErrors(logout));

// NOTE logout
router.get("/api/loggedIn", catchErrors(loggedIn));

// SECTION CUSTOMERS

router.post("/api/customers", auth, catchErrors(addCustomer));
router.get("/api/customers", auth, catchErrors(getCustomers));

export default router;
