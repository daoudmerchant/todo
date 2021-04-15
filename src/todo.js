const todo = (function() {
    let projectArray = [
        {
            name: "default",
            color: "#000000",
            get complete() {
                return _getCompleteStatus.call(this);
            },
            get urgent() {
                return _getUrgentTodos.call(this);
            },
            get dueThisWeek() {
                return _getTodosDue.call(this);
            },
            get overdue() {
                return _getOverdueTodos.call(this);
            },
            todos: [
                {
                    name: "Buy the groceries",
                    dueDate: new Date(2021, 6, 14),
                    important: true,
                    notes: "Get a bunch of yummy food",
                    complete: false
                },
                {
                    name: "Wash the car",
                    dueDate: undefined,
                    important: false,
                    notes: undefined,
                    complete: false
                }
            ]
        },
        {

            name: "Do the cleaning",
            color: "#4245f5",
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
                {
                    name: "Tidy up my room",
                    dueDate: new Date(2021, 7, 5),
                    important: true,
                    notes: "Put the socks in the drawers, generally sort it out",
                    complete: false
                },
                {
                    name: "Do the laundry",
                    dueDate: new Date(2021, 7, 5),
                    important: false,
                    notes: "Put everything in those little baggies",
                    complete: false
                },
                {
                    name: "Wash the dishes",
                    dueDate: new Date(2021, 3, 9),
                    important: true,
                    notes: "Put the socks in the drawers, generally sort it out",
                    complete: true
                },
                {
                    name: "Vacuum clean",
                    dueDate: undefined,
                    important: true,
                    notes: undefined,
                    complete: false
                }
            ]
        }
    ];

    // methods

    function _getCompleteStatus() {
        let complete = true;
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

    // private functions

    function returnItem(projIndex, todoIndex) {
        if (todoIndex) {
            return projectArray[projIndex].todos[todoIndex];
        } else {
            return projectArray[projIndex];
        }
    };

    function returnAll() {
        return projectArray
    }

    function returnProjNames() {
        return projectArray.map(project => project.name);
    }

    function addItem(name, projIndex) {
        if (projIndex) {
            const newTodo = {
                name,
                dueDate: undefined,
                important: false,
                notes: undefined,
                complete: false
            };
            returnItem(projIndex).push(newTodo);
        } else {
            const newProject = {
                name,
                color: "#000000",
                get complete() {
                    return _getCompleteStatus.call(this);
                },
                get urgent() {
                    return _getUrgentTodos.call(this);
                },
                get dueThisWeek() {
                    return _getTodosDue.call(this);
                },
                get overdue() {
                    return _getOverdueTodos.call(this);
                },
                todos: []
            }
            returnAll().push(newProject);
        };
        return projectArray;
    }

    function editItem(attr, value, projIndex, todoIndex) {
        if (todoIndex) {
            _returnItem(projIndex, todoIndex)[attr] = value;
        } else {
            _returnItem(projIndex)[attr] = value;
        }
        return projectArray;
    }
    
    function moveItem(oldProjIndex, newProjIndex, oldTodoIndex,) {
        if (oldTodoIndex) {
            const movedTodo = _returnItem(oldProjIndex).todos.splice(oldTodoIndex, 1);
            returnItem(newProjIndex).todos.push(movedTodo);
        } // else { some code down the line to reorder projects }
        return projectArray; // or not?
    }

    function deleteItem(projIndex, todoIndex) {
        if (todoIndex) {
            returnItem(projIndex).todos.splice(todoIndex, 1);
        } else {
            returnAll().splice(projIndex, 1);
        }
        return projectArray; // or not?
    };

    // return functions

    return {
        returnItem,
        returnAll,
        returnProjNames,
        addItem,
        editItem,
        moveItem,
        deleteItem,
    }

})();

export default todo;