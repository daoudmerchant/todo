# Todo Functionality



Each todo must contain:

- title

- description

- dueDate

- high priority (!)

- complete



The functionality will likely be

| **Default**   | Todos (blank if none) |
| ------------- | --------------------- |
| Important     | + new todo            |
| Overdue       |                       |
| Due this week |                       |
| *Projects*    |                       |
| + new project |                       |

Clicking on *+ new project* will allow editable text in-place, becoming editable in focus and creating the project on loss of focus. It displays with:

Left:

- A circle indicating a color (default: white), which is a color input. On change of color input, the text changes color to match and the input circle remains that color

- Project name

Right:

- A trashcan

Clicking on *+ new todo* works similarly, but when the todo is generated it displays with:

Left:

- A background color matching the color of the project (default: white)

- A tickbox (default: unchecked)

- The text

Right:

- Notes icon

- Priority (default: an empty '!')

- A date input (default: empty)

- A trashcan

Clicking the 'notes' icon brings up a text input box below which disappears when clicking the 'notes' icon again or another todo etc.



# Basic flow

## On load

- Populate project view

- Populate default task view

## On click of project view

- Empty task view

- Repopulate task view with project tasks

## On addition of new project

- Create new project and add to array

- Empty project view

- Repopulate project view

- Empty task view

- Repopulate from new project (empty)

## On deletion of a project

- Empty project view

- Repopulate project view

- If task view was of that project, empty task view and repopulate from DEFAULT

- If task view was of another project *other than default*, check if that project's index is higher than deleted project index

- If so, empty the task view and repopulate with all references to the index reduced by 1

## On addition of a new task

- Add task to project

- Empty task view

- Repopulate task view

## On deletion of a task

- Remove task from project

- Empty task view

- Repopulate task view



# Todo data

**Array** of project **objects**, the first of which being 'default'. Each project contains parameters:

- projectName

- color

- complete() - method to check if all child tasks are complete or not

- todos - an **array** of **objects**, each containing the parameters:
  
  - todoName
  
  - dueDate
  
  - priority (true/false)
  
  - description
  
  - complete (true/false)



# Modules

## Todo

#### **Todo array**

- DEFAULT object
  
  - name: default
  - color: none (white/transparent)
  - complete()
  - urgent()
  - dueThisWeek()
  - overdue()
  - todos: []



**// methods**



#### *function Complete*

- **Reduce** todo array to a true or false statement
- If complete is true for every todo in own todo parameter, **return** *true*
- Else, **return** *false*



#### *function Urgent*

- **Reduce** todo array to whichever tasks are urgent
- **return** this reduced array



#### *function Due this week*

- Calculate a week from right now
- Filter the todo array for todos whose due date is less than one week from now but more than right now
- **return** this reduced array



#### *function Overdue*

- Filter the todo array for todos whose due date is less than today
- **return** this reduced array



**// project functions**



#### *function* ***Add project***

##### project name

- Create an object with the parameters:
  
  - projectName: project name
  - color: none
  - complete()
  - urgent()
  - dueThisWeek()
  - overdue()
  - todos: []

- Push this project on to the **Todo array**

- **Return** an *array of all current project names with color and complete*



#### *function Edit project name*

##### project index, new project name

- Locate project by index

- Reset its name to the new project name

- **Return** an *array of all current project names with color and complete*



#### *function Edit project color*

##### project index, color

- Locate project by index

- Reset its color to the given color

- **Return** an *array of all current project names with color and complete*



#### *function Delete project*

##### project index

If confirmed

- Locate project by index

- Splice project from array

> Return anything?



**// todo functions**



#### *function Add todo*

##### todo, project index

- Create an object with the parameters:
  
  - todoName: todo
  
  - dueDate: none
  
  - priority: false
  
  - description: none
  
  - complete: false

- If there is a project index, push the todo object to the array in that project's todo parameter

- If not, push it to the array in the DEFAULT todo parameter



#### *function Edit todo name*

##### todo, project index, todo index

- Locate project by index, then locate todo by index

- Set the todo parameter to the given todo name

> Return nothing?



#### *function Add todo description*

##### todo index, project index, description

- Find the project by index, then the todo of its todo parameter by index

- Reset its description to the given description

> Return not necessary if textbox hides itself / isn't rerendered?



#### *function Toggle todo priority*

##### todo index, project index

- Find the project by index, then the todo of its todo parameter by index

- Toggle the priority parameter of the todo

- **Return** the *new priority parameter (true/false)*



#### *function Toggle todo complete*

##### todo index, project index

- Find the project by index, then the todo of its todo parameter by index

