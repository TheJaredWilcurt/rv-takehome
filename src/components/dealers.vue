<template>
  <div>
    <div v-if="requestFailed" class="alert alert-danger">
      We were unable to complete your request at this time. Please try again.<br />If the issue continues to occur, please <a href="#">contact support</a>.
    </div>
    <div v-if="!requestFailed">
      <div class="well">
        {{ dealers.length }} dealer<span v-if="dealers.length !== 1">s</span> in <span v-if="zipcode">{{ zipcode }}</span><span v-else>area</span>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */

import axios from 'axios';

export default {
    name: 'dealers',
    data: function () {
        return {
            zipcode: null,
            dealers: [],
            location: {
                lat: null,
                lon: null
            },
            requestFailed: false
        };
    },
    mounted: function () {
        // TODO: Replace with actual route
        axios.get('static/mock/dealers.json')
            .then(function (response) {
                var data = response.data;
                if (data.zipcode) {
                    this.zipcode = data.zipcode;
                }
                if (data.dealers) {
                    this.dealers = data.dealers;
                }
                if (data.location) {
                    this.location.lat = data.location.lat;
                    this.location.lon = data.location.lon;
                }
            }.bind(this))
            .catch(function () {
                this.requestFailed = true;
            }.bind(this));
    }
};
</script>

<style lang="sass">
</style>
