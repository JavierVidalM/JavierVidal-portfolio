/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import backgroundImage from "../../assets/9580633.jpg";
import {
  getWeatherConditionDetail,
  getWeatherConditionIcon,
} from "../../utils/getWheaterConditions";
import "./LockScreen.css";

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [time, setTime] = useState<string>("00:00");
  const [isFocused, setIsFocused] = useState(true);
  const [weather, setWeather] = useState<any>(null);
  const [weatherCondition, setWeatherCondition] = useState<string>("");
  const [weatherIcon, setWeatherIcon] = useState<string>("");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startY, setStartY] = useState(0);
  const [screenPosition, setScreenPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);

  const apiUrl = import.meta.env.VITE_WEATHER_API_URL2;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.getHours().toString().padStart(2, "0") +
          ":" +
          now.getMinutes().toString().padStart(2, "0")
      );
    };

    updateTime();
    const intervalId = setInterval(
      updateTime,
      60000 - new Date().getSeconds() * 1000
    );

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (!apiUrl) {
          throw new Error("WEATHER_API_URL is not defined");
        }
        const response = await axios.get(apiUrl);
        const weather = await getWeatherConditionDetail(
          response.data.current_condition[0].weatherDesc[0].value.split(",")[0]
        );
        setWeatherCondition(weather);
        setWeather(response.data);
        const icon = await getWeatherConditionIcon(
          response.data.current_condition[0].weatherDesc[0].value.split(",")[0]
        );
        setWeatherIcon(icon);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [time]);

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const date = now.toLocaleDateString("en-GB", {
    month: "long",
    day: "numeric",
  });

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsMouseDown(true);
    setStartY(event.clientY);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isMouseDown) {
      const deltaY = event.clientY - startY;
      setScreenPosition(deltaY);
      if (-deltaY > window.innerHeight * 0.6) {
        setIsFocused(false);
        setTimeout(() => setShowAdditionalContent(true), 400);
      }
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    // if (screenPosition > window.innerHeight*0.6) {
    // setScreenPosition(window.innerHeight);
    // } else {
    setScreenPosition(0);
    // }
  };

  return (
    <div
      className={`flex w-screen h-screen overflow-hidden ${
        !backgroundImage ? "bg-violet-700" : ""
      } align-middle items-center justify-center select-none`}
      onClick={() => {
        setShowAdditionalContent(true);
        setIsFocused(false);
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={(event) => event.preventDefault()}
    >
      <img
        src={backgroundImage}
        alt="lock screen image"
        className="w-full h-full object-cover fixed top-0 left-0 -z-10"
      />
      <div
        className={`bg-black/40 w-full h-full ${
          isFocused ? "backdrop-blur-none" : "backdrop-blur-2xl"
        } transition-all duration-500`}
      >
        {isFocused ? (
          <div
            style={{
              transform: `translateY(${screenPosition}px)`,
              transition: "transform 0.1s linear",
            }}
            className="h-full"
          >
            <div className="relative top-[10%] text-center">
              <h1 className="text-white text-[120px] font-medium">{time}</h1>
              <h2 className="text-white text-3xl font-light">
                {day}, {date}
              </h2>
            </div>
            <div
              className="rounded-lg bg-black/15 absolute bottom-[5%] left-[5%] backdrop-blur-md p-3 group hover:bg-black/40 transition-all cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                window.open(
                  `https://weather.com/weather/today/l/${weather.nearest_area[0].latitude},${weather.nearest_area[0].longitude}`,
                  "_blank"
                );
              }}
            >
              <p className="text-white font-medium text-md">
                {weather.nearest_area[0].areaName[0].value},{" "}
                {weather.nearest_area[0].country[0].value}
              </p>
              <div className="flex align-middle items-center">
                <div className="flex align-middle items-center">
                  <img
                    src={weatherIcon}
                    alt="weather icon"
                    className="h-20 mt-4 weather-icon transition-transform"
                  />
                  <p className="py-2 pl-2 text-white text-5xl font-medium">
                    {weather.current_condition[0].temp_C}
                  </p>
                  <p className="text-white text-base font-mono font-extralight mb-4">
                    °C
                  </p>
                </div>
                <div className="ml-20 mx-2 text-white text-lg font-normal text-center justify-center items-center">
                  <div className="">
                    {weatherCondition.capitalize()}{" "}
                  </div>
                  <div className="">
                    {weather.weather[0].maxtempC}° /{" "}
                    {weather.weather[0].mintempC}°
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center text-slate-300">
                Ver más
              </div>
            </div>
          </div>
        ) : (
          showAdditionalContent && (
            <div
              className="flex w-full h-full items-center justify-center"
              style={{
                transform: "scale(1)",
                transition: "transform 0s",
              }}
              onClick={() => {
                setIsFocused(true);
                setShowAdditionalContent(false);
              }}
            >
              <div
                className="items-center justify-center text-center top-[20%] absolute"
                style={{
                  transform: "scale(0.85)",
                  animation: "expand 0.3s forwards",
                }}
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src="https://unavatar.io/github/JavierVidalM"
                  alt="Javier Profile Picture"
                  className=" w-52 h-52 rounded-full bg-slate-600 mb-4"
                />
                {/* <div className=" w-52 h-52 rounded-full bg-slate-600 mb-4" /> */}
                <p className="text-2xl text-white">Javier Vidal</p>
                <button
                  className="mt-14 bg-slate-300/10 py-2 px-6 rounded text-white font-extralight hover:bg-slate-400/10 transition-all duration-300"
                  onClick={() => {
                    setIsFocused(true);
                    onUnlock();
                  }}
                >
                  Ingresar
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default LockScreen;
