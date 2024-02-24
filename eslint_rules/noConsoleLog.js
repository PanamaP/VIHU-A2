// @ts-check
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce no console.log()",
      recommended: true,
    },
    fixable: " ",
    schema: [],
  },

  create(context) {
    return {
      ExpressionStatement(node) {
        var nodeCallee = node.expression.callee;

        if (
          nodeCallee.type === "MemberExpression" &&
          nodeCallee.object.name === "console" &&
          nodeCallee.property.name === "log"
        ) {
          context.report({
            node,
            message: "console.log() is not allowed in production",
            fix(fixer) {
              return fixer.remove(node);
            },
          });
        }
      },
    };
  },
};
