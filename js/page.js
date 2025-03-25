class Api {

    constructor(api_key) {
        this.api_key = api_key;
    }

    get_location(location) {
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${location.city},,${location.country}&limit=1&appid=${this.api_key}`;
        console.log(url);
        fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((response_json) => {
            if (response_json.length == 1) {
                location.set_location_from_json(response_json[0]);
            } else {
                throw Error("Location not found");
            }
        })
        .catch((error) => {
            alert(error);
        });
    }
}


class Location {
    constructor(default_city, default_country) {
        this.default_city = default_city;
        this.default_country = default_country;
        this.city;
        this.country;
        this.latitude;
        this.longitude;
    }

    set_default_location() {
        this.city = this.default_city;
        this.country = this.default_country;
    }

    set_location(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
    }

    set_location_from_json(json_data) {
        this.latitude = json_data["lat"];
        this.longitude = json_data["lon"];
    }
}


class Page {

    constructor(settings) {
        this.api = new Api(settings.api_key);
        this.location = new Location(settings.city, settings.country);

        this.determine_location_from_browser();
    }

    determine_location_from_browser() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => { this.location.set_location(pos); },
                                                     () => { this.location.set_default_location();
                                                             this.get_location(); });
        } else {
            this.location.set_default_location();
            this.get_location();
        }
    }

    get_location() {
        this.api.get_location(this.location);
    }
}