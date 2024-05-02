from flask import Flask, jsonify, request
import requests
import gemini
import weather
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data={}

@app.route('/start', methods=['POST','GET'])
def start():
    global data
    if request.method == 'POST':
        request_data=request.get_json()
        data['startingLocation']=request_data['startingLocation']
        data['endingDestination']=request_data['endingDestination']
        data['startingDate']=request_data['startingDate']
        data['endingDate']=request_data['endingDate']
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
        activities=gemini.get_activities(data['endingDestination'],data['tripType']) 
        return jsonify({'activities': activities}),200

    elif request.method == 'POST':
        request_data = request.json
        data['selected_activities']=request_data['selected_activities']
        return jsonify({'message': 'POST request received'}),200

    else:
        # If other HTTP methods are not supported, return an error
        return jsonify({'error': 'Method not allowed'}), 405 
    
@app.route('/trip', methods=['GET'])
def trip_planner():
    destination=data['endingDestination']
    start_date=data['startingDate']
    end_date=data['endingDate']
    type_of_trip=data['tripType']
    selected_activities=data['selected_activities']
    duration=gemini.get_travel_duration_days(start_date,end_date)
    
    #weather_data=weather.get_weather_data(destination,start_date,duration)
    tripPlan=gemini.planned_trip(destination,duration,type_of_trip,selected_activities)
    
    #add weather_data to tripPlan        
    return jsonify({'tripPlan': tripPlan, 'weather': None}), 200

@app.route('/hotels', methods=['GET'])
def hotels():
    try:
        hotel_list=gemini.get_hotels(data['endingDestination'],data['tripType'])
        return jsonify({'Hotels' : hotel_list}),200
    except:
        return jsonify({'error' : "failed"}),400
    
@app.route('/food', methods=['GET'])
def food():
    try:
        food=gemini.get_food(data['endingDestination'])
        return jsonify({'food' : food}),200
    except:
        return jsonify({'error' : "failed"}),400

if __name__=='__main__':
    app.run(debug=True)