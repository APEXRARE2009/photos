let inputFile = document.querySelector('.input');
let fileLabel = document.querySelector('.input__file');

fileLabel.style.setProperty("--content", "\"select file\"");

inputFile.addEventListener("change", function () {
    if (this.files.length > 0) {
        fileLabel.textContent = this.files[0].name;
        fileLabel.style.setProperty("--content", `"${this.files[0].name}"`);
    } else {
        fileLabel.textContent = 'select file';
    }
});

let blockTime = document.querySelector(".times");

function time() {
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    blockTime.textContent = `${h}:${m}:${s}`;
}

setInterval(() => {
    time();
}, 100);

function getTextLanguage(text) {
    if (/[а-яё]/i.test(text)) {
        return "ru";
    } else {
        return "en";
    }
}

function deletePhoto(id) {
    if (confirm("delete task")) {
        fetch(`delete_photo.php?id=${id}`)
            .then(() => {
                window.location.reload();
            })
    }
}


function loadPhotos() {
    fetch("get_photos.php")
        .then((response) => response.json())
        .then((content) => {
            let gallery = document.querySelector(".photo-list");
            gallery.innerHTML = "";
            content.forEach((photo) => {
                let item = document.createElement("div");
                item.classList.add("photo-list-block");
                let commentItem = document.createElement("div");
                commentItem.textContent = photo.comment;
                commentItem.classList.add("photo-list-block-comment");
                if (getTextLanguage(commentItem.textContent) == "ru") {
                    commentItem.style.fontFamily = "comfortaa";
                } else {
                    commentItem.style.fontFamily = "Syncopate";
                }
                item.appendChild(commentItem);
                let imgItem = document.createElement("div");
                imgItem.classList.add("photo-list-block-img");
                item.appendChild(imgItem);
                let photoItem = document.createElement("img");
                photoItem.src = `./uploads/${photo.link}`;
                photoItem.classList.add("photo-list-block-img-photo");
                let deleteBtn = document.createElement("button");
                deleteBtn.classList.add("photo-list-block-btn");
                deleteBtn.addEventListener("click", () => {
                    deletePhoto(photo.id);
                })
                item.appendChild(deleteBtn);
                imgItem.appendChild(photoItem);
                gallery.appendChild(item);
            });
        });
}

loadPhotos();