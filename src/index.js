import todo from "./todo.js";
import DOMtools from "./domtools.js";

// work in console

window.todo = todo;
window.DOMtools = DOMtools;

const submit = function(element) {

    console.log("Submit running");
    const parent = element.parentElement;

    const projIndex = Number(parent.dataset.projectindex);
    const todoIndex = (parent.hasAttribute("data-todoindex")) ?
        Number(parent.dataset.todoindex) : undefined;

    if (element.getAttribute("type") === "color") { // color input
        todo.editItem("color", element.value, projIndex + 1);
    } else if (element.getAttribute("type") === "checkbox") { // checkbox
        if (element.checked) {
            todo.editItem("complete", true, projIndex, todoIndex);
        } else {
            todo.editItem("complete", false, projIndex, todoIndex);
        }
    } else if (element.getAttribute("type") === "text") { // text input
        if (!todoIndex) { // no todo index attribute, is a new box
            if (projIndex !== "null") { // project index, is a new todo
                todo.addItem(element.value, projIndex);
            } else { // no project index, is a new project
                todo.addItem(element.value);
            }
        } else { // has own todo index attribute, is an edited box
            if (todoIndex === "null") { // is an edited project
                todo.editItem("name", element.value, (projIndex + 1));
            } else { // has valid todo index, is an edited todo
                todo.editItem("name", element.value, projIndex, todoIndex);
            }
        }
    } else if (element.tagName === "SELECT") { // select box
        todo.moveItem(projIndex, element.value, todoIndex);
    } else if (element.textContent === "!") {
        const newImportance = (element.dataset.importance !== "true");
        todo.editItem("important", newImportance, projIndex, todoIndex);
    } else if (element.getAttribute("type") === "date") { // date box
        todo.editItem("dueDate", new Date(element.value), projIndex, todoIndex);
    } else if (element.textContent === "✖") { // delete button
        if (todoIndex.toString() === "NaN") {
            if (confirm("Delete todo list?")) {
                todo.deleteItem(projIndex + 1);
            }
        } else {
            if (confirm("Delete todo item?")) {
                todo.deleteItem(projIndex, todoIndex);
            }
        }
    }
    // else if (element.tagName === "TEXTAREA") { // notes
    //     todo.editItem("notes", element.value, projIndex, todoIndex);
    // }



    // new project container:
    //  - project index: undefined
    //  - no todo index
    // new todo container:
    //  - project index: always something, even 0
    //  - no todo index
    // edited project container:
    //  - project-index: index of project - 1
    //  - todo index of "null"
    // edited todo container:
    //  - project index: index
    //  - todo index: index
}

// const render = (function() {
    // panel element queries

    const projectPanel = document.querySelector("#projectbar");
    const todoPanel = document.querySelector("#todoview");

    // permanent project element queries

    const defaultView = document.querySelector("#default");
    const importantView = document.querySelector("#important");
    const overdueView = document.querySelector("#overdue");
    const thisWeekView = document.querySelector("#duethisweek");

    // attached event listeners

    defaultView.addEventListener("click", renderView);
    importantView.addEventListener("click", renderView);
    overdueView.addEventListener("click", renderView);
    thisWeekView.addEventListener("click", renderView);

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
            console.log(projects);
            const thisProjBar = projects.item(index - 1);
            console.log(thisProjBar);
            // thisProjBar.classList.add("selected")
        }
        const thisProj = todo.returnItem(i);
        _renderPanel(todoPanel, renderList, thisProj.todos, thisProj.color, i)
        _selectProject(i);
        _viewCurrent = () => _viewProject(i);
    }

    function _viewProjectList() {
        const userProjects = todo.returnAll().slice(1);
        console.log(typeof(userProjects));
        _renderPanel(projectPanel, renderList, userProjects);
    }

    // page rendering functions

    function _renderPanel(panel, callback, ...args) { // runs function and adds new box
        
        function _addNewButton(panel, index = null) {
            const container = DOMtools.returnElement({
                type: "div",
                class: "box container new",
                attribute: {
                    "data-projectindex": index
                }
            });
            const newNameInput = DOMtools.returnElement({
                type: "input",
                class: "text textinput",
                attribute: {
                    type: "text",
                    placeholder: "+ add new",
                    spellcheck: "false",
                }
            });
            container.appendChild(newNameInput);
            // newNameInput.addEventListener("focusout", submit.name);
            panel.appendChild(container);
        }

        DOMtools.clearAndRender(panel, callback, ...args);
        const lastArg = args[args.length - 1];
        if (lastArg === "todos") { // default view
            _addNewButton(panel, 0)
        } else if (typeof(lastArg) === "number") { // view a project
            _addNewButton(panel, lastArg);
        } else if (typeof(lastArg) === "object") { // project bar
            _addNewButton(panel);
        }
    }

