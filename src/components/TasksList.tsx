import React from 'react';
import { FlatList } from 'react-native';
import TaskListItem from './TaskListItem';


export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleUpdateTaskTitle: (id: number, title: string) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, handleUpdateTaskTitle }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({...props}) => (
        <TaskListItem  
          removeTask={removeTask} 
          toggleTaskDone={toggleTaskDone} 
          handleUpdateTaskTitle={handleUpdateTaskTitle} 
          {...props} 
        />
      )}
      style={{
        marginTop: 32
      }}
    />
  )
}

