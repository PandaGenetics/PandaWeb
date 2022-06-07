$(function () {
    let request = $.ajax({
        type: "GET",
        url: "gene/gff3.json",
        dataType: "json",
        success: function () {
            let targetHTML;
            if (request.status === 200) {
                targetHTML = "";
                const json = JSON.parse(request.responseText);
                for (let i = 0; i < json.length; i++) {
                    targetHTML +=
                        "<tr>" +
                        "<td><a onclick='position(" + json[i].Seqid + "," + json[i].Start + "," + json[i].End + ")'>" + json[i].Name + "</a></td>"+
                        "</tr>"
                }
            }
            $("#gene-list").html(targetHTML);
            // $("#gene-list tr").hide();
        }

    })
})

function position(chrom, start, end){
    igv.browser.search("chr" + chrom + ":" + start + "-" + end)
}

$(function () {
    $("#geneSearch").keyup(function () {
        $("#gene-list tr").hide();
        $(this).val().split(",").forEach(function(r) {
            var rex = new RegExp(r, "i");
            if(document.getElementById('geneSearch').value == ''){
                $("#gene-list tr").hide();
            }else{
                $("#gene-list tr").filter(function(){
                    return rex.test($(this).text());
                }).show();
            }
        });
    })
})


