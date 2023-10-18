"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Reservation Controller:

const Reservation = require("../models/reservation");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Reservation"]
            #swagger.summary = "List Reservation"
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

  // Addpassengers to passenger.reservations:
  pushPassenger: async (req, res) => {
    /*
        #swagger.tags = ["passenger"]
        #swagger.summary = "Addpassengers to Pizza"
    */

    const passenger = req.body?.passengers; // ObjectId or [ ObjectIds ]

    // const data = await Pizza.findOne({ _id: req.params.id })
    // data.passengers.push(passengers)
    // await data.save()
    const data = await passenger.updateOne(
      { _id: req.params.id },
      { $push: { passengers: passengers } }
    );
    const newData = await Reservation.findOne({ _id: req.params.id }).populate(
      "passengers"
    );

    res.status(202).send({
      error: false,
      data,
      passengersCount: newData.passengers.length,
      new: newData,
    });
  },

  pullPassenger: async (req, res) => {
    /*
        #swagger.tags = ["passenger"]
        #swagger.summary = "Removepassengers from Pizza"
    */

    constpassengers = req.body?.passengers; // ObjectId

    // const data = await Pizza.findOne({ _id: req.params.id })
    // data.passengers.pull(passengers)
    // await data.save()
    const data = await Pizza.updateOne(
      { _id: req.params.id },
      { $pull: { passengers: passengers } }
    );
    const newData = await Pizza.findOne({ _id: req.params.id }).populate(
      "passengers"
    );

    res.status(202).send({
      error: false,
      data,
      passengersCount: newData.passengers.length,
      new: newData,
    });
  },
};
