const searchPhone = () => {
    document.getElementById("spinnerDiv").style.display = "block";
    document.getElementById("phoneCards").textContent = "";
    const searchString = document.getElementById("searchInput").value;
    const searchText = searchString.toLowerCase();
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    document.getElementById("searchInput").value = "";
    fetch(url).then(res => res.json()).then(data => displayPhone(data)).catch(err => console.log("err", err));
}
// set global veriable for show all phones
let allPhones = [];
// show phones
const displayPhone = (data) => {
    document.getElementById("showResultError").style.display = "none";
    document.getElementById("spinnerDiv").style.display = "none";
    if (data.status === false) {
        document.getElementById("showResultError").style.display = "block";
    }

    // take first 20 phone for show
    allPhones = data.data
    const countPhones = data.data.length;
    let initialShowPhones = data.data.filter((element, index) => index < 20);

    initialShowPhones.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card">
                <img src="${element.image}" class="card-img-top"
                    alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.phone_name}</h5>
                    <p class="card-text">${element.brand}</p>

                    <button  data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" onclick="showdetails('${element.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;

        document.getElementById("phoneCards").appendChild(div);
        document.getElementById("totalProducts").innerText = countPhones;
        document.getElementById("showProducts").innerText = initialShowPhones.length;
        document.getElementById("lastPart").style.display = "block";
    });
}

// display all phone
const showAllPhone = () => {
    document.getElementById("phoneCards").textContent = "";
    const countPhones = allPhones.length;

    allPhones.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card">
                <img src="${element.image}" class="card-img-top"
                    alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.phone_name}</h5>
                    <p class="card-text">${element.brand}</p>

                    <button  data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" onclick="showdetails('${element.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;

        document.getElementById("phoneCards").appendChild(div);
        document.getElementById("totalProducts").innerText = countPhones;
        document.getElementById("showProducts").innerText = countPhones;
        document.getElementById("lastPart").style.display = "block";
    });
}