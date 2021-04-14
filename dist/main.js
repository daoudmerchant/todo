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

/***/ "./src/domtools.js":
/*!*************************!*\
  !*** ./src/domtools.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// yes I'm very aware that the below is just a quick fix\n// before the React module\n\nconst DOMtools = (function() {\n    function _emptyElement(parent) {\n        while (parent.firstChild) {\n            parent.remove(parent.lastChild);\n        }\n    }\n\n    function createElement(obj) {\n\n        // parameter object can contain maximum:\n        //     type: ...\n        //     class_es: ...\n        //     text: ...\n        //     attribute: [\n        //         [type, ...],\n        //         [placeholder, ...],\n        //         [name, ...],\n        //         [value, ...],\n        //         [color, ...],\n        //         [data-projIndex, ...],\n        //         [data-todoIndex, ...]\n        //     ]\n\n        const newElement = document.createElement(type);\n        if (obj.hasOwnProperty(\"class_es\")) {\n            newElement.className = obj.class_es;\n        }\n        if (obj.hasOwnProperty(\"text\")) {\n            newElement.textContent = obj.text;\n        }\n        if (obj.hasOwnProperty(\"attribute\")) {\n            const entries = Object.entries(obj);\n            for (const [attr, value] of entries) {\n                newElement.setAttribute(attr, value);\n            };\n        }        \n    }\n\n    function appendChildren(parent, ...children) {\n        children.forEach(child => parent.appendChild(child));\n    }\n\n    function rerender(parent, callback, ...parameters) {\n        _emptyElement(parent);\n        callback(parent, ...parameters);\n    }\n\n    return {\n        createElement,\n        appendChildren,\n        rerender\n    }\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMtools);\n\n//# sourceURL=webpack://todo/./src/domtools.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ \"./src/todo.js\");\n/* harmony import */ var _domtools_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domtools.js */ \"./src/domtools.js\");\n\n\n\n// work in console\n\nwindow.todo = _todo_js__WEBPACK_IMPORTED_MODULE_0__.default;\nwindow.DOMtools = _domtools_js__WEBPACK_IMPORTED_MODULE_1__.default;\n\nconst submit = (function() {\n    function name() {\n        const newName = this.value;\n        const projIndex = this.dataset.projectindex;\n        if (!this.hasAttribute(\"data-todoindex\")) { // no todo index attribute, is a new box\n            if (projIndex) { // project index, is a new todo\n                _todo_js__WEBPACK_IMPORTED_MODULE_0__.default.addItem(newName, projIndex);\n            } else { // no project index, is a new project\n                _todo_js__WEBPACK_IMPORTED_MODULE_0__.default.addItem(newName);\n            }\n        } else { // has own todo index attribute, is an edited box\n            const todoIndex = this.dataset.todoindex;\n            if (todoIndex) { // has valid todo index, is an edited todo\n                _todo_js__WEBPACK_IMPORTED_MODULE_0__.default.editItem(\"name\", newName, projIndex, todoIndex);\n            } else { // has todo index attribute of null, is an edited project\n                _todo_js__WEBPACK_IMPORTED_MODULE_0__.default.editItem(\"name\", newName, projIndex);\n            }\n        }\n    };\n\n    function deletion() {\n        if (this.hasAttribute(\"data-todoindex\")) {\n            _todo_js__WEBPACK_IMPORTED_MODULE_0__.default.deleteItem(this.dataset.projectindex, this.dataset.todoindex);\n        } else {\n            _todo_js__WEBPACK_IMPORTED_MODULE_0__.default.deleteItem(this.dataset.projectindex);\n        }\n    }\n\n    function projectChange() {\n\n    }\n\n    function color() {\n\n    }\n\n    return {\n        name,\n        deletion,\n        projectChange,\n        color\n    }\n})();\n\nconst renderPage = (function() {\n    // element queries\n\n    const projectPanel = document.querySelector(\"#projectbar\");\n    const todoPanel = document.querySelector(\"#todoview\");\n    const defaultView = document.querySelector(\"#default\");\n    const importantView = document.querySelector(\"#important\");\n    const overdueView = document.querySelector(\"#overdue\");\n    const thisWeekView = document.querySelector(\"#duethisweek\");\n\n    // view render functions\n\n    function _renderPanel(panel, ...args) { // runs function and adds new box\n        _domtools_js__WEBPACK_IMPORTED_MODULE_1__.default.rerender(panel, ...args);\n        const lastArg = args[args.length - 1];\n        if (typeof(lastArg) === \"number\") { // is an index\n            _addNewButton(panel, lastArg)\n        } else {\n            _addNewButton(panel);\n        }\n    }\n\n    // projectPanel or to view specific project, e.g.\n    //   _renderPanel(todoPanel, renderList, projectArray[1].todos, 1)\n    //      - renders first user project\n    //   _renderPanel(projectPanel, renderList, projectArray)\n    //      - renders project panel\n\n    function renderAllLists(panel, array, attr) {\n        array.forEach((project, i) => renderList(panel, project[attr], project.color, i))\n    }\n\n    // To get default view:\n    \n    //     _renderPanel(todoPanel, renderAllLists, projectArray, todos)\n\n    // runs:\n\n    //     DOMtools.rerender(todoPanel, renderAllLists, projectArray, todos)\n        \n    // which empties the todoPanel and then runs:\n\n    //     renderAllLists(todoPanel, projectArray, todos)\n\n    // which runs for each project of the projectArray:\n\n    //     renderList(todoPanel, project[todos], i, project.color)\n\n    // filling the todoPanel before adding a new button\n\n\n\n    // To fill the project bar:\n\n    //     _renderPanel(projectPanel, renderList, projectArray)\n\n    // runs:\n\n    //     DOMtools.rerender(projectPanel, renderList, projectArray)\n\n    // which empties the projectPanel and then runs:\n\n    //     renderList(projectPanel, projectArray)\n\n    // filling the projectPanel before adding a new button\n\n    // important: DOMtools.rerender(todoPanel, renderAllLists, projectArray, important)\n    // overdue: DOMtools.rerender(todoPanel, renderAllLists, projectArray, overdue)\n    // dueThisWeek: DOMtools.rerender(todoPanel, renderAllLists, projectArray, dueThisWeek)\n    // specific project: _renderPanel(todoPanel, renderList, project.todos, projIndex, project.color)\n\n    function addNewButton(panel, index = undefined) {\n        const container = _domtools_js__WEBPACK_IMPORTED_MODULE_1__.default.createElement({\n            type: \"div\",\n            class_es: \"box container new\"\n        });\n        const newNameInput = _domtools_js__WEBPACK_IMPORTED_MODULE_1__.default.createElement({\n            type: \"input\",\n            class_es: \"text textinput\",\n            attribute: {\n                type: \"text\",\n                placeholder: \"+ add new\",\n                \"data-projectindex\": index\n            }\n        });\n        newNameInput.addEventListener(\"focusout\", submit.name);\n    }\n\n    function renderList(panel, array, color, projIndex) { // last two parameters optional\n        // gets name from name attribute of each object\n    }\n\n})();\n\n//# sourceURL=webpack://todo/./src/index.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst todo = (function() {\n    let projectArray = [\n        {\n            name: \"default\",\n            color: \"#000000\",\n            get complete() {\n                return _getCompleteStatus.call(this);\n            },\n            get urgent() {\n                return _getUrgentTodos.call(this);\n            },\n            get dueThisWeek() {\n                return _getTodosDue.call(this);\n            },\n            get overdue() {\n                return _getOverdueTodos.call(this);\n            },\n            todos: []\n        },\n        {\n\n            name: \"Do the cleaning\",\n            color: \"#000000\",\n            get complete() {\n                return _getCompleteStatus.call(this);\n            },\n            get important() {\n                return _getImportantTodos.call(this);\n            },\n            get dueThisWeek() {\n                return _getTodosDue.call(this);\n            },\n            get overdue() {\n                return _getOverdueTodos.call(this);\n            },\n            todos: [\n                {\n                    name: \"Tidy up my room\",\n                    dueDate: new Date(2021, 7, 5),\n                    important: true,\n                    notes: \"Put the socks in the drawers, generally sort it out\",\n                    complete: false\n                }\n            ]\n        }\n    ];\n\n    // methods\n\n    function _getCompleteStatus() {\n        let complete = true;\n        this.todos.forEach(todo => {\n            if (todo.complete === false) {\n                complete = false;\n            }\n        });\n        return complete;\n    };\n\n    function _getImportantTodos() {\n        return this.todos.filter(todo => todo.important === true);\n    };\n\n    function _getTodosDue() {\n        const today = new Date();\n        const weekFromNow = new Date(\n            today.getFullYear(),\n            today.getMonth(),\n            today.getDate() + 7\n        );\n        return this.todos.filter(todo => {\n            return (todo.dueDate > today) && (todo.dueDate < weekFromNow);\n        })\n    };\n\n    function _getOverdueTodos() {\n        const today = new Date();\n        return this.todos.filter(todo => todo.dueDate < today);\n    };\n\n    // private functions\n\n    function _returnItem(projIndex, todoIndex) {\n        if (todoIndex) {\n            return projectArray[projIndex].todos[todoIndex];\n        } else {\n            return projectArray[projIndex];\n        }\n    };\n\n    // universal functions\n\n    function returnAll() {\n        return projectArray\n    }\n\n    function addItem(name, projIndex) {\n        if (projIndex) {\n            const newTodo = {\n                name,\n                dueDate: undefined,\n                important: false,\n                notes: undefined,\n                complete: false\n            };\n            _returnItem(projIndex).push(newTodo);\n        } else {\n            const newProject = {\n                name,\n                color: \"#000000\",\n                get complete() {\n                    return _getCompleteStatus.call(this);\n                },\n                get urgent() {\n                    return _getUrgentTodos.call(this);\n                },\n                get dueThisWeek() {\n                    return _getTodosDue.call(this);\n                },\n                get overdue() {\n                    return _getOverdueTodos.call(this);\n                },\n                todos: []\n            }\n            returnAll().push(newProject);\n        };\n        return projectArray;\n    }\n\n    function editItem(attr, value, projIndex, todoIndex) {\n        if (todoIndex) {\n            _returnItem(projIndex, todoIndex)[attr] = value;\n        } else {\n            _returnItem(projIndex)[attr] = value;\n        }\n        return projectArray;\n    }\n    \n    function moveItem(oldProjIndex, newProjIndex, oldTodoIndex,) {\n        if (oldTodoIndex) {\n            const movedTodo = _returnItem(oldProjIndex).todos.splice(oldTodoIndex, 1);\n            _returnItem(newProjIndex).todos.push(movedTodo);\n        } // else { some code down the line to reorder projects }\n        return projectArray; // or not?\n    }\n\n    function deleteItem(projIndex, todoIndex) {\n        if (todoIndex) {\n            _returnItem(projIndex).todos.splice(todoIndex, 1);\n        } else {\n            _returnAll().splice(projIndex, 1);\n        }\n        return projectArray; // or not?\n    };\n\n    // return functions\n\n    return {\n        returnAll,\n        addItem,\n        editItem,\n        moveItem,\n        deleteItem,\n    }\n\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todo);\n\n//# sourceURL=webpack://todo/./src/todo.js?");

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