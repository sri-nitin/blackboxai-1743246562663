class LocationService {
    constructor() {
        this.watchId = null;
        this.currentPosition = null;
        this.map = null;
        this.marker = null;
        this.isSharing = false;
    }

    initMap() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.currentPosition = position;
                this.renderMap(position);
            }, this.handleLocationError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    renderMap(position) {
        const mapOptions = {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        this.marker = new google.maps.Marker({
            position: mapOptions.center,
            map: this.map,
            title: 'Your Location'
        });
    }

    startSharing() {
        if (this.watchId !== null) return;

        this.watchId = navigator.geolocation.watchPosition(
            position => {
                this.currentPosition = position;
                if (this.map) {
                    const newPos = new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    this.marker.setPosition(newPos);
                    this.map.panTo(newPos);
                }
            },
            this.handleLocationError,
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
        );

        this.isSharing = true;
    }

    stopSharing() {
        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
        this.isSharing = false;
    }

    getCurrentLocation() {
        return this.currentPosition;
    }

    handleLocationError(error) {
        let errorMessage = '';
        switch(error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                errorMessage = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                errorMessage = "An unknown error occurred.";
                break;
        }
        alert(errorMessage);
    }
}

const locationService = new LocationService();
document.addEventListener('DOMContentLoaded', () => {
    locationService.initMap();
});