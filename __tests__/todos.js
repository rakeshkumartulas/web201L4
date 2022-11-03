const todoList=require('../todos');
const{all,markAsComplete,add }= todoList;
describe("To do list test suits", () => {
    beforeAll(() => {
      const todayDate = new Date();
      const oneDay = 86400000;
      const yesterdayDate = new Date(todayDate.getTime() - 1 * oneDay);
      const tomorrowDate = new Date(todayDate.getTime() + 1 * oneDay);
  
      const today = todayDate.toLocaleDateString("en-CA");
      const yesterday = yesterdayDate.toLocaleDateString("en-CA");
      const tomorrow = tomorrowDate.toLocaleDateString("en-CA");
  
      todoList.add({
        title: "Pay internet Bill",
        dueDate: yesterday,
        completed: true,
      });
      todoList.add({
        title: "Pay Telephone Bill",
        dueDate: today,
        completed: true,
      });
      todoList.add({ title: "vahicle Service", dueDate: today, completed: false });
      todoList.add({ title: "Test Assisgnemnt", dueDate: tomorrow, completed: false });
      todoList.add({ title: "Online shopping", dueDate: tomorrow, completed: false });
    });
    test("should add new todo", () => {
      const todoItemCount = todoList.all.length;
      todoList.add({
        title: "todo due today",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      });
      expect(todoList.all.length).toBe(todoItemCount + 1);
    });
    test("Should markAsComplete", () => {
      todoList.markAsComplete(0);
      expect(todoList.all[0].completed).toBe(true);
    });
    test("verify of fine on overdue items", () => {
      const today = new Date();
      const oneDay = 86400000;
      const existingOverdueItems = todoList.overdue();
      todoList.add({
        title: "An overdue test item",
        completed: false,
        dueDate: new Date(today.getTime() - 2 * oneDay).toLocaleDateString(
          "en-CA"
        ),
      });
      const overdueItems = todoList.overdue();
      expect(overdueItems.length).toBe(existingOverdueItems.length + 1);
    });
  
    test("verify the of fine on due today items", () => {
      const existingTodaysItems = todoList.dueToday();
      const today = new Date();
      
      todoList.add({
        title: " only Demo  item",
        completed: false,
        dueDate: new Date(today.getTime()).toLocaleDateString("en-CA"),
      });
      const todayItems = todoList.dueToday();
      expect(todayItems.length).toBe(existingTodaysItems.length + 1);
    });
  
    test("verify of due the later items", () => {
      const existingdueLaterItems = todoList.dueLater();
      const today = new Date();
      const oneDay = 86400000;
    
      todoList.add({
        title: " only Demo item",
        completed: false,
        dueDate: new Date(today.getTime() + 2 * oneDay).toLocaleDateString(
          "en-CA"
        ),
      });
      const dueLaterItems = todoList.dueLater();
      expect(dueLaterItems.length).toBe(existingdueLaterItems.length + 1);
    });
  });
  