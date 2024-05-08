import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    matchesCount: Int
    getMatches(limit: Int, offset: Int): [Match]
    getMatchById(matchId: String!): Match
  }

  type Match {
    _id: ID
    tourney_id: String
    tourney_name: String
    surface: String
    draw_size: String
    tourney_level: String
    tourney_date: Int
    match_num: String
    winner_id: Int
    winner_seed: String
    winner_entry: String
    winner_name: String
    winner_hand: String
    winner_ht: String
    winner_ioc: String
    winner_age: Float
    loser_id: Int
    loser_seed: String
    loser_entry: String
    loser_name: String
    loser_hand: String
    loser_ht: String
    loser_ioc: String
    loser_age: Float
    score: String
    best_of: String
    round: String
    minutes: String
    w_ace: String
    w_df: String
    w_svpt: String
    w_1stIn: String
    w_1stWon: String
    w_2ndWon: String
    w_SvGms: String
    w_bpSaved: String
    w_bpFaced: String
    l_ace: String
    l_df: String
    l_svpt: String
    l_1stIn: String
    l_1stWon: String
    l_2ndWon: String
    l_SvGms: String
    l_bpSaved: String
    l_bpFaced: String
    winner_rank: Int
    winner_rank_points: Int
    loser_rank: Int
    loser_rank_points: Int
    winner1_id: String
    winner2_id: String
    loser1_id: String
    loser2_id: String
    winner1_name: String
    winner1_hand: String
    winner1_ht: String
    winner1_ioc: String
    winner1_age: String
    winner2_name: String
    winner2_hand: String
    winner2_ht: String
    winner2_ioc: String
    winner2_age: String
    loser1_name: String
    loser1_hand: String
    loser1_ht: String
    loser1_ioc: String
    loser1_age: String
    loser2_name: String
    loser2_hand: String
    loser2_ht: String
    loser2_ioc: String
    loser2_age: String
    winner1_rank: String
    winner1_rank_points: String
    winner2_rank: String
    winner2_rank_points: String
    loser1_rank: String
    loser1_rank_points: String
    loser2_rank: String
    loser2_rank_points: String
  }

  type Player {
    _id: Id
    player_id: Int
    name_first: String
    name_last: String
    hand: String
    dob: Int
    ioc: String
    height: Int
    wikidata_id: String
  }
`
