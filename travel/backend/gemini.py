import google.generativeai as genai
import requests,random
from datetime import datetime, timedelta
import json
import os
from dotenv import load_dotenv
import ast
import photos,geocoding
load_dotenv()


gemini_key=os.getenv('gemini_key') 
if gemini_key is None:
    raise ValueError("API_key not found in environment variables. Please set it in .env file")

genai.configure(api_key=gemini_key)
# model = genai.GenerativeModel('gemini-pro')  
# Set up the model
generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 0,
  "max_output_tokens": 2048,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings) #using gemini model

class ConversionError(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message =message

def response_to_json(text):
    # Remove unwanted characters from the string
    cleaned_text = text.replace("`", "").replace("\n", "").replace("'", '"').strip()   #or text=text.replace("`","")  text=text.replace("\n","")  text=text.replace(" ","")
    # Convert the cleaned response string to a Python dictionary using json.loads
    try:
        trip_details = json.loads(cleaned_text)
    except json.JSONDecodeError as e:
        print("Error decoding response:", e)
        return None
    return trip_details

def get_activities(destination,duration,type_of_trip):
    r=15
    if duration>5 : 
      r=duration*3
    prompt_parts = [
      "input: suggest me the 15 famous activities to do around manali and trip type is friends.  Don't include any places name and any details. Also don't include any bracket details. Activity name should be short.",
      "output: ['skiing', 'paragliding', 'rafting', 'trekking', 'shopping', 'camping', 'yoga', 'kayaking', 'horse riding', 'fishing', 'mountain biking', 'rock climbing', 'paragliding', 'sightseeing', 'wildlife safari']",
      "input: suggest me the 20 famous activities to do around varanasi and trip type is family. Don't include any places name and any details. Also don't include any bracket details. Activity name should be short.",
      "output: ['boating', 'sightseeing', 'temple', 'wildlife safari', 'museum', 'yoga', 'shopping', 'camping', 'trekking', 'kayaking', 'horse riding', 'rafting', 'fishing', 'cycling', 'cooking classes', 'cultural tours', 'hot air balloon', 'bird watching', 'river cruise', 'private tour']",
      f"input: suggest me the {r} famous activities to do around {destination} and trip type is {type_of_trip}. Don't include any places name and any details. Also don't include any bracket details. Activity name should be short.",
      "output: ",
    ]    
    response=model.generate_content(prompt_parts)
    txt=response.text
    try:
        response1=ast.literal_eval(txt) 
    except SyntaxError:
        return ['Heritage Site','Sightseeing','Cultural Experience', "Outdoor Adventures",'Relaxation and Well','Explore Cuisines','Shopping','Photography','Night Life','Sports and Recreation']
    #response1=response_to_json(txt)
    return response1

def get_hotels(destination,type_of_trip):
    p1=f"""Give me list of 15 hotels
    Inputs:
        1. Destination: {destination}
        2. Type of stay: {type_of_trip}
    Output: json format which contains a list of hotels with the following fields:
        1. Hotel name
        2. location=[latitude,longitude]
        3. Rating of hotel
        4. Price per night (in range)
        5. Google hotel page(provided link should be short)"""
    p2="""output format: start with [ char and don't assign any name to the list
    [
        {
            "hotel_name": "The Himalayan Village",
            "location": [32.2549, 77.1682],
            "rating": 4.5,
            "price_range": "₹4,000 - ₹8,000",
            "hotel_page": "https://www.google.com/search?q=The+Himalayan+Village+Manali" 
        },
        {
            "hotel_name": "Johnson Lodge & Spa",
            "location": [32.2428, 77.174],
            "rating": 4.6,
            "price_range": "₹5,000 - ₹10,000",
            "hotel_page": "https://www.google.com/search?q=Johnson+Lodge+%26+Spa+Manali" 
        },
        {
            ...
        },
        ...
    ]"""
    response=model.generate_content(p1+p2)
    res1=response.text
    hotel_list=response_to_json(res1)
    if hotel_list is None:
        raise ConversionError("Failed to convert gemini response")
    img_hotel=photos.get_photo(f"hotels {destination}")
    # for i in hotel_list:
    #     name=i["hotel_name"]
    #     loc=geocoding.get_geolocation(name)
    #     if loc != []:
    #         i['location']=loc
    #     i['image']=random.choice(img_hotel)
    return hotel_list        

def get_food(destination): 
    p1=f"""Give me list of 15 restaurants and cafes(food places) in {destination}
    Output:python list object which contains a list of restaurants and cafes(food places) with the following fields:
        1. Restaurant Name
        2. location=list[latitude, longitude]
        3. Rating
        4. Food Served
    output format: output should be bounded by [] brackets. don't assign any name to the list also don't include backslash and any escape char"""
    response=model.generate_content(p1)
    res1=response.text
    fc=response_to_json(res1)  #fc is a python list obj
    if fc is None:
        raise ConversionError("Failed to convert gemini response")
    img_fc=photos.get_photo(f"Restuarants in {destination}")
    # for i in fc:
    #     name=i["Restaurant Name"]
    #     loc=geocoding.get_geolocation(name)
    #     if loc != []:
    #         i['location']=loc
    #     i['image']=random.choice(img_fc)
    return fc

def planned_trip(destination,duration,type_of_trip,activities): 
    #activities= ['Trekking', 'Skiing', 'Rafting', 'Paragliding', 'Camping', 'Shopping']
    prompt_parts = [
        "input: I am a tourist and want to plan a trip to manali for 5 days. My type of trip is friends and I would like to enjoy the following activities:['heritage site', 'amusement park', 'hiking', 'clubbing', 'bike ride', 'camping', 'trekking', 'waterfall hike',' photography']. place_location should be a list consists of latitude, longitude",
        "output: {'Day 1': {'Morning': {'Place Name': 'Hadimba Temple','Place_location': [latitude, longitude],'Opening Hours': ['08:00', '17:00'],'Rating': 4.7,'Activity Type': ['Photography', 'Heritage']},'Afternoon': {'Place Name': 'Himalayan Adventures Park','Place_location': [32.205276, 77.169732],'Opening Hours': ['09:00', '17:00'],'Rating': 4.2,'Activity Type': ['Amusement Park', 'Games']},'Evening': {'Place Name': 'Johnson’s Cafe','Place_location': [32.267461, 77.181867],'Opening Hours': ['24 hours'],'Rating': 4.6,'Activity Type': ['Clubbing', 'Party']}}, 'Day 2': {'Morning': {'Place Name': 'Solang Valley', 'Place_location': [32.315899, 77.157184],'Opening Hours': ['08:00', '17:00'],'Rating': 4.7,'Activity Type': ['Paragliding', 'Zorbing']}, 'Afternoon': {'Place Name': 'Rohtang Pass','Place_location': [32.372844, 77.244645],'Opening Hours': ['08:00', '17:00'],'Rating': 4.5,'Activity Type': ['Photography', 'Snow Activities']},'Evening': {'Place Name': 'Beas River','Place_location': [32.245843, 77.183274],'Opening Hours': ['24 hours'],'Rating': 4.6,'Activity Type': ['Camping', 'Bonfire']}},'Day 3': {'Morning': {'Place Name': 'Hidimba Devi Temple','Place_location': [32.236548, 77.174717],'Opening Hours': ['08:00', '17:00'],'Rating': 4.7,'Activity Type': ['Photography', 'Heritage']},'Afternoon': {'Place Name': 'Himalayan Adventures Park','Place_location': [32.205276, 77.169732],'Opening Hours': ['09:00', '17:00'],'Rating': 4.2,'Activity Type': ['Amusement Park', 'Games']},'Evening': {'Place Name': 'Manu Temple','Place_location': [32.239086, 77.180059],'Opening Hours': ['08:00', '17:00'],'Rating': 4.6,'Activity Type': ['Historical', 'Photography']}},'Day 4': {'Morning': {'Place Name': 'Jogini Waterfalls','Place_location': [32.22911, 77.166123],'Opening Hours': ['24 hours'],'Rating': 4.7,'Activity Type': ['Waterfall Hike', 'Photography']},'Afternoon': {'Place Name': 'Bhrigu Lake','Place_location': [32.178975, 77.652943],'Opening Hours': ['24 hours'],'Rating': 4.5,'Activity Type': ['Trekking', 'Photography']},'Evening': {'Place Name': 'Camp Purple','Place_location': [32.256245, 77.193496],'Opening Hours': ['24 hours'],'Rating': 4.6,'Activity Type': ['Camping', 'Bonfire']}},'Day 5': {'Morning': {'Place Name': 'Parvati River','Place_location': [32.106262, 77.177348],'Opening Hours': ['24 hours'],'Rating': 4.7,'Activity Type': ['River Rafting', 'Camping']}, 'Afternoon': {'Place Name': 'Solang Valley','Place_location': [32.315899, 77.157184],'Opening Hours': ['08:00', '17:00'],'Rating': 4.7,'Activity Type': ['Biking', 'Paragliding']}, 'Evening': {'Place Name': 'The Johnsons Bar & Restaurant', 'Place_location' : [32.24575, 77.183233],'Opening Hours': ['24 hours'],'Rating': 4.6,'Activity Type': ['Food', 'Drinks']}}}",
        f"input: I am a tourist and want to plan a trip to {destination} for {duration} days. My type of trip is {type_of_trip} and i would like to enjoy following activities: {activities}",
        "output: ",
    ]
    response = model.generate_content(prompt_parts)
    res1=response.text
    plan=response_to_json(res1)  #plan is a python dict obj
    if plan is None:
        raise ConversionError("Failed to convert gemini response")
    #adding photos
    # places_imgs=photos.get_photo(f"places to visit in {destination}")
    # for i in range(duration):
    #     query=plan[f'Day {i+1}']['Morning']
    #     query['image']=random.choice(places_imgs)
    #     query=plan[f'Day {i+1}']['Afternoon']
    #     query['image']=random.choice(places_imgs)
    #     query=plan[f'Day {i+1}']['Evening']
    #     query['image']=random.choice(places_imgs)
    return plan


'''for code testing
destination='nagpur'
start_date='2024-04-25'
end_date='2024-04-30'
type_of_trip='solo'
print(get_food(destination='pune'))
#print(get_hotels(destination,type_of_trip))
activities=get_activities(destination,type_of_trip)
duration=get_travel_duration_days(start_date,end_date)
tripPlan=planned_trip(destination,duration,type_of_trip,activities)
#print(type(activities))
print(tripPlan)
#print(activities)'''