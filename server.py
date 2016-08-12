import collections
import functools
import json
import string

import markupsafe
import flask
from geopy.geocoders import GoogleV3


LABELS = string.digits + string.ascii_uppercase + string.ascii_lowercase
Location = collections.namedtuple('Location', ('lat', 'lng', 'name'))


class LocationDesc(collections.namedtuple('Location', ('loc', 'desc'))):
    __slots__ = ()

    def to_json(self):
        return dict(self.loc._asdict(), **self._asdict())


def auto_namedtuple(**kwargs):
    return collections.namedtuple('auto', kwargs.keys())(**kwargs)


def get_config():
    with open('config.json') as config:
        return auto_namedtuple(**json.load(config))


@functools.lru_cache(maxsize=128)
def geocode(location):
    loc = GoogleV3().geocode(location)
    if loc is None:
        raise AssertionError('Could not geocode {}'.format(location))
    return Location(loc.latitude, loc.longitude, location)


def get_locations(locations):
    return [LocationDesc(geocode(loc), desc) for loc, desc in locations]


app = flask.Flask(__name__, template_folder='templates')


@app.route('/')
def fullmap():
    config = get_config()
    origin = geocode(config.origin)
    locations = get_locations(config.locations)

    return flask.render_template(
        'map.html',
        key=config.gmaps_key,
        labels=LABELS,
        locations=locations,
        js_globals={
            'origin_lat': origin.lat,
            'origin_lng': origin.lng,
            'labels': LABELS,
            'locations': [loc.to_json() for loc in locations],
            'zoom': config.zoom,
        },
        # So you can just use the html as a static file
        css=markupsafe.Markup(open('static/css/main.css').read()),
        js=markupsafe.Markup(open('static/js/main.js').read()),
    )


if __name__ == '__main__':
    config = get_config()
    app.run(
        host=config.host, port=config.port,
        debug=True, use_evalex=False, processes=5,
    )
