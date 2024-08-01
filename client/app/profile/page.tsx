"use client";

import { useEffect, useState } from "react";
import { IProfile } from "../utils/interfaces/interfaces";
import { LoginRegistrateService } from "../utils/services/services";
import { CustomError } from "@/app/components/custom/error/error";

export default function Registrate() {
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");
    const [profile, setProfile] = useState<IProfile>();
    const getProfileDetails = async () => {
        try {
            const { data } = await LoginRegistrateService.profile();
            setProfile(data);
        } catch (err) {
            setMessage(err as string);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getProfileDetails();
    }, []);

    if (loading) return <>Loading...</>;

    if (!profile)
        return (
            <CustomError
                href={process.env.NEXT_PUBLIC_CLIENT_ROOT}
                content={message}
            />
        );

    return (
        <>
            <p>{profile.username}</p>
            <p>{profile.email}</p>
            <p>{new Date(profile.createdAt!).toDateString()}</p>
        </>
    );
}
