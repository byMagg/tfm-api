import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    attackCount: Int
    getAttacks(limit: Int, offset: Int): [CyberAttack]
    getAttackByTrafficType(
      trafficType: String!
      limit: Int
      offset: Int
    ): [CyberAttack]
  }

  # Student object
  type CyberAttack {
    _id: ID!
    Timestamp: String
    SourceIPAddress: String
    DestinationIPAddress: String
    SourcePort: String
    DestinationPort: String
    Protocol: String
    PacketLength: String
    PacketType: String
    TrafficType: String
    PayloadData: String
    MalwareIndicators: String
    AnomalyScores: String
    AlertsWarnings: String
    AttackType: String
    AttackSignature: String
    ActionTaken: String
    SeverityLevel: String
    UserInformation: String
    DeviceInformation: String
    NetworkSegment: String
    GeolocationData: String
    ProxyInformation: String
    FirewallLogs: String
    IDSIPSAlerts: String
    LogSource: String
  }
`;
