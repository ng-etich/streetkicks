const express = require("express");
const router = express.Router();

const products = require("../data/products");


// ==========================================
// PRODUCT DETAILS
// ==========================================

router.get("/:id", (req, res) => {

    const productId =
        Number(req.params.id);

    const product =
        products.find(
            item => item.id === productId
        );


    // Product not found
    if (!product) {

        return res.status(404).send(
            "Product Not Found"
        );

    }


    // Related products
    const relatedProducts =
        products
            .filter(item =>
                item.id !== product.id &&
                item.category === product.category
            )
            .slice(0, 4);


    res.render("product", {

        title:
            `${product.name} | STREETKICKS`,

        product,

        relatedProducts

    });

});


module.exports = router;