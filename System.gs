var POST_URL = "WEBHOOK_URL"; //put your discord Webhook URL here

function onSubmit(_) {
    var allResponses = FormApp.getActiveForm().getResponses();
    var response = allResponses[allResponses.length - 1].getItemResponses();
    var items = [];

    for (var i = 0; i < response.length; i++) {
        var question = response[i].getItem().getTitle();
        var answer = response[i].getResponse();
        
        try {
            var parts = answer.match(/[\s\S]{1,1024}/g) || [];
        } catch (e) {
            var parts = answer;
        }

        if (answer == "") {
            continue;
        }
        for (var j = 0; j < parts.length; j++) {
            if (j == 0) {
                items.push({
                    "name":  "**" + (j == 0 ? question : question.concat(" (cont.)")) + "**" ,
                    "value": "\`\`\`▶️ | " + parts[j] + "\`\`\`",
                    "inline": false
                });
            }
        }
    }
//"\`\`\`" + + "\`\`\`"
    var options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": "‌ CONTENT HERE ", // put your Content here
            "embeds": [{
                "title": " TITLE HERE ", // Put your Title here
                   "color": 7506394,
                "fields": items,
                "footer": {
                    "text": "FOOTER HERE" //Put Footer here
               
                }
            }]
        })
    };

    UrlFetchApp.fetch(POST_URL, options);
};
