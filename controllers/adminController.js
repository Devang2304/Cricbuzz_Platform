const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { matchSchema,teamSchema,playerSchema } = require("../schema/schema");
const bcrypt = require("bcryptjs");
const {
  createTable,
  checkRecordsExist,
  insertData,
} = require("../utils/sqlFunc");
const dotenv=require('dotenv');
const mysql = require("mysql2");
const config = require("../config/config");
const pool = mysql.createPool(config);
require("dotenv").config();


const createMatch = async (req, res) => {
    const {team1,team2,date,venue,status}=req.body;

    if(!team1 || !team2 || !date || !venue || !status){
        return res.status(400).json({message:"Please enter all fields"});
    }
    try {
        await createTable(matchSchema);
        const matchExist = await checkRecordsExist("matches", "date", date);
        if (matchExist) {
            return res.status(400).json({ message: "Match already exists on same date" });
        } else {
            const newMatch = {
                matchId: uuidv4(),
                team1Name: team1,
                team2Name: team2,
                venue: venue,
                date: date,
                status: status,
            };
            await insertData("matches", newMatch);
            res.status(200).json({  "message": "Match created successfully", "match_id": matchId});
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMatchDetails = async (req, res) => {
    const matchId = req.params.id;
    try {
        const match = await checkRecordsExist("matches", "matchId", matchId);
        if (!match) {
            return res.status(400).json({ message: "Match not found" });
        }
        const team1 = await checkRecordsExist("teams", "teamName", match.team1Name);
        const team1Id=team1.teamId;
        const team2 = await checkRecordsExist("teams", "teamName", match.team2Name);
        const team2Id=team2.teamId;
        
         const players1= await new Promise((resolve, reject) => {
                let query;
                query = `SELECT * FROM players WHERE teamId=?`;
                pool.query(query, [team1Id], (err, result) => {
                if (err) reject(err);
                resolve(result.length ? result : null);
            });
        });
         const players2= await new Promise((resolve, reject) => {
                let query;
                query = `SELECT * FROM players WHERE teamId=?`;
                pool.query(query, [team2Id], (err, result) => {
                if (err) reject(err);
                resolve(result.length ? result : null);
            });
        });
        team1Name=players1;
        team2Name=players1;
        result={
            match,
            team1Name,
            team2Name
        }
        
        res.status(200).json(result);
        // console.log(result);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllMatches = async (req, res) => {
    try {
        const matches = await checkRecordsExist("matches", "matchId", "");
        if(!matches){
            return res.status(400).json({message:"No matches found"});
        }
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const createTeam=async(req,res)=>{
    const {teamName}=req.body;
    if(!teamName){
        return res.status(400).json({message:"Please enter all fields"});
    }
    try {
        await createTable(teamSchema);
        const teamExist = await checkRecordsExist("teams", "teamName", teamName);
        if (teamExist) {
            return res.status(400).json({ message: "Team already exists" });
        } else {
            const newTeam = {
                teamId: uuidv4(),
                teamName: teamName,
            };
            await insertData("teams", newTeam);
            res.status(200).json({ message: "Team created successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addPlayer=async(req, res)=>{
    const {playerName,role,matchesPlayed,runs,average,strike_rate}=req.body;
    const teamId=req.params.id;
    console.log(teamId);
    if(!playerName || !teamId || !role || !matchesPlayed || !runs || !average || !strike_rate){
        return res.status(400).json({message:"Please enter all fields"});
    }
    try {
        await createTable(playerSchema);
        console.log(playerName);
        const playerExist = await checkRecordsExist("players", "playerName", playerName);
        if (playerExist) {
            return res.status(400).json({ message: "Player already exists" });
        } else {
            const newPlayer = {
                playerId: uuidv4(),
                playerName: playerName,
                teamId: teamId,
                role: role,
                matchesPlayed: matchesPlayed,
                runs: runs,
                average: average,
                strike_rate: strike_rate
            };
            await insertData("players", newPlayer);
            res.status(200).json({ message: "Player created successfully",playerID:newPlayer.playerId});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPlayerDetails = async (req, res) => {
    const playerId = req.params.id;
    console.log(playerId);
    try {
        const player = await checkRecordsExist("players", "playerId", playerId);
        if (!player) {
            return res.status(400).json({ message: "Player not found" });
        }
        const playerDetails={
            playerName:player.playerName,
            role:player.role,
            matchesPlayed:player.matchesPlayed,
            runs:player.runs,
            average:player.average,
            strike_rate:player.strike_rate
        }
        res.status(200).json(playerDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {createMatch,getMatchDetails,getAllMatches,createTeam,addPlayer,getPlayerDetails};