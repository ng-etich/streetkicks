const express = require("express");

const router = express.Router();


// ==========================================
// CART PAGE
// ==========================================

router.get("/", (req, res) => {

    res.render("cart", {

        title: "Your Cart | STREETKICKS"

    });

});


module.exports = router;