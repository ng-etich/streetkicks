const express = require("express");

const router = express.Router();

const products = require("../data/products");


router.get("/", (req, res) => {

    let filteredProducts = [...products];

    const {
        search,
        category,
        sort
    } = req.query;


    // =========================================
    // SEARCH
    // =========================================

    if (search) {

        const searchTerm =
            search.toLowerCase().trim();

        filteredProducts =
            filteredProducts.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                product.category
                    .toLowerCase()
                    .includes(searchTerm)

            );
    }


    // =========================================
    // CATEGORY / NAVIGATION FILTER
    // =========================================

    if (category) {

        const selectedCategory =
            category.toLowerCase().trim();


        // ALL PRODUCTS
        if (selectedCategory === "all") {

            filteredProducts = [...products];

        }


        // NEW ARRIVALS
        else if (selectedCategory === "new") {

            filteredProducts =
                filteredProducts.filter(product =>

                    product.badge &&
                    product.badge.toLowerCase() === "new"

                );

        }


        // DEALS / SALE
        else if (selectedCategory === "deals") {

            filteredProducts =
                filteredProducts.filter(product =>

                    product.badge &&
                    product.badge.toLowerCase() === "sale"

                );

        }


        // COLLECTIONS
        else if (selectedCategory === "collections") {

            /*
             * At the moment your products do not have
             * a separate "collection" field.
             *
             * Therefore Collections displays all
             * available sneakers.
             */

            filteredProducts = [...products];

        }


        // LIMITED EDITION
        else if (selectedCategory === "limited") {

            filteredProducts =
                filteredProducts.filter(product =>

                    product.badge &&
                    product.badge.toLowerCase() === "limited"

                );

        }


        // NORMAL PRODUCT CATEGORIES
        else {

            filteredProducts =
                filteredProducts.filter(product =>

                    product.category &&

                    product.category
                        .toLowerCase() === selectedCategory

                );

        }

    }


    // =========================================
    // SORTING
    // =========================================

    if (sort === "price-low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }

    else if (sort === "price-high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    }

    else if (sort === "name") {

        filteredProducts.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }


    // =========================================
    // RENDER SHOP
    // =========================================

    res.render("shop", {

        title: "Shop | STREETKICKS",

        products: filteredProducts,

        search: search || "",

        category: category
            ? category.toLowerCase()
            : "all",

        sort: sort || ""

    });

});


module.exports = router;