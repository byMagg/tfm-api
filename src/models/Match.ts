import mongoose, { Schema } from 'mongoose'

const matchSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    tourney_id: {
      type: 'String',
    },
    tourney_name: {
      type: 'String',
    },
    surface: {
      type: 'Mixed',
    },
    draw_size: {
      type: 'Date',
    },
    tourney_level: {
      type: 'String',
    },
    tourney_date: {
      type: 'Number',
    },
    match_num: {
      type: 'Date',
    },
    winner_id: {
      type: 'Number',
    },
    winner_seed: {
      type: 'Mixed',
    },
    winner_entry: {
      type: 'Mixed',
    },
    winner_name: {
      type: 'String',
    },
    winner_hand: {
      type: 'String',
    },
    winner_ht: {
      type: 'Mixed',
    },
    winner_ioc: {
      type: 'String',
    },
    winner_age: {
      type: 'Number',
    },
    loser_id: {
      type: 'Number',
    },
    loser_seed: {
      type: 'Mixed',
    },
    loser_entry: {
      type: 'Mixed',
    },
    loser_name: {
      type: 'String',
    },
    loser_hand: {
      type: 'String',
    },
    loser_ht: {
      type: 'Mixed',
    },
    loser_ioc: {
      type: 'String',
    },
    loser_age: {
      type: 'Number',
    },
    score: {
      type: 'String',
    },
    best_of: {
      type: 'Date',
    },
    round: {
      type: 'String',
    },
    minutes: {
      type: 'Mixed',
    },
    w_ace: {
      type: 'Mixed',
    },
    w_df: {
      type: 'Mixed',
    },
    w_svpt: {
      type: 'Mixed',
    },
    w_1stIn: {
      type: 'Mixed',
    },
    w_1stWon: {
      type: 'Mixed',
    },
    w_2ndWon: {
      type: 'Mixed',
    },
    w_SvGms: {
      type: 'Mixed',
    },
    w_bpSaved: {
      type: 'Mixed',
    },
    w_bpFaced: {
      type: 'Mixed',
    },
    l_ace: {
      type: 'Mixed',
    },
    l_df: {
      type: 'Mixed',
    },
    l_svpt: {
      type: 'Mixed',
    },
    l_1stIn: {
      type: 'Mixed',
    },
    l_1stWon: {
      type: 'Mixed',
    },
    l_2ndWon: {
      type: 'Mixed',
    },
    l_SvGms: {
      type: 'Mixed',
    },
    l_bpSaved: {
      type: 'Mixed',
    },
    l_bpFaced: {
      type: 'Mixed',
    },
    winner_rank: {
      type: 'Number',
    },
    winner_rank_points: {
      type: 'Number',
    },
    loser_rank: {
      type: 'Number',
    },
    loser_rank_points: {
      type: 'Number',
    },
    winner1_id: {
      type: 'Mixed',
    },
    winner2_id: {
      type: 'Mixed',
    },
    loser1_id: {
      type: 'Mixed',
    },
    loser2_id: {
      type: 'Mixed',
    },
    winner1_name: {
      type: 'Mixed',
    },
    winner1_hand: {
      type: 'Mixed',
    },
    winner1_ht: {
      type: 'Mixed',
    },
    winner1_ioc: {
      type: 'Mixed',
    },
    winner1_age: {
      type: 'Mixed',
    },
    winner2_name: {
      type: 'Mixed',
    },
    winner2_hand: {
      type: 'Mixed',
    },
    winner2_ht: {
      type: 'Mixed',
    },
    winner2_ioc: {
      type: 'Mixed',
    },
    winner2_age: {
      type: 'Mixed',
    },
    loser1_name: {
      type: 'Mixed',
    },
    loser1_hand: {
      type: 'Mixed',
    },
    loser1_ht: {
      type: 'Mixed',
    },
    loser1_ioc: {
      type: 'Mixed',
    },
    loser1_age: {
      type: 'Mixed',
    },
    loser2_name: {
      type: 'Mixed',
    },
    loser2_hand: {
      type: 'Mixed',
    },
    loser2_ht: {
      type: 'Mixed',
    },
    loser2_ioc: {
      type: 'Mixed',
    },
    loser2_age: {
      type: 'Mixed',
    },
    winner1_rank: {
      type: 'Mixed',
    },
    winner1_rank_points: {
      type: 'Mixed',
    },
    winner2_rank: {
      type: 'Mixed',
    },
    winner2_rank_points: {
      type: 'Mixed',
    },
    loser1_rank: {
      type: 'Mixed',
    },
    loser1_rank_points: {
      type: 'Mixed',
    },
    loser2_rank: {
      type: 'Mixed',
    },
    loser2_rank_points: {
      type: 'Mixed',
    },
  },
  {
    collection: 'matches',
  }
)

export const Match = mongoose.model('Match', matchSchema)
