import{parse as e}from"@babel/parser";import r from"@babel/traverse";import{transformFromAstSync as t}from"@babel/core";export default function(a){var n=!1,o=e(a);return r(o,{enter:function(r){try{if("Identifier"===r.type)if("_v"===r.node.name){if("StringLiteral"===r.parentPath.parent.arguments[0].type)return;var a=r.parentPath.parent.callee.object.name,o=t({type:"File",program:{type:"Program",body:[r.parentPath.parent]}}).code,p=o.match(new RegExp("".concat(a,"._v(").concat(a,"._s((.*)))")));p||(p=o.match(/\((.*)\)/));var c=e("".concat(a,"._v('')"));c.program.body[0].expression.arguments[0].value=p[1],r.parentPath.parentPath.replaceWith(c.program.body[0]),n=!0}}catch(e){}}}),{flag:n,ast:o}}
