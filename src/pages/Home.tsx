import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask:Task = {
      id: new Date().getMilliseconds(),
      title: newTaskTitle,
      done: false
    }

    setTasks(prev => [...prev, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const findTaskIndex = tasks.findIndex(task => task.id === id);

    const newTasksArray = [...tasks];

    let task = newTasksArray[findTaskIndex];

    task = {
      ...task,
      done: !task.done
    }

    newTasksArray[findTaskIndex] = task;
     
    setTasks(newTasksArray);
  }

  function handleRemoveTask(id: number) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})