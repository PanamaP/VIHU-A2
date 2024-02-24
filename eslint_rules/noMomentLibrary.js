// @ts-check
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce moment library isn't imported",
      recommended: true,
    },
    fixable: " ",
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value == "moment") {
          context.report({
            node,
            message:
              "Moment library is deprecated and not allowed to be imported.",
            fix(fixer) {
              return fixer.remove(node);
            },
          });
        }
      },
    };
  },
};
