/** @module main */require( 'main', function(require, module, exports) { var _=function(){var D={"en":{"welcome":"Welcome in the world of"},"fr":{"welcome":"Bienvenue dans le monde de"}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    "use strict";

var $ = require("dom");
var W = require("x-widget").getById;


exports.onChange = function() {
    $.clear( 'wood' );
    var x = parseInt( W('x').value );
    var y = parseInt( W('y').value );
    var z = parseInt( W('z').value );
    var e = parseInt( W('e').value );  // Épaisseur d'une planche.
    var i = parseInt( W('i').value );  // Épaisseur de l'isolant.
    var p = parseInt( W('p').value );  // Prix au mètre carré.
    var s = 0;  // surface en mètres carrés.
    s += add( x, y,                  'Z int.' );
    s += add( x, z+2*e,              'Y int.' );
    s += add( y+2*e, z+2*e,          'X int.' );
    s += add( x+2*i+2*e, y+2*i+2*e,  'Z ext.' );
    s += add( x+2*i+2*e, z+2*i+4*e,  'Y ext.' );
    s += add( y+2*i+4*e, z+2*i+4*e,  'X ext.' );

    document.getElementById( 'surf' ).textContent = s.toFixed( 2 );
    document.getElementById( 'price' ).textContent = (Math.ceil( 100*p*s ) / 100).toFixed( 2 );
};


function add(x, y, caption ) {
    $.add( 'wood', $.tag('li', [
        $.tag('b', ['' + x]),
        ' x ',
        $.tag('b', ['' + y]),
        ' (x2) ',
        $.tag('span', [caption])
    ]) );
    return x*y/1000000;
}


exports.start = function() {
    exports.onChange();
    W('modal').visible = true;
};


  
module.exports._ = _;
/**
 * @module main
 * @see module:$
 * @see module:dom
 * @see module:x-widget

 */
});