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
#using gemini model


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
                              safety_settings=safety_settings)




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
        print(cleaned_text)
    return trip_details

def get_activities(destination,duration,type_of_trip):
    r=15
    if duration>5 :
      r=duration*3
    prompt_parts = [
      "input: suggest me the 15 famous activities to do around manali and trip type is friends.  Don't include any places name and any details. Also don't include any bracket details. Activity name should be short.",
      "output: ['Skiing', 'Paragliding', 'Rafting', 'Trekking', 'Shopping', 'Camping', 'Zorbing', 'Kayaking', 'Horse and Yak riding', 'Fishing', 'Mountain biking', 'Rock climbing', 'Sightseeing', 'Wildlife Safari']",
      "input: suggest me the 20 famous activities to do around varanasi and trip type is family. Don't include any places name and any details. Also don't include any bracket details. Activity name should be short.",
      "output: ['Boating', 'Sightseeing', 'Temple', 'Wildlife Safari', 'Museum', 'Ghatt Visit', 'Shopping', 'Camping', 'Trekking', 'Kayaking', 'Horse riding', 'Rafting', 'Fishing', 'Cycling', 'Cooking Classes', 'Cultural Tours', 'Hot Air Balloon', 'Bird Watching', 'River Cruise', 'Private Tour']",
      "input: suggest me the 18 famous activities to do around japan and trip type is family.  Don't include any places name and any details. Also don't include any bracket details. Activity name should be short.",
      "output: ['Visit Temples and Shrines', 'Explore Nature', 'Discover Local Culture', 'Try Traditional Cuisine', 'See Historic Sites', 'Go Hiking', 'Attend a Tea Ceremony', 'Witness a Traditional Festival', 'Ride a Bullet Train', 'Visit Museums', 'Stroll Through Gardens', 'Go Shopping', 'Immerse in Anime and Manga', 'Experience Onsen', 'Admire Cherry Blossoms', 'Explore Theme Parks', 'Go Skiing', 'Try Snowboarding', 'Visit the Snow Monkeys', 'Go Stargazing']",
      f"input: suggest me the {r} famous activities to do around {destination} and trip type is {type_of_trip}. Don't include any places name and any details. Also don't include any bracket details. Activity name should be short.",
      "output: ",
    ]
    response=model.generate_content(prompt_parts)
    txt=response.text
    try:
        response1=ast.literal_eval(txt)
    except SyntaxError:
        return ['Heritage Site','Sightseeing','Cultural Experience', "Outdoor Adventures",'Relaxation and Well','Explore Cuisines','Shopping','Photography','Night Life','Sports and Recreation']
    return response1

