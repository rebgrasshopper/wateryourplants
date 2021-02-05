const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let plantSchema = new Schema({
  plantName: {
    type: String
  },
  category: {
      type: String
  },
  waterNeed: {
    type: String
  },
  tempMin: {
    type: String
  },
  tempMax: {
    type: String
  },
  sunNeed: {
    type: Array
  },
  soilType: {
    type: Array
  }
});
const Plant = mongoose.model("Plant", plantSchema);
module.exports = Plant;