import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined.js";
import {Fromik} from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state/index.js";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween.jsx";

const registerSchema=yup.object().shape(
{
    firstName:yup.string().required("required"),
    lastName:yup.string().required("required"),
    email:yup.string().email( "invalid email").required("required"),
    password:yup.string().required("required"),
    loaction:yup.string().required("required"),
    occupation:yup.string().required("required"),
    picture:yup.string().required("required"),
})

const loginSchema=yup.object.shape({
email:yup.string().email("Invalid Email").required("required"),
password:yup.string().required("required"),

})

const initialValuesRegister={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    location:"",
    occupation:"",
    picture:"",
}

const initialValuesLogin={
    email:"",
    password:"",
}

const Form =()=>{
    const [pageType,setPageType]=useState("login");
    const {palette}=useTheme();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const isNonMobile=useMediaQuery("(min-width:600px)");
    const isLogin=pageType==="login";
    const isRegister=pageType==="login";
    
}

export default Form;