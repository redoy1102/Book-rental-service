"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast, Toaster } from "sonner";

type formValues = {
  userName: string;
  email: string;
  message: string;
  phoneNumbers: string[];
  phNumbers: {
    number: string;
    email: string;
    price: number;
  }[];
};

export default function ContactForm() {
  const { control, register, handleSubmit, reset, formState } =
    useForm<formValues>({
      defaultValues: {
        // phNumbers: [{ number: "" }],
      },
    });
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: formValues) => {
    setLoading(true);
    console.log(data);

    // const additionalPhoneNumbers =
    //   data.phNumbers?.map((phNumber) => phNumber.number) || [];
    const additionalPhoneNumbers = data.phNumbers || [{}];

    const res = await fetch("/api/contactForm", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userName: data.userName,
        email: data.email,
        message: data.message,
        primaryPhoneNumber: data.phoneNumbers[0],
        secondaryPhoneNumber: data.phoneNumbers[1],
        additionalPhoneNumbers: additionalPhoneNumbers,
      }),
    });

    // Check if the request was successful
    if (!res.ok) {
      console.error("Failed to submit the form.");
    } else {
      console.log("Form submitted successfully");
      toast.success("Message sent successfully!", {
        position: "top-right",
        duration: 3000,
      });
      reset();
    }

    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl md:text-5xl text-center font-bold my-6">
        Add Book
      </h1>
      <form
        className="md:w-2/3 lg:w-1/2 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flex flex-col gap-4 ">
          {/* Your name */}
          <label className="flex flex-col">
            <span>Your Name</span>
            <input
              type="text"
              id="userName"
              className="text-black p-2 bg-[#D9D9D9] rounded-lg my-1"
              {...register("userName", {
                required: "User name is required",
              })}
            />
            <p className="text-red-600">{errors.userName?.message}</p>
          </label>

          {/* Your email */}
          <label className="flex flex-col">
            <span>Your Email</span>
            <input
              type="email"
              id="email"
              className="text-black p-2 bg-[#D9D9D9] rounded-lg my-1"
              {...register("email", { required: "Email is required!" })}
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </label>

          {/* Your message */}
          <label className="flex flex-col">
            <span>Your Message</span>
            <textarea
              id="message"
              className="text-black p-2 bg-[#D9D9D9] rounded-lg my-1"
              rows={7}
              {...register("message", { required: "Message is required" })}
            />
            <p className="text-red-600">{errors.message?.message}</p>
          </label>

          {/* Primary Phone number */}
          <label className="flex flex-col">
            <span>Primary Phone number</span>
            <input
              id="primaryPhoneNumber"
              className="text-black p-2 bg-[#D9D9D9] rounded-lg my-1"
              {...register("phoneNumbers.0", {
                required: "Primary phone number is required",
              })}
            />
            <p className="text-red-600">{errors.phoneNumbers?.message}</p>
          </label>

          {/* Secondary Phone number */}
          <label className="flex flex-col">
            <span>Secondary Phone number</span>
            <input
              id="secondaryPhoneNumber"
              className="text-black p-2 bg-[#D9D9D9] rounded-lg my-1"
              {...register("phoneNumbers.1", {
                required: "Secondary phone number is required",
              })}
            />
            <p className="text-red-600">{errors.phoneNumbers?.message}</p>
          </label>

          <div>
            {fields.length > 0 && (
              <h1 className="text-center">List of phone numbers</h1>
            )}
            <div>
              {fields.map((field, index) => {
                return (
                  <div className="grid grid-cols-12 my-1 gap-2" key={field.id}>
                    <div className="col-span-10">
                      <div className="flex flex-col">
                        <label className="flex flex-col">
                          <span>Phone number</span>
                          <input
                            type="text"
                            {...register(`phNumbers.${index}.number` as const, {
                              required: "Phone number is required!",
                            })}
                            className="text-black p-2 bg-[#D9D9D9] rounded-lg my-1"
                            placeholder="Enter phone number"
                          />
                        </label>

                        <input
                          type="text"
                          {...register(`phNumbers.${index}.email` as const, {
                            required: "Email is required!",
                          })}
                          className="text-black p-2 bg-[#D9D9D9] rounded-lg my-1"
                          placeholder="Enter email"
                        />
                        <input
                          type="number"
                          {...register(`phNumbers.${index}.price` as const, {
                            valueAsNumber: true,
                            required: {
                              value: true,
                              message: "Book price is required!",
                            },
                          })}
                          className="text-black p-2 bg-[#D9D9D9] rounded-lg my-1"
                          placeholder="Enter book price"
                        />
                      </div>
                    </div>
                    <button
                      className="col-span-2 bg-red-700 rounded-lg"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
              <div className="flex justify-center">
                <button
                  className="bg-[#A8FF35] px-5 py-1 rounded text-black"
                  type="button"
                  onClick={() => append({ number: "", email: "", price: 0 })}
                >
                  Add Phone number
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          {loading ? (
            <ClipLoader color="#FFFFFF" className="mt-4" />
          ) : (
            <button className="bg-[#A8FF35] rounded-full px-11 py-3 text-black font-bold text-2xl mt-12">
              Submit
            </button>
          )}
        </div>
      </form>

      <Toaster />
      <DevTool control={control} />
    </div>
  );
}
