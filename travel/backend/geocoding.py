import requests,json
from dotenv import load_dotenv
import os

load_dotenv()
geokey=os.getenv("geocode_key")

def get_geolocation(place):
    base_url="https://geocode.maps.co/search"
    params={
        "q" : place,
        "api_key" : geokey 
    }

    response = requests.get(url=base_url,params=params)
    if response.status_code==200:
        data=response.json()
        if data == []:
            return []
        else:
            id=data[0]
            return [id['lat'],id['lon']]
    else:
        return[]

#print(get_geolocation("sadar+nagpur"))