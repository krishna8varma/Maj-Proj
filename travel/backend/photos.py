import requests
import json

# Replace 'YOUR_PEXELS_API_KEY' with your actual Pexels API key
API_KEY = 'TQm7Vcrl2SoasurgPQ7Z6Hc1AriXVS9yXk6FkcO8Sb3CdWW2wY96xz1s'
SEARCH_QUERY = 'Taj Mahal'
URL = f'https://api.pexels.com/v1/search?query={SEARCH_QUERY}&per_page=1'

headers = {
    'Authorization': API_KEY
}

response = requests.get(URL, headers=headers)

# Check if the request was successful
if response.status_code == 200:
    data = response.json()
    # Pretty print the JSON response
    print(json.dumps(data, indent=4))
else:
    print(f"Failed to retrieve data: {response.status_code}") #src small