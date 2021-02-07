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
            const searchString = `q=${searchValue.replace(/\s/g, "%20")}&token=`;
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
    }
}

export default calls;