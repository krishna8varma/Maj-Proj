import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()
travel_key=os.getenv('travel_key')
geocode_key=os.getenv('geocode_key')

def get_geocode(destination):
    base_url='https://geocode.maps.co/search'
    params={
        'api_key' : geocode_key,
        'q' : destination
    }
    response=requests.get(base_url,params=params)
    if response.status_code == 200:
        data = response.json()
        lat=data[0]['lat']
        lon=data[0]['lon']
        return lat,lon
print(get_geocode('Nagpur'))

'''def get_hotelList(destination):
    base_url = "https://test.api.amadeus.com/v3"
   
    params={
        "latitude"
        "longitude"
        "radius"
        "radiusUnit"


    }
'''