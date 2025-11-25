import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SwitchButton from '@app/components/SwitchButton.vue';

describe('SwitchButton.vue', () => {
  let wrapper;

  beforeEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('基本渲染', () => {
    it('應該正確渲染組件', () => {
      wrapper = mount(SwitchButton, {
        props: {
          label: 'Test Label'
        }
      });

      expect(wrapper.find('.switch_button').exists()).toBe(true);
      expect(wrapper.find('.switch_button-check').exists()).toBe(true);
      expect(wrapper.find('.switch_button-label').exists()).toBe(true);
    });

    it('應該顯示標籤文字', () => {
      wrapper = mount(SwitchButton, {
        props: {
          label: 'My Switch'
        }
      });

      expect(wrapper.text()).toContain('My Switch');
    });

  });

  describe('v-model 雙向綁定', () => {
    it('應該支援 v-model', async () => {
      wrapper = mount(SwitchButton, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value })
        }
      });

      expect(wrapper.vm.modelValue).toBe(false);

      await wrapper.find('.switch_button-check').trigger('change');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([true]);
    });

    it('更新 modelValue 應該改變組件狀態', async () => {
      wrapper = mount(SwitchButton, {
        props: {
          modelValue: false
        }
      });

      expect(wrapper.vm.modelValue).toBe(false);

      await wrapper.setProps({ modelValue: true });

      expect(wrapper.vm.modelValue).toBe(true);
    });
  });

  describe('切換功能', () => {
    it('點擊應該觸發 change 事件', async () => {
      wrapper = mount(SwitchButton, {
        props: {
          modelValue: false
        }
      });

      await wrapper.find('.switch_button-check').trigger('change');

      expect(wrapper.emitted('change')).toBeTruthy();
      expect(wrapper.emitted('change')[0]).toEqual([true]);
    });

    it('從 false 切換到 true', async () => {
      wrapper = mount(SwitchButton, {
        props: {
          modelValue: false
        }
      });

      await wrapper.find('.switch_button-check').trigger('change');

      expect(wrapper.emitted('update:modelValue')[0]).toEqual([true]);
    });

    it('從 true 切換到 false', async () => {
      wrapper = mount(SwitchButton, {
        props: {
          modelValue: true
        }
      });

      await wrapper.find('.switch_button-check').trigger('change');

      expect(wrapper.emitted('update:modelValue')[0]).toEqual([false]);
    });
  });

  describe('禁用狀態', () => {
    it('disabled=true 時應該禁用 checkbox', () => {
      wrapper = mount(SwitchButton, {
        props: {
          disabled: true
        }
      });

      const checkbox = wrapper.find('.switch_button-check');
      expect(checkbox.attributes('disabled')).toBeDefined();
    });

    it('disabled=true 時應該設定 opacity CSS 變數', () => {
      wrapper = mount(SwitchButton, {
        props: {
          disabled: true
        }
      });

      expect(wrapper.vm.cssVariable.value['--switch_button_opacity']).toBe('0.3');
      expect(wrapper.vm.cssVariable.value['--switch_button_cursor']).toBe('not-allowed');
    });

    it('disabled=false 時應該允許操作', () => {
      wrapper = mount(SwitchButton, {
        props: {
          disabled: false
        }
      });

      const checkbox = wrapper.find('.switch_button-check');
      expect(checkbox.attributes('disabled')).toBeUndefined();
    });
  });

  describe('標籤切換', () => {
    it('應該顯示預設標籤', () => {
      wrapper = mount(SwitchButton, {
        props: {
          label: 'Default Label',
          modelValue: false
        }
      });

      expect(wrapper.vm.showLabel.value).toBe('Default Label');
    });

    it('checked 時應該顯示 checkedLabel', () => {
      wrapper = mount(SwitchButton, {
        props: {
          label: 'Off',
          checkedLabel: 'On',
          modelValue: true
        }
      });

      expect(wrapper.vm.showLabel.value).toBe('On');
    });

    it('unchecked 時應該顯示 label', () => {
      wrapper = mount(SwitchButton, {
        props: {
          label: 'Off',
          checkedLabel: 'On',
          modelValue: false
        }
      });

      expect(wrapper.vm.showLabel.value).toBe('Off');
    });

    it('沒有 checkedLabel 時應該始終顯示 label', () => {
      wrapper = mount(SwitchButton, {
        props: {
          label: 'Toggle',
          modelValue: true
        }
      });

      expect(wrapper.vm.showLabel.value).toBe('Toggle');
    });
  });

  describe('圖標切換', () => {
    it('應該顯示預設圖標', () => {
      wrapper = mount(SwitchButton, {
        props: {
          icon: '/icon-off.png',
          modelValue: false
        }
      });

      expect(wrapper.vm.showIcon.value).toBe(null);
    });

    it('checked 時應該顯示 checkedIcon', () => {
      wrapper = mount(SwitchButton, {
        props: {
          icon: '/icon-off.png',
          checkedIcon: '/icon-on.png',
          modelValue: true
        }
      });

      expect(wrapper.vm.showIcon.value).toBe('/icon-on.png');
    });

    it('unchecked 時應該顯示 icon', () => {
      wrapper = mount(SwitchButton, {
        props: {
          icon: '/icon-off.png',
          checkedIcon: '/icon-on.png',
          modelValue: false
        }
      });

      expect(wrapper.vm.showIcon.value).toBe('/icon-off.png');
    });
  });

  describe('自訂樣式', () => {
    it('應該支援自訂 color', () => {
      wrapper = mount(SwitchButton, {
        props: {
          color: '#ff0000'
        }
      });

      expect(wrapper.vm.cssVariable.value['--switch_button_color']).toBe('#ff0000');
    });

    it('應該支援自訂 bgColor', () => {
      wrapper = mount(SwitchButton, {
        props: {
          bgColor: '#00ff00'
        }
      });

      expect(wrapper.vm.cssVariable.value['--switch_button_bg_color']).toBe('#00ff00');
    });

    it('應該支援自訂 checkedColor', () => {
      wrapper = mount(SwitchButton, {
        props: {
          checkedColor: '#0000ff',
          modelValue: true
        }
      });

      expect(wrapper.vm.cssVariable.value['--switch_button_color']).toBe('#0000ff');
    });

    it('應該支援自訂 checkedBgColor', () => {
      wrapper = mount(SwitchButton, {
        props: {
          checkedBgColor: '#ffff00',
          modelValue: true
        }
      });

      expect(wrapper.vm.cssVariable.value['--switch_button_bg_color']).toBe('#ffff00');
    });

    it('應該支援自訂 radius', () => {
      wrapper = mount(SwitchButton, {
        props: {
          radius: '10px'
        }
      });

      expect(wrapper.vm.cssVariable.value['--switch_button_radius']).toBe('10px');
    });

    it('應該使用預設 radius', () => {
      wrapper = mount(SwitchButton);

      expect(wrapper.vm.cssVariable.value['--switch_button_radius']).toBe('999px');
    });
  });

  describe('CSS 變數', () => {
    it('unchecked 時圖標應該在右側', () => {
      wrapper = mount(SwitchButton, {
        props: {
          modelValue: false
        }
      });

      expect(wrapper.vm.cssVariable.value['--switch_button_icon_left']).toBe('calc(100% - 39px)');
    });

    it('checked 時圖標應該在左側', () => {
      wrapper = mount(SwitchButton, {
        props: {
          modelValue: true
        }
      });

      expect(wrapper.vm.cssVariable.value['--switch_button_icon_left']).toBe('8px');
    });

    it('應該根據狀態設定 label padding', () => {
      wrapper = mount(SwitchButton, {
        props: {
          modelValue: false
        }
      });

      expect(wrapper.vm.cssVariable.value).toHaveProperty('--switch_button_label_padding_right');
    });
  });

  describe('自訂插槽', () => {
    it('應該支援 icon 插槽', () => {
      wrapper = mount(SwitchButton, {
        props: {
          icon: '/test.png'
        },
        slots: {
          icon: '<div class="custom-icon">Custom Icon</div>'
        }
      });

      expect(wrapper.find('.custom-icon').exists()).toBe(true);
      expect(wrapper.find('.custom-icon').text()).toBe('Custom Icon');
    });

    it('應該支援 default 插槽自訂標籤', () => {
      wrapper = mount(SwitchButton, {
        props: {
          label: 'Test'
        },
        slots: {
          default: '<span class="custom-label">Custom Label</span>'
        }
      });

      expect(wrapper.find('.custom-label').exists()).toBe(true);
      expect(wrapper.find('.custom-label').text()).toBe('Custom Label');
    });
  });

  describe('邊界情況', () => {
    it('應該處理空 label', () => {
      wrapper = mount(SwitchButton, {
        props: {
          label: ''
        }
      });

      expect(wrapper.vm.showLabel.value).toBe('');
    });

    it('應該處理 null icon', () => {
      wrapper = mount(SwitchButton, {
        props: {
          icon: null
        }
      });

      expect(wrapper.vm.showIcon.value).toBe(null);
    });

    it('應該處理未定義的 modelValue', () => {
      wrapper = mount(SwitchButton);

      expect(wrapper.vm.modelValue).toBe(false);
    });
  });
});
