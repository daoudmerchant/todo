import todo from "./todo.js";
import DOMtools from "./domtools.js";

// work in console

window.todo = todo;
window.DOMtools = DOMtools;

const submit = (function() {
    function name() {
        const newName = this.value;
        const projIndex = this.dataset.projectindex;
        if (!this.hasAttribute("data-todoindex")) { // no todo index attribute, is a new box
            if (projIndex) { // project index, is a new todo
                todo.addItem(newName, projIndex);
            } else { // no project index, is a new project
                todo.addItem(newName);
            }
        } else { // has own todo index attribute, is an edited box
            const todoIndex = this.dataset.todoindex;
            if (todoIndex) { // has valid todo index, is an edited todo
                todo.editItem("name", newName, projIndex, todoIndex);
            } else { // has todo index attribute of null, is an edited project
                todo.editItem("name", newName, projIndex);
            }
        }
    };

    function deletion() {
        if (this.hasAttribute("data-todoindex")) {
            todo.deleteItem(this.dataset.projectindex, this.dataset.todoindex);
        } else {
            todo.deleteItem(this.dataset.projectindex);
        }
    }

    function projectChange() {

    }

    function color() {

    }

    return {
        name,
        deletion,
        projectChange,
        color
    }
})();

const renderPage = (function() {
    // element queries

    const projectPanel = document.querySelector("#projectbar");
    const todoPanel = document.querySelector("#todoview");
    const defaultView = document.querySelector("#default");
    const importantView = document.querySelector("#important");
    const overdueView = document.querySelector("#overdue");
    const thisWeekView = document.querySelector("#duethisweek");

    // view render functions

    function _renderPanel(panel, ...args) { // runs function and adds new box
        DOMtools.rerender(panel, ...args);
        const lastArg = args[args.length - 1];
        if (typeof(lastArg) === "number") { // is an index
            _addNewButton(panel, lastArg)
        } else {
            _addNewButton(panel);
        }
    }

    // projectPanel or to view specific project, e.g.
    //   _renderPanel(todoPanel, renderList, projectArray[1].todos, 1)
    //      - renders first user project
    //   _renderPanel(projectPanel, renderList, projectArray)
    //      - renders project panel

    function renderAllLists(panel, array, attr) {
        array.forEach((project, i) => renderList(panel, project[attr], project.color, i))
    }

    // To get default view:
    
    //     _renderPanel(todoPanel, renderAllLists, projectArray, todos)

    // runs:

    //     DOMtools.rerender(todoPanel, renderAllLists, projectArray, todos)
        
    // which empties the todoPanel and then runs:

    //     renderAllLists(todoPanel, projectArray, todos)

    // which runs for each project of the projectArray:

    //     renderList(todoPanel, project[todos], i, project.color)

    // filling the todoPanel before adding a new button



    // To fill the project bar:

    //     _renderPanel(projectPanel, renderList, projectArray)

    // runs:

    //     DOMtools.rerender(projectPanel, renderList, projectArray)

    // which empties the projectPanel and then runs:

    //     renderList(projectPanel, projectArray)

    // filling the projectPanel before adding a new button

    // important: DOMtools.rerender(todoPanel, renderAllLists, projectArray, important)
    // overdue: DOMtools.rerender(todoPanel, renderAllLists, projectArray, overdue)
    // dueThisWeek: DOMtools.rerender(todoPanel, renderAllLists, projectArray, dueThisWeek)
    // specific project: _renderPanel(todoPanel, renderList, project.todos, projIndex, project.color)

    function addNewButton(panel, index = undefined) {
        const container = DOMtools.createElement({
            type: "div",
            class_es: "box container new"
        });
        const newNameInput = DOMtools.createElement({
            type: "input",
            class_es: "text textinput",
            attribute: {
                type: "text",
                placeholder: "+ add new",
                "data-projectindex": index
            }
        });
        newNameInput.addEventListener("focusout", submit.name);
    }

    function renderList(panel, array, color, projIndex) { // last two parameters optional
        // gets name from name attribute of each object
    }

})();