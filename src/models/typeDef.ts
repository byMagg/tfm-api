import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    crashCount: Int
    getCrashes(limit: Int, offset: Int): [TrafficCrash]
    getCrashByWeatherCondition(
      weatherCondition: String!
      limit: Int
      offset: Int
    ): [TrafficCrash]
  }

  type TrafficCrash {
    CRASH_RECORD_ID: String
    CRASH_DATE_EST_I: String
    CRASH_DATE: String
    POSTED_SPEED_LIMIT: String
    TRAFFIC_CONTROL_DEVICE: String
    DEVICE_CONDITION: String
    WEATHER_CONDITION: String
    LIGHTING_CONDITION: String
    FIRST_CRASH_TYPE: String
    TRAFFICWAY_TYPE: String
    LANE_CNT: String
    ALIGNMENT: String
    ROADWAY_SURFACE_COND: String
    ROAD_DEFECT: String
    REPORT_TYPE: String
    CRASH_TYPE: String
    INTERSECTION_RELATED_I: String
    NOT_RIGHT_OF_WAY_I: String
    HIT_AND_RUN_I: String
    DAMAGE: String
    DATE_POLICE_NOTIFIED: String
    PRIM_CONTRIBUTORY_CAUSE: String
    SEC_CONTRIBUTORY_CAUSE: String
    STREET_NO: String
    STREET_DIRECTION: String
    STREET_NAME: String
    BEAT_OF_OCCURRENCE: String
    PHOTOS_TAKEN_I: String
    STATEMENTS_TAKEN_I: String
    DOORING_I: String
    WORK_ZONE_I: String
    WORK_ZONE_TYPE: String
    WORKERS_PRESENT_I: String
    NUM_UNITS: String
    MOST_SEVERE_INJURY: String
    INJURIES_TOTAL: String
    INJURIES_FATAL: String
    INJURIES_INCAPACITATING: String
    INJURIES_NON_INCAPACITATING: String
    INJURIES_REPORTED_NOT_EVIDENT: String
    INJURIES_NO_INDICATION: String
    INJURIES_UNKNOWN: String
    CRASH_HOUR: String
    CRASH_DAY_OF_WEEK: String
    CRASH_MONTH: String
    LATITUDE: String
    LONGITUDE: String
    LOCATION: String
  }
`
