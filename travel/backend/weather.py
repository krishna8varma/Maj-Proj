import requests
from datetime import datetime, timedelta
import json
import os
from dotenv import load_dotenv

load_dotenv()

weather_key=os.getenv('weather_key')

def get_aqi_id(destination):
    base_url="https://api.weatherapi.com/v1/current.json"
    params = {
            "key": weather_key,
            "q": destination,
            "aqi": 'yes',
        }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        data = response.json()
        index = data['current']['air_quality']['us-epa-index']
        return index


def get_weather_data(destination,start_date,duration):
    base_url = "https://api.weatherapi.com/v1/forecast.json"
   
    # Initialize list to store forecast data
    forecast_data = {}
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    # Get aqi index
    aqi_index=get_aqi_id(destination)
    forecast_data['AQI']=aqi_index

    # Retrieve forecast data for next 'days' days (including today)
    for day in range(duration):
        target_date = start_date + timedelta(days=day)
        formatted_date = target_date.strftime("%Y-%m-%d")

        params = {
            "key": weather_key,
            "q": destination,
            "dt": formatted_date,
        }

        # Make API GET request
        response = requests.get(base_url, params=params)
        if response.status_code == 200:
            data = response.json()
            forecast_overall = data['forecast']['forecastday'][0]
           
            forecast_data[day+1]={
                "condition": forecast_overall['day']['condition']['text'],
                "max_temp": forecast_overall['day']['maxtemp_c'],
                "min_temp": forecast_overall['day']['mintemp_c'],
                "avg_humidity": forecast_overall['day']['avghumidity'],
                "sunrise": forecast_overall['astro']['sunrise'],
                "sunset": forecast_overall['astro']['sunset'],
            }

            #add a algorithm for weather calculation for morning afternoon and night
        else:
            print(f"Error fetching weather data for {formatted_date}: {response.status_code}")


    return forecast_data

'''destination='nagpur'
start_date='2024-04-10'
end_date='2024-04-15'
#print(get_weather_data(destination,start_date,5))'''