- Toggle the complete parameter of the todo

- **Return** the *new complete parameter (true/false)*



#### *function Set todo due date*

##### todo index, project index, due date

- Find the project by index, then the todo of its todo parameter by index

- Reset its date to the given due date

> Return not necessary for date to display on element when it was just provided by the user?



#### *function Delete todo*

##### todo index, project index

- Find the project by index, then the todo of its todo parameter by index

- Splice todo from array

> Return anything?



**// rendering functions**



#### *function Return projects for project view*

- **Return** result of private function with removed todos



#### *function Return todos for todo view*

##### project index

- Find the project by index
- **Return** it



## Edit DOM

**// private functions**



#### *function Create element*

##### { type, class, text, placeholder, name, inputType, value, color, backgroundColor, projectIndex, todoIndex }

- Create an element of the given type

- If a class parameter is provided , assign it the given class(es)

- If a text parameter is provided, fill it with the given text

- if an input type parameter is provided, set the input type and name parameters with it

- if a color parameter is provided, use it as the font color UNLESS the input type is 'color' in which case set the 'value' attribute with it

- If a placeholder parameter is provided, assign it to the placeholder attribute

- If a name parameter is provided, assign it to the name attribute

- If a value parameter is provided, assign it to the value attribute

- if a background color parameter is provided, use it as the background color

- if a projectIndex parameter is provided, add it as a data attribute

- If a todoIndex parameter is provided, add it as a data attribute

- **Return** the *newly created element*



#### *function Append children*

##### parent, ...children

- For each child, append it to the parent



#### *function Empty element*

##### parent

- As long as the parent has a last child, delete the first child



## Rerender and submit



#### *function Submit color*

##### color, project index

- Run todo.Edit Project Color with the color and project index

- Rerender the projects



#### *function Submit name*

##### name, project index, todo index

If *all three parameters are included*, it is an **edited todo name**, and therefore:

- run todo.Edit todo name with the three parameters
- Empty the project view
- Rerender the project view

If *just a name and a project index*, it is an **edited project name**, and therefore:

- run todo.Edit project name with the name and the project index
- Empty the task view
- Rerender the task view

If *a name and a project index of null*, it is a **new project**, and therefore:

- run todo.Add project with the project name
- Empty the project view
- Rerender the project view

If *a name, a project index and a todo index of null*, it is a **new todo**, and therefore:

- run todo.Add todo with the project index and todo index
- Empty the task view
- Rerender the task view



#### *function Delete item*

##### project index, todo index

If just a project index, the **project** is being deleted, and therefore:

- run todo.Delete project with the project index
- Empty the project view
- Rerender the project view

Otherwise, if both arguments are provided, the **todo** is being deleted and therefore:

- run todo.Delete todo with both indexes
- Empty the task view
- Rerender the task view



## Render Page

**// element queries**

- Project view
- Main task view
- Default
- Priority
- Due (soon)



**// list renders**

#### *function Clean slate*

##### element, function, parameter

- Empty the element
- Run the function with the parameter



#### *function View project list*

##### project array

Clean the slate 



#### *function View default*

##### project array

