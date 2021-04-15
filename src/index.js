import todo from "./todo.js";
import DOMtools from "./domtools.js";

// work in console

// window.todo = todo;
// window.DOMtools = DOMtools;

const submit = function(element) {

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

    function completion() {

    }

    function projectChange() {

    }

    function color() {

    }

}

const render = (function() {
    // panel element queries

    const projectPanel = document.querySelector("#projectbar");
    const todoPanel = document.querySelector("#todoview");

    // permanent project element queries

    const defaultView = document.querySelector("#default");
    const importantView = document.querySelector("#important");
    const overdueView = document.querySelector("#overdue");
    const thisWeekView = document.querySelector("#duethisweek");

    // attached event listeners

    defaultView.addEventListener("click", _viewDefault);
    importantView.addEventListener("click", _viewImportant);
    overdueView.addEventListener("click", _viewOverdue);
    thisWeekView.addEventListener("click", _viewDueThisWeek);

    // current render

    let _viewCurrent = _viewDefault;

    // view render functions

    function _viewDefault() {
        _renderPanel(todoPanel, renderAllLists, todo.returnAll(), "todos");
        _viewCurrent = _viewDefault;
    }

    function _viewImportant() {
        _renderPanel(todoPanel, renderAllLists, todo.returnAll(), "important");
        _viewCurrent = _viewImportant;
    }

    function _viewOverdue() {
        _renderPanel(todoPanel, renderAllLists, todo.returnAll(), "overdue");
        _viewCurrent = _viewOverdue;
    }

    function _viewDueThisWeek() {
        _renderPanel(todoPanel, renderAllLists, todo.returnAll(), "dueThisWeek")
        _viewCurrent = _viewDueThisWeek;
    }

    function _viewProject(i) {
        function _selectProject(index) {
            const projects = document.querySelectorAll(".project");
            projects.item(index - 1).classList.add("selected")
        }
        _renderPanel(todoPanel, renderList, todo.returnItem(i).todos, i, todo.returnItem(i).color)
        _selectProject(i);
        _viewCurrent = () => _viewProject(i);
    }

    function _viewProjectList() {
        _renderPanel(projectPanel, renderList, todo.returnAll());
    }

    // page rendering functions

    function _renderPanel(panel, ...args) { // runs function and adds new box
        
        function _addNewButton(panel, index = undefined) {
            const container = DOMtools.returnElement({
                type: "div",
                class_es: "box container new"
            });
            const newNameInput = DOMtools.returnElement({
                type: "input",
                class_es: "text textinput",
                attribute: {
                    type: "text",
                    placeholder: "+ add new",
                    "data-projectindex": index
                }
            });
            newNameInput.addEventListener("focusout", submit.name);
            panel.appendChild(container);
        }

        DOMtools.clearAndRender(panel, ...args);
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



    // public

    function renderView(element) {
        _viewProjectList(); // always redraw project bar
        if (element.hasAttribute("id")) { // not a project
            switch (element.id) {
                case "default" :
                    _viewDefault();
                    break;
                case "important" :
                    _viewImportant();
                    break;
                case "overdue" :
                    _viewOverdue();
                    break;
                case "duethisweek" :
                    _viewDueThisWeek();
                    break;
            }
        } else { // is project
            _viewProject(element.dataset.projectindex);
        }
    }

    function renderCurrent() {
        _viewProjectList();
        _viewCurrent()
    }

    return {
        renderView,
        renderCurrent
    }
})();

function renderList(panel, array, color, projIndex) { // last two parameters optional

    // element creation functions

    function createContainer(obj, i) {
        const container = DOMtools.returnElement({
            type: "div",
            class_es: (obj.complete) ? "container complete" : "container",
            // attribute: {
            //     "data-projectindex": (projIndex) ? projIndex : i
            // }
        });
        // test 1
        container.setAttribute("data-projectindex", (projIndex) ? projIndex : i);
        // test 2
        // DOMtools.setAttributes(container, {
        //     "data-projectindex": (projIndex) ? projIndex : i
        // });
        //
        if (projIndex) {
            container.setAttribute("data-todoindex", i);
        }
        return container;
    }

    function createColorPicker(color) { // send obj.color
        const colorPicker = DOMtools.returnElement({
            type: "input",
            attribute: {
                type: "color",
                value: color
            }
        });
        // colorPicker.addEventListener("input", submitAndRerender)
    }

    function createCheckbox(complete) { // requires id and name to submit correctly?
        const checkbox = DOMtools.returnElement({
            type: "input",
            attribute: {
                type: "checkbox"
            }
        });
        if (complete) {
            checkbox.checked = "true"
        }
    }

    function createName(obj) {
        const nameText = DOMtools.returnElement({
            type: "p",
            class_es: "text name",
            text: obj.name,
            attribute: {
                style: (color) ? `color:${color}` : `color:${obj.color}`
            }
        })
        nameText.addEventListener("dblclick", toggleInput)
        if (!projIndex) { // is a project
            nameText.addEventListener("click", render.renderView(this));
        }
        return nameText;
    }

    function createNameInput(name) { // send obj.name
        const nameText = DOMtools.returnElement({
            type: "input",
            class_es: "text textinput hidden",
            attribute: {
                type: "text",
                spellcheck: "false",
                value: name
            }
        });

        return nameText;
    }

    function createSelectBox() {
        const selectContainer = DOMtools.returnElement({
            type: "select",
            class_es: "text select"
        });
        todo.returnProjNames().forEach((project, i) => {
            const option = DOMtools.returnElement({
                type: "option",
                text: project,
                attribute: {
                    value: i
                }
            })
            if (i == projIndex) {
                option.selected = "selected";
            }
            selectContainer.appendChild(option);
        })
        return selectContainer;
    }

    function createNotesIcon() {
        const notesIcon = DOMtools.returnElement({
            type: "p",
            class_es: "notes",
            text: "☰"
        })
        notesIcon.addEventListener("click", toggleNotesAndSubmit);
        return notesIcon;
    }

    function createImportantIcon(importance) { // send obj.important
        return DOMtools.returnElement({
            type: "p",
            class_es: (importance) ? "importance urgent" : "importance",
            text: "!"
        })
    }

    function createDateInput(obj) {
        const dateInput = DOMtools.returnElement({
            type: "input",
            class_es: "textinput",
            attribute: {
                type: "date"
            }
        });
        if (obj.dueDate) {
            dateInput.setAttribute("value", obj.dueDate);
        }

    }

    function createDeleteKey() {
        const deleteKey = DOMtools.returnElement({
            type: "div",
            class_es: "delete",
            text: "✖"
        });
        // deleteKey.addEventListener("click", submitAndRerender);
        return deleteKey;
    };

    function createNotesBox(notes) { // send obj.notes
        const notesBox = DOMtools.returnElement({
            type: "textarea",
            class_es: "textarea hidden",
            text: notes,
            attribute: {
                rows: "6",
                spellcheck: "false"
            }
        })
        notesBox.addEventListener("focusout", submit)
    }

    // event listener functions

    // function submitAndRerender() {
    //     submit(this);
    //     render.renderCurrent();
    // }

    function toggleNotesAndSubmit() {
        const notes = this.parentElement.lastChild;

        if (notes.classList.contains("hidden")) { // click to reveal
            notes.classList.remove("hidden");
        } else { // click to hide and (submit contents)
            submit.call(notes); // (UNSURE)
            notes.classList.add("hidden")
        }
    }

    function toggleInput() {
        this.classList.add("hidden");
        this.nextElementSibling.classList.remove("hidden");
    }

    // draw list

    if (projIndex) { // list of todos
        array.forEach((obj, i) => {
            const outerContainer = createContainer(obj, i).className = "box"; // overwrite class
            const innerContainer = createContainer(obj, i);
            DOMtools.appendChildren(
                innerContainer,
                createCheckbox(obj.complete),
                createName(obj),
                createNameInput(obj.name),
                createSelectBox(),
                createNotesIcon(),
                createImportantIcon(obj.important),
                createDateInput(),
                createDeleteKey(),
            );
            DOMtools.appendChildren(
                outerContainer,
                innerContainer,
                createNotesBox(obj.notes)
            )
            panel.appendChild(outerContainer);
        });
    } else { // list of projects
        array.forEach((obj, i) => {
            const container = createContainer(obj, i).classList.add("box", "project");
            DOMtools.appendChildren(
                container,
                createColorPicker(obj.color),
                createName(obj),
                createNameInput(obj.name),
                createDeleteKey()
            )
        });
    }
}