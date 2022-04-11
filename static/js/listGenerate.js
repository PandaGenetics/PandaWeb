// List generate
function setDiv(){
    for (let j = 0; j < List.length; j++) {
        let svp = List[j];
        //generate html format and transmit to geneBrowser@v2.html
        let html1 =
            "<tr>"+
                "<td>" + svp.url + "</td>" +
                "<td><label>" +
                    "<input type='checkbox' className='track-select isotype-item sample-track' value="+ svp.url + ">VCF" +
                "</label></td>" +
                "<td><label>" +
                    "<input type='checkbox' className='track-select isotype-item sample-track' value="+ svp.url + ">BAM" +
                "</label></td>" +
            "</tr>";
        $("#content").append(html1);
    }
    return html1
}

function addData(){
    let List = $.ajax({
        url: "gene/data.json",
        type: "GET",
        dataType: "json",
        async: false,
    })
    document.getElementById("DataList").innerHTML = setDiv()
    console.log("OKKKKK")
}
