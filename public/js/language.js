const translations = {

    en: {

        home: "Home",
        shop: "Shop",
        newArrivals: "New Arrivals",
        collections: "Collections",
        deals: "Deals",

        login: "Login",
        wishlist: "Wishlist",

        heroTitle: "STEP INTO YOUR STYLE.",

        heroDescription:
            "Discover the latest sneakers made for the streets. Fresh kicks. Bold style. Your move.",

        shopNow: "SHOP NOW",
        explore: "EXPLORE",

        shopByCategory: "Shop By Category",
        trending: "Trending Sneakers",

        quickAdd: "Quick Add",

        newsletterTitle:
            "Never Miss a Drop.",

        newsletterText:
            "Get the latest sneaker drops, exclusive deals and streetwear news straight to your inbox.",

        subscribe: "Subscribe",

        searchPlaceholder:
            "Search sneakers...",

        emailPlaceholder:
            "Enter your email address"

    },


    sw: {

        home: "Nyumbani",
        shop: "Duka",
        newArrivals: "Bidhaa Mpya",
        collections: "Mikusanyiko",
        deals: "Ofa",

        login: "Ingia",
        wishlist: "Vipendwa",

        heroTitle: "INGIA KWENYE MTINDO WAKO.",

        heroDescription:
            "Gundua sneakers mpya zilizotengenezwa kwa ajili ya mitaani. Mtindo mpya. Muonekano wa kipekee.",

        shopNow: "NUNUA SASA",
        explore: "CHUNGUZA",

        shopByCategory: "Nunua Kwa Kategoria",
        trending: "Sneakers Zinazopendwa",

        quickAdd: "Ongeza",

        newsletterTitle:
            "Usikose Toleo Jipya.",

        newsletterText:
            "Pata habari kuhusu sneakers mpya, ofa maalum na streetwear moja kwa moja kwenye barua pepe yako.",

        subscribe: "Jiunge",

        searchPlaceholder:
            "Tafuta sneakers...",

        emailPlaceholder:
            "Ingiza barua pepe yako"

    },


    fr: {

        home: "Accueil",
        shop: "Boutique",
        newArrivals: "Nouveautés",
        collections: "Collections",
        deals: "Offres",

        login: "Connexion",
        wishlist: "Favoris",

        heroTitle:
            "ENTREZ DANS VOTRE STYLE.",

        heroDescription:
            "Découvrez les dernières sneakers conçues pour la rue. Style audacieux. Votre mouvement.",

        shopNow: "ACHETER",
        explore: "EXPLORER",

        shopByCategory:
            "Acheter par catégorie",

        trending:
            "Sneakers tendance",

        quickAdd:
            "Ajouter",

        newsletterTitle:
            "Ne manquez aucune nouveauté.",

        newsletterText:
            "Recevez les dernières sorties, offres exclusives et actualités streetwear directement dans votre boîte mail.",

        subscribe:
            "S'abonner",

        searchPlaceholder:
            "Rechercher des sneakers...",

        emailPlaceholder:
            "Entrez votre adresse e-mail"

    }

};


document.addEventListener("DOMContentLoaded", () => {

    const languageButton =
        document.getElementById("languageButton");

    const languageMenu =
        document.getElementById("languageMenu");

    const currentLanguage =
        document.getElementById("currentLanguage");


    languageButton?.addEventListener("click", () => {

        languageMenu?.classList.toggle("active");

    });


    document
        .querySelectorAll("[data-language]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const language =
                    button.dataset.language;

                changeLanguage(language);

            });

        });


    const savedLanguage =
        localStorage.getItem("streetkicks-language") || "en";

    changeLanguage(savedLanguage);

});


function changeLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }


    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            if (translations[language][key]) {

                element.textContent =
                    translations[language][key];

            }

        });


    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.dataset.i18nPlaceholder;

            if (translations[language][key]) {

                element.placeholder =
                    translations[language][key];

            }

        });


    const currentLanguage =
        document.getElementById("currentLanguage");


    if (currentLanguage) {

        currentLanguage.textContent =
            language.toUpperCase();

    }


    localStorage.setItem(
        "streetkicks-language",
        language
    );


    document
        .getElementById("languageMenu")
        ?.classList.remove("active");

}