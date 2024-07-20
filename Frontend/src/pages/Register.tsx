import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
 export type RegisterFormData={
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    confirmpassword:string;
};
const Register=()=>{
    const queryClient = useQueryClient();
    const navigate=useNavigate();
    const {showToast}=useAppContext();
    const {register,watch,handleSubmit,formState:{errors},}=useForm<RegisterFormData>();
    const mutation=useMutation(apiClient.register,{
        onSuccess:async()=>{
            showToast({message:"Registration Success!",type:"SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError:(error:Error)=>{
            showToast({message: error.message,type:"ERROR"});
        },
    });
    const onSubmit=handleSubmit((data)=>
    {
        mutation.mutate(data);
    });
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h1 className="text-3xl text-gray font-bold font-serif">Create an Account</h1>
            <div className="flex flex-col md:flex-row gap-5 ">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    FirstName
                    <input className="border rounder w-full py-1 px-1 font-normal "{...register("firstName",{required:"This field is Required"})}></input>
                    {errors.firstName &&(
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                </label>
            
                <label className="text-gray-700  text-sm font-bold flex-1">
                    LastName
                    <input className="border rounder w-full py-1 px-1 font-normal "{...register("lastName",{required:"This field is Required"})}></input>
                    {errors.lastName &&(
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                </label>
            </div>
            <label className="text-gray-700  text-sm font-bold flex-1">
                    email
                    <input type="email" className="border rounder w-full py-1 px-1 font-normal "{...register("email",{required:"This field is Required"})}></input>
                    {errors.email &&(
                        <span className="text-red-500">{errors.email.message}</span>
                    )}
            </label>
            <label className="text-gray-700  text-sm font-bold flex-1">
                    Password
                    <input type="password" className="border rounder w-full py-1 px-1 font-normal "{...register(
                        "password",{required:"This field is Required",
                        minLength:{value:6,message:"Password must be Atleast 6 characters"
                        }})}></input>
                        {errors.password &&(
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
            </label>
            <label className="text-gray-700  text-sm font-bold flex-1">
                    Confirm Password
                    <input type="password" className="border rounder w-full py-1 px-1 font-normal "{...register(
                        "confirmpassword",
                        {
                            validate:(val)=>{
                                if(!val){
                                    return "This feild is required";
                                }
                                else if(watch("password")!==val){
                                    return "Your password does't match";
                                }
                            },
                        }
                    )
                        }></input>
                        {errors.confirmpassword &&(
                        <span className="text-red-500">{errors.confirmpassword.message}</span>
                    )}
            </label>
            <span>
                <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-400 text-xl">Create Account</button>
            </span>
        </form>
    );
};
export default Register;