import { useState } from "react";
import { FiCheckSquare, FiTrash } from "react-icons/fi";
import "../styles/tasklist.scss";

interface Task {
	id: number;
	title: string;
	isComplete: boolean;
}

export function TaskList() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskTitle, setNewTaskTitle] = useState("");

	const getRandomArbitrary = () => {
		return Math.floor(Math.random() * (9999 - 1) + 1);
	};

	const validate = () => {
		if (!newTaskTitle) {
			alert("ATENÇÂO: Título da Task deve ser informado!");
			return false;
		}

		const result = tasks.find((item) => {
			return item.title.toLowerCase() === newTaskTitle.toLowerCase();
		});

		if (result) {
			alert("ATENÇÂO: Título da Task já está cadastrado!");
			return false;
		}

		return true;
	};

	const handleCreateNewTask = () => {
		if (validate()) {
			tasks.push({
				id: getRandomArbitrary(),
				title: newTaskTitle,
				isComplete: false,
			});

			setTasks([...tasks]);
			setNewTaskTitle("");
		}
	};

	const handleToggleTaskCompletion = (id: number) => {
		tasks.map((item) => {
			if (item.id == id) {
				item.isComplete = !item.isComplete;
			}
		});

		setTasks([...tasks]);
	};

	const handleRemoveTask = (id: number) => {
		const result = tasks.filter((item) => {
			return item.id !== id;
		});

		setTasks(result);
	};

	return (
		<section className="task-list container">
			<header>
				<h2>Minhas tasks</h2>

				<div className="input-group">
					<input type="text" placeholder="Adicionar novo todo" onChange={(e) => setNewTaskTitle(e.target.value)} value={newTaskTitle} />
					<button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
						<FiCheckSquare size={16} color="#fff" />
					</button>
				</div>
			</header>

			<main>
				<ul>
					{tasks.map((task) => (
						<li key={task.id}>
							<div className={task.isComplete ? "completed" : ""} data-testid="task">
								<label className="checkbox-container">
									<input type="checkbox" readOnly checked={task.isComplete} onClick={() => handleToggleTaskCompletion(task.id)} />
									<span className="checkmark"></span>
								</label>
								<p>{task.title}</p>
							</div>

							<button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
								<FiTrash size={16} />
							</button>
						</li>
					))}
				</ul>
			</main>
		</section>
	);
}
