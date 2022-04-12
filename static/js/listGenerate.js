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

