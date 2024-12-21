import axios from "@/src/services/api/axios";
// import { store } from "@/src/states/store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpAnimation,
  signUpRenderAnimation,
  signUp,
  signUpStick,
  signUpBare,
} from "@publicPagesStyles/";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { BiSolidRightArrow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Si42, SiGithub } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const signUpSchema = z.object({
  email: z
    .string({ message: "email is required" })
    .max(50, { message: "max email length is 50 chars" })
    .email({ message: "Enter valid email" }),
  username: z
    .string({ message: "username is required" })
    .min(3, { message: "username length must be more than 3 chars" })
    .max(50, { message: "username length is less than 50 chars" }),
  password: z
    .string({ message: "password is required" })
    .min(3, { message: "password must be more than 3 chars" })
    .max(30, { message: "password must be less than 30 chars" }),
});

type SignUpSchemaType = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(signUpSchema) });
  useEffect(() => {}, []);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<SignUpSchemaType> = async (
    data: SignUpSchemaType
  ) => {
    try {
      await axios.post("signup", JSON.stringify(data));
      navigate("/sign-in", { replace: true });
    } catch (err) {
      if (err instanceof AxiosError) {
        const error: AxiosError = err as AxiosError;
        if (!error.response) {
          setErrorMsg("No Server Response");
        } else if (error.response?.status === 401) {
          setErrorMsg("Unauthorized");
        } else {
          setErrorMsg("Login Failed");
        }
      } else {
        setErrorMsg(errorMsg);
      }
      console.log(errorMsg);
    }
  };
  const onError: SubmitErrorHandler<SignUpSchemaType> = async (dataerror) => {
    console.log("error function in sign in email : " + dataerror?.email);
    console.log("error function in sign in passwd : " + dataerror?.password);
    console.log("error function in sign in root : " + dataerror?.root);
    console.log(dataerror);
  };
  const startAnimationSignUp = (): void => {
    const animation = document.querySelector(".animationSelectorSignUp");
    animation?.classList.remove(signUpRenderAnimation);
    animation?.classList.add(signUpAnimation);
    setTimeout(() => {
      navigate("/sign-in");
    }, 700);
  };
  return (
    <div
      className={`d-flex animationSelectorSignUp w-100 ${signUpRenderAnimation} ${signUp}`}
    >
      <div className="w-100 ">
        <div className="d-flex justify-content-center h-100">
          <form
            className="w-75 my-auto"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div className="mb-4">
              <input
                type="text"
                className="form-control rounded-5 p-2"
                placeholder="Name...."
                {...register("username", { required: true })}
                autoComplete={"off"}
              />
              {errors?.username && (
                <span className="text-danger">{errors.username.message}</span>
              )}
            </div>
            <div className="mb-4 ">
              <input
                type="password"
                className="form-control rounded-5 p-2"
                placeholder="Password...."
                {...register("password", { required: true })}
                autoComplete={"off"}
              />
              {errors?.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="form-control rounded-5 p-2"
                placeholder="Email...."
                {...register("email", { required: true })}
                autoComplete={"off"}
              />
              {errors?.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>
            <div className="d-flex justify-content-evenly mb-4 p-2">
              <Link
                to="#42"
                className="text-decoration-none rounded-5 p-1 pe-2 pb-1 text-center"
                target="_blank"
                style={{ background: "#8D6B92" }}
              >
                <Si42 size={40} color="#000000" />
              </Link>
              <Link
                to="#github"
                className="text-decoration-none rounded-5 p-1 text-center"
                target="_blank"
                style={{ background: "#8D6B92" }}
              >
                <SiGithub size={40} color="#000000" />
              </Link>
              <Link
                to="#google"
                className="text-decoration-none rounded-5 p-1 text-center"
                target="_blank"
                style={{ background: "#8D6B92" }}
              >
                <FcGoogle size={40} color="#000000" />
              </Link>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="rounded-5 px-5 py-1 h4 m-0 text-nowrap"
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={`border d-flex my-auto mx-3 me-5 p-0  ${signUpBare}`}>
        <p
          className="text-center h4 m-1"
          onClick={() => startAnimationSignUp()}
        >
          SIGN
          <BiSolidRightArrow className="m-0 me-2 my-3" size="1em" />
          IN
        </p>
      </div>
      <div className={`my-auto ms-4 ${signUpStick} `}></div>
    </div>
  );
};

export default SignUp;
