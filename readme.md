# Brief

To create a simple todo application with todos containing as a minimum:
- title
- description
- dueDate
- priority

I shall also include the optional 'notes'.

Additionally, todos should be categorisable (and recategorisable) by lists.

## Thoughts before beginning

I'm sorry to say that this is my second attempt at this exercise, my first being *far* too over-ambitious:

### Requiem for a Dream (To Do App)

I initially wanted to do a todo application which I might actually want to use, and had the idea for a todo app where each todo also has a category for duration and each project had a due date. Each project would therefore be able to show the last moment at which one should start (the moment beyond which there was not physically enough time to complete the contained tasks before the project deadline), therefore showing which was 'higher priority' - a longer project with a further due date might be a higher priority than a shorter project with a nearer due date if this 'event horizon' of a starting time was sooner. What's more, with project chronology, it would tell you what to do next as one task per project, resulting in a very simple home view (I personally feel overwhelmed opening todo apps and seeing a sea of todo tasks). However, all this additional logic along with a syntactical interface which presented your todos as a natural sentence represented all kinds of extra logic, and then my son got ill and I had to take time off from it, and when I returned I was completely tied in knots and didn't know where to continue. I 'bit off more than I could chew'.

For this second attempt at the project I have accepted that just completing the project as described will push me to the limits of my ability.

## Thoughts after completion

This is the first exercise at the end of which I don't feel completely satisfied. It's become very apparent that finding 'a' solution to a problem is fun, exciting and stimulating, and that finding the *best* solution to a problem is something which will get easier with time, but *organising the code* in to something logical, readable, modular and appropriately scoped is really extremely difficult for me. Even using my planning for my first todo attempt as a framework, taking the time to write a dummy version entirely in markdown pseudo code to easier move around functions etc. left me completely perplexed at certain moments. As an example: I know that my modules should be as decoupled as possible, I understand why it's so important, but I wanted to keep all of my 'todo' information in one module, which caused problems. I wanted a `submit` function which extracts relevant element data and sends it to the appropriate todo function in order to modify the hidden `projectArray`... but my page rendering module *also* needed access to the `todo` module to receive the information to render and the `submit` function in order to update the `projectArray`! Similarly, I wanted to scope my `submit` function exclusively with the `renderList` function... except `_addNewButton` in the aggregate page render function *also* needed access to `submit` so that `renderList` could be run as many times as required to loop through all the lists and render their (relevant) todos *before* appending a new item box at the very bottom! At this stage in my learning I feel overwhelmed and confounded trying to work this out myself. Before continuing the course, I'm going to contact some local industry professionals and request some sort of informal meeting to get together and discuss my code and wider questions or I just see this remaining a problem for project after project.

I'm also alarmed by how much time it took me, in large part related to these questions which I struggle to answer. I felt like I didn't have the ability to conceive the entire structure in pseudo code, having to take pauses in my planning to fill a JS file with what I'd imagined thus far to realise what needed to be accounted for next in the planning. This was also less than ideal. It was definitely a good idea to plan in prose before beginning, but there are still so many scenarios for which I can't prepare myself (I didn't know you can't apply both click and doubleclick event listeners to the same element, for example, leading to my imperfect delayed click boilerplate).

In the end a couple of functions ended up in the global scope, and my index file ended up containing a mixture of modules and function declarations hoisted as necessary (no chronology could be found). I really hope some help from a professional and the coming Odin lessons will help with this, this was the most overwhelming project of the entire course so far and I expected a todo list to be relatively within my capabilities. I am at least proud to once again have solved my own problems and not have required support at least to get the project in its current state.

## Areas for improvement

### Git!

God, my Git commit history is pretty abysmal. As explained in the write-up of previous projects, I have a tendency to get in the 'zone' on a project and struggle to take breaks, including to commit and push my workings thus far. Working by myself, it doesn't cause that much of a problem, but regular and well-documented commits and appropriate branching will be absolutely essential for anything collaborative. For the next project I really need to adhere to committing 'early and often'.

### Planning

I feel like my planning could be even better. My pseudo code planning is included in my repo for posterity, but is not comprehensive (as explained above, certain problems still had to be solved in the IDE for me to be able to conceptualise them). Hopefully repeated attempts at a successful markdown planning document will at least regularise a syntax and formatting which I can refer to as I work on the document.

### Debugging

It's still easier for me to `console.log` at various points than to add breakpoints and step over code.

## Lessons learned

### Know your limits

Had I planned my first attempt with the same rigor as the second attempt, I would have seen all of the logic necessary for it to resemble the product I was imagining and known that it was beyond my current abilities. Maybe when brainstorming basic functionality I could do an even vaguer preliminary sketch to ballpark the level of complexity of the project.

### Test a) before writing b)

Having planned everything, I then proceeded to write up everything and then 'hit go' as it were. Unsurprisingly, it failed. I should have written up just an initial block of code, say, to render the `projectArray`, before writing up the next, so that I wasn't debuggin the entire program at once.

### Get help!

It's time for me to get help from an industry professional.