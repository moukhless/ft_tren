import axios from "@/src/services/api/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInAnimation,
  signIn,
  signInStick,
  signInRenderAnimation,
  signInBare,
} from "@publicPagesStyles/index.ts";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { BiSolidLeftArrow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Si42, SiGithub } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import ModalOtp from "@publicPages/not-signed-in/ModalOtp";
import setAuthenticationData from "@pages/modules/setAuthenticationData";
import ModalComponent from "../../../router/layouts/components/ModalComponent";
import Modal from "react-modal";

const signInSchema = z.object({
  email: z
    .string({ message: "email is required" })
    .max(50, { message: "max email length is 50 chars" })
    .email({ message: "Enter valid email" }),
  password: z
    .string({ message: "password is required" })
    .min(3, { message: "password must be more than 3 chars" })
    .max(30, { message: "password must be less than 30 chars" }),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

const authenticateWithThirdParty = async (thirdParty: string) => {
  try {
    const test = await axios.post("oauth", { platform: thirdParty });
    console.log("testing authentication using a third party ");
    console.log(test);
  } catch (err) {
    console.log(
      "error from authentication using using a third party  " + thirdParty
    );
    console.log(err);
  }
};
const customStyles: Modal.Styles | undefined = {
  content: {
    padding: "0px",
    top: "0px",
    left: "0px",
  },
  overlay: {
    margin: "0px",
    padding: "0px",
    maxHeight: "100%",
    maxWidth: "100%",
  },
};
const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({ resolver: zodResolver(signInSchema) });
  useEffect(() => {}, []);
  const startAnimationSignIn = (): void => {
    const animation = document.querySelector(".animationSelectorSignIn");
    animation?.classList.remove(signInRenderAnimation);
    animation?.classList.add(signInAnimation);
    setTimeout(() => {
      navigate("/sign-up");
    }, 700);
  };
  const [errorMsg, setErrorMsg] = useState("");
  const [emailForOtp, setEmailForOtp] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const lastLocation = location.state?.from?.pathname || "/game";
  console.log("signIn rendered");
  const onSubmit: SubmitHandler<SignInSchemaType> = async (
    data: SignInSchemaType
  ) => {
    try {
      const res = await axios.post("login", data);
      console.log("res");
      console.log(res);
      if (res.data) {
        if (res.data["2fa"] === true) {
          setEmailForOtp(res?.data["email"]);
          setIsOpen(true);
        }
        if (setAuthenticationData(res.data?.access)) {
          navigate(lastLocation, { replace: true });
        }
      } else {
        throw new AxiosError("No data provided by server");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const error: AxiosError = err as AxiosError;
        console.log(error);
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
  const onError: SubmitErrorHandler<SignInSchemaType> = async (dataerror) => {
    console.log("error function in sign in email : " + dataerror?.email);
    console.log("error function in sign in passwd : " + dataerror?.password);
    console.log("error function in sign in root : " + dataerror?.root);
  };
  return (
    <div
      className={`d-flex flex-row-reverse animationSelectorSignIn w-100 ${signInRenderAnimation} ${signIn}`}
    >
      <ModalComponent
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        className=""
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        shouldFocusAfterRender={true}
        shouldReturnFocusAfterClose={true}
        shouldCloseOnEsc={true}
        id={`modalOtp`}
      >
        <ModalOtp email={emailForOtp} setIsOpen={setIsOpen} />
      </ModalComponent>
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
                placeholder="Email...."
                autoComplete="on"
                {...register("email", { required: true })}
              />
              {errors?.email && (
                <span className="text-danger">{errors.email.message}</span>
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
            <div className="d-flex justify-content-evenly mb-4 p-2">
              <div
                className="text-decoration-none rounded-5 p-1 pe-2 pb-1 text-center"
                style={{ background: "#8D6B92" }}
                onClick={() => authenticateWithThirdParty("42")}
              >
                <Si42 size={40} color="#000000" />
              </div>
              <div
                className="text-decoration-none rounded-5 p-1 text-center"
                style={{ background: "#8D6B92" }}
                onClick={() => authenticateWithThirdParty("github")}
              >
                <SiGithub size={40} color="#000000" />
              </div>
              <div
                className="text-decoration-none rounded-5 p-1 text-center"
                style={{ background: "#8D6B92" }}
                onClick={() => authenticateWithThirdParty("gmail")}
              >
                <FcGoogle size={40} color="#000000" />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="rounded-5 px-5 py-1 h4 m-0 text-nowrap"
              >
                SIGN IN
              </button>
            </div>
            {errorMsg && (
              <span className="text-danger bg-warning-subtle row m-0 ">
                {errorMsg}
              </span>
            )}
            {/* <div className="mb-4 ">
              <input
                type="text"
                className="form-control rounded-5 p-2"
                placeholder="otp code...."
                {...register("otp", { required: false })}
                autoComplete={"off"}
              />
              {errors?.otp && (
                <span className="text-danger">{errors.otp.message}</span>
              )}
            </div> */}
          </form>
        </div>
      </div>
      <div className={`border d-flex my-auto mx-3 ms-5 p-0  ${signInBare}`}>
        <p
          className="text-center h4 m-1"
          onClick={() => startAnimationSignIn()}
        >
          SIGN
          <BiSolidLeftArrow className="m-0 me-2 my-3" size="1em" />
          UP
        </p>
      </div>
      <div className={`my-auto me-4 ${signInStick} `}></div>
    </div>
  );
};

export default SignIn;
