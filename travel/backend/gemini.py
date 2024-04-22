import google.generativeai as genai
import requests
from datetime import datetime, timedelta
import json
import os
from dotenv import load_dotenv
import ast

load_dotenv()


gemini_key=os.getenv('gemini_key')
genai.configure(api_key=gemini_key)
model = genai.GenerativeModel('gemini-pro')

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
    return duration


def get_activities(destination,type_of_trip):
    prompt=f"Give me the python type of list of minimum 15 famous activities to do in {destination} for {type_of_trip} trip. Don't include any places name and any details. Also don't include any bracket details. Activity name should be short. output format: ['heritage site','amusement park','hiking','clubbing','bike ride',...]"
    response=model.generate_content(prompt)
    txt=response.text
    
    response1=ast.literal_eval(txt)
    return response1


def response_to_json(text):
    # Remove unwanted characters from the string
    cleaned_text = text.replace("`", "").replace("\n", "").strip()   #or text=text.replace("`","")  text=text.replace("\n","")  text=text.replace(" ","")

    # Convert the cleaned response string to a Python dictionary using json.loads
    try:
        trip_details = json.loads(cleaned_text)
        # Print the trip details dictionary
    except json.JSONDecodeError as e:
        print("Error decoding response:", e)
        return None
    return trip_details


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
    p4="""1. Places name
    2. location=list[Longitude, latitude]
    3. Opening Hours(options are ['08:00', '17:00'] or ['24 hours'])
    4. Rating of the place
    5. Activity type

    output format:
    start with { char and don't assign any name to the dictionary
    {
        "Day 1": {
            "Morning": {
                "Place Name": "Solang Valley",
                "location": ["longitude", "latitude"],
                "Opening Hours": [IN time, OUT time],
                "Rating": 4.7,
                "Activity Type": ["Paragliding,"Zorbing"]
            },
            "Afternoon": {
                "Place Name": "Rohtang Pass",
                "location": ["longitude", "latitude"],
                "Opening Hours": [08:00, 17:00],
                "Rating": 4.5,
                "Activity Type": ["Photography "," Snow Activities" ]
            },
            "Evening": {
                "Place Name": "Old Manali",
                "location": ["longitude", "latitude"],
                "Opening Hours": [IN time, OUT time],
                "Rating": 4.4,
                "Activity Type": ["Dinner", "Drinks", "Live Music"]
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
    #using gemini model
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(p)
    res1=response.text
    plan=response_to_json(res1)  #plan is a python dict obj
    return plan


#'''for code testing
destination='nagpur'
start_date='2024-04-25'
end_date='2024-04-30'
type_of_trip='solo'
activities=get_activities(destination,type_of_trip)
duration=get_travel_duration_days(start_date,end_date)
# tripPlan=planned_trip(destination,duration,type_of_trip,activities)
# print(tripPlan)
print(activities)
