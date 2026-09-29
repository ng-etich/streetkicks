document.addEventListener("DOMContentLoaded", () => {

    const themeToggle =
        document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem("streetkicks-theme");


    if (savedTheme) {

        document.documentElement.setAttribute(
            "data-theme",
            savedTheme
        );

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        themeToggle.innerHTML =
            currentTheme === "dark"
                ? '<i data-lucide="sun"></i>'
                : '<i data-lucide="moon"></i>';

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const currentTheme =
                document.documentElement.getAttribute("data-theme");

            const newTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";


            document.documentElement.setAttribute(
                "data-theme",
                newTheme
            );


            localStorage.setItem(
                "streetkicks-theme",
                newTheme
            );


            updateThemeIcon();

        });

    }

});