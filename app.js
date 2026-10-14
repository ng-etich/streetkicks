const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;


// ==========================================
// VIEW ENGINE
// ==========================================

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());


// ==========================================
// STATIC FILES
// ==========================================

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// ==========================================
// ROUTES
// ==========================================

// Home
const indexRoutes =
    require("./routes/index");

// Shop
const shopRoutes =
    require("./routes/shop");

// Products
const productRoutes =
    require("./routes/products");

// Cart
const cartRoutes =
    require("./routes/cart");

// Checkout
const checkoutRoutes =
    require("./routes/checkout");

// General pages
const pagesRoutes =
    require("./routes/pages");

// Account
const accountRoutes =
    require("./routes/account");


// ==========================================
// ROUTE MOUNTING
// ==========================================

// Home
app.use(
    "/",
    indexRoutes
);


// Shop
app.use(
    "/shop",
    shopRoutes
);


// Products
app.use(
    "/products",
    productRoutes
);


// Cart
app.use(
    "/cart",
    cartRoutes
);


// Checkout
app.use(
    "/checkout",
    checkoutRoutes
);


// General pages
// /about
// /contact
// /delivery
// /returns
// /size-guide
// /faq
// /wishlist
app.use(
    "/",
    pagesRoutes
);


// Account
// /account
// /account/orders
// /account/order-details
app.use(
    "/account",
    accountRoutes
);


// ==========================================
// 404 - PAGE NOT FOUND
// ==========================================

app.use((req, res) => {

    res.status(404).send(
        "Page Not Found"
    );

});


// ==========================================
// SERVER
// ==========================================

app.listen(PORT, () => {

    console.log(
        `STREETKICKS running on http://localhost:${PORT}`
    );

});