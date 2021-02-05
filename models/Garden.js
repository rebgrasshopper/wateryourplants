const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let gardenSchema = new Schema({
  garden: [{
          plant: { type: Schema.Types.ObjectId, ref: "Plant" }
      }],
  gardenName: {
    type: String
  },
  userAuthId: {
      type: String
  }
});
const Garden = mongoose.model("Garden", gardenSchema);
module.exports = Garden;