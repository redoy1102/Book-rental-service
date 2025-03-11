export type addBookFormTypes = {
  dob: Date;
  bookTitle: string;
  writers: {
    name: string;
  }[];
  department: { value: string; label: string };
  bookCode: string;
  bookHolder: string;
  price: number;
};
