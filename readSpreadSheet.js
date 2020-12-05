const googleSpreadsheet = require("google-spreadsheet");
const creds = require("./showdeerocks.json");
const doc = new googleSpreadsheet("1dXdVti2bwIlsh8T5OeZEHPj7qz9RgIlPysP7iR2HoPk");

var br_flag = 0;

function printDate(row, num)
{
    if(row[num].date) {
        br_flag = 0;
        if(num != 0)
            process.stdout.write("<br>");
        process.stdout.write("<div class=\"Date\">");
        for(var i = 0; ; i++) {
            if(row[num].date[i] == "(") {
                if(row[num].date[i+1] == "토")
                    process.stdout.write("<span class=\"Blue\">(토)" + "</span>");
                else if(row[num].date[i+1] == "일")
                    process.stdout.write("<span class=\"Red\">(일)" + "</span>");
                else
                    process.stdout.write(row[num].date[i] + row[num].date[i+1] + row[num].date[i+2]);
                break;
            }
            process.stdout.write(row[num].date[i]);
        }
        console.log("</div>");
        if((row[num].artist).length > 0)
            console.log("<br>");
    }
}


function printArtist(row, num)
{
    process.stdout.write("<span class=\"Artist\">");
    if((row[num].artist).length > 0)
        process.stdout.write(row[num].artist + " - ");
    console.log("</span>");
}


function printSite(row, num)
{
    process.stdout.write("<span class=\"Site\">");
    process.stdout.write(row[num].site + " ");
    console.log("</span>");
}


function printTime(row, num)
{
    process.stdout.write("<span class=\"Time\">");
    process.stdout.write(row[num].time + " ");
    console.log("</span>");
}


function printEntryType(row, num)
{
    console.log("<span class=\"Link\">");
    /* Design1 */
    if(row[num].entrytype == "[예매 링크]")
        console.log("    <a href=\"" + row[num].ticketlink + "\" target=\"_blank\" class=\"Design1-1\">" + row[num].entrytype + "</a>");
    /* Design2 */
    else if(row[num].entrytype == "[예매 정보 링크]")
        console.log("    <a href=\"" + row[num].ticketlink + "\" target=\"_blank\" class=\"Design2-1\">" + row[num].entrytype + "</a>");
    /* Design3 */
    else if(row[num].entrytype == "[현장 예매]")
        console.log("    <a href=\"" + row[num].ticketlink + "\" target=\"_blank\" class=\"Design3-1\">" + row[num].entrytype + "</a>");
    /* Design4 */
    else if(row[num].entrytype == "[무료 입장]")
        console.log("    <a href=\"" + row[num].ticketlink + "\" target=\"_blank\" class=\"Design4-1\">" + row[num].entrytype + "</a>");
    else if(row[num].entrytype == "[무료 사전 신청]")
        console.log("    <a href=\"" + row[num].ticketlink + "\" target=\"_blank\" class=\"Design4-2\">" + row[num].entrytype + "</a>");
    /* Design5 */
    else if(row[num].entrytype == "[무료입장 자율페이]")
        console.log("    <a href=\"" + row[num].ticketlink + "\" target=\"_blank\" class=\"Design5-1\">" + row[num].entrytype + "</a>");
    /* Design6 */
    else if(row[num].entrytype == "[온라인 실시간 스트림]")
        console.log("    <a href=\"" + row[num].ticketlink + "\" target=\"_blank\" class=\"Design6-1\">" + row[num].entrytype + "</a>");
    else if(row[num].entrytype == "[유튜브 실시간 스트림]")
        console.log("    <a href=\"" + row[num].ticketlink + "\" target=\"_blank\" class=\"Design6-2\">" + row[num].entrytype + "</a>");
    else if(row[num].entrytype == "[인스타 라이브]")
        console.log("    <a href=\"" + row[num].ticketlink + "\" target=\"_blank\" class=\"Design6-3\">" + row[num].entrytype + "</a>");
    else if(row[num].entrytype == "[트위치 실시간 스트림]")
        console.log("    <a href=\"" + row[num].ticketlink + "\" target=\"_blank\" class=\"Design6-4\">" + row[num].entrytype + "</a>");
    /* Design7 */
    else if(row[num].entrytype == "[추후 공지]")
        console.log("    <a href=\"" + row[num].ticketlink + "\" target=\"_blank\" class=\"Design7-1\">" + row[num].entrytype + "</a>");
    /* Design8 */
    else if(row[num].entrytype == "[공연 취소]")
        console.log("    <span class=\"Design8-1\">" + row[num].entrytype + "</span>");
    /* Design9 */
    else if(row[num].entrytype == "[버스킹]")
        console.log("    <a href=\"" + row[num].ticketlink + "\" target=\"_blank\" class=\"Design9-1\">" + row[num].entrytype + "</a>");
    /* Design10 */
    else if(row[num].entrytype == "[공연 연기]")
        console.log("    <a href=\"" + row[num].ticketlink + "\" target=\"_blank\" class=\"Design10-1\">" + row[num].entrytype + "</a>");
    console.log("</span>");
}


doc.useServiceAccountAuth(creds, function(err)
{
    doc.getRows
    (
        1,
        function(err, rows) {
            for(var num = 0; rows.length > num; num++) {
                printDate(rows, num);
                if(rows[num].new) {
                    console.log("<div class=\"LineNew\">");
                    printArtist(rows, num);
                    printSite(rows, num);
                    printTime(rows, num);
                    printEntryType(rows, num);
                    console.log("</div>");
                    br_flag++;
                }
                else {
                    console.log("<div class=\"Line\">");
                    printArtist(rows, num);
                    printSite(rows, num);
                    printTime(rows, num);
                    printEntryType(rows, num);
                    console.log("</div>");
                    br_flag++;
                }
                if(br_flag == 5)
                    console.log("<br>");
            } console.log("<br><br><br><br>");
        }
    );
});