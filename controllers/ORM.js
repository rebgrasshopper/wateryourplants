const db = require("../models");
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    addUserToGardenList: ({ userAuthId, userName }) => {
        return new Promise(function (resolve, reject) {
            try {
                db.GardenList.find({ userAuthId }).then(currentUserData => {
                    if (currentUserData.length > 0) {
                        console.log('user already exists!');
                        resolve(false);
                    } else {
                        db.Garden.create({ garden: [], userAuthId }).then(gardenData => {
                            console.log(`${userName}'s First Garden:`)
                            console.log(gardenData);
    
                            db.GardenList.create({ userName, userAuthId, numberOfGardens: 1, gardens: [
                                { garden: ObjectId(gardenData["_id"]) }
                            ] }).then((updatedUserData) => {
                                resolve(updatedUserData);
                            })
                        })
                    }
                })
            } catch (e) {
                console.log("Error from addUserToGardenList(ORM.js):", e);
            }
        });
    },
    
    addNewGarden: ({ userAuthId }) => {
        return new Promise(function (resolve, reject) {
            try {
                db.GardenList.find({ userAuthId }).then(currentUserData => {
                    if (currentUserData.length === 0) {
                        console.log('no matching user!')
                        resolve(false)
                    } else {
                        db.Garden.create({ garden: [], userAuthId }).then(gardenData => {
                            console.log(`Added new garden for ${currentUserData[0].userName}!`);
    
                            db.GardenList.findOneAndUpdate({ userAuthId }, { $push: { gardens: { garden: ObjectId(gardenData["_id"]) } } }, { new: true }).then(updatedUserData => {
                                resolve(updatedUserData);
                            })
                        })
                    }
                })
            } catch (e) {
                console.log("Error from addNewGarden(ORM.js):", e);
            }
    
        })
    },
    
    addPlantToGarden: ({ gardenId, plantId }) => {
        return new Promise(function (resolve, reject) {
            try {
                console.log(`adding plant: ${plantId} to garden: ${gardenId}.`)
                db.Garden.findByIdAndUpdate(gardenId, { $push: { garden: {plant: ObjectId(plantId)} } }, { new: true }).populate('garden.plant').then(updatedGardenData => {
                    console.log("updatedGardenData");
                    console.log(updatedGardenData);
                    resolve(updatedGardenData);
                })
            } catch (e) {
                console.log("Error from addPlant(ORM.js):", e);
            }
        });
    },
    
    createPlant: (plantObject) => {
        return new Promise(function (resolve, reject){
            try {
                db.Plant.find({plantName: plantObject.plantName}).then(currentDuplicates => {
                    if (currentDuplicates.length > 0) {
                        console.log("This plant already exists!")
                        resolve(false);
                    } else {
                        db.Plant.create(plantObject).then(returnData => {
                            console.log(returnData);
                            resolve(returnData);
                        })
                    }
                })
            } catch (e) {
                console.log("Error from createPlant(ORM.js):", e);
            }
        });
    },
    
    findUser: ({userAuthId}) => {
        return new Promise(function (resolve, reject){
            try {
                db.GardenList.findOne({userAuthId}).populate({
                    path: "gardens.garden",
                    populate: {
                        path: "garden.plant"
                    }
                }).then(userData => {
                    resolve(userData);
                })
            } catch (e) {
                console.log("Error from findUser(ORM.js):", e);
            }
        });
    }

}



// addUserToGardenList({ userAuthId: "kasdkf8923u23", userName: "Plover" });

// addNewGarden({ userAuthId: "kasdkf8923u23" });

// addPlantToGarden({ gardenId: "601c963360808b18ecf7cd35", plantId: "601c94c609c28a14c483f55c" });

// createPlant({ plantName: "Lantana", category: "draught tolerant shrub", type: "Draught Tolerant Shrub", waterNeed: "weekly", tempMin: 29, tempMax: null, sunNeed: ["full", "partial"], soilType: ["acidic", "well-draining"]})

// findUser({ userAuthId: "kasdkf8923u23" })