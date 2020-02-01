
/*
mapboxgl.accessToken = 'sk.eyJ1IjoidmFuaWxsYXNraWVzIiwiYSI6ImNrNjMxOXlmczAydDUzbXBiYnNkcnlzbjUifQ.7rQyovhB6y75b2Wb7VChMQ';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom: 6,
center: [75.7643839, 28.877387]
});


//map.invalidateSize();






// var bounds = [[-123.069003, 45.395273], [-122.303707, 45.612333]];
// map.setMaxBounds(bounds);

// initialize the map canvas to interact with later
var canvas = map.getCanvasContainer();


        // https://lh5.googleusercontent.com/proxy/3R2fyk1w9xMmfJNX63elovYg7tTca8I-Qq_Qbnk47YJrqk6RGv0BzANvU7o2EJgg5evEWoq4r9axU5TAISCW6xNTXxfMyN7mBPDTkioMZqPNyrcR0TlWG2x0SpdiEpDFbvoBQQ

     
        const sites = data.data.map(site => {
            return {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [
                  site.location.coordinates[0],
                  site.location.coordinates[1]
                ]
              },
              properties: {
                siteId: site.siteId,
                icon: 'https://lh5.googleusercontent.com/proxy/3R2fyk1w9xMmfJNX63elovYg7tTca8I-Qq_Qbnk47YJrqk6RGv0BzANvU7o2EJgg5evEWoq4r9axU5TAISCW6xNTXxfMyN7mBPDTkioMZqPNyrcR0TlWG2x0SpdiEpDFbvoBQQ'
              }
            };
          });
        
          loadMap(sites);
       
        
        // Load map with stores
        function loadMap(sites) {
          map.on('load', function() {
            map.addLayer({
              id: 'points',
              type: 'symbol',
              source: {
                type: 'geojson',
                data1: {
                  type: 'FeatureCollection',
                  features: sites
                }
              },
              layout: {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{siteId}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top'
              }
            });
          });
        }
        
       getSites();





        

// create a function to make a directions request
function getRoute(end) {
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  var start = [75.7643839, 28.877387];
  var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

  // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onload = function() {
    var json = JSON.parse(req.response);
    var data = json.routes[0];
    var route = data.geometry.coordinates;
    var geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    };
    // if the route already exists on the map, reset it using setData
    if (map.getSource('route')) {
      map.getSource('route').setData(geojson);
    } else { // otherwise, make a new request
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: geojson
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
    // add turn instructions here at the end
  };
  req.send();
}

map.on('load', function() {
  // make an initial directions request that
  // starts and ends at the same location
  getRoute(start);

  // Add starting point to the map
  map.addLayer({
    id: 'point',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: start
          }
        }
        ]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#3887be'
    }
  });
  // this is where the code from the next step will go
});


map.on('click', function(e) {
  var coordsObj = e.lngLat;
  canvas.style.cursor = '';
  var coords = Object.keys(coordsObj).map(function(key) {
    return coordsObj[key];
  });
  var end = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: coords
      }
    }
    ]
  };
  if (map.getLayer('end')) {
    map.getSource('end').setData(end);
  } else {
    map.addLayer({
      id: 'end',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: coords
            }
          }]
        }
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#f30'
      }
    });
  }
  getRoute(coords);
});



// get the sidebar and add the instructions
var instructions = document.getElementById('instructions');
var steps = data.legs[0].steps;

var tripInstructions = [];
for (var i = 0; i < steps.length; i++) {
  tripInstructions.push('<br><li>' + steps[i].maneuver.instruction) + '</li>';
  instructions.innerHTML = '<br><span class="duration">Trip duration: ' + Math.floor(data.duration / 60) + ' min 🚴 </span>' + tripInstructions;
}


<script src="map_design.css"></script>

*/


mapboxgl.accessToken = 'pk.eyJ1Ijoia29vcmFhYmhpbmF2MTljc2UiLCJhIjoiY2s2MzJzZjl3MDVidDNrcXBpaXpoZGs4ZCJ9.7CuMwtyg4mKbYMsr4EF7BQ';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom: 6,
center: [76.8145, 28.2473],
bearing: -12,
pitch: 60,
interactive: false
});
 
function mapCr(x,y){
  map.on('load', function() {
    map.loadImage(
    'https://lh5.googleusercontent.com/proxy/3R2fyk1w9xMmfJNX63elovYg7tTca8I-Qq_Qbnk47YJrqk6RGv0BzANvU7o2EJgg5evEWoq4r9axU5TAISCW6xNTXxfMyN7mBPDTkioMZqPNyrcR0TlWG2x0SpdiEpDFbvoBQQ',
      function(error, image) {
    if (error) throw error;
    map.addImage('marker', image);
    map.addSource('point', {
    'type': 'geojson',
    'data': {
    'type': 'FeatureCollection',
    'features': [
    {
    'type': 'Feature',
    'geometry': {
    'type': 'Point',
    'coordinates': [x, y]
    }
    }
    ]
    }
    });
    map.addLayer({
    'id': 'points',
    'type': 'symbol',
    'source': 'point',
    'layout': {
    'icon-image': 'marker',
    'icon-size': 0.25
    }
    });
    }
    );
    });
  }

  mapCr(76.8145, 28.2473);

  function mapC(x,y){
    map.on('load', function() {
      map.loadImage(
      'https://lh5.googleusercontent.com/proxy/3R2fyk1w9xMmfJNX63elovYg7tTca8I-Qq_Qbnk47YJrqk6RGv0BzANvU7o2EJgg5evEWoq4r9axU5TAISCW6xNTXxfMyN7mBPDTkioMZqPNyrcR0TlWG2x0SpdiEpDFbvoBQQ',
        function(error, image) {
      if (error) throw error;
      map.addImage('marker', image);
      map.addSource('point', {
      'type': 'geojson',
      'data': {
      'type': 'FeatureCollection',
      'features': [
      {
      'type': 'Feature',
      'geometry': {
      'type': 'Point',
      'coordinates': [x, y]
      }
      }
      ]
      }
      });
      map.addLayer({
      'id': 'points',
      'type': 'symbol',
      'source': 'point',
      'layout': {
      'icon-image': 'marker',
      'icon-size': 0.25
      }
      });
      }
      );
      });
    }
  mapC(78.0211, 27.1792);

  async function getSites() {
    const res = await fetch('/api/v1/sites');
    const data = await res.json();
}

