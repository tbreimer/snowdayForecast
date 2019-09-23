import forecastio
from datetime import datetime, timedelta
import csv

api_key = "47ca1bf4b36a264350f6d25cf976072c"

### ---------------------------------------------------
### 0: Regular Day 1: Snowday 2: Delay 3: Early Closing
### ---------------------------------------------------

### -------------------
### WRITE HEADER TO CSV
### -------------------

file = open('rawData.csv', 'w');
writer = csv.writer(file)

entries = 25

labels = []

for x in range(0, entries):
    labels.append("windGust" + str(x)) #
for x in range(0, entries):
    labels.append("temperature" + str(x))
for x in range(0, entries):
    labels.append("dewPoint" + str(x))  #
for x in range(0, entries):
    labels.append("humidity" + str(x)) #
for x in range(0, entries):
    labels.append("apparentTemperature" + str(x))
for x in range(0, entries):
    labels.append("pressure" + str(x)) #
for x in range(0, entries):
    labels.append("windSpeed" + str(x)) 
for x in range(0, entries):
    labels.append("visibility" + str(x)) #
for x in range(0, entries):
    labels.append("precipIntensity" + str(x))
for x in range(0, entries):
    labels.append("precipProbability" + str(x))

labels.append("day")
labels.append("month")


labels.append("outcome")

writer.writerow(labels)


### ----------------------------
### GET WEATHER DATA FOR 1 EVENT
### ----------------------------


def writeEvent(lat, lng, year, month, day, outcome):

    lat = lat
    lng = lng

    year = year
    month = month
    day = day

    outcome = outcome

    windGust = []
    temperature = []
    dewPoint = []
    humidity = []
    apparentTemperature = []
    pressure = []
    windSpeed = []
    visibility = []
    precipIntensity = []
    precipProbability = []

    # Day before from 2pm - midnight

    date = datetime(year, month, day) - timedelta(1)
    forecast = forecastio.load_forecast(api_key, lat, lng, time=date, units="us")
    h = forecast.hourly()

    
    for y in range(14, 24):
        
        data = h.data[y].d
        x = data.get('windGust', "none")
        if (x == "none"):
            x = 0

        windGust.append(x)

        x = data['temperature']
        temperature.append(x)

        x = data['dewPoint']
        dewPoint.append(x)

        x = data['humidity']
        humidity.append(x)

        x = data['apparentTemperature']
        apparentTemperature.append(x)

        x = data['pressure']
        pressure.append(x)

        x = data['windSpeed']
        windSpeed.append(x)

        x = data.get('visibility', "none")

        if (x == "none"):
            x = 9.997

        visibility.append(x)

        x = data['precipIntensity']
        precipIntensity.append(x)

        x = data['precipProbability']
        precipProbability.append(x)

    # Day of from midnight to 3 pm

    date = datetime(year, month, day)
    forecast = forecastio.load_forecast(api_key, lat, lng, time=date, units="us")
    h = forecast.hourly()

    for y in range(0, 15):

	

        data = h.data[y].d
        x = data.get('windGust', "none")
        if (x == "none"):
            x = 0


        windGust.append(x)

        x = data['temperature']
        temperature.append(x)

        x = data['dewPoint']
        dewPoint.append(x)

        x = data['humidity']
        humidity.append(x)

        x = data['apparentTemperature']
        apparentTemperature.append(x)

        x = data['pressure']
        pressure.append(x)

        x = data['windSpeed']
        windSpeed.append(x)

        x = data.get('visibility', "none")

        if (x == "none"):
            x = 9.997

        visibility.append(x)

        x = data['precipIntensity']
        precipIntensity.append(x)

        x = data['precipProbability']
        precipProbability.append(x)

    # Write data to csv

    data = []
    data.extend(windGust)
    data.extend(temperature)
    data.extend(dewPoint)
    data.extend(humidity)
    data.extend(apparentTemperature)
    data.extend(pressure)
    data.extend(windSpeed)
    data.extend(visibility)
    data.extend(precipIntensity)
    data.extend(precipProbability)

    data.append(day)

    data.append(month)

    data.append(outcome)

    writer.writerow(data)


lat = '42.595574'
lng = '-73.706788'

year = 2018
month = 11
day = 16

end = csv.reader(open('columbia.csv'))
lines = list(end)
length = len(lines)

for z in range(0, length):
    date = lines[z][0]
    outcome = int(lines[z][1])
    lat = float(lines[z][2])
    lon = float(lines[z][3])

    month, day, year = date.split('/')

    day = int(day)
    month = int(month)
    year = int(year)

    writeEvent(lat, lon, year, month, day, outcome)
    print("On number" + str(z))



