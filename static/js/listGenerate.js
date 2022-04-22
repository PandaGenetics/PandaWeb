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
                console.log(json)
                for(let i=0;i<json.length;i++){
                    targetHTML +=
                        "<tr>" +
                        "<td>" + json[i].url + "</td>" +
                        "<td><label>" +
                        "<input type='checkbox' class='track-select isotype-item sample-track' value='" + json[i].url + "' onclick='loadingVCF(this.value)'/>VCF" +
                        "</label></td>"+
                        "<td><label>" +
                        "<input type='checkbox' class='track-select sample-track-alignment' value='" + json[i].url + "' onclick='loadingBAM(this.value)'/>BAM" +
                        "</label></td>"+
                        "</tr>"
                }
            }
           $("#genetic").html(targetHTML);
            // const element = document.getElementsByClassName("track-select")
            // for(let i=0;i<element.length;i++) {
            //     element[i].addEventListener("click", function () {
            //         igv.browser.loadTrack(
            //             {
            //                 type: 'alignment',
            //                 format: 'bam',
            //                 url:'https://1000genomes.s3.amazonaws.com/phase3/data/HG02450/alignment/HG02450.mapped.ILLUMINA.bwa.ACB.low_coverage.20120522.bam',
            //                 indexURL:'https://1000genomes.s3.amazonaws.com/phase3/data/HG02450/alignment/HG02450.mapped.ILLUMINA.bwa.ACB.low_coverage.20120522.bam.bai',
            //                 name: 'HG02450'
            //             })
            //     })
            // }
        }
    })
})

const ipAddress = "http://192.168.38.70:8081/gene/v2/alignment/"

function loadingBAM(x){
    console.log(x);
        igv.browser.loadTrack({
            type: 'alignment',
            format: 'bam',
            url: ipAddress + x,
            indexURL: ipAddress + x + '.bai',
            // url:'https://1000genomes.s3.amazonaws.com/phase3/data/HG02450/alignment/HG02450.mapped.ILLUMINA.bwa.ACB.low_coverage.20120522.bam',
            // indexURL:'https://1000genomes.s3.amazonaws.com/phase3/data/HG02450/alignment/HG02450.mapped.ILLUMINA.bwa.ACB.low_coverage.20120522.bam.bai',
        })
}

function loadingVCF(x){
    console.log(x);
}

