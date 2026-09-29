const express = require("express");
const router = express.Router();

const products = require("../data/products");

router.get("/", (req, res) => {

    res.render("home", {

        title: "STREETKICKS | Step Into Your Style",

        products: products

    });

});

module.exports = router;