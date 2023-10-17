"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
const passwordEncrpt = require("../helpers/passwordEncrypt");
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
      set:(password)=>passwordEncrpt(password)
    },
    email:{
        type: String,
        trim: true,
        required: [true, 'Email field must be required' ], //* You can use array for giving reasonable error incase not true look at this example 
        unique: [true, 'Email field must be unique' ],
        validate:[
            (email)=> email.includes('@') && email.includes('.'), 'Email type is not correct'
        ]
    },
    isActive:{
        type:Boolean,
        default:false
    },
    isAdmin:{
      type:Boolean,
      default:false
  }
  },
  {collection:"users", timestamps:true}
);
module.exports = mongoose.model('User', UserSchema)
