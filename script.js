// Rotor Animation
const wordRotator = document.querySelector('.word-rotator');
const words = document.querySelectorAll('.word-rotator b');
let index = 0;

function updateRotatorWidth() {
    if (words.length > 0 && wordRotator) {
        const activeWord = words[index];
        const textWidth = activeWord.offsetWidth;
        wordRotator.style.width = `${textWidth}px`;
    }
}

if (words.length > 0) {
    // Set initial width
    updateRotatorWidth();

    // Re-align on window resize or when fonts are fully loaded
    window.addEventListener('resize', updateRotatorWidth);
    if (document.fonts) {
        document.fonts.ready.then(updateRotatorWidth);
    }

    setInterval(() => {
        words[index].classList.remove('is-visible');
        words[index].classList.add('is-hidden');

        index = (index + 1) % words.length;

        words[index].classList.remove('is-hidden');
        words[index].classList.add('is-visible');

        updateRotatorWidth();
    }, 2000);
}

// Scroll Progress Indicator
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
        progressBar.style.width = progress + "%";
    }
});

// Page Transitions Logic
function initPageTransitions() {
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    mainElement.classList.add("page-loaded");

    const links = document.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");

            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
                return;
            }

            if (!href ||
                href.startsWith("#") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                link.target === "_blank" ||
                link.hasAttribute("download")) {
                return;
            }

            if (link.hostname && link.hostname !== window.location.hostname) {
                return;
            }

            e.preventDefault();
            mainElement.classList.add("page-exit");

            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPageTransitions);
} else {
    initPageTransitions();
}

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        const mainElement = document.querySelector("main");
        if (mainElement) {
            mainElement.classList.remove("page-exit");
            mainElement.classList.add("page-loaded");
        }
    }
});


