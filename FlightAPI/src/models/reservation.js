"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- *
{
    "username": "test",
    "password": "1234",
    "email": "test@site.com",
    "isActive": true,
    "isStaff": false,
    "isAdmin": false,
}
/* ------------------------------------------------------- */
// User Model:

const passwordEncrypt = require("../helpers/passwordEncrypt");

// const passwordValidator = (password) => {
//   // Regular expression for password validation
//   const passwordRegex =
//     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{10,10}$/;

//   if (!passwordRegex.test(password)) {
//     let errorMessage = "Password does not meet the criteria. ";
//     if (!/(?=.*\d)/.test(password)) {
//       errorMessage += "Number is missing. ";
//     }
//     if (!/(?=.*[a-z])/.test(password)) {
//       errorMessage += "Lowercase letter is missing. ";
//     }
//     if (!/(?=.*[A-Z])/.test(password)) {
//       errorMessage += "Uppercase letter is missing. ";
//     }
//     if (!/(?=.*[@#$%^&+=!])/.test(password)) {
//       errorMessage += "Special character is missing. ";
//     }
//     if (password.length < 10) {
//       errorMessage += "Password length is less than 10 characters. ";
//     }
//     throw new Error(errorMessage.trim());
//   }

//   return true;
// };

const ReservationSchema = new mongoose.Schema(
  {
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flights",
    },

    passengers: [
      // push, pull
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Passengers",
      },
    ],
    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { collection: "Reservations", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Reservations", ReservationSchema);
