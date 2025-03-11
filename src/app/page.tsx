export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <h1 className="text-2xl md:text-5xl font-bold text-center">Code with Redoy Book Rental Service</h1>
        <p className="mt-4 text-center text-xl">
          Recycle Books, Save Trees, Save Money, Save Time
        </p>
        <div className="flex items-center justify-center ">
          <button className="text-lg px-5 py-2 md:px-11 md:py-3 md:text-2xl bg-[#A8FF35] rounded-full text-black font-bold mt-6">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
