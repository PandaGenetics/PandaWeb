// ListGenerate.js file is for generate the bam and vcf list and loading the relative tracks
// This function is for get the data json file by AJAX, and generate list.
$(function () {
    let request = $.ajax({
        type: "GET",
        url: "gene/data.json",
        dataType: "json",
        success: function () {
            let targetHTML;
            if (request.status == 200) {
                targetHTML = "";
                const json = JSON.parse(request.responseText);
                for (let i = 0; i < json.length; i++) {
                    targetHTML +=
                        "<tr>" +
                        "<td>" + json[i].name + "</td>" +
                        "<td>" +
                        "<label>" +
                        "<input type='checkbox' class='track-select sample-track' name='" + json[i].name + "_vcf' value='" + json[i].url + "' onclick='judgeVCF(this.value, this.name)'/>VCF" +
                        "</label>" +
                        "</td>" +
                        "<td>" +
                        "<label>" +
                        "<input type='checkbox' class='track-select sample-track-alignment' name='" + json[i].name + "_bam' value='" + json[i].url + "' onclick='judgeBAM(this.value, this.name)'/>BAM" +
                        "</label>" +
                        "</td>" +
                        "</tr>"
                }
            }
            $("#ind-list").html(targetHTML);
        }
    })
})


// precisely search individual track
$(function () {
    $("#individualSearch").keyup(function () {
        $("#ind-list tr").hide();
        $(this).val().split(",").forEach(function(r) {
            var rex = new RegExp(r, "i");
            $("#ind-list tr").filter(function(){
                return rex.test($(this).text()); 
            }).show();
        });
    })
})
