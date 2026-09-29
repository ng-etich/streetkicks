document.addEventListener("DOMContentLoaded", () => {

    console.log("STREETKICKS loaded successfully.");

    // Mobile menu
    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const closeMobileMenu =
        document.getElementById("closeMobileMenu");

    const mobileMenuOverlay =
        document.getElementById("mobileMenuOverlay");


    function openMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("active");

        mobileMenuOverlay.classList.add("active");

        document.body.classList.add("menu-open");

    }


    function closeMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("active");

        mobileMenuOverlay.classList.remove("active");

        document.body.classList.remove("menu-open");

    }


    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            openMobileMenu
        );

    }


    if (closeMobileMenu) {

        closeMobileMenu.addEventListener(
            "click",
            closeMenu
        );

    }


    if (mobileMenuOverlay) {

        mobileMenuOverlay.addEventListener(
            "click",
            closeMenu
        );

    }


    // Search
    const searchButton =
        document.getElementById("searchButton");

    const searchOverlay =
        document.getElementById("searchOverlay");

    const closeSearch =
        document.getElementById("closeSearch");


    if (searchButton && searchOverlay) {

        searchButton.addEventListener("click", () => {

            searchOverlay.classList.add("active");

            const input =
                searchOverlay.querySelector("input");

            if (input) {
                setTimeout(() => input.focus(), 200);
            }

        });

    }


    if (closeSearch && searchOverlay) {

        closeSearch.addEventListener("click", () => {

            searchOverlay.classList.remove("active");

        });

    }


    // Close search with Escape
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (searchOverlay) {
                searchOverlay.classList.remove("active");
            }

            closeMenu();

        }

    });

});