const express = require("express");

const router = express.Router();

const products = require("../data/products");


router.get("/", (req, res) => {

    // Find the first product for each category
    const menProduct = products.find(
        product =>
            product.category &&
            product.category.toLowerCase() === "men"
    );

    const womenProduct = products.find(
        product =>
            product.category &&
            product.category.toLowerCase() === "women"
    );

    const kidsProduct = products.find(
        product =>
            product.category &&
            product.category.toLowerCase() === "kids"
    );

    // Find the first LIMITED product
    const limitedProduct = products.find(
        product =>
            product.badge &&
            product.badge.toLowerCase() === "limited"
    );


    res.render("home", {

        title: "STREETKICKS | Step Into Your Style",

        products: products,

        categoryImages: {

            men: menProduct
                ? menProduct.image
                : "/images/sneakers/sneaker-1.jpg",

            women: womenProduct
                ? womenProduct.image
                : "/images/sneakers/sneaker-3.jpg",

            kids: kidsProduct
                ? kidsProduct.image
                : "/images/sneakers/sneaker-8.jpg",

            limited: limitedProduct
                ? limitedProduct.image
                : "/images/sneakers/sneaker-7.jpg"

        }

    });

});


module.exports = router;