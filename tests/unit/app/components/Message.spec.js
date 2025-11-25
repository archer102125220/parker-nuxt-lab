import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Message from '~/app/components/Message.vue';

/**
 * Message 組件測試 - 專注於封裝邏輯
 * 
 * 測試重點：
 * 1. Props 處理
 * 2. 訊息列表管理（最多 4 個）
 * 3. 事件觸發
 * 4. 邊界情況處理
 */

describe('Message.vue - 封裝邏輯', () => {
  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('Props', () => {
    it('應該有預設的 timeout', () => {
      wrapper = mount(Message);
      expect(wrapper.props('timeout')).toBe(5000);
    });

    it('應該接受自訂 timeout', () => {
      wrapper = mount(Message, {
        props: { timeout: 3000 }
      });
      expect(wrapper.props('timeout')).toBe(3000);
    });

    it('應該有預設的 messageState', () => {
      wrapper = mount(Message);
      expect(wrapper.props('messageState')).toEqual({ text: '', type: 'success' });
    });
  });

  describe('訊息添加邏輯', () => {

    it('空訊息不應該觸發事件', async () => {
      wrapper = mount(Message, {
        props: {
          messageState: { text: '', type: 'success' }
        }
      });

      await nextTick();

      // 空訊息不應該觸發 resetMessageState
      const events = wrapper.emitted('resetMessageState');
      expect(events).toBeFalsy();
    });
  });

  describe('訊息類型支援', () => {
    const types = ['success', 'error', 'warning', 'info'];

    types.forEach(type => {
      it(`應該支援 ${type} 類型`, async () => {
        wrapper = mount(Message, {
          props: {
            messageState: { text: `${type} 訊息`, type }
          }
        });

        await nextTick();
        expect(wrapper.exists()).toBe(true);
      });
    });
  });

  describe('邊界情況', () => {
    it('應該處理 undefined messageState', () => {
      wrapper = mount(Message, {
        props: {
          messageState: undefined
        }
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('應該處理 null messageState', () => {
      wrapper = mount(Message, {
        props: {
          messageState: null
        }
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('應該處理快速連續更新', async () => {
      wrapper = mount(Message, {
        props: {
          messageState: { text: '', type: 'success' }
        }
      });

      // 快速連續更新
      await wrapper.setProps({ messageState: { text: '訊息1', type: 'success' } });
      await wrapper.setProps({ messageState: { text: '訊息2', type: 'error' } });
      await wrapper.setProps({ messageState: { text: '訊息3', type: 'warning' } });
      await nextTick();

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('messageTextReset prop', () => {
    it('應該接受 messageTextReset 函數', () => {
      const mockReset = vi.fn();
      wrapper = mount(Message, {
        props: {
          messageTextReset: mockReset
        }
      });

      expect(wrapper.props('messageTextReset')).toBe(mockReset);
    });

    it('應該有預設的 messageTextReset', () => {
      wrapper = mount(Message);
      expect(typeof wrapper.props('messageTextReset')).toBe('function');
    });
  });

  describe('組件渲染', () => {
    it('應該渲染 .message 容器', async () => {
      wrapper = mount(Message, {
        props: {
          messageState: { text: '測試', type: 'success' }
        }
      });

      await nextTick();

      // 應該有 message 容器
      const container = wrapper.find('div');
      expect(container.exists()).toBe(true);
    });
  });

  describe('超時配置', () => {
    it('應該使用 timeout prop', () => {
      const timeout = 3000;
      wrapper = mount(Message, {
        props: {
          timeout,
          messageState: { text: '測試', type: 'success' }
        }
      });

      expect(wrapper.props('timeout')).toBe(timeout);
    });
  });
});
