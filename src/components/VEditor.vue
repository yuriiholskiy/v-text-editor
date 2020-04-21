<template>
  <div id="v-editor" ref="editable" contenteditable v-on="listeners" />
</template>

<script>
import { getNodes } from '@/utils';
export default {
  name: 'VEditor',
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  computed: {
    listeners() {
      return { ...this.$listeners, input: this.onInput };
    }
  },
  mounted() {
    let html = '';
    this.value.forEach(({ text, color, backgroundColor, fontSize }) => {
      const styles = `
        color: ${color};
        font-size: ${fontSize};
        background-color: ${backgroundColor};
      `;
      html += `<span style="${styles}">${text}</span>`;
      html += `<br />`;
    });
    this.$refs.editable.innerHTML = html;
    document.execCommand('StyleWithCSS', false, true);
  },
  methods: {
    onInput(e) {
      const formatedHTML = e.target.innerHTML
        .replace(/<div>/g, '')
        .replace(/<\/div>/g, '');
      const nodesArr = getNodes(formatedHTML)
        .filter((v) => v.innerHTML !== '')
        .map((n) => {
          if (n.nodeType === 3) {
            // check for text node
            return {
              text: n.nodeValue,
              color: '#000',
              backgroundColor: '#fff',
              fontSize: '16px'
            };
          }
          return {
            text: n.textContent,
            color: n.style.color || '#000',
            backgroundColor: n.style.backgroundColor || '#fff',
            fontSize: n.style.fontSize || '16px'
          };
        });
      this.$emit('input', nodesArr);
    }
  }
};
</script>

<style>
#v-editor {
  height: 50%;
  min-height: 25rem;
  width: 100%;
  margin-top: 6rem;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  text-align: left;
}
</style>
