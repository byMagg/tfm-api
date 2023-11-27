import { CyberAttack } from "./models/Attack";

export const resolvers = {
  Query: {
    attackCount: async () => {
      return CyberAttack.collection.countDocuments();
    },
    getAttacks: async (
      _: any,
      { limit, offset }: { limit: number; offset: number }
    ) => {
      return await CyberAttack.find().skip(offset).limit(limit);
    },
    getAttackByTrafficType: async (
      _: any,
      { trafficType }: { trafficType: string }
    ) => {
      return await CyberAttack.find({ "Traffic Type": trafficType });
    },
  },
};
