
// 防止变量冲突和重复运行
module.exports = function plugin(
    { types: t, template },
) {
    return {
        name: "optional-chaining",
        visitor: {
            OptionalMemberExpression(path) {
                let {object, property} = path.node
                if (path.node.optional) {
                    let tmp = path.scope.generateUidIdentifier("obj");
                    path.scope.push({id: tmp});
                    path.replaceWith(
                        template.expression.ast`(${tmp} = ${object})== null? undefined:${tmp}.${property}`
                    )
                } else {
                    path.replaceWith(
                        template.expression.ast`${object}.${property}`
                    )
                }

            }
        }
    }
};
