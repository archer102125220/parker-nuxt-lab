# AI Face Swap Feature - Task Checklist

## Overview

將現有的 `face-swap.vue` 頁面重構為資料夾結構，提供導航頁面讓使用者選擇不同實作版本。目前已完成基礎實作，正在進行深度優化以實現專業級換臉效果。

---

## Tasks

### Planning ✅

- [x] Examine current `face-swap.vue` file structure
- [x] Research existing composables and components
- [x] Research face swap techniques with face-api.js
- [x] Create implementation plan
- [x] Research advanced face swap solutions (InsightFace, ONNX Runtime)
- [x] Design optimization plan with InsightFace InSwapper

---

### Phase 1: Folder Structure Conversion ✅

- [x] Rename `face-swap.vue` → `face-swap/frontend.vue`
- [x] Create `face-swap/index.vue` (navigation page)
- [x] Create `face-swap/backend.vue` (placeholder)

---

### Phase 2: Frontend Version ✅

- [x] Update `frontend.vue` with face swap layout
  - [x] Source face upload section
  - [x] Target face (video/image) section
  - [x] Result preview section
  - [x] Swap control buttons
- [x] Implement face swap core functionality
- [x] Update styling for better UX

---

### Phase 3: Backend Version (Basic Implementation) ✅

- [x] Placeholder page with coming soon notice
- [x] Plan Node.js backend integration
  - [x] Research AI technologies (InsightFace, Roop)
  - [x] Design architecture options
  - [x] User selects preferred approach (TensorFlow.js + face-api.js)
- [x] Implement backend API
  - [x] Create `server/utils/face-swap.js`
  - [x] Create `server/api/face-swap/process.post.js`
- [x] Update frontend to use backend API
  - [x] Update `backend.vue` with full UI

---

### Phase 4: Backend Deep Optimization (In Progress) 🚀

#### Phase 4.1: Environment Setup

- [ ] Install `onnxruntime-node` and `sharp`
- [ ] Download InsightFace model files
  - [ ] Download buffalo_l models (det_10g, w600k_r50, 2d106det)
  - [ ] Download inswapper_128.onnx model
- [ ] Create model directory structure `public/ai_models/insightface/`
- [ ] Test model loading

#### Phase 4.2: Core Implementation

- [ ] Create `server/utils/face-swap-insightface.js`
  - [ ] Implement model loading and management
  - [ ] Implement face detection and analysis (buffalo_l)
  - [ ] Implement face embedding extraction
  - [ ] Implement InSwapper model inference
  - [ ] Integrate complete face swap pipeline

#### Phase 4.3: Post-Processing

- [ ] Implement color correction
- [ ] Implement edge feathering and blending
- [ ] Optimize output quality

#### Phase 4.4: Integration & Testing

- [ ] Update `server/api/face-swap/process.post.js` to use new implementation
- [ ] Mark `server/utils/face-swap.js` as deprecated (keep as backup)
- [ ] Add configuration options for switching between implementations

---

### Verification & Testing

- [x] Test navigation between pages
- [x] Test frontend face swap functionality
- [x] Manual browser testing
- [x] Test backend API functionality (basic implementation)
- [ ] Test InsightFace implementation
  - [ ] Test different skin tones
  - [ ] Test different lighting conditions (bright/dim/side-lit)
  - [ ] Test different angles (frontal/profile/45-degree)
  - [ ] Test different expressions (smile/serious/mouth-open)
  - [ ] Test different resolutions
- [ ] Performance testing
  - [ ] Measure processing time
  - [ ] Measure memory usage
  - [ ] Test concurrent requests
- [ ] Compare before/after optimization results
- [ ] Create walkthrough documentation

---

## Current Status

**Completed:**

- ✅ Phase 1-3: Basic face swap implementation with face-api.js
- ✅ Planning: Research and design for InsightFace optimization

**In Progress:**

- 🚀 Phase 4: InsightFace InSwapper integration

**Next Steps:**

1. Install required dependencies (`onnxruntime-node`, `sharp`)
2. Download InsightFace models (~750MB total)
3. Implement new face swap utility with ONNX Runtime
4. Test and compare with existing implementation

---

## Notes

> [!IMPORTANT]
> **Model File Sizes**
>
> - Total model size: ~750MB (InSwapper: 554MB, Buffalo_l: ~200MB)
> - Ensure sufficient server storage
> - Consider deployment platform limitations (Vercel may not be suitable)

> [!WARNING]
> **Licensing**
>
> - Verify InsightFace model licensing for commercial use
> - Add terms of service and disclaimers

> [!TIP]
> **Performance**
>
> - First model load will be slow (cold start)
> - Consider model caching strategies
> - Choose inswapper_128 (faster) vs inswapper_512 (higher quality)
