import { Accident } from './models/Accident'

export const resolvers = {
  Query: {
    accidentCount: async () => {
      return Accident.collection.countDocuments()
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
  },
}
