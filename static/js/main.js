(function () {
    var leftBar = document.querySelector('.left-bar');

    function makeMarker(map, i, location) {
        var listItem, label, labelText, marker = new google.maps.Marker({
                position: new google.maps.LatLng(location.lat, location.lng),
                map: map,
                label: window.CONFIG.labels[i + 1]
            }),
            infoWindow = new google.maps.InfoWindow({
                content: location.name + ' - ' + location.desc,
            }),
            showWindow = infoWindow.open.bind(infoWindow, map, marker);
        marker.addListener('click', showWindow);

        labelText = document.createElement('strong');
        labelText.textContent = [
            window.CONFIG.labels[i + 1], '. ', location.name
        ].join('');
        labelText.addEventListener('click', showWindow);

        label = document.createElement('div');
        label.appendChild(labelText);

        listItem = document.createElement('div');
        listItem.appendChild(label);
        listItem.appendChild(document.createTextNode(location.desc));

        leftBar.appendChild(listItem);
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
