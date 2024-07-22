"use client";

import { useEffect, useState } from "react";
import { IProfile } from "../utils/interfaces/interfaces";
import { LoginRegistrateService } from "../utils/services/services";
import { CustomError } from "@/app/components/custom/error/error";

export default function Registrate() {
    const [message, setMessage] = useState<string>("");
    const [profile, setProfile] = useState<IProfile>();
    useEffect(() => {
        const getProfileDetails = async () => {
            try {
                const { data } = await LoginRegistrateService.profile();
                setProfile(data);
            } catch (err) {
                setMessage(err as string);
            }
        };
        getProfileDetails();
    }, []);

    if (!profile) return <CustomError href="/" content={message} />;

    return (
        <>
            <p>{profile.username}</p>
            <p>{profile.email}</p>
            <p>{new Date(profile.createdAt!).toDateString()}</p>
        </>
    );
}
