import { useState } from "react";

const TaskCard = (props) => {
  const [msg, setMsg] = useState("button not click");
  function handleClick() {
    setMsg("button clicked successfully");
  }
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">{props.title}</h2>

      <p className="mt-2 text-sm text-slate-500">{props.description}</p>
      <button
        onClick={handleClick}
        className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        CLICK ME
      </button>
      <p className="mt-3 text-sm text-green-600">{msg}</p>
    </div>
  );
};

export default TaskCard;
