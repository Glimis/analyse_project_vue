import {parse} from "@babel/parser"
import traverse from "@babel/traverse"
import {transformFromAstSync} from "@babel/core"


export default (code)=>{
    let flag = false
    const ast = parse(code)

    traverse(ast, {
        enter(path) {
            try{
                if (path.type === 'Identifier') {
                    const name = path.node.name
                    if (name === '_v') {
                        if (path.parentPath.parent.arguments[0].type === 'StringLiteral') {
                            return;
                        }
                        const vm = path.parentPath.parent.callee.object.name
                        
                        const code = transformFromAstSync({
                            type: 'File',
                            program: {
                                type: 'Program',
                                body: [path.parentPath.parent]
                            }
                        }).code
                        console.log('code',code)
                        let arr = code.match(new RegExp(`${vm}._v\(${vm}._s\((.*)\)\)`))
                        if(!arr){
                            arr = code.match(/\((.*)\)/)
                        }
                        const _ast = parse(`${vm}._v('')`)
                        
                        _ast.program.body[0].expression.arguments[0].value = arr[1]
    
                        
    
                        path.parentPath.parentPath.replaceWith(_ast.program.body[0])
    
                        flag = true
                    }
                }
            }catch(e){

            }
            
        }
    })

    return {
        flag,
        ast
    }
}