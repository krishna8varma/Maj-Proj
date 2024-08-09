from bs4 import BeautifulSoup
import requests

def get_photo(query):
    key='KITvPIESUiDZyOPsXAK0_8dyFbwHTBoD3avdzOqJs78'
    url=f"https://api.unsplash.com/search/photos"
    params={
        "query" : query,
        "client_id" : key,
        "per_page" : 30,
    }
    response=requests.get(url=url,params=params)
    if response.status_code == 200:
        data=response.json()
        ls=[]
        for x in range(0,30):
            photo=data['results'][x]['urls']['small']
            text=data['results'][x]['alt_description']
            ls.append({'image' : photo, "alt_txt" : text})
        return ls

def scrapi_photo(query):
    url = f"https://search.brave.com/images?q={query}"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

    # Send an HTTP GET request to the URL
    response = requests.get(url,headers=headers)

    # Parse the HTML content of the webpage
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find the first <img> element with class='my-image'
    img_element = soup.find_all('img', class_='svelte-1s3j0rg')

    # Extract the 'src' attribute of the image if found
    image_urls = []
    for img in img_element:
        image_urls.append({"image" : img['src'],"alt_text" : img['alt']})
    return image_urls

#SEARCH_QUERY = 'Taj Mahal'
#print(json.dumps(get_photo("food restuarants in nagpur"),sort_keys=False, indent=4))
# print(json.dumps(scrapi_photo("waterbodies in nagpur"),sort_keys=False, indent=4))