// click enter button for search
const checkEnter = event => {
    console.log(event.keyCode);
    if (event.keyCode === 13) {
        searchPhone();
    }
}

// search phone
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
        document.getElementById("lastPart").style.display = "none";
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

// for show Individual phone details
const showdetails = async (id) => {
    try {
        const url = `https://openapi.programming-hero.com/api/phone/${id}`;
        const res = await fetch(url);
        const data = await res.json();

        // for modal data clear
        document.getElementById("exampleModalLabel").textContent = "";
        document.getElementById("showDetailsDiv").textContent = "";

        // show modal header
        document.getElementById("modalImg").setAttribute("src", `${data.data.image}`);
        document.getElementById("exampleModalLabel").innerHTML = `
            <h3>Name: ${data.data.name}</h3>
            <p>Release Date: ${data.data.releaseDate ? data.data.releaseDate : "No Release Date Fount"}</p>
            <p>Brand Name: ${data.data.brand ? data.data.brand : ""}</p>
        `;

        const sensors = data.data.mainFeatures.sensors;

        const showDetailsDiv = document.getElementById("showDetailsDiv");
        // for show mainFeatures and others
        const mainFeaturesDiv = document.createElement("div");
        const sensorsDiv = document.createElement("div");
        const othersDiv = document.createElement("div");
        othersDiv.innerHTML = "<h3>Others: </h3>";
        sensorsDiv.innerText = "sensors: ";
        mainFeaturesDiv.innerHTML = `
            <p>storage: ${data.data.mainFeatures.storage}</p>
            <p>displaySize: ${data.data.mainFeatures.displaySize}</p>
            <p>chipSet: ${data.data.mainFeatures.chipSet}</p>
            <p>memory: ${data.data.mainFeatures.memory}</p>
        `;
        sensors.forEach(element => {
            const span = document.createElement("span");
            span.innerText = element + ", ";
            sensorsDiv.appendChild(span);
        });

        showDetailsDiv.appendChild(mainFeaturesDiv);
        showDetailsDiv.appendChild(sensorsDiv);

        if (data.data.others) {
            const others = data.data.others;
            const othersKeys = Object.keys(others);
            othersKeys.forEach(element => {
                const p = document.createElement("p");
                p.innerText = `
                    ${element}: ${others[element]}
                `;
                othersDiv.appendChild(p);
            });

            showDetailsDiv.appendChild(othersDiv);
        }
    } catch (error) {
        console.log(error);
    }
}