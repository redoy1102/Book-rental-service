import connectDB from "@/lib/db";
import Contact from "@/models/contact";

export async function POST(req) {
  try {
    const {
      userName,
      email,
      message,
      facebook,
      twitter,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      additionalPhoneNumbers,
    } = await req.json();

    // Ensuring that DB Connection is established
    await connectDB();

    // Save the form data to the database
    const newContact = new Contact({
      userName,
      email,
      message,
      facebook,
      twitter,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      additionalPhoneNumbers: additionalPhoneNumbers || [{}]
    });

    await newContact.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact form submitted successfully.",
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
      JSON.stringify({ error: "Failed to submit contact form." }),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
}
