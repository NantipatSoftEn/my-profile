const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'test-note.md');
const pubDatetime = new Date('2022-09-23T15:22:00Z').toISOString();
const modDatetime = new Date().toISOString();

fs.readFile(filePath, 'utf8', (err: any, data: string) => {
  if (err) {
    console.error(err);
    return;
  }

  const updatedData = data
    .replace(/pubDatetime: .*/, `pubDatetime: ${pubDatetime}`)
    .replace(/modDatetime: .*/, `modDatetime: ${modDatetime}`);

  fs.writeFile(filePath, updatedData, 'utf8', (err: any) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Metadata updated successfully.');
  });
});