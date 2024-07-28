import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CRUD = () => {
    // from bootstrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // add variable
  const [rollnum, setRollNumber] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [marks, setMarks] = useState(0);
  const [isPass, setIsPass] = useState(0);

  //edit varible
  const [editRollnum, setEditRollNumber] = useState(0);
  const [editfirstname, setEditFirstName] = useState('');
  const [editlastname, setEditLastName] = useState('');
  const [editMatks, setEditMarks] = useState(0);
  const [editisPass, setEditIsPass] = useState(0);

   // setData
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // Update API
  // edit  button
  const handleEdit = (id) => {
   
    handleShow();
        axios.get(`https://localhost:7235/api/Student/${id}`)
        .then((result)=>{
            setEditRollNumber(result.data.rollnum);
            setEditFirstName(result.data.firstname);
            setEditLastName(result.data.lastname);
            setEditMarks(result.data.totalmarks);
            setEditIsPass(result.data.isPass);
        })
        .catch((error)=>
        {
            console.log(error)
        })
  };

  // update button
  const handleUpdate = () => {
    const url= `https://localhost:7235/api/Student/${rollnum}`;
    const data ={
                
        "rollnum": editRollnum,
        "firstname": editfirstname,
        "lastname": editlastname,
        "totalmarks": editMatks,
        "isPass": editisPass              
        }
        axios.put(url,data)
        .then((result)=>
        {
            getData();
            toast.success('Student data is updated');
            clear();
        }).catch((error)=>{
            toast.error('Student data can not updated');
        })
  };

  
 

  // API
  const getData = ()=>
    {
            axios.get('https://localhost:7235/api/Student')
            .then((result)=>{
                setData(result.data)
            })
            .catch((error)=>
            {
                console.log(error)
            })
    }

    // this useEffect to display data on screen , it will get data from backend
    useEffect(() => {
        getData();
      }, []);


    // to clear form after adding and updating data
    const clear =()=>
        {
                setRollNumber(0);
                setFirstName('');
                setLastName('');
                setRollNumber(0);
                setEditMarks(0);
                setIsPass(0);

                setEditRollNumber(0);
                setEditFirstName('');
                setEditLastName('');
                setEditRollNumber(0);
                setEditMarks(0);
                setEditIsPass(0);

        }
    const handleSave=()=>
        {
            const url='https://localhost:7235/api/Student';
            const data ={
                
                    "rollnum": rollnum,
                    "firstname": firstname,
                    "lastname": lastname,
                    "totalmarks": marks,
                    "isPass": isPass              
            }
            axios.post(url,data)
            .then((result)=>
            {
                getData();
                toast.success('Student data is added');
                clear();
            }).catch((error)=>{
                toast.error('Student data can not added');
            })
            
        }

        // delete button API
  const handleDelete = (id) => {
    if (window.confirm("do you really want to delete?")=== true) {
     axios.delete(`https://localhost:7235/api/Student/${id}`)
     .then((result)=>
    {
        if(result.status === 200)
            {
                toast.success('Student data is deleted');
               
            }
            getData();
    })
    .catch((error)=>
    {    
            toast.error(error);
    })
    }
  };
        // to get value for IsPass 
    const handleisPassChange=(e)=>
        {
            if(e.target.checked)
            {
                    setIsPass(1);
            }
            else
            {
                    setIsPass(0);
            }

        }

    /*const handleEditisPassChange=(e)=>
        {
                if(e.target.checked)
                {
                        setIsPass(1);
                }
                else
                {
                        setIsPass(0);
                }
    
        }*/

     




  return (
    <Fragment>
        <ToastContainer/>
      <Container>
        <Row>
        <Col>
            
            <input type="number" placeholder="enter Rollnumber" value={rollnum} onChange={(e)=> setRollNumber(e.target.value)}></input>
          </Col>
          <Col>
            <input type="text" placeholder="enter first name" value={firstname} onChange={(e)=> setFirstName(e.target.value)}></input>
          </Col>
          <Col>
            <input type="text" placeholder="enter last name" value={lastname} onChange={(e)=> setLastName(e.target.value)}></input>
          </Col>
          <Col>
            <input type="number" placeholder="enter marks" value={marks} onChange={(e)=> setMarks(e.target.value)}></input>
          </Col>
          <Col>
            <input type="checkbox" checked={isPass ===1? true: false} value={isPass} onChange={(e)=> handleisPassChange(e)} /> <label>IsPass</label>
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={()=>handleSave()}>Submit</button>
          </Col>
        </Row>
      </Container>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Roll number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Total Marks</th>
            <th>IsPass</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((i, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{i.rollnum}</td>
                    <td>{i.firstname}</td>
                    <td>{i.lastname}</td>
                    <td>{i.totalmarks}</td>
                    <td>{i.isPass}</td>
                    <td colSpan={2}>
                      <button className="btn btn-primary" onClick={() => handleEdit(i.rollnum)}>   Edit </button>
                      &nbsp;
                      <button   className="btn btn-danger"   onClick={() => handleDelete(i.rollnum)}  >    Delete  </button>
                    </td>
                  </tr>
                );
              })
            : "Loading.."}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col>
            <input type="number" placeholder="enter Rollnumber" value={editRollnum} onChange={(e)=> setEditRollNumber(e.target.value)}></input>
          </Col>
          <Col>
            <input type="text" placeholder="enter first name" value={editfirstname} onChange={(e)=> setEditFirstName(e.target.value)}></input>
          </Col>
          <Col>
            <input type="text" placeholder="enter last name" value={editlastname} onChange={(e)=> setEditLastName(e.target.value)}></input>
          </Col>
          <Col>
            <input type="number" placeholder="enter marks" value={editMatks} onChange={(e)=> setEditMarks(e.target.value)}></input>
          </Col>
          <Col>
            <input type="checkbox" checked={editisPass===1? true : false} value={editisPass} onChange={(e)=> setEditIsPass(e)}/> <label>IsPass</label>
          </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CRUD;
