<template lang="pug">
  .footer_widget.clearfix
    .col-sm-6
      .footer_widget-map
        google_maps(:locations="locations", @place_hours='place_hours')
      .footer_widget-address
        p
          | {{ address_1 }}
        p(v-if="address_2")
          | {{ address_2 }}
        p
          | {{ city_state_zip }}
      .footer_widget-hours
        el-tag.footer_widget-hours-tag(
          v-if="open_now"
          type="success"
          size="mini"
        ) Open Now
        el-tag.footer_widget-hours-tag(
          v-else
          type="danger"
          size="mini"
        ) Closed
        .footer_widget-hours-hours
          p
            | {{ daily_hours }}
      .footer_widget-directions
        a(:href="`http://maps.google.com/maps?saddr=${starting_address}&daddr=${destination_address}`", target='_blank')
          | Get Directions
      .footer_widget-locations(v-if="has_additional_locations")
        a(v-on:click="toggle_show_more_locations()") View more locations &nbsp;
          i.pbxx-icon.pbxx-icon-hc-lg.pbxx-icon-caret-down
        .additional_locations(v-if="show_more_locations")
          .additional_location(v-for="location in locations")
            p
              | {{ location.addr1 }}
            p
              | {{ location.city }} {{ location.state }} {{ location.zip }}
    .col-sm-6
      .footer_widget-social
        a.footer_widget-social-link(
          v-for="social_account in retailer.social_accounts"
          target="_blank"
          :href="`https://www.${social_account.type}.com/${social_account.name}`"
        )
          i(:class="`pbxx-icon pbxx-icon-${social_account.type} pbxx-icon-hc-fw pbxx-icon-hc-circle ${social_account.color}-background-color white-font-color`")
          | @{{ social_account.name }}

        a.footer_widget-social-link(
          v-if="retailer.email"
          :href="`mailto:${retailer.email}`"
        )
          i.pbxx-icon.pbxx-icon-local-post-office.pbxx-icon-hc-fw.pbxx-icon-hc-circle.blue-background-color.white-font-color
          | {{ retailer.email }}
        a.footer_widget-social-link(
          v-if="retailer.phone"
          :href="`tel:${retailer.phone}`"
        )
          i.pbxx-icon.pbxx-icon-hc-lg.pbxx-icon-local-phone
          | {{ retailer.phone }}
        a.footer_widget-social-link(
          v-if="retailer.website"
          target="_blank"
          :href="`${retailer.website}`"
        )
          i.pbxx-icon.pbxx-icon-hc-lg.pbxx-icon-desktop-windows
          | {{ retailer.website }}
</template>

<script>
// @vue/component
import moment from 'moment';
import google_maps from '../google_maps';

export default {
  name: 'footer_widget',
  components: {
    google_maps,
  },
  props: {
    widget: {
      type: Object,
      required: true,
    },
    locations: {
      type: Array,
      required: false,
    },
    retailer: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      show_more_locations: false,
      open_now: false,
      daily_hours: '',
    };
  },
  computed: {
    first_location() {
      return this.locations.length ? this.locations[0] : false;
    },
    address_1() {
      return this.first_location ? this.first_location.addr1 : false;
    },
    address_2() {
      return this.first_location ? this.first_location.addr2 : false;
    },
    city_state_zip() {
      return this.first_location ? `${this.first_location.city}, ${this.first_location.state} ${this.first_location.zip}` : '';
    },
    starting_address() {
      return this.user_location ? '' : 'My+Location';// TODO: should update based on user location
    },
    destination_address() {
      return this.first_location ? `${this.first_location.addr1}+${this.first_location.city}+${this.first_location.state}+${this.first_location.zip}`.replace(/\s+/g, '+') : '';
    },
    has_additional_locations() {
      return this.locations.length > 1;
    },
  },
  methods: {
    toggle_show_more_locations() {
      this.show_more_locations = !this.show_more_locations;
    },
    place_hours(place_hours) {
      // moment().day() returns 0-6 for Sun-Sat
      // place_hours.weekday_text returns [] Mon-Sun
      const current_day = moment().day() || 7;
      let hours_text = '';
      this.open_now = place_hours.open_now;

      if (place_hours.weekday_text.length) {
        hours_text = place_hours.weekday_text[current_day - 1];
        if (hours_text.length) {
          this.daily_hours = hours_text.split(': ')[1];
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables_and_mixins';
  .footer_widget {
    color: get-color(gray-lightest);
    padding: 15px;
    background-color: get-color(gray-darkest);
    &-map {
      height: 150px;
    }
    &-map,
    &-address,
    &-hours,
    &-directions,
    &-social-link,
    &-subscribe-label,
    &-locations {
      margin-bottom: 1em;
    }
    &-locations {
      a {
        cursor: pointer;
      }
    }
    &-address {
      p {
        margin: 0;
      }
    }
    &-hours {
      &-tag {
        margin-right: 1.5em;
      }
      &-hours {
        color: get-color(gray-lightest);
        &:hover {
          opacity: 0.9;
        }
      }
    }
    &-social {
      a {
        display: block;
        color: get-color(gray-lightest);
        &:hover {
          opacity: 0.9;
        }
      }
      i {
        color: get-color(white);
        width: 20px;
        text-align: center;
        margin-right: 10px;
        display: inline-block;
      }
    }
  }
</style>
