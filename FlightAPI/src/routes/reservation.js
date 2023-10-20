"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/Reservation:

const permissions = require("../middlewares/permissions");
const Reservation = require("../controllers/reservation");

// URL: /reservations

router.use(permissions.isStaffOrAdmin);

router.route("/").get(Reservation.list).post(Reservation.create);

router
  .route("/:id")
  .get(Reservation.read)
  .put(Reservation.update)
  .patch(Reservation.update)
  .delete(permissions.isAdmin, Reservation.delete);

router.put(
  "/:id/pushPassenger",
  permissions.isAdmin,
  Reservation.pushPassenger
);
router.put(
  "/:id/pullPassenger",
  permissions.isAdmin,
  Reservation.pullPassenger
);

/* ------------------------------------------------------- */
module.exports = router;
