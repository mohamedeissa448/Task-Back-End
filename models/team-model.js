var mongoose = require("mongoose");

var TeamSchema =new mongoose.Schema(
  {
    teamName: String,
    teamleague : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "task_league"
    }
  }
);

module.exports = mongoose.model("task_team",TeamSchema);


