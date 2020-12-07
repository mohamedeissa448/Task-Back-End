var express = require('express');
var router = express.Router();
var TeamController=require('../controllers/team-controller');

router.post('/addTeam',async function(req, res, next) {
    await(TeamController.addTeam(req, res));
});

router.post('/editTeamById',async function(req, res, next) {
    await(TeamController.editTeamById(req, res));
});

router.get('/getAllTeams',async function(req, res, next) {
    await(TeamController.getAllTeams(req, res));
});
router.post('/getOneById',async function(req, res, next) {
    await(TeamController.getOneById(req, res));
});
router.get('/getAllTeamsActive',async function(req, res, next) {
    await(TeamController.getAllTeamsActive(req, res));
});
router.get('/searchTeamsByName',async function(req, res, next) {
    await(TeamController.searchTeamsByName(req, res));
});
module.exports = router;
