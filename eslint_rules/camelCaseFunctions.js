// Enforces a specific naming convention for functions (camelCase)

// @ts-check
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce camelCase naming convention for functions",
      recommended: false,
    },
    fixable: "code",
    schema: [],
  },

  create(context) {
    const camelCaseMatching = /^[a-z][a-zA-Z]*$/;
    const msg = "Function name '{{ name }}' is not in camel case.";

    function isCamelCase(string) {
      return camelCaseMatching.test(string);
    }

    function toCamelCase(string) {
      return string
        .replace(/[^a-zA-Z]+(.)/g, (_, char) => char.toUpperCase())
        .replace(/^[A-Z]/, (match) => match.toLowerCase());
    }

    return {
      // function myFunc() {}
      FunctionDeclaration(node) {
        const functionName = node.id.name;

        if (!isCamelCase(functionName)) {
          context.report({
            node,
            message: msg,
            data: {
              name: functionName,
            },
            fix(fixer) {
              const newFunctionName = toCamelCase(functionName);
              return fixer.replaceText(node.id, newFunctionName);
            },
          });
        }
      },
      // const myFunc = function() {} or const myFunc = () => {}
      VariableDeclarator(node) {
        if (
          (node.init && node.init.type === "FunctionExpression") ||
          (node.init && node.init.type === "ArrowFunctionExpression")
        ) {
          const variableName = node.id.name;

          if (!isCamelCase(variableName)) {
            context.report({
              node,
              message: msg,
              data: {
                name: variableName,
              },
              fix(fixer) {
                const newFunctionName = toCamelCase(variableName);
                return fixer.replaceText(node.id, newFunctionName);
              },
            });
          }
        }
      },
    };
  },
};
