import mongoose, { Schema } from "mongoose";

const cyberAttackSchema = new Schema({
  Timestamp: {
    type: "String",
  },
  SourceIPAddress: {
    type: "String",
  },
  DestinationIPAddress: {
    type: "String",
  },
  SourcePort: {
    type: "String",
  },
  DestinationPort: {
    type: "String",
  },
  Protocol: {
    type: "String",
  },
  "Packet Length": {
    type: "String",
  },
  "Packet Type": {
    type: "String",
  },
  TrafficType: {
    type: "String",
  },
  "Payload Data": {
    type: "String",
  },
  "Malware Indicators": {
    type: "String",
  },
  "Anomaly Scores": {
    type: "String",
  },
  "Alerts/Warnings": {
    type: "String",
  },
  "Attack Type": {
    type: "String",
  },
  "Attack Signature": {
    type: "String",
  },
  "Action Taken": {
    type: "String",
  },
  "Severity Level": {
    type: "String",
  },
  "User Information": {
    type: "String",
  },
  "Device Information": {
    type: "String",
  },
  "Network Segment": {
    type: "String",
  },
  "Geo-location Data": {
    type: "String",
  },
  "Proxy Information": {
    type: "String",
  },
  "Firewall Logs": {
    type: "String",
  },
  "IDS/IPS Alerts": {
    type: "String",
  },
  "Log Source": {
    type: "String",
  },
});

export const CyberAttack = mongoose.model("CyberAttack", cyberAttackSchema);
