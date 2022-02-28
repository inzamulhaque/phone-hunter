const searchPhone = () => {
    document.getElementById("spinnerDiv").style.display = "block";
    document.getElementById("phoneCards").textContent = "";
    const searchString = document.getElementById("searchInput").value;
    const searchText = searchString.toLowerCase();
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    document.getElementById("searchInput").value = "";
    fetch(url).then(res => res.json()).then(data => displayPhone(data)).catch(err => console.log("err", err));
}

// show phone
const displayPhone = (data) => {
    document.getElementById("spinnerDiv").style.display = "none";
    if (data.status === false) {
        document.getElementById("showResultError").style.display = "block";
    }
    document.getElementById("showResultError").style.display = "none";
}