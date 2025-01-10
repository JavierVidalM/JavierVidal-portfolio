import { getWeatherConditions } from "../services/api";
import { WeatherConditions } from "../types/waetherTypes";

const fetchData = async () => {
  try {
    const data = await getWeatherConditions();
    return data;
  } catch (error) {
    console.error("Error fetching weather data: ", error);
  }
};

declare global {
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function (): string {
  if (this.length === 0) return this.toString();
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};


export async function getWeatherConditionIcon(condition: string) {
  const data = await fetchData();
  const weather = data.find(
    (w: WeatherConditions) => w.condition === condition
  );
  return weather ? weather.icon : weather[0].icon;
}

export async function getWeatherConditionDetail(condition: string) {
  const data = await fetchData();
  const weather = data.find(
    (w: WeatherConditions) => w.condition === condition
  );
  return weather ? weather.detail.capitalize() : weather[0].detail.capitalize();
}

