<template>
  <div class="editor">
    <div class="menubar">
      <span v-for="actionName in activeButtons" :key="actionName">
        <v-btn
            variant="flat"
            v-if="actionName === 'bold'"
            class="menubar__button"
            :class="{ 'is-active': editor.isActive('bold') }"
            @click="editor.chain().focus().toggleBold().run()"
        >
          <v-icon>mdi-format-bold</v-icon>
        </v-btn>
         <v-btn
             variant="flat"
             v-if="actionName === 'italic'"
             class="menubar__button"
             :class="{ 'is-active': editor.isActive('italic') }"
             @click="editor.chain().focus().toggleItalic().run()"
         >
          <v-icon>mdi-format-italic</v-icon>
        </v-btn>

        <v-btn
            variant="flat"
            v-if="actionName === 'strike'"
            class="menubar__button"
            :class="{ 'is-active': editor.isActive('strike') }"
            @click="editor.chain().focus().toggleStrike().run()"
        >
          <v-icon>mdi-format-strikethrough</v-icon>
        </v-btn>

        <v-btn
            variant="flat"
            v-if="actionName === 'underline'"
            class="menubar__button"
            :class="{ 'is-active': editor.isActive('underline') }"
            @click="editor.chain().focus().toggleUnderline().run()"
        >
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>

        <v-btn
            variant="flat"
            v-if="actionName === 'code'"
            class="menubar__button"
            :class="{ 'is-active': editor.isActive('code') }"
            @click="editor.chain().focus().toggleCode().run()"
        >
          <v-icon>mdi-code-block-braces</v-icon>
        </v-btn>

        <v-btn
            variant="flat"
            v-if="actionName === 'h1'"
            class="menubar__button"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          H1
        </v-btn>

        <v-btn
            variant="flat"
            v-if="actionName === 'h2'"
            class="menubar__button"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          H2
        </v-btn>

        <v-btn
            variant="flat"
            v-if="actionName === 'h3'"
            class="menubar__button"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          H3
        </v-btn>

        <v-btn
            variant="flat"
            v-if="actionName === 'bulletList'"
            class="menubar__button"
            :class="{ 'is-active': editor.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()"
        >
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>

        <v-btn
            variant="flat"
            v-if="actionName === 'orderedList'"
            class="menubar__button"
            :class="{ 'is-active': editor.isActive('orderedList') }"
            @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <v-icon>mdi-format-list-ordered</v-icon>
        </v-btn>

        <v-btn
            variant="flat"
            v-if="actionName === 'blockquote'"
            class="menubar__button"
            :class="{ 'is-active': editor.isActive('blockquote') }"
            @click="editor.chain().focus().toggleBlockquote().run()"
        >
          <v-icon>mdi-format-quote-close</v-icon>
        </v-btn>

        <v-btn
            variant="flat"
            v-if="actionName === 'codeBlock'"
            class="menubar__button"
            :class="{ 'is-active': editor.isActive('codeBlock') }"
            @click="editor.chain().focus().toggleCodeBlock().run()"
        >
          <v-icon>
            mdi-code-block-tags
          </v-icon>
        </v-btn>

<!--        <v-btn-->
<!--            v-if="actionName === 'horizontalRule'"-->
<!--            class="menubar__button"-->
<!--            @click="editor.chain().focus().setHorizontalRule().run()"-->
<!--        >-->
<!--&lt;!&ndash;          <icon name="hr" />&ndash;&gt;-->
<!--        </v-btn>-->

        <v-btn
            variant="flat"
            v-if="actionName === 'undo'"
            class="menubar__button"
            @click="editor.chain().focus().undo().run()"
        >
          <v-icon>mdi-undo</v-icon>
        </v-btn>

        <v-btn
            variant="flat"
            v-if="actionName === 'redo'"
            class="menubar__button"
            @click="editor.chain().focus().redo().run()"
        >
          <v-icon>mdi-redo</v-icon>
        </v-btn>
      </span>
    </div>

    <editor-content style="border: solid 2px black" class="editor__content" :editor="editor"/>
  </div>
</template>

<script>
import {Editor, EditorContent} from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

export default {
  name: 'Editor',
  components: {
    EditorContent
  },
  props: {
    initialContent: {
      type: String,
      required: true,
      default: '<em>editable text</em>',
    },
    activeButtons: {
      type: Array,
      validator: function (list) {
        for (let el of list) {
          // The value must match one of these strings
          if (
              [
                'bold',
                'italic',
                'strike',
                'underline',
                'code',
                'h1',
                'h2',
                'h3',
                'bulletList',
                'orderedList',
                'blockquote',
                'codeBlock',
                'horizontalRule',
                'undo',
                'redo',
              ].indexOf(el) === -1
          ) {
            return -1;
          }
        }
        return 1;
      },
      default: () => ['bold', 'italic'],
    },
  },
  emits: ['update'],
  data() {
    return {
      html: '',
      json: '',
      editor: null,
    };
  },
  created() {
    this.editor = new Editor({
      content: this.initialContent,
      extensions: [StarterKit, Underline],
    });

    this.html = this.editor.getHTML();
    this.json = this.editor.getJSON();

    this.editor.on('update', () => {
      this.html = this.editor.getHTML();
      this.json = this.editor.getJSON();
      this.$emit('update', this.html);
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss" scoped>
</style>
