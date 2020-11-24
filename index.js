const googleSpreadsheet = require("google-spreadsheet");
const creds = require("./showdeerocks.json");
const doc = new googleSpreadsheet("1ZWi7UHEsg05_Ko435jRyaCuw0Gm1PHjwFxn80Czx9Fs");

doc.useServiceAccountAuth(creds, function(err) {
    doc.getRows(
        1,
        {
            "offset": 1,
            "limit": 5
        },
        function(err, rows) {
            for(var num = 0; rows.length > num; num++) {
                console.log(rows[num].ARTIST + " " + rows[num].SITE + " " + rows[num].TIME);
            }
        }
    );
});