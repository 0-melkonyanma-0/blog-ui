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
        <v-btn
            variant="flat"
            v-if="actionName === 'image'"
            class="menubar__button"
            @click="showDialog(showImgDialog)"
        >
          <v-icon>mdi-image</v-icon>
        </v-btn>
        <v-btn
            v-if="actionName === 'align-left'"
            variant="flat"
            @click="editor.chain().focus().setTextAlign('left').run()"
        >
          <v-icon>
            mdi-format-align-left
          </v-icon>
        </v-btn>
        <v-btn
            v-if="actionName === 'align-center'"
            variant="flat"
            @click="editor.chain().focus().setTextAlign('center').run()"
        >
          <v-icon>
            mdi-format-align-center
          </v-icon>
        </v-btn>
        <v-btn
            v-if="actionName === 'align-right'"
            variant="flat"
            @click="editor.chain().focus().setTextAlign('right').run()"
        >
          <v-icon>
            mdi-format-align-right
          </v-icon>
        </v-btn>
        <v-btn
            v-if="actionName === 'align-justify'"
            variant="flat"
            @click="editor.chain().focus().setTextAlign('justify').run()"
        >
          <v-icon>
            mdi-format-align-justify
          </v-icon>
        </v-btn>
        <v-btn
            v-if="actionName === 'align-unset'"
            variant="flat" @click="editor.chain().focus().unsetTextAlign().run()"
        >
          <v-icon>
            mdi-format-clear
          </v-icon>
        </v-btn>
      </span>

    </div>

    <v-dialog v-model="showImgDialog">
      <v-container class="d-flex align-center justify-center">
        <v-col xs="12" md="8" lg="8" xl="6" xxl="4">
          <v-card>
            <v-card-text class="pa-4">
              <v-text-field v-model="url" hide-details variant="outlined">
                <template #label>
                  URL
                </template>
              </v-text-field>
            </v-card-text>
            <v-card-actions class="mx-2 mb-4">
              <v-btn @click="addImage" variant="outlined">
                {{ $t('add') }}
              </v-btn>
              <v-btn @click="addImage" variant="outlined">
                {{ $t('close') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-container>
    </v-dialog>

    <div class="editor__content">
      <editor-content
          style="padding: 20px"
          v-bind="initialValue"
          :style="contentEditorStyle ? 'height: 500px;' : 'height: 125px;'"
          :editor="editor"
      />
    </div>
  </div>
</template>

<script>
import {Editor, EditorContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import {Dropcursor} from "@tiptap/extension-dropcursor"
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'

export default {
  name: 'Editor',
  components: {
    EditorContent
  },
  props: {
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
                'image',
                'align-left',
                'align-center',
                'align-right',
                'align-justify',
                'align-unset',
              ].indexOf(el) === -1
          ) {
            return -1;
          }
        }
        return 1;
      },
      default: () => ['bold', 'italic'],
    },
    initialValue: {
      type: String
    },
    contentEditorStyle: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update'],
  data() {
    return {
      html: '',
      json: '',
      editor: null,
      url: '',
      showImgDialog: false
    };
  },
  methods: {
    showDialog() {
      this.showImgDialog = true
    },
    addImage() {
      this.showImgDialog = false

      if (this.url) {
        this.editor.chain().focus().setImage({src: this.url}).run()
      }

      this.url = ''
    },
  },
  created() {
    const content = this.initialValue

    this.editor = new Editor({
      content: content,
      extensions: [
        StarterKit,
        Underline,
        Image,
        Dropcursor,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
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

<style scoped>
.editor__content {
  border: solid 3px black;
  max-height: 500px;
  overflow-y: scroll;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top: solid 1px;
}

.menubar {
  border: solid 3px black;
  border-bottom: solid 2px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
</style>
