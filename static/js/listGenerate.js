$(function(){
    let request = $.ajax({
        type: "GET",
        url: "gene/data.json",
        dataType: "json",
        success: function (){
            let targetHTML;
            if (request.status == 200){
                targetHTML = "";
                let json = JSON.parse(request.responseText);
                for(let i=0;i<json.length;i++){
                    targetHTML +=
                        "<tr>" +
                        "<td>" + json[i].url + "</td>" +
                        "<td><label>" +
                        "<input type='checkbox' class='track-select isotype-item sample-track' value='" + json[i].url + "'/>VCF" +
                        "</label></td>"+
                        "<td><label>" +
                        "<input type='checkbox' class='track-select sample-track-alignment' value='" + json[i].url + "'/>BAM" +
                        "</label></td>"+
                        "</tr>"
                }
            }
           return($("#genetic").html(targetHTML));
        }
    })

    window.onload = function(){
        const element = document.getElementsByClassName("track-select")
        for(let i=0;i<element.length;i++)
            element[i].addEventListener("click",function (){
                alert("haha")
            })
    }
})


