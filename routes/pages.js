const express = require("express");

const router = express.Router();


// ==========================================
// ABOUT US
// ==========================================

router.get("/about", (req, res) => {
    res.render("about", {
        title: "About Us | STREETKICKS"
    });
});


// ==========================================
// CONTACT US
// ==========================================

router.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact Us | STREETKICKS"
    });
});


// ==========================================
// DELIVERY
// ==========================================

router.get("/delivery", (req, res) => {
    res.render("delivery", {
        title: "Delivery | STREETKICKS"
    });
});


// ==========================================
// RETURNS
// ==========================================

router.get("/returns", (req, res) => {
    res.render("returns", {
        title: "Returns | STREETKICKS"
    });
});


// ==========================================
// SIZE GUIDE
// ==========================================

router.get("/size-guide", (req, res) => {
    res.render("size-guide", {
        title: "Size Guide | STREETKICKS"
    });
});


// ==========================================
// FAQ
// ==========================================

router.get("/faq", (req, res) => {
    res.render("faq", {
        title: "FAQ | STREETKICKS"
    });
});


// ==========================================
// WISHLIST
// ==========================================

router.get("/wishlist", (req, res) => {
    res.render("wishlist", {
        title: "Wishlist | STREETKICKS"
    });
});


module.exports = router;