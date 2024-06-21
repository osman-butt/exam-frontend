import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Background from "@/assets/athletics.png";

export default function Home() {
  return (
    <div
      className="z-0 w-full h-full"
      style={{ backgroundImage: `url(${Background})`, backgroundSize: "cover" }}
    >
      <div className="overflow-hidden text-black bg-opacity-80 bg-zinc-50">
        <div className="max-w-[800px] w-full h-screen m-[-28px] mx-auto text-center flex flex-col justify-center">
          <p className="font-bold text-black">PLACEHOLDER HERO</p>
          <h1 className="text-4xl font-bold md:text-7xl sm:text-6xl md:py-6">
            MAIN TEXT.
          </h1>
          <div className="flex items-center justify-center">
            <p className="py-4 text-xl font-bold md:text-5xl sm:text-4xl">
              SUBTEXT
            </p>
            <div className="pl-2 text-xl font-bold md:text-5xl sm:text-4xl md:pl-4" />
          </div>
          <p className="text-xl font-bold text-gray-500 md:text-2xl">
            SUBSUBTEXT
          </p>
          {/* <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
            Get Started
          </button> */}
          <Button className="w-[200px] mx-auto my-6">Get Started</Button>
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto py-4 px-4 grid md:grid-cols-3 gap-8 text-gray-800/80">
        <div className="flex flex-col gap-y-2">
          {/* <Link
            to={"https://github.com/osman-butt"}
            className="text-center hover:text-black"
          >
            Frontend Repository
          </Link>
          <Link
            to={"https://github.com/osman-butt"}
            className="text-center hover:text-black"
          >
            Backend Repository
          </Link> */}
          <Link
            to={"https://github.com/osman-butt"}
            className="w-6 hover:text-black"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6 fill-slate-900/60 hover:fill-black"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
              ></path>
            </svg>
          </Link>
        </div>
        <p className="text-center">Made by Osman</p>
        <p className="text-center"></p>
      </div>
    </div>
  );
}
