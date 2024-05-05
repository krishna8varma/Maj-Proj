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
model = genai.GenerativeModel('gemini-pro')  #using gemini model

class ConversionError(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message =message

def response_to_json(text):
    # Remove unwanted characters from the string
    cleaned_text = text.replace("`", "").replace("\n", "").replace('\\', '').strip()   #or text=text.replace("`","")  text=text.replace("\n","")  text=text.replace(" ","")
    #return cleaned_text
    # Convert the cleaned response string to a Python dictionary using json.loads
    try:
        trip_details = json.loads(cleaned_text)
        # Print the trip details dictionary
    except json.JSONDecodeError as e:
        print("Error decoding response:", e)
        return None
    return trip_details

def get_activities(destination,type_of_trip):
    prompt=f"Give me the python type of list of minimum 15 famous activities to do in {destination} for {type_of_trip} trip. Don't include any places name and any details. Also don't include any bracket details. Activity name should be short. output format: ['heritage site','amusement park','hiking','clubbing','bike ride',...]"
    response=model.generate_content(prompt)
    txt=response.text
    #txt=txt.translate(str.maketrans(' ',' ',string.punctuation))
    txt=txt.replace("- ","")
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
    p1=f"""I am a tourist and want to plan a trip to {destination} for {duration} days. My type of trip is {type_of_trip} and i would like to enjoy following activities: {activities}. Dont consider activities other than these"""
    p2="""
    Inputs:
    1. City to visit
    2. duration of trip
    3. Type of trip (eg solo, friends, family or couple)
    4. Activities (Trekking, Skiing, Rafting, Paragliding, Camping, Shopping)"""
    p3=f"""Output: json format which contains day wise itinerary plan for {duration} days with a mix of mentioned activities based on preferences and each day contains three sections (morning, afternoon and evening). Each section should contain only one nearby place name along with following fields:"""
    p4="""1. Place name(should be short with maximun 3 words)
    2. Place location=[latitude,longitude]
    2. Opening Hours(options are ['08:00', '17:00'] or ['24 hours'])
    3. Rating of the place
    4. Activity type(include only 2 activities)
    output format:
    start with { char and don't assign any name to the dictionary
    {
        "Day 1": {
            "Morning": {
                "Place Name": "Solang Valley",
                "Place_location" : [32.316,77.157]
                "Opening Hours": [IN time, OUT time],
                "Rating": 4.7,
                "Activity Type": ["Paragliding,"Zorbing"]
            },
            "Afternoon": {
                "Place Name": "Rohtang Pass",
                "Place_location" : [32.372844,77.2446450]
                "Opening Hours": [08:00, 17:00],
                "Rating": 4.5,
                "Activity Type": ["Photography", "Snow Activities"]
            },
            "Evening": {
                "Place Name": "Old Manali",
                "Place_location" : [latitude,longitude]
                "Opening Hours": [IN time, OUT time],
                "Rating": 4.4,
                "Activity Type": ["Drinks", "Live Music"]
            }
        },
        "Day 2": {
            "Morning": {
                ...
            },
            "Afternoon": {
                ...
            },
            "Evening": {
                ...
            }
        },
        "Day 3"{...}
        .
        .
        .
        "Day {duration}"
    }
    """
    p=p1+p2+p3+p4
    response = model.generate_content(p)
    res1=response.text
    # print(res1)
    plan=response_to_json(res1)  #plan is a python dict obj
    if plan is None:
        raise ConversionError("Failed to convert gemini response")
    #adding photos
    places_imgs=photos.get_photo(f"places to visit in {destination}")
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