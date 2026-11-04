
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');   
  const [tasks, setTasks] = useState([]); 

  function addTask() {
    if (task.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: task,
      done: false,
    };

    setTasks([...tasks, newTask]);

    setTask('');
  }

  function toggleTask(id) {
    const updatedList = tasks.map(function (t) {
      if (t.id === id) {
        return { ...t, done: !t.done }; 
      }
      return t; 
    });
    setTasks(updatedList);
  }

  function deleteTask(id) {
    const updatedList = tasks.filter(function (t) {
      return t.id !== id; 
    });
    setTasks(updatedList);
  }

  const remaining = tasks.filter(function (t) {
    return t.done === false;
  }).length;

  function renderItem({ item }) {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.taskArea}
          onPress={() => toggleTask(item.id)}
        >
          <Text style={item.done ? styles.doneText : styles.taskText}>
            {item.done ? '✅ ' : '⬜ '}
            {item.title}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Text style={styles.delete}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>My Todo List</Text>
      <Text style={styles.count}>{remaining} tasks remaining</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks yet. Add one!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5851c',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#dcc816',
  },
  count: {
    fontSize: 16,
    color: '#e7bd13',
    marginTop: 4,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#FFE066',
  },
  addBtn: {
    backgroundColor: '#FFC812',
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginLeft: 10,
  },
  addText: {
    color: '#2B2300',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#FFC812',
    elevation: 2,
  },
  taskArea: {
    flex: 1,
  },
  taskText: {
    fontSize: 17,
    color: '#dcba23',
  },
  doneText: {
    fontSize: 17,
    color: '#0fb0b5',
    textDecorationLine: 'line-through',
  },
  delete: {
    fontSize: 20,
    marginLeft: 10,
  },
  empty: {
    textAlign: 'center',
    color: '#deb822',
    marginTop: 40,
    fontSize: 16,
  },
});