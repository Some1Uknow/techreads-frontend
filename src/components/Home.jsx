import Header from "./Header";
const Home = () => {
  return (
    <div className="text-white h-screen bg-gradient-to-tr from-slate-900 to-zinc-800">
      <Header />
      <div className="px-16 py-20 flex flex-row items-center">
        <h1 className="text-8xl w-2/3 font-bold font-Chakra  mb-4">
          The place <br />
          to share <br />
          creative ideas
        </h1>
        <p className=" w-1/2 text-6xl font-Chakra">
          Connecting technocrats, inspiring innovation and driving technological
          advancement.
        </p>
      </div>
      <p className="text-4xl  text-center p-8 font-Chakra">
        Explore the latest insights, trends, and innovations in the world of
        technology.
      </p>
    </div>
  );
};

export default Home;

