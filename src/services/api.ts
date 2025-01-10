import axios from "axios";


const API_URL = "https://portfolio-api.javier-vidalm.workers.dev"

export const getWeatherConditions = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data
  } catch (error) {
    console.error("Error fetching weather data: ", error);
    throw error;
  }
};
