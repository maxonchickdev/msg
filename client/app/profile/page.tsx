"use client";

import { useEffect, useState } from "react";
import { IProfile } from "../utils/interfaces/interfaces";
import { useRouter } from "next/navigation";
import { LoginRegistrateService } from "../services/services";

export default function Registrate() {
    const [message, setMessage] = useState<string>("");
    const [profile, setProfile] = useState<IProfile>();
    const router = useRouter();
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

    if (!profile) return <p>{message}</p>;

    return (
        <>
            <p>{profile.username}</p>
            <p>{profile.email}</p>
            <p>{new Date(profile.createdAt!).toDateString()}</p>
        </>
    );
}
