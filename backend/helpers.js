export function parseLocationData(airQualityData) {
  const aqius = airQualityData.current.pollution.aqius;
  switch (true) {
    case (aqius >= 51 && aqius <= 100):
      console.log('MODERATE AIR QUALITY');
      return {
        title: `Moderate Air Quality - ${aqius}`,
        message: 'Air Quality around you is acceptable :)',
      };
    case (aqius >= 101 && aqius <= 150):
      console.log('UNHEALTY FOR SENSITIVE GROUPS');
      return {
        title: `Subpar Air Quality - ${aqius}`,
        message: 'Sensitive groups such as people affected by lung diseases or elders might be affected',
      };
    case (aqius >= 151 && aqius <= 200):
      console.log('UNHEALTY');
      return {
        title: `Unhealthy Air Quality - ${aqius}`,
        message: 'Consider avoiding being exposed to the air - everyone can get affected',
      };
    case (aqius >= 201 && aqius <= 300):
      console.log('VERY UNHEALTHY');
      return {
        title: `VERY Unhealthy Air Quality - ${aqius}`,
        message: 'This is a health alert - everyone can experience severe effects',
      };
    case (aqius >= 301):
      console.log('HAZARDOUS AIR QUALITY');
      return {
        title: `HAZARDOUS Air Quality - ${aqius}`,
        message: 'Run, Forest, Run!',
      };
    default:
      console.log('safe bro');
      break;
  }
}

export function nahBro() {
  return 5;
}
