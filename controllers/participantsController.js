import Participant from "../models/participantsModel.js";

// Create Participant
export const createParticipant = async (req, res) => {
  try {
    const particpant = await Participant.create(req.body);

    return res.status(201).json({
      status: "success",
      message: "Participant created successfully!!!",
      data: particpant,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Please try again",
    });
  }
};

// Get All Participants
export const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();

    res.status(200).json({
      status: "success",
      data: participants,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Please try again",
    });
  }
};

// Get One Participant
export const getOneParticipants = async (req, res) => {
  try {
    const participants = await Participant.find({
      _id: req.params.participantId,
    });

    res.status(200).json({
      status: "success",
      data: participants,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Please try again",
    });
  }
};

// Update a participant
export const updateOneParticipant = async (req, res) => {
  try {
    const updateParticipant = await Participant.findByIdAndUpdate(
      req.params.participantId,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: updateParticipant,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Please try again",
    });
  }
};

// Delete a participant
export const deleteOneParticipant = async (req, res) => {
  try {
    const participant = await Participant.findOne({
      _id: req.params.participantId,
    });

    if (!participant) {
      return res.status(404).json({
        status: "fail",
        message: "No such participant found.",
      });
    }

    await Participant.findByIdAndDelete(req.params.participantId);

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
