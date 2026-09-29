let wishlist =
    JSON.parse(
        localStorage.getItem("streetkicks-wishlist")
    ) || [];


function saveWishlist() {

    localStorage.setItem(
        "streetkicks-wishlist",
        JSON.stringify(wishlist)
    );

}


function toggleWishlist(productId) {

    const index =
        wishlist.indexOf(productId);


    if (index === -1) {

        wishlist.push(productId);

    } else {

        wishlist.splice(index, 1);

    }


    saveWishlist();

}


function isInWishlist(productId) {

    return wishlist.includes(productId);

}


document.addEventListener("DOMContentLoaded", () => {

    document
        .querySelectorAll(".wishlist-button")
        .forEach(button => {

            const productId =
                Number(button.dataset.productId);


            if (isInWishlist(productId)) {

                button.classList.add("active");

            }


            button.addEventListener("click", event => {

                event.preventDefault();

                toggleWishlist(productId);

                button.classList.toggle("active");

            });

        });

});