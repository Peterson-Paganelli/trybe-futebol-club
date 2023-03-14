// import MatchPayload from "../../interfaces/MatchUpdate.interface"

export const finishedMatch = {
  "id": 49,
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 8,
  "awayTeamGoals": 2,
  "inProgress": true
}

export const updatedMatch = {
  homeTeamGoals: 3,
  awayTeamGoals: 3
}

export const createMatch = {
  homeTeamId: 1,
  awayTeamId: 2,
  homeTeamGoals: 3,
  awayTeamGoals: 3
}

export const createMatchWrong = {
  homeTeamId: 22,
  awayTeamId: 30,
  homeTeamGoals: 3,
  awayTeamGoals: 3
}

export const createdMatchOutput = {
  id: 49,
  homeTeamId: 1,
  awayTeamId: 2,
  homeTeamGoals: 3,
  awayTeamGoals: 3,
  inProgress: true
}