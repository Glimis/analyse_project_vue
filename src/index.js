import {parse} from "@babel/parser"
import traverse from "@babel/traverse"
import {transformFromAstSync} from "@babel/core"


export default (code)=>{
    let flag = false
    const ast = parse(code)

    traverse(ast, {
        enter(path) {
            if (path.type === 'Identifier') {
                const name = path.node.name
                if (name === '_v') {
                    if (path.parentPath.parent.arguments[0].type === 'StringLiteral') {
                        return;
                    }
                    flag = true
                    const code = transformFromAstSync({
                        type: 'File',
                        program: {
                            type: 'Program',
                            body: [path.parentPath.parent]
                        }
                    }).code

                    let arr = code.match(/_vm._v\(_vm._s\((.*)\)\)/)
                    if(!arr){
                        arr = code.match(/\((.*)\)/)
                    }
                    const _ast = parse("_vm._v('')")
                    
                    _ast.program.body[0].expression.arguments[0].value = arr[1]

                    

                    path.parentPath.parentPath.replaceWith(_ast.program.body[0])
                }
            }
        }
    })

    return {
        flag,
        ast
    }
}