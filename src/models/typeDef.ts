import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    accidentCount: Int
    getAccidents(limit: Int, offset: Int): [Accident]
    getAccidentById(accidentId: String!): Accident
  }

  type Accident {
    _id: String
    ID: String
    Source: String
    Severity: String
    Start_Time: String
    End_Time: String
    Start_Lat: String
    Start_Lng: String
    End_Lat: String
    End_Lng: String
    Distancemi: String
    Description: String
    Street: String
    City: String
    County: String
    State: String
    Zipcode: String
    Country: String
    Timezone: String
    Airport_Code: String
    Weather_Timestamp: String
    TemperatureF: String
    Wind_ChillF: String
    Humidity: String
    Pressurein: String
    Visibilitymi: String
    Wind_Direction: String
    Wind_Speedmph: String
    Precipitationin: String
    Weather_Condition: String
    Amenity: String
    Bump: String
    Crossing: String
    Give_Way: String
    Junction: String
    No_Exit: String
    Railway: String
    Roundabout: String
    Station: String
    Stop: String
    Traffic_Calming: String
    Traffic_Signal: String
    Turning_Loop: String
    Sunrise_Sunset: String
    Civil_Twilight: String
    Nautical_Twilight: String
    Astronomical_Twilight: String
  }
`
