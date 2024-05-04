from bs4 import BeautifulSoup
import requests

def get_photo(query):
    url = f"https://search.brave.com/images?q={query}"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

    # Send an HTTP GET request to the URL
    response = requests.get(url,headers=headers)

    # Parse the HTML content of the webpage
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find the first <img> element with class='my-image'
    img_element = soup.find('img', class_='svelte-1s3j0rg')

    # Extract the 'src' attribute of the image if found
    if img_element:
        image_url = img_element['src']
        return image_url
    else: return ''

#SEARCH_QUERY = 'Taj Mahal'