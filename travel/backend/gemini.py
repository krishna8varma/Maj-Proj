import google.generativeai as genai
import requests
from datetime import datetime, timedelta
import json
import os
from dotenv import load_dotenv
import ast
import photos
load_dotenv()


gemini_key=os.getenv('gemini_key')
genai.configure(api_key=gemini_key)
model = genai.GenerativeModel('gemini-pro')  #using gemini model

if gemini_key is None:
    raise ValueError("API_key not found in environment variables. Please set it in .env file")

def get_travel_duration_days(start_date,end_date):
    date_format = '%Y-%m-%d'

    # Convert start_date_str and end_date_str to datetime objects
    start_date = datetime.strptime(start_date, date_format)
    end_date = datetime.strptime(end_date, date_format)

    # Calculate the difference between end_date and start_date
    delta = end_date - start_date

    # Extract the number of days from the delta object
    duration = delta.days+1
    return int(duration)

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
        2. location=list[latitude, longitude]
        3. Rating of hotel
        4. Price per night (in range)
        5. Google hotel page(provided link should be short)"""
    p2="""output format: start with [ char and don't assign any name to the list
    [
        {
            "hotel_name": "The Himalayan Village",
            "location": [77.1682, 32.2549],
            "rating": 4.5,
            "price_range": "₹4,000 - ₹8,000",
            "hotel_page": "https://www.google.com/search?q=The+Himalayan+Village+Manali" 
        },
        {
            "hotel_name": "Johnson Lodge & Spa",
            "location": [77.1744, 32.2428],
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
    for i in hotel_list:
        query=i["hotel_name"]
        i['photo']=photos.get_photo(query)
    return hotel_list

def get_food(destination):
    p1=f"""Give me list of 15 restaurants and cafes(food places) in {destination}
    Output:raw json format which contains a list of restaurants and cafes(food places) with the following fields:
        1. Restaurant Name
        2. location=list[latitude, longitude]
        3. Rating
        4. Food Served
    output format: start with [ char. don't assign any name to the list also don't include backslash and any escape char"""
    response=model.generate_content(p1)
    res1=response.text
    fc=response_to_json(res1)  #fc is a python list obj
    for i in fc:
        query=i["Restaurant Name"]
        i['photo']=photos.get_photo(query)
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
    2. precise geolocation=list[latitude, longitude]
    3. Opening Hours(options are ['08:00', '17:00'] or ['24 hours'])
    4. Rating of the place
    5. Activity type(include only 2 activities)
    output format:
    start with { char and don't assign any name to the dictionary
    {
        "Day 1": {
            "Morning": {
                "Place Name": "Solang Valley",
                "place geolocation": [latitude, longitude],
                "Opening Hours": [IN time, OUT time],
                "Rating": 4.7,
                "Activity Type": ["Paragliding,"Zorbing"]
            },
            "Afternoon": {
                "Place Name": "Rohtang Pass",
                "place geolocation": [latitude, longitude],
                "Opening Hours": [08:00, 17:00],
                "Rating": 4.5,
                "Activity Type": ["Photography", "Snow Activities"]
            },
            "Evening": {
                "Place Name": "Old Manali",
                "place geolocation": [latitude, longitude],
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
    print(res1)
    plan=response_to_json(res1)  #plan is a python dict obj
    if plan==None:
        print("ERROR while converting trip plan to python object")
        return {}
    else:
        #adding photos
        '''for i in range(duration):
            query=plan[f'Day {i+1}']['Morning']
            query['photo']=photos.get_photo(query['Place Name'])
            query=plan[f'Day {i+1}']['Afternoon']
            query['photo']=photos.get_photo(query['Place Name'])
            query=plan[f'Day {i+1}']['Evening']
            query['photo']=photos.get_photo(query['Place Name'])'''
        return plan

#print(get_food(destination='pune'))
#'''for code testing
destination='nagpur'
start_date='2024-04-25'
end_date='2024-04-30'
type_of_trip='solo'
#print(get_hotels(destination,type_of_trip))
activities=get_activities(destination,type_of_trip)
duration=get_travel_duration_days(start_date,end_date)
tripPlan=planned_trip(destination,duration,type_of_trip,activities)
#print(type(activities))
print(tripPlan)
#print(activities)
