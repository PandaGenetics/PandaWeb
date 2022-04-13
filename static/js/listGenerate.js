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
        }
        document.getElementById("genetic").innerHTML = targetHTML;
    }
}