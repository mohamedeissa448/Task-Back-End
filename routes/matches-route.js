var express = require('express');
var router = express.Router();
var matchController=require('../controllers/match-controller');

router.post('/addMatch',async function(req, res, next) {
    await(matchController.addMatch(req, res));
});

router.post('/editMatchById',async function(req, res, next) {
    await(matchController.editMatchById(req, res));
});

router.get('/getAllMatches',async function(req, res, next) {
    await(matchController.getAllMatches(req, res));
});
router.post('/getOneById',async function(req, res, next) {
    await(matchController.getOneById(req, res));
});
router.get('/getAllMatchesActive',async function(req, res, next) {
    await(matchController.getAllMatchesActive(req, res));
});

router.get('/changeMatchStatus',async function(req, res, next) {
    await(matchController.changeMatchStatus(req, res));
});
/*********** Search   */
router.post('/searchMatchesByDateRangeAndName',async function(req, res, next) {
    await(matchController.searchMatchesByDateRangeAndName(req, res));
});
module.exports = router;
