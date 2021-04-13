/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ \"./src/todo.js\");\n\n\n// work in console\n\nwindow.todo = _todo_js__WEBPACK_IMPORTED_MODULE_0__.default;\n\n//# sourceURL=webpack://todo/./src/index.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst todo = (function() {\n    let projectArray = [\n        {\n            name: \"default\",\n            color: \"#000000\",\n            get complete() {\n                return _getCompleteStatus.call(this);\n            },\n            get urgent() {\n                return _getUrgentTodos.call(this);\n            },\n            get dueThisWeek() {\n                return _getTodosDue.call(this);\n            },\n            get overdue() {\n                return _getOverdueTodos.call(this);\n            },\n            todos: []\n        },\n        {\n\n            name: \"Do the cleaning\",\n            color: \"#000000\",\n            get complete() {\n                return _getCompleteStatus.call(this);\n            },\n            get important() {\n                return _getImportantTodos.call(this);\n            },\n            get dueThisWeek() {\n                return _getTodosDue.call(this);\n            },\n            get overdue() {\n                return _getOverdueTodos.call(this);\n            },\n            todos: [\n                {\n                    name: \"Tidy up my room\",\n                    dueDate: new Date(2021, 7, 5),\n                    important: true,\n                    description: \"Put the socks in the drawers, generally sort it out\",\n                    complete: false\n                }\n            ]\n        }\n    ];\n\n    // methods\n\n    function _getCompleteStatus() {\n        let complete = true;\n        this.todos.forEach(todo => {\n            if (todo.complete === false) {\n                complete = false;\n            }\n        });\n        return complete;\n    };\n\n    function _getImportantTodos() {\n        return this.todos.filter(todo => todo.important === true);\n    };\n\n    function _getTodosDue() {\n        const today = new Date();\n        const weekFromNow = new Date(\n            today.getFullYear(),\n            today.getMonth(),\n            today.getDate() + 7\n        );\n        return this.todos.filter(todo => {\n            return (todo.dueDate > today) && (todo.dueDate < weekFromNow);\n        })\n    };\n\n    function _getOverdueTodos() {\n        const today = new Date();\n        return this.todos.filter(todo => todo.dueDate < today);\n    };\n\n    // project functions\n\n    function returnAllProjects() {\n        return projectArray\n    }\n\n    function addProject(name) {\n        const newProject = {\n            name,\n            color: \"#000000\",\n            get complete() {\n                return _getCompleteStatus.call(this);\n            },\n            get urgent() {\n                return _getUrgentTodos.call(this);\n            },\n            get dueThisWeek() {\n                return _getTodosDue.call(this);\n            },\n            get overdue() {\n                return _getOverdueTodos.call(this);\n            },\n            todos: []\n        }\n        projectArray.push(newProject);\n        return projectArray;\n    }\n\n    function editProject(i, attr, value) {\n        const thisProj = projectArray[i];\n        thisProj[attr] = value;\n        return projectArray;\n    }\n\n    function deleteProject(i) {\n        if (confirm(\"Are you sure you want to delete the list \" +\n            projectArray[i].name + \"?\")) {\n                projectArray.splice(i, 1);\n                return projectArray; // or not?\n            }\n    };\n\n    function addTodo(name, projIndex) {\n        const newTodo = {\n            name,\n            dueDate: undefined,\n            important: false,\n            notes: undefined,\n            complete: false\n        };\n        if (projIndex) {\n            projectArray[projIndex].push(newTodo);\n        } else {\n            projectArray[0].push(newTodo);\n        }\n    }\n\n    // return functions\n\n    return {\n        returnAllProjects,\n        addProject,\n        editProject,\n        deleteProject,\n        addTodo,\n    }\n\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todo);\n\n//# sourceURL=webpack://todo/./src/todo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;