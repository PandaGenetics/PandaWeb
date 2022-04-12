<<<<<<< HEAD
window.onload = function (){
    var url = "gene/data.json"
    var request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null;)

    request.onload = function () {
        if (request.status == 200){
            var targethtml = "";
            var json = JSON.parse(request.responseText);
            for(var i=0;i<json.length;i++){
                console.log(json[i],url);
                targethtml +=  "<tr><td><input type='checkbox'/>"+ json[i].url +"</td></tr>"
            }
            console.log(json);
        }
        document.getElementById("genetic").innerHTML = targethtml;
    }
}


=======
// function haha(){
//     var List = (function (){
//         let List = null;
//         $.ajax({
//             "url": "gene/data.json",
//             "type": "GET",
//             "dataType": "json",
//             "async": false,
//             "sucess":function(data){
//                 List = data;
//                 console.log("data");
//             }
//         })
//         return List;
//     })();
// }

function setDiv(){
    let List = [];
    fetch("gene/data.json") //Asynchronous function
        .then( res => res.json() )
        .then( result => appendHTML(result) ); // callback
}

function appendHTML(List) {
    for (let j = 0; j < List.length; j++) {
        let svp = List[j];
        //generate html format and transmit to geneBrowser@v2.html
        let html1 =
            '<tr>' +
                '<td>' + svp.url + '</td>' +
                '<td><label>' +
                '<input type="checkbox" className="track-select isotype-item sample-track" value="' + svp.url + '">VCF' +
                '</label></td>' +
                '<td><label>' +
                '<input type="checkbox" className="track-select isotype-item sample-track" value="' + svp.url + '">BAM' +
                '</label></td>' +
            '</tr>';

        $(".content").append(html1)
    }
}
>>>>>>> 5e1647a99f6965831aeccc5bc057d9fb85a53580


// function setDiv(){
//     console.log("haha");
//     var List = (function (){
//         let List = null;
//         $.ajax({
//             "url": "gene/data.json",
//             "type": "GET",
//             "dataType": "json",
//             "async": false,
//             "sucess":function(data){
//                 List = data;
//                 console.log("data");
//             }
//         })
//         return List;
//     })();
//     for (let j = 0; j < List.length; j++) {
//         let svp = List[j];
//         //generate html format and transmit to geneBrowser@v2.html
//         let html1 =
//             '<tr>'+
//                 '<td>' + svp.url + '</td>' +
//                 '<td><label>' +
//                     '<input type="checkbox" className="track-select isotype-item sample-track" value="' + svp.url + '">VCF' +
//                 '</label></td>' +
//                 '<td><label>' +
//                     '<input type="checkbox" className="track-select isotype-item sample-track" value="' + svp.url + '">BAM' +
//                 '</label></td>' +
//             '</tr>'
//          $("#genetic").append(html1)
//     }
//
// }
//
