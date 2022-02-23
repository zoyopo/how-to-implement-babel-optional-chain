// 添加&&的实现方式
module.exports = function plugin(
    { types: t, template },
    { loose = false } = {}
) {
    const buildLoose = template.expression(`
    (%%tmp%% = %%obj%%) && %%expr%%
  `);

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
                    if(loose){
                        path.replaceWith(buildLoose({tmp,obj:object,expr:template.expression.ast`${tmp}.${property}`}))
                        return
                    }
                    path.replaceWith(
                        template.expression.ast`(${tmp} =${object})== null?${undef}:${tmp}.${property}`
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
