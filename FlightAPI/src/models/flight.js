"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- *
{
    "flightNumber": "IS-AN-001",
    "airline": "THY",
    "departure": "ISTANBUL",
    "departureDate": "2020-10-01 10:00:00",
    "arrival": "ANKARA",
    "arrivalDate": "2020-10-01 12:00:00",
    "createdId": "652ceaa1bae9cde5e8a97522"
}
{
  "flightNumber": "IS-AN-002",
  "airline": "THY",
  "departure": "ISTANBUL",
  "departureDate": "2020-10-01 23:00:00",
  "arrival": "ANTALYA",
  "arrivalDate": "2020-10-02 03:00:00",
  "createdId": "65317b1c29b1267920ddf30d"
}
/* ------------------------------------------------------- */
// User Model:

const passwordEncrypt = require("../helpers/passwordEncrypt");

const FlightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    airline: {
      type: String,
      trim: true,
      required: true,
    },

    // departure: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'City',
    //     required: true
    // },

    departure: {
      type: String,
      trim: true,
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
      // default: new Date(),
    },
    arrival: {
      type: String,
      trim: true,
      required: true,
    },
    arrivalDate: {
      type: Date,
      required: true,
      // default: new Date(),
    },

    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { collection: "Flights", timestamps: true }
);

const dateToLocaleString = require("../helpers/dateToLocaleString");

FlightSchema.pre("init", function (document) {
  // document.departureDateString = document.departureDate.toLocaleString(
  //   "de-DE",
  //   {
  //     hour12: false,
  //   }
  // );
  // document.arrivalDateString = document.arrivalDate.toLocaleString("de-DE", {
  //   hour12: false,
  // });
  document.departureDateString = dateToLocaleString(document.departureDate);
  document.arrivalDateString = dateToLocaleString(document.arrivalDate);
  document.__v = undefined;
  const departureDate = new Date(document.departureDate);
  const arrivalDate = new Date(document.arrivalDate);

  // Calculate the time difference in milliseconds
  const timeDifference = arrivalDate - departureDate;

  // Convert milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  // Calculate the number of hours
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 3600 * 24)) / (1000 * 3600)
  );

  console.log(
    `The duration of the flight is approximately ${daysDifference} days and ${hoursDifference} hours.`
  );
  document.daysDifference = daysDifference;
  document.hoursDifference = hoursDifference;
});

/* ------------------------------------------------------- */
module.exports = mongoose.model("Flights", FlightSchema);
