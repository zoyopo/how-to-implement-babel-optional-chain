// 修复正常.符号也会触发?.转换问题
module.exports = function plugin(
    { types: t, template },
) {
    return {
        name: "optional-chaining",
        visitor: {
            OptionalMemberExpression(path) {
                let {object, property} = path.node
                if (path.node.optional) {
                    path.replaceWith(
                        template.expression.ast`${object}== null? undefined:${object}.${property}`
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