//     // projectPanel or to view specific project, e.g.
//     //   _renderPanel(todoPanel, renderList, projectArray[1].todos, 1)
//     //      - renders first user project
//     //   _renderPanel(projectPanel, renderList, projectArray)
//     //      - renders project panel

    function renderAllLists(panel, array, attr) {
        array.forEach((project, i) => {
            renderList(panel, project[attr], project.color, i);
        });
    }

//     // To get default view:
    
//     //     _renderPanel(todoPanel, renderAllLists, projectArray, todos)

//     // runs:

//     //     DOMtools.rerender(todoPanel, renderAllLists, projectArray, todos)
        
//     // which empties the todoPanel and then runs:

//     //     renderAllLists(todoPanel, projectArray, todos)

//     // which runs for each project of the projectArray:

//     //     renderList(todoPanel, project[todos], i, project.color)

//     // filling the todoPanel before adding a new button



//     // To fill the project bar:

//     //     _renderPanel(projectPanel, renderList, projectArray)

//     // runs:

//     //     DOMtools.rerender(projectPanel, renderList, projectArray)

//     // which empties the projectPanel and then runs:

//     //     renderList(projectPanel, projectArray)

//     // filling the projectPanel before adding a new button

//     // important: DOMtools.rerender(todoPanel, renderAllLists, projectArray, important)
//     // overdue: DOMtools.rerender(todoPanel, renderAllLists, projectArray, overdue)
//     // dueThisWeek: DOMtools.rerender(todoPanel, renderAllLists, projectArray, dueThisWeek)
//     // specific project: _renderPanel(todoPanel, renderList, project.todos, projIndex, project.color)



