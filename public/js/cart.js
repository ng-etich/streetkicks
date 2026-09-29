// ==========================================
// STREETKICKS CART
// ==========================================

const CART_KEY = "streetkicks_cart";


// ==========================================
// GET CART
// ==========================================

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(CART_KEY)
        ) || [];

    } catch (error) {

        console.error(
            "Unable to load cart:",
            error
        );

        return [];

    }

}


// ==========================================
// SAVE CART
// ==========================================

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();

}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(product, quantity = 1, size) {

    if (!product || !size) {
        return false;
    }


    const cart = getCart();


    const existingItem = cart.find(item =>
        Number(item.id) === Number(product.id) &&
        Number(item.size) === Number(size)
    );


    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: Number(product.price),

            image: product.image,

            category: product.category,

            size: Number(size),

            quantity: Number(quantity)

        });

    }


    saveCart(cart);

    return true;

}


// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(id, size) {

    let cart = getCart();


    cart = cart.filter(item =>
        !(
            Number(item.id) === Number(id) &&
            Number(item.size) === Number(size)
        )
    );


    saveCart(cart);

    renderCart();

}


// ==========================================
// UPDATE QUANTITY
// ==========================================

function updateCartQuantity(
    id,
    size,
    quantity
) {

    const cart = getCart();


    const item = cart.find(item =>
        Number(item.id) === Number(id) &&
        Number(item.size) === Number(size)
    );


    if (!item) {
        return;
    }


    if (quantity <= 0) {

        removeFromCart(id, size);

        return;

    }


    item.quantity = quantity;

    saveCart(cart);

    renderCart();

}


// ==========================================
// CLEAR CART
// ==========================================

function clearCart() {

    localStorage.removeItem(CART_KEY);

    updateCartCount();

    renderCart();

}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const cart = getCart();


    const count = cart.reduce(
        (total, item) =>
            total + Number(item.quantity),
        0
    );


    document
        .querySelectorAll(".cart-count")
        .forEach(element => {

            element.textContent = count;

            element.style.display =
                count > 0 ? "flex" : "none";

        });

}


// ==========================================
// FORMAT PRICE
// ==========================================

function formatPrice(price) {

    return Number(price).toLocaleString(
        "en-KE"
    );

}


// ==========================================
// RENDER CART
// ==========================================

function renderCart() {

    const cartContainer =
        document.getElementById(
            "cartItems"
        );


    if (!cartContainer) {
        return;
    }


    const cart = getCart();


    const emptyCart =
        document.getElementById(
            "emptyCart"
        );


    const cartContent =
        document.getElementById(
            "cartContent"
        );


    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.style.display = "flex";
        }

        if (cartContent) {
            cartContent.style.display = "none";
        }

        updateCartTotals();

        return;

    }


    if (emptyCart) {
        emptyCart.style.display = "none";
    }

    if (cartContent) {
        cartContent.style.display = "grid";
    }


    cartContainer.innerHTML = "";


    cart.forEach(item => {

        const itemTotal =
            Number(item.price) *
            Number(item.quantity);


        const cartItem =
            document.createElement("article");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="cart-item-details">

                <span class="cart-item-category">
                    ${item.category || "Sneakers"}
                </span>

                <h3>
                    ${item.name}
                </h3>

                <p class="cart-item-size">
                    Size: ${item.size}
                </p>

                <button
                    type="button"
                    class="remove-cart-item"
                    data-id="${item.id}"
                    data-size="${item.size}"
                >
                    Remove
                </button>

            </div>


            <div class="cart-item-price">

                KES ${formatPrice(item.price)}

            </div>


            <div class="cart-item-quantity">

                <button
                    type="button"
                    class="cart-quantity-btn"
                    data-action="decrease"
                    data-id="${item.id}"
                    data-size="${item.size}"
                >
                    −
                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    type="button"
                    class="cart-quantity-btn"
                    data-action="increase"
                    data-id="${item.id}"
                    data-size="${item.size}"
                >
                    +
                </button>

            </div>


            <div class="cart-item-total">

                KES ${formatPrice(itemTotal)}

            </div>

        `;


        cartContainer.appendChild(
            cartItem
        );

    });


    attachCartEvents();

    updateCartTotals();

}


// ==========================================
// CART EVENTS
// ==========================================

function attachCartEvents() {


    document
        .querySelectorAll(".remove-cart-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeFromCart(
                        button.dataset.id,
                        button.dataset.size
                    );

                }
            );

        });


    document
        .querySelectorAll(".cart-quantity-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.id;

                    const size =
                        button.dataset.size;

                    const action =
                        button.dataset.action;


                    const cart = getCart();


                    const item = cart.find(item =>
                        Number(item.id) === Number(id) &&
                        Number(item.size) === Number(size)
                    );


                    if (!item) {
                        return;
                    }


                    let newQuantity =
                        Number(item.quantity);


                    if (action === "increase") {
                        newQuantity++;
                    }


                    if (action === "decrease") {
                        newQuantity--;
                    }


                    updateCartQuantity(
                        id,
                        size,
                        newQuantity
                    );

                }
            );

        });

}


// ==========================================
// CART TOTALS
// ==========================================

function updateCartTotals() {

    const cart = getCart();


    const subtotal =
        cart.reduce(
            (total, item) =>
                total +
                (
                    Number(item.price) *
                    Number(item.quantity)
                ),
            0
        );


    // Free delivery above KES 10,000
    const delivery =
        subtotal === 0
            ? 0
            : subtotal >= 10000
                ? 0
                : 300;


    const total =
        subtotal + delivery;


    const subtotalElement =
        document.getElementById(
            "cartSubtotal"
        );


    const deliveryElement =
        document.getElementById(
            "cartDelivery"
        );


    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            `KES ${formatPrice(subtotal)}`;

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            delivery === 0
                ? "FREE"
                : `KES ${formatPrice(delivery)}`;

    }


    if (totalElement) {

        totalElement.textContent =
            `KES ${formatPrice(total)}`;

    }

}


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

        renderCart();

    }
);