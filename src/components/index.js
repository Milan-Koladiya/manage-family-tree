import React, { useEffect, useState } from 'react';
import { Col, Button, UncontrolledAccordion } from 'reactstrap';
import { Collapse, CardBody, Card, CardHeader } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { getParents } from "../redux/parents/actions";
import CloseMaintenance from '../common/CloseMaintenance';
import AddChild from './AddChild';
import EditChild from './EditChild';


const Home = () => {
    const dispatch = useDispatch();
    const Parent = useSelector((state) => state?.ParentReducer?.parents);

    const [show, setShow] = useState(false);
    const [selectChild, setSelectChild] = useState({})
    const [isAddChildModal, setIsAddChildModal] = React.useState(false);
    const [handleData, setHandleData] = useState({});
    const [isEditOpen, setisEditOpen] = useState(false);
    const [toggleQuestion, setToggequestion] = useState(1);

    useEffect(() => {
        dispatch(getParents());
    }, []);

    const toggle = (item) => {
        setShow(!show);
        setSelectChild(item)
    };

    const handleAddChild = () => { setIsAddChildModal(!isAddChildModal) };

    const handleEdit = (data) => {
        setHandleData(data);
        setisEditOpen(!isEditOpen);
    };

    const closeEditChildModal = () => {
        setisEditOpen(!isEditOpen)
    };

    return (
        <div>
            <Col className="card section_filter_list_wrap">
                <header className="card-header">
                    <div className="d-inline" style={{ float: "right" }}>
                        <Button className="btn btn-success" onClick={handleAddChild}>Create Child</Button>
                    </div>
                </header>

                <div>
                    <AddChild isOpen={isAddChildModal} closeAddChildModal={handleAddChild} handleData={handleData} />
                    <EditChild isEditOpen={isEditOpen} closeEditChildModal={closeEditChildModal} handleData={handleData} />
                </div>
                <div className="section_list_table container">
                    <div>
                        <UncontrolledAccordion defaultOpen="1">
                            {Parent?.map((parent, index) => (
                                <Card key={index}>
                                    <CardHeader onClick={() => setToggequestion(index + 1)}>
                                        <span className="font-weight-bold">
                                            <div>
                                                <h4>Parent:- {index + 1}</h4><br /><br />
                                                <p>Name:- {parent?.parent?.name}</p><br /><br />
                                                Age:- {parent?.parent?.age}
                                            </div>
                                        </span>
                                    </CardHeader>
                                    <Collapse isOpen={toggleQuestion === index + 1 ? true : false}>
                                        <CardBody>
                                            {parent?.child?.map((child, index) => (
                                                <div>
                                                    <h6>Child:- {index + 1}</h6>
                                                    <p>Name:- {child?.name}</p>
                                                    <p>Age:- {child?.age}</p>
                                                    <button outline className="me-4 btn btn-danger" onClick={() => toggle(child)}>Delete</button>
                                                    <button outline className="me-4 btn btn-warning" onClick={() => handleEdit(child)}>Edit</button>
                                                </div>
                                            ))}
                                        </CardBody>
                                    </Collapse>
                                </Card>
                            ))}
                        </UncontrolledAccordion>
                    </div>
                </div>
                <CloseMaintenance show={show} toggle={toggle} setshow={setShow} selectChild={selectChild} />
            </Col>
        </div>
    )
}

export default Home;