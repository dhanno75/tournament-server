import { ObjectId } from "mongodb";
import Tournament from "../models/tournamentModel.js";

// Create Tournament
export const createTournament = async (req, res) => {
  try {
    const {
      tournamentName,
      startDate,
      endDate,
      status,
      participantsId,
      banner,
    } = req.body;
    const currentDate = new Date().toISOString();

    if (startDate > endDate) {
      return res.status(400).json({
        status: "fail",
        message: "End date should be greater than or equal to the start date",
      });
    } else {
      const newTournament = await Tournament.create({
        tournamentName,
        startDate,
        endDate,
        status: "upcoming",
        participantsId,
        banner,
      });

      return res.status(201).json({
        status: "success",
        message: "Tournament created successfully!!!",
        data: newTournament,
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Please try again",
    });
  }
};

// Get One Tournament
export const getOneTournament = async (req, res) => {
  try {
    const id = req.params.tournamentId;

    const tournament = await Tournament.aggregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "participants",
          localField: "participantsId",
          foreignField: "_id",
          as: "result",
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: tournament,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Please try again",
    });
  }
};

// Get All Tournaments
export const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json({
      status: "success",
      data: tournaments,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Please try again",
    });
  }
};

// Update Tournament
export const updateTournament = async (req, res) => {
  try {
    const updateTournament = await Tournament.findByIdAndUpdate(
      req.params.tournamentId,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: updateTournament,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Please try again",
    });
  }
};

// Delete Tournament
export const deleteTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const tournament = await Tournament.findOne({ _id: tournamentId });

    if (!tournament) {
      return res.status(404).json({
        status: "fail",
        message: "No such tournament found.",
      });
    }

    await Tournament.findByIdAndDelete(tournamentId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Please try again",
    });
  }
};
