const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let gardenListSchema = new Schema({
  userName: {
    type: String
  },
  userAuthId: {
    type: String
  },
  numberOfGardens: {
    type: Number
  },
  gardens: [{
      garden: { type: Schema.Types.ObjectId, ref: "Garden" }
  }],
  userSettings: {
    type: Object
  }
});
const GardenList = mongoose.model("GardenList", gardenListSchema);
module.exports = GardenList;