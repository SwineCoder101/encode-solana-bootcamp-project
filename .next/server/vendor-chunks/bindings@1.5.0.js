/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/bindings@1.5.0";
exports.ids = ["vendor-chunks/bindings@1.5.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/bindings@1.5.0/node_modules/bindings/bindings.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/bindings@1.5.0/node_modules/bindings/bindings.js ***!
  \*****************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("/**\n * Module dependencies.\n */\n\nvar fs = __webpack_require__(/*! fs */ \"fs\"),\n  path = __webpack_require__(/*! path */ \"path\"),\n  fileURLToPath = __webpack_require__(/*! file-uri-to-path */ \"(ssr)/./node_modules/.pnpm/file-uri-to-path@1.0.0/node_modules/file-uri-to-path/index.js\"),\n  join = path.join,\n  dirname = path.dirname,\n  exists =\n    (fs.accessSync &&\n      function(path) {\n        try {\n          fs.accessSync(path);\n        } catch (e) {\n          return false;\n        }\n        return true;\n      }) ||\n    fs.existsSync ||\n    path.existsSync,\n  defaults = {\n    arrow: process.env.NODE_BINDINGS_ARROW || ' → ',\n    compiled: process.env.NODE_BINDINGS_COMPILED_DIR || 'compiled',\n    platform: process.platform,\n    arch: process.arch,\n    nodePreGyp:\n      'node-v' +\n      process.versions.modules +\n      '-' +\n      process.platform +\n      '-' +\n      process.arch,\n    version: process.versions.node,\n    bindings: 'bindings.node',\n    try: [\n      // node-gyp's linked version in the \"build\" dir\n      ['module_root', 'build', 'bindings'],\n      // node-waf and gyp_addon (a.k.a node-gyp)\n      ['module_root', 'build', 'Debug', 'bindings'],\n      ['module_root', 'build', 'Release', 'bindings'],\n      // Debug files, for development (legacy behavior, remove for node v0.9)\n      ['module_root', 'out', 'Debug', 'bindings'],\n      ['module_root', 'Debug', 'bindings'],\n      // Release files, but manually compiled (legacy behavior, remove for node v0.9)\n      ['module_root', 'out', 'Release', 'bindings'],\n      ['module_root', 'Release', 'bindings'],\n      // Legacy from node-waf, node <= 0.4.x\n      ['module_root', 'build', 'default', 'bindings'],\n      // Production \"Release\" buildtype binary (meh...)\n      ['module_root', 'compiled', 'version', 'platform', 'arch', 'bindings'],\n      // node-qbs builds\n      ['module_root', 'addon-build', 'release', 'install-root', 'bindings'],\n      ['module_root', 'addon-build', 'debug', 'install-root', 'bindings'],\n      ['module_root', 'addon-build', 'default', 'install-root', 'bindings'],\n      // node-pre-gyp path ./lib/binding/{node_abi}-{platform}-{arch}\n      ['module_root', 'lib', 'binding', 'nodePreGyp', 'bindings']\n    ]\n  };\n\n/**\n * The main `bindings()` function loads the compiled bindings for a given module.\n * It uses V8's Error API to determine the parent filename that this function is\n * being invoked from, which is then used to find the root directory.\n */\n\nfunction bindings(opts) {\n  // Argument surgery\n  if (typeof opts == 'string') {\n    opts = { bindings: opts };\n  } else if (!opts) {\n    opts = {};\n  }\n\n  // maps `defaults` onto `opts` object\n  Object.keys(defaults).map(function(i) {\n    if (!(i in opts)) opts[i] = defaults[i];\n  });\n\n  // Get the module root\n  if (!opts.module_root) {\n    opts.module_root = exports.getRoot(exports.getFileName());\n  }\n\n  // Ensure the given bindings name ends with .node\n  if (path.extname(opts.bindings) != '.node') {\n    opts.bindings += '.node';\n  }\n\n  // https://github.com/webpack/webpack/issues/4175#issuecomment-342931035\n  var requireFunc =\n     true\n      ? require\n      : 0;\n\n  var tries = [],\n    i = 0,\n    l = opts.try.length,\n    n,\n    b,\n    err;\n\n  for (; i < l; i++) {\n    n = join.apply(\n      null,\n      opts.try[i].map(function(p) {\n        return opts[p] || p;\n      })\n    );\n    tries.push(n);\n    try {\n      b = opts.path ? requireFunc.resolve(n) : requireFunc(n);\n      if (!opts.path) {\n        b.path = n;\n      }\n      return b;\n    } catch (e) {\n      if (e.code !== 'MODULE_NOT_FOUND' &&\n          e.code !== 'QUALIFIED_PATH_RESOLUTION_FAILED' &&\n          !/not find/i.test(e.message)) {\n        throw e;\n      }\n    }\n  }\n\n  err = new Error(\n    'Could not locate the bindings file. Tried:\\n' +\n      tries\n        .map(function(a) {\n          return opts.arrow + a;\n        })\n        .join('\\n')\n  );\n  err.tries = tries;\n  throw err;\n}\nmodule.exports = exports = bindings;\n\n/**\n * Gets the filename of the JavaScript file that invokes this function.\n * Used to help find the root directory of a module.\n * Optionally accepts an filename argument to skip when searching for the invoking filename\n */\n\nexports.getFileName = function getFileName(calling_file) {\n  var origPST = Error.prepareStackTrace,\n    origSTL = Error.stackTraceLimit,\n    dummy = {},\n    fileName;\n\n  Error.stackTraceLimit = 10;\n\n  Error.prepareStackTrace = function(e, st) {\n    for (var i = 0, l = st.length; i < l; i++) {\n      fileName = st[i].getFileName();\n      if (fileName !== __filename) {\n        if (calling_file) {\n          if (fileName !== calling_file) {\n            return;\n          }\n        } else {\n          return;\n        }\n      }\n    }\n  };\n\n  // run the 'prepareStackTrace' function above\n  Error.captureStackTrace(dummy);\n  dummy.stack;\n\n  // cleanup\n  Error.prepareStackTrace = origPST;\n  Error.stackTraceLimit = origSTL;\n\n  // handle filename that starts with \"file://\"\n  var fileSchema = 'file://';\n  if (fileName.indexOf(fileSchema) === 0) {\n    fileName = fileURLToPath(fileName);\n  }\n\n  return fileName;\n};\n\n/**\n * Gets the root directory of a module, given an arbitrary filename\n * somewhere in the module tree. The \"root directory\" is the directory\n * containing the `package.json` file.\n *\n *   In:  /home/nate/node-native-module/lib/index.js\n *   Out: /home/nate/node-native-module\n */\n\nexports.getRoot = function getRoot(file) {\n  var dir = dirname(file),\n    prev;\n  while (true) {\n    if (dir === '.') {\n      // Avoids an infinite loop in rare cases, like the REPL\n      dir = process.cwd();\n    }\n    if (\n      exists(join(dir, 'package.json')) ||\n      exists(join(dir, 'node_modules'))\n    ) {\n      // Found the 'package.json' file or 'node_modules' dir; we're done\n      return dir;\n    }\n    if (prev === dir) {\n      // Got to the top\n      throw new Error(\n        'Could not find module root given file: \"' +\n          file +\n          '\". Do you have a `package.json` file? '\n      );\n    }\n    // Try the parent dir next\n    prev = dir;\n    dir = join(dir, '..');\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vYmluZGluZ3NAMS41LjAvbm9kZV9tb2R1bGVzL2JpbmRpbmdzL2JpbmRpbmdzLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTLG1CQUFPLENBQUMsY0FBSTtBQUNyQixTQUFTLG1CQUFPLENBQUMsa0JBQU07QUFDdkIsa0JBQWtCLG1CQUFPLENBQUMsa0hBQWtCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsU0FBUyxFQUFFLFNBQVMsRUFBRTtBQUNoRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxLQUF5QztBQUM3QyxRQUFRLE9BQXVCO0FBQy9CLFFBQVEsQ0FBTzs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTs7QUFFQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQ7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVtcGxhdGUtbmV4dC10YWlsd2luZC1jb3VudGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2JpbmRpbmdzQDEuNS4wL25vZGVfbW9kdWxlcy9iaW5kaW5ncy9iaW5kaW5ncy5qcz81ODM2Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgZnMgPSByZXF1aXJlKCdmcycpLFxuICBwYXRoID0gcmVxdWlyZSgncGF0aCcpLFxuICBmaWxlVVJMVG9QYXRoID0gcmVxdWlyZSgnZmlsZS11cmktdG8tcGF0aCcpLFxuICBqb2luID0gcGF0aC5qb2luLFxuICBkaXJuYW1lID0gcGF0aC5kaXJuYW1lLFxuICBleGlzdHMgPVxuICAgIChmcy5hY2Nlc3NTeW5jICYmXG4gICAgICBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZnMuYWNjZXNzU3luYyhwYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pIHx8XG4gICAgZnMuZXhpc3RzU3luYyB8fFxuICAgIHBhdGguZXhpc3RzU3luYyxcbiAgZGVmYXVsdHMgPSB7XG4gICAgYXJyb3c6IHByb2Nlc3MuZW52Lk5PREVfQklORElOR1NfQVJST1cgfHwgJyDihpIgJyxcbiAgICBjb21waWxlZDogcHJvY2Vzcy5lbnYuTk9ERV9CSU5ESU5HU19DT01QSUxFRF9ESVIgfHwgJ2NvbXBpbGVkJyxcbiAgICBwbGF0Zm9ybTogcHJvY2Vzcy5wbGF0Zm9ybSxcbiAgICBhcmNoOiBwcm9jZXNzLmFyY2gsXG4gICAgbm9kZVByZUd5cDpcbiAgICAgICdub2RlLXYnICtcbiAgICAgIHByb2Nlc3MudmVyc2lvbnMubW9kdWxlcyArXG4gICAgICAnLScgK1xuICAgICAgcHJvY2Vzcy5wbGF0Zm9ybSArXG4gICAgICAnLScgK1xuICAgICAgcHJvY2Vzcy5hcmNoLFxuICAgIHZlcnNpb246IHByb2Nlc3MudmVyc2lvbnMubm9kZSxcbiAgICBiaW5kaW5nczogJ2JpbmRpbmdzLm5vZGUnLFxuICAgIHRyeTogW1xuICAgICAgLy8gbm9kZS1neXAncyBsaW5rZWQgdmVyc2lvbiBpbiB0aGUgXCJidWlsZFwiIGRpclxuICAgICAgWydtb2R1bGVfcm9vdCcsICdidWlsZCcsICdiaW5kaW5ncyddLFxuICAgICAgLy8gbm9kZS13YWYgYW5kIGd5cF9hZGRvbiAoYS5rLmEgbm9kZS1neXApXG4gICAgICBbJ21vZHVsZV9yb290JywgJ2J1aWxkJywgJ0RlYnVnJywgJ2JpbmRpbmdzJ10sXG4gICAgICBbJ21vZHVsZV9yb290JywgJ2J1aWxkJywgJ1JlbGVhc2UnLCAnYmluZGluZ3MnXSxcbiAgICAgIC8vIERlYnVnIGZpbGVzLCBmb3IgZGV2ZWxvcG1lbnQgKGxlZ2FjeSBiZWhhdmlvciwgcmVtb3ZlIGZvciBub2RlIHYwLjkpXG4gICAgICBbJ21vZHVsZV9yb290JywgJ291dCcsICdEZWJ1ZycsICdiaW5kaW5ncyddLFxuICAgICAgWydtb2R1bGVfcm9vdCcsICdEZWJ1ZycsICdiaW5kaW5ncyddLFxuICAgICAgLy8gUmVsZWFzZSBmaWxlcywgYnV0IG1hbnVhbGx5IGNvbXBpbGVkIChsZWdhY3kgYmVoYXZpb3IsIHJlbW92ZSBmb3Igbm9kZSB2MC45KVxuICAgICAgWydtb2R1bGVfcm9vdCcsICdvdXQnLCAnUmVsZWFzZScsICdiaW5kaW5ncyddLFxuICAgICAgWydtb2R1bGVfcm9vdCcsICdSZWxlYXNlJywgJ2JpbmRpbmdzJ10sXG4gICAgICAvLyBMZWdhY3kgZnJvbSBub2RlLXdhZiwgbm9kZSA8PSAwLjQueFxuICAgICAgWydtb2R1bGVfcm9vdCcsICdidWlsZCcsICdkZWZhdWx0JywgJ2JpbmRpbmdzJ10sXG4gICAgICAvLyBQcm9kdWN0aW9uIFwiUmVsZWFzZVwiIGJ1aWxkdHlwZSBiaW5hcnkgKG1laC4uLilcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnY29tcGlsZWQnLCAndmVyc2lvbicsICdwbGF0Zm9ybScsICdhcmNoJywgJ2JpbmRpbmdzJ10sXG4gICAgICAvLyBub2RlLXFicyBidWlsZHNcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnYWRkb24tYnVpbGQnLCAncmVsZWFzZScsICdpbnN0YWxsLXJvb3QnLCAnYmluZGluZ3MnXSxcbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnYWRkb24tYnVpbGQnLCAnZGVidWcnLCAnaW5zdGFsbC1yb290JywgJ2JpbmRpbmdzJ10sXG4gICAgICBbJ21vZHVsZV9yb290JywgJ2FkZG9uLWJ1aWxkJywgJ2RlZmF1bHQnLCAnaW5zdGFsbC1yb290JywgJ2JpbmRpbmdzJ10sXG4gICAgICAvLyBub2RlLXByZS1neXAgcGF0aCAuL2xpYi9iaW5kaW5nL3tub2RlX2FiaX0te3BsYXRmb3JtfS17YXJjaH1cbiAgICAgIFsnbW9kdWxlX3Jvb3QnLCAnbGliJywgJ2JpbmRpbmcnLCAnbm9kZVByZUd5cCcsICdiaW5kaW5ncyddXG4gICAgXVxuICB9O1xuXG4vKipcbiAqIFRoZSBtYWluIGBiaW5kaW5ncygpYCBmdW5jdGlvbiBsb2FkcyB0aGUgY29tcGlsZWQgYmluZGluZ3MgZm9yIGEgZ2l2ZW4gbW9kdWxlLlxuICogSXQgdXNlcyBWOCdzIEVycm9yIEFQSSB0byBkZXRlcm1pbmUgdGhlIHBhcmVudCBmaWxlbmFtZSB0aGF0IHRoaXMgZnVuY3Rpb24gaXNcbiAqIGJlaW5nIGludm9rZWQgZnJvbSwgd2hpY2ggaXMgdGhlbiB1c2VkIHRvIGZpbmQgdGhlIHJvb3QgZGlyZWN0b3J5LlxuICovXG5cbmZ1bmN0aW9uIGJpbmRpbmdzKG9wdHMpIHtcbiAgLy8gQXJndW1lbnQgc3VyZ2VyeVxuICBpZiAodHlwZW9mIG9wdHMgPT0gJ3N0cmluZycpIHtcbiAgICBvcHRzID0geyBiaW5kaW5nczogb3B0cyB9O1xuICB9IGVsc2UgaWYgKCFvcHRzKSB7XG4gICAgb3B0cyA9IHt9O1xuICB9XG5cbiAgLy8gbWFwcyBgZGVmYXVsdHNgIG9udG8gYG9wdHNgIG9iamVjdFxuICBPYmplY3Qua2V5cyhkZWZhdWx0cykubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICBpZiAoIShpIGluIG9wdHMpKSBvcHRzW2ldID0gZGVmYXVsdHNbaV07XG4gIH0pO1xuXG4gIC8vIEdldCB0aGUgbW9kdWxlIHJvb3RcbiAgaWYgKCFvcHRzLm1vZHVsZV9yb290KSB7XG4gICAgb3B0cy5tb2R1bGVfcm9vdCA9IGV4cG9ydHMuZ2V0Um9vdChleHBvcnRzLmdldEZpbGVOYW1lKCkpO1xuICB9XG5cbiAgLy8gRW5zdXJlIHRoZSBnaXZlbiBiaW5kaW5ncyBuYW1lIGVuZHMgd2l0aCAubm9kZVxuICBpZiAocGF0aC5leHRuYW1lKG9wdHMuYmluZGluZ3MpICE9ICcubm9kZScpIHtcbiAgICBvcHRzLmJpbmRpbmdzICs9ICcubm9kZSc7XG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrL2lzc3Vlcy80MTc1I2lzc3VlY29tbWVudC0zNDI5MzEwMzVcbiAgdmFyIHJlcXVpcmVGdW5jID1cbiAgICB0eXBlb2YgX193ZWJwYWNrX3JlcXVpcmVfXyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyBfX25vbl93ZWJwYWNrX3JlcXVpcmVfX1xuICAgICAgOiByZXF1aXJlO1xuXG4gIHZhciB0cmllcyA9IFtdLFxuICAgIGkgPSAwLFxuICAgIGwgPSBvcHRzLnRyeS5sZW5ndGgsXG4gICAgbixcbiAgICBiLFxuICAgIGVycjtcblxuICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgIG4gPSBqb2luLmFwcGx5KFxuICAgICAgbnVsbCxcbiAgICAgIG9wdHMudHJ5W2ldLm1hcChmdW5jdGlvbihwKSB7XG4gICAgICAgIHJldHVybiBvcHRzW3BdIHx8IHA7XG4gICAgICB9KVxuICAgICk7XG4gICAgdHJpZXMucHVzaChuKTtcbiAgICB0cnkge1xuICAgICAgYiA9IG9wdHMucGF0aCA/IHJlcXVpcmVGdW5jLnJlc29sdmUobikgOiByZXF1aXJlRnVuYyhuKTtcbiAgICAgIGlmICghb3B0cy5wYXRoKSB7XG4gICAgICAgIGIucGF0aCA9IG47XG4gICAgICB9XG4gICAgICByZXR1cm4gYjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5jb2RlICE9PSAnTU9EVUxFX05PVF9GT1VORCcgJiZcbiAgICAgICAgICBlLmNvZGUgIT09ICdRVUFMSUZJRURfUEFUSF9SRVNPTFVUSU9OX0ZBSUxFRCcgJiZcbiAgICAgICAgICAhL25vdCBmaW5kL2kudGVzdChlLm1lc3NhZ2UpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXJyID0gbmV3IEVycm9yKFxuICAgICdDb3VsZCBub3QgbG9jYXRlIHRoZSBiaW5kaW5ncyBmaWxlLiBUcmllZDpcXG4nICtcbiAgICAgIHRyaWVzXG4gICAgICAgIC5tYXAoZnVuY3Rpb24oYSkge1xuICAgICAgICAgIHJldHVybiBvcHRzLmFycm93ICsgYTtcbiAgICAgICAgfSlcbiAgICAgICAgLmpvaW4oJ1xcbicpXG4gICk7XG4gIGVyci50cmllcyA9IHRyaWVzO1xuICB0aHJvdyBlcnI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBiaW5kaW5ncztcblxuLyoqXG4gKiBHZXRzIHRoZSBmaWxlbmFtZSBvZiB0aGUgSmF2YVNjcmlwdCBmaWxlIHRoYXQgaW52b2tlcyB0aGlzIGZ1bmN0aW9uLlxuICogVXNlZCB0byBoZWxwIGZpbmQgdGhlIHJvb3QgZGlyZWN0b3J5IG9mIGEgbW9kdWxlLlxuICogT3B0aW9uYWxseSBhY2NlcHRzIGFuIGZpbGVuYW1lIGFyZ3VtZW50IHRvIHNraXAgd2hlbiBzZWFyY2hpbmcgZm9yIHRoZSBpbnZva2luZyBmaWxlbmFtZVxuICovXG5cbmV4cG9ydHMuZ2V0RmlsZU5hbWUgPSBmdW5jdGlvbiBnZXRGaWxlTmFtZShjYWxsaW5nX2ZpbGUpIHtcbiAgdmFyIG9yaWdQU1QgPSBFcnJvci5wcmVwYXJlU3RhY2tUcmFjZSxcbiAgICBvcmlnU1RMID0gRXJyb3Iuc3RhY2tUcmFjZUxpbWl0LFxuICAgIGR1bW15ID0ge30sXG4gICAgZmlsZU5hbWU7XG5cbiAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gMTA7XG5cbiAgRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSBmdW5jdGlvbihlLCBzdCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmaWxlTmFtZSA9IHN0W2ldLmdldEZpbGVOYW1lKCk7XG4gICAgICBpZiAoZmlsZU5hbWUgIT09IF9fZmlsZW5hbWUpIHtcbiAgICAgICAgaWYgKGNhbGxpbmdfZmlsZSkge1xuICAgICAgICAgIGlmIChmaWxlTmFtZSAhPT0gY2FsbGluZ19maWxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBydW4gdGhlICdwcmVwYXJlU3RhY2tUcmFjZScgZnVuY3Rpb24gYWJvdmVcbiAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZHVtbXkpO1xuICBkdW1teS5zdGFjaztcblxuICAvLyBjbGVhbnVwXG4gIEVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gb3JpZ1BTVDtcbiAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gb3JpZ1NUTDtcblxuICAvLyBoYW5kbGUgZmlsZW5hbWUgdGhhdCBzdGFydHMgd2l0aCBcImZpbGU6Ly9cIlxuICB2YXIgZmlsZVNjaGVtYSA9ICdmaWxlOi8vJztcbiAgaWYgKGZpbGVOYW1lLmluZGV4T2YoZmlsZVNjaGVtYSkgPT09IDApIHtcbiAgICBmaWxlTmFtZSA9IGZpbGVVUkxUb1BhdGgoZmlsZU5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIGZpbGVOYW1lO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSByb290IGRpcmVjdG9yeSBvZiBhIG1vZHVsZSwgZ2l2ZW4gYW4gYXJiaXRyYXJ5IGZpbGVuYW1lXG4gKiBzb21ld2hlcmUgaW4gdGhlIG1vZHVsZSB0cmVlLiBUaGUgXCJyb290IGRpcmVjdG9yeVwiIGlzIHRoZSBkaXJlY3RvcnlcbiAqIGNvbnRhaW5pbmcgdGhlIGBwYWNrYWdlLmpzb25gIGZpbGUuXG4gKlxuICogICBJbjogIC9ob21lL25hdGUvbm9kZS1uYXRpdmUtbW9kdWxlL2xpYi9pbmRleC5qc1xuICogICBPdXQ6IC9ob21lL25hdGUvbm9kZS1uYXRpdmUtbW9kdWxlXG4gKi9cblxuZXhwb3J0cy5nZXRSb290ID0gZnVuY3Rpb24gZ2V0Um9vdChmaWxlKSB7XG4gIHZhciBkaXIgPSBkaXJuYW1lKGZpbGUpLFxuICAgIHByZXY7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgaWYgKGRpciA9PT0gJy4nKSB7XG4gICAgICAvLyBBdm9pZHMgYW4gaW5maW5pdGUgbG9vcCBpbiByYXJlIGNhc2VzLCBsaWtlIHRoZSBSRVBMXG4gICAgICBkaXIgPSBwcm9jZXNzLmN3ZCgpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBleGlzdHMoam9pbihkaXIsICdwYWNrYWdlLmpzb24nKSkgfHxcbiAgICAgIGV4aXN0cyhqb2luKGRpciwgJ25vZGVfbW9kdWxlcycpKVxuICAgICkge1xuICAgICAgLy8gRm91bmQgdGhlICdwYWNrYWdlLmpzb24nIGZpbGUgb3IgJ25vZGVfbW9kdWxlcycgZGlyOyB3ZSdyZSBkb25lXG4gICAgICByZXR1cm4gZGlyO1xuICAgIH1cbiAgICBpZiAocHJldiA9PT0gZGlyKSB7XG4gICAgICAvLyBHb3QgdG8gdGhlIHRvcFxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQ291bGQgbm90IGZpbmQgbW9kdWxlIHJvb3QgZ2l2ZW4gZmlsZTogXCInICtcbiAgICAgICAgICBmaWxlICtcbiAgICAgICAgICAnXCIuIERvIHlvdSBoYXZlIGEgYHBhY2thZ2UuanNvbmAgZmlsZT8gJ1xuICAgICAgKTtcbiAgICB9XG4gICAgLy8gVHJ5IHRoZSBwYXJlbnQgZGlyIG5leHRcbiAgICBwcmV2ID0gZGlyO1xuICAgIGRpciA9IGpvaW4oZGlyLCAnLi4nKTtcbiAgfVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/bindings@1.5.0/node_modules/bindings/bindings.js\n");

/***/ })

};
;