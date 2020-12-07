var Match=require("../models/match-model");

module.exports={

    addMatch:(req,res)=>{
        const newMatch = new Match();
        newMatch.homeTeam = req.body.homeTeam;
        newMatch.awayTeam = req.body.awayTeam;
        newMatch.startTime = req.body.startTime;
        newMatch.endTime = req.body.endTime;
        newMatch.duration = req.body.duration;
        newMatch.homeTeamScore = req.body.homeTeamScore;
        newMatch.awayTeamScore = req.body.awayTeamScore;
        newMatch.isActive = req.body.isActive;
        newMatch.league = req.body.league;
        newMatch.save((err,document)=>{
            if(err){
                return res.status(500).send({
                    message:err
                })
            }else {
                return res.send({
                    message:true
                })
            }
        })
    },

    editMatchById:(req,res)=>{
        var updatedMatch={}
        updatedMatch.homeTeam = req.body.homeTeam;
        updatedMatch.awayTeam = req.body.awayTeam;
        updatedMatch.startTime = req.body.startTime;
        updatedMatch.endTime = req.body.endTime;
        updatedMatch.duration = req.body.duration;
        updatedMatch.homeTeamScore = req.body.homeTeamScore;
        updatedMatch.awayTeamScore = req.body.awayTeamScore;
        updatedMatch.isActive = req.body.isActive;
        updatedMatch.league = req.body.league;
        Match.findByIdAndUpdate(req.body['_id'],updatedMatch,{new: true},
            (err,updatedDocument)=>{
                if(err){
                    return res.status(500).send({
                        message:err
                    })
                }else if(updatedDocument) {
                    return res.send({
                        message:true,
                        data:{ UpdatedMatch:updatedDocument }
                    })
                }else{
                    return res.status(404).send({
                        message:" UpdatedDocument is null"
                    })
                }
            })
    },

    getAllMatches:(req,res)=>{
        Match.find({}).exec((err,matches)=>{
            if(err){
                return res.status(500).send({
                    message:err
                })
            }else if(matches) {
                return res.send(matches)
            }else{
                return res.status(404).send({
                    message:"matches are null"
                })
            }

        })
    },

    getOneById : (req,res)=>{
        Match.findById(req.body._id).exec((err,match)=>{
            if(err){
                return res.status(500).send({
                    message:err
                })
            }else if(match) {
                return res.send(match)
            }else{
                return res.status(404).send({
                    message:"match is null"
                })
            }

        })
    },
    getAllMatchesActive:(req,res)=>{
        Match.find({isActive:true}).exec((err,activeMatches)=>{
            if(err){
                return res.status(500).send({
                    message:err
                })
            }else if(activeMatches) {
                return res.send(activeMatches)
            }else{
                return res.status(404).send({
                    message:"activeMatches are null"
                })
            }

        })
    },

    changeMatchStatus:(req,res)=>{
        Match.findById(req.body._id).exec((err,document)=>{
            if(err){
                return res.status(500).send({
                    message:err
                })
            }else if(document) {
                document.isActive == true ? false : true   ;
                document.save((err,updated) =>{
                    if(err){
                        return res.status(500).send({
                            message:err
                        })
                    }else
                    return res.send({message : true})
                }) 
            }else{
                return res.status(404).send({
                    message:"document is null"
                })
            }

        })
    },
    /***********Search  */
    searchMatchesByDateRangeAndName : (req,res)=>{
        var ObjectId = require('mongoose').Types.ObjectId;
        var objId = new ObjectId( (req.body.teamID.length < 12) ? "123456789012" : req.body.teamID );

        Match.find({
            startTime : {
                $gte : req.body.Search_Date.Start_Time ,
                $lte : req.body.Search_Date.End_Time ,
            },
            $or:[ 
                {'homeTeam':objId}, {'awayTeam':objId} 
            ]
        }).exec((err,documents)=>{
            if(err){
                return res.status(500).send({
                    message:err
                })
            }else if(documents) {
                    return res.send(documents)
            }else{
                return res.status(404).send({
                    message:"documents are null"
                })
            }

        })
    }

}