/* =========================================================
   STREETKICKS DARK / LIGHT MODE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById("theme-toggle");

    if (!themeToggle) {
        console.log("STREETKICKS: Theme toggle button not found.");
        return;
    }


    /* =====================================================
       CHECK SAVED THEME
    ===================================================== */

    const savedTheme = localStorage.getItem("streetkicks-theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        themeToggle.textContent = "☀";

    } else {

        document.body.classList.remove("dark-mode");

        themeToggle.textContent = "☾";

    }


    /* =====================================================
       TOGGLE THEME
    ===================================================== */

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");


        const darkMode =
            document.body.classList.contains("dark-mode");


        if (darkMode) {

            localStorage.setItem(
                "streetkicks-theme",
                "dark"
            );

            themeToggle.textContent = "☀";

        } else {

            localStorage.setItem(
                "streetkicks-theme",
                "light"
            );

            themeToggle.textContent = "☾";

        }

    });

});