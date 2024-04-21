import google.generativeai as genai
import requests
from datetime import datetime, timedelta
import json
import os
from dotenv import load_dotenv


load_dotenv()


gemini_key=os.getenv('gemini_key')
model = genai.GenerativeModel('gemini-pro')

if gemini_key is None:
    raise ValueError("API_key not found in environment variables. Please set it in .env file")


def get_travel_duration_days(start_date,end_date):
    date_format = '%d-%m-%Y'


    # Convert start_date_str and end_date_str to datetime objects
    start_date = datetime.strptime(start_date, date_format)
    end_date = datetime.strptime(end_date, date_format)


    # Calculate the difference between end_date and start_date
    delta = end_date - start_date


    # Extract the number of days from the delta object
    duration = delta.days+1
    return duration


def get_activities(destination,type_of_trip):
  prompt=f"Give me the list of activities to do in {destination} for {type_of_trip} trip. Don't include any places name and any details. Also don't include any bracket details. Activity name should be short."
  response=model.generate_content(prompt)
  return response.text


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
    activities=get_activities(destination,type_of_trip)
    p1=f"""I am a tourist and want to plan a trip to {destination} for {duration} days. My type of trip is {type_of_trip} and i would like to enjoy following activities: {activities}"""
    p2="""
    Inputs:
    1. City to visit
    2. Type of trip (eg solo, friends, family or couple)
    3. Activities (Trekking, Skiing, Rafting, Paragliding, Camping, Shopping)"""
    p3=f"""Output: json format which contains day wise itinerary plan for {duration} days with a mix of mentioned activities based on preferences and each day contains three sections (morning, afternoon and evening). Each section should contain only one nearby place name along with following fields:"""
    p4="""1. Places name
    2. location=list[Longitude, latitude]
    3. Opening Hours(in time format)
    4. Best time to visit in a day (options are morning, afternoon or evening)
    5. Rating of the place
    6. Activity type


    output format:
    start with { char and don't assign any name to the list
    {
        "Day 1": {
            "Morning": {
                "Place Name": "Solang Valley",
                "Landmark Type": "Adventure Sports Hub",
                "location": ["longitude", "latitude"],
                "Opening Hours": [IN time, OUT time],
                "Visit Time": "Morning",
                "Rating": 4.7,
                "Activity Type": ["Paragliding,"Zorbing"]
            },
            "Afternoon": {
                "Place Name": "Rohtang Pass",
                "Landmark Type": "High Mountain Pass",
                "location": ["longitude", "latitude"],
                "Opening Hours": [IN time, OUT time],
                "Visit Time": "Afternoon",
                "Rating": 4.5,
                "Activity Type": ["Photography "," Snow Activities" ]
            },
            "Evening": {
                "Place Name": "Old Manali",
                "Landmark Type": "Lively Area with Cafes and Bars",
                "location": ["longitude", "latitude"],
                "Opening Hours": [IN time, OUT time],
                "Visit Time": "Evening",
                "Rating": 4.4,
                "Activity Type": ["Dinner", "Drinks", "Live Music"]
            }
        },
        "Day 2": {
            "Morning": {
                "Place Name": "Beas River",
                "Landmark Type": "River Rafting Point",
                "location": ["longitude", "latitude"],
                "Opening Hours": [IN time, OUT time],
                "Visit Time": "Morning",
                "Rating": 4.6,
                "Activity Type": ["White Water Rafting"]
            },
            "Afternoon": {
                "Place Name": "Kheerganga Trek",
                "Landmark Type": "Trek with Hot Springs",
                "location": ["longitude", "latitude"],
                "Opening Hours": [IN time, OUT time],
                "Visit Time": "Afternoon",
                "Rating": 4.5,
                "Activity Type": ["Trekking "," Hot Springs Experience"]
            },
            "Evening": {
                "Place Name": "Campfire and socializing at Kheerganga",
                "Landmark Type": "Camping Experience",
                "location": ["longitude", "latitude"],
                "Opening Hours": [IN time, OUT time],
                "Visit Time": "Evening",
                "Rating": 4.7,
                "Activity Type": ["Camping "," Bonfire"]
            }
        }
        "Day 3": {
            "Morning": {
                "Place Name": "Hampta Pass Trek (Day hike or overnight)",
                "Landmark Type": "High Altitude Mountain Pass Trek",
                "location": ["longitude", "latitude"],
                "Opening Hours": [IN time, OUT time],
                "Visit Time": "Morning",
                "Rating": 4.7,
                "Activity Type": ["Trekking" ]
            },
            "Afternoon": {
                "Place Name": "Chandratal Lake (If doing Hampta Pass trek)",
                "Landmark Type": "High Altitude Lake",
                "location": ["longitude", "latitude"],
                "Opening Hours": [IN time, OUT time],
                "Visit Time": "Afternoon",
                "Rating": 4.8,
                "Activity Type": ["Scenic Viewing"," Photography"]
            },
            "Evening": {
                "Place Name": "Relaxing at campsite or guesthouse",
                "Landmark Type": "Accommodation",
                "location": ["longitude", "latitude"],
                "Opening Hours": [IN time, OUT time],
                "Visit Time": "Evening",
                "Rating": float value or None,
                "Activity Type": ["Relaxation","Socializing"]
            }
        }
        "Day 4": {
            "Morning": {
                "Place Name": "Naggar Castle",
                "Landmark Type": "Historical Castle",
                "location": ["longitude", "latitude"],
                "Opening Hours": [IN time, OUT time],
                "Visit Time": "Morning",
                "Rating": 4.4,
                "Activity Type": ["Historical Exploration","Scenic Views"]
            },
            "Afternoon": {
                "Place Name": "Mall Road",
                "Landmark Type": "Shopping and Dining Street",
                "location": ["longitude", "latitude"],
                "Opening Hours": [IN time, OUT time],
                "Visit Time": "Afternoon",
                "Rating": 4.5,
                "Activity Type": ["Souvenir", "Shopping"]
            },
            "Evening": {
                "Place Name": "Local Restaurant or Cafe with Live Music",
                "Landmark Type": "Dining and Entertainment",
                "location": ["longitude", "latitude"],
                "Opening Hours": [IN time, OUT time],
                "Visit Time": "Evening",
                "Rating": float value or None,
                "Activity Type": ["Farewell Dinner", "Entertainment"]
            }
        }
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
destination='Mumbai'
start_date='16-04-2024'
end_date='20-04-2024'
type_of_trip='solo'


tripPlan=planned_trip(destination,start_date,end_date,type_of_trip)



