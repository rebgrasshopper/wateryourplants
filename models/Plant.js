const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let plantSchema = new Schema({
  commonName: {
    type: String
  },
  scientificName: {
      type: String
  },
  familyName: {
      type: String
  },
  waterMinMM: {
    type: Number
  },
  waterMaxMM: {
    type: Number
  },
  tempMinC: {
    type: Number
  },
  tempMinF: {
    type: Number
  },
  tempMaxC: {
    type: Number
  },
  tempMaxF: {
    type: Number
  },
  sunNeed: {
    type: Number
  },
  soilType: {
    type: Number
  },
  edible: {
    type: Boolean
  },
  ediblePart: {
    type: Array
  },
  imageLink: {
    type: String
  },
  vegetable: {
    type: Boolean
  },
  daysToHarvest: {
    type: Number
  },
  growthMonths: {
    type: Array
  }
});
const Plant = mongoose.model("Plant", plantSchema);
module.exports = Plant;