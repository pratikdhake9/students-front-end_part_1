import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper, Button} from "@mui/material";
import {useEffect, useState} from "react";

export default function Student() {
    const paperstyle={padding:'50px 20px',width:400,margin:"20px auto"}
    const[name,setName]=useState('')
    const [address,setAddress]=useState('')
    const[students,setstudents]=useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const student={name,address}
        console.log(student)
        fetch("http://localhost:8080/student/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
            console.log("new student added")
        })


    }
    useEffect(()=>{
        fetch("http://localhost:8080/student/getAll").then(res=>res.json())
            .then((result)=>{
            setstudents(result)
        })
    })

    return (

        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 20},
            }}
            noValidate
            autoComplete="off"
        >
        <Container>
            <Paper elevation={3} style={paperstyle}>
                <h1><u>Add Student</u></h1>
    <TextField id="standard-basic" label="student name" variant="standard" fullWidth
    value={name}
    onChange={(e)=>setName(e.target.value)}
    />
                <TextField id="standard-basic" label="student address" variant="standard" fullWidth
            value={address}
                           onChange={(e)=>setAddress(e.target.value)}
                />
                <br/>
                <br/>
                <Button variant="outlined" onClick={handleClick}>Submit</Button>
                {name}
                {address}

        </Paper>
            <h2>Students</h2>
            <Paper elevation={3} style={paperstyle}>
                {students.map(student=>(
                    <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
                        Id:{student.id}<br/>
                        name:{student.name}<br/>
                        address:{student.address}
                    </Paper>)
                    )}
            </Paper>
        </Container>
        </Box>

    );
}
