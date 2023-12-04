import { CyberAttack } from "./models/Attack";

export const resolvers = {
  Query: {
    attackCount: async () => {
      return CyberAttack.collection.countDocuments();
    },
    getAttacks: async (
      _: any,
      { limit = 10, offset = 0 }: { limit: number; offset: number }
    ) => {
      return await CyberAttack.find().limit(limit).skip(offset);
    },
    getAttackByTrafficType: async (
      _: any,
      {
        trafficType,
        limit = 10,
        offset = 0,
      }: { trafficType: string; limit: number; offset: number }
    ) => {
      return await CyberAttack.find({ TrafficType: trafficType })
        .limit(limit)
        .skip(offset);
    },
  },
};
