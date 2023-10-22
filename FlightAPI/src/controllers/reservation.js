"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Reservation Controller:

const Reservation = require("../models/reservation");
const Passengers = require("../models/passenger");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Reservation"]
            #swagger.summary = "List Reservation"
            #swagger.description = `
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
            #swagger.tags = ["Reservation"]
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

    /* Check ID or OBJECT for passengers */
    let passengerInfos = req.body?.passengers || [];
    let uniquePassengers = new Set(); // Use a Set to store unique passenger IDs

    for (let passengerInfo of passengerInfos) {
      Object.assign(passengerInfo, { createdId: req.user?._id });

      if (typeof passengerInfo == "object") {
        const passenger = await Passengers.findOne({
          email: passengerInfo.email,
        });
        if (!passenger) {
          const newPassenger = await Passengers.create(passengerInfo);
          uniquePassengers.add(newPassenger._id);
        } else {
          uniquePassengers.add(passenger._id);
        }
      } else {
        uniquePassengers.add(passengerInfo);
      }
    }

    /* Check ID or OBJECT for passengers */

    // Convert the Set to an array for req.body.passengers
    req.body.passengers = Array.from(uniquePassengers);

    const data = await Reservation.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Reservation"]
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
        #swagger.tags = ["Reservation"]
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
    /* schema:{
      $ref: '#/definition/Reservation'  //*You can also take this example
   }
   */

    /* Check ID or OBJECT for passengers */
    let passengerInfos = req.body?.passengers || [];
    let uniquePassengers = new Set(); // Use a Set to store unique passenger IDs

    for (let passengerInfo of passengerInfos) {
      if (typeof passengerInfo == "object") {
        const passenger = await Passengers.findOne({
          email: passengerInfo.email,
        });
        if (!passenger) {
          const newPassenger = await Passengers.create(passengerInfo);
          uniquePassengers.add(newPassenger._id);
        } else {
          uniquePassengers.add(passenger._id);
        }
      } else {
        uniquePassengers.add(passengerInfo);
      }
    }

    /* Check ID or OBJECT for passengers */

    // Convert the Set to an array for req.body.passengers
    req.body.passengers = Array.from(uniquePassengers);

    const data = await Reservation.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await Reservation.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Reservation"]
            #swagger.summary = "Delete Reservation"
        */

    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },

  passengers: async (req, res) => {
    /*
        #swagger.tags = ["Reservations"]
        #swagger.summary = "List Passengers of Reservation"
    */

    const data = await Reservation.findOne({ _id: req.params.id });
    // console.log(data.passengers)
    const passengers = await Passengers.find({ _id: { $in: data.passengers } });

    res.status(200).send({
      error: false,
      // data,
      passengers,
    });
  },
};
