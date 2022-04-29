// ListGenerate.js file is for generate the bam and vcf list and loading the relative tracks

// This function is for get the data json file by AJAX, and generate list.
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

//All below the note is for loading Track.
const ipAddress = "http://192.168.38.70:8081/gene/v2"

// Function judgeBAM is for determine whether the selected BAM Track have been loaded.
function judgeBAM(value,name){
    // Judegement is used to obtain the status of the selected checkbox.
    let judegement = $("input[name=" + name + "]").prop("checked");
    // This is for determine to load Track or remove Track.
    judegement ? loadingBAM(value,name) : igv.browser.removeTrackByName(name); 
}

// Function loadingBAM is for loading BAM Track.
function loadingBAM(x,name){
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

// Function judgeVCF is for determine whether the selected VCF Track have been loaded.
function judgeVCF(value,name){
    let judegement = $("input[name=" + name + "]").prop("checked");
    judegement ? loadingVCF(value,name) : igv.browser.removeTrackByName(name); 
}

// Function loadingVCF is for loading VCF.
function loadingVCF(x,name) {
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