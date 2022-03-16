import React, { useEffect } from 'react'
import {  Modal, ModalBody } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axiosApi from '../api/api';
import ToastComponent from '../common/Toast';
import { getParents } from "../redux/parents/actions";

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.number().required("Age is required"),
    parent: Yup.string().required("Parent is required")
});


const AddChild = ({ isOpen, closeAddChildModal, handleData={} }) => {
    const Parent = useSelector((state) => state?.ParentReducer?.parents);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = async (data) => {
        if (data.parent == "Select type") {
            delete data.parent
        }
        const result = await axiosApi.post('/child/create', data);
        if (result?.data?.success) {
            dispatch(getParents());
            closeAddChildModal();
            toast.success(<ToastComponent title={"Created child successfully"} color='success' />, {
              autoClose: 3000,
              hideProgressBar: true,
              closeButton: false
            })
          }
          else {
            toast.error(<ToastComponent title={"There was some error ocuured"} color='danger' />, {
              autoClose: 3000,
              hideProgressBar: true,
              closeButton: false
            })
          }  
    }

    return (
        <div>
            <Modal isOpen={isOpen}
                className="App"
                toggle={closeAddChildModal}>
                <ModalBody >
                <div>
                <h4 className='text-center' style={{fontFamily:"cursive"}}>Create Child</h4>
                <from >
                    <div className="card-body">
                        <div className="row my-2 mx-0">
                            <div className="col-sm-12 form-inline p-0 c-datatable-filter mb-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">Name</span>
                                    </div>
                                    <input
                                        type="text" className="form-control" id="basic-url" placeholder="Name" {...register("name")} required aria-describedby="basic-addon3" />
                                </div>
                                <span className="text-danger">{errors?.name?.message}</span>
                            </div>
                        </div>
                        <div className="row my-2 mx-0">
                            <div className="col-sm-12 form-inline p-0 c-datatable-filter mb-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">Age</span>
                                    </div>
                                    <input
                                        type="number" className="form-control" id="basic-url" placeholder="Age" {...register("age")} required aria-describedby="basic-addon3" />
                                </div>
                                <span className="text-danger">{errors?.email?.message}</span>
                            </div>
                        </div>
                        <div className="row my-2 mx-0">
                            <div className="col-sm-12 form-inline p-0 c-datatable-filter mb-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">Parent</span>
                                    </div>
                                    <select 
                                        type="text" className="form-control" id="basic-url" placeholder="Parent" {...register("parent")} aria-describedby="basic-addon3" >
                                        <option>Select type</option>
                                        {Parent?.map((parent) => (
                                            <option value={parent?.parent?._id}>{parent?.parent?.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <span className="text-danger">{errors?.email?.message}</span>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-secondary p-2" onClick={closeAddChildModal}>Cancel</button>
                            <button className="btn btn-primary p-2" onClick={handleSubmit(onSubmitHandler)} style={{float:"right"}}>Create</button>
                        </div>
                    </div>
                </from>
            </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default AddChild