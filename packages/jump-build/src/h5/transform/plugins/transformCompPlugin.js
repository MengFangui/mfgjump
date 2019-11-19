/**
 * @file 生成入口文件components.js 注册jump-components中用户用到的组件
 * @author zhangjingyuan02
 */
/* eslint-disable fecs-camelcase */
/* eslint-disable babel/new-cap */

module.exports = function getVisitor(options = {}) {
    const COMP_LIBRARY_NAME = options.devCompPath ? options.devCompPath : '@jumpjsmfg/components/lib';

    return ({types: t}) => {
        const componentSet = options.componentSet;
        return {
            visitor: {
                Program: {
                    // 在 exit 时才能拿到 file.config
                    exit(path) {
                        // 封装插入 import declaration
                        function insertImportDeclaration(identifier, route) {
                            return path.node.body.unshift(
                                t.importDeclaration([
                                    t.importDefaultSpecifier(
                                        t.identifier(identifier)
                                    )],
                                    t.stringLiteral(route)
                                )
                            );
                        }
                        let componentExpression = [];
                        for (let key in componentSet) {
                            insertImportDeclaration(
                                componentSet[key],
                                `${COMP_LIBRARY_NAME}/${componentSet[key].replace('Jump', '')}`
                            );
                            componentExpression.push(t.expressionStatement(t.callExpression(
                                t.memberExpression(
                                    t.identifier('Vue'),
                                    t.identifier('component'),
                                ),
                                [t.stringLiteral(componentSet[key]), t.identifier(componentSet[key])]
                            )));
                        }
                        path.node.body.push(t.functionDeclaration(
                            t.identifier('basicComponents'),
                            [t.identifier('Vue')],
                            t.blockStatement(componentExpression)
                        ));
                    }
                }
            }
        };
    };
}
