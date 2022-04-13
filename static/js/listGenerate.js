window.onload = function (){
    let url = "gene/data.json"
    let request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);

    request.onload = function () {
        let targetHTML;
        if (request.status == 200){
            targetHTML = "";
            var json = JSON.parse(request.responseText);
            for(var i=0;i<json.length;i++){
                console.log(json[i],url);
                targetHTML +=
                    "<tr>" +
                    "<td>" + json[i].url + "</td>" +
                    "<td><label>" +
                    "<input type='checkbox' className='track-select isotype-item sample-track' value='" + json[i].url+ "'/>VCF" +
                    "</label></td>"+
                    "<td><label>" +
                    "<input type='checkbox' className='track-select isotype-item sample-track' value='" + json[i].url+ "'/>BAM" +
                    "</label></td>"+
                    "</tr>"
            }
            console.log(json);
        }
        document.getElementById("genetic").innerHTML = targetHTML;
    }
}

function appendHTML(List) {
    for (let j = 0; j < List.length; j++) {
        let svp = List[j];
        //generate html format and transmit to geneBrowser@v2.html
        let html1 =
            '<tr>' +
                '<td>' + svp.url + '</td>' +
                '<td><label>' +
                '<input type="checkbox" className="track-select isotype-item sample-track" value="' + svp.url + '">VCF' +
                '</label></td>' +
                '<td><label>' +
                '<input type="checkbox" className="track-select isotype-item sample-track" value="' + svp.url + '">BAM' +
                '</label></td>' +
            '</tr>';

        $(".content").append(html1)
    }
}
