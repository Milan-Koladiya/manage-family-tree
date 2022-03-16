import React from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import { useDispatch } from "react-redux";
import { XCircle, } from 'react-feather'
import { toast } from 'react-toastify'
import ToastComponent from '../common/Toast';
import axiosApi from '../api/api';
import { getParents } from "../redux/parents/actions";


const CloseMaintenance = ({ show, toggle, setshow, selectChild }) => {
    const dispatch = useDispatch();

    const closeChild = async () => {
        const result = await axiosApi.delete(`/child/delete?id=${selectChild?._id}`);
        if (result.data.success) {
            dispatch(getParents());
            toast.success(<ToastComponent title={'"Deleted child successfully"'} color='success' />, {
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false
            })
            setshow(false)
        } else {
            toast.error(<ToastComponent title={'There was some error ocuured'} color='danger' />, {
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false
            })
        }
    };

    return (
        <Modal isOpen={show} fade={false} toggle={toggle} centered>
            <ModalBody>
                <XCircle size={50} color={'#e55353'} className="remove_icon" />
                <h5 className='text-center mt-4'>Are you sure you want to delete child?</h5>
                <div className='all-center mt-4'>
                    <Button outline className="me-4 btn btn-danger" onClick={() => setshow(false)}>No</Button>
                    <Button color="primary" onClick={closeChild}>Yes</Button>
                </div>
            </ModalBody>
        </Modal>
    )
};

export default CloseMaintenance;