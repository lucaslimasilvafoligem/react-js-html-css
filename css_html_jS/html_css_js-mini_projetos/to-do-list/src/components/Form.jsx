import { TextField, Button, Paper } from '@mui/material'
import React, { useState } from 'react'

export default function Form({addTodo}) {
  const [text, setText] = useState(null);
  const [id, setId] = useState(0);

  const todoCreate = (text) => {
    const todoObj = { text: text, id: id };
    setId(id + 1);
    addTodo(todoObj);
    document.getElementById("outlined").value=null;
  };

  return (
    <Paper style={{padding:"3em"}}>
      <div style={{display: "flex", justifyContent: "center" }}>
        <TextField id="outlined" label="Tarefa" variant="outlined" onChange={(e) => setText(e.target.value)} fullWidth />
        <Button variant="text" onClick={() => todoCreate(text) } >Add</Button>
      </div>
    </Paper>
  )
}
