"use client";

import { useEffect, useState } from "react";
import { IProfile } from "./utils/interfaces/index";
import { Services } from "./utils/services/index";
import { Link } from "@mui/material";

export default function Registrate() {
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [profile, setProfile] = useState<IProfile>();
  const getProfileDetails = async () => {
    try {
      const { data } = await Services.profile();
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
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center">
        <p className="text-4xl font-bold">{message}</p>
        <Link href={process.env.NEXT_PUBLIC_CLIENT_ROOT}>Come back</Link>;
      </div>
    );

  return (
    <>
      <p>{profile.username}</p>
      <p>{profile.email}</p>
      <p>{new Date(profile.createdAt!).toDateString()}</p>
    </>
  );
}
