const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    // console.log("🚀 ~ file: app.js:5 ~ loadPhones ~ data:", data)
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones?.length > 10) {
        phones = phones.splice(0, 6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }


    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    phonesContainer.innerHTML = '';
    // display all phones
    phones.forEach(phone => {
        const {image,phone_name,slug} = phone
        const phoneDiv  = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${image?image:'image not found'}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone_name?phone_name:'phone name not found'}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>

            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop spinner or loader
    toggleSpinner(false);
}


const loadPhoneDetails = async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}


const displayPhoneDetails = phone =>{
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    // console.log(phone.mainFeatures.sensors[0]);
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate}</p>
        <p>Storage:${phone.mainFeatures.storage?phone.mainFeatures.storage:'storage not found'}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
    `
}


let searchField = document.getElementById('search-field');
const processSearch = (dataLimit) => {
    let phoneName;
    let searchText = searchField.value||phoneName
    phoneName = searchText
    // let searchText =searchField.value
    toggleSpinner(true);
    loadPhones(searchText, dataLimit);
    searchField.value=''
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    processSearch(10);
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


// not the best way to load show All
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})




loadPhones('iphone');