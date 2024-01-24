import mongoose, { Schema } from 'mongoose'

const trafficCrashSchema = new Schema(
  {
    CRASH_RECORD_ID: {
      type: 'String',
    },
    CRASH_DATE_EST_I: {
      type: 'String',
    },
    CRASH_DATE: {
      type: 'Date',
    },
    POSTED_SPEED_LIMIT: {
      type: 'String',
    },
    TRAFFIC_CONTROL_DEVICE: {
      type: 'String',
    },
    DEVICE_CONDITION: {
      type: 'String',
    },
    WEATHER_CONDITION: {
      type: 'String',
    },
    LIGHTING_CONDITION: {
      type: 'String',
    },
    FIRST_CRASH_TYPE: {
      type: 'String',
    },
    TRAFFICWAY_TYPE: {
      type: 'String',
    },
    LANE_CNT: {
      type: 'String',
    },
    ALIGNMENT: {
      type: 'String',
    },
    ROADWAY_SURFACE_COND: {
      type: 'String',
    },
    ROAD_DEFECT: {
      type: 'String',
    },
    REPORT_TYPE: {
      type: 'String',
    },
    CRASH_TYPE: {
      type: 'String',
    },
    INTERSECTION_RELATED_I: {
      type: 'String',
    },
    NOT_RIGHT_OF_WAY_I: {
      type: 'String',
    },
    HIT_AND_RUN_I: {
      type: 'String',
    },
    DAMAGE: {
      type: 'String',
    },
    DATE_POLICE_NOTIFIED: {
      type: 'Date',
    },
    PRIM_CONTRIBUTORY_CAUSE: {
      type: 'String',
    },
    SEC_CONTRIBUTORY_CAUSE: {
      type: 'String',
    },
    STREET_NO: {
      type: 'Date',
    },
    STREET_DIRECTION: {
      type: 'String',
    },
    STREET_NAME: {
      type: 'String',
    },
    BEAT_OF_OCCURRENCE: {
      type: 'Date',
    },
    PHOTOS_TAKEN_I: {
      type: 'String',
    },
    STATEMENTS_TAKEN_I: {
      type: 'String',
    },
    DOORING_I: {
      type: 'String',
    },
    WORK_ZONE_I: {
      type: 'String',
    },
    WORK_ZONE_TYPE: {
      type: 'String',
    },
    WORKERS_PRESENT_I: {
      type: 'String',
    },
    NUM_UNITS: {
      type: 'Date',
    },
    MOST_SEVERE_INJURY: {
      type: 'String',
    },
    INJURIES_TOTAL: {
      type: 'Date',
    },
    INJURIES_FATAL: {
      type: 'Date',
    },
    INJURIES_INCAPACITATING: {
      type: 'Date',
    },
    INJURIES_NON_INCAPACITATING: {
      type: 'Date',
    },
    INJURIES_REPORTED_NOT_EVIDENT: {
      type: 'Date',
    },
    INJURIES_NO_INDICATION: {
      type: 'Date',
    },
    INJURIES_UNKNOWN: {
      type: 'Date',
    },
    CRASH_HOUR: {
      type: 'String',
    },
    CRASH_DAY_OF_WEEK: {
      type: 'Date',
    },
    CRASH_MONTH: {
      type: 'Date',
    },
    LATITUDE: {
      type: 'String',
    },
    LONGITUDE: {
      type: 'String',
    },
    LOCATION: {
      type: 'String',
    },
  },
  {
    collection: 'traffic-crashes',
  }
)

export const TrafficCrash = mongoose.model('TrafficCrash', trafficCrashSchema)
