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

const indexRoutes =
    require("./routes/index");

const shopRoutes =
    require("./routes/shop");

const productRoutes =
    require("./routes/products");
const cartRoutes =
    require("./routes/cart");    
const checkoutRoutes =
    require("./routes/checkout");

app.use(
    "/",
    indexRoutes
);

app.use(
    "/shop",
    shopRoutes
);

app.use(
    "/products",
    productRoutes
);
app.use(
    "/cart",
    cartRoutes
);
app.use(
    "/checkout",
    checkoutRoutes
);
// ==========================================
// 404
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