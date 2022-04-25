// generate list
$(function(){
    let request = $.ajax({
        type: "GET",
        url: "gene/data.json",
        dataType: "json",
        success: function (){
            let targetHTML;
            if (request.status == 200){
                targetHTML = "";
                var json = JSON.parse(request.responseText);
                for(let i=0;i<json.length;i++){
                    targetHTML +=
                        "<tr>" +
                        "<td>" + json[i].url + "</td>" +
                        "<td><label>" +
                        "<input type='checkbox' class='track-select isotype-item sample-track' value='" + json[i].url + "' onclick='loadingVCF(this.value)'/>VCF" +
                        "</label></td>"+
                        "<td><label>" +
                        "<input type='checkbox' class='track-select sample-track-alignment'  value='" + json[i].url + "' onclick='loadingBAM(this.value)'/>BAM" +
                        "</label></td>"+
                        "</tr>"
                }
            }
           $("#genetic").html(targetHTML);
        }
    })
})


//load track
const ipAddress = "http://192.168.38.70:8081/gene/v2"

function loadingBAM(x){
    console.log(x);
        igv.browser.loadTrack({
            type: 'alignment',
            format: 'bam',
            url: ipAddress + '/alignment/' + x + '.bam',
            indexURL: ipAddress + '/alignment/' + x + '.bam.bai',
            // name:
            sort: {
                chr: "chr1",
                position: 155155358,
                option: "BASE",
                direction: "ASC"
            }
        })
}

function loadingVCF(x) {
    console.log(x);
    igv.browser.loadTrack({
        type: "variant",
        format: "vcf",
        url: ipAddress + '/variant/' + x + '.vcf.gz',
        indexURL: ipAddress + '/variant/' + x + '.vcf.gz.csi' ,
        // name: "1KG variants (chr22)",
        squishedCallHeight: 1,
        expandedCallHeight: 4,
        displayMode: "squished",
        visibilityWindow: 1000,
    })
}

