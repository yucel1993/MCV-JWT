"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/Reservation:

const { isAdmin, isActive } = require("../middlewares/permissions");
const Reservation = require("../controllers/reservations");

// URL: /users

router.route("/").get(Reservation.list).post(Reservation.create);

router.route("/onlyClient").get(Reservation.onlyClient);
router
  .route("/:id")
  .get(Reservation.read)
  .put(Reservation.update)
  .patch(Reservation.update)
  .delete(Reservation.delete);
/* ------------------------------------------------------- */
module.exports = router;
