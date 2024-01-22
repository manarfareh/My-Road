from flask import Flask, jsonify
from flask_cors import CORS
import datetime as dt
import meteomatics.api as api
import pandas as pd

app = Flask(__name__) 
CORS(app, resources={r"/weather_data/*": {"origins": "http://127.0.0.1:5173"}}, supports_credentials=True)

# Meteomatics API credentials
username = 'enicarthage_limeme_oumayma'
password = 'tQTrE8va34'

# Define a mapping between governorate names and coordinates
governorate_coordinates = {
    'tunis': [(36.8065, 10.1815)],     # Tunis
    'sousse': [(36.4823, 10.534)],    # Sousse
    'ariana':[(36.86804029150319, 10.16609746114853)],
    'beja':[(36.73142787191604, 9.186057515674827)],
    'seliana':[(36.08829607941479, 9.366917653428274)],
    'bizerte':[(36.86804029150319, 10.16609746114853)],
    'benarous':[(36.74763,10.23266)],
    'gabes':[(33.88864364051219, 10.103126305434163)],
    'gafsa':[(34.43209757298071, 8.779213563477022)],
    'jendouba':[(36.50701080060826, 8.776574340131464)],
    'kairouan':[(36.86804029150319, 10.16609746114853)],
    'kasserine':[(35.17613132162315, 8.825803955192107)],
    'tozeur':[(33.9264419543395, 8.122930730583017)],
    'elkef':[(36.169705689303846, 8.709557281739572)],
    'mahdia':[(35.5069664287106, 11.045190766491238)],
    'manouba':[(36.811531956137536, 10.082895989772743)],
    'mednine':[(33.346979803641645, 10.49211528421877)],
    'monastir':[(35.76250931383048, 10.812124836938866)],
    'nabeul':[(36.45432647706275, 10.716652463485309)],
    'sfax':[(34.779980144828336, 10.724862379314262)],
    'sidibouzid':[(35.03870692803966, 9.480471150307382)],
    'tataouine':[(32.923279497922145, 10.450745609643795)],
    'zaghouan':[(36.41239727015325, 10.137024845156564)],
    'kebili':[(33.706166106399756, 8.971023686455565)],
    # Add other governorates as needed
}

def get_weather_data(coordinates, startdate, enddate):
    parameters = ['t_2m:C', 'precip_1h:mm', 'wind_speed_10m:ms']
    model = 'mix'

    # Use the meteomatics module directly for data retrieval
    df = api.query_time_series(coordinates, startdate, enddate, dt.timedelta(hours=1), parameters, username, password, model=model)

    # Format the index to have the correct date and time format
    df.index = df.index.get_level_values('validdate')
    df['date'] = df.index.date.astype(str)
    df['time'] = df.index.time.astype(str)

    # Convert the DataFrame to a list of dictionaries
    result = []
    for _, row in df.iterrows():
        data_entry = {
            'date': row['date'],
            'time': row['time'],
            'values': row.drop(['date', 'time']).to_dict()
        }
        result.append(data_entry)

    return jsonify({'weather_data': result})

@app.route('/weather_data/<governorate>', methods=['GET'])
def get_weather_data_by_governorate(governorate):
    if governorate.lower() in governorate_coordinates:
        coordinates = governorate_coordinates[governorate.lower()]
        startdate = dt.datetime.utcnow().replace(minute=0, second=0, microsecond=0)
        enddate = startdate + dt.timedelta(days=1)
        return get_weather_data(coordinates, startdate, enddate)
    else:
        return jsonify({'error': 'Governorate not found'})


if __name__ == "__main__":
    app.run(debug=True)