const express=require('express');
const router = express.Router();
const {register,login}=require('../controllers/authController');
const {createMatch,getMatchDetails,getAllMatches,createTeam,addPlayer,getPlayerDetails}=require('../controllers/adminController');
const protect =require('../middleware/middleware');


//create admin
router.post('/admin/signup',register);

//login login
router.post('/admin/login',login);

//create match (admin only)
router.post('/matches',protect,createMatch);

// get all matches (guest user)
router.get('/matches', getAllMatches);

// create team (admin only)
router.post('/createTeam',protect,createTeam);

//add players (admin only)
router.post('/teams/:id/squad',protect,addPlayer);

//get player details (guest user)
router.get('/players/:id/stats',protect, getPlayerDetails);

//get match details (guest user)
router.get('/matches/:id', getMatchDetails);


module.exports=router;