import requests
from datetime import datetime, timedelta
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
        return index,[data['location']['lat'], data['location']['lon']]


def get_weather_data(destination,start_date,duration):
    base_url = "https://api.weatherapi.com/v1/forecast.json"
   
    # Initialize list to store forecast data
    forecast_data = {}
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    # Get aqi index
    aqi_index,location=get_aqi_id(destination)
    forecast_data['AQI']=aqi_index
    forecast_data['location']=location
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
            try:
                forecast_overall = data['forecast']['forecastday'][0]
                x=f'Day {day+1}'
                forecast_data[x]={
                    "condition": forecast_overall['day']['condition']['text'],
                    "icon": forecast_overall['day']['condition']['icon'],
                    #"max_temp": forecast_overall['day']['maxtemp_c'],
                    #"min_temp": forecast_overall['day']['mintemp_c'],
                    #"avg_humidity": forecast_overall['day']['avghumidity'],
                    "sunrise": forecast_overall['astro']['sunrise'],
                    "sunset": forecast_overall['astro']['sunset']
                }
            except KeyError:
                return {"Error" : "Data not found"}

            #add a algorithm for weather calculation for morning afternoon and night
        else:
            print(f"Error fetching weather data for {formatted_date}: {response.status_code}")


    return forecast_data

<<<<<<< Updated upstream
'''destination='nagpur'
start_date='2024-05-05'
end_date='2024-05-10'
print(get_weather_data(destination,start_date,5))'''
=======
# print(get_weather_data("Nagpur","25-04-2024",4))
>>>>>>> Stashed changes
