const express = require("express");
const router = express.Router();

const products = require("../data/products");


// ==========================================
// SHOP PAGE
// ==========================================
router.get("/", (req, res) => {

    let filteredProducts = [...products];

    const search = req.query.search || "";
    const category = req.query.category || "all";
    const sort = req.query.sort || "featured";


    // ==========================================
    // SEARCH
    // ==========================================
    if (search.trim() !== "") {

        const searchTerm = search.toLowerCase();

        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }


    // ==========================================
    // CATEGORY FILTER
    // ==========================================
    if (category.toLowerCase() !== "all") {

        filteredProducts = filteredProducts.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );
    }


    // ==========================================
    // SORTING
    // ==========================================
    if (sort === "price-low") {

        filteredProducts.sort((a, b) =>
            a.price - b.price
        );

    } else if (sort === "price-high") {

        filteredProducts.sort((a, b) =>
            b.price - a.price
        );

    } else if (sort === "name") {

        filteredProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }


    // ==========================================
    // CATEGORY INFORMATION
    // ==========================================

    const categoryData = {

        men: {
            name: "Men",
            image: "/images/categories/men.jpg",
            description: "Explore our collection of sneakers made for men."
        },

        women: {
            name: "Women",
            image: "/images/categories/women.jpg",
            description: "Discover stylish sneakers designed for women."
        },

        kids: {
            name: "Kids",
            image: "/images/categories/kids.jpg",
            description: "Fresh and comfortable sneakers for kids."
        },

        limited: {
            name: "Limited",
            image: "/images/categories/limited.jpg",
            description: "Exclusive sneakers available in limited quantities."
        }
    };


    const currentCategory =
        categoryData[category.toLowerCase()] || null;


    // ==========================================
    // RENDER SHOP PAGE
    // ==========================================

    res.render("shop", {

        title: category !== "all"
            ? `${currentCategory ? currentCategory.name : category} | STREETKICKS`
            : "Shop | STREETKICKS",

        products: filteredProducts,

        category: category,

        search: search,

        sort: sort,

        categoryData: currentCategory

    });

});


module.exports = router;