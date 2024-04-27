import mongoose, { Schema } from 'mongoose'

const accidentsSchema = new Schema(
  {
    _id: {
      type: 'ObjectId',
    },
    ID: {
      type: 'String',
    },
    Source: {
      type: 'String',
    },
    Severity: {
      type: 'Date',
    },
    Start_Time: {
      type: 'Date',
    },
    End_Time: {
      type: 'Date',
    },
    Start_Lat: {
      type: 'String',
    },
    Start_Lng: {
      type: 'String',
    },
    End_Lat: {
      type: 'String',
    },
    End_Lng: {
      type: 'String',
    },
    Distance: {
      type: 'String',
    },
    Description: {
      type: 'String',
    },
    Street: {
      type: 'String',
    },
    City: {
      type: 'String',
    },
    County: {
      type: 'String',
    },
    State: {
      type: 'String',
    },
    Zipcode: {
      type: 'String',
    },
    Country: {
      type: 'String',
    },
    Timezone: {
      type: 'String',
    },
    Airport_Code: {
      type: 'String',
    },
    Weather_Timestamp: {
      type: 'Date',
    },
    Temperature: {
      type: 'String',
    },
    Wind_Chill: {
      type: 'String',
    },
    Humidity: {
      type: 'String',
    },
    Pressure: {
      type: 'String',
    },
    Visibility: {
      type: 'String',
    },
    Wind_Direction: {
      type: 'String',
    },
    Wind_Speed: {
      type: 'String',
    },
    Precipitation: {
      type: 'String',
    },
    Weather_Condition: {
      type: 'String',
    },
    Amenity: {
      type: 'String',
    },
    Bump: {
      type: 'String',
    },
    Crossing: {
      type: 'String',
    },
    Give_Way: {
      type: 'String',
    },
    Junction: {
      type: 'String',
    },
    No_Exit: {
      type: 'String',
    },
    Railway: {
      type: 'String',
    },
    Roundabout: {
      type: 'String',
    },
    Station: {
      type: 'String',
    },
    Stop: {
      type: 'String',
    },
    Traffic_Calming: {
      type: 'String',
    },
    Traffic_Signal: {
      type: 'String',
    },
    Turning_Loop: {
      type: 'String',
    },
    Sunrise_Sunset: {
      type: 'String',
    },
    Civil_Twilight: {
      type: 'String',
    },
    Nautical_Twilight: {
      type: 'String',
    },
    Astronomical_Twilight: {
      type: 'String',
    },
  },
  {
    collection: 'accidents',
  }
)

export const Accident = mongoose.model('Accident', accidentsSchema)
