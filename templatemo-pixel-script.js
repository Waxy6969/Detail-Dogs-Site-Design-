const mobileToggle = document.getElementById("mobileToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
        mobileToggle.classList.toggle("active");
        mobileMenu.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileToggle.classList.remove("active");
            mobileMenu.classList.remove("active");
        });
    });
}

document.querySelectorAll(".aspect-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".aspect-btn").forEach((item) => item.classList.remove("active"));
        btn.classList.add("active");
    });
});

document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".filter-tab").forEach((item) => item.classList.remove("active"));
        tab.classList.add("active");

        const filter = tab.dataset.filter;
        document.querySelectorAll(".gallery-item").forEach((item) => {
            item.style.display = filter === "all" || item.dataset.category === filter ? "block" : "none";
        });
        document.querySelectorAll(".service-card").forEach((item) => {
            item.style.display = filter === "all" || item.dataset.category === filter ? "grid" : "none";
        });
    });
});

document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (question) {
        question.addEventListener("click", () => {
            const wasOpen = item.classList.contains("open");
            document.querySelectorAll(".faq-item").forEach((faqItem) => faqItem.classList.remove("open"));
            if (!wasOpen) item.classList.add("open");
        });
    }
});

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
        const href = this.getAttribute("href");
        const target = href ? document.querySelector(href) : null;

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

const galleryPopup = document.getElementById("galleryPopup");
const popupImage = document.getElementById("popupImage");
const popupPrompt = document.getElementById("popupPrompt");
const popupStyle = document.getElementById("popupStyle");
const popupClose = document.getElementById("popupClose");
const popupOverlay = document.querySelector(".popup-overlay");

function closePopup() {
    if (!galleryPopup) return;
    galleryPopup.classList.remove("active");
    document.body.style.overflow = "";
}

document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
        const img = item.querySelector("img");
        const prompt = item.querySelector(".item-prompt");
        const style = item.querySelector(".item-style");

        if (img && popupImage) popupImage.src = img.src;
        if (prompt && popupPrompt) popupPrompt.textContent = prompt.textContent;
        if (style && popupStyle) popupStyle.textContent = style.textContent;
        if (galleryPopup) galleryPopup.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

if (popupClose) popupClose.addEventListener("click", closePopup);
if (popupOverlay) popupOverlay.addEventListener("click", closePopup);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && galleryPopup && galleryPopup.classList.contains("active")) {
        closePopup();
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
});

document.querySelectorAll(".feature-card, .gallery-item, .price-card, .how-step").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
});
