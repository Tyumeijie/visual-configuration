var App = window.App || {};

joint.dia.Element.define("custom.Member", {
    size: {
        // width: 180,
        width: 100,
        height: 70
    },
    attrs: {
        rect: {
            //width: 170,
            width: 90,
            height: 60
        },
        ".card": {
            fill: "#FFFFFF",
            stroke: "#000000",
            "stroke-width": 2,
            "pointer-events": "visiblePainted",
            rx: 5,
            ry: 5
        },
        // image: {
        //     width: 48,
        //     height: 48,
        //     ref: ".card",
        //     "ref-x": 10,
        //     "ref-y": 5
        // },
        ".rank": {
            "text-decoration": "underline",
            ref: ".card",
            "ref-x": .9,
            "ref-y": .2,
            "font-family": "Courier New",
            "font-size": 14,
            "text-anchor": "end"
        },
        ".name": {
            "font-weight": "800",
            ref: ".card",
            "ref-x": .9,
            "ref-y": .6,
            "font-family": "Courier New",
            "font-size": 14,
            "text-anchor": "end"
        }
    }
}, {
    markup: '<g class="rotatable"><g class="scalable"><rect class="card"/><image/></g><text class="rank"/><text class="name"/></g>'
});

joint.dia.Element.define("custom.Member_2", {
    size: {
        //width: 180,
        width: 100,
        height: 70
    },
    attrs: {
        rect: {
            //width: 170,
            width: 90,
            height: 60
        },
        ".card": {
            fill: "#FFFFFF",
            stroke: "#000000",
            "stroke-width": 2,
            "pointer-events": "visiblePainted",
            rx: 5,
            ry: 5
        },
        // image: {
        //     width: 48,
        //     height: 48,
        //     ref: ".card",
        //     "ref-x": 10,
        //     "ref-y": 5
        // },
        ".rank": {
            "text-decoration": "underline",
            ref: ".card",
            "ref-x": .9,
            "ref-y": .2,
            "font-family": "Courier New",
            "font-size": 14,
            "text-anchor": "end"
        },
        ".name": {
            "font-weight": "800",
            ref: ".card",
            "ref-x": .9,
            "ref-y": .6,
            "font-family": "Courier New",
            "font-size": 14,
            "text-anchor": "end"
        }
    }
}, {
    markup: '<g class="rotatable"><g class="scalable"><rect class="card"/><image/></g><text class="rank"/><text class="name"/></g>'
});

joint.dia.Link.define("custom.Arrow", {
    source: {
        selector: ".card"
    },
    target: {
        selector: ".card"
    },
    attrs: {
        ".connection": {
            stroke: "#585858",
            "stroke-width": 3
        }
    },
    z: -1
});

