<template>
  <div id="app">
    <v-navbar />
    <div class="container text-center" v-if="!isShowResult">
      <v-editor v-model="content" />
      <div class="actions mt-2 text-center">
        <v-button @click="changeColor('text')">
          Change color
        </v-button>
        <v-button @click="changeFontSize">
          Change font size
        </v-button>
        <v-button @click="changeColor('bg')">
          Change selection color
        </v-button>
      </div>
      <div class="text-center mt-2">
        <label for="font-size">
          Change font-size
          <input
            id="font-size"
            type="number"
            min="1"
            max="7"
            v-model.number="fontSize"
          />
        </label>
        <br />
        <label for="color" class="mt-2">
          Change color / selection color
          <input id="color" type="color" v-model="color" />
        </label>
      </div>
      <v-add-info @show-result="show('color')" />
    </div>
    <pre class="mt-5 px-2" v-else>{{ JSON.stringify(output, null, 4) }}</pre>
  </div>
</template>

<script>
import { groupBy, uniqueArray } from '@/utils';
import VNavbar from '@/components/VNavbar';
import VEditor from '@/components/VEditor';
import VAddInfo from '@/components/VAddInfo';
export default {
  name: 'App',
  components: { VNavbar, VEditor, VAddInfo },
  data() {
    return {
      isNumber: true,
      color: '#000000',
      fontSize: 4,
      content: [
        {
          text: 'some text',
          color: 'red',
          backgroundColor: '#fff',
          fontSize: '20px'
        }
      ],
      output: {},
      isShowResult: false
    };
  },
  methods: {
    changeColor(type = 'text') {
      this.isNumber = false;
      if (type === 'text') {
        document.execCommand('foreColor', true, this.color);
      } else {
        if (!document.execCommand('hiliteColor', false, this.color)) {
          document.execCommand('backColor', true, this.color);
        }
        document.execCommand('hiliteColor', false, this.color);
      }
    },
    changeFontSize() {
      this.isNumber = true;
      document.execCommand('fontSize', true, this.fontSize);
    },
    show(prop = 'color') {
      // combine by color property
      // can change to bgColor, etc.
      const combinedByProp = groupBy([prop])(this.content);
      const combinedByAllProps = groupBy([
        'color',
        'fontSize',
        'backgroundColor'
      ])(this.content);
      let arr = [];
      Object.keys(combinedByProp).forEach((key) => {
        const val = combinedByProp[key];
        let text = '';
        for (let i = 0; i < val.length; i++) {
          text += ' ' + val[i].text;
          arr.push({
            ...val[i],
            text: text.trimStart()
          });
        }
      });
      this.output = {
        combined: uniqueArray(arr, prop),
        // for testing
        combinedByAllProps
      };
      this.isShowResult = true;
    }
  }
};
</script>

<style>
html {
  box-sizing: border-box;
  font-size: 16px;
}

*,
*::after,
*::before {
  box-sizing: inherit;
  margin: 0;
}

body {
  position: relative;
  margin: 0;
  padding: 0;
  background-color: rgba(255, 255, 255, 0.7);
}

label {
  display: inline-block;
}
#app {
  padding-bottom: 1rem;
}
.container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.text-center {
  text-align: center;
}
.mt-1 {
  margin-top: 1rem;
}
.mt-2 {
  margin-top: 2rem;
}
.mt-5 {
  margin-top: 5rem;
}
.px-2 {
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>
