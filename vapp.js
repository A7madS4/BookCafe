const urlParams = new URLSearchParams(window.location.search);
const q = urlParams.get("q")
console.log(urlParams)
console.log(q)
const selfLink = "https://www.googleapis.com/books/v1/volumes/" + q;
const bookCard = document.getElementById("card");
const title = document.getElementById("title");
const descP = document.getElementById("descP");
const img = document.getElementById("img");
const buy = document.getElementById("buy");
const prev = document.getElementById("prev");
const date = document.getElementById("date");
const author = document.getElementById("author");
const publer = document.getElementById("publer");
const pages = document.getElementById("pages");
axios.get(selfLink)
    .then((response) => {
        console.log(response)
        bookCard.style.display = "flex"
        const result = response.data
        const vol = result.volumeInfo
        title.innerHTML = vol.title
        // Image setting
        if (vol.imageLinks === undefined) {
            if (vol.language === "ar") {
                img.src = "404ar.png"
            }
            else {
                img.src = "404en.png"
            }
        }
        else {
            img.src = vol.imageLinks.thumbnail;
        }
        // Direction chooser
        if (vol.language === "ar") {
            bookCard.style.direction = "rtl"
        }
        else {
            bookCard.style.direction = "ltr"
        }
        // Desc setting
        if (vol.description === undefined) {
            if (vol.language === "ar") {
                descP.innerHTML = "لا يتوفر وصف لهذا الكتاب"
            }
            else {
                descP.innerHTML = "No description available for this book"
            }

        }
        else {
            descP.innerHTML = vol.description;
        }
        // Date setting
        if (vol.publishedDate === undefined) {
            date.innerHTML = ""
        }
        else {
            if (vol.language === "ar") {
                date.innerHTML = "تاريخ النشر: " + vol.publishedDate
            }
            else {
                date.innerHTML = "Published on: " + vol.publishedDate
            }
        }
        // Author setting
        if (vol.authors === undefined) {
            author.innerHTML = ""
        }
        else {
            if (vol.language === "ar") {
                author.innerHTML = "المؤلف: " + vol.authors[0]
            }
            else {
                author.innerHTML = "Author: " + vol.authors[0]
            }
        }
        // Publisher setting
        if (vol.publisher === undefined) {
            publer.innerHTML = ""
        }
        else {
            if (vol.language === "ar") {
                publer.innerHTML = "الناشر: " + vol.publisher
            }
            else {
                publer.innerHTML = "Publisher: " + vol.publisher
            }
        }
        // Page count setting
        if (vol.pageCount === undefined) {
            pages.innerHTML = ""
        }
        else {
            if (vol.language === "ar") {
                pages.innerHTML = "عدد الصفحات: " + vol.pageCount
            }
            else {
                pages.innerHTML = "Page count: " + vol.pageCount
            }
        }


    })
    .catch((error) => {
        console.log(error);
    });

