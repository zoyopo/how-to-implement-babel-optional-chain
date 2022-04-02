// 最简陋的实现
module.exports = function plugin(
    { types: t, template },
) {
    return {
        name: "optional-chaining",
        visitor: {
            OptionalMemberExpression(path) {
                let {object, property} = path.node
                path.replaceWith(
                    template.expression.ast`${object}== null? undefined:${object}.${property}`
                )
            }
        }
    }
};
