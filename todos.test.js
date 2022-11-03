/* eslint-disable no-undef */
const todoList = require("./todos");
describe("To do list test suits",() => {
  beforeAll(() => {
    const todayDate = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    const yesterdayDate = new Date(todayDate.getTime() - 1 * oneDay);
    const tomorrowDate = new Date(todayDate.getTime() + 1 * oneDay);

    const today = todayDate.toLocaleDateString("en-CA");
    const yesterday = yesterdayDate.toLocaleDateString("en-CA");
    const tomorrow = tomorrowDate.toLocaleDateString("en-CA");

    todoList.add({
      title: "Pay wifi bill",
      dueDate: yesterday,
      completed: true,
    });
    todoList.add({
      title: "Pay electricity bill",
      dueDate: today,
      completed: true,
    });
    todoList.add({ title: "Bike Service", dueDate: today, completed: false });
    todoList.add({ title: "Assisgnemnt", dueDate: tomorrow, completed: false });
    todoList.add({ title: "shopping", dueDate: tomorrow, completed: false });
  });
  test("should add new todo", () => {
    const todoItemCount = todoList.all.length;
    todoList.add({
      title: "6th todo due today",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(todoList.all.length).toBe(todoItemCount + 1);
  });
  test("Should markAsComplete", () => {
    todoList.markAsComplete(0);
    expect(todoList.all[0].completed).toBe(true);
  });
  test("Check retrieval of overdue items", () => {
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
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

  test("Check retrieval of due today items", () => {
    const today = new Date();
    const existingTodaysItems = todoList.dueToday();
    todoList.add({
      title: "An Today test item",
      completed: false,
      dueDate: new Date(today.getTime()).toLocaleDateString("en-CA"),
    });
    const todayItems = todoList.dueToday();
    expect(todayItems.length).toBe(existingTodaysItems.length + 1);
  });

  test("Check retrieval of due later items", () => {
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    const existingdueLaterItems = todoList.dueLater();
    todoList.add({
      title: "An due later test item",
      completed: false,
      dueDate: new Date(today.getTime() + 2 * oneDay).toLocaleDateString(
        "en-CA"
      ),
    });
    const dueLaterItems = todoList.dueLater();
    expect(dueLaterItems.length).toBe(existingdueLaterItems.length + 1);
  });
});
