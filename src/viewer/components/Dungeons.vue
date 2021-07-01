<template>
  <table>
    <thead>
      <tr>
        <th>Dungeon</th>
        <th style="text-align: left;">Level</th>
        <th>Time</th>
        <th>Affixes</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="dungeon in datas" :key="dungeon">
        <td>
          <div class="tooltip">
            <a :href="dungeon.url" target="_blank">{{dungeon.short_name}}</a>
            &nbsp;<span class='tooltipdungeon'>
              {{dungeon.dungeon}}
            </span>
          </div>
        </td>
        <td style="text-align: left;">
          +{{dungeon.mythic_level}}
          <span class="upgrades">{{"*".repeat(dungeon.num_keystone_upgrades)}}</span>
        </td>
        <td :class="{ deplete: (dungeon.num_keystone_upgrades ===  0)}">
          {{msToTime(dungeon.clear_time_ms)}}
        </td>
        <td>
          <div v-for="affix in dungeon.affixes" :key="dungeon+affix.id" class="tooltip">
            <img class="imgaffix" :src="getaffixicon(affix.name)" :alt="affix.name">
            <span class='tooltiptext'><b>{{affix.name}}</b><br>{{affix.description}}</span>
          </div>
        </td>
        <td>{{dungeon.score}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Dungeons',
  props: {
    datas: Object,
  },
  methods: {
    msToTime(duration) {
      let seconds = parseInt((duration / 1000) % 60, 10);
      let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
      let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      return `${hours}:${minutes}:${seconds}`;
    },
    getaffixicon(affixF) {
      const iconurl = 'https://render-eu.worldofwarcraft.com/icons/56/wow_store.jpg';

      const affixicons = {
        Reaping: 'https://render-eu.worldofwarcraft.com/icons/56/ability_racial_embraceoftheloa_bwonsomdi.jpg',
        Volcanic: 'https://render-eu.worldofwarcraft.com/icons/56/spell_shaman_lavasurge.jpg',
        Beguiling: 'https://render-eu.worldofwarcraft.com/icons/56/spell_shadow_mindshear.jpg',
        Infested: 'https://render-eu.worldofwarcraft.com/icons/56/achievement_nazmir_boss_ghuun.jpg',
        Grievous: 'https://render-eu.worldofwarcraft.com/icons/56/ability_backstab.jpg',
        Bolstering: 'https://render-eu.worldofwarcraft.com/icons/56/ability_warrior_battleshout.jpg',
        Raging: 'https://render-eu.worldofwarcraft.com/icons/56/ability_warrior_focusedrage.jpg',
        Prideful: 'https://render-eu.worldofwarcraft.com/icons/56/spell_animarevendreth_buff.jpg',
        Storming: 'https://render-eu.worldofwarcraft.com/icons/56/spell_nature_cyclone.jpg',
        Skittish: 'https://render-eu.worldofwarcraft.com/icons/56/spell_magic_lesserinvisibilty.jpg',
        Explosive: 'https://render-eu.worldofwarcraft.com/icons/56/spell_fire_felflamering_red.jpg',
        Necrotic: 'https://render-eu.worldofwarcraft.com/icons/56/spell_deathknight_necroticplague.jpg',
        Quaking: 'https://render-eu.worldofwarcraft.com/icons/56/spell_nature_earthquake.jpg',
        Tormented: 'https://render-eu.worldofwarcraft.com/icons/56/spell_animamaw_orb.jpg',
        Overflowing: 'https://render-eu.worldofwarcraft.com/icons/56/inv_misc_volatilewater.jpg',
        Tyrannical: 'https://render-eu.worldofwarcraft.com/icons/56/achievement_boss_archaedas.jpg',
        Bursting: 'https://render-eu.worldofwarcraft.com/icons/56/ability_ironmaidens_whirlofblood.jpg',
        Teeming: 'https://render-eu.worldofwarcraft.com/icons/56/spell_nature_massteleport.jpg',
        Awakened: 'https://render-eu.worldofwarcraft.com/icons/56/trade_archaeology_nerubian_obelisk.jpg',
        Inspiring: 'https://render-eu.worldofwarcraft.com/icons/56/spell_holy_prayerofspirit.jpg',
        Fortified: 'https://render-eu.worldofwarcraft.com/icons/56/ability_toughness.jpg',
        Spiteful: 'https://render-eu.worldofwarcraft.com/icons/56/spell_holy_prayerofshadowprotection.jpg',
        Sanguine: 'https://render-eu.worldofwarcraft.com/icons/56/spell_shadow_bloodboil.jpg',
      };
      if (typeof affixicons[affixF] !== 'undefined') {
        return affixicons[affixF];
      }
      return iconurl;
    },
  },
};
</script>

<style scoped lang="scss">
.deplete{
  font-size:0.68rem;
  font-weight: normal;
  color: #aaaaaa;
}
a {
  text-decoration:none;
  color: white;
  &:hover {
    text-decoration:underline;
  }
}
table{
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  display: table;
  thead > tr {
    background-color: black;
    th:first-child {
      text-align: left;
      padding-left: 15px;
    }
    th {
      padding: 5px;
      font-size:0.8rem;
      font-weight: normal;
      text-align: center;
    }
  }
  tbody{
    tr:nth-child(odd) {
        background-color: #353535;
    }
    tr {
      td:first-child {
        text-align: left;
        font-size: 0.8rem;
        padding-left: 15px;
      }
      td {
        padding: 5px;
        font-size:0.7rem;
        font-weight: normal;
        text-align: center;
        .upgrades {
          color: #ffcf40;
          padding: 0;
        }
      }
    }
  }
}
.imgaffix {
  width: 18px;
  height: 18px;
}
.tooltip {
  position: relative;
  display: inline-block;
}
.tooltip .tooltiptext {
  width: 180px;
  visibility: hidden;
  background-color: #000000;
  color: #fff;
  text-align: left;
  border-radius: 6px;
  padding: 5px;
  margin-left: -120px;
  bottom: 100%;
  position: absolute;
  display: block;
  z-index: 1;
}
.tooltip .tooltipdungeon {
  width: 100px;
  visibility: hidden;
  background-color: #000000;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  top: -5px;
  left: 125%;
  position: absolute;
  display: block;
  z-index: 1;
}
.tooltip:hover .tooltipdungeon, .tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
