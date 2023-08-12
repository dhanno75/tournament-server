import express from "express";
import {
  createTournament,
  deleteTournament,
  getAllTournaments,
  getOneTournament,
  updateTournament,
} from "../controllers/tournamentController.js";

const router = express.Router();

router.route("/").post(createTournament).get(getAllTournaments);

router
  .route("/:tournamentId")
  .get(getOneTournament)
  .put(updateTournament)
  .delete(deleteTournament);

export default router;
