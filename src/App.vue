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
      <v-add-info @show-result="show" />
    </div>
    <pre class="mt-5 px-2" v-else>{{ JSON.stringify(outputArr, null, 4) }}</pre>
  </div>
</template>

<script>
import { groupBy, checkEqualityProp } from '@/utils';
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
          color: 'lightblue',
          backgroundColor: '#fff',
          fontSize: '20px'
        }
      ],
      outputArr: {},
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
    show() {
      let index = 0;

      // combine sibling arr
      const combined = this.content.map((c, i) => {
        const current = this.content[i];
        const next = this.content[i + 1] || {};
        if (
          checkEqualityProp(current, next, 'fontSize') &&
          checkEqualityProp(current, next, 'color') &&
          checkEqualityProp(current, next, 'backgroundColor')
        ) {
          index = i + 1;
          return { ...current, text: `${current.text} ${next.text}` };
        } else {
          return c;
        }
      });
      // combine by all properties, I think it's better than first combine
      const combinedByAllProps = groupBy([
        'color',
        'fontSize',
        'backgroundColor'
      ])(this.content);

      if (index) {
        combined.splice(index, 1);
      }
      this.outputArr = {
        combined,
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
