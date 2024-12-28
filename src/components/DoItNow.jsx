import { useContextApp } from "../context/AppContext";
import Tasks from "./Tasks";
import Title from "./Title";

const DoItNow = () => {
  const { tasks } = useContextApp();
  const doItNowTasks = tasks.filter((task) => task.completed === false);
  const orderTasks = doItNowTasks
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="h-full overflow-y-auto">
      <Title text="Do It Now" />
      <Tasks tasks={orderTasks} />
    </div>
  );
};

export default DoItNow;
