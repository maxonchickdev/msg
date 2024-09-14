"use client";

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { IProfile } from './ProfileUtils/ProfileInterfaces/Profile.interfaces'
import { ProfileServices } from './ProfileUtils/ProfileServices/profile.services'

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [profile, setProfile] = useState<IProfile | null>(null);
  const { register, handleSubmit } = useForm<{ file: FileList }>();

  const getProfileDetails = async () => {
    try {
      const { data } = await ProfileServices.profile();
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

  const onSubmit = async (data: { file: FileList }) => {
    if (data.file.length > 0) {
      const file = data.file[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        await ProfileServices.uploadAvatar(formData);
        setMessage("Avatar uploaded successfully!");
      } catch (err) {
        setMessage(err instanceof Error ? err.message : "Upload failed");
      }
    } else {
      setMessage("Please select a file to upload.");
    }
  };

  if(!profile) return

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
