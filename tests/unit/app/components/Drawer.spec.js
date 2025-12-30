import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Drawer from '~/app/components/Drawer.vue';

// Mock Vue Router
vi.mock('vue-router', () => ({
  onBeforeRouteLeave: vi.fn()
}));

describe('Drawer.vue', () => {
  let wrapper;

  beforeEach(() => {
    // 清理 DOM
    document.querySelector('html')?.classList.remove('drawer_open');
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('基本渲染', () => {
    it('當 modelValue 為 false 時不應該渲染抽屜', () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: false
        }
      });

      expect(wrapper.find('.drawer_root-wrapping').exists()).toBe(false);
    });

    it('當 modelValue 為 true 時應該渲染抽屜', () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: true
        }
      });

      expect(wrapper.find('.drawer_root-wrapping').exists()).toBe(true);
    });

    it('應該渲染拖曳條', () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: true
        }
      });

      expect(wrapper.find('.drawer_root-wrapping-drawer-drag_bar').exists()).toBe(true);
    });

    it('應該渲染預設內容', () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: true
        }
      });

      expect(wrapper.text()).toContain('抽屜內容');
    });
  });



  describe('Props - hasMask（遮罩）', () => {
    it('預設應該顯示遮罩', () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: true
        }
      });

      expect(wrapper.find('.drawer_root-wrapping-mask').exists()).toBe(true);
    });

    it('hasMask 為 false 時不應該顯示遮罩', () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: true,
          hasMask: false
        }
      });

      expect(wrapper.find('.drawer_root-wrapping-mask').exists()).toBe(false);
    });
  });



  describe('事件處理', () => {
    it('點擊遮罩應該觸發 close 事件', async () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: true
        }
      });

      const wrapping = wrapper.find('.drawer_root-wrapping');
      await wrapping.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('點擊抽屜內容不應該觸發 close 事件', async () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: true
        }
      });

      const drawer = wrapper.find('.drawer_root-wrapping-drawer');
      await drawer.trigger('click');

      expect(wrapper.emitted('close')).toBeFalsy();
    });
  });



  describe('插槽', () => {
    it('應該支援 openBtn 插槽', () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: false
        },
        slots: {
          openBtn: '<button class="custom-open-btn">開啟</button>'
        }
      });

      expect(wrapper.find('.custom-open-btn').exists()).toBe(true);
      expect(wrapper.text()).toContain('開啟');
    });

    it('應該支援 closeBtn 插槽', () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: false
        },
        slots: {
          closeBtn: '<button class="custom-close-btn">關閉</button>'
        }
      });

      expect(wrapper.find('.custom-close-btn').exists()).toBe(true);
      expect(wrapper.text()).toContain('關閉');
    });

    it('應該支援預設插槽', () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: true
        },
        slots: {
          default: '<div class="custom-content">自訂內容</div>'
        }
      });

      expect(wrapper.find('.custom-content').exists()).toBe(true);
      expect(wrapper.text()).toContain('自訂內容');
    });

    it('應該支援 container 插槽', () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: true
        },
        slots: {
          container: '<div class="custom-container">自訂容器</div>'
        }
      });

      expect(wrapper.find('.custom-container').exists()).toBe(true);
    });
  });



  describe('拖曳功能', () => {
    it('應該渲染拖曳條', () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: true
        }
      });

      const dragBar = wrapper.find('.drawer_root-wrapping-drawer-drag_bar');
      expect(dragBar.exists()).toBe(true);
    });

    it('垂直方向的拖曳條應該有 css-is-vertical 屬性', () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: true,
          anchor: 'top'
        }
      });

      // 檢查 computed property
      const isVertical = wrapper.vm.isVertical.value || wrapper.vm.isVertical;
      expect(isVertical).toBe(true);
    });

    it('水平方向的拖曳條應該有 css-is-horizontal 屬性', () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: true,
          anchor: 'left'
        }
      });

      // 檢查 computed property
      const isHorizontal = wrapper.vm.isHorizontal.value || wrapper.vm.isHorizontal;
      expect(isHorizontal).toBe(true);
    });
  });

  describe('生命週期', () => {
    it('組件卸載時應該清理狀態', () => {
      wrapper = mount(Drawer, {
        props: {
          modelValue: true
        }
      });

      wrapper.unmount();

      expect(document.querySelector('html')?.classList.contains('drawer_open')).toBe(false);
    });
  });


});
