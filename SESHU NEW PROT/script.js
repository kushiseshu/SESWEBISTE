/* =========================================================
   DOM ELEMENTS
========================================================= */

const body = document.body;

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const themeToggle = document.getElementById("themeToggle");

const backToTop = document.getElementById("backToTop");

const currentYear = document.getElementById("currentYear");

const certificateModal =
    document.getElementById("certificateModal");

const modalCertificateImage =
    document.getElementById("modalCertificateImage");

const modalCertificateTitle =
    document.getElementById("modalCertificateTitle");

const modalClose =
    document.getElementById("modalClose");

const certificateCards =
    document.querySelectorAll(".certificate-card");


/* =========================================================
   TYPING ANIMATION
========================================================= */

if (
    document.getElementById("typing-text") &&
    typeof Typed !== "undefined"
) {

    new Typed("#typing-text", {

        strings: [
            "Web Developer",
            "Frontend Developer",
            "Computer Science Graduate",
            "Creative Developer"
        ],

        typeSpeed: 70,

        backSpeed: 45,

        backDelay: 1600,

        loop: true,

        smartBackspace: true

    });

}


/* =========================================================
   AOS INITIALIZATION
========================================================= */

if (typeof AOS !== "undefined") {

    AOS.init({

        duration: 700,

        once: true,

        offset: 70,

        easing: "ease-out-cubic"

    });

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function openMenu() {

    if (!navMenu || !menuToggle) return;

    navMenu.classList.add("active");

    body.classList.add("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    menuToggle.innerHTML =
        '<i class="bi bi-x-lg"></i>';

}


function closeMenu() {

    if (!navMenu || !menuToggle) return;

    navMenu.classList.remove("active");

    body.classList.remove("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    menuToggle.innerHTML =
        '<i class="bi bi-list"></i>';

}


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.contains("active");

        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    });


    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    document.addEventListener("click", (event) => {

        const clickedInsideNav =
            navMenu.contains(event.target) ||
            menuToggle.contains(event.target);

        if (
            navMenu.classList.contains("active") &&
            !clickedInsideNav
        ) {

            closeMenu();

        }

    });

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 150;

    let currentSection = "home";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
            sectionTop + sectionHeight
        ) {

            currentSection = sectionId;

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateActiveNav
);

updateActiveNav();


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    body.classList.add("light-mode");

}


function updateThemeIcon() {

    if (!themeToggle) return;


    if (
        body.classList.contains("light-mode")
    ) {

        themeToggle.innerHTML =
            '<i class="bi bi-sun-fill"></i>';

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    } else {

        themeToggle.innerHTML =
            '<i class="bi bi-moon-stars-fill"></i>';

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    }

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "light-mode"
            );

            const isLight =
                body.classList.contains(
                    "light-mode"
                );

            localStorage.setItem(
                "portfolio-theme",
                isLight ? "light" : "dark"
            );

            updateThemeIcon();

        }
    );

}

updateThemeIcon();


/* =========================================================
   BACK TO TOP
========================================================= */

function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);

updateBackToTop();


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   CERTIFICATE MODAL
========================================================= */

function openCertificate(image, title) {

    if (
        !certificateModal ||
        !modalCertificateImage ||
        !modalCertificateTitle
    ) {

        return;

    }


    modalCertificateImage.src = image;

    modalCertificateImage.alt = title;

    modalCertificateTitle.textContent = title;


    certificateModal.classList.add(
        "active"
    );

    certificateModal.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add(
        "modal-open"
    );

}


function closeCertificate() {

    if (!certificateModal) return;


    certificateModal.classList.remove(
        "active"
    );

    certificateModal.setAttribute(
        "aria-hidden",
        "true"
    );

    body.classList.remove(
        "modal-open"
    );


    if (modalCertificateImage) {

        modalCertificateImage.src = "";

    }

}


/* =========================================================
   CERTIFICATE CARDS
========================================================= */

certificateCards.forEach((card) => {

    const image =
        card.getAttribute(
            "data-certificate"
        );

    const title =
        card.getAttribute(
            "data-title"
        );


    if (!image || !title) return;


    card.addEventListener(
        "click",
        () => {

            openCertificate(
                image,
                title
            );

        }
    );


    card.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openCertificate(
                    image,
                    title
                );

            }

        }
    );

});


/* =========================================================
   MODAL CLOSE BUTTON
========================================================= */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeCertificate
    );

}


/* =========================================================
   CLOSE MODAL BY CLICKING BACKDROP
========================================================= */

if (certificateModal) {

    certificateModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                certificateModal
            ) {

                closeCertificate();

            }

        }
    );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") return;


        if (
            certificateModal &&
            certificateModal.classList.contains(
                "active"
            )
        ) {

            closeCertificate();

        }


        if (
            navMenu &&
            navMenu.classList.contains(
                "active"
            )
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document
    .querySelectorAll("img")
    .forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity = "0.4";

            }
        );

    });


/* =========================================================
   PREVENT EMPTY HASH LINKS
========================================================= */

document
    .querySelectorAll('a[href="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

            }
        );

    });


/* =========================================================
   CLOSE MENU WHEN RESIZING TO DESKTOP
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 800 &&
            navMenu &&
            navMenu.classList.contains("active")
        ) {

            closeMenu();

        }

    }
);