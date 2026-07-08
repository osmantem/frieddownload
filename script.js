// Google Apps Script Web App URL'n
const API_URL =
"https://script.google.com/macros/s/AKfycbwPbdfNQ5ricGadTssdEclKI3f2VQdjHXfwkU8evcemJWc2dm1v8kMRHxuhotepgDShLA/exec";

let apps = [];

// Sayfa açılınca verileri yükle
window.onload = () => {
    loadApps();

    document
        .getElementById("search")
        .addEventListener("input", searchApps);
};

async function loadApps(){

    const container = document.getElementById("apps");

    container.innerHTML = "<p>Loading...</p>";

    try{

        const response = await fetch(API_URL);

        apps = await response.json();

        render(apps);

    }catch(e){

        container.innerHTML =
        "<h2>Veriler yüklenemedi.</h2>";

        console.error(e);

    }

}

function render(list){

    const container = document.getElementById("apps");

    container.innerHTML = "";

    if(list.length===0){

        container.innerHTML="<h2>Sonuç bulunamadı.</h2>";

        return;

    }

    list.forEach(app=>{

        container.innerHTML += `

        <div class="card">

            <img src="https://placehold.co/120x120/png?text=APP">

            <h2>${app.name}</h2>

            <p>

            Download safely from Fried Download.

            </p>

            <div class="tags">

                <span class="tag new">NEW</span>

                <span class="tag">Download</span>

            </div>

            <a
            class="download"
            href="${app.link}"
            target="_blank"
            >
            Download
            </a>

        </div>

        `;

    });

}

function searchApps(){

    const text =
    document
    .getElementById("search")
    .value
    .toLowerCase();

    const filtered =
    apps.filter(app=>
        app.name
        .toLowerCase()
        .includes(text)
    );

    render(filtered);

}
