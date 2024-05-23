import requests


def fetch_images(query):
    access_key = 'In3LBUO94kJlQ_qwVDs5w7-5MDWh40gsnEXvyDJ5mKk'
    url = f'https://api.unsplash.com/search/photos'
    params = {
        'query': query,
        'client_id': access_key
    }


    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()
        return data['results']
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error: {e}")
        return []
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return []


if __name__ == '__main__':
    query = input("Enter your search query (e.g., 'places', 'landscapes', 'cities'): ")
    images = fetch_images(query)
    print(images)

    print("Images of Places:")
    for idx, image in enumerate(images, start=1):
        print(f"{idx}. {image['urls']['regular']}")