var tree = function (joint, V, _) {

    if (App.pattern.tree.hasCalled) {
        let cells = app.graph.getCells();
        let newCells = cells.splice(0, cells.length - 1);
        app.graph.resetCells(newCells);
        return;
    }

    var graph = this.graph;
    var paper = this.paper;
    var paperScroller = this.paperScroller;

    joint.setTheme('modern');

    /********************************************************
     * Custom-defined element
     *******************************************************/
    
    // Extend the Orgchart member markup with control buttons.
    joint.shapes.custom.Member.prototype.markup = [
        '<g class="rotatable">',
        '<g class="scalable">',
        '<rect class="card"/>',
        '</g>',
        '<text class="rank"/><text class="name"/>',
        '<g class="btn add"><circle class="add"/><text class="add">+</text></g>',
        '<g class="btn del"><circle class="del"/><text class="del">-</text></g>',
        '<g class="btn error"><circle class="error"/><text class="error-number"></text></g>',
        '</g>'
    ].join('');

    // joint.shapes.custom.Member_2.prototype.markup = [
    //     '<g class="rotatable">',
    //     '<g class="scalable">',
    //     '<rect class="card"/>',
    //     '</g>',
    //     '<text class="rank"/><text class="name"/>',
    //     '<g class="btn add"><circle class="add"/><text class="add">+</text></g>',
    //     '<g class="btn del"><circle class="del"/><text class="del">-</text></g>',
    //     //'<g class="btn edit"><rect class="edit"/><text class="edit">EDIT</text></g>',
    //     '<g class="btn error"><circle class="error"/><text class="error">8</text></g>',
    //     '</g>'
    // ].join('');

    // A helper to create a member model
    var member = function (rank, name, textColor) {

        textColor = textColor || "#000";

        var element = new joint.shapes.custom.Member({
            // 设置卡片的位置
            size: {width: 195, height: 80},
            attrs: {
                // '.card': {fill: background, 'stroke-width': 0},
                '.card': {fill: '#adbbb9', 'stroke-width': 2},
                //image: {'xlink:href': image, 'ref-y': 10, opacity: 0.7},
                // '.rank': {
                //     fill: textColor,
                //     text: '',
                //     'font-size': 13,
                //     'text-decoration': 'none',
                //     'ref-x': 0.95,
                //     'ref-y': 0.5,
                //     'y-alignment': 'middle',
                //     'word-spacing': '-1px',
                //     'letter-spacing': 0
                // },
                '.name': {fill: textColor, text: '', 'ref-x': 0.98, 'ref-y': 0.65, 'font-family': 'Arial', 'font-size': 14, 'text-align': 'left'},
                '.name1': {fill: textColor, text: '', 'ref-x': 0.98, 'ref-y': 0.65, 'font-family': 'Arial', 'font-size': 14, 'text-align': 'left'},
                // 调整 + - 的位置
                '.btn.add': {'ref-dx': -165, 'ref-y': 15, 'ref': '.card', event: 'element:add'},
                '.btn.del': {'ref-dx': -135, 'ref-y': 15, 'ref': '.card', event: 'element:delete'},
                '.btn.error': {'ref-dx': -2, 'ref-y': 5, 'ref': '.card', event: 'element:edit'},
                '.btn>circle': {r: 10, fill: 'transparent', stroke: '#333', 'stroke-width': 1.5},
                '.btn.error>circle': {r: 14, fill: '#ce9825', stroke: '#333', 'stroke-width': 1},
                '.btn>rect': {height: 20, width: 45, rx: 2, ry: 2, fill: 'transparent', 'stroke-width': 1},
                '.btn.add>text': {
                    fill: textColor,
                    'font-size': 23,
                    'font-weight': 800,
                    stroke: "#000",
                    x: -6.5,
                    y: 7,
                    'font-family': 'Times New Roman'
                },
                '.btn.del>text': {
                    fill: textColor,
                    'font-size': 28,
                    'font-weight': 500,
                    stroke: "#000",
                    x: -4.5,
                    y: 7,
                    'font-family': 'Times New Roman'
                },
                '.btn.error>text': {
                    fill: textColor,
                    'font-size': 15,
                    'font-weight': 500,
                    stroke: "#000",
                    x: -3,
                    y: 5,
                    'font-family': 'Sans Serif'
                }
            }
        }).on({
            'change:name': function (cell, name) {
                cell.attr('.name/text', joint.util.breakText(name, {width: 190, height: 45}, cell.attr('.name')));
            },
            // 'change:rank': function (cell, rank) {
            //     cell.attr('.rank/text', joint.util.breakText(rank, {width: 165, height: 45}, cell.attr('.rank')));
            // }
        }).set({
            name: name,
            //rank: rank
        });

        return element;
    };

    // A helper to create a member model
    // var member2 = function (rank, name, image, background, textColor) {

    //     textColor = textColor || "#000";

    //     var element = new joint.shapes.custom.Member_2({
    //         size: {width: 180, height: 80},
    //         attrs: {
    //             // '.card': {fill: background, 'stroke-width': 0},
    //             '.card': {fill: '#adbbb9', 'stroke-width': 2},
    //             //image: {'xlink:href': image, 'ref-y': 10, opacity: 0.7},
    //             '.rank': {
    //                 fill: textColor,
    //                 text: '',
    //                 'font-size': 13,
    //                 'text-decoration': 'none',
    //                 'ref-x': 0.95,
    //                 'ref-y': 0.5,
    //                 'y-alignment': 'middle',
    //                 'word-spacing': '-1px',
    //                 'letter-spacing': 0
    //             },
    //             '.name': {fill: textColor, text: '', 'ref-x': 0.95, 'ref-y': 0.75, 'font-family': 'Arial'},
    //             '.btn.add': {'ref-dx': -165, 'ref-y': 15, 'ref': '.card', event: 'element:add'},
    //             '.btn.del': {'ref-dx': -165, 'ref-y': 45, 'ref': '.card', event: 'element:delete'},
    //             '.btn.edit': {'ref-dx': -140, 'ref-y': 5, 'ref': '.card', event: 'element:edit'},
    //             '.btn>circle': {r: 10, fill: 'transparent', stroke: '#333', 'stroke-width': 1},
    //             '.btn>rect': {height: 20, width: 45, rx: 2, ry: 2, fill: 'transparent', 'stroke-width': 1},
    //             '.btn.add>text': {
    //                 fill: textColor,
    //                 'font-size': 23,
    //                 'font-weight': 800,
    //                 stroke: "#000",
    //                 x: -6.5,
    //                 y: 7,
    //                 'font-family': 'Times New Roman'
    //             },
    //             '.btn.del>text': {
    //                 fill: textColor,
    //                 'font-size': 28,
    //                 'font-weight': 500,
    //                 stroke: "#000",
    //                 x: -4.5,
    //                 y: 7,
    //                 'font-family': 'Times New Roman'
    //             },
    //             '.btn.edit>text': {
    //                 fill: textColor,
    //                 'font-size': 15,
    //                 'font-weight': 500,
    //                 stroke: "#000",
    //                 x: 5,
    //                 y: 15,
    //                 'font-family': 'Sans Serif'
    //             }
    //         }
    //     }).on({
    //         'change:name': function (cell, name) {
    //             cell.attr('.name/text', joint.util.breakText(name, {width: 160, height: 45}, cell.attr('.name')));
    //         },
    //         'change:rank': function (cell, rank) {
    //             cell.attr('.rank/text', joint.util.breakText(rank, {width: 165, height: 45}, cell.attr('.rank')));
    //         }
    //     }).set({
    //         name: name,
    //         //rank: rank
    //     });

    //     return element;
    // };

    // A helper to create an arrow connection
    function link(source, target) {
        return new joint.shapes.custom.Arrow({
            source: {id: source.id},
            target: {id: target.id}
        });
    }
    
    // 一个模型的数据
    var members = [
        member('', 'TelemetryManagement'),       //0
        member('', 'TelemetryManager'),          //1
        member('', 'TelemetryStream'),           //2
        member('', 'BasicPUSTmStream'),          //3
        member('', 'PUSTelemetryPackets'),       //4
        member('', 'PUSTelemetryModeManager'),   //5
        member('', 'PUSTelemetryPacket'),        //6
        member('', 'PUSTelemetryPacket'),        //7
        member('', 'PUSTelemetryPacket'),        //8
        member('', 'PUSTmLogger'),               //9
    ];
   
    var connections = [
        link(members[0], members[1]),
        link(members[0], members[4]),
        link(members[1], members[2]),
        link(members[2], members[3]),
        link(members[2], members[9]),
        link(members[4], members[5]),
        link(members[4], members[6]),
        link(members[4], members[7]),
        link(members[4], members[8]),
    ];

    var treeLayout = new joint.layout.TreeLayout({
        graph: graph,
        direction: 'B'
    });

    graph.resetCells(members.concat(connections));
    treeLayout.layout();
    this.paperScroller.zoom(-0.2);
    this.paperScroller.centerContent();

    
    memeberFactory = {
        member: function () {
            return member('Employee', 'PUSTelemetryPacket', 'assets/female.png', '#31d0c6');
        }
    }


    function addMember(elementView, option) {

        var newMember = memeberFactory[option]();
        var newConnection = link(elementView.model, newMember);
        App.guidToCell[newConnection.id] = newConnection;
        App.guidToCell[newMember.id] = newMember;

        graph.addCells([newMember, newConnection]);
        treeLayout.layout();
    }

    function hideErrorTips() {
        let bnts = Array.from(document.querySelectorAll('.paper-container  g.btn.error'));
        bnts.map(bnt => {
            let errorNumber = bnt.childNodes[1];
            if (Number(errorNumber.textContent) > 0) return;
            bnt.style.display = 'none';
        });
    }
    hideErrorTips();


    function generateErrorTips(tips){
        return `<select class="form-control">
                    <option value="member">BasicPUSTmStream, PUSTmLogger can't coexist </option>
                    <option value="member">Element2</option>
                </select><button class="auto-fix">AutoFix</button>`;
     }

    function showErrorTips(modelId, tips) {
        let model = document.getElementById(modelId);
        let btn = model.querySelector('.btn.error');
        btn.style.display = "";
        let numberArea = btn.childNodes[1];
        numberArea.textContent = tips.length;
        
        // construct tips
    }

    var container = $(".options-container");
    var cancelButton = document.getElementById("cancel-button");
    var applyButton = document.getElementById("apply-button");
    applyButton.allowedClick = undefined;

    applyButton.addEventListener("click", function(evt){
        var select = $(".options-container select");
        select.remove();
        container.attr("hidden", "true");

        addMember(applyButton.elementView, select.val());
        cancelButton.allowedClick = true;

        hideErrorTips();
    });

    cancelButton.addEventListener("click", function(evt){
        var select = $(".options-container select");
        select.remove();
        container.attr("hidden", "true");

        cancelButton.allowedClick = true;
    });

    // generate candidates
    function generateOptions(){
       return `<select class="form-control">
                   <option value="member">PUSTelemetryPacket</option>
                   <option value="member">PUSTelemetryPacket</option>
                   <option value="member">PUSTelemetryPacket</option>
                   <option value="member">PUSTelemetryPacket</option>
               </select>`;


    }
    paper.on('element:add', function (elementView, evt) {
        evt.stopPropagation();

        // when cancelButton.allowedClickAdd equals to 'undefined' or 'true', we should display options; otherwise
        // we just simply return
        if (cancelButton.allowedClick == false) return;
        cancelButton.allowedClick = false; // store extented attribute 'allowedClickAdd' into cancelButton

        // TODO check the need to pop up a dialog
        var htmlString =  generateOptions();
        container.prepend(htmlString);
        container.removeAttr("hidden");
        
        // store the elementView into applyButton for latter use
        applyButton.elementView = elementView;
    });

    function deleteElementAllChlidren(outLinkGUIDs) {
        for (var outLinkId in outLinkGUIDs) {
            var outLink = App.guidToCell[outLinkId];
            var elementId = outLink.attributes.target.id;

            // If the element has child, then recursively call deleteElementAllChlidren
            if (graph.out[elementId] != undefined && Object.keys(graph.out[elementId]).length != 0) {
                deleteElementAllChlidren(graph.out[elementId]);
            }

            // delete element and it's out link
            var element = App.guidToCell[elementId];
            var elementView = paper.findViewByModel(element);

            delete App.guidToCell[elementId];
            delete App.guidToCell[outLinkId];

            elementView.model.remove();
        }
    }

    paper.on('element:delete', function (elementView, evt, x, y) {
        evt.stopPropagation();

        if (cancelButton.allowedClick == false) return;

        let elementId = elementView.model.id;
        if (graph.out[elementId] != undefined && Object.keys(graph.out[elementId]).length != 0) {
            let option = confirm("Are you sure to delete all it's children!");

            if (option) {
                deleteElementAllChlidren(graph.out[elementId]);
                treeLayout.layout();
            }

            return;
        }

        // Remove element without child, if the element has parent, in link should also be deleted
        delete App.guidToCell[elementId];
        if (graph.in[elementId] != undefined) {
            let inLinkId = Object.keys(graph.in[elementId])[0];
            delete App.guidToCell[inLinkId];
        }

        elementView.model.remove();

        treeLayout.layout();
    });

    
    let previousClickedButton = null;
    paper.on('element:edit', function (elementView, evt, x, y) {
        evt.stopPropagation();

        if (cancelButton.allowedClick == false) return;
       
        var htmlString =  generateErrorTips();
        var container = $(".tips-container");
        container.empty();
        container.prepend(htmlString);
        window.container = container;
        container[0].style.top = (evt.clientY - 20) + "px";
        container[0].style.left = (evt.clientX + 20) + "px";

    
        // TODO jump another tap
        // Should check the type of the current element first, and maybe need to pass some states of the current tab
        // to the server side for return related UI
        //window.open("http://127.0.0.1:3000");
        /*
               var oldGraph = this.graph;
               var graph = new joint.dia.Graph;
               graph.on('add', function (cell, collection, opt) {
                   Collection.collection = collection;
               }, this);

                       var paper = this.paper = new joint.dia.Paper({
                           width: 1000,
                           height: 1000,
                           gridSize: 10,
                           drawGrid: true,
                           model: graph,
                           defaultLink: new joint.shapes.app.Link
                       });

                       paper.on('blank:mousewheel', _.partial(this.onMousewheel, null), this);
                       paper.on('cell:mousewheel', this.onMousewheel, this);
                       var members = [
                           member('Founder & Chairman', 'Pierre Omidyar', 'assets/male.png', '#31d0c6'),
                           member2('President & CEO', 'Margaret C. Whitman', 'assets/female.png', '#31d0c6'),
                           member('President, PayPal', 'Scott Thompson', 'assets/male.png', '#7c68fc'),
                           member2('President, Ebay Global Marketplaces', 'Devin Wenig', 'assets/male.png', '#7c68fc')
                       ];

                       var connections = [
                           link(members[0], members[1]),
                           link(members[1], members[2]),
                           link(members[1], members[3])
                       ];


                           var paperScroller = this.paperScroller = new joint.ui.PaperScroller({
                               paper: paper,
                               autoResizePaper: true,
                               cursor: 'grab'
                           });

                      // this.paperScroller.paper = paper;
                       this.$('.paper-container').empty();
                       //this.$('.paper-container').append(paperScroller.el);
                       this.$('.paper-container').append(paperScroller.el);

                       //paperScroller.render().center();

                      graph.resetCells(members.concat(connections));
                      treeLayout.graph = graph;
                      tree.paper = paper;
                      treeLayout.layout();

                      */
        // registerComposeButtonEvent();

        // this.graph.fromJSON(JSON.parse(App.config.sampleGraphs.emergencyProcedure));

        // var saveJSON = JSON.stringify(app.graph);
        // var curTabId = getIdOfCurrentTab();
        // App.tabs[curTabId] = saveJSON;
        

    }, this);

    // Tree Layout Rank Selection
    var directionPicker = new joint.ui.SelectBox({
        width: 150,
        options: [
            {value: 'L', content: 'Right-Left'},
            {value: 'R', content: 'Left-Right', selected: true},
            {value: 'T', content: 'Bottom-Top'},
            {value: 'B', content: 'Top-Bottom'}
        ]
    });

    directionPicker.on('option:select', function (option) {
        _.invoke(graph.getElements(), 'set', 'direction', option.value);
        treeLayout.layout();
        paperScroller.centerContent();
    });

    directionPicker.render().$el.appendTo('#chart-direction');

     /*
    var treeView = new joint.ui.TreeLayoutView({
        paper: this.paper,
        model: treeLayout,
        previewAttrs: {
            parent: {rx: 10, ry: 10}
        }
    });*/

    App.guidToCell = {};
    let cells = graph.getCells();
    for (let i = 0; i < cells.length; i++) {
        App.guidToCell[cells[i].id] = cells[i];
    };
}
