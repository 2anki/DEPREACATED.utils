const Papa = require('papaparse');
const fs = require('fs');

async function main() {
  const deleteQuery = (email) => `UPDATE users SET patreon = TRUE WHERE email='${email}';`
  const csvFilePath = fs.readFileSync("./Members_x.csv").toString();
  const emailColumnIndex = 1; 

  Papa.parse(csvFilePath, {
    header: true, 
    complete: function(results) {
      const emails = results.data.map(row => row[Object.keys(row)[emailColumnIndex]]).filter(Boolean);
      const deleteCommands = emails.map(e => deleteQuery(e));
      console.log(deleteCommands.join('\n')); 
    }
  });

}

main();
