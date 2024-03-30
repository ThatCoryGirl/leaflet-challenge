# leaflet-challenge
HTML, Javascript, JSON, Visualization

# **Background**

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

# **Instructions**

The instructions for this activity are broken into two parts:

# **Part 1: Create the Earthquake Visualization**

Your first task is to visualize an earthquake dataset. Complete the following steps:

  - Get your dataset. To do so, follow these steps:

    - The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and choose a dataset to visualize.

    - When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization.

Import and visualize the data by doing the following:

  - Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

    - Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

    - **Hint:** The depth of the earth can be found as the third coordinate for each earthquake.

  - Include popups that provide additional information about the earthquake when its associated marker is clicked.

  - Create a legend that will provide context for your map data.

# **Part 2: Gather and Plot More Data**

Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at [Tectonic Plates GitHub](https://github.com/fraxen/tectonicplates).

Perform the following tasks:

  - Plot the tectonic plates dataset on the map in addition to the earthquakes.

  - Add other base maps to choose from.

  - Put each dataset into separate overlays that can be turned on and off independently.

  - Add layer controls to your map.

# **Citations:**

Instructor: [Othmane Benyoucef](https://www.linkedin.com/in/othmane-benyoucef-219a8637/)

[Cart DB Dark Matter Layer](https://github.com/CartoDB/basemap-styles)

[Await Function()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