def get_hotels(destination,duration,type_of_trip):
    prompt_parts = [
  "input: I am a tourist and want to plan my itinerary to kolkalta for 5 days. can you help me find some budget-friendly (around 1000-3000rs) and some luxurious hotels to stay over? provide the details of 15 hotels. My type of trip is solo. Also include 2 famous amenities tags for each hotel. price range should be for per night",
  "output: [{\"hotel_name\": \"The Oberoi Grand, Kolkata\", \"location\": [22.5488, 88.3533], \"rating\": 4.6, \"price_range\": \"₹8,000 - ₹12,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"Taj Bengal\", \"location\": [22.5519, 88.3478], \"rating\": 4.7, \"price_range\": \"₹7,000 - ₹10,000\", \"amenities\": [\"Swimming Pool\", \"Spa\"]}, {\"hotel_name\": \"JW Marriott Hotel Kolkata\", \"location\": [22.5503, 88.3433], \"rating\": 4.8, \"price_range\": \"₹9,000 - ₹12,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"ITC Sonar, a Luxury Collection Hotel, Kolkata\", \"location\": [22.5624, 88.4189], \"rating\": 4.9, \"price_range\": \"₹10,000 - ₹15,000\", \"amenities\": [\"Swimming Pool\", \"Spa\"]}, {\"hotel_name\": \"The Lalit Great Eastern Kolkata\", \"location\": [22.5486, 88.3506], \"rating\": 4.7, \"price_range\": \"₹7,000 - ₹10,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"Hyatt Regency Kolkata\", \"location\": [22.5494, 88.3467], \"rating\": 4.8, \"price_range\": \"₹8,000 - ₹11,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"Novotel Kolkata Hotel & Residences\", \"location\": [22.5444, 88.3433], \"rating\": 4.6, \"price_range\": \"₹6,000 - ₹9,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"Holiday Inn Kolkata Airport\", \"location\": [22.6456, 88.4447], \"rating\": 4.5, \"price_range\": \"₹5,000 - ₹8,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"DoubleTree by Hilton Kolkata\", \"location\": [22.5436, 88.3533], \"rating\": 4.6, \"price_range\": \"₹6,000 - ₹9,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"The Park Kolkata\", \"location\": [22.5478, 88.3486], \"rating\": 4.7, \"price_range\": \"₹7,000 - ₹10,000\", \"amenities\": [\"Swimming Pool\", \"Spa\"]}, {\"hotel_name\": \"The Westin Kolkata Rajarhat\", \"location\": [22.5667, 88.4622], \"rating\": 4.8, \"price_range\": \"₹8,000 - ₹11,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"Fairfield by Marriott Kolkata\", \"location\": [22.5536, 88.4328], \"rating\": 4.5, \"price_range\": \"₹5,000 - ₹8,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"Holiday Inn Express Kolkata Airport\", \"location\": [22.6486, 88.4472], \"rating\": 4.4, \"price_range\": \"₹4,000 - ₹7,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"Lemon Tree Premier Kolkata\", \"location\": [22.5511, 88.3978], \"rating\": 4.6, \"price_range\": \"₹6,000 - ₹9,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"Ginger Kolkata Airport\", \"location\": [22.6506, 88.4494], \"rating\": 4.3, \"price_range\": \"₹3,000 - ₹6,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}]",
  "input: I am a tourist and want to plan my itinerary to manali for 5 days. can you help me find some budget-friendly (around 1000-3000rs) and some luxurious hotels to stay over? provide the details of 15 hotels. My type of trip is friends. Also include 2 famous amenities tags for each hotel. price range should be for per night. provide real hotels name which are in manali.",
  "output: [{\"hotel_name\": \"The Manali Inn\", \"location\": [32.2478, 77.1906], \"rating\": 4.6, \"price_range\": \"₹1,000 - ₹2,000\", \"amenities\": [\"Free WiFi\", \"Parking\"]}, {\"hotel_name\": \"Hotel Manali Plaza\", \"location\": [32.2506, 77.1897], \"rating\": 4.7, \"price_range\": \"₹1,500 - ₹2,500\", \"amenities\": [\"Free Breakfast\", \"Mountain View\"]}, {\"hotel_name\": \"Hotel Johnson Lodge & Spa\", \"location\": [32.2494, 77.1883], \"rating\": 4.8, \"price_range\": \"₹2,000 - ₹3,000\", \"amenities\": [\"Swimming Pool\", \"Spa\"]}, {\"hotel_name\": \"Hotel The Orchard Greens\", \"location\": [32.2489, 77.1872], \"rating\": 4.9, \"price_range\": \"₹2,500 - ₹3,500\", \"amenities\": [\"Free WiFi\", \"Mountain View\"]}, {\"hotel_name\": \"Hotel Honeymoon Inn\", \"location\": [32.2497, 77.1914], \"rating\": 4.7, \"price_range\": \"₹1,500 - ₹2,500\", \"amenities\": [\"Free Breakfast\", \"Free WiFi\"]}, {\"hotel_name\": \"Hotel Manu Allaya\", \"location\": [32.2511, 77.1889], \"rating\": 4.8, \"price_range\": \"₹2,000 - ₹3,000\", \"amenities\": [\"Free Parking\", \"Mountain View\"]}, {\"hotel_name\": \"Hotel Mount View\", \"location\": [32.2486, 77.1894], \"rating\": 4.6, \"price_range\": \"₹1,000 - ₹2,000\", \"amenities\": [\"Free WiFi\", \"Free Breakfast\"]}, {\"hotel_name\": \"Hotel River View\", \"location\": [32.2491, 77.1903], \"rating\": 4.5, \"price_range\": \"₹1,500 - ₹2,500\", \"amenities\": [\"Free Parking\", \"Mountain View\"]}, {\"hotel_name\": \"Hotel Valley View\", \"location\": [32.2481, 77.1878], \"rating\": 4.6, \"price_range\": \"₹1,000 - ₹2,000\", \"amenities\": [\"Free Breakfast\", \"Free WiFi\"]}, {\"hotel_name\": \"Hotel Woodville Palace\", \"location\": [32.2499, 77.1922], \"rating\": 4.7, \"price_range\": \"₹1,500 - ₹2,500\", \"amenities\": [\"Free WiFi\", \"Mountain View\"]}, {\"hotel_name\": \"The Himalayan\", \"location\": [32.2497, 77.1869], \"rating\": 4.8, \"price_range\": \"₹2,000 - ₹3,000\", \"amenities\": [\"Free Parking\", \"Mountain View\"]}, {\"hotel_name\": \"Hotel Johnson Lodge & Cottages\", \"location\": [32.2503, 77.1931], \"rating\": 4.5, \"price_range\": \"₹1,500 - ₹2,500\", \"amenities\": [\"Free Breakfast\", \"Free WiFi\"]}, {\"hotel_name\": \"Hotel The Manali Heights\", \"location\": [32.2541, 77.1953], \"rating\": 4.4, \"price_range\": \"₹1,000 - ₹2,000\", \"amenities\": [\"Free Parking\", \"Free WiFi\"]}, {\"hotel_name\": \"Hotel The White Meadows\", \"location\": [32.2478, 77.1891], \"rating\": 4.3, \"price_range\": \"₹1,000 - ₹2,000\", \"amenities\": [\"Free Breakfast\", \"Free Parking\"]}, {\"hotel_name\": \"Hotel The White Peaks\", \"location\": [32.2464, 77.1875], \"rating\": 4.2, \"price_range\": \"₹1,000 - ₹2,000\", \"amenities\": [\"Free WiFi\", \"Free Parking\"]}]",
  "input: I am a tourist and want to plan my itinerary to nagpur for 5 days. can you help me find some budget-friendly (around 1000-3000rs) and some luxurious hotels to stay over? provide the details of 15 hotels. My type of trip is family. Also include 2 famous amenities tags for each hotel. price range should be for per night. provide real hotels name which are in nagpur.",
  "output: [{\"hotel_name\": \"The Tajbagh Palace\", \"location\": [21.1496, 79.0883], \"rating\": 4.6, \"price_range\": \"₹8,000 - ₹12,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"The Radisson Blu Hotel Nagpur\", \"location\": [21.1489, 79.0869], \"rating\": 4.7, \"price_range\": \"₹7,000 - ₹10,000\", \"amenities\": [\"Swimming Pool\", \"Spa\"]}, {\"hotel_name\": \"The Crowne Plaza Nagpur\", \"location\": [21.1483, 79.0855], \"rating\": 4.8, \"price_range\": \"₹9,000 - ₹12,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"The Hyatt Regency Nagpur\", \"location\": [21.1477, 79.0841], \"rating\": 4.9, \"price_range\": \"₹10,000 - ₹15,000\", \"amenities\": [\"Swimming Pool\", \"Spa\"]}, {\"hotel_name\": \"The Le Meridien Nagpur\", \"location\": [21.1471, 79.0827], \"rating\": 4.7, \"price_range\": \"₹7,000 - ₹10,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"The Courtyard by Marriott Nagpur\", \"location\": [21.1465, 79.0813], \"rating\": 4.8, \"price_range\": \"₹8,000 - ₹11,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"The Holiday Inn Nagpur\", \"location\": [21.1459, 79.0800], \"rating\": 4.6, \"price_range\": \"₹6,000 - ₹9,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"The Novotel Nagpur\", \"location\": [21.1453, 79.0786], \"rating\": 4.5, \"price_range\": \"₹5,000 - ₹8,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"The DoubleTree by Hilton Nagpur\", \"location\": [21.1447, 79.0772], \"rating\": 4.6, \"price_range\": \"₹6,000 - ₹9,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"The Park Nagpur\", \"location\": [21.1441, 79.0758], \"rating\": 4.7, \"price_range\": \"₹7,000 - ₹10,000\", \"amenities\": [\"Swimming Pool\", \"Spa\"]}, {\"hotel_name\": \"The Westin Nagpur\", \"location\": [21.1435, 79.0744], \"rating\": 4.8, \"price_range\": \"₹8,000 - ₹11,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"The Fairfield by Marriott Nagpur\", \"location\": [21.1429, 79.0730], \"rating\": 4.5, \"price_range\": \"₹5,000 - ₹8,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"The Holiday Inn Express Nagpur\", \"location\": [21.1423, 79.0716], \"rating\": 4.4, \"price_range\": \"₹4,000 - ₹7,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"The Lemon Tree Premier Nagpur\", \"location\": [21.1417, 79.0702], \"rating\": 4.6, \"price_range\": \"₹6,000 - ₹9,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}, {\"hotel_name\": \"The Ginger Nagpur Airport\", \"location\": [21.1411, 79.0688], \"rating\": 4.3, \"price_range\": \"₹3,000 - ₹6,000\", \"amenities\": [\"Swimming Pool\", \"Fitness Center\"]}]",
  f"input: I am a tourist and want to plan my itinerary to {destination} for 5 days. can you help me find some budget-friendly (around 1000-3000rs) and some luxurious hotels to stay over? provide the details of 15 hotels. My type of trip is {type_of_trip}. Also include 2 famous amenities tags for each hotel. price range should be for per night. provide real hotels name which are in {destination}.",
  "output: ",
]
    response=model.generate_content(prompt_parts)
    res1=response.text
    hotel_list=response_to_json(res1)
    # if hotel_list is None:
    #     raise ConversionError("Failed to convert gemini response")
    #img_hotel=photos.get_photo(f"hotels {destination}")
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
    r"input: I am a tourist and want to plan a trip to manali for 5 days. My type of trip is friends and I would like to enjoy the following activities:['heritage site', 'amusement park', 'hiking', 'clubbing', 'bike ride', 'camping', 'trekking', 'waterfall hike',' photography']. provide me the budget range for the trip provided. output in dictionary format.",
    r"output: {\"Budget\": [2000,3000],\"Day 1\": {\"Morning\": {\"Place Name\": \"Hadimba Temple\",\"Place_location\": [32.24228, 77.187366],\"Opening Hours\": [\"08:00\", \"17:00\"],\"Rating\": 4.7,\"Activity Type\": [\"Photography\", \"Heritage\"]},\"Afternoon\": {\"Place Name\": \"Himalayan Adventures Park\",\"Place_location\": [32.205276, 77.169732],\"Opening Hours\": [\"09:00\", \"17:00\"],\"Rating\": 4.2,\"Activity Type\": [\"Amusement Park\", \"Games\"]},\"Evening\": {\"Place Name\": \"Johnson’s Cafe\",\"Place_location\": [32.267461, 77.181867],\"Opening Hours\": [\"24 hours\"],\"Rating\": 4.6,\"Activity Type\": [\"Clubbing\", \"Party\"]}}, \"Day 2\": {\"Morning\": {\"Place Name\": \"Solang Valley\", \"Place_location\": [32.315899, 77.157184],\"Opening Hours\": [\"08:00\", \"17:00\"],\"Rating\": 4.7,\"Activity Type\": [\"Paragliding\", \"Zorbing\"]}, \"Afternoon\": {\"Place Name\": \"Rohtang Pass\",\"Place_location\": [32.372844, 77.244645],\"Opening Hours\": [\"08:00\", \"17:00\"],\"Rating\": 4.5,\"Activity Type\": [\"Photography\", \"Snow Activities\"]},\"Evening\": {\"Place Name\": \"Beas River\",\"Place_location\": [32.245843, 77.183274],\"Opening Hours\": [\"24 hours\"],\"Rating\": 4.6,\"Activity Type\": [\"Camping\", \"Bonfire\"]}},\"Day 3\": {\"Morning\": {\"Place Name\": \"Hidimba Devi Temple\",\"Place_location\": [32.236548, 77.174717],\"Opening Hours\": [\"08:00\", \"17:00\"],\"Rating\": 4.7,\"Activity Type\": [\"Photography\", \"Heritage\"]},\"Afternoon\": {\"Place Name\": \"Himalayan Adventures Park\",\"Place_location\": [32.205276, 77.169732],\"Opening Hours\": [\"09:00\", \"17:00\"],\"Rating\": 4.2,\"Activity Type\": [\"Amusement Park\", \"Games\"]},\"Evening\": {\"Place Name\": \"Manu Temple\",\"Place_location\": [32.239086, 77.180059],\"Opening Hours\": [\"08:00\", \"17:00\"],\"Rating\": 4.6,\"Activity Type\": [\"Historical\", \"Photography\"]}},\"Day 4\": {\"Morning\": {\"Place Name\": \"Jogini Waterfalls\",\"Place_location\": [32.22911, 77.166123],\"Opening Hours\": [\"24 hours\"],\"Rating\": 4.7,\"Activity Type\": [\"Waterfall Hike\", \"Photography\"]},\"Afternoon\": {\"Place Name\": \"Bhrigu Lake\",\"Place_location\": [32.178975, 77.652943],\"Opening Hours\": [\"24 hours\"],\"Rating\": 4.5,\"Activity Type\": [\"Trekking\", \"Photography\"]},\"Evening\": {\"Place Name\": \"Camp Purple\",\"Place_location\": [32.256245, 77.193496],\"Opening Hours\": [\"24 hours\"],\"Rating\": 4.6,\"Activity Type\": [\"Camping\", \"Bonfire\"]}},\"Day 5\": {\"Morning\": {\"Place Name\": \"Parvati River\",\"Place_location\": [32.106262, 77.177348],\"Opening Hours\": [\"24 hours\"],\"Rating\": 4.7,\"Activity Type\": [\"River Rafting\", \"Camping\"]}, \"Afternoon\": {\"Place Name\": \"Solang Valley\",\"Place_location\": [32.315899, 77.157184],\"Opening Hours\": [\"08:00\", \"17:00\"],\"Rating\": 4.7,\"Activity Type\": [\"Biking\", \"Paragliding\"]}, \"Evening\": {\"Place Name\": \"The Johnson's Bar & Restaurant\",\"Place_location\": [32.24575, 77.183233],\"Opening Hours\": [\"24 hours\"],\"Rating\": 4.6,\"Activity Type\": [\"Food\", \"Drinks\"]}}}",
    f"input: I am a tourist and want to plan a trip to {destination} for {duration} days. My type of trip is {type_of_trip} and i would like to enjoy following activities:{activities} provide me the budget range for the trip provided. output in dictionary format.",
    "output: "
]
    response = model.generate_content(prompt_parts)
    res1=response.text
    # print(res1)
    plan=response_to_json(res1)  #plan is a python dict obj

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