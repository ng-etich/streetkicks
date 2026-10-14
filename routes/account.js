const express = require("express");

const router = express.Router();


// ==========================================
// MY ACCOUNT / PROFILE
// ==========================================

router.get("/", (req, res) => {
    res.render("account/profile", {
        title: "My Account | STREETKICKS"
    });
});


// ==========================================
// MY ORDERS
// ==========================================

router.get("/orders", (req, res) => {
    res.render("account/orders", {
        title: "My Orders | STREETKICKS"
    });
});


// ==========================================
// ORDER DETAILS
// ==========================================

router.get("/order-details", (req, res) => {
    res.render("account/order-details", {
        title: "Order Details | STREETKICKS"
    });
});


// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;