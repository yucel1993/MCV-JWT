"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- *
{
    "flightId": "652cebb3bae9cde5e8a9753b",
    "passengers": [
      "652cf408b63b905ad13d9a87",
      "652cf408b63b905ad13d9a89",
      {
        "firstName": "Test 11",
        "lastName": "Test 11",
        "email": "test11@site.com"
      },
      {
        "firstName": "Test 12",
        "lastName": "Test 12",
        "email": "test12@site.com"
      },
    ],
    "createdId": "652ceaa1bae9cde5e8a97522"
  }
/* ------------------------------------------------------- */

const ReservationSchema = new mongoose.Schema(
  {
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flights",
      required: true,
    },

    passengers: [
      // push, pull
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { collection: "Reservations", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Reservations", ReservationSchema);
