const express = require("express");

const router = express.Router();


// ==========================================
// CHECKOUT PAGE
// ==========================================

router.get("/", (req, res) => {

    res.render("checkout", {

        title: "Checkout | STREETKICKS"

    });

});


module.exports = router;