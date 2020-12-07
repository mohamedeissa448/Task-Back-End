var express = require('express');
var router = express.Router();
var leagueController=require('../controllers/league-controller');

router.post('/addLeague',async function(req, res, next) {
    await(leagueController.addLeague(req, res));
});

router.post('/editLeagueById',async function(req, res, next) {
    await(leagueController.editLeagueById(req, res));
});

router.get('/getAllLeagues',async function(req, res, next) {
    await(leagueController.getAllLeagues(req, res));
});
router.post('/getOneById',async function(req, res, next) {
    await(leagueController.getOneById(req, res));
});
router.get('/getAllLeaguesActive',async function(req, res, next) {
    await(leagueController.getAllLeaguesActive(req, res));
});
router.get('/searchLeaguesByName',async function(req, res, next) {
    await(leagueController.searchLeaguesByName(req, res));
});
module.exports = router;
