import { Login, SignUp } from "@/types/stateTypes";
import { atom } from "recoil";

export const signUpDefault : SignUp = {
    firstName : '',
    lastName : '',
    email : '' ,
    password : '',
    confirmPassword : '',
    otp : '',
    accountType : 'Customer'
}

export const loginDefault : Login = {
    email : '',
    password : ''
} 

export const SignUpformState = atom<SignUp>({
    key : 'signupForm',
    default : signUpDefault
})

export const loginFormState = atom<Login>({
    key : 'loginForm',
    default : loginDefault
})