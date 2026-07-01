
import { useTodo } from "@/context/TodoContext";
import TodoColumn from "./TodoColumn";

  const AllTasks = () => {
const {tasks,  filters} = useTodo()

const pendingTasks = tasks.filter(task => task.status === "pending");
const completedTasks = tasks.filter(task => task.status === "completed");

    return (
      <div className=" scrollbar-[1px] scrollbar-thumb-accent scrollbar-track-transparent">
        {tasks.length === 0 ? (
          <div className="text-center py-10 capitalize w-full flex flex-col justify-center items-center h-[50vh]">
            <h3 className="text-lg font-semibold">No tasks yet!</h3>
            <p className="text-muted-foreground">
              Create a new task to get started.
            </p>
          </div>
        ) : (
          <>
        {filters.status === "All Status" && (
          <div className={`grid gap-x-4 h-[calc(100vh-150px)] ${completedTasks.length > 0  && pendingTasks.length === 0  || pendingTasks.length > 0 && completedTasks.length === 0  ? '' : 'md:grid-cols-2'}`}>
          {
            pendingTasks.length > 0 && (
                <TodoColumn
              title="Todo List"
              color="blue"
              grid={completedTasks.length === 0 && 'grid! grid-cols-2 gap-x-4' }
              tasks={pendingTasks}
            />
            )
          }

          {
            completedTasks.length > 0 && (
              <TodoColumn
                title="Completed List"
                color="green"
                tasks={completedTasks}
                grid={pendingTasks.length === 0 && 'grid! grid-cols-2 gap-x-4'}
              />
            )
          }
          </div>
        )}

        {filters.status === "pending" && (
          <TodoColumn
            title="Todo List"
            color="blue"
            tasks={tasks}
            grid={'grid! grid-cols-2 gap-x-4'}
          />
        )}

        {filters.status === "completed" && (
          <TodoColumn
            title="Completed List"
            color="green"
            tasks={tasks}
            grid={'grid! grid-cols-2 gap-x-4'}
          />
        )}
      </>
        )}
      </div>
    );
  };

  export default AllTasks;
