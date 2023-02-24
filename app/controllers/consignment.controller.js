const db = require("../models");
const Consignment = db.consignments;
const {v4: uuidv4} = require('uuid');

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.item) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // Create a Consignment
    const consignment = new Consignment({
        _id: uuidv4(),
        item: req.body.item,
        sku: req.body.sku,
        item_size: req.body.item_size,
        asking_price: req.body.asking_price,
        listing_price: req.body.listing_price,
        selling_price: req.body.selling_price,
        merchant: req.body.merchant,
        vendor: req.body.vendor,
        venue: req.body.venue,
        status: req.body.status,
        terms: req.body.terms,
        terms_agreed: req.body.terms_agreed ? req.body.terms_agreed : false,
    })
    consignment
        .save(consignment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Consignment."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const search = req.query.search;
    let condition = search ? {item: {$regex: new RegExp(search), $options: "i"}} || {
        sku: {
            $regex: new RegExp(search),
            $options: "i"
        }
    } || {merchant: {$regex: new RegExp(search), $options: "i"}} || {
        vendor: {
            $regex: new RegExp(search),
            $options: "i"
        }
    } : {};

    Consignment.find(condition)
        .then(data => {
            console.log(data)
            res.send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving consignments."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Consignment.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Consignment with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Consignment with id=" + id});
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Consignment.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Consignment with id=${id}. Maybe Consignment was not found!`
                });
            } else res.send({message: "Consignment was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Consignment with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Consignment.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Consignment with id=${id}. Maybe Tutorial was not found!`
                });
            } else {
                res.send({
                    message: "Consignment was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Consignment with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};
