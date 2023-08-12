import express from "express";
import {
  createParticipant,
  deleteOneParticipant,
  getAllParticipants,
  getOneParticipants,
  updateOneParticipant,
} from "../controllers/participantsController.js";

const router = express.Router();

router.route("/").post(createParticipant).get(getAllParticipants);

router
  .route("/:participantId")
  .get(getOneParticipants)
  .put(updateOneParticipant)
  .delete(deleteOneParticipant);

export default router;
