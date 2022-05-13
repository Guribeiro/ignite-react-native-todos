import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    try {

      const findTaskWithSameTitle = tasks.find(task => task.title === newTaskTitle);

      if(findTaskWithSameTitle) throw new Error()

      const newTask:Task = {
        id: new Date().getMilliseconds(),
        title: newTaskTitle,
        done: false
      }
  
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      Alert.alert('Ops...', 'Já existe uma tarefa com esse título')
    }
   
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

  function handleUpdateTaskTitle(id: number, title: string){
    try {
      
    const findTaskIndex = tasks.findIndex(task => task.id === id);

    const findTaskWithSameTitle = tasks.find(task => task.title === title);

    if(findTaskWithSameTitle) throw new Error()

    const newTasksArray = [...tasks];

    let task = newTasksArray[findTaskIndex];

    task = {
      ...task,
      title
    }

    newTasksArray[findTaskIndex] = task;
     
    setTasks(newTasksArray);
    } catch (error) {
      Alert.alert('Ops...', 'Já existe uma tarefa com esse título')
    }
  }

  function handleRemoveTask(id: number) {

    Alert.alert('Alerta de Exclusão', 'Deseja mesmo excluir essa task?', [
      {
        text: 'Excluir',
        style: 'default',
        onPress: () => setTasks(prev => prev.filter(task => task.id !== id))
      },
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => {}
      }
    ], {
      cancelable: true,
    })
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        handleUpdateTaskTitle={handleUpdateTaskTitle}
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