import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()
travel_key=os.getenv('travel_key')
geocode_key=os.getenv('geocode_key')

def getHotelLink(hotelName,destination):
    base_url='https://www.google.com/search?q='
    q=hotelName.replace(' ','+')
    link=base_url+q+'+'+destination
    return link
