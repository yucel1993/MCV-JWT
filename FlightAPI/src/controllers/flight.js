"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Flights Controller:

const Flights = require("../models/flight");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Flights"]
            #swagger.summary = "List Flights"
           
            `
        */

    const data = await res.getModelList(Flights);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Flights),
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Flights"]
            #swagger.summary = "Create Flight"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                }
            }
        */

    const data = await Flights.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Flights"]
            #swagger.summary = "Get Single Flights"
        */

    const data = await Flights.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Flights"]
            #swagger.summary = "Update Flight"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                }
            }
        */

    const data = await Flights.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await Flights.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Flights"]
            #swagger.summary = "Delete Flights"
        */

    const data = await Flights.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
