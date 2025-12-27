import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SkeletonLoader from '@app/components/SkeletonLoader.vue';

/**
 * SkeletonLoader 行為測試
 *
 * 核心行為：
 * 1. loading=true → 顯示骨架屏
 * 2. loading=false → 顯示插槽內容
 */
describe('SkeletonLoader 行為測試', () => {
  let wrapper;

  beforeEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('條件渲染', () => {
    it('loading=true 時顯示骨架屏，隱藏內容', () => {
      wrapper = mount(SkeletonLoader, {
        props: {
          loading: true
        },
        slots: {
          default: '<div class="content">實際內容</div>'
        }
      });

      expect(wrapper.find('.skeleton_loader-loading').exists()).toBe(true);
      expect(wrapper.find('.content').exists()).toBe(false);
    });

    it('loading=false 時隱藏骨架屏，顯示內容', () => {
      wrapper = mount(SkeletonLoader, {
        props: {
          loading: false
        },
        slots: {
          default: '<div class="content">實際內容</div>'
        }
      });

      expect(wrapper.find('.skeleton_loader-loading').exists()).toBe(false);
      expect(wrapper.find('.content').exists()).toBe(true);
    });
  });

  describe('動態切換', () => {
    it('loading 改變時應該正確切換顯示狀態', async () => {
      wrapper = mount(SkeletonLoader, {
        props: {
          loading: true
        },
        slots: {
          default: '<div class="content">內容</div>'
        }
      });

      // 初始狀態：顯示骨架屏
      expect(wrapper.find('.skeleton_loader-loading').exists()).toBe(true);
      expect(wrapper.find('.content').exists()).toBe(false);

      // 載入完成：顯示內容
      await wrapper.setProps({
        loading: false
      });
      expect(wrapper.find('.skeleton_loader-loading').exists()).toBe(false);
      expect(wrapper.find('.content').exists()).toBe(true);
    });
  });
});
