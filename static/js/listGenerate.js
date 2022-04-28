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
                        "<td>" + json[i].name + "</td>" +
                        "<td><label>" +
                        "<input type='checkbox' class='track-select isotype-item sample-track' name='" + json[i].name + "_vcf' value='" + json[i].url + "' onclick='judgeVCF(this.value, this.name)'/>VCF" +
                        "</label></td>"+
                        "<td><label>" +
                        "<input type='checkbox' class='track-select sample-track-alignment' name='" + json[i].name + "_bam' value='" + json[i].url + "' onclick='judgeBAM(this.value, this.name)'/>BAM" +
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

function judgeBAM(value,name){
    let judegement = $("input[name=" + name + "]").prop("checked");
    judegement ? loadingBAM(value,name) : igv.browser.removeTrackByName(name); 
}

function judgeVCF(value,name){
    let judegement = $("input[name=" + name + "]").prop("checked");
    judegement ? loadingVCF(value,name) : igv.browser.removeTrackByName(name); 
}

function loadingBAM(x,name){
    console.log(x);
    igv.browser.loadTrack({
        type: 'alignment',
        format: 'bam',
        name: name,
        url: ipAddress + '/alignment/' + x + '.bam',
        indexURL: ipAddress + '/alignment/' + x + '.bam.bai',
        sort: {
            chr: "chr1",
            position: 155155358,
            option: "BASE",
            direction: "ASC"
        }
    })
}

function loadingVCF(x,name) {
    console.log(x);
    igv.browser.loadTrack({
        type: "variant",
        format: "vcf",
        name: name,
        url: ipAddress + '/variant/' + x + '.vcf.gz',
        indexURL: ipAddress + '/variant/' + x + '.vcf.gz.csi' ,
        // name: "1KG variants (chr22)",
        squishedCallHeight: 1,
        expandedCallHeight: 4,
        displayMode: "squished",
        visibilityWindow: 1000,
    })
}