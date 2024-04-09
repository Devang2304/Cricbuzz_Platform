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
  CREATE TABLE IF NOT EXISTS  teams (
    teamId VARCHAR(255)  NOT NULL,
    teamName VARCHAR(255) NOT NULL,
    PRIMARY KEY (teamId)
  )
`;

const playerSchema = `
  CREATE TABLE IF NOT EXISTS players (
    playerId VARCHAR(255) UNIQUE NOT NULL,
    playerName VARCHAR(255) NOT NULL,
    teamId VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    matchesPlayed INT NOT NULL,
    runs INT NOT NULL,
    average FLOAT NOT NULL,
    strike_rate FLOAT NOT NULL,
    PRIMARY KEY (playerId),
    FOREIGN KEY (teamId) REFERENCES teams(teamId)
  )`;

//   const squadSchema = `
//   CREATE TABLE IF NOT EXISTS squads (
//     squadId INT AUTO_INCREMENT PRIMARY KEY,
//     matchId VARCHAR(255) NOT NULL,
//     teamId VARCHAR(255) NOT NULL,
//     player_id VARCHAR(255) NOT NULL,
//     FOREIGN KEY (matchId) REFERENCES matches(matchId),
//     FOREIGN KEY (teamId) REFERENCES teams(teamId),
//     FOREIGN KEY (player_id) REFERENCES players(playerId)
//   )
// `;


module.exports = { userSchema,matchSchema,teamSchema,playerSchema }