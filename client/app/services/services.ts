import axios, { AxiosError } from "axios";
import { ILogin, IProfile, IRegistrate } from "../utils/interfaces/interfaces";

export const LoginRegistrateService = {
    login: async (loginUser: ILogin): Promise<{ status: number }> => {
        try {
            const res = await axios({
                url: "/login",
                method: "post",
                baseURL: "http://localhost:8080/api",
                headers: {
                    "Content-Type": "application/json",
                },
                data: loginUser,
                withCredentials: true,
            });
            return {
                status: res.status,
            };
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                throw new Error(err.response.data.message).message;
            }
            throw new Error("Internal server error").message;
        }
    },

    registrate: async (
        registrateUser: IRegistrate,
    ): Promise<{ status: number }> => {
        try {
            const res = await axios({
                url: "/users",
                method: "post",
                baseURL: "http://localhost:8080/api",
                headers: {
                    "Content-Type": "application/json",
                },
                data: registrateUser,
            });
            return { status: res.status };
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                throw new Error(err.response.data.message).message;
            }
            throw new Error("Internal server error").message;
        }
    },

    validate: async (
        email: string,
        code: string,
    ): Promise<{ status: number }> => {
        try {
            const res = await axios({
                url: `/users/verified?email=${email}&code=${code}`,
                method: "post",
                baseURL: "http://localhost:8080/api",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return { status: res.status };
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                throw new Error(err.response.data.message).message;
            }
            throw new Error("Internal server error").message;
        }
    },

    profile: async (): Promise<{ data: IProfile }> => {
        try {
            const res = await axios<IProfile>({
                url: "/profile",
                method: "get",
                baseURL: "http://localhost:8080/api",
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            return { data: res.data };
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                throw new Error(err.response.data.message).message;
            }
            throw new Error("Internal server error").message;
        }
    },
};
