import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LoadingBar from '@app/components/LoadingBar.vue';

/**
 * LoadingBar 行為測試
 *
 * 這是一個「行為導向」測試的範本，只測試可觀察的行為：
 * 1. 條件渲染 - loading 控制是否顯示
 * 2. 動態更新 - props 變化時 UI 應該響應
 *
 * 不測試的內容：
 * - Props 是否存在（無意義）
 * - 預設值是否正確（只是記錄程式碼）
 * - CSS 變數格式（應該用視覺測試）
 */
describe('LoadingBar 行為測試', () => {
  let wrapper;

  beforeEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('條件渲染', () => {
    it('loading=true 時應該渲染載入條', () => {
      wrapper = mount(LoadingBar, {
        props: {
          loading: true
        }
      });

      expect(wrapper.find('.loading_bar').exists()).toBe(true);
    });

    it('loading=false 時不應該渲染載入條', () => {
      wrapper = mount(LoadingBar, {
        props: {
          loading: false
        }
      });

      expect(wrapper.find('.loading_bar').exists()).toBe(false);
    });

    it('未傳入 loading 時不應該渲染（預設 false）', () => {
      wrapper = mount(LoadingBar);

      expect(wrapper.find('.loading_bar').exists()).toBe(false);
    });
  });

  describe('動態更新', () => {
    it('loading 從 false 變為 true 時應該顯示載入條', async () => {
      wrapper = mount(LoadingBar, {
        props: {
          loading: false
        }
      });

      expect(wrapper.find('.loading_bar').exists()).toBe(false);

      await wrapper.setProps({
        loading: true
      });

      expect(wrapper.find('.loading_bar').exists()).toBe(true);
    });

    it('loading 從 true 變為 false 時應該隱藏載入條', async () => {
      wrapper = mount(LoadingBar, {
        props: {
          loading: true
        }
      });

      expect(wrapper.find('.loading_bar').exists()).toBe(true);

      await wrapper.setProps({
        loading: false
      });

      expect(wrapper.find('.loading_bar').exists()).toBe(false);
    });
  });
});
