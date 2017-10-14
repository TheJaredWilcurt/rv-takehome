<template>
  <div>
    <div v-if="requestFailed" class="alert alert-danger">
      We were unable to complete your request at this time. Please try again.<br />If the issue continues to occur, please <a href="#">contact support</a>.
    </div>
    <div v-if="!requestFailed">
      <div class="well">
        <div class="dealer-results-area">{{ Object.keys(filteredDealers).length }} dealer<span v-if="Object.keys(filteredDealers).length !== 1">s</span> in <span v-if="zipcode">{{ zipcode }}</span><span v-else>area</span></div>
        <div class="separator"></div>
        <div>Filter Results</div>
        <input type="checkbox" checked id="filter-service" v-model="filters.service" @change="filterResults">
        <label for="filter-service">Service</label>
        <input type="checkbox" checked id="filter-installation" v-model="filters.installation" @change="filterResults">
        <label for="filter-installation">Installation</label>
        <input type="checkbox" checked id="filter-residential" v-model="filters.residential" @change="filterResults">
        <label for="filter-residential">Residential</label>
        <input type="checkbox" id="filter-commercial" v-model="filters.commercial" @change="filterResults">
        <label for="filter-commercial">Commercial</label>
        <span class="question-mark-box">?</span>
      </div>
      <div class="card-container">
        <div class="no-results" v-if="Object.keys(filteredDealers).length === 0">
            No results found.
        </div>
        <div class="card" v-for="dealer in filteredDealers" :id="'dealer' + dealer.companyID">
          <div class="card-header">
            {{ dealer.name }}
          </div>
          <div class="phone-number">
            <img src="../static/images/phone.svg" class="phone-icon" alt="Phone icon">
            <a :href="'tel:' + dealer.phone1">{{ dealer.phone1.replace(/-/g, '.') }}</a>
          </div>
          <div class="cant-talk-now">
            Can’t talk now? Click below to send an email.
          </div>
          <button class="contact-this-pro">
            <img src="../static/images/email.svg" class="email-icon" alt="Icon of an envelope to represent E-Mail">
            Contact this Pro
          </button>
          <div class="business-hours">
            <strong>Business Hours</strong>
            <div v-for="day in businessHours(dealer.weekHours)">{{ day }}</div>
          </div>
          <div class="card-footer">
            <div v-for="certification in dealerCertifications(dealer.certifications)" class="half">
              <img :src="'../static/images/' + certification.image + '.svg'" class="certification-icon" :alt="certification.alt">
              {{ certification.name }}
            </div>
          </div>
          <!--
            Unused data from route
            <div>{{ dealer.email }}</div>
            <div>{{ dealer.addressLine1 }}</div>
            <div>{{ dealer.addressLine2 }}</div>
            <div>{{ dealer.city }}</div>
            <div>{{ dealer.state }}</div>
            <div>{{ dealer.country }}</div>
            <div>{{ dealer.zipcode }}</div>
          -->
        </div>
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
            filters: {
                service: true,
                installation: true,
                residential: true,
                commercial: false
            },
            zipcode: null,
            dealers: [],
            filteredDealers: {},
            location: {
                lat: null,
                lon: null
            },
            requestFailed: false
        };
    },
    methods: {
        filterResults: function () {
            this.filteredDealers = {};
            var dealersLength = this.dealers.length;
            for (var filter in this.filters) {
                var filteredLength = Object.keys(this.filterResults).length;
                var filteredListIsFull = filteredLength === dealersLength;

                // There is no reason to loop over all dealers and all certs
                // for disabled filters or if the filtered results already contain all possible results
                if (this.filters[filter] && !filteredListIsFull) {
                    this.dealers.forEach(function (dealer) {
                        dealer.certifications.forEach(function (certification) {
                            if (certification.toLowerCase().startsWith(filter)) {
                                this.filteredDealers[dealer.companyID] = dealer;
                            }
                        }.bind(this));
                    }.bind(this));
                }
            }
        },
        businessHours: function (weekHours) {
            for (var key in weekHours) {
                if (weekHours[key] === '') {
                    weekHours[key] = 'CLOSED';
                }
            }

            var weekdays = [];
            if (
                weekHours.mon === weekHours.tue &&
                weekHours.mon === weekHours.wed &&
                weekHours.mon === weekHours.thu &&
                weekHours.mon === weekHours.fri
               ) {
                weekdays.push('Weekdays ' + weekHours.mon);
            } else {
                weekdays.push('Mondays ' + weekHours.mon);
                weekdays.push('Tuesdays ' + weekHours.tue);
                weekdays.push('Wednesdays ' + weekHours.wed);
                weekdays.push('Thursdays ' + weekHours.thu);
                weekdays.push('Fridays ' + weekHours.fri);
            }

            weekdays.push('Saturdays ' + weekHours.sat);
            weekdays.push('Sundays ' + weekHours.sun);

            return weekdays;
        },
        dealerCertifications: function (certifications) {
            var imageMap = {
                'Installation Pro': {
                    icon: 'star',
                    alt: 'Star icon'
                },
                'Commercial Pro': {
                    icon: 'people',
                    alt: 'Icon of two people'
                },
                'Residential Pro': {
                    icon: 'home',
                    alt: 'House icon'
                },
                'Service Pro': {
                    icon: 'gear',
                    alt: 'Gear icon'
                }
            };
            var certs = [];
            certifications.forEach(function (certification) {
                var image = imageMap[certification];
                certs.push({
                    name: certification,
                    image: image.icon,
                    alt: image.alt
                });
            }.bind(this));
            return certs;
        }
    },
    mounted: function () {
        // TODO: Replace with actual route
        axios.get('static/mock/dealers.json')
            .then(function (response) {
                var data = response.data;
                if (data.zipcode) {
                    this.zipcode = data.zipcode;
                }
                if (Array.isArray(data.dealers)) {
                    data.dealers.forEach(function (dealer) {
                        this.dealers.push(dealer.data);
                    }.bind(this));
                }
                if (data.location) {
                    this.location.lat = data.location.lat;
                    this.location.lon = data.location.lon;
                }
                this.filterResults();
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

.no-results
    text-align: center

.card-container
    margin-top: 20px
    text-align: center

.phone-number
    +font-bold
    display: flex
    align-items: center
    justify-content: center
    margin: 33px 0px 23px 0px
    font-size: 26px

.cant-talk-now
    +font-semi
    margin: 0px 0px 24px 0px
    font-size: 12px
    text-align: center

.contact-this-pro
    +font-bold
    display: block
    background: $backgroundColor
    border: 1.49px solid $altColor
    border-radius: 3px
    margin: 0px auto 36px
    padding: 15px
    color: $brandColor
    font-size: 15px
    text-align: center

.business-hours
    margin: 0px 0px 36px 0px
    font-size: 14px
    line-height: 21px
    text-align: center
</style>
