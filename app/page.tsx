import Link from "next/link";

function Home() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 max-w-6xl mx-auto">
      {arr.map((item, index) => (
        <Link
          href={`/photos/${item}`}
          className="px-6 py-5 bg-gray-200 flex items-center flex-col justify-center"
          key={index}
        >
          {item.toString()}
        </Link>
      ))}
    </div>
  );
}

export default Home;
