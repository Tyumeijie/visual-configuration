var App = window.App || {};

joint.dia.Element.define("custom.Member", {
    size: {
        width: 180,
        height: 70
    },
    attrs: {
        rect: {
            width: 170,
            height: 60
        },
        ".card": {
            fill: "#FFFFFF",
            stroke: "#000000",
            "stroke-width": 2,
            "pointer-events": "visiblePainted",
            rx: 10,
            ry: 10
        },
        image: {
            width: 48,
            height: 48,
            ref: ".card",
            "ref-x": 10,
            "ref-y": 5
        },
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
        width: 180,
        height: 70
    },
    attrs: {
        rect: {
            width: 170,
            height: 60
        },
        ".card": {
            fill: "#FFFFFF",
            stroke: "#000000",
            "stroke-width": 2,
            "pointer-events": "visiblePainted",
            rx: 10,
            ry: 10
        },
        image: {
            width: 48,
            height: 48,
            ref: ".card",
            "ref-x": 10,
            "ref-y": 5
        },
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

    // Extend the Orgchart member markup with control buttons.
    joint.shapes.custom.Member.prototype.markup = [
        '<g class="rotatable">',
        '<g class="scalable">',
        '<rect class="card"/>',
        '</g>',
        '<text class="rank"/><text class="name"/>',
        '<g class="btn add"><circle class="add"/><text class="add">+</text></g>',
        '<g class="btn del"><circle class="del"/><text class="del">-</text></g>',
        '<g class="btn edit"><rect class="edit"/><text class="edit">EDIT</text></g>',
        '</g>'
    ].join('');

    joint.shapes.custom.Member_2.prototype.markup = [
        '<g class="rotatable">',
        '<g class="scalable">',
        '<rect class="card"/>',
        '</g>',
        '<text class="rank"/><text class="name"/>',
        '<g class="btn add"><circle class="add"/><text class="add">+</text></g>',
        '<g class="btn del"><circle class="del"/><text class="del">-</text></g>',
        '<g class="btn edit"><rect class="edit"/><text class="edit">EDIT</text></g>',
        '</g>'
    ].join('');

    // A helper to create a member model
    var member = function (rank, name, image, background, textColor) {

        textColor = textColor || "#000";

        var element = new joint.shapes.custom.Member({
            size: {width: 260, height: 90},
            attrs: {
                '.card': {fill: background, 'stroke-width': 0},
                image: {'xlink:href': image, 'ref-y': 10, opacity: 0.7},
                '.rank': {
                    fill: textColor,
                    text: '',
                    'font-size': 13,
                    'text-decoration': 'none',
                    'ref-x': 0.95,
                    'ref-y': 0.5,
                    'y-alignment': 'middle',
                    'word-spacing': '-1px',
                    'letter-spacing': 0
                },
                '.name': {fill: textColor, text: '', 'ref-x': 0.95, 'ref-y': 0.7, 'font-family': 'Arial'},
                '.btn.add': {'ref-dx': -15, 'ref-y': 15, 'ref': '.card', event: 'element:add'},
                '.btn.del': {'ref-dx': -45, 'ref-y': 15, 'ref': '.card', event: 'element:delete'},
                '.btn.edit': {'ref-dx': -140, 'ref-y': 5, 'ref': '.card', event: 'element:edit'},
                '.btn>circle': {r: 10, fill: 'transparent', stroke: '#333', 'stroke-width': 1},
                '.btn>rect': {height: 20, width: 45, rx: 2, ry: 2, fill: 'transparent', 'stroke-width': 1},
                '.btn.add>text': {
                    fill: textColor,
                    'font-size': 23,
                    'font-weight': 800,
                    stroke: "#000",
                    x: -6.5,
                    y: 8,
                    'font-family': 'Times New Roman'
                },
                '.btn.del>text': {
                    fill: textColor,
                    'font-size': 28,
                    'font-weight': 500,
                    stroke: "#000",
                    x: -4.5,
                    y: 6,
                    'font-family': 'Times New Roman'
                },
                '.btn.edit>text': {
                    fill: textColor,
                    'font-size': 15,
                    'font-weight': 500,
                    stroke: "#000",
                    x: 5,
                    y: 15,
                    'font-family': 'Sans Serif'
                }
            }
        }).on({
            'change:name': function (cell, name) {
                cell.attr('.name/text', joint.util.breakText(name, {width: 160, height: 45}, cell.attr('.name')));
            },
            'change:rank': function (cell, rank) {
                cell.attr('.rank/text', joint.util.breakText(rank, {width: 165, height: 45}, cell.attr('.rank')));
            }
        }).set({
            name: name,
            rank: rank
        });

        return element;
    };

    // A helper to create a member model
    var member2 = function (rank, name, image, background, textColor) {

        textColor = textColor || "#000";

        var element = new joint.shapes.custom.Member_2({
            size: {width: 260, height: 90},
            attrs: {
                '.card': {fill: background, 'stroke-width': 0},
                image: {'xlink:href': image, 'ref-y': 10, opacity: 0.7},
                '.rank': {
                    fill: textColor,
                    text: '',
                    'font-size': 13,
                    'text-decoration': 'none',
                    'ref-x': 0.95,
                    'ref-y': 0.5,
                    'y-alignment': 'middle',
                    'word-spacing': '-1px',
                    'letter-spacing': 0
                },
                '.name': {fill: textColor, text: '', 'ref-x': 0.95, 'ref-y': 0.7, 'font-family': 'Arial'},
                '.btn.add': {'ref-dx': -15, 'ref-y': 15, 'ref': '.card', event: 'element:add'},
                '.btn.del': {'ref-dx': -45, 'ref-y': 15, 'ref': '.card', event: 'element:delete'},
                '.btn.edit': {'ref-dx': -140, 'ref-y': 5, 'ref': '.card', event: 'element:edit'},
                '.btn>circle': {r: 10, fill: 'transparent', stroke: '#333', 'stroke-width': 1},
                '.btn>rect': {height: 20, width: 45, rx: 2, ry: 2, fill: 'transparent', 'stroke-width': 1},
                '.btn.add>text': {
                    fill: textColor,
                    'font-size': 23,
                    'font-weight': 800,
                    stroke: "#000",
                    x: -6.5,
                    y: 8,
                    'font-family': 'Times New Roman'
                },
                '.btn.del>text': {
                    fill: textColor,
                    'font-size': 28,
                    'font-weight': 500,
                    stroke: "#000",
                    x: -4.5,
                    y: 6,
                    'font-family': 'Times New Roman'
                },
                '.btn.edit>text': {
                    fill: textColor,
                    'font-size': 15,
                    'font-weight': 500,
                    stroke: "#000",
                    x: 5,
                    y: 15,
                    'font-family': 'Sans Serif'
                }
            }
        }).on({
            'change:name': function (cell, name) {
                cell.attr('.name/text', joint.util.breakText(name, {width: 160, height: 45}, cell.attr('.name')));
            },
            'change:rank': function (cell, rank) {
                cell.attr('.rank/text', joint.util.breakText(rank, {width: 165, height: 45}, cell.attr('.rank')));
            }
        }).set({
            name: name,
            rank: rank
        });

        return element;
    };

    // A helper to create an arrow connection
    function link(source, target) {
        return new joint.shapes.custom.Arrow({
            source: {id: source.id},
            target: {id: target.id}
        });
    }

    var members = [
        member('Founder & Chairman', 'Pierre Omidyar', 'assets/male.png', '#31d0c6'),
        member2('President & CEO', 'Margaret C. Whitman', 'assets/female.png', '#31d0c6'),
        member('President, PayPal', 'Scott Thompson', 'assets/male.png', '#7c68fc'),
        member2('President, Ebay Global Marketplaces', 'Devin Wenig', 'assets/male.png', '#7c68fc'),
        member('Senior Vice President Human Resources', 'Jeffrey S. Skoll', 'assets/male.png', '#fe854f'),
        member('Senior Vice President Controller', 'Steven P. Westly', 'assets/male.png', '#feb663')
    ];

    var connections = [
        link(members[0], members[1]),
        link(members[1], members[2]),
        link(members[1], members[3]),
        link(members[1], members[4]),
        link(members[1], members[5])
    ];

    var treeLayout = new joint.layout.TreeLayout({
        graph: graph,
        direction: 'R'
    });

    graph.resetCells(members.concat(connections));
    treeLayout.layout();
    this.paperScroller.zoom(-0.2);
    this.paperScroller.centerContent();

    memeberFactory = {
        woman: function () {
            return member('Employee', 'New Woman Employee', 'assets/female.png', '#31d0c6');
        },
        man: function () {
            return member2('Employee', 'New Man Employee', 'assets/male.png', '#7c68fc');
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
    });

    cancelButton.addEventListener("click", function(evt){
        var select = $(".options-container select");
        select.remove();
        container.attr("hidden", "true");

        cancelButton.allowedClick = true;
    });

    function generateOptions(){
       return `<select class="form-control">
                   <option value="man">man</option>
                   <option value="woman">woman</option>
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
        for (linkId in outLinkGUIDs) {
            var outLink = App.guidToCell[linkId];
            var elementId = outLink.attributes.target.id;

            if (graph._out[elementId] != undefined && Object.keys(graph._out[elementId]).length != 0) {
                deleteElementAllChlidren(graph._out[elementId]);
            }

            // delete element and it's link
            var element = App.guidToCell[elementId];
            var elementView = paper.findViewByModel(element);
            elementView.model.remove();
            delete App.guidToCell[elementId];
            delete App.guidToCell[linkId];
        }
    }

    paper.on('element:delete', function (elementView, evt, x, y) {
        evt.stopPropagation();

        if (cancelButton.allowedClick == false) return;

        let elementId = elementView.model.id;
        if (graph._out[elementId] != undefined && Object.keys(graph._out[elementId]).length != 0) {
            let option = confirm("Are you sure to delete all it's children!");

            if (option) {
                deleteElementAllChlidren(graph._out[elementId]);
                treeLayout.layout();
            }

            return;
        }

        // A member removal
        elementView.model.remove();
        delete App.guidToCell[elementId];

        treeLayout.layout();
    });

    paper.on('element:edit', function (elementView, evt, x, y) {
        evt.stopPropagation();

        if (cancelButton.allowedClick == false) return;
        // TODO jump another tap
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

    new joint.ui.TreeLayoutView({
        paper: this.paper,
        model: treeLayout,
        previewAttrs: {
            parent: {rx: 10, ry: 10}
        }
    });

    App.guidToCell = {};
    let cells = graph.getCells();
    for (let i = 0; i < cells.length; i++) {
        App.guidToCell[cells[i].id] = cells[i];
    }
    ;
}
