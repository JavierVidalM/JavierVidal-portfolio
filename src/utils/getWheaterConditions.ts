export function getWeatherConditionIcon(condition: string) {
  const weather = weather_conditions.find((w) => w.condition === condition);
  return weather ? weather.icon : weather_conditions[0].icon;
}

export function getWeatherConditionDetails(condition: string) {
  const weather = weather_conditions.find((w) => w.condition === condition);
  return weather ? weather.details : weather_conditions[0].details;
}


const weather_conditions: {
  id: number;
  condition: string;
  details: string;
  icon: string;
}[] = [
  {
    id: 1,
    condition: "Clear",
    details: "Cielo despejado",
    icon: "https://img.icons8.com/?size=100&id=8EUmYhfLPTCF&format=png&color=000000",
  },
  {
    id: 2,
    condition: "Sunny",
    details: "Soleado",
    icon: "https://img.icons8.com/?size=100&id=8EUmYhfLPTCF&format=png&color=000000",
  },
  {
    id: 3,
    condition: "Partly Cloudy",
    details: "Parcialmente nublado",
    icon: "https://img.icons8.com/?size=100&id=zIVmoh4T8wh7&format=png&color=000000",
  },
  {
    id: 4,
    condition: "Cloudy",
    details: "Nublado",
    icon: "https://www.svgrepo.com/show/430565/cloud.svg",
  },
  {
    id: 5,
    condition: "Overcast",
    details: "Cubierto",
    icon: "https://www.svgrepo.com/show/430565/cloud.svg",
  },
  {
    id: 6,
    condition: "Mist",
    details: "Neblina ligera",
    icon: "https://img.icons8.com/?size=100&id=8EUmYhfLPTCF&format=png&color=000000",
  },
  {
    id: 7,
    condition: "Fog",
    details: "Niebla densa",
    icon: "https://www.svgrepo.com/show/430566/mist.svg",
  },
  {
    id: 8,
    condition: "Patchy Rain Possible",
    details: "Posible lluvia ligera localizada",
    icon: "https://www.svgrepo.com/show/430569/cloud-rain.svg",
  },
  {
    id: 9,
    condition: "Light Rain",
    details: "Lluvia ligera",
    icon: "https://www.svgrepo.com/show/430569/cloud-rain.svg",
  },
  {
    id: 10,
    condition: "Moderate Rain",
    details: "Lluvia moderada",
    icon: "https://www.svgrepo.com/show/430570/cloud-heavy-rain.svg",
  },
  {
    id: 11,
    condition: "Heavy Rain",
    details: "Lluvia fuerte",
    icon: "https://www.svgrepo.com/show/430570/cloud-heavy-rain.svg",
  },
  {
    id: 12,
    condition: "Thunderstorm",
    details: "Tormenta eléctrica",
    icon: "https://www.svgrepo.com/show/430571/cloud-lightning.svg",
  },
  {
    id: 13,
    condition: "Snow",
    details: "Nieve ligera o moderada",
    icon: "https://www.svgrepo.com/show/430572/cloud-snow.svg",
  },
  {
    id: 14,
    condition: "Heavy Snow",
    details: "Nieve intensa",
    icon: "https://www.svgrepo.com/show/430572/cloud-snow.svg",
  },
  {
    id: 15,
    condition: "Hail",
    details: "Granizo",
    icon: "https://www.svgrepo.com/show/430574/cloud-hail.svg",
  },
  {
    id: 16,
    condition: "Sleet",
    details: "Aguanieve",
    icon: "https://www.svgrepo.com/show/430573/cloud-drizzle.svg",
  },
  {
    id: 17,
    condition: "Freezing Rain",
    details: "Lluvia helada",
    icon: "https://www.svgrepo.com/show/430574/cloud-hail.svg",
  },
];
