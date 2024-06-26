"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { UserProfile, UserProfileSchema } from "../lib/userProfileSchema";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";

type Props = {};

const ProfileForm = (props: Props) => {
  const [uploading, Setuploading] = useState(false);
  const router = useRouter();
  const form = useForm<UserProfile>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      imgUrl: "",
      address: "",
      email: "",
    },
  });

  async function onSubmit(values: UserProfile) {
    try {
      const response = await axios.post("/api/profile", values);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error", error.response.data);
      } else {
        console.error("unexpected error", error);
      }
    }
    console.log(values);
  }

  const handleReset = () => {
    form.reset();
  };

  if (form.formState.isSubmitSuccessful) {
    toast.success("User Details Updated Successfully");
    router.push("/");
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-w-xl space-y-3">
            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel>
                    {field.value ? (
                      <Image
                        src={field.value}
                        alt="profile_icon"
                        width={96}
                        height={96}
                        priority
                        className="rounded-full object-contain"
                      />
                    ) : (
                      <Image
                        src="/person.svg"
                        alt="profile_icon"
                        width={70}
                        height={70}
                        className="object-contain bg-gray-800 rounded-full"
                      />
                    )}
                  </FormLabel>
                  <FormControl className=" text-gray-300">
                    <UploadButton
                      endpoint="imageUploader"
                      className="p-2 cursor-pointer"
                      onUploadBegin={() => Setuploading(true)}
                      onClientUploadComplete={(res) => {
                        field.onChange(res[0].url);
                        console.log("this", field.value);
                        Setuploading(false);
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(error.message);
                      }}
                      appearance={{
                        button:
                          "p-2 bg-blue-500 border-[1px] border-gray-400 text-white",
                      }}
                    />
                  </FormControl>
                  {uploading && <Loader2 className="animate-spin" />}
                </FormItem>
              )}
            />
            <div className="flex-col flex gap-4 md:flex-row md:justify-between">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-end py-5 gap-2">
            <Button type="reset" variant={"outline"} onClick={handleReset}>
              Reset
            </Button>
            {form.formState.isSubmitting ? (
              <Button className="flex gap-2">
                <Loader2 className="animate-spin" />
                Submitting
              </Button>
            ) : (
              <Button type="submit" className="bg-blue-500">
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
