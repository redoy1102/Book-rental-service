import connectDB from "@/lib/db";
import Book from "@/models/book";

export async function POST(req) {
  try {
    const { bookTitle, writerNames, bookCode, bookHolder, price, department } =
      await req.json();

    // Ensuring that DB Connection is established
    await connectDB();

    // Save the form data to the database
    const newBook = new Book({
      bookTitle,
      writerNames,
      bookCode,
      bookHolder,
      price,
      department,
    });

    await newBook.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Add book form submitted successfully.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to submit the add book form." }),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
}
