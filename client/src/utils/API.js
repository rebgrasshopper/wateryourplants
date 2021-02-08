import axios from 'axios';

const calls = {
    getUserData: ({userAuthId}) => {
        return new Promise(function(resolve, reject){
            axios.get("http://localhost:3001/api/user/"+userAuthId).then(data => {
                resolve(data.data);
            });
        });
    },

    addNewGarden: ({userAuthId}) => {
        return new Promise(function(resolve, reject){
            axios.put("http://localhost:3001/api/user/"+userAuthId, {}).then(data=>{
                resolve(data.data);
            })
        });
    },

    findGarden: ({gardenId}) => {
        return new Promise(function(resolve, reject) {
            axios.get("http://localhost:3001/api/garden/"+gardenId).then(data => {
                resolve(data.data);
            })
        });
    },

    findPlant: ({searchValue, searchParam}) => {
        console.log('looking for stawberries');
        return new Promise(function(resolve, reject){
            const searchString = `filter_not[soil_texture]=null&q=${searchValue.replace(/\s/g, "%20")}&token=`;
            axios.get("http://localhost:3001/api/plant-search/"+searchString).then(data => {
                resolve(data.data.data);
            })
        })
    },

    getPlantData: ({plantLink, scientificName}) => {
        return new Promise(function(resolve, reject){
            let searchString = plantLink.replace(/\//g, '--');
            console.log(searchString)
            axios.get("http://localhost:3001/api/plant-specifics/"+searchString).then(data => {
                resolve(data)
            })
        });
    },

    addPlantToDB: ({newPlantData}) => {
        return new Promise(function(resolve, reject) {
            let plantObject = {};
            plantObject.commonName = newPlantData["common_name"];
            plantObject.scientificName = newPlantData["scientific_name"];
            plantObject.familyName = newPlantData["main_species"]["family"];
            plantObject.waterMinMM = newPlantData["main_species"].growth["minimum_precipitation"].mm;
            plantObject.waterMaxMM = newPlantData["main_species"].growth["maximum_precipitation"].mm;
            plantObject.tempMinC = newPlantData["main_species"].growth["minimum_temperature"]["deg_c"];
            plantObject.tempMinF = newPlantData["main_species"].growth["minimum_temperature"]["deg_f"];
            plantObject.tempMaxC = newPlantData["main_species"].growth["maximum_temperature"]["deg_c"];
            plantObject.tempMaxF = newPlantData["main_species"].growth["maximum_temperature"]["deg_f"];
            plantObject.sunNeed = newPlantData["main_species"].growth.light;
            plantObject.soilType = newPlantData["main_species"].growth["soil_texture"];
            plantObject.edible = newPlantData["main_species"].edible;
            plantObject.ediblePart = newPlantData["main_species"]["edible_part"];
            plantObject.imageLink = newPlantData["image_url"];
            plantObject.vegetable = newPlantData["main_species"].vegetable;
            plantObject.daysToHarvest = newPlantData["main_species"].growth["days_to_harvest"];
            plantObject.growthMonths = newPlantData["main_species"].growth["growth_months"];

            axios.put("http://localhost:3001/api/plant-db", plantObject).then(data => {
                resolve(data)
            })
        })
    },

    addPlantToGarden: ({scientificName, gardenId}) => {
        return new Promise(function(resolve, reject){
            let searchString = scientificName.replace(/\//g, '--');
            console.log(searchString)
            axios.post("http://localhost:3001/api/garden/add", {scientificName, gardenId}).then(data => {
                resolve(data);
            })
        });
    },

    getCurrentWeather: ({cityName}) => {
        return new Promise(function(resolve, reject){
            axios.get("http://localhost:3001/api/weather/"+cityName).then(data=>{
                resolve(data);
            })
        });
    }
}

export default calls;