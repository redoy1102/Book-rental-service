"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ClipLoader } from "react-spinners";
import { toast, Toaster } from "sonner";
import Select from "react-select";
import { departments } from "@/data/departments";
import { addBookFormTypes } from "@/types/addBookFormTypes";
import { inputFields } from "@/inputFields/addBookFormInputFields";

export default function AddBookForm() {
  const { control, register, handleSubmit, reset, formState } =
    useForm<addBookFormTypes>({
      defaultValues: {
        writers: [{ name: "" }],
        dob: new Date(),
      },
    });
  const { errors, isDirty, isSubmitting } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "writers",
    control,
  });

  const onSubmit = async (data: addBookFormTypes) => {
    console.log(data);

    const writerNames = data.writers.map((writer) => writer.name.trim()) || [];

    const writerNamesFre: { [key: string]: number } = {};
    writerNames.forEach((name) => {
      writerNamesFre[name] = (writerNamesFre[name] || 0) + 1;
    });
    for (const key in writerNamesFre) {
      if (writerNamesFre[key] > 1) {
        toast.error(`Writer name ${key} is duplicated!`, {
          position: "top-right",
          duration: 3000,
        });
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
        dob: data.dob,
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
  };

  return (
    <div>
      <h1 className="text-3xl md:text-5xl text-center font-bold my-3 md:my-7">
        Add Book
      </h1>
      <form
        className="md:w-2/3 lg:w-1/2 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flex flex-col gap-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputFields.map((field, index) => {
              return (
                <div key={index}>
                  <label className="flex flex-col">
                    <span>{field.title}</span>
                    <input
                      type={field.type}
                      id={field.id}
                      className="text-black p-2 bg-[#D9D9D9] rounded-lg my-1"
                      placeholder={field.placeholder}
                      {...register(field.id as keyof addBookFormTypes, {
                        required: field.requiredText,
                      })}
                    />
                    <p className="text-red-600">
                      {errors[field.id as keyof addBookFormTypes]?.message}
                    </p>
                  </label>
                </div>
              );
            })}

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
          </div>

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
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-center">
          {isSubmitting ? (
            <ClipLoader color="#FFFFFF" className="mt-4" />
          ) : (
            <button
              disabled={!isDirty}
              className="bg-[#A8FF35] rounded-full px-8 py-2 text-black font-bold text-2xl mt-4"
            >
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
