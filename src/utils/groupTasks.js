export function groupTasks(tasksObj) {
    const tasks = Object.values(tasksObj);

    const groups = [];
    const map = {};

    tasks.forEach((task) => {
        if (!task.parallelGroup) {
            groups.push([task]);
        } else {
            if (!map[task.parallelGroup]) {
                map[task.parallelGroup] = [];
                groups.push(map[task.parallelGroup]);
            }
            map[task.parallelGroup].push(task);
        }
    });

    return groups;
    //   [
    //   [t_001],
    //   [t_002, t_003, t_004],
    //   [t_005]
    // ]
}