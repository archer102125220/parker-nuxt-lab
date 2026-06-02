export const UniverInstanceType = {
  UNIVER_UNKNOWN: 0,
  UNIVER_DOC: 1,
  UNIVER_SHEET: 2,
  UNIVER_SLIDE: 3,
  UNIVER_PROJECT: 4,
  UNRECOGNIZED: -1
};

export function fetchUniverSnapshot(
  unitId = '',
  type = UniverInstanceType.UNIVER_UNKNOWN,
  tryLimit = 10,
  tryCount = 0
) {
  if (typeof window === 'undefined') return;

  return new Promise(async (resolve, rejects) => {
    const { UniverProExchangeClient = {} } = window;

    const {
      transformSnapshotJsonToDocumentData,
      transformSnapshotJsonToWorkbookData
    } = UniverProExchangeClient;

    if (
      typeof transformSnapshotJsonToDocumentData === 'undefined' ||
      typeof transformSnapshotJsonToWorkbookData === 'undefined'
    ) {
      if (tryCount < tryLimit) {
        return setTimeout(() => {
          resolve(fetchUniverSnapshot(unitId, type, tryLimit, tryCount + 1));
        }, 1000);
      }
      return rejects(new Error('Failed to load Univer dependencies'));
    }

    const host = import.meta.env.VITE_UNIVERSER_PROXY_PATH || '';
    const res = await fetch(
      `${host}/universer-api/snapshot/${type}/unit/${unitId}/rev/0`
    );
    const data = await res.json();

    if (!data || !data.snapshot) {
      return resolve(
        new Error('Invalid snapshot data: Missing snapshot block')
      );
    }

    if (type === UniverInstanceType.UNIVER_DOC) {
      if (!data.snapshot.doc) {
        return resolve(
          new Error('Invalid snapshot data: Missing snapshot block')
        );
      }
      const snapshot = transformSnapshotJsonToDocumentData(data);
      return resolve(snapshot);
    }

    if (type === UniverInstanceType.UNIVER_SHEET) {
      if (!data.snapshot.workbook) {
        return resolve(
          new Error('Invalid snapshot data: Missing snapshot block')
        );
      }
      const snapshot = transformSnapshotJsonToWorkbookData(data);
      return resolve(snapshot);
    }

    return resolve(new Error('Invalid snapshot data: Missing snapshot block'));
  });
}

export default fetchUniverSnapshot;
