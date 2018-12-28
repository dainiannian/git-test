$(function () {
    //线条颜色Map
    var linkStyleMap = {
        "0":"#f8ff32",
        "1": "#00f5f9",
        "2": "#ff0000",
    };
    console.log(json1);
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('graph'));
    myChart.showLoading();
    // $.get('json/test1.json', function (data) {
        var data = json1;
		var data = data;
        $('#closeAll').click(function (e) { //图例全部关闭
            var selected = new Object;
            for (i = 0; i < data.categories.length; i++) {
                selected[data.categories[i].name] = false;
            }
            var legend = [{
                selected: selected
            }, {
                selected: selected
            }];
            var option = {
                legend: legend
            }
            myChart.setOption(option); //重新设置图例的关闭
        });
        $('#openAll').click(function (e) { //图例全部显示
            var selected = new Object;
            for (i = 0; i < data.categories.length; i++) {
                selected[data.categories[i].name] = true;
            }
            var legend = [
                {
                    selected: selected
                },
                {
                    selected: selected
                }
            ];
            var option = {
                legend: legend
            }
            myChart.setOption(option); //重新设置图例的显示
        });
        myChart.hideLoading();
        option = {
            tooltip : {
                trigger:'item',
                formatter:function (params){//鼠标滑过链接线和节点的tooltip提示
                    if(params.data.linkInterface == 1){
                        return params.data.startName + "-->"  + params.data.endName + "<br />"  +"状态：联通" + "<br />"  + "方式：" + params.data.linkStyle
                    }else if(params.data.linkInterface == 2){
                        return params.data.startName + "-->"  + params.data.endName + "<br />"  +"状态：断开" + "<br />"  + "方式：" + params.data.linkStyle
                    }else if(params.data.linkInterface == 0){
                        return params.data.startName + "-->"  + params.data.endName + "<br />"  + "状态：未知" + "<br />"  + "方式：" + params.data.linkStyle
                    }else if(params.data.mark == 1){

                    }else if(params.data.mark == 0){
                        return  params.data.name + "<br />"+ "编号：" + params.data.number +
                            "<br />" + "厂商型号：" + params.data.modelNumber+
                            "<br />" + "属性：" + params.data.nature +
                            "<br />" + "建设主体：" + params.data.construction +
                            "<br />" + "点位数量：" + params.data.count +
                            "<br />" + "联系人：" + params.data.contacts +
                            "<br />" + "联系方式：" + params.data.contactWay
                    }
                },
                textStyle:{
                    color:"#fff",
                    fontSize:14
                }
            },
            grid: {
                left: 200,
                right: 200,
                top: 200,
                bottom: 200
            },
            legend: [
                { //图例分成两类，以两列显示
                    orient: 'vertical',
                    left: '20',
                    top: '100px',
                    itemWidth: 20,
                    itemHeight: 20,
                    padding: [0, 0, 125, 0],
                    data: data.categories,
                    textStyle:{
                        color:"#deffff",
                        fontSize: 16
                    }
                },
                // {
                //     orient: 'vertical',
                //     left: '150',
                //     top: 'bottom',
                //     itemWidth: 20,
                //     itemHeight: 20,
                //     padding: [0, 0, 125, 0],
                //     data: data.categories.slice(17, 33),
                //     textStyle:{
                //         color:"#fff",
                //         fontSize: 20
                //     }
                // }
            ],
            series: [{
                type: 'graph',
                symbol:"pin",
                layout: 'force',
                animation: true,
                roam: true,
                legendHoverLink:true,
                focusNodeAdjacency: true,

                hoverAnimation: true,
                label: {
                    normal: {
                        position: 'right',
                        formatter: '{b}',
                        textStyle:{
                            color:"#deffff",
                            fontSize: 16
                        }
                    }
                },
                edgeSymbolSize:[5,2],
                draggable: true,
                data: data.nodes.map(function (node) {
                    var root = node.root;
                    if (root == 0) { //root 0:根节点，默认显示名称       root 1：下辖节点,hover显示名称
                        node.label = {
                            "normal": {
                                "show": true
                            }
                        }
                    }
                    return node;
                }),
                categories: data.categories,//分类
                force: {
                    edgeLength: 100,
                    repulsion:200,
                    gravity: 0.1
                },
                edges: data.links.map(function (link) { //线条及线条颜色
                    console.log('link..',link);
                    var linkStyle = link.linkStyle;
                    link.lineStyle = {
                        "normal": {
                            "color": linkStyleMap[linkStyle],
                            "curveness" : 0,
                            "width": 3,
                        },
                        "emphasis":{
                            "width": 5,
                        },
                    }
                    return {
                        source : link.source,
                        target : link.target,
                        attribute : link.value,
                        lineStyle:{
                            "normal": {
                                "color": linkStyleMap[linkStyle],
                                "curveness" : 0,
                                "width": 3,
                            },
                            "emphasis":{
                                "width": 5,
                            },
                        }
                    };
                    return link;
                })
            }]
        };
        myChart.setOption(option);

    // });
});