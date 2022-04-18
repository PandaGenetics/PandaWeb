//Track function is used to determine the file type and return the track to igv-content.js

function Track(hhhh){
    let targetTrack
    if (hhhh.type == "bam") {
        targetTrack = BamTrackSet(hhhh)
    }
    else if (hhhh.type == "vcf") {
        targetTrack = VCFTrackSet(hhhh)
    }
    return targetTrack
}

//BamTrackSet is a function for loading bam track
function BamTrackSet(track) {
    let BAMTrack = {
        type: "alignment",
        format: "bam",
        name: track.name,
        url: track.url,
        indexURL: track.url + ".bai",
        sort: {
            chr: "chr1",
            position: 155155358,
            option: "BASE",
            direction: "ASC"
        }
    }
    return BAMTrack
}

//VCFTrackSet is a function for loading vcf track
function VCFTrackSet(track) {
    let VCFTrack = {
        type: "variant",
        format: "vcf",
        url: "https://s3.amazonaws.com/1000genomes/release/20130502/ALL.chr22.phase3_shapeit2_mvncall_integrated_v5a.20130502.genotypes.vcf.gz",
        indexURL: "https://s3.amazonaws.com/1000genomes/release/20130502/ALL.chr22.phase3_shapeit2_mvncall_integrated_v5a.20130502.genotypes.vcf.gz.tbi",
        name: track.name,
        squishedCallHeight: 1,
        expandedCallHeight: 4,
        displayMode: "squished",
        visibilityWindow: 1000
    }
    return VCFTrack
}

function reload_tracks() {
    alert("yes")
    $('.track-select').each(function(i, obj) {
        const track_name = $(this).attr("value");
        if ($(this).prop("checked") == true){
            if (!tracks.includes(track_name)) {
                tracks.push(track_name);
                igv.getBrowser().loadTrack(trackset[track_name]);
            }
        } else {
            igv.getBrowser().removeTrackByName(track_name);
            i = tracks.indexOf(track_name);
            while(i != -1) {
                tracks.splice(i, 1);
                i = tracks.indexOf(track_name);
            }
        }
    });
}