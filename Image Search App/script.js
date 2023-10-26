const accessKey ="eTGtH8sMsCggAlrCJnwiV7m6Mx5gsacSRXwJywxvE8s";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button")

//inputData will store all the keywords which the user is typing inside the input section
let inputData = "";
//default page number will be one and when the user click on the show more button the page number will increased
let page = 1;

async function searchImages() {
    //based on the keyword the API will fetch the images  from the  unsplash.com 
    inputData = inputEl.value;
    //Url will fetch all the data  from unsplash
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url);
    //convert all the data in json
    const data = await response.json();
    console.log("API Data:", data);
    //convert json data in images
    const results = data.results;
    //intialize the page number
    if (page === 1) {
        searchResults.innerHTML = "";
    }

    //use map method to and make a callback function to push all the data inside the html template
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

    //modify the structure of an HTML document by adding new elements to the DOM 
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    })

    //increase the page number 
    page++
    //if image query has page numbers more than one we need to show the button show more
    if(page > 1) {
        showMore.style.display = 'block';
    }
}
   

//the event listener  that take the keyword and return the function

formEl.addEventListener("submit", (event) =>{
    event.preventDefault()
        page = 1;
        searchImages();
})

showMore.addEventListener("click", () =>{
        searchImages();
})
