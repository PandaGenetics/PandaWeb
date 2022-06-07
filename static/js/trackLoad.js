const ipAddress = "http://192.168.38.70:8081/gene/v2"

// Function judgeBAM is for determine whether the selected BAM Track have been loaded.
function judgeBAM(value, name) {
    // Judegement is used to obtain the status of the selected checkbox.
    let judegement = $("input[name=" + name + "]").prop("checked");
    // This is for determine to load Track or remove Track.
    judegement ? loadingBAM(value, name) : igv.browser.removeTrackByName(name);
}

// Function loadingBAM is for loading BAM Track.
function loadingBAM(x, name) {
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
function judgeVCF(value, name) {
    let judegement = $("input[name=" + name + "]").prop("checked");
    judegement ? loadingVCF(value, name) : igv.browser.removeTrackByName(name);
}

// Function loadingVCF is for loading VCF.
function loadingVCF(x, name) {
    igv.browser.loadTrack({
        type: "variant",
        format: "vcf",
        name: name,
        url: ipAddress + '/variant/' + x + '.vcf.gz',
        indexURL: ipAddress + '/variant/' + x + '.vcf.gz.csi',
    })
}

// Function judgeGff3 is for determine whether the gff3 file have been loaded.
function judgeGff3() {
    let judegement = $("#Genes").prop("checked");
    judegement ? loadingGff3() : igv.browser.removeTrackByName(Genes);
}

// Function loadGff3 is for loading gff3
function loadingGff3() {
    igv.browser.loadTrack({
        name: "Genes",
        format: "gff3",
        displayMode: "expanded",
        url: ipAddress + '/annotation/' + 'Ailuropoda_melanoleuca.ASM200744v2.105.sorted.gff3.gz',
        indexURL: ipAddress + '/annotation/' + 'Ailuropoda_melanoleuca.ASM200744v2.105.sorted.gff3.gz.tbi',
    })
}