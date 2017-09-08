What this thing does:
- It creates a static-ish map (you can copy paste the html it generates to an
  internet connected device or load the map once on your phone, etc.).
- This map contains some numbered markers for points of interest in the city
  you are exploring.  You can use this to make your own walking tour (maybe
  I'll add walking paths at some point in the future! no promises!).

Things you'll need beforehand:
- A google maps api key.  You can create one [here][1].
- A starting point (such as your hotel location) and a list of points of
  interest.

Rough usage:

- Set up `config.json`
    Usually:
    - `cp config.example.json config.json`
    - `$EDITOR config.json`
- `make venv`
- `. venv/bin/activate`
- `pgctl start`


[1]: https://console.developers.google.com/flows/enableapi?apiid=maps_backend,geocoding_backend,directions_backend,distance_matrix_backend,elevation_backend,places_backend&keyType=CLIENT_SIDE&reusekey=true
