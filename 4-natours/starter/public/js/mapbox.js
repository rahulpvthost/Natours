/*eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);



mapboxgl.accessToken =
      'pk.eyJ1IjoicmFodWxwdnQiLCJhIjoiY210em44a3JsMGMzNDJ3czRrbGJ5ZDAzdCJ9.VDCNjJ_FX5qJFKG6OioRPA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/rahulpvt/cmtzrd868001a01r1fmd31pvs',
    scrollZoom: false
    // center: [-118.113491,34.111745],
    // zoom: 4 
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc=>{
    //Create marker
    const el = document.createElement('div');
    el.className = 'marker';
    //Add marker
    new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
    }).setLngLat(loc.coordinates).addTo(map);
     //Extend map bounds to include current location

    new mapboxgl.Popup({
        offset:30
    })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);


    bounds.extend(loc.coordinates )
});

map.fitBounds(bounds ,{
        padding: {
        top:200,
        bottom:150,
        left:100,
        right:100
        }
    });
