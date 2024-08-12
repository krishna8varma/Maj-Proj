import requests
from bs4 import BeautifulSoup
import urllib

def scrape_images(query):
    url = f"https://www.google.com/search?q={urllib.parse.quote(query)}&tbm=isch"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    image_urls = []
    for img in soup.find_all('img'):
        src = img.get('src')
        if src:
            image_urls.append(src)
        else:
            # Log a message or handle the missing 'src' attribute case
            print("Image source attribute ('src') not found for the <img> tag.")

    return image_urls[:5]  # Return first 5 image URLs

place_name = "Eiffel Tower"
image_urls = scrape_images(place_name)
print(image_urls)