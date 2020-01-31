<template>
  <div id="panel">
    <div v-show="loading" class="loading">
      <img alt='loading' class="img-loading" src='../assets/media/loader.gif'>
    </div>

    <div v-if="error" class="tryagain">
      <h3>Error loading the data...</h3><br>
      <input @click="getDatas(BroadcasterConfig)"
        id="tryB" class="submit-button" type="button" value="Try again"
      />
    </div>

    <div v-if="configError" class="tryagain">
      <h3>Configuration Error...</h3><br>
      Go to Extension's configuration panel.
    </div>

    <div v-if="!loading && !error && !configError" id="content">
      <Header :datas="RaiderioDatas" />
      <Ranks :datas="RaiderioDatas.mythic_plus_ranks" :wowclass="RaiderioDatas.class" />
      <Dungeons :datas="RaiderioDatas.mythic_plus_best_runs" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from './components/Header.vue';
import Ranks from './components/Ranks.vue';
import Dungeons from './components/Dungeons.vue';

const Twitch = window.Twitch.ext;

export default {
  name: 'Viewer',
  components: {
    Header,
    Ranks,
    Dungeons,
  },
  data() {
    return {
      RaiderioDatas: null,
      BroadcasterConfig: null,
      loading: true,
      error: false,
      configError: false,
    };
  },
  watch: {
    configError: {
      immediate: true,
      handler(newval) {
        if (newval === true) this.loading = false;
      },
    },
    loading: {
      immediate: true,
      handler(newval) {
        if (newval === true) {
          this.error = false;
          this.configError = false;
        }
      },
    },
  },
  mounted() {
    Twitch.configuration.onChanged(() => {
      if (Twitch.configuration.broadcaster) {
        this.BroadcasterConfig = JSON.parse(Twitch.configuration.broadcaster.content);
        if (this.BroadcasterConfig) {
          this.getDatas(this.BroadcasterConfig);
        } else {
          this.configError = true;
          this.loading = false;
        }
      } else {
        this.configError = true;
        this.loading = false;
      }
    });
  },
  methods: {
    getDatas(BroadcasterConfig) {
      if (BroadcasterConfig.char && BroadcasterConfig.region && BroadcasterConfig.realm) {
        this.loading = true;
        this.error = false;

        axios.get('https://raider.io/api/v1/characters/profile', {
          crossdomain: true,
          params: {
            name: encodeURIComponent(BroadcasterConfig.char),
            region: BroadcasterConfig.region,
            realm: BroadcasterConfig.realm,
            fields: 'mythic_plus_scores_by_season:current,guild,mythic_plus_best_runs:all,mythic_plus_ranks',
          },
        })
          .then((response) => {
            if (response.status === 200) {
              this.RaiderioDatas = response.data;
              this.loading = false;
              this.error = false;
            } else {
              this.error = true;
              this.loading = false;
            }
          })
          .catch(() => {
            this.error = true;
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.error = false;
        this.configError = true;
      }
    },
  },
};
</script>

<style lang="scss">

html,body {
  font-family: 'Oswald', sans-serif;
  color: white;
  background: #1e1e1e;
  height: 100%;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  margin: 0;
  padding: 0;
}
*, *:before, *:after {
    box-sizing: inherit;
}
#panel {
  width: 100%;
  overflow-y : scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  display: none;
  width: 0px;
  background: transparent;
}
.loading {
  width: 40px;
  margin: auto;
  padding: 20px;
  .img-loading {
    width: 100%;
    height: auto;
  }
}
.tryagain {
  margin: auto;
  padding: 20px;
  text-align: center;
}
.submit-button {
  border: 1px solid #353535;
  background: #353535;
  background: -webkit-gradient(linear, left top, left bottom, from(#353535), to(#353535));
  background: -webkit-linear-gradient(top, #353535, #353535);
  background: -moz-linear-gradient(top, #353535, #353535);
  background: -ms-linear-gradient(top, #353535, #353535);
  background: -o-linear-gradient(top, #353535, #353535);
  background-image: -ms-linear-gradient(top, #353535 0%, #353535 100%);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  -webkit-box-shadow: rgba(255,255,255,0.4) 0 0px 0, inset rgba(255,255,255,0.4) 0 0px 0;
  -moz-box-shadow: rgba(255,255,255,0.4) 0 0px 0, inset rgba(255,255,255,0.4) 0 0px 0;
  box-shadow: rgba(255,255,255,0.4) 0 0px 0, inset rgba(255,255,255,0.4) 0 0px 0;
  text-shadow: #353535 0 1px 0;
  color: #ffffff;
  font-family: 'Oswald', sans-serif;
  padding: 8.5px 18px;
  font-size: 14px;
  text-decoration: none;
  vertical-align: middle;
}
.submit-button:hover {
  border: 1px solid #8d8d8d;
  text-shadow: #8d8d8d 0 1px 0;
  background: #8d8d8d;
  background: -webkit-gradient(linear, left top, left bottom, from(#8d8d8d), to(#8d8d8d));
  background: -webkit-linear-gradient(top, #8d8d8d, #8d8d8d);
  background: -moz-linear-gradient(top, #8d8d8d, #8d8d8d);
  background: -ms-linear-gradient(top, #8d8d8d, #8d8d8d);
  background: -o-linear-gradient(top, #8d8d8d, #8d8d8d);
  background-image: -ms-linear-gradient(top, #8d8d8d 0%, #8d8d8d 100%);
  color: #fff;
}
.submit-button:active {
  text-shadow: #8d8d8d 0 1px 0;
  border: 1px solid #8d8d8d;
  background: #8d8d8d;
  background: -webkit-gradient(linear, left top, left bottom, from(#353535), to(#8d8d8d));
  background: -webkit-linear-gradient(top, #353535, #8d8d8d);
  background: -moz-linear-gradient(top, #353535, #8d8d8d);
  background: -ms-linear-gradient(top, #353535, #8d8d8d);
  background: -o-linear-gradient(top, #353535, #8d8d8d);
  background-image: -ms-linear-gradient(top, #353535 0%, #8d8d8d 100%);
  color: #fff;
}

</style>
