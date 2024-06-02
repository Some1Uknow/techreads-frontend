import Header from "./Header";

const Home = () => {
  return (
    <div className="text-white min-h-screen bg-gradient-to-tr from-slate-900 to-zinc-800">
      <Header />
      <div className="px-4 py-10 md:px-16 md:py-20 flex flex-col md:flex-row items-center">
        <h1 className="text-4xl md:text-8xl md:w-2/3 font-bold font-Chakra mb-4 md:mb-0">
          The place <br />
          to share <br />
          creative ideas
        </h1>
        <p className="md:w-1/2 text-2xl md:text-6xl font-Chakra mt-6 md:mt-0">
         Leverage the power of <b>AI</b> to publish quickly from start to end.
        </p>
      </div>
      <p className="text-2xl md:text-4xl text-center p-4 md:p-8 font-Chakra">
        Explore the latest insights, trends, and innovations in the world of
        technology.
      </p>
    </div>
  );
};

export default Home;
