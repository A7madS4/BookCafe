const mic = document.getElementById("mic")
const sorting = document.getElementById("sorting")
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const mainDiv = document.querySelector('#main');


mic.addEventListener('click', () => {
  window.alert("E!")
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
    cardDiv.classList.add("row", "g-0", "border", "border-5", "border-dark", "rounded", "overflow-hidden", "flex-md-row", "mb-4", "shadow-sm", "h-md-250", "position-relative",);
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
    if (typeof result.volumeInfo.description === "string") {
      console.log(result.volumeInfo.description.length)
    }
  });
}

    // axios.get("https://www.googleapis.com/books/v1/volumes?q=the")
    // .then((response) => {
    //     console.log(response)
    // })

    // axios.get("https://api.tvmaze.com/search/shows?q=the")
    // .then((response) => {
    //     console.log(response)
    // })

//     <div class="col-md-3"> <!--result div --> 
//       <div class="row g-0 border rounded overflow-hidden
//        flex-md-row mb-4 shadow-sm h-md-250 position-relative"> <!--card div --> 
//         <div class="col p-4 d-flex flex-column position-static"> <!--text div --> 
//           <h3 class="mb-0">مشاركة مميزة</h3> <!--title  --> 
//           <!--desc -->  <p class="card-text mb-auto">هذه بطاقة أوسع مع نص داعم أدناه كمقدمة طبيعية لمحتوى إضافي.</p>
//           <!-- <a href="" class="stretched-link">أكمل القراءة</a> -->
//         </div>
//         <div class="col-auto d-none d-lg-block"> <!--image div --> 
//           <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: صورة مصغرة" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">صورة مصغرة</text></svg>
//             <!--image div --> 
//         </div>
//       </div>
// * <span class="collapsed">more...</span><span class="expanded">...less</span> *
//     </div>
//   </div>

// كِتَابِيَّة
