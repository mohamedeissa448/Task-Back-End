var mongoose = require("mongoose");

var MatchSchema =new mongoose.Schema(
  {
    homeTeam: {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "task_team"
    },
    awayTeam: {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "task_team"
    },
    startTime: Date,
    endTime: Date,
    duration: String,
    homeTeamScore: Number,
    awayTeamScore: Number,
    isActive: Boolean,
    league : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "task_league"
    },
  }
);

module.exports = mongoose.model("task_match",MatchSchema);


