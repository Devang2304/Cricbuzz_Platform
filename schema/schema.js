const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      userId VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255)
  )
`;

const matchSchema = `
  CREATE TABLE IF NOT EXISTS matches (
    matchId VARCHAR(255) UNIQUE NOT NULL,
    team1Name VARCHAR(255) NOT NULL,
    team2Name VARCHAR(255) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    PRIMARY KEY (matchId)
  )
`;

const teamSchema = `
  CREATE TABLE IF NOT EXISTS teams (
    teamId VARCHAR(255) UNIQUE NOT NULL,
    teamName VARCHAR(255) NOT NULL,
    PRIMARY KEY (teamId)
  )
`;

const playerSchema = `
  CREATE TABLE IF NOT EXISTS players (
    playerId VARCHAR(255) UNIQUE NOT NULL,
    playerName VARCHAR(255) NOT NULL,
    teamId VARCHAR(255) NOT NULL,
    mataches_played INT NOT NULL,
    runs INT NOT NULL,
    average FLOAT NOT NULL
    strike_rate FLOAT NOT NULL
    PRIMARY KEY (playerId)
    FOREIGN KEY (teamId) REFERENCES teams(teamId)
  )`;



module.exports = { userSchema,matchSchema,teamSchema,playerSchema }