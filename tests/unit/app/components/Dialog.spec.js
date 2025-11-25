import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Dialog from '~/app/components/Dialog.vue';

// Mock Vue Router
vi.mock('vue-router', () => ({
  onBeforeRouteLeave: vi.fn()
}));

describe('Dialog.vue', () => {
  let wrapper;

  beforeEach(() => {
    // 清理 DOM
    document.querySelector('html')?.classList.remove('dialog_open');
  });

  describe('基本渲染', () => {
    it('當 modelValue 為 false 時不應該渲染對話框', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: false
        }
      });

      expect(wrapper.find('.dialog_root-dialog').exists()).toBe(false);
    });

    it('當 modelValue 為 true 時應該渲染對話框', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true
        }
      });

      expect(wrapper.find('.dialog_root-dialog').exists()).toBe(true);
    });

    it('應該顯示標題', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true,
          title: '測試標題'
        }
      });

      expect(wrapper.text()).toContain('測試標題');
    });

    it('應該顯示內容', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true,
          content: '測試內容'
        }
      });

      expect(wrapper.text()).toContain('測試內容');
    });
  });

  describe('Props', () => {
    it('應該使用預設的確認按鈕文字', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true
        }
      });

      expect(wrapper.text()).toContain('確定');
    });

    it('應該使用預設的取消按鈕文字', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true
        }
      });

      expect(wrapper.text()).toContain('取消');
    });

    it('應該使用自訂的確認按鈕文字', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true,
          confirmLabel: '提交'
        }
      });

      expect(wrapper.text()).toContain('提交');
    });

    it('應該使用自訂的取消按鈕文字', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true,
          cancelLabel: '關閉'
        }
      });

      expect(wrapper.text()).toContain('關閉');
    });

    it('應該禁用確認按鈕', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true,
          confirmDisabled: true
        },
        global: {
          stubs: {
            'v-btn': {
              template: '<button :disabled="disabled"><slot /></button>',
              props: ['disabled']
            }
          }
        }
      });

      const confirmButton = wrapper.findAll('button').find(btn =>
        btn.text().includes('確定')
      );
      expect(confirmButton?.attributes('disabled')).toBeDefined();
    });
  });

  describe('事件處理', () => {

    it('點擊遮罩應該觸發 cancel 事件', async () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true
        },
        global: {
          stubs: {
            'v-btn': {
              template: '<button><slot /></button>'
            }
          }
        }
      });

      const mask = wrapper.find('.dialog_root-dialog');
      await mask.trigger('click');

      expect(wrapper.emitted('cancel')).toBeTruthy();
    });
  });

  describe('動畫', () => {
    it('hasAnimation 為 true 時應該有動畫 class', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true,
          hasAnimation: true
        }
      });

      expect(wrapper.find('.dialog_root-dialog_animation_transition').exists()).toBe(true);
      expect(wrapper.find('.dialog_root-dialog-center_animation').exists()).toBe(true);
    });

    it('hasAnimation 為 false 時不應該有動畫 class', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true,
          hasAnimation: false
        }
      });

      expect(wrapper.find('.dialog_root-dialog_animation_transition').exists()).toBe(false);
      expect(wrapper.find('.dialog_root-dialog-center_animation').exists()).toBe(false);
    });
  });

  describe('CSS 變數', () => {
    it('應該設定寬度 CSS 變數（數字）', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true,
          width: 500
        }
      });

      const rootElement = wrapper.find('.dialog_root');
      expect(rootElement.exists()).toBe(true);
      // 檢查 vm 的 cssVariable computed property
      expect(wrapper.vm.cssVariable).toHaveProperty('--dialog_width', '500px');
    });

    it('應該設定寬度 CSS 變數（字串）', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true,
          width: '80%'
        }
      });

      expect(wrapper.vm.cssVariable).toHaveProperty('--dialog_width', '80%');
    });

    it('應該設定高度 CSS 變數', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true,
          height: 400
        }
      });

      expect(wrapper.vm.cssVariable).toHaveProperty('--dialog_height', '400px');
    });

    it('應該設定 z-index CSS 變數', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true,
          zIndex: 999
        }
      });

      expect(wrapper.vm.cssVariable).toHaveProperty('--dialog_z_index', 999);
    });

    it('應該設定 position CSS 變數', () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: true,
          position: 'absolute'
        }
      });

      expect(wrapper.vm.cssVariable).toHaveProperty('--dialog_position', 'absolute');
    });
  });

  describe('插槽', () => {
    it('應該支援預設插槽', () => {
      wrapper = mount(Dialog, {
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
  });

  describe('HTML class 管理', () => {
    it('開啟對話框時應該添加 dialog_open class 到 html', async () => {
      wrapper = mount(Dialog, {
        props: {
          modelValue: false
        }
      });

      await wrapper.setProps({ modelValue: true });
      await wrapper.vm.$nextTick();

      expect(document.querySelector('html')?.classList.contains('dialog_open')).toBe(true);
    });
  });


});
