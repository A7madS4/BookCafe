const mic = document.getElementById("mic");
const type = document.getElementById("type");
const sorting = document.getElementById("sorting");
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const mainDiv = document.querySelector('#main');
const micbtn = document.getElementById('micbtn');
// const urlParams = new URLSearchParams(window.location.search);
// const q = urlParams.get("q")
// console.log(urlParams)
// console.log(q)
// const introDiv = document.getElementById("vid")
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
let typeFilter = type.value
// window.onload = () => {
//   setTimeout(() => {
//     introDiv.style.display = "none"
//   },"4900")
// }
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value;
  let typeFilter = type.value;

  if (sorting.value === '1') {
    axios.get(apiUrl + searchTerm + typeFilter + "&maxResults=40" + "&orderBy=relevance")
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
      axios.get(apiUrl + searchTerm + typeFilter + "&maxResults=40" + "&orderBy=newest")
        .then((response) => {
          const results = response.data.items;
          displayResults(results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      axios.get(apiUrl + searchTerm + typeFilter + "&maxResults=40")
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
    cardDiv = document.createElement('div');
    cardDiv.classList.add("carddd");
    // cardDiv.classList.add("animate__animated", "animate__bounceIn")
    const bodyDiv = document.createElement('div');
    bodyDiv.classList.add("carddd-body");
    const textDiv = document.createElement('div');
    textDiv.classList.add("carddd-text")
    const imageIMG = document.createElement('img');
    const titleH3 = document.createElement('h3');
    const descP = document.createElement('p');
    const detailLNK = document.createElement('a');
    detailLNK.href = "/view.html?q="+result.id
    detailLNK.target = "_blank"
    detailLNK.rel = "noopener noreferrer"
    const detailBTN = document.createElement('button');
    // Direction chooser
    if (result.volumeInfo.language === "ar") {
      bodyDiv.style.direction = "rtl"
    }
    else {
      bodyDiv.style.direction = "ltr"
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
      descP.innerHTML = result.volumeInfo.description;
    }


    // Details button setting
    if (result.volumeInfo.language === "ar") {
      detailBTN.innerHTML = "قراءة المزيد"
    }
    else {
      detailBTN.innerHTML = "Read more"
    }
    // Giving children to thier rightful parents
    textDiv.appendChild(titleH3)
    textDiv.appendChild(descP)
    bodyDiv.appendChild(textDiv)
    detailLNK.appendChild(detailBTN)
    bodyDiv.appendChild(detailLNK)
    cardDiv.appendChild(imageIMG)
    cardDiv.appendChild(bodyDiv)
    mainDiv.appendChild(cardDiv)
  });
}
