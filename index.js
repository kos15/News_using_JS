console.log("This is a demo project")

let apiKey = `28379b880b4947809a6b0366c5892f65`;

var country = `in`;

var category = `general`

let spinner = document.getElementById("spinner").style.visibility = "visible";

let xhr = new XMLHttpRequest();

/**
 * Information for calling the API
 * 
 * category: entertainment general health science sports technology
 * 
 * country: ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx 
 *          my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za . 
 * 
*/
let ddm = `<option class="dropdown-item" value="entertainment" onclick="categorySelect(this)">entertainment</option>
            <option class="dropdown-item" value="general" onclick="categorySelect(this)">general</option>
            <option class="dropdown-item" value="health" onclick="categorySelect(this)">health</option>
            <option class="dropdown-item" value="science" onclick="categorySelect(this)">science</option>
            <option class="dropdown-item" value="sports" onclick="categorySelect(this)">sports</option>
            <option class="dropdown-item" value="technology" onclick="categorySelect(this)">technology</option>`

let ddm2 = `<option class="dropdown-item country_options" value="in" onclick="countrySelect(this)">India</option>
            <option class="dropdown-item country_options" value="us" onclick="countrySelect(this)">United State</option>
            <option class="dropdown-item country_options" value="ca" onclick="countrySelect(this)">Canada</option>`

            //Populating DOM
let dropdownMenu = document.getElementById("dropdownMenu");
dropdownMenu.innerHTML = ddm;
let dropdownMenu2 = document.getElementById("dropdownMenuCountry");
dropdownMenu2.innerHTML = ddm2;

//function get call when category is selected from category dropdown
function categorySelect(ele){
    category = ele.value;
    console.log(category,"selected")
    requestAPI();
}

//function get call when country is selected from counrty dropdown
function countrySelect(ele){
    country = ele.value;
    console.log(country,"selected")
    requestAPI();
}

//function which perform API call using XHR object
async function requestAPI() {
    let url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${apiKey}`;
    console.log(url)

    document.getElementById("loading").style.visibility = "visible";
    xhr.open("GET", url, true);

    xhr.onload = () => {
        if (xhr.status == 200) {
            let data = JSON.parse(xhr.response);
            populate(data.articles);
        }
        else {
            console.log("Some error occured" ,xhr.status)
        }
    };

    xhr.send();
}

//Function responsible for poplating DOM with the API response
function populate(data) {
    if (data.length == 0) {
        alert(`No News available for ${category} in ${country}`)
    } else {
        let body = document.getElementById("body")
        let html = ``
        Array.from(data).forEach(async (element, index) => {
            html += `<div class="jumbotron" id="${index}">
                        <h3 class="display-4"><span class="badge badge-danger">Breaking News</span>
                                                ${element.title}</h3><br>
                        <p class="lead">${element.description}</p>
                        <img src="${element.urlToImage}"></img>
                        <hr class="my-4">
                        <p>${element.content}</p>
                        <a class="btn btn-outline-primary btn-lg" href="${element.url}" role="button">Read more</a>
                 </div>`;
        })
        console.log(data)
        document.getElementById("spinner").style.visibility = "hidden";
        document.getElementById("loading").style.visibility = "hidden";
        body.innerHTML = html;
    }
}