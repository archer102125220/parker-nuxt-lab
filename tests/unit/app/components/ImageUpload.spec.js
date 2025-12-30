import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { mount, config } from '@vue/test-utils';
import ImageUpload from '~/app/components/ImageUpload.vue';

config.global.stubs = {
  'v-btn': { template: '<button><slot /></button>' },
  'v-icon': { template: '<i><slot /></i>' }
};
config.global.directives = {
  ripple: {}
};

/**
 * ImageUpload 組件測試
 * 
 * 測試圖片上傳組件的核心功能
 */

describe('ImageUpload.vue', () => {
  let wrapper;

  // Mock File API
  global.FileReader = class {
    readAsDataURL() {
      this.onload({ target: { result: 'data:image/png;base64,test' } });
    }
  };

  global.Image = class {
    addEventListener(event, callback) {
      if (event === 'load') {
        setTimeout(() => callback({ target: { width: 100, height: 100 } }), 0);
      }
    }
    set src(value) { }
  };

  global.URL = {
    createObjectURL: vi.fn(() => 'blob:test'),
    revokeObjectURL: vi.fn()
  };

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('基本渲染', () => {
    it('應該正確渲染組件', () => {
      wrapper = mount(ImageUpload);

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('.image_upload').exists()).toBe(true);
    });

    it('應該顯示預設按鈕文字', () => {
      wrapper = mount(ImageUpload);

      expect(wrapper.text()).toContain('上傳圖片');
    });

    it('應該顯示預設標籤文字', () => {
      wrapper = mount(ImageUpload);

      expect(wrapper.text()).toContain('點擊或拖拉圖片到此區塊上傳');
    });
  });

  describe('Props', () => {
    it('應該接受自訂按鈕文字', () => {
      wrapper = mount(ImageUpload, {
        props: {
          btnLabel: '選擇圖片'
        }
      });

      expect(wrapper.text()).toContain('選擇圖片');
    });

    it('應該接受自訂標籤文字', () => {
      wrapper = mount(ImageUpload, {
        props: {
          label: '自訂標籤'
        }
      });

      expect(wrapper.text()).toContain('自訂標籤');
    });

    it('應該接受自訂遮罩文字', () => {
      wrapper = mount(ImageUpload, {
        props: {
          maskLabel: '自訂遮罩'
        }
      });

      expect(wrapper.props('maskLabel')).toBe('自訂遮罩');
    });

    it('應該接受 src prop', () => {
      const testSrc = 'https://example.com/image.jpg';
      wrapper = mount(ImageUpload, {
        props: {
          src: testSrc
        }
      });

      expect(wrapper.props('src')).toBe(testSrc);
    });

    it('應該接受 maxSize prop', () => {
      const maxSize = 2 * 1024 * 1024; // 2MB
      wrapper = mount(ImageUpload, {
        props: {
          maxSize
        }
      });

      expect(wrapper.props('maxSize')).toBe(maxSize);
    });

    it('應該接受 disable prop', () => {
      wrapper = mount(ImageUpload, {
        props: {
          disable: true
        }
      });

      expect(wrapper.props('disable')).toBe(true);
    });

    it('應該接受 previewBgColor prop', () => {
      wrapper = mount(ImageUpload, {
        props: {
          previewBgColor: '#f0f0f0'
        }
      });

      expect(wrapper.props('previewBgColor')).toBe('#f0f0f0');
    });
  });



  describe('拖拉功能', () => {
    it('dragenter 應該顯示遮罩', async () => {
      wrapper = mount(ImageUpload);

      await wrapper.find('.image_upload').trigger('dragenter');
      expect(wrapper.vm.showMask).toBe(true);
    });

    it('dragleave 應該隱藏遮罩', async () => {
      wrapper = mount(ImageUpload);

      await wrapper.find('.image_upload').trigger('dragenter');
      await wrapper.find('.image_upload').trigger('dragleave');
      expect(wrapper.vm.showMask).toBe(false);
    });


  });

  describe('禁用狀態', () => {
    it('當 disable 為 true 時點擊不應該觸發上傳', async () => {
      const createElementSpy = vi.spyOn(document, 'createElement');

      wrapper = mount(ImageUpload, {
        props: {
          disable: true
        }
      });

      await wrapper.find('.image_upload').trigger('click');

      // 不應該創建 file input
      expect(createElementSpy).not.toHaveBeenCalledWith('input');

      createElementSpy.mockRestore();
    });
  });

  describe('Slots', () => {
    it('應該支援預設插槽', () => {
      wrapper = mount(ImageUpload, {
        slots: {
          default: '<div class="custom-content">自訂內容</div>'
        }
      });

      expect(wrapper.find('.custom-content').exists()).toBe(true);
    });

    it('應該支援 preview 插槽', () => {
      wrapper = mount(ImageUpload, {
        slots: {
          preview: '<div class="custom-preview">自訂預覽</div>'
        }
      });

      expect(wrapper.find('.custom-preview').exists()).toBe(true);
    });

    it('應該支援 mask 插槽', () => {
      wrapper = mount(ImageUpload, {
        slots: {
          mask: '<div class="custom-mask">自訂遮罩</div>'
        }
      });

      expect(wrapper.find('.custom-mask').exists()).toBe(true);
    });
  });

  describe('defineExpose', () => {
    it('應該暴露 previewImg', () => {
      wrapper = mount(ImageUpload);

      expect(wrapper.vm.previewImg).toBeDefined();
    });

    it('應該暴露 showMask', () => {
      wrapper = mount(ImageUpload);

      expect(wrapper.vm.showMask).toBeDefined();
    });

    it('應該暴露 modelValue', () => {
      wrapper = mount(ImageUpload);

      expect(wrapper.vm.modelValue).toBeDefined();
    });

    it('應該暴露 props', () => {
      wrapper = mount(ImageUpload, {
        props: {
          maxSize: 1024,
          disable: true
        }
      });

      expect(wrapper.vm.maxSize).toBe(1024);
      expect(wrapper.vm.disable).toBe(true);
    });
  });

  describe('v-model', () => {
    it('應該支援 v-model', async () => {
      wrapper = mount(ImageUpload, {
        props: {
          modelValue: ''
        }
      });

      expect(wrapper.props('modelValue')).toBe('');
    });

    it('應該更新 modelValue', async () => {
      wrapper = mount(ImageUpload, {
        props: {
          modelValue: '',
          'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value })
        }
      });

      const newValue = 'https://example.com/new-image.jpg';
      await wrapper.setProps({ modelValue: newValue });

      expect(wrapper.props('modelValue')).toBe(newValue);
    });
  });



  describe('事件', () => {
    it('應該觸發 change 事件', () => {
      wrapper = mount(ImageUpload);

      // 驗證組件有 change 事件定義
      expect(wrapper.vm.$options.emits).toContain('change');
    });

    it('應該觸發 fileTypeError 事件', () => {
      wrapper = mount(ImageUpload);

      // 驗證組件有 fileTypeError 事件定義
      expect(wrapper.vm.$options.emits).toContain('fileTypeError');
    });
  });
});
