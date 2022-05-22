import { computed } from 'vue';
import { useAppStore, useThemeStore } from '@/store';

type LayoutHeaderProps = Record<EnumType.ThemeLayoutMode, GlobalHeaderProps>;

export function useBasicLayout() {
  const app = useAppStore();
  const theme = useThemeStore();

  const layoutHeaderProps: LayoutHeaderProps = {
    vertical: {
      showLogo: false,
      showHeaderMenu: false,
      showMenuCollapse: true
    }
  };

  const headerProps = computed(() => layoutHeaderProps.vertical);

  const siderVisible = computed(() => true);
  const siderWidth = computed(() => {
    const { width, mixWidth, mixChildMenuWidth } = theme.sider;
    const isVerticalMix = false;
    let w = isVerticalMix ? mixWidth : width;
    if (isVerticalMix && app.mixSiderFixed) {
      w += mixChildMenuWidth;
    }
    return w;
  });
  const siderCollapsedWidth = computed(() => {
    const { collapsedWidth, mixCollapsedWidth, mixChildMenuWidth } = theme.sider;
    const isVerticalMix = false;
    let w = isVerticalMix ? mixCollapsedWidth : collapsedWidth;
    if (isVerticalMix && app.mixSiderFixed) {
      w += mixChildMenuWidth;
    }
    return w;
  });

  return {
    headerProps,
    siderVisible,
    siderWidth,
    siderCollapsedWidth
  };
}
