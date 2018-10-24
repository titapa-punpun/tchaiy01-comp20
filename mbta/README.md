# comp20-tchaiyakiturajai
 
Name: Titapa (PunPun) Chaiyakiturajai
Date: October 24, 2018
COMP20 Assignment 2: MBTA 


IMPLEMENTATION:
According to my knowledge, everything has been implemented correctly. My
style.css pasts the css file test, and my index.html pasts the html file test.

I use a 2D array to input all the stations and their information. I have 2 
arrays of dictionary (one for main path, the other for sub path when it
forks at JFK/UMass). Those 2 arrays of dictionary are only used to draw 
pathlines connecting all stations--nowhere else. 

I used Google Maps' API to display the map. 

To place the markers, I used a for loop to iterate through each station and
place a marker object on them. Each marker also has their own attributes 
(stopID, position, title, etc.). Then, I added an info window for each marker
and call loadTrainSchedule() to load real-time train schedules.

In loadTrainSchedule(), I used MBTA's API to load their train schedules. I 
parse the JSON data given, then used a for loop to spit up the parsed data
into readable format. Then, I set the content for each station and set that
content to the corresponding info window. 

To compute the shortest distance from my location to nearest station, I used
computeDistanceBetween(), which takes in 2 objects. The for loop iterates 
through all the stations, calculating distance from my location to every
station. Then, I get the shortest distance, and set that as the content 
for my location's info window. There, I convert distance from meters to miles.
Once I compute shortest distance, I draw the line from my location to the 
closest station away using the index of closest station.


COLLABORATION:
TA Rafel (helped with getting distance to closest station)
TA Michael Robinson (helped with loading schedule after data has been parsed)


TIME SPENT: 
Approximately 28 hours. For future assignments, I need to make sure I have
a conceptual idea of how to implement before diving into the code to save 
time. 