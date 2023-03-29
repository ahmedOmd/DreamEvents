import express from "express";
import { catchErrors } from "../helpers.js";
import {
  addRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomControllers.js";
const router = express.Router();

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filname = fileURLToPath(import.meta.url);
const __dirname = dirname(__filname);
router.get("/", (req, res) => {
  res.send("hello les hardcoders ok");
});

router.get("/api/rooms", catchErrors(getRooms));

router.get("/api/rooms/:room_id", catchErrors(getRoom));

router.post("/api/rooms", catchErrors(addRoom));

router.patch("/api/rooms/:room_id", catchErrors(updateRoom));

router.delete("/api/rooms/:room_id", catchErrors(deleteRoom));

export default router;
