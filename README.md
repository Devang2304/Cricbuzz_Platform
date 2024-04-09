
---

# Cricbuzz Platform API

This project implements an API for a Cricbuzz-like platform using Node.js and MySQL. It allows guest users to browse matches and view details, while admins can manage matches, teams, players, and statistics.

# DEMO
[screen-capture.webm](https://github.com/Devang2304/Cricbuzz_Platform/assets/69463638/a89d55e3-8a88-4a0e-ab52-cf11a09ffd1e)


## Prerequisites

Before getting started, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/en) and npm (or yarn)
- [MySQL server](https://dev.mysql.com/doc/)

## Setup

### Clone the Repository

```
git clone https://github.com/Devang2304/Cricbuzz_Platform.git
```

### Install Dependencies

Navigate to the project directory:

```
cd Cricbuzz_Platform
```

Install dependencies:

```
npm install
```

## Database Configuration

1. Create a MySQL database named `cricbuzz` (or your preferred name).
2. Create a file named `.env` in the project's root directory to store database credentials:

```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=cricbuzz
```

## API Overview

### Authentication

Admins need to register and log in to access admin endpoints. A successful login returns an authorization token required for subsequent admin API calls.

### Guest Endpoints

- **GET /api/matches**: Retrieve a list of upcoming and past matches.
- **GET /api/matches/{match_id}**: Get details of a specific match, including teams, squads (dummy data for now), and (to be implemented) match status and commentary.

### Admin Endpoints (Authorization Required)

- **POST /api/admin/signup**: Register a new admin user.
- **POST /api/admin/login**: Login an admin user and get an authorization token.
- **POST /api/matches**: Create a new match.
- **POST /api/teams/{team_id}/squad**: Add a player to a team's squad.
- **GET /api/players/{player_id}/stats**: Get statistics for a player (dummy data for now).

## Running the API

1. Start the MySQL server if not already running.
2. Open a terminal in the project directory (`Cricbuzz_Platform`).
3. Start the API server:

```
nodemon app.js
```

Please refer to the code for detailed implementation and API interactions.

---
