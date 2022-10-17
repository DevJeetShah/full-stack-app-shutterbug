const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      revFirstName: {
        type: String,
        required: true
      },
      revLastName: {
        type: String,
        required: true
      },
      profileLocation: {
        type: String,
        required: true
      },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  });

  module.exports = mongoose.model("Review", ReviewSchema);
