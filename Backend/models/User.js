import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    // future-ready fields
    scores: [
      {
        value: Number,
        date: Date,
      },
    ],

    charity: {
      type: String,
      default: "None",
    },
    subscriptionStatus: {
      type: String,
      default: "active"
    },
    renewalDate: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }, charityPercentage: {
      type: Number,
      default: 10
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);