- For each project in the array:
  - [**Render list**](#function-render-list) with the **main task view** and the **todo parameter array**
- [**Add new button**](#function-add-new-button) with the **main task view** and 'task'



#### *function View urgent*

##### project array

- For each project in the array:
  - [**Render list**](#function-render-list) with the **main task view** and the **urgent method's return value**
- [**Add new button**](#function-add-new-button) with the **main task view** and 'task'



#### *function View overdue*

##### project array

- For each project in the array:
  - [**Render list**](#function-render-list) with the **main task view** and the **overdue method's return value**
- [**Add new button**](#function-add-new-button) with the **main task view** and 'task'



#### *function View due this week*

##### project array

- For each project in the array:
  - [**Render list**](#function-render-list) with the **main task view** and the **urgent method's return value**

- [**Add new button**](#function-add-new-button) with the **main task view** and 'task'



#### *function View project*

##### project

- [**Render list**](#function-render-list) with the **main task view** and the **todo parameter array**
- [**Add new button**](#function-add-new-button) with the **main task view** and 'task'



#### *function Add new button*

##### element, project or todo

- Create a simple div container (with a class of 'container')

- Create an add button using the object

  ​	{ type: input

  ​	class: addnew

  ​	inputType: text

  ​	placeholder: "+ add new" }

- Add an **event listener** of **focusout** which runs the function [**Submit name**](#function-submit-name) with:

  - **contents and *null*** if a project, or
  - **contents, project index and *null*** if a todo

- Append this to the given element



#### *function Render list*

##### element, either array of projects or just one project



##### *function Create delete key*

- Create element using function **Create element** using the object:

            { type: div

            class: delete

            text: "x" }

- Add an event listener of **click** which runs the function [**Delete item**](#function-delete-item) with the parent's project index and (if it has it) the todo index

- **Return** that element



##### *function Toggle notes*

###### parent

- If the parent's last child is a note box, run the function [**todo.Add todo description**](#function-add-todo-description) with its text content, the parent's project index and the parent's todo index and then delete it

- Otherwise, create notes box using the object:

            { type: textarea

            class: textarea

            text: notes parameter of todo at todo index of project at project index, both indexes taken from element data fields }

- Add an **event listener** of **focusout** to the notes box which runs the function [**todo.Add todo description**](#function-add-todo-description) with its own content, the parent element project index and the parent element todo index
- Append that element to the provided element



##### *function Toggle hidden*

###### ...elements

- For each element, toggle 'hidden' class



If the second argument is an object, it is a project, and therefore declare a variable as the todo parameter array

Otherwise, if it is an array, it is all the projects, and therefore stays as it is

**For each item of the array:**

- Create a project name container using the object

            { type: div

​			class: "complete" if the complete parameter is *true*}

- *If there's a project index, assign it to the project dataset and add a todo dataset with the current index, otherwise set the current index to the project index*

- Create a name input element using the object

            { type: input

            inputType: text

            color: color parameter

​			value: name parameter

​			class: hidden }

- *If there's a project index, assign it to the project dataset and add a todo dataset with the current index, otherwise set the current index to the project index*

- Add an **event listener** of **focusout** to the name which runs the function [**Submit name**](#function-submit-name) using the **current input value**, the **project index** value and (if it has one) the **todo index** value

- Create a name element using the object

  ​	{ type: p

  ​	class: "name"

  ​	text: name parameter }

- *If a project, assign it the project index of the item in the array*

- Add an **event listener** of **doubleclick** to the name which toggles the hidden class of the name element and the name input element
- Assign the function [**Create delete key()**](#function-create-delete-key) to a variable



If projects:

- Assign either the class 'container projectContainer' to the container
- Add an **event listener** of **click** to the container which runs the function [**View project**](#function-view-project) using the return value of function [**todo.Return todos for todo view**](#function-return-todos-for-todo-view) and the **main task view**
- Add an **event listener** of **click** to the name element which runs
- Add the class 'projectName' to the name input
- Assign the color property of the project to the name box
- Assign a project data attribute of the current index
- Create a color picker element using the object

            { type: input

            class: colorPicker

            inputType: color

            color: color parameter

            projectIndex: index }

- Add an **event listener** of **oninput** to the color picker which runs the function [**Submit color**](#function-submit-color) using the **selected color** and **project index** values
- Run the function [**append children**](#function-append-children) with the parameters
  - container
  - color picker
  - project name
  - delete key



If todos:

- Assign the class 'container todoContainer' to the container
- Add the class  'todoName' to the name input
- Assign the color property from the fourth argument to the name box
- Assign a project data attribute of the third argument
- Assign a todo data attribute of the current index

- Create a checkbox using the object

            { type: input

            class: checkbox

            inputType: checkbox }

- If the todo's complete parameter is *true*, check the box by default

- Create a priority indicator with the object

  ​	{ type: p

  ​	*(if urgent)* class: urgent

  ​	text: "!"}

- Create a dropdown select container using the object

            { type: select

            class: selectBox }

- Create a select option using the object

  ​	{ type: option

  ​	value: "0"

  ​	text: "Default" }

- Append this to the select container

- For each of *todo.Return projects for project view*:

  - Create a select option using the object

              { type: option

              value: *index* as a string

              text: projectName parameter}

  - Then append it to the dropdown select container

- Create a notes icon using the object:

            { type: p

            class: more

            text: "notes" }

- Add an **event listener** of **click** to the notes icon which runs the function [**Toggle notes**](#function-toggle-notes) using the **parent element** (the container)

- Create a date input using the object:

  ​	{ type: input

  ​	class: dateBox

  ​	inputType: date

  ​	value: todo dueDate parameter }

- Add an **event listener** of **oninput** which runs the function [**Set todo due date**](#function-set-todo-due-date) using the current todo index, the project index and the input value

- Run the function [**Append children**](#function-append-children) with the arguments

  - container
  - checkbox
  - todo name
  - project dropdown box
  - priority indicator
  - date input
  - delete



Append the todo container to the parent element
