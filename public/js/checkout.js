// ==========================================
// STREETKICKS CHECKOUT
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCheckout();

        setupCheckoutForm();

        setupPaymentMethods();

    }
);


// ==========================================
// FORMAT PRICE
// ==========================================

function checkoutFormatPrice(price) {

    return Number(price).toLocaleString(
        "en-KE"
    );

}


// ==========================================
// RENDER CHECKOUT
// ==========================================

function renderCheckout() {

    const container =
        document.getElementById(
            "checkoutItems"
        );


    if (!container) {
        return;
    }


    const cart = getCart();


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="checkout-empty">

                <i data-lucide="shopping-bag"></i>

                <p>
                    Your cart is empty.
                </p>

                <a href="/shop">
                    Continue Shopping
                </a>

            </div>

        `;

        updateCheckoutTotals(
            0,
            0
        );

        lucide.createIcons();

        return;

    }


    container.innerHTML = "";


    cart.forEach(item => {

        const itemTotal =
            Number(item.price) *
            Number(item.quantity);


        const itemElement =
            document.createElement("div");


        itemElement.className =
            "checkout-item";


        itemElement.innerHTML = `

            <div class="checkout-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <span class="checkout-item-quantity">
                    ${item.quantity}
                </span>

            </div>


            <div class="checkout-item-details">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Size ${item.size}
                </p>

            </div>


            <strong class="checkout-item-price">

                KES
                ${checkoutFormatPrice(itemTotal)}

            </strong>

        `;


        container.appendChild(
            itemElement
        );

    });


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


    const delivery =
        subtotal === 0
            ? 0
            : subtotal >= 10000
                ? 0
                : 300;


    updateCheckoutTotals(
        subtotal,
        delivery
    );

}


// ==========================================
// UPDATE TOTALS
// ==========================================

function updateCheckoutTotals(
    subtotal,
    delivery
) {

    const total =
        subtotal + delivery;


    const subtotalElement =
        document.getElementById(
            "checkoutSubtotal"
        );


    const deliveryElement =
        document.getElementById(
            "checkoutDelivery"
        );


    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            `KES ${checkoutFormatPrice(subtotal)}`;

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            delivery === 0
                ? "FREE"
                : `KES ${checkoutFormatPrice(delivery)}`;

    }


    if (totalElement) {

        totalElement.textContent =
            `KES ${checkoutFormatPrice(total)}`;

    }

}


// ==========================================
// PAYMENT METHODS
// ==========================================

function setupPaymentMethods() {

    const paymentOptions =
        document.querySelectorAll(
            ".payment-option"
        );


    paymentOptions.forEach(option => {

        option.addEventListener(
            "click",
            () => {

                paymentOptions.forEach(item => {

                    item.classList.remove(
                        "selected"
                    );

                });


                option.classList.add(
                    "selected"
                );

            }
        );

    });


    const checkedPayment =
        document.querySelector(
            ".payment-option input:checked"
        );


    if (checkedPayment) {

        checkedPayment
            .closest(".payment-option")
            .classList.add("selected");

    }

}


// ==========================================
// FORM VALIDATION
// ==========================================

function setupCheckoutForm() {

    const form =
        document.getElementById(
            "checkoutForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const cart = getCart();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add a sneaker before checkout."
                );

                window.location.href =
                    "/shop";

                return;

            }


            let isValid = true;


            // Remove old errors

            form
                .querySelectorAll(
                    ".form-field"
                )
                .forEach(field => {

                    field.classList.remove(
                        "has-error"
                    );

                });


            // Validate required fields

            form
                .querySelectorAll(
                    "[required]"
                )
                .forEach(input => {

                    if (
                        input.type === "checkbox"
                        &&
                        !input.checked
                    ) {

                        isValid = false;

                        input
                            .closest(
                                ".terms-checkbox"
                            )
                            .classList.add(
                                "has-error"
                            );

                        return;

                    }


                    if (
                        input.type !== "checkbox"
                        &&
                        !input.value.trim()
                    ) {

                        isValid = false;

                        input
                            .closest(
                                ".form-field"
                            )
                            .classList.add(
                                "has-error"
                            );

                    }

                });


            // Validate email

            const email =
                document.getElementById(
                    "email"
                );


            if (
                email.value &&
                !isValidEmail(email.value)
            ) {

                isValid = false;

                email
                    .closest(".form-field")
                    .classList.add(
                        "has-error"
                    );

            }


            // Validate phone

            const phone =
                document.getElementById(
                    "phone"
                );


            if (
                phone.value &&
                !isValidPhone(phone.value)
            ) {

                isValid = false;

                phone
                    .closest(".form-field")
                    .classList.add(
                        "has-error"
                    );

            }


            if (!isValid) {

                const firstError =
                    form.querySelector(
                        ".has-error"
                    );


                if (firstError) {

                    firstError.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

                return;

            }


            // Get payment method

            const payment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            const paymentMethod =
                payment
                    ? payment.value
                    : "mpesa";


            // Prepare order

            const order = {

                orderNumber:
                    generateOrderNumber(),

                customer: {

                    name:
                        document.getElementById(
                            "fullName"
                        ).value.trim(),

                    email:
                        email.value.trim(),

                    phone:
                        phone.value.trim()

                },

                delivery: {

                    county:
                        document.getElementById(
                            "county"
                        ).value,

                    town:
                        document.getElementById(
                            "town"
                        ).value.trim(),

                    address:
                        document.getElementById(
                            "address"
                        ).value.trim(),

                    instructions:
                        document.getElementById(
                            "instructions"
                        ).value.trim()

                },

                payment:
                    paymentMethod,

                items:
                    cart,

                createdAt:
                    new Date().toISOString()

            };


            localStorage.setItem(
                "streetkicks_pending_order",
                JSON.stringify(order)
            );


            /*
             * For now this is a frontend order flow.
             * Payment gateway integration will be
             * connected later.
             */

            showOrderSuccess(
                order.orderNumber
            );

        }
    );

}


// ==========================================
// EMAIL VALIDATION
// ==========================================

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


// ==========================================
// PHONE VALIDATION
// ==========================================

function isValidPhone(phone) {

    const cleaned =
        phone.replace(/\s+/g, "");


    return /^(?:\+254|0)(7|1)\d{8}$/
        .test(cleaned);

}


// ==========================================
// ORDER NUMBER
// ==========================================

function generateOrderNumber() {

    const random =
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    return `SK-${random}`;

}


// ==========================================
// SUCCESS MESSAGE
// ==========================================

function showOrderSuccess(
    orderNumber
) {

    const page =
        document.querySelector(
            ".checkout-page"
        );


    if (!page) {
        return;
    }


    page.innerHTML = `

        <section class="order-success">

            <div class="success-icon">

                <i data-lucide="check"></i>

            </div>


            <span class="section-label">
                STREETKICKS
            </span>


            <h1>
                ORDER RECEIVED
            </h1>


            <p>
                Thank you for shopping with
                StreetKicks.
            </p>


            <div class="success-order-number">

                <span>
                    ORDER NUMBER
                </span>

                <strong>
                    ${orderNumber}
                </strong>

            </div>


            <p class="success-note">

                Your order details have been
                recorded. Payment processing
                will be connected to the
                selected payment method.

            </p>


            <div class="success-actions">

                <a
                    href="/shop"
                    class="btn btn-primary"
                >
                    CONTINUE SHOPPING
                </a>

                <a
                    href="/"
                    class="success-home-link"
                >
                    Back to Home
                </a>

            </div>

        </section>

    `;


    // Clear cart after successful order

    localStorage.removeItem(
        "streetkicks_cart"
    );


    updateCartCount();


    lucide.createIcons();

}