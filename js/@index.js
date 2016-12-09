/**********************************************************************
 require( 'require' )
 -----------------------------------------------------------------------
 @example

 var Path = require("node://path");  // Only in NodeJS/NW.js environment.
 var Button = require("tfw.button");

 **********************************************************************/

window.require = function() {
    var modules = {};
    var definitions = {};
    var nodejs_require = typeof window.require === 'function' ? window.require : null;

    var f = function(id, body) {
        if( id.substr( 0, 7 ) == 'node://' ) {
            // Calling for a NodeJS module.
            if( !nodejs_require ) {
                throw Error( "[require] NodeJS is not available to load module `" + id + "`!" );
            }
            return nodejs_require( id.substr( 7 ) );
        }

        if( typeof body === 'function' ) {
            definitions[id] = body;
            return;
        }
        var mod;
        body = definitions[id];
        if (typeof body === 'undefined') {
            var err = new Error("Required module is missing: " + id);   
            console.error(err.stack);
            throw err;
        }
        mod = modules[id];
        if (typeof mod === 'undefined') {
            mod = {exports: {}};
            var exports = mod.exports;
            body(f, mod, exports);
            modules[id] = mod.exports;
            mod = mod.exports;
            //console.log("Module initialized: " + id);
        }
        return mod;
    };
    return f;
}();
function addListener(e,l) {
    if (window.addEventListener) {
        window.addEventListener(e,l,false);
    } else {
        window.attachEvent('on' + e, l);
    }
};

addListener(
    'DOMContentLoaded',
    function() {
        document.body.parentNode.$data = {};
        // Attach controllers.
        APP = require('main');
setTimeout(function (){if(typeof APP.start==='function')APP.start()});
var W = require('x-widget');
        W('modal', 'wdg.modal', {
            padding: "true",
            content: [
          W({
              elem: "center",
              children: ["Toutes les mesures sont en mm."]}),
                      W('wdg.flex8', 'wdg.flex', {"content": [
                              W('x', 'wdg.text', {
                  label: "X",
                  value: "450",
                  type: "number",
                  width: "4rem"}),
                              W('y', 'wdg.text', {
                  label: "Y",
                  value: "300",
                  type: "number",
                  width: "4rem"}),
                              W('z', 'wdg.text', {
                  label: "Z",
                  value: "250",
                  type: "number",
                  width: "4rem"})]}),
                      W('wdg.flex9', 'wdg.flex', {"content": [
                              W('e', 'wdg.text', {
                  label: "Épai.",
                  value: "20",
                  type: "number",
                  width: "4rem"}),
                              W('i', 'wdg.text', {
                  label: "Isol.",
                  value: "40",
                  type: "number",
                  width: "4rem"}),
                              W('p', 'wdg.text', {
                  label: "€/m²",
                  value: "12",
                  type: "number",
                  width: "4rem"})]}),
          W({
              elem: "hr"}),
          W({
              elem: "center",
              children: ["Dimensions des 12 planches"]}),
          W({
              elem: "ul",
              attr: {"id": "wood"}}),
                      W('wdg.flex10', 'wdg.flex', {"content": [
              W({
                  elem: "div",
                  children: [
                    W({
                      elem: "big",
                      attr: {"id": "surf"}}),
                    " m²"]}),
              W({
                  elem: "div",
                  children: [
                    W({
                      elem: "big",
                      attr: {"id": "price"}}),
                    " €"]})]})]})
        W.bind('x',{"value":{"S":["onChange"]}});
        W.bind('y',{"value":{"S":["onChange"]}});
        W.bind('z',{"value":{"S":["onChange"]}});
        W.bind('e',{"value":{"S":["onChange"]}});
        W.bind('i',{"value":{"S":["onChange"]}});
        W.bind('p',{"value":{"S":["onChange"]}});
    }
);
