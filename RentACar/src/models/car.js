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

const Carschema = new mongoose.Schema(
  {
    plateNumber: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    model: {
      type: String,
      trim: true,
      required: true,
    },
    year: {
      type: Number,
      trim: true,
    },
    isAutomatic: {
      type: Boolean,
      trim: true,
    },
    pricePerDay: {
      type: Number,
      trim: true,
    },
    isPublish: {
      type: Boolean,
      trim: true,
    },

    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    updatedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { collection: "cars", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Cars", Carschema);
