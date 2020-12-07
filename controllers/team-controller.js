var Team=require("../models/team-model");

module.exports={

    addTeam:(req,res)=>{
        const newTeam = new Team();
        newTeam.TeamName = req.body.TeamName;
        newTeam.teamleague = req.body.teamleague;
        newTeam.save((err,document)=>{
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

    editTeamById:(req,res)=>{
        var updatedTeam={}
        updatedTeam.TeamName = req.body.TeamName;
        updatedTeam.teamleague = req.body.teamleague;
        Team.findByIdAndUpdate(req.body['_id'],updatedTeam,{new: true},
            (err,updatedDocument)=>{
                if(err){
                    return res.status(500).send({
                        message:err
                    })
                }else if(updatedDocument) {
                    return res.send({
                        message:true,
                        data:{ UpdatedTeam:updatedDocument }
                    })
                }else{
                    return res.status(404).send({
                        message:" UpdatedDocument is null"
                    })
                }
            })
    },

    getAllTeams:(req,res)=>{
        Team.find({}).exec((err,Teames)=>{
            if(err){
                return res.status(500).send({
                    message:err
                })
            }else if(Teames) {
                return res.send(Teames)
            }else{
                return res.status(404).send({
                    message:"Teames are null"
                })
            }

        })
    },

    getOneById : (req,res)=>{
        Team.findById(req.body._id).exec((err,Team)=>{
            if(err){
                return res.status(500).send({
                    message:err
                })
            }else if(Team) {
                return res.send(Team)
            }else{
                return res.status(404).send({
                    message:"Team is null"
                })
            }

        })
    },
    getAllTeamsActive:(req,res)=>{
        Team.find({isActive:true}).exec((err,activeTeams)=>{
            if(err){
                return res.status(500).send({
                    message:err
                })
            }else if(activeTeams) {
                return res.send(activeTeams)
            }else{
                return res.status(404).send({
                    message:"activeTeams are null"
                })
            }

        })
    },

    /***********Search  */
    searchTeamsByName : (req,res)=>{

        Team.findOne({
            TeamName : { $regex: new RegExp('.*' +req.body.TeamName+ '.*', "i") }
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