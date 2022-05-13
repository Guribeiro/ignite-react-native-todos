import React, { useCallback, useState } from 'react';
import { ListRenderItemInfo, Image, TouchableOpacity, View, Text, StyleSheet, TextInput  } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';

import {Task} from './TasksList';

interface TaskListItem extends ListRenderItemInfo<Task> {
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    handleUpdateTaskTitle:(id: number, title: string) => void;
}

const TaskListItem = ({index, item, removeTask, toggleTaskDone, handleUpdateTaskTitle}:TaskListItem):JSX.Element => {

    const [taskTitle, setTaskTitle] = useState(item.title);

    const [isEditing, setIsEditing] = useState(false);
    
    const updateTask = useCallback((id: number, title: string) => {
        handleUpdateTaskTitle(id, title)

        setIsEditing(false);
        setTaskTitle('')
    },[])

 
    return (
        <ItemWrapper index={index}>
        <View>
          <TouchableOpacity
            testID={`button-${index}`}
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={() => toggleTaskDone(item.id)}
          >
            <View 
              testID={`marker-${index}`}
              style={item.done ? styles.taskMarkerDone : styles.taskMarker}
            >
              { item.done && (
                <Icon 
                  name="check"
                  size={12}
                  color="#FFF"
                />
              )}
            </View>

            {isEditing ? (
                <TextInput 
                    autoFocus 
                    style={styles.input} 
                    value={taskTitle} 
                    onChangeText={setTaskTitle} 
                    onSubmitEditing={() => updateTask(item.id, taskTitle)} 
                 />
            ): (
                <Text 
                style={item.done ? styles.taskTextDone : styles.taskText}
              >
                {item.title}
              </Text>
            )}

            
          </TouchableOpacity>
        </View>


        <View style={styles.buttonsRow}>
          {isEditing ? (
                <TouchableOpacity
                testID={`x-${index}`}
                onPress={() => setIsEditing(false)}
                >
                  <Icon name='x' size={24} color='#B2B2B2' />
              </TouchableOpacity>
          ): (
              <TouchableOpacity
              onPress={() => {
                  setIsEditing(true)
                  setTaskTitle(item.title)
              }}
              >
                <Icon name='edit-3' size={20} color='#B2B2B2' />
            </TouchableOpacity>
          )}
          <View style={styles.separator} />
          <TouchableOpacity
            testID={`trash-${index}`}
            onPress={() => removeTask(item.id)}
            >
              <Icon name='trash-2' size={20} color={isEditing ? '#B2B2B230' : '#B2B2B2'} />
          </TouchableOpacity>
        </View>
      </ItemWrapper>
    )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium',
      lineHeight: 30,
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    buttonsRow : {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 24,
    },
    separator: {
      height: 20,
      width: 1,
      backgroundColor: '#999',
      marginHorizontal: 20,
    },
    input:{
      padding: 0,
      color: '#666',
      margin: 0,
      fontFamily: 'Inter-Medium',
      lineHeight: 30,
    }
  })

export default TaskListItem;