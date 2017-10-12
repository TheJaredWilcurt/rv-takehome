<template>
  <div>
    <div v-if="requestFailed" class="alert alert-danger">
      We were unable to complete your request at this time. Please try again.<br />If the issue continues to occur, please <a href="#">contact support</a>.
    </div>
    <div v-if="!requestFailed">
      <div class="well">
        <div class="dealer-results-area">{{ dealers.length }} dealer<span v-if="dealers.length !== 1">s</span> in <span v-if="zipcode">{{ zipcode }}</span><span v-else>area</span></div>
        <div class="separator"></div>
        <div>Filter Results</div>
        <input type="checkbox" checked id="filter-service">
        <label for="filter-service">Service</label>
        <input type="checkbox" checked id="filter-installation">
        <label for="filter-installation">Installation</label>
        <input type="checkbox" checked id="filter-residential">
        <label for="filter-residential">Residential</label>
        <input type="checkbox" id="filter-commercial">
        <label for="filter-commercial">Commercial</label>
        <span class="question-mark-box">?</span>
      </div>
    </div>
  </div>
</template>

<script>
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
@import "../sass/_var.sass"
@import "../sass/_mixins.sass"

.dealer-results-area
    display: inline-block
    color: $brandAccent

$question-box-size: 19px
.question-mark-box
    +noselect
    width: $question-box-size
    height: $question-box-size
    background: $grayAccent
    border-radius: 2px
    margin: 0px 0px 0px 8px
    color: $brandDull
    font-size: 10px
    line-height: $question-box-size
    text-align: center
    cursor: pointer

</style>
