import { createContext, useState } from "react";

interface IWeatherPayload {
  city: string;
  country: string;
}

interface ISearchHistory {
  city: string;
  country: string;
  time?: string;
  id: string;
}

interface IWeather {
  area: string;
  description: string;
  humidity: string;
  tempMin: string;
  tempMax: string;
  time: string;
  main: string;
  icon:
    | "01d"
    | "01n"
    | "02n"
    | "03d"
    | "03n"
    | "04d"
    | "04n"
    | "09d"
    | "09n"
    | "10d"
    | "10n"
    | "11d"
    | "11n";
}

const initialData = {
  searchHistory: [] as ISearchHistory[],
  weather: {} as IWeather,
  getWeather: (payload: IWeatherPayload, isReCall?: boolean) => {},
  removeSearchHistory: (id: string) => {},
  isError: false,
  handleSetError: (isError: boolean) => {},
};

export const HomeContext = createContext(initialData);

const HomeProvider = (props: any) => {
  const [searchHistory, setSearchHistory] = useState<ISearchHistory[]>([]);
  const [weather, setWeather] = useState<IWeather>({
    area: "",
    description: "",
    humidity: "",
    tempMin: "",
    tempMax: "",
    time: "",
    main: "",
    icon: "11n",
  });
  const [isError, setIsError] = useState<boolean>(false);

  const handleSetError = (isError: boolean) => setIsError(isError);

  const getWeather = async (
    payload: IWeatherPayload,
    isReCall: boolean = false
  ) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEATHER_API_URL}?q=${payload.city},${payload.country}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      const weatherResponse = await response.json();
      if (weatherResponse?.cod === "404") {
        handleSetError(true);
        return;
      }

      const date = new Date();

      const customWeather = {
        main: weatherResponse?.weather?.[0]?.main,
        area: `${weatherResponse?.name}, ${weatherResponse?.sys?.country}`,
        description: weatherResponse?.weather?.[0]?.description,
        humidity: `${weatherResponse?.main?.humidity}%`,
        tempMin: weatherResponse?.main?.temp_min,
        tempMax: weatherResponse?.main?.temp_max,
        time: `${date.toDateString()} ${date.toLocaleTimeString()}`,
        icon: weatherResponse?.weather?.[0]?.icon,
      };

      setWeather(customWeather);

      if (!isReCall) {
        const historySearch = [
          ...searchHistory,
          {
            ...payload,
            time: date.toLocaleTimeString(),
            id: Math.random().toString(36).substring(2, 6),
          },
        ];
        setSearchHistory(historySearch);

        return;
      }
    } catch (err) {
      handleSetError(true);
      console.log(err);
    }
  };

  const removeSearchHistory = (id: string) => {
    const newSearchHistory = searchHistory.filter((item) => item.id !== id);
    setSearchHistory(newSearchHistory);
  };

  const contextValue = {
    searchHistory,
    weather,
    getWeather,
    removeSearchHistory,
    isError,
    handleSetError,
  };

  return (
    <HomeContext.Provider value={contextValue}>
      {props.children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
