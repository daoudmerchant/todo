import todo from "./todo.js";
import DOMtools from "./domtools.js";


// RENDER MODULE

// - Defines view renders
// - Attaches them to existing DOM elements
// Requires both submit function AND todo module


const render = (function() {

    // panel element queries

    const projectPanel = document.querySelector("#projectbar");
    const todoPanel = document.querySelector("#todoview");

    // permanent button element queries

    const defaultView = document.querySelector("#default");
    const importantView = document.querySelector("#important");
    const overdueView = document.querySelector("#overdue");
    const thisWeekView = document.querySelector("#duethisweek");
    const allTodosView = document.querySelector("#viewall");

    function _attachRenderEvent(...elements) {
        elements.forEach(element => element.addEventListener("click", _renderView));
    }

    _attachRenderEvent(
        defaultView,
        importantView,
        overdueView,
        thisWeekView,
        allTodosView
    );

    // aggregate render functions
    
    function _renderAllLists(panel, array, attr) {
        array.forEach((project, i) => {
            renderList(panel, project[attr], project.color, i);
        });
    }
    
    function _renderView() {
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
                case "viewall" :
                    _viewAllTodos();
                    break;
            }
        } else { // is project
            _viewProject(Number(this.dataset.projectindex) + 1);
        }
    }
    
    // Render currently rendered todos
    
    let _viewCurrent = _viewDefault;
    
    function renderCurrent() {
        _viewProjectList();
        _viewCurrent()
    }

    function setCurrent(i = null) {
        if (i !== null) {
            _viewCurrent = () => _viewProject(i);
        } else {
            _viewCurrent = _viewDefault;
        }
    }

    // Render other specific views:

    // - project bar

    function _viewProjectList() {
        const userProjects = todo.returnAll().slice(1);
        _renderPanel(projectPanel, renderList, userProjects);
    }

    // - todo views

    function _viewDefault() {
        _renderPanel(todoPanel, _renderAllLists, todo.returnAll(), "outstanding");
        _viewCurrent = _viewDefault;
    }

    function _viewImportant() {
        _renderPanel(todoPanel, _renderAllLists, todo.returnAll(), "important");
        _viewCurrent = _viewImportant;
    }

    function _viewOverdue() {
        _renderPanel(todoPanel, _renderAllLists, todo.returnAll(), "overdue");
        _viewCurrent = _viewOverdue;
    }

    function _viewDueThisWeek() {
        _renderPanel(todoPanel, _renderAllLists, todo.returnAll(), "dueThisWeek")
        _viewCurrent = _viewDueThisWeek;
    }

    function _viewAllTodos() {
        _renderPanel(todoPanel, _renderAllLists, todo.returnAll(), "todos");
        _viewCurrent = _viewAllTodos;
    }

    function _viewProject(i) {
        function _selectProject(index) {
            const projects = document.querySelectorAll(".project");
            const thisProjBar = projects.item(index - 1);
            console.log(thisProjBar);
            thisProjBar.classList.add("selected")
        }
            // Yes, I know ideally the class should be added at time of render, but
            // I have to account for readability when renderList() already has many
            // optional functions. This is an optional effect and can be easily
            // removed here
        
        const thisProj = todo.returnItem(i);
        _renderPanel(todoPanel, renderList, thisProj.todos, thisProj.color, i)
        _selectProject(i);
        _viewCurrent = () => _viewProject(i);
    }


    // SUBMIT AND RERENDER

    // - Sends element information to submit function
    // - rerenders page
    // - required both when rendering a list AND when adding a new button
     
    function submitAndRerender() {
        if (this.value === "") { return };
        submit(this)
        renderCurrent();
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
            newNameInput.addEventListener("focusout", submitAndRerender);
            panel.appendChild(container);
        }

        DOMtools.clearAndRender(panel, callback, ...args);
        const lastArg = args[args.length - 1];
        if ((lastArg === "outstanding") || (lastArg === "todos")) { // view outstanding or all
            _addNewButton(panel, 0)
        } else if (typeof(lastArg) === "number") { // view a project
            _addNewButton(panel, lastArg);
        } else if (typeof(lastArg) === "object") { // project bar
            _addNewButton(panel);
        }
    }

    
    // Render List:

    // - Receives panel to be filled, array to be rendered and optional extra information for styling
    // - Requires submit AND submitAndRerender


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
            // container.addEventListener("click", _renderView); // if click event better 
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
        
        function createCheckbox(complete) { // requires id and name for accessibility?
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
                let timer = 0;
                let prevent = false;
                nameText.addEventListener("click", e => {
                    timer = setTimeout(function() {
                        if (!prevent) {
                            if (projIndex === null) { // project view
                                _renderView.call(e.target.parentElement);
                            } else {
                                _toggleNotesAndSubmit(e.target);
                        }
                    }
                }, 200);
            });
            nameText.addEventListener("dblclick", e => {
                clearTimeout(timer);
                prevent = true;
                _toggleInput(e.target);
            });
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
        
        function createDateInput(date) {
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
                attribute: {
                    rows: "6",
                    spellcheck: "false"
                }
            })
            if (notes) {
                notesBox.textContent = notes;
            }
            notesBox.addEventListener("focusout", e => submit(e.target));
            // or modify submit function to check if event or element
            return notesBox;
        }
        
        // event listener functions
        
        function _toggleNotesAndSubmit(element) {
            const notes = element.parentElement.parentElement.lastChild;
    
            if (notes.classList.contains("hidden")) { // click to reveal
                notes.classList.remove("hidden");
            } else { // click to hide and (submit contents)
                submit(notes);
                notes.classList.add("hidden")
            }
        }
        
        function _toggleInput(element) {
            element.classList.add("hidden");
            const input = element.nextElementSibling;
            input.classList.remove("hidden");
            input.focus();
            input.select();
        }
    
        // draw list
    
        if (projIndex !== null) { // list of todos
            array.forEach((obj, i) => {
                const outerContainer = createContainer(i)
                outerContainer.className = "box"; // overwrite class
                const innerContainer = createContainer(i); // flex container
                DOMtools.appendChildren(
                    innerContainer,
                    createCheckbox(obj.complete),
                    createName(obj),
                    createNameInput(obj.name),
                    createSelectBox(),
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

    // returned publicly to allow render on page load
    
    return {
        renderCurrent,
        setCurrent
    }

})();


// SUBMIT FUNCTION

// - queries attached element
// - submits relevant information to relevant todo module function
// - updates local storage
// requires todo module


function submit(element) {
    const parent = element.parentElement;

    const projIndex = (parent.dataset.projectindex === "null") ?
        "null" : Number(parent.dataset.projectindex);
    let todoIndex = undefined;
    if (parent.hasAttribute("data-todoindex")) {
        todoIndex = (parent.dataset.todoindex === "null") ?
            "null" : Number(parent.dataset.todoindex);
    }

    if (element.getAttribute("type") === "color") { // color input
        todo.editItem("color", element.value, projIndex + 1);
    } else if (element.getAttribute("type") === "checkbox") { // checkbox
        if (element.checked) {
            todo.editItem("complete", true, projIndex, todoIndex);
        } else {
            todo.editItem("complete", false, projIndex, todoIndex);
        }
    } else if (element.getAttribute("type") === "text") { // text input

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

        if (todoIndex === undefined) { // no todo index attribute, is a new box
            if (projIndex === "null") { // no project index, is a new project;
                render.setCurrent(todo.addItem(element.value));
            } else { // has numeric project index, is a new todo
                todo.addItem(element.value, projIndex);
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
        console.log(todoIndex);
        console.log(projIndex);
        if (todoIndex === "null") {
            if (confirm("Delete todo list?")) {
                todo.deleteItem(projIndex + 1);
                render.setCurrent()
            }
        } else {
            if (confirm("Delete todo item?")) {
                todo.deleteItem(projIndex, todoIndex);
            }
        }
    }
    else if (element.tagName === "TEXTAREA") { // notes
        const notesText = (element.value) ? element.value : undefined;
        todo.editItem("notes", notesText, projIndex, todoIndex);
    }

    // update local storage

    localStorage.setItem('user', JSON.stringify(todo.exportAll()));
}

// on page load

(function() {
    const userData = JSON.parse(localStorage.getItem('user'))
    console.table(userData);
    if (userData) {
        todo.importAll(userData);
    }
    render.renderCurrent();
})();
