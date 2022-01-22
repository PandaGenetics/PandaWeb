    var tracks = [];
    var trackset = {"Genes": {
    name: "Genes",
    displayMode: "EXPANDED",
    order: 1,
    url: "//storage.googleapis.com/elegansvariation.org/browser_tracks/elegans_gene.WS276.bed.gz",
    indexed: false,
    searchable: false,
    color: "#5c5cd6",
    height: 65
},
    "Transcripts": {
    name: "Transcripts",
    url: "//storage.googleapis.com/elegansvariation.org/browser_tracks/elegans_transcripts_WS276.bed.gz",
    indexed: true,
    order: 2,
    color: "#a366ff",
    displayMode: "SQUISHED",
    searchable: false
},

    AB1 : {
    name: "AB1",
    url: "//storage.googleapis.com/elegansvariation.org/releases/20210121/strain/vcf/AB1.20210121.vcf.gz",
    indexURL: "//storage.googleapis.com/elegansvariation.org/releases/20210121/strain/vcf/AB1.20210121.vcf.gz.tbi",
    order: 100,
    displayMode: "EXPANDED",
    color: "#ffffff",
    homvarColor: "#0066ff",
    homrefColor: "#c2c2d6",
    visibilityWindow: 20000,
    searchable: false
},
    AB1_bam : {
    id: "AB1_bam",
    name: "AB1_bam",
    url: "//storage.googleapis.com/elegansvariation.org/bam/AB1.bam",
    indexURL: "//storage.googleapis.com/elegansvariation.org/bam/AB1.bam.bai",
    order: 100,
    visibilityWindow: 20000,
    searchable: false
},

    BRC20067 : {
    name: "BRC20067",
    url: "//storage.googleapis.com/elegansvariation.org/releases/20210121/strain/vcf/BRC20067.20210121.vcf.gz",
    indexURL: "//storage.googleapis.com/elegansvariation.org/releases/20210121/strain/vcf/BRC20067.20210121.vcf.gz.tbi",
    order: 100,
    displayMode: "EXPANDED",
    color: "#ffffff",
    homvarColor: "#0066ff",
    homrefColor: "#c2c2d6",
    visibilityWindow: 20000,
    searchable: false
},
    BRC20067_bam : {
    id: "BRC20067_bam",
    name: "BRC20067_bam",
    url: "//storage.googleapis.com/elegansvariation.org/bam/BRC20067.bam",
    indexURL: "//storage.googleapis.com/elegansvariation.org/bam/BRC20067.bam.bai",
    order: 100,
    visibilityWindow: 20000,
    searchable: false
},

    "phastCons": {
    name: "phastCons",
    url: "//storage.googleapis.com/elegansvariation.org/browser_tracks/elegans.phastcons.bw",
    order: 6,
    displayMode: "SQUISHED",
    color: "#000000",
    visibilityWindow: 20000
},
    "phyloP": {
    name: "phyloP",
    url: "//storage.googleapis.com/elegansvariation.org/browser_tracks/elegans.phylop.bw",
    order: 6,
    displayMode: "SQUISHED",
    color: "#000000",
    visibilityWindow: 20000
},
    "Transposons": {
    name: "Transposons",
    url: "//storage.googleapis.com/elegansvariation.org/browser_tracks/laricchia2017.tes_cendr.bed.gz",
    order: 6,
    displayMode: "EXPANDED",
    color: "#34CB80",
    visibilityWindow: 20000000
},
    "Divergent Regions Summary": {
    name: "Divergent Regions Summary",
    url: "//storage.googleapis.com/elegansvariation.org/browser_tracks/lee2020.divergent_regions_all.bed.gz",
    order: 6,
    height: 40,
    displayMode: "EXPANDED",
    color: "#CB3466",
    visibilityWindow: 20000000
},
    "Divergent Regions": {
    name: "Divergent Regions",
    url: "//storage.googleapis.com/elegansvariation.org/browser_tracks/lee2020.divergent_regions_strain.bed.gz",
    order: 6,
    height: 200,
    displayMode: "EXPANDED",
    color: "#9B4763",
    visibilityWindow: 20000000
},
    "Dust": {
    name: "Dust",
    url: "//storage.googleapis.com/elegansvariation.org/browser_tracks/c_elegans.PRJNA13758.WS276.dust.bed.gz",
    order: 6,
    displayMode: "SQUISHED",
    color: "#583E1A",
    visibilityWindow: 20000000
},
    "Repeat Masker": {
    name: "Repeat Masker",
    url: "//storage.googleapis.com/elegansvariation.org/browser_tracks/c_elegans.PRJNA13758.WS276.repeat_masker.bed.gz",
    order: 6,
    displayMode: "SQUISHED",
    color: "#CB8C34",
    visibilityWindow: 20000000
}
};

    function reload_tracks() {
    $('.track-select').each(function(i, obj) {
        const track_name = $(this).attr("value");
        if ($(this).prop("checked") === true){
            if (!tracks.includes(track_name)) {
                tracks.push(track_name);
                igv.getBrowser().loadTrack(trackset[track_name]);
            }
        } else {
            igv.getBrowser().removeTrackByName(track_name);
            i = tracks.indexOf(track_name);
            while(i !== -1) {
                tracks.splice(i, 1);
                i = tracks.indexOf(track_name);
            }
        }
    });
}

    $(document).ready(function () {
    var div = $("#browser")[0],
    options = {
    search: {
    url: "/api/browser/search/$FEATURE$",
    coords: 1,
    resultsField: 'result'
},
    showNavigation: true,
    showKaryo: false,
    reference: {
    id: "WS276",
    fastaURL: "//storage.googleapis.com/elegansvariation.org/browser_tracks/c_elegans.PRJNA13758.WS276.genomic.fa",
},
    locus: "III:11746923-11750250",
    tracks: [],
};
    var browser = igv.createBrowser(div, options)
    .then(function(browser) {
    /*
          Bind browser events
        */
    browser.on('trackdragend', function(reference_frame, label) {
});

    // Detect track changes
    $(".track-select").on("change", function() {
    reload_tracks();
});

});


    function process_gene_search() {
    $("#loading-search-table").fadeOut();
    var gene = $('#gene-search').val();
    if (gene.length == 0) {
    $("#g-search-table").fadeOut();
} else {
    $("#orthologs").html("");
    $.ajax({
    url: "/api/gene/browser-search/" + gene,
    method: "GET",
    contentType: 'application/xml',
}).done(function(msg) {
    row = Array();
    $.each(msg, function(i,row) {
    if ("chrom" in row) {
    link = row["chrom"] + ":" + row["start"] + "-" + row["end"];
} else {
    link = row["locus"];
}
    gene_name = `<a onclick="set_position('${link}')" link='${link}' class='ortholink'>${row["locus"]}</a>`;
    homolog_species = row["homolog_species"] || "<em>C. elegans</em>";
    homolog_source = row["homolog_source"] || "Wormbase";
    result = [gene_name, row['homolog_gene'] || row["gene_symbol"], homolog_species, row["homolog_source"] || "Wormbase"]  ;
    result = "<tr><td>" + result.join("</td><td>") + "</td></tr>";
    position = row["chrom"] + ":" + row["start"];
    $("#orthologs").append(result);
});
    $("#g-search-table").fadeIn();
});
}
}

// Make links work!
    $(".container-fluid").on("click", ".ortholink", function() {
    igv.getBrowser().search($(this).attr("link"))
});


    function gt_label(gt) {
    // Generates a genotype label
    r = ""
    classes = [];
    classes.push(`gt-${gt["GT"]}`);
    FT = gt["FT"].split(";").join(" ");
    classes.push(FT);
    tt = "";
    if (gt['FT'] != ['PASS']) {
    tt = ` data-placement='bottom' title='${FT}' `;
}
    r += `<div class='label ttop ${classes.join(" ")}' ${tt} >`;
    r += gt["SAMPLE"] + " : " + gt["TGT"];
    r += "</div>";
    return r
}

    function draw_gt_set(genotype_set, genotype_val) {
    return genotype_set.filter(function(gt) { return gt['GT'] == genotype_val })
    .map( gt_label )
    .join(" ");

}


    var typingTimer;                //timer identifier
    var doneTypingInterval = 1000;  //time in ms (5 seconds)

// Ortholog search
    $("#gene-search").on("input", function(e) {
    $("#loading-search-table").fadeIn();
    clearTimeout(typingTimer);
    typingTimer = setTimeout(process_gene_search, doneTypingInterval);
})


// Initial load
    setTimeout(reload_tracks, 500);

});

    set_position = function(coord) {
    // Sets browser position based on input
    igv.getBrowser().search(coord);
}

    $(document).ready(function() {

    (function($) {
        var patterns = [];
        $('#filter').keyup(function() {
            $('.searchable tr').hide();
            $(this).val().split(',').forEach(function(r) {
                var rex = new RegExp(r, "i");
                $('.searchable tr').filter(function() {
                    return rex.test($(this).text());
                }).show();
            })
        })

    }(jQuery));


    $('#filter').keydown(function(event) {
    if (event.keyCode == 13) {
    event.preventDefault();
    return false;
}
});

});