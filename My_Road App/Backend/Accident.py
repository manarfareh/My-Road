import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify, request 
from flask_restful import Resource, Api 
from flask_cors import CORS




app = Flask(__name__) 
# creating an API object 
api = Api(app) 
CORS(app, resources={r"/accidents": {"origins": "http://127.0.0.1:5173"}})
class AccidentResource(Resource):
    def get(self):
        accident_data = scrape_accident_data()
        if accident_data:
            return jsonify(accident_data)
        else:
            return jsonify({"error": "Failed to fetch accident data"}), 500

api.add_resource(AccidentResource, '/accidents')
def scrape_accident_data():
    url = "https://news-tunisia.tunisienumerique.com/tunisia/road-accident/"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        post_elements = soup.find_all("li", class_="infinite-post")
        accidents = []
        for post_element in post_elements:
            link_element = post_element.find("a")
            text_div = post_element.find("div", class_="archive-list-text")
            title_element = text_div.find("h2")
            description_element = text_div.find("p")
            link = link_element['href']
            title = title_element.text.strip() if title_element else ""
            description = description_element.text.strip() if description_element else ""
            accidents.append({'link': link, 'title': title, 'description': description})
        return accidents
    else:
        print("Failed to fetch the webpage. Status code:", response.status_code)
        return None

if __name__ == "__main__":
    app.run(debug=True, port=5001)



 