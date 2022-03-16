import React,{ Fragment } from 'react'

const ToastComponent = ({ title, color }) => (
    <Fragment>
        <div className='toastify-header pb-0'>
            <div className='title-wrapper'>
                <p className={`toast-title text-${color}`} style={{ fontSize: "14px", margin: "0" }}>{title}</p>
            </div>
        </div>
    </Fragment>
)

export default ToastComponent;