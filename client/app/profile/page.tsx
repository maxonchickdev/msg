"use client";

import { Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IProfile } from "./utils/interfaces/index";
import { Services } from "./utils/services/index";

export default function Registrate() {
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [profile, setProfile] = useState<IProfile | null>(null);
  const { register, handleSubmit } = useForm<{ file: FileList }>();

  const getProfileDetails = async () => {
    try {
      const { data } = await Services.profile();
      setProfile(data);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "An error occurred");
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
        <Link href={process.env.NEXT_PUBLIC_CLIENT_ROOT}>Come back</Link>
      </div>
    );

  const onSubmit = async (data: { file: FileList }) => {
    if (data.file.length > 0) {
      const file = data.file[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        await Services.uploadAvatar(formData);
        setMessage("Avatar uploaded successfully!");
      } catch (err) {
        setMessage(err instanceof Error ? err.message : "Upload failed");
      }
    } else {
      setMessage("Please select a file to upload.");
    }
  };

  return (
    <>
      <p>{profile.username}</p>
      <p>{profile.email}</p>
      <p>{new Date(profile.createdAt!).toDateString()}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("file")} />
        <input type="submit" />
      </form>
      {message && <p>{message}</p>}
    </>
  );
}
