<template>
  <div class="header" :style="{ backgroundImage: `url('${getbackground(datas.profile_banner)}')`}">
    <div class="info">
      <a :href="datas.profile_url" target="_blank"
        :class="{ name: true, horde: isHorde(), ali: !isHorde() }">
        {{datas.name}}
      </a>
      <br>
      <span v-if="datas.guild" class="guild">
        <a :href="`https://raider.io/guilds/${datas.region}/${datas.guild.realm}/${datas.guild.name}`" target='_blank'>
        &lt;{{datas.guild.name}}&gt;
        </a>
      </span><br>
      <span class="region">({{datas.region}}) </span>
      <span class="realm">{{datas.realm}}</span><br>
      <span :class="{ race: true, horde: isHorde(), ali: !isHorde() }">{{datas.race}} </span>
      <span class="class" :style="{ color: getclasscolor(datas.class) }">{{datas.class}}</span>
    </div>
    <div class="score">
        <span class="title">M+ Score: </span>
        <span class="rating"
          :style="{ color: Scorecolor }">
          {{datas.mythic_plus_scores_by_season[0].scores.all}}
        </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Header',
  props: {
    datas: Object,
  },
  data() {
    return {
      Scorecolor: 'white',
    };
  },
  mounted() {
    if (this.datas.mythic_plus_scores_by_season) {
      this.getscorecolor(this.datas.mythic_plus_scores_by_season[0].scores.all);
    }
  },
  methods: {
    isHorde() {
      if (this.datas.faction === 'horde') return true;
      return false;
    },
    getclasscolor(classname) {
      const ClassColor = {
        'Death Knight': '#C41F3B',
        'Demon Hunter': '#A330C9',
        Druid: '#FF7D0A',
        Hunter: '#ABD473',
        Mage: '#69CCF0',
        Monk: '#00FF96',
        Paladin: '#F58CBA',
        Priest: '#FFFFFF',
        Rogue: '#FFF569',
        Shaman: '#0070DE',
        Warlock: '#9482C9',
        Warrior: '#C79C6E',
      };

      if (typeof ClassColor[classname] !== 'undefined') {
        return ClassColor[classname];
      }
      return '#FFFFFF';
    },
    getbackground(profilebanner) {
      if (!profilebanner) return './media/defaultbackground.jpg';
      return `https://cdnassets.raider.io/images/profile/masthead_backdrops/v2/${profilebanner}.jpg`;
    },
    getscorecolor(score) {
      if (!score) return;
      axios.get('https://raider.io/api/v1/mythic-plus/score-tiers', {
        crossdomain: true,
      })
        .then((response) => {
          if (response.status === 200) {
            response.data.reverse().forEach((element) => {
              if (score > element.score) this.Scorecolor = element.rgbHex;
            });
          }
        })
        .catch(() => null);
    },
  },
};
</script>

<style scoped lang="scss">
a{
  color: white;
  text-decoration:none;
  &:hover{
    text-decoration:underline;
  }
}
.header {
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
  background-size: 150%;
  overflow:hidden;
  a:hover {
    text-decoration: none;
    font-weight: 600;
  }
}
.info {
  float: left;
  margin: 10px;
  margin-top: 5px;
  font-size: 0.75rem;
  text-shadow:
   -1px -1px 0 rgba(0, 0, 0, 0.5),
    1px -1px 0 rgba(0, 0, 0, 0.5),
    -1px 1px 0 rgba(0, 0, 0, 0.5),
     1px 1px 0 rgba(0, 0, 0, 0.5);
  .name {
    font-size: 1.5rem;
    line-height:110%;
  }
  .region {
    text-transform: uppercase;
  }
  .realm {
    text-transform: capitalize;
  }
  .horde {
    color: #e02929;
  }
  .ali {
    color: #6699ff;
  }
}
.score {
  position: absolute;
  right: 0;
  margin: 10px;
  .title {
    font-size: 0.75rem;
    text-shadow:
   -1px -1px 0 rgba(0, 0, 0, 0.5),
    1px -1px 0 rgba(0, 0, 0, 0.5),
    -1px 1px 0 rgba(0, 0, 0, 0.5),
     1px 1px 0 rgba(0, 0, 0, 0.5);
  }
  .rating {
    font-size: 1.4rem;
    font-weight: bold;
    text-shadow:
   -1px -1px 0 rgba(0, 0, 0, 0.5),
    1px -1px 0 rgba(0, 0, 0, 0.5),
    -1px 1px 0 rgba(0, 0, 0, 0.5),
     1px 1px 0 rgba(0, 0, 0, 0.5);
  }
}
</style>
