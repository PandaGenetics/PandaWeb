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
           $("#genetic").html(targetHTML);
            const element = document.getElementsByClassName("track-select")
            for(let i=0;i<element.length;i++) {
                element[i].addEventListener("click", function () {
                    alert("haha")
                    igv.browser.loadTrack(
                        {
                            type: 'alignment',
                            format: 'bam',
                            url:'https://1000genomes.s3.amazonaws.com/phase3/data/HG02450/alignment/HG02450.mapped.ILLUMINA.bwa.ACB.low_coverage.20120522.bam',
                            indexURL:'https://1000genomes.s3.amazonaws.com/phase3/data/HG02450/alignment/HG02450.mapped.ILLUMINA.bwa.ACB.low_coverage.20120522.bam.bai',
                            name: 'HG02450'
                        })
                })
            }
        }
    })
})