map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
    })
    );

    map.on('load', function() {
        // Add a GeoJSON source with 3 points.
        map.addSource('points', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [
        {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'Point',
        'coordinates': [
        -91.395263671875,
        -0.9145729757782163
        ]
        }
        },
        {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'Point',
        'coordinates': [
        -90.32958984375,
        -0.6344474832838974
        ]
        }
        },
        {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'Point',
        'coordinates': [
        -91.34033203125,
        0.01647949196029245
        ]
        }
        }
        ]
        }
        });
         
        // Add a symbol layer.
        map.addLayer({
        'id': 'symbols',
        'type': 'symbol',
        'source': 'points',
        'layout': {
        'icon-image': 'rocket-15'
        }
        });
         
        // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
        map.on('click', 'symbols', function(e) {
        map.flyTo({ center: e.features[0].geometry.coordinates });
        });
         
        // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
        map.on('mouseenter', 'symbols', function() {
        map.getCanvas().style.cursor = 'pointer';
        });
         
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'symbols', function() {
        map.getCanvas().style.cursor = '';
        });
        });


        map.addControl(new mapboxgl.NavigationControl());

        


        var deltaDistance = 100;
 
// degrees the map rotates when the left or right arrow is clicked
var deltaDegrees = 25;
 
function easing(t) {
return t * (2 - t);
}
 
map.on('load', function() {
map.getCanvas().focus();
 
map.getCanvas().addEventListener(
'keydown',
function(e) {
e.preventDefault();
if (e.which === 38) {
// up
map.panBy([0, -deltaDistance], {
easing: easing
});
} else if (e.which === 40) {
// down
map.panBy([0, deltaDistance], {
easing: easing
});
} else if (e.which === 37) {
// left
map.easeTo({
bearing: map.getBearing() - deltaDegrees,
easing: easing
});
} else if (e.which === 39) {
// right
map.easeTo({
bearing: map.getBearing() + deltaDegrees,
easing: easing
});
}
},
true
);
});

map.on('load', function() {
  map.addSource('rwanda-provinces', {
  'type': 'geojson',
  'data':
  'https://docs.mapbox.com/mapbox-gl-js/assets/rwanda-provinces.geojson'
  });
  map.addLayer({
  'id': 'rwanda-provinces',
  'type': 'fill',
  'source': 'rwanda-provinces',
  'layout': {},
  'paint': {
  'fill-color': [
  'let',
  'density',
  ['/', ['get', 'population'], ['get', 'sq-km']],
  [
  'interpolate',
  ['linear'],
  ['zoom'],
  8,
  [
  'interpolate',
  ['linear'],
  ['var', 'density'],
  274,
  ['to-color', '#edf8e9'],
  1551,
  ['to-color', '#006d2c']
  ],
  10,
  [
  'interpolate',
  ['linear'],
  ['var', 'density'],
  274,
  ['to-color', '#eff3ff'],
  1551,
  ['to-color', '#08519c']
  ]
  ]
  ],
  'fill-opacity': 0.7
  }
  });
  });

  

  // earthquake clusters

  map.on('load', function() {
    // Add a new source from our GeoJSON data and set the
    // 'cluster' option to true. GL-JS will add the point_count property to your source data.
    map.addSource('earthquakes', {
    type: 'geojson',
    // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
    // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
    data:
    'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });
     
    map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    paint: {
    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    // with three steps to implement three types of circles:
    //   * Blue, 20px circles when point count is less than 100
    //   * Yellow, 30px circles when point count is between 100 and 750
    //   * Pink, 40px circles when point count is greater than or equal to 750
    'circle-color': [
    'step',
    ['get', 'point_count'],
    '#51bbd6',
    100,
    '#f1f075',
    750,
    '#f28cb1'
    ],
    'circle-radius': [
    'step',
    ['get', 'point_count'],
    20,
    100,
    30,
    750,
    40
    ]
    }
    });
     
    map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
    }
    });
     
    map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'earthquakes',
    filter: ['!', ['has', 'point_count']],
    paint: {
    'circle-color': '#11b4da',
    'circle-radius': 4,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
    }
    });
     
    // inspect a cluster on click
    map.on('click', 'clusters', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
    layers: ['clusters']
    });
    var clusterId = features[0].properties.cluster_id;
    map.getSource('earthquakes').getClusterExpansionZoom(
    clusterId,
    function(err, zoom) {
    if (err) return;
     
    map.easeTo({
    center: features[0].geometry.coordinates,
    zoom: zoom
    });
    }
    );
    });
     
    map.on('mouseenter', 'clusters', function() {
    map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function() {
    map.getCanvas().style.cursor = '';
    });
    });
    