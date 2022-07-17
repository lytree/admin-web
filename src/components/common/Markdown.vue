<template>
  <div ref="wrapRef"></div>
</template>
<script lang="ts">
import { defineComponent, ref, unref, nextTick, watch, onBeforeUnmount, onDeactivated } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useThemeStore } from '@/store';
import { onMountedOrActivated } from '@/hooks/core/onMountedOrActivated';

const theme = useThemeStore();

export default defineComponent({
  name: 'YMarkdown',
  inheritAttrs: false,
  props: {
    height: { type: Number, default: 500 },
    value: { type: String, default: '' }
  },

  emits: ['change', 'get', 'update:value'],
  setup(props, { attrs, emit }) {
    const wrapRef = ref<HTMLElement>();
    const vditorRef = ref<Vditor | null>();
    const initedRef = ref(false);
    const valueRef = ref(props.value || '');

    watch(
      [() => theme.darkMode, () => initedRef.value],
      ([val, inited]) => {
        if (!inited) {
          return;
        }
        vditorRef.value?.setTheme(val === true ? 'dark' : 'classic');
      },
      {
        immediate: true,
        flush: 'post'
      }
    );
    watch(
      () => props.value,
      v => {
        if (v !== valueRef.value) {
          vditorRef.value?.setValue(v);
        }
        valueRef.value = v;
      }
    );

    function init() {
      const wrapEl = unref(wrapRef) as HTMLElement;
      if (!wrapEl) return;
      const bindValue = { ...attrs, ...props };
      const insEditor = new Vditor(wrapEl, {
        theme: theme.darkMode === true ? 'dark' : 'classic',
        lang: 'zh_CN',
        mode: 'sv',
        fullscreen: {
          index: 520
        },
        preview: {
          actions: []
        },
        minHeight: props.height,
        input: v => {
          valueRef.value = v;
          emit('update:value', v);
          emit('change', v);
        },
        after: () => {
          nextTick(() => {
            insEditor.setValue(valueRef.value);
            vditorRef.value = insEditor;
            initedRef.value = true;
            emit('get', vditorRef.value);
          });
        },
        blur: () => {
          // unref(vditorRef)?.setValue(props.value);
        },
        ...bindValue,
        cache: {
          enable: false
        }
      });
    }

    const instance = {
      getVditor: (): Vditor => vditorRef.value!
    };
    function destroy() {
      const vditorInstance = unref(vditorRef);
      if (!vditorInstance) return;
      try {
        vditorInstance?.destroy?.();
        // eslint-disable-next-line no-empty
      } catch (error) {}
      vditorRef.value = null;
      initedRef.value = false;
    }
    onMountedOrActivated(init);
    onBeforeUnmount(destroy);
    onDeactivated(destroy);
    return {
      wrapRef,
      ...instance
    };
  }
});
</script>
