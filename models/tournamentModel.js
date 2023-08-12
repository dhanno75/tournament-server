import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  tournamentName: String,
  startDate: Date,
  endDate: Date,
  currentStatus: {
    type: String,
    enum: {
      values: ["ongoing", "over", "upcoming"],
      message: "Status is either: ongoing, over, upcoming",
    },
  },
  participantsId: [mongoose.Schema.Types.ObjectId],
  banner: String,
});

const Tournament = mongoose.model("Tournament", tournamentSchema);
export default Tournament;
