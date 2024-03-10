import { TrafficCrash } from './models/TrafficCrash'

export const resolvers = {
  Query: {
    crashCount: async () => {
      return TrafficCrash.collection.countDocuments()
    },
    getCrashes: async (
      _: any,
      { limit = 10, offset = 0 }: { limit: number; offset: number }
    ) => {
      return await TrafficCrash.find().limit(limit).skip(offset)
    },
    getCrashById: async (_: any, { crashId }: { crashId: string }) => {
      return await TrafficCrash.findOne({ CRASH_RECORD_ID: crashId })
    },
    getCrashByWeatherCondition: async (
      _: any,
      {
        weatherCondition,
        limit = 10,
        offset = 0,
      }: { weatherCondition: string; limit: number; offset: number }
    ) => {
      return await TrafficCrash.find({ WEATHER_CONDITION: weatherCondition })
        .limit(limit)
        .skip(offset)
    },
  },
}
