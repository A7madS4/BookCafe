const mic = document.getElementById("mic");
const sorting = document.getElementById("sorting");
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const mainDiv = document.querySelector('#main');
const micbtn = document.getElementById('micbtn');
micbtn.addEventListener('click', () => {
    let recog = new webkitSpeechRecognition();
    recog.lang = document.getElementById('langopt').value
    recog.onstart = () => {
        micbtn.classList.add("btn-success");
        micbtn.classList.remove("btn-danger");
      };
    recog.onresult = (event) => {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        micbtn.classList.add("btn-danger");
        micbtn.classList.remove("btn-success");
        searchInput.value = transcript
    }
    recog.start()

})


let apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value;
  if (sorting.value === '1') {
    axios.get(apiUrl + searchTerm + "&maxResults=40" + "&orderBy=relevance")
      .then((response) => {
        const results = response.data.items;
        displayResults(results);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  else {
    if (sorting.value === '2') {
      axios.get(apiUrl + searchTerm + "&maxResults=40" + "&orderBy=newest")
        .then((response) => {
          const results = response.data.items;
          displayResults(results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      axios.get(apiUrl + searchTerm + "&maxResults=40")
        .then((response) => {
          const results = response.data.items;
          displayResults(results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}


);

function displayResults(results) {
  console.log(results)
  mainDiv.innerHTML = '';
  results.forEach(result => {
    const resultDiv = document.createElement('div');
    resultDiv.classList.add("col-md-3");
    cardDiv = document.createElement('div');
    cardDiv.classList.add("row", "g-0", "border", "border-5", "border-dark", "rounded", "overflow-hidden", "flex-md-row", "mb-4", "shadow-sm", "h-md-250", "position-relative");
    cardDiv.style.background = "rgba(0, 0, 0, 0.25)";
    cardDiv.style.height = "192px"
    cardDiv.classList.add("animate__animated", "animate__bounceIn")
    const textDiv = document.createElement('div');
    textDiv.classList.add("col", "p-4", "d-flex", "flex-column", "position-static", "text-light");
    const titleH3 = document.createElement('h3');
    titleH3.classList.add("mb-0");
    titleH3.style.textOverflow = "fade"
    const descP = document.createElement('p');
    descP.classList.add("card-text", "mb-auto");
    const imageDiv = document.createElement('div');
    imageDiv.classList.add("col-auto", "d-none", "d-lg-block");
    const imageIMG = document.createElement('img');
    imageIMG.style.position = "relative"
    imageIMG.style.width = "128px"
    imageIMG.style.height = "192px"
    imageIMG.style.objectFit = "cover"
    const selflink = document.createElement("a");
    selflink.classList.add("link-info")
    selflink.target = "_blank"
    selflink.rel = "noopener noreferrer"
    // Direction chooser
    if (result.volumeInfo.language === "ar") {
      textDiv.style.direction = "rtl"
    }
    else {
      textDiv.style.direction = "ltr"
    }
    // Title setting
    if (result.volumeInfo.title.length > 50) {
      titleH3.textContent = result.volumeInfo.title.slice(0, 30) + "...";
    }
    else {
      titleH3.textContent = result.volumeInfo.title;
    }
    // Image setting
    if (result.volumeInfo.imageLinks === undefined) {
      if (result.volumeInfo.language === "ar") {
        imageIMG.src = "404ar.png"
      }
      else {
        imageIMG.src = "404en.png"
      }
    }
    else {
      imageIMG.src = result.volumeInfo.imageLinks.thumbnail;
    }
    // Desreption setting
    if (result.volumeInfo.description === undefined) {
      if (result.volumeInfo.language === "ar") {
        descP.innerHTML = "لا يتوفر وصف لهذا الكتاب"
      }
      else {
        descP.innerHTML = "No description available for this book"
      }

    }
    else {
      selflink.href = result.volumeInfo.infoLink
      if (result.volumeInfo.language === "ar") {
        selflink.innerHTML = "قراءة المزيد"
      }
      else {
        selflink.innerHTML = "Read more"
      }
      if (typeof result.volumeInfo.description === "string") {
        if (result.volumeInfo.description.length > 100000) {
          descP.innerHTML = result.volumeInfo.description.slice(0, 150) + "...";
          descP.appendChild(selflink)
        }
        else {
          descP.innerHTML = result.volumeInfo.description;
          selflink.innerHTML = ""
        }
      }


    }
    // Giving children to thier rightful parents
    textDiv.appendChild(titleH3)
    textDiv.appendChild(descP)
    descP.appendChild(selflink)
    imageDiv.appendChild(imageIMG)
    cardDiv.appendChild(textDiv)
    cardDiv.appendChild(imageDiv)
    resultDiv.appendChild(cardDiv)
    mainDiv.appendChild(resultDiv)
  });
}


