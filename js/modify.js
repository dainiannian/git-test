$.get('json/test.json', function (data) {
    var data = data;
    for (i = 0; i < data.nodes.length; i++) {
        var id = data.nodes[i].id.split('.')[1];
        if (id == 1) {
            data.nodes[i].root = 0;
        } else {
            data.nodes[i].root = 1;
        }
    }
    console.log(JSON.stringify(data));
});