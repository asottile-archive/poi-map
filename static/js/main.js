(function () {
    function makeMarker(map, i, location) {
        var marker = new google.maps.Marker({
                position: new google.maps.LatLng(location.lat, location.lng),
                map: map,
                label: (i + 1).toString(10)
            }),
            infoWindow = new google.maps.InfoWindow({
                content: location.name + ' - ' + location.desc,
            });
        marker.addListener(
            'click', infoWindow.open.bind(infoWindow, map, marker)
        );
    }

    function createMap() {
        var center = new google.maps.LatLng(
                window.CONFIG.origin_lat, window.CONFIG.origin_lng
            ),
            map = new google.maps.Map(
                document.getElementById('fullmap'), {
                    center: center,
                    zoom: window.CONFIG.zoom,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    rotateControl: true,
                    fullscreenControl: true
            });

        new google.maps.Marker({position: center, map: map});

        for (i = 0; i < window.CONFIG.locations.length; i += 1) {
            makeMarker(map, i, window.CONFIG.locations[i]);
        }
    }

    window.initMap = createMap;
})();
