"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast, Toaster } from "sonner";
import Select from "react-select";

type formValues = {
  bookTitle: string;
  writers: {
    name: string;
  }[];
  department: { value: string; label: string };
  bookCode: string;
  bookHolder: string;
  price: number;
};

export default function AddBookForm() {
  const { control, register, handleSubmit, reset, formState } =
    useForm<formValues>({
      defaultValues: {
        writers: [{ name: "" }],
      },
    });
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "writers",
    control,
  });

  const [loading, setLoading] = useState(false);
  const departments = [
    { value: "cse", label: "CSE Department" },
    { value: "civil", label: "Civil Department" },
    { value: "eee", label: "EEE Department" },
    { value: "bba", label: "BBA Department" },
    { value: "agriculture", label: "Agriculture Department" },
    { value: "english", label: "English Department" },
  ];

  const onSubmit = async (data: formValues) => {
    setLoading(true);
    console.log(data);

    const writerNames = data.writers.map((writer) => writer.name.trim()) || [];
    
    const writerNamesFre:{[key: string]: number} = {}
    writerNames.forEach(name => {
      writerNamesFre[name] = (writerNamesFre[name] || 0) + 1
    })
    for(const key in writerNamesFre){
      if(writerNamesFre[key] > 1){
        toast.error(`Write name ${key} is duplicated!`, {
          position: "top-right",
          duration: 3000,
        })
        setLoading(false);
        return;
      }
    }


    const res = await fetch("/api/addBook", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        bookTitle: data.bookTitle,
        writerNames: writerNames,
        bookCode: data.bookCode,
        bookHolder: data.bookHolder,
        price: data.price,
        department: data.department.value,
      }),
    });

    // Check if the request was successful
    if (!res.ok) {
      console.error("Failed to submit the form.");
    } else {
      console.log("Form submitted successfully");
      toast.success("Book is added successfully!", {
        position: "top-right",
        duration: 3000,
      });
      reset({
        bookTitle: "",
        writers: [{ name: "" }],
        department: { value: "", label: "" },
        bookCode: "",
        bookHolder: "",
        price: 0,
      });
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
          {/* book title */}
          <label className="flex flex-col">
            <span>Book title</span>
            <input
              type="text"
              id="bookTitle"
              className="text-black p-2 bg-[#D9D9D9] rounded-lg my-1"
              placeholder="Enter the name of the book"
              {...register("bookTitle", {
                required: "Book title is required",
              })}
            />
            <p className="text-red-600">{errors.bookTitle?.message}</p>
          </label>

          {/* Writer names */}
          <div>
            {fields.length > 1 && (
              <h1 className="text-xl md:text-3xl text-center">
                List of writers
              </h1>
            )}
            <div>
              {fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <span>Writer name</span>
                    <div className="grid grid-cols-12 my-1 gap-2">
                      <div className="col-span-10">
                        <div className="flex flex-col">
                          <label className="flex flex-col">
                            <input
                              type="text"
                              {...register(`writers.${index}.name` as const, {
                                required: "writer name is required!",
                              })}
                              className="text-black p-2 bg-[#D9D9D9] rounded-lg my-1"
                              placeholder="Enter writer name"
                            />
                          </label>
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
                  </div>
                );
              })}
              <div className="flex justify-center">
                <button
                  className="bg-[#A8FF35] px-5 py-1 rounded text-black"
                  type="button"
                  onClick={() => append({ name: "" })}
                >
                  Add writer name
                </button>
              </div>
            </div>
          </div>

          {/* Department */}
          <label className="flex flex-col">
            <span>Select department</span>
            <Controller
              name="department"
              control={control}
              rules={{ required: "Department is required!" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={departments}
                  className="text-black bg-[#D9D9D9] my-1"
                  placeholder="Select department"
                />
              )}
            />
            <p className="text-red-600">{errors.department?.message}</p>
          </label>

          {/* Book code */}
          <label className="flex flex-col">
            <span>Book code</span>
            <input
              type="bookCode"
              id="bookCode"
              placeholder="Enter book code"
              className="text-black p-2 bg-[#D9D9D9] rounded-lg my-1"
              {...register("bookCode", { required: "Book code is required!" })}
            />
            <p className="text-red-600">{errors.bookCode?.message}</p>
          </label>

          {/* Book holder */}
          <label className="flex flex-col">
            <span>Book holder name</span>
            <input
              type="text"
              id="bookHolder"
              placeholder="Enter the name of the book holder"
              className="text-black p-2 bg-[#D9D9D9] rounded-lg my-1"
              {...register("bookHolder", {
                required: "Book holder name is required",
              })}
            />
            <p className="text-red-600">{errors.bookHolder?.message}</p>
          </label>

          {/* Price */}
          <label className="flex flex-col">
            <span>Price</span>
            <input
              type="number"
              id="price"
              className="text-black p-2 bg-[#D9D9D9] rounded-lg my-1"
              placeholder="Enter the price of the book"
              {...register("price", {
                required: "Book price is required",
              })}
            />
            <p className="text-red-600">{errors.price?.message}</p>
          </label>
        </div>

        <div className="flex items-center justify-center">
          {loading ? (
            <ClipLoader color="#FFFFFF" className="mt-4" />
          ) : (
            <button className="bg-[#A8FF35] rounded-full px-8 py-2 text-black font-bold text-2xl mt-4">
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
