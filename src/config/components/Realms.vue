<template>
  <div class="formfield autocomplete">
    <label for="realm">Realm</label>
    <input id="realm" type="search"
      v-model="InputRealm"
      @input="onInput"
    >
    <div v-show="Open" class="autocomplete-items">
      <div class="suggestion"
        v-for="item in Suggestions" :key="item[0]"
        @click.once="SetRealm(item[0])"
      >
        {{item[1]}}
      </div>
    </div>
  </div>
</template>

<script>
import RealmsList from './Realms';

export default {
  name: 'Realms',
  props: {
    region: String,
  },
  event: 'input',
  data() {
    return {
      RealmsList,
      InputRealm: null,
      Suggestions: null,
      Open: false,
    };
  },
  mounted() {
    document.addEventListener('click', this.handleBlur);
  },
  destroyed() {
    document.removeEventListener('click', this.handleBlur);
  },
  methods: {
    onInput() {
      this.$emit('input', this.InputRealm);
      if (this.InputRealm.length > 0) {
        this.Open = true;
        this.Suggestions = this.RealmsList[this.region]
          .filter(item => item[1].toLowerCase().indexOf(this.InputRealm.toLowerCase()) > -1);
      } else {
        this.Open = false;
        this.Suggestions = null;
      }
    },
    handleBlur(e) {
      if (!this.$el.contains(e.target)) {
        this.Open = false;
      }
    },
    SetRealm(realm) {
      this.$emit('input', realm);
      this.Open = false;
      this.Suggestions = null;
      this.InputRealm = realm;
    },
  },
};
</script>

<style scoped lang="scss">
#realm {
  width: 200px;
}
.autocomplete {
  position: relative;
  display: inline-block;
}
.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: -15px;
  width: 200px;
  overflow: auto;
  max-height: 100%;
}
.autocomplete-items div {
  padding: 5px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
  font-size: 12px;
}
.autocomplete-items div:hover {
  background-color: #e9e9e9;
}
</style>
