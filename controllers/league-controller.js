var League=require("../models/league-model");

module.exports={

    addLeague:(req,res)=>{
        const newLeague = new League();
        newLeague.leagueName = req.body.leagueName;
        newLeague.leagueCountry = req.body.leagueCountry;
        newLeague.isActive = req.body.isActive;
        newLeague.save((err,document)=>{
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

    editLeagueById:(req,res)=>{
        var updatedLeague={}
        updatedLeague.leagueName = req.body.leagueName;
        updatedLeague.leagueCountry = req.body.leagueCountry;
        updatedLeague.isActive = req.body.isActive;
        League.findByIdAndUpdate(req.body['_id'],updatedLeague,{new: true},
            (err,updatedDocument)=>{
                if(err){
                    return res.status(500).send({
                        message:err
                    })
                }else if(updatedDocument) {
                    return res.send({
                        message:true,
                        data:{ UpdatedLeague:updatedDocument }
                    })
                }else{
                    return res.status(404).send({
                        message:" UpdatedDocument is null"
                    })
                }
            })
    },

    getAllLeagues:(req,res)=>{
        League.find({}).exec((err,Leaguees)=>{
            if(err){
                return res.status(500).send({
                    message:err
                })
            }else if(Leaguees) {
                return res.send(Leaguees)
            }else{
                return res.status(404).send({
                    message:"Leaguees are null"
                })
            }

        })
    },

    getOneById : (req,res)=>{
        League.findById(req.body._id).exec((err,League)=>{
            if(err){
                return res.status(500).send({
                    message:err
                })
            }else if(League) {
                return res.send(League)
            }else{
                return res.status(404).send({
                    message:"League is null"
                })
            }

        })
    },
    getAllLeaguesActive:(req,res)=>{
        League.find({isActive:true}).exec((err,activeLeaguees)=>{
            if(err){
                return res.status(500).send({
                    message:err
                })
            }else if(activeLeaguees) {
                return res.send(activeLeaguees)
            }else{
                return res.status(404).send({
                    message:"activeLeaguees are null"
                })
            }

        })
    },

    /***********Search  */
    searchLeaguesByName : (req,res)=>{

        League.findOne({
            leagueName : { $regex: new RegExp('.*' +req.body.leagueName+ '.*', "i") }
        }).exec((err,document)=>{
            if(err){
                return res.status(500).send({
                    message:err
                })
            }else if(document) {
                    return res.send(document)
            }else{
                return res.status(404).send({
                    message:"document is null"
                })
            }

        })
    }

}