"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Reservation Controller:

const Reservation = require("../models/reservations");
const Car = require("../models/car");
const sendEmail = require("../helpers/mail");
const Users = require("../models/user");
module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Reservations"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    const data = await res.getModelList(Reservation);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation),
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */

    const { userId, carId, startDate, endDate } = req.body;

    // Check for overlapping reservations for the same car
    const conflicts = await Reservation.find({
      carId,
      $or: [
        {
          startDate: { $lte: endDate },
          endDate: { $gte: startDate },
        },
      ],
    });

    if (conflicts.length > 0) {
      res.status(400).send({
        error: true,
        message: "This car is not available during the specified dates.",
      });
    } else {
      // If no conflicts, create the reservation
      const reservation = await Reservation.create(req.body);

      // Update the associated car's isPublish field to true
      await Car.findByIdAndUpdate(carId, { isPublish: true });

      // Get car information
      const carInfo = await Car.findById(carId);

      // Retrieve the user's email based on the userId
      const user = await Users.findById(userId); // Assuming you have a User model

      if (user) {
        const userEmail = user.email;
        // Calculate total price based on pricePerDay and rented days
        const rentedDays =
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
        const totalPrice = carInfo.pricePerDay * rentedDays;

        // console.log("price per day", carInfo.pricePerDay);
        // console.log("rentedDays", rentedDays);
        // console.log("totalprice", totalPrice);
        // Send an email with car information and total price to the user
        sendEmail(
          `${carInfo.brand} ${carInfo.model} ${carInfo.year} (Plate Number: ${carInfo.plateNumber})`,
          rentedDays,
          totalPrice,
          userEmail // Replace with the user's email address
        );
        res.status(201).send({
          error: false,
          reservation,
        });
      }
    }
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */

    const data = await Reservation.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */

    const data = await Reservation.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await Reservation.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */

    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
