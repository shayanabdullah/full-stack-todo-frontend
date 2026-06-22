# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


  const [todo, setTodo] = useState({
    title: "",
    description: "",
    priority: "high",
    category: "Personal",
    dueDate: new Date().toISOString().split("T")[0],
  });
  const [allTasks, setAllTasks] = useState([]);
  const [message, setMessage] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState();
  const formattedDate = (dueDate) => {
    return new Date(dueDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const getTodos = async () => {
    const response = await axios.get(
      "https://full-stack-todo-backend-1-ijc9.onrender.com/all/todos",
    );

    setAllTasks(response?.data?.todos);
  };

  const handleAdd = async () => {
    if (isEditing) {
      const editedTask = await axios.post(
        `https://full-stack-todo-backend-1-ijc9.onrender.com/task/edit/${id}`,
        todo,
      );
      setMessage(editedTask.data);

      getTodos();

      setTodo({
        title: "",
        description: "",
        priority: "high",
        category: "Personal",
        dueDate: new Date().toISOString().split("T")[0],
      });
      getTodos();
    } else {
      const allTodos = await axios.post(
        "https://full-stack-todo-backend-1-ijc9.onrender.com/create/todo",
        todo,
      );

      setMessage(allTodos.data);

      await getTodos();

      setTodo({
        title: "",
        description: "",
        priority: "high",
        category: "Personal",
        dueDate: new Date().toISOString().split("T")[0],
      });
    }
  };

  const handleDelete = async (id) => {
    const deleteTask = await axios.delete(
      `https://full-stack-todo-backend-1-ijc9.onrender.com/delete/task/${id}`,
    );
    setMessage(deleteTask.data);
    getTodos();
  };

  const handleEdit = (item) => {
    setTodo({
      title: item.title,
      description: item.description,
      priority: item.priority,
      category: item.category,
      dueDate: item.dueDate,
    });
    setId(item._id);
    setIsEditing(true);
  };

  useEffect(() => {
    getTodos();
  }, []);


  <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl">Todo App</h1>
      <p className={`${message.success ? "text-green-400" : "text-red-500"}`}>
        {message.message}
      </p>
      <div className="mt-5">
        <input
          type="text"
          placeholder="add task"
          className="border"
          value={todo.title}
          name="title"
          onChange={handleChange}
        />
        <div className="my-4">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Short description"
            className="border block"
            maxLength={80}
            value={todo.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <select name="priority" value={todo.priority} onChange={handleChange}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select name="category" value={todo.category} onChange={handleChange}>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Health">Health</option>
          </select>
        </div>
        <input
          type="date"
          name="dueDate"
          value={todo.dueDate}
          onChange={handleChange}
          className="mb-2 border"
        />
        <button onClick={handleAdd} className="border block">
          {isEditing ? "Update Task" : "Add New Task"}
        </button>
      </div>

      <div className="mt-10">
        <ul>
          {allTasks.map((todo) => (
            <li
              key={todo._id}
              className="list-disc font-semibold relative border"
            >
              {todo.title}
              <p className="text-xs">{todo.description}</p>
              <button
                onClick={() => handleDelete(todo._id)}
                className="border bg-red-200 mt-2"
              >
                delete
              </button>
              <button
                onClick={() => handleEdit(todo)}
                className="border bg-blue-200 mt-2 ml-2"
              >
                Edit
              </button>
              <span className="absolute top-0 right-[5%] p-2 bg-green-200">
                {todo.priority}
              </span>
              <span className="absolute top-0 right-[20%] p-2  bg-yellow-200">
                {todo.status}
              </span>
              <span className="absolute bottom-0 right-[2%] p-2 text-sm">
                Due Date : {formattedDate(todo.dueDate)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>