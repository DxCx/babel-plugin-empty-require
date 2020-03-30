"use strict";

/* Replaces all requires with {} objects to allow "Shallow importing" */
module.exports = function ({
  types
}) {
  return {
    name: 'babel-plugin-empty-require',
    visitor: {
      CallExpression: {
        enter(nodePath) {
          const callee = nodePath.get('callee');

          if (!callee.isIdentifier() || !callee.equals('name', 'require')) {
            return;
          }

          const arg = nodePath.get('arguments')[0];

          if (!types.isStringLiteral(arg)) {
            return;
          } // Is this relative import?


          if (arg.node.value[0] !== '.') {
            return;
          }

          nodePath.replaceWith(types.objectExpression([]));
        }

      }
    }
  };
};
