import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  bookTitle: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
    minLength: [2, "Book title must be at least 2 characters long"],
  },
  writerNames: {
    type: [String],
    required: [true, "Writer names are required"],
    validate: {
      validator: function(names: string[]){
        return names.length > 0;
      },
    }
  },
  bookCode: {
    type: String,
    required: [true, "Book code is required"],
    trim: true,
    minLength: [3, "Book code must be at least 3 characters long"],
  },
  bookHolder: {
    type: String,
    required: [true, "Book holder name is required"],
    trim: true,
    minLength: [3, "Book holder name must be at least 3 characters long"],
  },
  price: {
    type: Number,
    required: [true, "Book price is required!"],
    trim: true,
    min: [0, "Price must be a positive number"],
  },
});

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;