//     // public

    function renderView() {
        _viewProjectList(); // always redraw project bar
        if (this.hasAttribute("id")) { // not a project
            switch (this.id) {
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
            _viewProject(Number(this.dataset.projectindex) + 1);
        }
    }

    function renderCurrent() {
        _viewProjectList();
        _viewCurrent()
    }

//     return {
//         renderView,
//         renderCurrent
//     }
// })();

function renderList(panel, array, color = null, projIndex = null) { // last two parameters optional

    // element creation functions

    function createContainer(i) {
        const container = DOMtools.returnElement({
            type: "div",
            class: "container",
            attribute: {
                "data-projectindex": (projIndex !== null) ? projIndex : i,
                "data-todoindex": (projIndex !== null) ? i : "null"
            }
        });
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
        colorPicker.addEventListener("change", submitAndRerender)
        return colorPicker;
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
        checkbox.addEventListener("change", submitAndRerender);
        return checkbox;
    }

    function createName(obj) {
        const nameText = DOMtools.returnElement({
            type: "p",
            class: "text name",
            text: obj.name,
        })
        if (obj.complete) {
            nameText.classList.add("complete")
        } else {
            nameText.setAttribute(
                "style",
                (color) ? `color:${color}` : `color:${obj.color}`
            )
        }
        nameText.addEventListener("dblclick", toggleInput);
        if (!projIndex) { // is a project
            nameText.addEventListener("click", e => {
                console.log(e.target.parentElement);
                renderView.call(e.target.parentElement);
            });
        }
        return nameText;
    }

    function createNameInput(name) { // send obj.name
        const nameInput = DOMtools.returnElement({
            type: "input",
            class: "text textinput hidden",
            attribute: {
                type: "text",
                spellcheck: "false",
                value: name
            }
        });
        nameInput.addEventListener("focusout", submitAndRerender);
        return nameInput;
    }

    function createSelectBox() {
        const selectContainer = DOMtools.returnElement({
            type: "select",
            class: "text select"
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
        selectContainer.addEventListener("change", submitAndRerender);
        return selectContainer;
    }

    function createNotesIcon() {
        const notesIcon = DOMtools.returnElement({
            type: "p",
            class: "notes",
            text: "☰"
        })
        notesIcon.addEventListener("click", toggleNotesAndSubmit);
        return notesIcon;
    }

    function createImportantIcon(importance) { // send obj.important
        const importantIcon = DOMtools.returnElement({
            type: "p",
            class: (importance) ? "importance urgent" : "importance",
            text: "!",

        });
        if (importance) {
            importantIcon.setAttribute("data-importance", "true");
        }
        importantIcon.addEventListener("click", submitAndRerender);
        return importantIcon;
    }

    function createDateInput(date = null) {
        function make2Decimals(num) {
            return num.toString().padStart(2, "0");
        };
        const dateInput = DOMtools.returnElement({
            type: "input",
            class: "textinput",
            attribute: {
                type: "date"
            }
        });
        if (date) {
            dateInput.setAttribute(
                "value",
                (date.getFullYear() + "-" +
                make2Decimals(date.getMonth()) + "-" +
                make2Decimals(date.getDate()))
            );
        }
        dateInput.addEventListener("input", submitAndRerender);
        return dateInput
    }

    function createDeleteKey() {
        const deleteKey = DOMtools.returnElement({
            type: "div",
            class: "delete",
            text: "✖"
        });
        deleteKey.addEventListener("click", submitAndRerender);
        return deleteKey;
    };

    function createNotesBox(notes) { // send obj.notes
        const notesBox = DOMtools.returnElement({
            type: "textarea",
            class: "textarea hidden",
            text: notes,
            attribute: {
                rows: "6",
                spellcheck: "false"
            }
        })
        // notesBox.addEventListener("focusout", submit)
        return notesBox;
    }

    // event listener functions

    function submitAndRerender() {
        submit(this)
        renderCurrent();
    }

    function toggleNotesAndSubmit() {
        const notes = this.parentElement.parentElement.lastChild;

        if (notes.classList.contains("hidden")) { // click to reveal
            notes.classList.remove("hidden");
        } else { // click to hide and (submit contents)
            // submit.call(notes); // (UNSURE)
            notes.classList.add("hidden")
        }
    }

    function toggleInput() {
        this.classList.add("hidden");
        const input = this.nextElementSibling;
        input.classList.remove("hidden");
        input.focus();
        input.select();
    }

    // draw list

    if (projIndex !== null) { // list of todos
        array.forEach((obj, i) => {
            const outerContainer = createContainer(i)
            outerContainer.className = "box"; // overwrite class
            const innerContainer = createContainer(i);
            DOMtools.appendChildren(
                innerContainer,
                createCheckbox(obj.complete),
                createName(obj),
                createNameInput(obj.name),
                createSelectBox(),
                createNotesIcon(),
                createImportantIcon(obj.important),
                createDateInput(obj.dueDate),
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
            const container = createContainer(i);
            container.classList.add("box", "project");
            DOMtools.appendChildren(
                container,
                createColorPicker(obj.color),
                createName(obj),
                createNameInput(obj.name),
                createDeleteKey()
            )
            panel.appendChild(container);
        });
    }
}