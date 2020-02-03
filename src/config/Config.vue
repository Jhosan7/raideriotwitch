<template>
  <div class="main">
    <div class="title">WOW M+ Configuration</div>
    <div v-if="datasNow" class="current">Current:<br>
      <span>{{datasNow.region}}-{{datasNow.realm}} {{datasNow.char}}</span>
    </div>
    <div v-if="isLoading" class="loading">
      <img alt='loading' class="img-loading" src='../assets/media/loader.gif'>
    </div>
    <div v-if="msgError" class="error">
      <b>Error:</b> {{msgError}}
    </div>
    <div v-show="done && !msgError" class="done">
      <b>OK:</b> Configuration saved!
    </div>
    <div class="form">
      <form @submit.prevent="handleSubmit" autocomplete="off">
        <div class="formrow">
          <div class="formfield">
            <label for="region">Region</label>
            <select id="region" v-model="datas.region">
                <option value="eu">EU</option>
                <option value="us">US</option>
                <option value="kr">KR</option>
                <option value="tw">TW</option>
            </select>
          </div>
          <Realms :region="datas.region" v-model="datas.realm" />
        </div>
        <div class="formrow">
          <div class="formfield">
            <label for="char">Character Name</label>
            <input id="char" type="text" v-model="datas.char">
          </div>
        </div>
        <div class="formrow">
          <div class="formfield">
            <input id="submit" type="submit" value="Set">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Realms from './components/Realms.vue';

const Twitch = window.Twitch.ext;

export default {
  name: 'Config',
  components: {
    Realms,
  },
  data() {
    return {
      datasNow: null,
      datas: {
        region: 'eu',
        realm: null,
        char: null,
      },
      msgError: null,
      done: false,
      isLoading: false,
    };
  },
  mounted() {
    Twitch.configuration.onChanged(() => {
      if (Twitch.configuration.broadcaster) {
        this.datasNow = JSON.parse(Twitch.configuration.broadcaster.content);
      }
    });
  },
  methods: {
    handleSubmit() {
      if (this.isLoading) return;
      this.done = false;
      this.msgError = false;
      if (this.datas.region && this.datas.realm && this.datas.char) {
        this.isLoading = true;
        axios.get('https://raider.io/api/v1/characters/profile', {
          crossdomain: true,
          params: {
            name: encodeURIComponent(this.datas.char),
            region: this.datas.region,
            realm: this.datas.realm,
          },
        })
          .then((response) => {
            if (response.status === 200) {
              Twitch.configuration.set('broadcaster', 'v1', JSON.stringify(this.datas));
              this.done = true;
            } else {
              this.msgError = 'Character not found in Raider.io';
            }
          })
          .catch(() => {
            this.msgError = 'Character not found in Raider.io';
          })
          .then(() => {
            this.isLoading = false;
          });
      } else {
        this.msgError = 'Empty fields.';
      }
    },
  },
};
</script>

<style lang="scss">
html,body {
  font-family: 'Oswald', sans-serif;
  color: black;
  background: #1e1e1e;
  height: 100%;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  margin: 0;
  padding: 0;
}
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 3px;
  border: 1px solid #353535;
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
  text-align: center;
  padding: 20px;

  .title {
    color: black;
    margin: 10px;
    font-weight: bold;
    font-size: 24px;
    width: 100%;
  }
  .current {
    color: #1e1e1e;
    width: 100%;
    span {
      color: black;
      font-weight: bold;
    }
  }
}

.form {
  margin: 5px;
  width: 100%;
  .formrow {
    display: flex;
    align-items: center;
    justify-content: center;
    .formfield {
      padding: 10px;
      label {
        text-align: left;
        font-size: 14px;
      }
      #region {
        width: 70px;
      }
      #char {
        width: 290px;
      }
      #submit {
        width: 80px;
        font-family: 'Oswald', sans-serif;
      }
    }
  }
  label, label, select {
    display:block;
  }
  input, select {
    padding: 12px 10px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 1px solid black;
  }
}
.error {
  width: 90%;
  background-color: rgb(255, 172, 172);
  margin: auto;
  border-radius: 3px;
  border: 1px solid #ff0000;
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
  text-align: center;
  color:#ff0000;
  font-size: 14px;
  padding: 5px;
}
.done {
  width: 90%;
  background-color: rgb(186, 201, 185);
  margin: auto;
  border-radius: 3px;
  border: 1px solid #207200;
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
  text-align: center;
  color:#207200;
  font-size: 14px;
  padding: 5px;
}
.loading {
  width: 90%;
  margin: auto;
  text-align: center;
  font-size: 14px;
  padding: 5px;
  .img-loading {
    width: 40px;
    height: auto;
  }
}
</style>
