import { RootState } from "@/src/states/store"
import { useSelector } from "react-redux"
import { redirect } from "react-router-dom";

export const isAuthenticatedLoader = async (isAuthenticated:boolean) => {
    // const isAuthenticated = useSelector((state: RootState) => state.authenticator.value);
    if (isAuthenticated) throw redirect("/");
    return false;
}