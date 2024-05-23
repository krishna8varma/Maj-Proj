from flask import Flask, jsonify, request
from datetime import datetime, timedelta
import gemini
import weather
from flask_cors import CORS
import functools
from concurrent.futures import ThreadPoolExecutor
from cachetools import TTLCache
app = Flask(__name__)
CORS(app)

data={}

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

@app.route('/start', methods=['POST','GET'])
def start():
    global data
    if request.method == 'POST':
        request_data=request.get_json()
        data['startingLocation']=request_data['startingLocation']
        data['endingDestination']=request_data['endingDestination']
        data['startingDate']=request_data['startingDate']
        data['endingDate']=request_data['endingDate']
        data['duration']=get_travel_duration_days(data['startingDate'], data['endingDate'])
        return jsonify({'data':data}), 200
    elif request.method=='GET':
        return jsonify(data),200
    else :
        return jsonify({'error': 'Method Not Allowed'}), 405

@app.route('/tripType', methods=['POST'])
def tripType():
    request_data=request.json
    data['tripType']=request_data['tripType']
    return jsonify({'message': 'Data posted Successfully'}),200

@app.route('/activities', methods=['GET','POST'])
def recommend_activities():
    if request.method == 'GET':
        activities=gemini.get_activities(data['endingDestination'],data['duration'],data['tripType']) 
        return jsonify({'activities': activities}),200

    elif request.method == 'POST':
        request_data = request.json
        data['selected_activities']=request_data['selected_activities']
        return jsonify({'message': 'POST request received'}),200

    else:
        # If other HTTP methods are not supported, return an error
        return jsonify({'error': 'Method not allowed'}), 405 

@app.route('/trip', methods=['GET']) #desti,duration,type,selected_act
def trip_planner():
    startLocation=data['startingLocation']
    destination=data['endingDestination']
    start_date=data['startingDate']
    duration=data['duration']
    type_of_trip=data['tripType']
    selected_activities=data['selected_activities']
    with ThreadPoolExecutor(max_workers=4) as executor:
        future_weather=executor.submit(fetch_weather,destination,start_date,duration)
        future_trip=executor.submit(fetch_trip,destination,duration,type_of_trip,selected_activities)
        future_hotels = executor.submit(fetch_hotels, destination, type_of_trip)
        # future_food = executor.submit(fetch_food, destination)

        # Collect results
        weather=future_weather.result()
        tripPlan = future_trip.result()
        hotels = future_hotels.result()
        # food = future_food.result()

    #add weather_data to tripPlan        
    return jsonify({
        'tripPlan': tripPlan,
        'weather' : weather,
        'hotels': hotels
        # 'food': food
    }), 200

def fetch_weather(destination,start_date,duration):
    return weather.get_weather_data(destination,start_date,duration)

def fetch_trip(destination,duration,type_of_trip,selected_activities) :
    return gemini.planned_trip(destination,duration,type_of_trip,selected_activities)

def fetch_hotels(destination,type_of_trip):
    return gemini.get_hotels(destination,type_of_trip)

def fetch_food(destination):
    return gemini.get_food(destination)

# @app.route('/weather', methods=['GET']) #desti,startdate,duration
# def getweather():
#     destination=data['endingDestination']
#     start_date=data['startingDate']
#     duration=data['duration']
#     weather_data=weather.get_weather_data(destination,start_date,duration)       
#     try:
#         data['destinationLocation']=weather_data['location']
#     except KeyError:
#         return {"Error" : "Data not found"}
#     return jsonify({'weather': weather_data}), 200
# @app.route('/hotels', methods=['GET']) #desti,type
# def hotels():
#     destination=data['endingDestination']
#     type_of_trip=data['tripType']
#     try:
#         hotel_list=gemini.get_hotels(destination,data['duration'],type_of_trip)       
#         return jsonify({'Hotels' : hotel_list}),200
#     except gemini.ConversionError as e:
#         return jsonify({'error' : e}),400
 
# @app.route('/food', methods=['GET']) #desti
# def food():
#     try:
#         food=gemini.get_food(data['endingDestination'])
#         return jsonify({'food' : food}),200
#     except:
#         return jsonify({'error' : "failed"}),400

if __name__=='__main__':
    app.config['JSON_SORT_KEYS']=False
    app.run(debug=True)
