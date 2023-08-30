import Image from "next/image";
import CountDownClock from "./components/CountDownClock";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Hello World */}
      {/* {date} */}
      <h1>Hey</h1>
      <CountDownClock />
    </main>
  );
}
