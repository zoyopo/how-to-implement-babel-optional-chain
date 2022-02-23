
// 防止undefined被声明 如let undefined = 2
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
                    let undef = path.scope
                        .buildUndefinedNode();
                    path.replaceWith(
                        template.expression.ast`(${tmp} = ${object})== null? ${undef}:${tmp}.${property}`
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
