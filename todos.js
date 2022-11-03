const todoList = () => {
    const all = [];
    const add = (todoItem) => {
      all.push(todoItem);
    };
    const markAsComplete = (index) => {
      all[index].completed = true;
    };
  
    const overdue = () => {
     
      return all.filter((item) => item.dueDate < new Date().toLocaleDateString("en-CA"));
    };
  
    const dueToday = () => {
            return all.filter(
        (item) => item.dueDate == new Date().toLocaleDateString("en-CA")
      );
    };
  
    const dueLater = () => {      
      return all.filter((item) => item.dueDate > new Date().toLocaleDateString("en-CA"));
    };
  
    const toDisplayableList = (list) => {
      
      return list
        .map(
          (todo) =>
            `${todo.completed ? "[x]" : "[ ]"} ${todo.title.trim()} ${
              todo.dueDate == today ? "" : todo.dueDate.trim()
            }`
        )
        .join("\n");
    };
  
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList,
    };
  };
  
  // ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

// const formattedDate = (d) => {
//   return d.toISOString().split("T")[0];
// };

// var dateToday = new Date();
// const today = formattedDate(dateToday);
// const yesterday = formattedDate(
//   new Date(new Date().setDate(dateToday.getDate() - 1))
// );
// const tomorrow = formattedDate(
//   new Date(new Date().setDate(dateToday.getDate() + 1))
// );

const todayDate = new Date();
const oneDay = 60 * 60 * 24 * 1000;
const yesterdayDate = new Date(todayDate.getTime() - 1 * oneDay);
const tomorrowDate = new Date(todayDate.getTime() + 1 * oneDay);

const today = todayDate.toLocaleDateString("en-CA");
const yesterday = yesterdayDate.toLocaleDateString("en-CA");
const tomorrow = tomorrowDate.toLocaleDateString("en-CA");

module.exports = todoList();

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n\n");

console.log("Overdue");
var overdues = todos.overdue();
var formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n\n");

console.log("Due Today");
let itemsDueToday = todos.dueToday();
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n\n");

console.log("Due Later");
let itemsDueLater = todos.dueLater();
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n\n");
