import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import './App.css';

// items in list
const listItems = [
  {
    id: "1",
    name: "Study Spanish"
  },
  {
    id: "2",
    name: "Study Coding"
  },
  {
    id: "3",
    name: "Go to Gym"
  },
  {
    id: "4",
    name: "Color Make"
  }
]

// style drag and drop
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `0 50px 15px 50px`,
  background: isDragging ? "#4a2975" : "white",
  color: isDragging ? 'white' : 'black',
  border: `1px solid black`,
  borderRadius: `5px`,

  ...draggableStyle
});

function App() {
  const [todo, setTodo] = useState(listItems);

  const onDragEnd = (result: DropResult) => {
    // destructure items
    const {source, destination} = result
    if (!destination) return;

    const items = Array.from(todo)
    const [newOrder] = items.splice(source.index, 1)
    items.splice(destination.index, 0, newOrder)

    setTodo(items)
  }
  
  return (
    <div className="App">
      <h1>Drag and Drop</h1>

      {/* library stuff https://github.com/atlassian/react-beautiful-dnd */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='todo'>
          {(provided) => (
            <div className='todo' {...provided.droppableProps} ref={provided.innerRef}>
              {/* map over the todo list */}
              {todo.map(({id, name}, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        {name}
                      </div>
                    )}
                  </Draggable>
                )
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
