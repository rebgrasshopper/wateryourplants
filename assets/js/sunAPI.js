//seems to give monthly and yearly averages for an address but no current day info


const apiKey = "cpatggHWoYBJfU8Z7zwnZ3owVZbEiVEyaxUf6mDM";
let address = "748, Cerro Gordo Ave, San Diego, CA";


const queryURL = `https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=${apiKey}&address=${address}`;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
})