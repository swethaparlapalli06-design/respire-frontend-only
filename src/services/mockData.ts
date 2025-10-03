// Mock data for when backend is not available
export const mockTrafficData = {
  segments: [
    {
      id: '1',
      coordinates: [[78.4567, 17.3850], [78.4570, 17.3855]],
      congestion: 0.75,
      speedKmph: 15,
      freeflowKmph: 60,
      roadType: 'major'
    },
    {
      id: '2', 
      coordinates: [[78.4580, 17.3860], [78.4590, 17.3870]],
      congestion: 0.45,
      speedKmph: 35,
      freeflowKmph: 50,
      roadType: 'arterial'
    },
    {
      id: '3',
      coordinates: [[78.4600, 17.3880], [78.4610, 17.3890]],
      congestion: 0.25,
      speedKmph: 45,
      freeflowKmph: 55,
      roadType: 'local'
    }
  ],
  incidents: [
    {
      id: 'inc1',
      type: 'accident',
      severity: 'high',
      coordinates: [78.4567, 17.3850],
      description: 'Vehicle collision blocking traffic',
      timestamp: new Date().toISOString()
    },
    {
      id: 'inc2',
      type: 'construction',
      severity: 'medium', 
      coordinates: [78.4580, 17.3860],
      description: 'Road construction in progress',
      timestamp: new Date().toISOString()
    }
  ],
  updatedAt: new Date().toISOString()
};

export const mockAqiData = {
  cells: [
    {
      id: 'cell1',
      coordinates: [78.4567, 17.3850],
      aqi: 180,
      pm25: 85,
      pm10: 120,
      no2: 45,
      o3: 35,
      so2: 25,
      co: 8.5
    },
    {
      id: 'cell2',
      coordinates: [78.4580, 17.3860], 
      aqi: 220,
      pm25: 105,
      pm10: 150,
      no2: 55,
      o3: 40,
      so2: 30,
      co: 9.2
    },
    {
      id: 'cell3',
      coordinates: [78.4600, 17.3880],
      aqi: 160,
      pm25: 75,
      pm10: 110,
      no2: 40,
      o3: 32,
      so2: 22,
      co: 7.8
    }
  ],
  stations: [
    {
      id: 'station1',
      name: 'Abids Road',
      coordinates: [78.4567, 17.3850],
      aqi: 180,
      pm25: 85,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'station2', 
      name: 'Charminar',
      coordinates: [78.4580, 17.3860],
      aqi: 220,
      pm25: 105,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'station3',
      name: 'Kukatpally Road',
      coordinates: [78.4600, 17.3880],
      aqi: 160,
      pm25: 75,
      lastUpdated: new Date().toISOString()
    }
  ],
  updatedAt: new Date().toISOString()
};

export const mockAlertsData = {
  alerts: [
    {
      id: 'alert1',
      zoneId: 'abids-road',
      zoneName: 'Abids Road',
      aqi: 280,
      pm25: 145,
      severity: 'critical',
      coordinates: [78.4567, 17.3850],
      timestamp: new Date().toISOString(),
      description: 'Very unhealthy air quality detected'
    },
    {
      id: 'alert2',
      zoneId: 'charminar',
      zoneName: 'Charminar',
      aqi: 320,
      pm25: 165,
      severity: 'critical', 
      coordinates: [78.4580, 17.3860],
      timestamp: new Date().toISOString(),
      description: 'Hazardous air quality levels'
    },
    {
      id: 'alert3',
      zoneId: 'kukatpally-road',
      zoneName: 'Kukatpally Road',
      aqi: 250,
      pm25: 125,
      severity: 'critical',
      coordinates: [78.4600, 17.3880], 
      timestamp: new Date().toISOString(),
      description: 'Unhealthy air quality alert'
    }
  ]
};
