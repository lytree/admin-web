<script lang="ts">
import '@/styles/layout/navbar.css';
import '@/styles/layout/footer.css';
import { defineComponent, h, ref, Component } from 'vue';
import { NIcon, NMenu } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import IconAccountBox from '~icons/mdi/account-box';

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '且听风吟'
      ),
    key: 'hear-the-wind-sing',
    icon: renderIcon(IconAccountBox)
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(IconAccountBox),
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(IconAccountBox),
    disabled: true
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(IconAccountBox),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(IconAccountBox)
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(IconAccountBox)
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(IconAccountBox),
        children: [
          {
            label: '威士忌',
            key: 'whisky'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
];

export default defineComponent({
  components: { NMenu },
  setup() {
    return {
      activeKey: ref<string | null>(null),
      menuOptions
    };
  }
});
</script>

<template>
  <div class="h-full w-full">
    <div class="navbar shadow-lg h-16">
      <div class="navbar-start"></div>
      <div class="navbar-center">
        <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
      </div>
      <div class="navbar-end"></div>
    </div>
    <div class="container mx-auto my-4 min-h-[calc(100%-10rem)]">
      <router-view />
    </div>
    <footer class="h-16 footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>Copyright © 2022 - All right reserved by ACME Industries Ltd</p>
      </div>
    </footer>
  </div>
</template>

<style></style>
