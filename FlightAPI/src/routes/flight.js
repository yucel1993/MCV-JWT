"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/Flight:

const permissions = require("../middlewares/permissions");
const Flight = require("../controllers/flight");

// URL: /Flights

router.route("/").get(permissions.isStaff, Flight.list).post(Flight.create);

router
  .route("/:id")
  .get(permissions.isLogin, Flight.read)
  .put(permissions.isLogin, Flight.update)
  .patch(permissions.isLogin, Flight.update)
  .delete(permissions.isAdmin, Flight.delete);

/* ------------------------------------------------------- */
module.exports = router;
