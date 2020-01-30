<template>
  <table>
    <thead>
      <tr>
        <th>Leaderboard</th>
        <th>World</th>
        <th>Region</th>
        <th>Realm</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="datas.overall">
        <td>{{wowclass}} (All Roles)</td>
        <td :style="{ color: colorForRank(datas.class.world) }">
          {{datas.class.world}}</td>
        <td :style="{ color: colorForRank(datas.class.region) }">
          {{datas.class.region}}</td>
        <td :style="{ color: colorForRank(datas.class.realm) }">
          {{datas.class.realm}}</td>
      </tr>
      <tr v-if="'class_dps' in datas && datas.class_dps.world > 0">
        <td>{{wowclass}} DPS</td>
        <td :style="{ color: colorForRank(datas.class_dps.world) }">
          {{datas.class_dps.world}}
        </td>
        <td :style="{ color: colorForRank(datas.class_dps.region) }">
          {{datas.class_dps.region}}
        </td>
        <td :style="{ color: colorForRank(datas.class_dps.realm) }">
          {{datas.class_dps.realm}}
        </td>
      </tr>
      <tr v-if="'class_healer' in datas && datas.class_healer.world > 0">
        <td>{{wowclass}} Healer</td>
        <td :style="{ color: colorForRank(datas.class_healer.world) }">
          {{datas.class_healer.world}}
        </td>
        <td :style="{ color: colorForRank(datas.class_healer.region) }">
          {{datas.class_healer.region}}
        </td>
        <td :style="{ color: colorForRank(datas.class_healer.realm) }">
          {{datas.class_healer.realm}}
        </td>
      </tr>
      <tr v-if="'class_tank' in datas && datas.class_tank.world > 0">
        <td>{{wowclass}} Tank</td>
        <td :style="{ color: colorForRank(datas.class_tank.world) }">
          {{datas.class_tank.world}}
        </td>
        <td :style="{ color: colorForRank(datas.class_tank.region) }">
          {{datas.class_tank.region}}
        </td>
        <td :style="{ color: colorForRank(datas.class_tank.realm) }">
          {{datas.class_tank.realm}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Ranks',
  props: {
    datas: Object,
    wowclass: String,
  },
  methods: {
    colorForRank(rank) {
      let color = '#ffffff';
      if (rank <= 3 && rank > 0) color = '#e6cc80';
      else if (rank <= 10) color = '#ff8000';
      else if (rank <= 100) color = '#a335ee';
      else if (rank <= 10000) color = '#0070dd';
      else if (rank <= 100000) color = '#1eff00';
      return color;
    },
  },
};
</script>

<style scoped lang="scss">
table{
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  display: table;
  thead > tr {
    background-color: black;
    th:first-child {
      text-align: left!important;
      padding-left: 15px;
    }
    th {
      padding: 5px;
      font-size:0.8rem;
      font-weight: normal;
      text-align: center!important;
    }
  }
  tbody{
    tr:nth-child(odd) {
        background-color: #353535;
    }
    tr {
      td:first-child {
        text-align: left!important;
        padding-left: 15px;
        font-size:0.7rem;
      }
      td {
        padding: 5px;
        font-size:0.8rem;
        font-weight: normal;
        text-align: center!important;
      }
    }
  }
}
</style>
