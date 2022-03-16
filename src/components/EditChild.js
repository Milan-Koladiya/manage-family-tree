import React, { useEffect } from 'react'
import * as Yup from "yup";
import {  Modal, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import axiosApi from '../api/api';
import ToastComponent from '../common/Toast';
import { getParents } from "../redux/parents/actions";

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.number().required("Age is required")
});


const EditChild = ({ isEditOpen, closeEditChildModal, handleData }) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {name: "", age: "", parent: ""},
        resolver: yupResolver(schema),
    });

    useEffect(()=>{
            Object.keys(handleData).map((key)=>setValue(key,handleData[key]))
    },[handleData])

    const onSubmitHandler = async (data) => {
        const editedDate = {
            name: data.name,
            age: data.age,
            parent: data.parent,
            id: data._id
        }
        const result = await axiosApi.put('/child/edit', editedDate);
        if (result?.data?.success) {
            dispatch(getParents());
            closeEditChildModal();
            toast.success(<ToastComponent title={"Edited child successfully"} color='success' />, {
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
            <Modal isOpen={isEditOpen}
                className="App"
                toggle={closeEditChildModal}>
                <ModalBody >
                <div>
                <h4 className='text-center' style={{fontFamily:"cursive"}}>Edit Child</h4>
                <from>
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
                        <div>
                            <button className="btn btn-secondary p-2" onClick={closeEditChildModal}>Cancel</button>
                            <button className="btn btn-primary p-2" style={{float:"right"}}  onClick={handleSubmit(onSubmitHandler)}>Edit</button>
                        </div>
                    </div>
                </from>
            </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default EditChild