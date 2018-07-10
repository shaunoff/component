<template lang="pug">
  .google_map
    #map
</template>

<script>

  import GoogleMapsLoader from 'google-maps'
  GoogleMapsLoader.KEY = 'AIzaSyDSuiBUGHynlmeh_7jyivqSiWhuWzz-UIg'
  GoogleMapsLoader.LIBRARIES = ['places']
  GoogleMapsLoader.LANGUAGE = 'en'

  // @vue/component
  export default {
    name: 'google_maps',
    props: {
      locations: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        opening_hours: null
      }
    },
    mounted() {
      let map
      let location = this.locations[0]
      let address = `${location.addr1}+${location.city}+${location.state}+${location.zip}`.replace(/\s+/g, '+')
      let that = this

      GoogleMapsLoader.load();

      GoogleMapsLoader.onLoad(function(google) {
        let geocoder = new google.maps.Geocoder()
        geocoder.geocode({address: address}, (res) => {
          map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: {
              lat: parseInt(location.latitude,10),
              lng: parseInt(location.longitude,10)
            },
            streetViewControl: false,
            mapTypeControl: false
          });

          let request = {
            placeId: location.google_place_id
          }

          let service = new google.maps.places.PlacesService(map)
          service.getDetails(request, (place, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              that.$emit('place_hours', place.opening_hours)

              var marker = new google.maps.Marker({
                map: map,
                place: {
                  placeId: place.place_id,
                  location: place.geometry.location
                }
              })
            }
          })
        })
      });
    }
  }
</script>

<style lang="scss" scoped>
  .google_map {
    height: 150px;
  }
  #map {
    height: 100%;
    width: 100%;
  }
</style>
