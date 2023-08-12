import mongoose from "mongoose";
import validator from "validator";

const participantSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    // required: [true, "Please enter your email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  level: {
    type: String,
    enum: {
      values: ["rookie", "master", "legend"],
      message: "Level is either: rookie, master, grandmaster",
    },
  },
  avatar: String,
  location: String,
});

const Participant = mongoose.model("Participant", participantSchema);
export default Participant;
