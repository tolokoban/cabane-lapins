"use strict";

var $ = require("dom");
var W = require("x-widget").getById;


exports.onChange = function() {
    $.clear( 'wood' );
    var x = parseInt( W('x').value );
    var y = parseInt( W('x').value );
    var z = parseInt( W('x').value );
    var e = parseInt( W('e').value );  // Épaisseur d'une planche.
    var i = parseInt( W('i').value );  // Épaisseur de l'isolant.
    var p = parseInt( W('p').value );  // Prix au mètre carré.
    var s = 0;  // surface en mètres carrés.
    s += add( x, y );
    s += add( x, z+2*e );
    s += add( y+2*e, z+2*e );
    s += add( x+2*i+2*e, y+2*i+2*e );
    s += add( x+2*i+2*e, y+2*i+4*e );
    s += add( x+2*i+4*e, y+2*i+4*e );
    document.getElementById( 'surf' ).textContent = s.toFixed( 2 );
    document.getElementById( 'price' ).textContent = (Math.ceil( 100*p*s ) / 100).toFixed( 2 );
};


function add(x, y) {
    $.add( 'wood', $.tag('li', [x + ' x ' + y + " (x2)"]) );
    return x*y/1000000;
}


exports.start = function() {
    exports.onChange();
    W('modal').visible = true;
};
