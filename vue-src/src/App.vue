<script lang="ts">
	import Task from './components/Task.vue';

	type TaskInfo = {
		[index: string]: any
		date: Date,
		name: String,
		status: TaskStatus,
		id: id,
		desc: string
	};

	type id = number;

	export enum TaskStatus {
		done,
		not_done,
		overdue
	};

	function task_mapper (task: any): TaskInfo {
		let result: TaskInfo = {
			name: task.fields.name,
			desc: task.fields.desc,
			date: new Date(task.fields.date),
			status: task.fields.status ? TaskStatus.done : TaskStatus.not_done,
			id: task.fields.taskID
		};

		for (let key in Object.keys(result))
			if (result[key] !== undefined &&
				result[key] !== null)
				throw new Error("One or more values are missing");

		return result;
	}

	export default {
		components: {
			Task
		},

		async mounted () {

			let saved_data;
			let old_tasks;

			try {
				saved_data = await fetch("/api/tasks", {
					method: "GET",	
					headers: {
						"X-CSRFToken": this.csrf
					},
				});

				old_tasks = await saved_data.json();
			} catch (exc) {
				alert("Error retrieving tasks");
			}

			for (let task of old_tasks) {
				try {
					this.tasks.push(task_mapper(task));
				} catch (exc) {
					alert("Error parcing a task");
				}
			}
		},

		data () {
            let formatter = Intl.DateTimeFormat("ru-RU", { hour: '2-digit', minute: '2-digit' });
            let date_ = formatter.format(new Date());

			let data: {
				tasks: TaskInfo[],
				date: string,
				states: typeof TaskStatus,
				currentType: TaskStatus | null,
				csrf: string
			} = {
				tasks: [],
				date: date_,
				states: TaskStatus,
				currentType: null,
				csrf: (document.querySelector("[name=csrfmiddlewaretoken]") as HTMLFormElement).value
			}

			return data;
		},

		computed: {
			tasksShownCurrently () {
				return this.tasks.filter(task => {
					if (this.currentType == TaskStatus.overdue &&
						task.status == TaskStatus.not_done)
						return task.date.getTime() < new Date ().getTime()

					return task.status == this.currentType || this.currentType == null
				});
			}
		},

		methods: {
			removeTask ({ taskID }: { taskID: number }) {
				try {
					fetch("/api/tasks/", {
						method: "DELETE",
						headers: {
							"X-CSRFToken": this.csrf
						},
						body: JSON.stringify({ id: taskID })
					});
				} catch (exc) {
					alert("Failed to contact the server, try again");
					return;
				}

				this.tasks = this.tasks.filter(task => task.id != taskID);
			},

			addTask (name: string, desc: string, time: string) {
				let timeComponents = time.split(":");
				let date = new Date ();

				date.setHours(+timeComponents[0]);
				date.setMinutes(+timeComponents[1])

				let item = {
					name,
					date,
					status: TaskStatus.not_done,
					id: this.generateID(),
					desc
				}

				this.tasks.push(item);

				fetch("/api/tasks/", {
					method: "PUT",
					headers: {
						"X-CSRFToken": this.csrf
					},
					body: JSON.stringify(item)
				})
			},

			filterTasksByState (type: TaskStatus | null) {
				this.currentType = type;
			},

			updateTaskText ({ taskID, name, desc } : { taskID: id, name: string, desc: string }) {
				fetch("/api/tasks/", {
					method: "PATCH",
					headers: {
						"X-CSRFToken": this.csrf
					},
					body: JSON.stringify({
						id: taskID, name, desc
					})
				});
			},

			// синхрон тасков-элементов и моделей тасков
			updateTaskStatus ({ taskID, status } : { taskID: id, status: TaskStatus }) {
				let taskToUpdate = this.tasks.find(task => task.id == taskID);
				if (!taskToUpdate) throw new Error("Task ID not found — " + taskID);

				taskToUpdate.status = status;

				fetch("/api/tasks/", {
					method: "PATCH",
					headers: {
						"X-CSRFToken": this.csrf
					},
					body: JSON.stringify({
						id: taskID, status
					})
				});
			},

			generateID () {
				return new Date().getTime();
			}
		}
	};
</script>

<template>
  	<main>
		<div class="main">
			<div class="tabs">
				<div class="tab all-tab"
					:class="currentType === null ? 'selected' : ''"
					@click="filterTasksByState(null)">
				<div class="tab-text">all</div></div>
				<div class="tab done-tab"
					:class="currentType === states.done ? 'selected' : ''" 
					@click="filterTasksByState(states.done)">
				<div class="tab-text">done</div></div>
				<div class="tab not-done-tab"
					:class="currentType === states.not_done ? 'selected' : ''"
					@click="filterTasksByState(states.not_done)">
				<div class="tab-text">not done</div></div>
				<div class="tab not-done-tab"
					:class="currentType === states.overdue ? 'selected' : ''"
					@click="filterTasksByState(states.overdue)">
				<div class="tab-text">over due</div></div>
			</div>
			<div class="task-container">
				<div class="task-container__list" ref="task_list">
					<Task v-for="task in tasksShownCurrently" :info="task"
						@status-change="updateTaskStatus"
						@text-change="updateTaskText"
						@remove-pressed="removeTask"
						:key="task.id"></Task>
				</div>
				<div class="task-container__controls">
					<div class="task-container__control-row">
						<input class="task-container__name-field" placeholder="New Task Name" ref="new_task_name">
						<input class="task-container__date-field" type="time" :value="date" ref="new_task_date">
						<input type="button"
							class="task-container__add-button"
							@click="addTask($refs.new_task_name.value, $refs.new_task_text.value, $refs.new_task_date.value)"
							value="Add Task">
					</div>
					<div class="task-container__control-area">
						<textarea class="task-container__description-field" ref="new_task_text" placeholder="description"></textarea>
					</div>
				</div>
			</div>
		</div>
  	</main>
</template>

<style scoped>
	main {
		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.main {
		display: flex;
		width: 50%;
		min-height: 50%;
		max-height: 100%;
		height: auto;
	}

	.tabs {
		display: flex;
		flex-direction: column;
		gap: 1%;
	}

	.tab {
		display: flex;
		justify-content: left;
		align-items: stretch;
		width: 2vw;
		height: 2vw;
		color: white;
		
		box-sizing: border-box;
		padding-right: 10%;
		cursor: pointer;
	}

	.tab.selected {
		padding-right: 0;
		cursor: default;
	}

	.tab-text {
		display: flex;
		justify-content: center;
		align-items: center;
		background: slategray;
		flex-grow: 1;
	}

	.task-container {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		flex-grow: 1;
		flex-shrink: 0;

		background:slategray;
	}

	.task-container__list {
		height: 80%;
		flex-shrink: 0;
	}

	.task-container__controls {
		display: flex;
		flex-direction: column;
		min-height: 20%;
		flex-shrink: 0;
	}

	.task-container__control-row {
		display: flex;
		height: 3vw;
		flex-shrink: 0;
	}

	.task-container__name-field {
		flex-grow: 1;
		padding-left: 3%;
	}

	.task-container__add-button {
		width: 20%;
	}

	.task-container__description-field {
		box-sizing: border-box;
		padding: 1%;
		height: 100%;
		width: 100%;
		min-height: 3vw;
		min-width: 100%;
		max-width: 100%;
	}
</style>
