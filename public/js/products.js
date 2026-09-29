document.addEventListener("DOMContentLoaded", () => {

    document
        .querySelectorAll(".quick-add")
        .forEach(button => {

            button.addEventListener("click", () => {

                const productId =
                    Number(button.dataset.productId);

                console.log(
                    `Product ${productId} selected`
                );

            });

        });

});