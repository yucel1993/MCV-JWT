"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Passengers Controller:

const Passengers = require("../models/passenger");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Passengers"]
            #swagger.summary = "List Passengers"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    const data = await res.getModelList(Passengers);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Passengers),
      data,
    });
  },

  create: async (req, res) => {
    //* If you want to add default value inside of the body
    //* then use this
    //* req.body.createdId = req.user._id
    //* but you have to add in every create model
    /*
            #swagger.tags = ["Passengers"]
            #swagger.summary = "Create Passengers"
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

    const data = await Passengers.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Passengers"]
            #swagger.summary = "Get Single Passengers"
        */

    const data = await Passengers.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Passengers"]
            #swagger.summary = "Update Passengers"
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

    const data = await Passengers.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await Passengers.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Passengers"]
            #swagger.summary = "Delete Passengers"
        */

    const data = await Passengers.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
