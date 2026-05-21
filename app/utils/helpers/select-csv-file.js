/**
 * wait user select csv file
 * @param {function({data: string[][], colsCount: number, rowsCount: number}): boolean} onSelect
 * @returns {Promise<boolean>}
 */
export function handleSelectCSVFile(onSelect) {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (typeof file !== 'object' || file === null) return;
      
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        if (typeof text !== 'string' || text === '') return;

        // tip: use npm package to parse csv
        const rows = text.split(/\r\n|\n/);
        const data = rows.map(line => line.split(','));

        const colsCount = data.reduce((max, row) => Math.max(max, row.length), 0);

        const result = onSelect({
          data,
          colsCount,
          rowsCount: data.length,
        });

        resolve(result);
      };
      reader.readAsText(file);
    };
  });
}

export default handleSelectCSVFile;
