import Slider from "./components/Slider";
import Collection from "./components/Collection";
import { useState } from "react";
import light from "./images/light.png";
import moon from "./images/moon.png";
import cross from "./images/cross.png";
import Todoitem from "./components/Todoitem";
function App() {
    const [todos, setTodos] = useState([]);
    const [theme, setTheme] = useState("dark");
    const [opened, setOpened] = useState(false);
    const [todo, setTodo] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("JavaScript");
    const [formType, setFormType] = useState("");
    const [changedTodo, setChangedTodo] = useState()
    function createCategory(event) {
        event.preventDefault();
        if (categories.findIndex((cat) => cat.content == category) != -1) {
            alert("Такая категория уже есть");
        } else {
            const newCategory = {
                content: category,
                done: "0",
                color: `rgb(${getRandomNumber(100, 200)}, ${getRandomNumber(
                    100,
                    200
                )}, ${getRandomNumber(100, 200)})`,
            };
            setCategories([newCategory, ...categories]);
            setCategory("")
            setOpened(false)
        }
        if(categories.findIndex((cat) => cat.content =! "")){
            alert("Напишите категорию")
        }
    }
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function doneToDo(id) {
        const todoIndex = todos.findIndex((todo) => todo.id == id);
        const todo = todos[todoIndex];
        todo.done = todo.done == true ? false : true;
        setTodos([
            ...todos.slice(0, todoIndex),
            todo,
            ...todos.slice(todoIndex + 1),
        ]);
        calculateProcent(todos, todo);
    }
    function deleteTodo(id) {
        const todoIndex = todos.findIndex((todo) => todo.id == id);
        const todo = todos[todoIndex];
        const changedTodos = [
            ...todos.slice(0, todoIndex),
            ...todos.slice(todoIndex + 1),
        ];
        setTodos(changedTodos);
        calculateProcent(changedTodos, todo);
    }
    function updateTodo(id) {
        const todoIndex = todos.findIndex((todo) => todo.id == id);
        const todo = todos[todoIndex];
        setFormType("Edit form");
        setOpened(true);
        setChangedTodo(todo)
        setTodo(todo.content)
    }
    function handleEdit (event){
        event.preventDefault()
        changedTodo.content = todo
        const todoIndex = todos.findIndex((todo) => todo.id == changedTodo.id);
        const changedTodos = [
            ...todos.slice(0, todoIndex),
            changedTodo,
            ...todos.slice(todoIndex + 1),
        ];
        setTodos(changedTodos);
        setOpened(false)
        setTodo("")
    }
    function calculateProcent(todoList, currentTodo) {
        const currentTodos = todoList.filter(
            (td) => td.category == currentTodo.category
        );
        const completedTodos = currentTodos.filter((td) => td.done == true);
        let procent = (completedTodos.length * 100) / currentTodos.length;
        if (isNaN(procent)) {
            procent = 0;
        }
        const categoryIndex = categories.findIndex(
            (category) => currentTodo.category == category.content
        );
        const category = categories[categoryIndex];
        category.done = procent.toFixed(2);
        setCategories([
            ...categories.slice(0, categoryIndex),
            category,
            ...categories.slice(categoryIndex + 1),
        ]);
    }
    function changeTheme() {
        if (theme == "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }

    function createToDo(event) {
        event.preventDefault();
        if(category == "" || category == "Не выбран"){
            alert("Категория не выбрана")
            return
        }
        const categoryIndex = categories.findIndex(
            (ct) => ct.content == category
        );
        const newTodo = {
            content: todo,
            category: category,
            done: false,
            id: Date.now(),
            color: categories[categoryIndex].color,
        };

        if (
            todos.findIndex(
                (todo) =>
                    todo.content == newTodo.content &&
                    todo.category == newTodo.category
            ) == -1
        ) {
            const newTodos = [newTodo, ...todos];
            setTodos(newTodos);
            calculateProcent(newTodos, newTodo);
            setTodo("")
            setOpened(false)
        } else {
            alert("Такое дело уже есть.");
        }
    }
    function openTodoForm() {
        setOpened(true);
        setFormType("To Do Form");
    }
    function openCategoryForm() {
        setOpened(true);
        setFormType("Category Form");
    }
    return (
        <div className={"root " + theme}>
            <div className="App">
                <button onClick={openTodoForm} className="btn">
                    {"Add New ToDO"}
                </button>
                <Slider
                    theme={theme}
                    openCategoryForm={openCategoryForm}
                    categories={categories}
                />
                <Collection
                    deleteTodo={deleteTodo}
                    doneToDo={doneToDo}
                    todos={todos}
                    updateTodo={updateTodo}
                />
                <button className="theme" onClick={changeTheme}>
                    {theme == "dark" ? <img src={light} /> : <img src={moon} />}
                </button>
                <div className={"modal " + (opened == true ? "opened" : "")}>
                    <div className="modal-content">
                        <img
                            onClick={() => setOpened(false)}
                            className="modal-close"
                            src={cross}
                        />
                        <h2 className="createToDo">{formType}</h2>
                        {formType == "To Do Form" ? (
                            <form onSubmit={createToDo} className="form">
                                <input
                                    onChange={(event) => {
                                        setTodo(event.target.value);
                                    }}
                                    value={todo}
                                    className="formInput"
                                    type="text"
                                    placeholder="Your To DO"
                                />
                                <select
                                    onChange={(event) => {
                                        setCategory(event.target.value);
                                    }}
                                    value={category}
                                    className="select"
                                >
                                    <option>Не выбран</option>
                                    {categories.map((category) => (
                                        <option key = {category.content}>{category.content}</option>
                                    ))}
                                </select>
                                <button className="formBtn">Create</button>
                            </form>
                        ) : formType == "Edit form" ? (
                            <form onSubmit={handleEdit}>
                                <input
                                    onChange={(event) => {
                                        setTodo(event.target.value);
                                    }}
                                    value={todo}
                                    className="formInput"
                                    type="text"
                                />
                                <button className="formBtn">Edit</button>
                            </form>
                        ) : (
                            <form onSubmit={createCategory} className="form">
                                <input
                                    onChange={(event) => {
                                        setCategory(event.target.value);
                                    }}
                                    value={category}
                                    className="formInput"
                                    type="text"
                                    placeholder="Your Category"
                                />
                                <button className="formBtn">Create</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
// доделать дневной режим и добавить Media.css
// команде crateCategory проверять есть ли название?