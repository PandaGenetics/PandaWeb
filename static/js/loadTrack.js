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