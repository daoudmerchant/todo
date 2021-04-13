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
            todos: []
        },
        {

            name: "Do the cleaning",
            color: "#000000",
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
                    description: "Put the socks in the drawers, generally sort it out",
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

    // project functions

    function returnAllProjects() {
        return projectArray
    }

    function addProject(name) {
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
        projectArray.push(newProject);
        return projectArray;
    }

    function editProject(i, attr, value) {
        const thisProj = projectArray[i];
        thisProj[attr] = value;
        return projectArray;
    }

    function deleteProject(i) {
        if (confirm("Are you sure you want to delete the list " +
            projectArray[i].name + "?")) {
                projectArray.splice(i, 1);
                return projectArray; // or not?
            }
    };

    function addTodo(name, projIndex) {
        const newTodo = {
            name,
            dueDate: undefined,
            important: false,
            notes: undefined,
            complete: false
        };
        if (projIndex) {
            projectArray[projIndex].push(newTodo);
        } else {
            projectArray[0].push(newTodo);
        }
    }

    // return functions

    return {
        returnAllProjects,
        addProject,
        editProject,
        deleteProject,
        addTodo,
    }

})();

export default todo;