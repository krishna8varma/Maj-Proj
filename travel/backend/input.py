import requests

start_data={
    'startingLocation': "pune",
    'endingDestination': 'pune',
    'startingDate': '16-05-2024',
    'endingDate': '18-05-2024'
}

url='http://127.0.0.1:5000/start'

response=requests.post(url, json=start_data)
if response.status_code==200:
    print("data sent successfully", response.text)
else:
    print("Request failed, Try again")

response=requests.post('http://127.0.0.1:5000/tripType',json={'tripType': 'solo'})
if response.status_code==200:
    print("successful  ", response.text)
else:
    print("Request failed, Try again",response.status_code)

response=requests.get('http://127.0.0.1:5000/activities')
if response.status_code==200:
    print("successful  ", response.text)
else:
    print("Request failed, Try again")