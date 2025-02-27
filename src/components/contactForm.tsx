"use client";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type formValues = {
  userName: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const { control, register, handleSubmit } = useForm<formValues>();

  const onSubmit = async (data: formValues) => {
    console.log(data);

    const res = await fetch("/api/contactForm", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userName: data.userName,
        email: data.email,
        message: data.message,
      }),
    });

    // Check if the request was successful
    if (!res.ok) {
      console.error("Failed to submit the form.");
    } else {
      console.log("Form submitted successfully");
    }
  };

  return (
    <div>
      <h1 className="text-center text-6xl font-bold mb-12">Contact.</h1>
      <form
        className="w-1/2 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flex flex-col gap-4 ">
          <label className="flex flex-col gap-6">
            <span>Your Name</span>
            <input
              type="text"
              id="userName"
              className="text-black p-2 bg-[#D9D9D9] rounded-lg"
              {...register("userName", { required: "User name is required" })}
            />
          </label>

          <label className="flex flex-col gap-6">
            <span>Your Email</span>
            <input
              type="email"
              id="email"
              className="text-black p-2 bg-[#D9D9D9] rounded-lg"
              {...register("email", { required: "Email is required" })}
            />
          </label>

          <label className="flex flex-col gap-6">
            <span>Your Message</span>
            <textarea
              id="message"
              className="text-black p-2 bg-[#D9D9D9] rounded-lg"
              rows={7}
              {...register("message", { required: "Message is required" })}
            />
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-[#A8FF35] rounded-full px-11 py-3 text-black font-bold text-2xl mt-12">
            Submit
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
}
