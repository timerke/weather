function set_default_location(self, callback) {
    self.default_city = "Moscow";
    callback();
}


function set_location_from_browser(self, position, callback) {
    self.default_latitude = position.coords.latitude;
    self.default_longitude = position.coords.longitude;
    callback();
}


class Page {

    constructor() {
        this.default_city;
        this.default_latitude;
        this.default_longitude;

        this.determine_location_from_browser(() => { alert(this.default_city); });
    }

    determine_location_from_browser(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => { set_location_from_browser(this, pos, callback); },
                                                     () => { set_default_location(this, callback); });
        } else {
            set_default_location(this, callback);
        }
    }
}