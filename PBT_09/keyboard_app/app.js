const images = [
    "https://picsum.photos/id/1015/900/500",
    "https://picsum.photos/id/1025/900/500",
    "https://picsum.photos/id/1035/900/500",
    "https://picsum.photos/id/1045/900/500",
    "https://picsum.photos/id/1055/900/500"
];

const commands = [
    "Next Image",
    "Previous Image",
    "Play Slideshow",
    "Pause Slideshow",
    "Open Modal"
];

let current = 0;
let slideshow = null;

const mainImage = document.getElementById("mainImage");
const thumbs = document.getElementById("thumbs");

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");

const palette = document.getElementById("palette");
const commandInput = document.getElementById("commandInput");
const commandList = document.getElementById("commandList");

function renderImage() {
    mainImage.src = images[current];
}

renderImage();

images.forEach((img, index) => {

    const btn = document.createElement("button");

    btn.textContent = index + 1;
    btn.tabIndex = 0;
    btn.setAttribute(
        "aria-label",
        `Jump to image ${index + 1}`
    );

    btn.addEventListener("click", () => {
        current = index;
        renderImage();
    });

    thumbs.appendChild(btn);
});

function nextImage() {
    current = (current + 1) % images.length;
    renderImage();
}

function prevImage() {
    current =
        (current - 1 + images.length) %
        images.length;

    renderImage();
}

function toggleSlideshow() {

    if (slideshow) {

        clearInterval(slideshow);
        slideshow = null;

    } else {

        slideshow = setInterval(
            nextImage,
            2000
        );
    }
}

mainImage.setAttribute(
    "aria-label",
    "Main gallery image"
);

mainImage.addEventListener("click", () => {

    modal.classList.remove("hidden");
    modalImage.src = images[current];

});

function renderCommands(keyword = "") {

    commandList.innerHTML = "";

    commands
        .filter(command =>
            command
                .toLowerCase()
                .includes(
                    keyword.toLowerCase()
                )
        )
        .forEach(command => {

            const li =
                document.createElement("li");

            li.textContent = command;
            li.tabIndex = 0;

            commandList.appendChild(li);

        });
}

renderCommands();

commandInput.addEventListener(
    "input",
    e => {
        renderCommands(e.target.value);
    }
);

document.addEventListener(
    "keydown",
    e => {

        // Ctrl + K
        if (
            e.ctrlKey &&
            e.key.toLowerCase() === "k"
        ) {

            e.preventDefault();

            palette.classList.remove(
                "hidden"
            );

            commandInput.focus();
        }

        // →
        if (e.key === "ArrowRight") {
            nextImage();
        }

        // ←
        if (e.key === "ArrowLeft") {
            prevImage();
        }

        // Space
        if (e.code === "Space") {

            e.preventDefault();

            toggleSlideshow();
        }

        // 1-9
        const number =
            parseInt(e.key);

        if (
            number >= 1 &&
            number <= images.length
        ) {

            current = number - 1;
            renderImage();
        }

        // Escape
        if (e.key === "Escape") {

            modal.classList.add(
                "hidden"
            );

            palette.classList.add(
                "hidden"
            );
        }
    }
);

commandInput.addEventListener(
    "keydown",
    e => {

        if (e.key === "Enter") {

            const first =
                commandList.querySelector(
                    "li"
                );

            if (first) {

                alert(
                    "Selected: " +
                    first.textContent
                );

                palette.classList.add(
                    "hidden"
                );
            }
        }
    }
);