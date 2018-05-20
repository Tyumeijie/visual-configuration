/*! Rappid v2.2.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2018-05-06


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/

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

var tree = function(joint, V, _) {

    if (App.pattern.tree.hasCalled) {
        let cells = app.graph.getCells();
        let newCells = cells.splice(0, cells.length-1);
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
    var member = function(rank, name, image, background, textColor) {

        textColor = textColor || "#000";

        var element = new joint.shapes.custom.Member({
            size: { width: 260, height: 90 },
            attrs: {
                '.card': { fill: background, 'stroke-width': 0 },
                image: { 'xlink:href': image, 'ref-y': 10, opacity: 0.7 },
                '.rank': { fill: textColor, text: '', 'font-size': 13, 'text-decoration': 'none', 'ref-x': 0.95, 'ref-y': 0.5, 'y-alignment': 'middle', 'word-spacing': '-1px', 'letter-spacing': 0 },
                '.name': { fill: textColor, text: '', 'ref-x': 0.95, 'ref-y': 0.7, 'font-family': 'Arial' },
                '.btn.add': { 'ref-dx': -15,'ref-y': 15, 'ref': '.card', event: 'element:add' },
                '.btn.del': { 'ref-dx': -45,'ref-y': 15, 'ref': '.card', event: 'element:delete' },
                '.btn.edit': { 'ref-dx': -140,'ref-y': 5, 'ref': '.card', event: 'element:edit' },
                '.btn>circle': { r: 10, fill: 'transparent', stroke: '#333', 'stroke-width': 1 },
                '.btn>rect': { height: 20, width: 45, rx: 2, ry: 2, fill: 'transparent', 'stroke-width': 1 },
                '.btn.add>text': { fill: textColor,'font-size': 23, 'font-weight': 800, stroke: "#000", x: -6.5, y: 8, 'font-family': 'Times New Roman' },
                '.btn.del>text': { fill: textColor,'font-size': 28, 'font-weight': 500, stroke: "#000", x: -4.5, y: 6, 'font-family': 'Times New Roman' },
                '.btn.edit>text': { fill: textColor,'font-size': 15, 'font-weight': 500, stroke: "#000", x: 5, y: 15, 'font-family': 'Sans Serif' }
            }
        }).on({
            'change:name': function(cell, name) {
                cell.attr('.name/text', joint.util.breakText(name, { width: 160, height: 45 }, cell.attr('.name')));
            },
            'change:rank': function(cell, rank) {
                cell.attr('.rank/text', joint.util.breakText(rank, { width: 165, height: 45 }, cell.attr('.rank')));
            }
        }).set({
            name: name,
            rank: rank
        });

        return element;
    };

    // A helper to create a member model
    var member2 = function(rank, name, image, background, textColor) {

        textColor = textColor || "#000";

        var element = new joint.shapes.custom.Member_2({
            size: { width: 260, height: 90 },
            attrs: {
                '.card': { fill: background, 'stroke-width': 0 },
                image: { 'xlink:href': image, 'ref-y': 10, opacity: 0.7 },
                '.rank': { fill: textColor, text: '', 'font-size': 13, 'text-decoration': 'none', 'ref-x': 0.95, 'ref-y': 0.5, 'y-alignment': 'middle', 'word-spacing': '-1px', 'letter-spacing': 0 },
                '.name': { fill: textColor, text: '', 'ref-x': 0.95, 'ref-y': 0.7, 'font-family': 'Arial' },
                '.btn.add': { 'ref-dx': -15,'ref-y': 15, 'ref': '.card', event: 'element:add' },
                '.btn.del': { 'ref-dx': -45,'ref-y': 15, 'ref': '.card', event: 'element:delete' },
                '.btn.edit': { 'ref-dx': -140,'ref-y': 5, 'ref': '.card', event: 'element:edit' },
                '.btn>circle': { r: 10, fill: 'transparent', stroke: '#333', 'stroke-width': 1 },
                '.btn>rect': { height: 20, width: 45, rx: 2, ry: 2, fill: 'transparent', 'stroke-width': 1 },
                '.btn.add>text': { fill: textColor,'font-size': 23, 'font-weight': 800, stroke: "#000", x: -6.5, y: 8, 'font-family': 'Times New Roman' },
                '.btn.del>text': { fill: textColor,'font-size': 28, 'font-weight': 500, stroke: "#000", x: -4.5, y: 6, 'font-family': 'Times New Roman' },
                '.btn.edit>text': { fill: textColor,'font-size': 15, 'font-weight': 500, stroke: "#000", x: 5, y: 15, 'font-family': 'Sans Serif' }
            }
        }).on({
            'change:name': function(cell, name) {
                cell.attr('.name/text', joint.util.breakText(name, { width: 160, height: 45 }, cell.attr('.name')));
            },
            'change:rank': function(cell, rank) {
                cell.attr('.rank/text', joint.util.breakText(rank, { width: 165, height: 45 }, cell.attr('.rank')));
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
            source: { id: source.id },
            target: { id: target.id }
        });
    }

    var members = [
        member('Founder & Chairman', 'Pierre Omidyar', 'assets/male.png', '#31d0c6'),
        member2('President & CEO', 'Margaret C. Whitman', 'assets/female.png', '#31d0c6'),
        member('President, PayPal', 'Scott Thompson', 'assets/male.png', '#7c68fc'),
        member2('President, Ebay Global Marketplaces' , 'Devin Wenig', 'assets/male.png', '#7c68fc'),
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
/*
    var graph = new joint.dia.Graph();
    var paper = new joint.dia.Paper({
        model: graph,
        width: 1,
        height: 1,
        gridSize: 1,
        defaultLink: new joint.shapes.custom.Arrow()
    });

    var paperScroller = new joint.ui.PaperScroller({
        paper: paper,
        autoResizePaper: true
    });
*/
    var treeLayout = new joint.layout.TreeLayout({
        graph: graph,
        direction: 'R'
    });


    // paperScroller.$el.css({ width: '100%', height: '100%' }).appendTo('#paper-container');
    graph.resetCells(members.concat(connections));
    treeLayout.layout();
    // this.paperScroller.zoom(-0.2);
    this.paperScroller.centerContent();

    // this.paper.on('blank:pointerdown', paperScroller.startPanning);

    memeberFactory = {
        woman: function(){
            return member('Employee', 'New Woman Employee', 'assets/female.png', '#31d0c6');
        },
        man: function(){
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

    this.paper.on('element:add', function(elementView, evt) {
        evt.stopPropagation();


        var el = '<select id="selection">' +
            '<option >man</option>' +
            '<option >woman</option>' +
            '</select>';

        var dialog = new joint.ui.Dialog({
            // type: 'inspector-dialog',
            width: 250,
            title: 'Edit Member',
            closeButton: false,
            content: el,
            buttons: [{
                content: 'Cancel',
                action: 'cancel'
            }, {
                content: 'Apply',
                action: 'apply'
            }]
        });

        dialog.on({
            'action:cancel': function() {
                //addMember(elementView, inspector)
                //inspector.remove();

                dialog.close();

            },
            'action:apply': function() {
                //inspector.updateCell();
                option = $('#selection').val();
                addMember(elementView, option);
                //inspector.remove();

                dialog.close();
            }
        });

        dialog.open();


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

    this.paper.on('element:delete', function(elementView, evt, x, y) {
        evt.stopPropagation();

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

    this.paper.on('element:edit', function(elementView, evt, x, y) {
        evt.stopPropagation();
        alert("edit")

        // graph.resetCells(members.concat(connections));

        // A member edit
        /* var inspector = new joint.ui.Inspector({
            cellView: elementView,
            live: false,
            inputs: {
                'rank': {
                    type: 'text',
                    label: 'Rank',
                    index: 1
                },
                'name': {
                    type: 'text',
                    label: 'Name',
                    index: 2
                },
                'attrs/image/xlink:href': {
                    type: 'select-box',
                    target: '.joint-dialog .fg',
                    width: 210,
                    label: 'Sex',
                    options: [
                        { value: 'images/male.png', content: 'Male' },
                        { value: 'images/female.png', content: 'Female' }
                    ],
                    index: 3
                },
                'attrs/.card/fill': {
                    type: 'color-palette',
                    target: '.joint-dialog .fg',
                    label: 'Color',
                    index: 4,
                    options: [
                        { content: '#31d0c6' },
                        { content: '#7c68fc' },
                        { content: '#fe854f' },
                        { content: '#feb663' },
                        { content: '#c6c7e2' }
                    ]
                }
            }
        });

        var dialog = new joint.ui.Dialog({
            type: 'inspector-dialog',
            width: 250,
            title: 'Edit Member',
            closeButton: false,
            content: inspector.render().el,
            buttons: [{
                content: 'Cancel',
                action: 'cancel'
            }, {
                content: 'Apply',
                action: 'apply'
            }]
        });

        dialog.on({
            'action:cancel': function() {
                inspector.remove(); dialog.close();
            },
            'action:apply': function() {
                inspector.updateCell();
                inspector.remove();
                dialog.close();
            }
        });
        dialog.open();
        */
    }, this);

    // Tree Layout Rank Selection
    var directionPicker = new joint.ui.SelectBox({
        width: 150,
        options: [
            { value: 'L', content: 'Right-Left' },
            { value: 'R', content: 'Left-Right', selected: true },
            { value: 'T', content: 'Bottom-Top' },
            { value: 'B', content: 'Top-Bottom' }
        ]
    });

    directionPicker.on('option:select', function(option) {
        _.invoke(graph.getElements(), 'set', 'direction', option.value);
        treeLayout.layout();
        paperScroller.centerContent();
    });

    directionPicker.render().$el.appendTo('#chart-direction');

     new joint.ui.TreeLayoutView({
        paper: this.paper,
        model: treeLayout,
        previewAttrs: {
            parent: { rx: 10, ry: 10 }
        }
    });

    //App.graph = graph;
    //App.paper = paper;

    App.guidToCell = {};
    let cells = graph.getCells();
    for (let i=0; i<cells.length; i++) {
        App.guidToCell[cells[i].id] = cells[i];
    };
}
