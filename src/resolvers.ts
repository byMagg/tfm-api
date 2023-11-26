export const resolvers = {
  Query: {
    hello: () => "Hello World!",
    welcome: (parent: any, args: any) => `Welcome ${args.name}`,
  },
};
