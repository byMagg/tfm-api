import { Accident } from './models/Accident'
import { Match } from './models/Match'

export const resolvers = {
  Query: {
    accidentCount: async () => {
      return await Accident.estimatedDocumentCount()
    },
    getAccidents: async (
      _: any,
      { limit = 10, offset = 0 }: { limit: number; offset: number }
    ) => {
      return await Accident.find().limit(limit).skip(offset)
    },
    getAccidentById: async (_: any, { accidentId }: { accidentId: string }) => {
      return await Accident.findOne({ ID: accidentId })
    },
    getAccidentsBySeverity: async (
      _: any,
      {
        severity,
        limit = 10,
        offset = 0,
      }: { severity: string; limit: number; offset: number }
    ) => {
      return await Accident.find({ Severity: severity })
        .limit(limit)
        .skip(offset)
    },
    getMatches: async (
      _: any,
      { limit = 10, offset = 0 }: { limit: number; offset: number }
    ) => {
      return await Match.find().limit(limit).skip(offset)
    },
  },
}
