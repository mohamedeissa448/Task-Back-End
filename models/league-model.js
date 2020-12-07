var mongoose = require("mongoose");

var LeagueSchema =new mongoose.Schema(
  {
    leagueName: String,
    leagueCountry: {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "task_country"
    }, 
    isActive: Boolean,
  }
);

module.exports = mongoose.model("task_league",LeagueSchema);


