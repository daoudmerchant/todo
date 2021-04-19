const todo = (function() {
    let projectArray = [
        {
            name: "-- default --",
            color: "#000000",
            get outstanding() {
                return _getOutstandingTodos.call(this);
            },
            get complete() {
                return _getCompleteStatus.call(this);
            },
            get important() {
                return _getImportantTodos.call(this);
            },
            get dueThisWeek() {
                return _getTodosDue.call(this);
            },
            get overdue() {
                return _getOverdueTodos.call(this);
            },
            todos: [
        //         {
        //             name: "Buy the groceries",
        //             dueDate: new Date(2021, 6, 14),
        //             important: true,
        //             notes: "Get a bunch of yummy food",
        //             complete: false
        //         },
        //         {
        //             name: "Wash the dog",
        //             dueDate: undefined,
        //             important: false,
        //             notes: undefined,
        //             complete: false
        //         }
            ]
        },
        // {

        //     name: "Do the cleaning",
        //     color: "#4245f5",
        //     get outstanding() {
        //         return _getOutstandingTodos.call(this);
        //     },
        //     get complete() {
        //         return _getCompleteStatus.call(this);
        //     },
        //     get important() {
        //         return _getImportantTodos.call(this);
        //     },
        //     get dueThisWeek() {
        //         return _getTodosDue.call(this);
        //     },
        //     get overdue() {
        //         return _getOverdueTodos.call(this);
        //     },
        //     todos: [
        //         {
        //             name: "Tidy up my room",
        //             dueDate: new Date(2021, 3, 21),
        //             important: true,
        //             notes: "Put the socks in the drawers, generally sort it out",
        //             complete: false
        //         },
        //         {
        //             name: "Do the laundry",
        //             dueDate: new Date(2021, 7, 5),
        //             important: false,
        //             notes: "Put everything in those little baggies",
        //             complete: false
        //         },
        //         {
        //             name: "Wash the dishes",
        //             dueDate: new Date(2021, 3, 9),
        //             important: true,
        //             notes: "Put the socks in the drawers, generally sort it out",
        //             complete: true
        //         },
        //         {
        //             name: "Vacuum clean",
        //             dueDate: undefined,
        //             important: true,
        //             notes: undefined,
        //             complete: false
        //         }
        //     ]
        // },
        // {

        //     name: "Learn French",
        //     color: "#f57e42",
        //     get outstanding() {
        //         return _getOutstandingTodos.call(this);
        //     },
        //     get complete() {
        //         return _getCompleteStatus.call(this);
        //     },
        //     get important() {
        //         return _getImportantTodos.call(this);
        //     },
        //     get dueThisWeek() {
        //         return _getTodosDue.call(this);
        //     },
        //     get overdue() {
        //         return _getOverdueTodos.call(this);
        //     },
        //     todos: [
        //         {
        //             name: "Learn verbs",
        //             dueDate: new Date(2021, 7, 5),
        //             important: true,
        //             notes: "Put the socks in the drawers, generally sort it out",
        //             complete: false
        //         },
        //         {
        //             name: "Learn nouns",
        //             dueDate: new Date(2021, 7, 5),
        //             important: false,
        //             notes: "Put everything in those little baggies",
        //             complete: false
        //         },
        //         {
        //             name: "Learn adjectives",
        //             dueDate: new Date(2021, 3, 9),
        //             important: true,
        //             notes: "Put the socks in the drawers, generally sort it out",
        //             complete: true
        //         },
        //         {
        //             name: "Learn talk gud",
        //             dueDate: undefined,
        //             important: true,
        //             notes: undefined,
        //             complete: false
        //         }
        //     ]
        // }
    ];

    // methods

    function _getOutstandingTodos() {
        return this.todos.filter(todo => todo.complete === false);
    }

    function _getCompleteStatus() {
        let complete;
        if (this.todos.length === 0) {
            complete = false;
        } else {
            complete = true;
        }
        this.todos.forEach(todo => {
            if (todo.complete === false) {
                complete = false;
            }
        });
        return complete;
    };

    function _getImportantTodos() {
        return this.todos.filter(todo => todo.important === true);
    };

    function _getTodosDue() {
        const today = new Date();
        const weekFromNow = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 7
        );
        return this.todos.filter(todo => {
            return (todo.dueDate > today) && (todo.dueDate < weekFromNow);
        })
    };

    function _getOverdueTodos() {
        const today = new Date();
        return this.todos.filter(todo => todo.dueDate < today);
    };

    // public functions

    function returnItem(projIndex, todoIndex = null) {
        if (todoIndex !== null) {
            console.log(projectArray[projIndex].todos[todoIndex]);
            return projectArray[projIndex].todos[todoIndex];
        } else {
            return projectArray[projIndex];
        }
    };

    function returnAll() {
        return projectArray
    }

    function exportAll() {
        const exportArray = projectArray.map(project => {
            return ({
                name: project.name,
                color: project.color,
                todos: project.todos
            })
        })
        console.log(exportArray);
        return exportArray;
    }

    function importAll(userArray) {
        console.log(userArray);
        const importArray = userArray.map(project => {
            return ({
                name: project.name,
                color: project.color,
                get outstanding() {
                    return _getOutstandingTodos.call(this);
                },
                get complete() {
                    return _getCompleteStatus.call(this);
                },
                get important() {
                    return _getImportantTodos.call(this);
                },
                get dueThisWeek() {
                    return _getTodosDue.call(this);
                },
                get overdue() {
                    return _getOverdueTodos.call(this);
                },
                todos: project.todos
            })
        });
        console.log(importArray);
        projectArray = importArray;
    }

    function setAll(array) {
        array.forEach((project, i) => {
            const thisProj = projectArray[i];
            thisProj.name = project.name;
            thisProj.color = project.color;
            thisProj.todos = project.todos;
        });
    }

    function returnProjNames() {
        return projectArray.map(project => project.name);
    }

    function addItem(name, projIndex = null) {
        if (projIndex !== null) {
            const newTodo = {
                name,
                dueDate: undefined,
                important: false,
                notes: undefined,
                complete: false
            };
            returnItem(projIndex).todos.push(newTodo);
        } else {
            const newProject = {
                name,
                color: "#000000",
                get outstanding() {
                    return _getOutstandingTodos.call(this);
                },
                get complete() {
                    return _getCompleteStatus.call(this);
                },
                get important() {
                    return _getImportantTodos.call(this);
                },
                get dueThisWeek() {
                    return _getTodosDue.call(this);
                },
                get overdue() {
                    return _getOverdueTodos.call(this);
                },
                todos: []
            }
            projectArray.push(newProject);
            return (projectArray.length - 1); // index of new project
        };
    }

    function editItem(attr, value, projIndex, todoIndex = null) {
        if (todoIndex !== null) {
            const thisTodo = returnItem(projIndex, todoIndex);
            console.log(thisTodo);
            thisTodo[attr] = value;
        } else {
            const thisProj = returnItem(projIndex);
            thisProj[attr] = value;
        }
    }
    
    function moveItem(oldProjIndex, newProjIndex, oldTodoIndex = null) {
        if (oldTodoIndex !== null) {
            const oldProj = returnItem(oldProjIndex);
            let movedTodo;
            [movedTodo] = oldProj.todos.splice(oldTodoIndex, 1);
            const newProj = returnItem(newProjIndex);
            newProj.todos.push(movedTodo);
        } // else { some code down the line to reorder projects }
    }

    function deleteItem(projIndex, todoIndex = null) {
        if (todoIndex !== null) {
            returnItem(projIndex).todos.splice(todoIndex, 1);
        } else {
            projectArray.splice(projIndex, 1);
        }
    };

    // return functions

    return {
        returnItem,
        returnAll,
        exportAll,
        importAll,
        returnProjNames,
        addItem,
        editItem,
        moveItem,
        deleteItem,
    }

})();

export default todo;