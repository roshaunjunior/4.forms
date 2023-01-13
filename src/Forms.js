import React from 'react' ;
import './Forms.css' ;
import { useForm } from 'react-hook-form';
import * as yup from 'yup' ;
import {yupResolver} from '@hookform/resolvers/yup';

export default function Forms() {

  const schema = yup.object().shape({
    fullName: yup.string().matches(/^[a-zA-Z ]*$/, 'MUST_BE_CHARACTER').required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().min(18).required(),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'),null]).required(),

  });

  const {register , handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(schema) 
  }) ;

  const onSubmit = (data) => {
    console.log(data) ; 
  }
  return (

    <form className='form' onSubmit={handleSubmit(onSubmit)}>
        
        <input type="text" placeholder = "Full Name." {...register("fullName")}/> 
        <p>{errors.fullName?.message}</p>

        <input type="text" placeholder = "Email..." {...register("email")}/>
        <p>{errors.email?.message}</p>

        <input type="number" placeholder = "Age." 
        {...register("age")}/>
        <p>{errors.age?.message}</p>

        <input type="text" placeholder = "Password..."
        {...register("password")}/>
        <p>{errors.password?.message}</p>

        <input type="text" placeholder = "Cnfrm pass."
        {...register("confirmPassword")}/>
        <p>{errors.confirmPassword?.message}</p>

        <input type="submit"/>
    </form>
  
  )
}
