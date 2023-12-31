"use strict";
/* -------------------------------------------------------
      NODEJS EXPRESS | CLARUSWAY FullStack Team
  ------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/car:

const { isAdmin, isActive } = require("../middlewares/permissions");
const car = require("../controllers/car");

router.route("/").get(car.list).post(car.create);

router
  .route("/:id")
  .get(car.read)
  .put(car.update)
  .patch(car.update)
  .delete(car.delete);

/* ------------------------------------------------------- */
module.exports = router;
