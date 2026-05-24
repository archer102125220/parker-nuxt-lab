// https://mozilla.github.io/pdf.js/
// Migrated from pdfjs-dist v2.5.207 → v5.7.284
//
// Breaking changes in v5.x:
//  - `pdfjs-dist/lib/**` paths are removed; use `build/pdf.mjs` & `web/pdf_viewer.mjs`
//  - `PDFViewerApplication` / `DefaultExternalServices` / `AppOptions` singletons
//    are no longer exported from the COMPONENTS build of pdf_viewer.mjs
//  - Localisation is now handled by Project Fluent via `GenericL10n` (exported from
//    pdf_viewer.mjs); the custom webL10n implementation is no longer needed
//  - `DownloadManager` constructor no longer accepts `disableCreateObjectURL`
//  - Worker setup only requires `GlobalWorkerOptions.workerSrc`

import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf.mjs';
import {
  EventBus,
  PDFViewer,
  PDFLinkService,
  PDFFindController,
  PDFScriptingManager,
  PDFHistory,
  DownloadManager,
  GenericL10n,
} from 'pdfjs-dist/web/pdf_viewer.mjs';

// ---------------------------------------------------------------------------
// Worker source
// Resolve to the bundled worker so it works without CDN dependency.
// If you need a specific CDN version, replace with:
//   'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.7.284/pdf.worker.min.mjs'
// ---------------------------------------------------------------------------
const WORKER_SRC = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).href;

GlobalWorkerOptions.workerSrc = WORKER_SRC;

// ---------------------------------------------------------------------------
// PdfReaderApp
// A thin wrapper that wires up the PDF.js v5 components in a way that
// matches the usage pattern previously provided by PDFViewerApplication.
//
// Usage (inside a Vue component / onMounted):
//
//   import pdfReader from '@/utils/third-party/pdf-reader';
//
//   const app = pdfReader.createApp({
//     container:   document.getElementById('viewerContainer'),
//     viewer:      document.getElementById('viewer'),
//     eventBus,            // optional – one will be created if omitted
//     locale:      'zh-TW',
//   });
//
//   await app.open({ url: '/path/to/file.pdf' });
//   // or
//   await app.open({ data: uint8ArrayOrArrayBuffer });
//
// ---------------------------------------------------------------------------

/**
 * @param {object}      opts
 * @param {HTMLElement} opts.container     - The scrollable container (#viewerContainer)
 * @param {HTMLElement} opts.viewer        - The inner div that holds pages (.pdfViewer)
 * @param {EventBus}   [opts.eventBus]    - Shared EventBus; created internally if omitted
 * @param {string}     [opts.locale]      - BCP-47 language tag, e.g. 'zh-TW' (default: browser lang)
 */
function createApp({
  container,
  viewer,
  eventBus: externalEventBus = null,
  locale = navigator.language || 'zh-TW',
} = {}) {
  if (!(container instanceof HTMLElement) || !(viewer instanceof HTMLElement)) {
    throw new Error(
      'pdfReader.createApp: `container` and `viewer` must be HTMLElements.'
    );
  }

  // --- EventBus -----------------------------------------------------------
  const eventBus = externalEventBus instanceof EventBus
    ? externalEventBus
    : new EventBus();

  // --- Localisation -------------------------------------------------------
  const l10n = new GenericL10n(locale);

  // --- Download manager ---------------------------------------------------
  const downloadManager = new DownloadManager();

  // --- Link service -------------------------------------------------------
  const linkService = new PDFLinkService({ eventBus });

  // --- Find controller ----------------------------------------------------
  const findController = new PDFFindController({
    eventBus,
    linkService,
  });

  // --- Scripting manager --------------------------------------------------
  // Pass `null` factory to disable scripting; replace with a real factory
  // if you need interactive PDF JS support.
  const scriptingManager = new PDFScriptingManager({
    eventBus,
    sandboxBundleSrc: null,
  });

  // --- PDF Viewer ---------------------------------------------------------
  const pdfViewer = new PDFViewer({
    container,
    viewer,
    eventBus,
    linkService,
    findController,
    scriptingManager,
    l10n,
    downloadManager,
  });

  linkService.setViewer(pdfViewer);
  scriptingManager.setViewer(pdfViewer);

  // --- History ------------------------------------------------------------
  const pdfHistory = new PDFHistory({ eventBus, linkService });
  linkService.setHistory(pdfHistory);

  // -------------------------------------------------------------------------
  // open() – load a PDF document into the viewer
  // -------------------------------------------------------------------------
  /**
   * @param {object}           source
   * @param {string}          [source.url]           - Remote URL
   * @param {ArrayBuffer|Uint8Array} [source.data]   - Raw PDF bytes
   * @param {string}          [source.password]      - Password for protected PDFs
   * @param {object}          [source.httpHeaders]   - Extra HTTP headers
   * @param {boolean}         [source.withCredentials]
   */
  async function open(source) {
    const { getDocument } = await import('pdfjs-dist/build/pdf.mjs');

    if (pdfViewer.pdfDocument !== null) {
      await close();
    }

    const loadingTask = getDocument(source);
    const pdfDocument = await loadingTask.promise;

    pdfViewer.setDocument(pdfDocument);
    linkService.setDocument(pdfDocument, null);
    pdfHistory.initialize({ fingerprint: pdfDocument.fingerprints[0] });

    return pdfDocument;
  }

  // -------------------------------------------------------------------------
  // close() – destroy the current document
  // -------------------------------------------------------------------------
  async function close() {
    const pdfDocument = pdfViewer.pdfDocument;
    if (!pdfDocument) {
      return;
    }
    pdfViewer.setDocument(null);
    linkService.setDocument(null, null);
    if (typeof pdfDocument.destroy === 'function') {
      await pdfDocument.destroy();
    }
  }

  // -------------------------------------------------------------------------
  // Public interface
  // -------------------------------------------------------------------------
  return {
    eventBus,
    pdfViewer,
    pdfHistory,
    linkService,
    findController,
    scriptingManager,
    downloadManager,
    l10n,
    open,
    close,
  };
}

export default {
  createApp,
  // Re-export commonly used classes so consumers don't need to import
  // directly from pdfjs-dist
  EventBus,
  PDFViewer,
  PDFLinkService,
  PDFFindController,
  PDFScriptingManager,
  PDFHistory,
  DownloadManager,
  GenericL10n,
  GlobalWorkerOptions,
};
