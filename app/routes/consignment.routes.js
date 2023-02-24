module.exports = app => {
    const consignment = require("../controllers/consignment.controller.js");

    let router = require("express").Router();

    // Create a new Tutorial
    router.post("/", consignment.create);

    // Retrieve all Tutorials
    router.get("/", consignment.findAll);

    // Retrieve all published Tutorials
    router.get("/published", consignment.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", consignment.findOne);

    // Update a Tutorial with id
    router.put("/:id", consignment.update);

    // Delete a Tutorial with id
    router.delete("/:id", consignment.delete);

    // Delete all Tutorials
    router.delete("/", consignment.deleteAll);

    app.use('/api/consignment', router);
};
