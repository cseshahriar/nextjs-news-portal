"use client"
import React, {useState} from 'react';
import SubmitButton from "@/components/master/SubmitButton";
import {useRouter} from "next/navigation";
import {ErrorToast, IsEmail, IsEmpty, SuccessToast} from "@/utility/FormHelper";


const CommentForm = (props) => {
    let router = useRouter()
    let [data, setData] = useState({postID: parseInt(props.postID), description:""})
    let [submit, setSubmit] = useState(false)

    const inputOnChange = (name, value) => {
        setData((data)=>({
            ...data,
            [name]: value
        }))
    }

    const formSubmit = async () => {
        if(IsEmpty(data.description)){
            ErrorToast("Description Required!")
        }
        else {
            setSubmit(true);
            const options = {method:'POST', body:JSON.stringify(data)}
            let res = await (await fetch("/api/comments/manage", options)).json();

            setSubmit(false);
            if(res['status'] === "success"){
                SuccessToast("Request Completed");
                router.refresh();
            }
            else {
                router.replace("/user/login")
            }
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-12 p-4">
                    <h5 className="mb-3">Write Yours</h5>
                    <textarea value={data.description} rows={6} onChange={(e) => {inputOnChange('description', e.target.value)}} className="form-control mb-2"/>
                    <SubmitButton className="btn btn-danger mt-3" onClick={formSubmit} submit={submit} text="Submit"/>
                </div>
            </div>
        </div>
    );
};

export default CommentForm;