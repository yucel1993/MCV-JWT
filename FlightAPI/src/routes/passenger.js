"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/Passenger:

const permissions = require("../middlewares/permissions");
const Passenger = require("../controllers/passenger");

// URL: /users

router
  .route("/")
  .get(permissions.isAdmin, Passenger.list)
  .post(Passenger.create);

router
  .route("/:id")
  .get(permissions.isLogin, Passenger.read)
  .put(permissions.isLogin, Passenger.update)
  .patch(permissions.isLogin, Passenger.update)
  .delete(permissions.isAdmin, Passenger.delete);

/* ------------------------------------------------------- */
module.exports = router;
