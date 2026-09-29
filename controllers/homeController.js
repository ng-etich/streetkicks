const products = require("../data/products");

exports.getHome = (req, res) => {

    res.render("home", {
        title: "STREETKICKS | Step Into Your Style",
        products: products
    });

};