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

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      validate: [
        (password) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*]).{8,}$/.test(password) &&
          "Password type is not correct. It should include at least one uppercase letter, one lowercase letter, one digit, and one special character, and be at least 10 characters long.",
      ],
      set: (password) => passwordEncrypt(password),
    },

    email: {
      type: String,
      trim: true,
      required: [true, "Email field must be required"],
      unique: [true, "There is this email. Email field must be unique"],
      validate: [
        (email) => email.includes("@") && email.includes("."),
        "Email type is not correct.",
      ],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isStaff: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Users", UserSchema);
