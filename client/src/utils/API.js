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
    }
}

export default calls;