import NavBar from "@/components/NavBar";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <div className="flex flex-col h-screen ">
      <NavBar />
      <div className="w-full h-full flex justify-center items-center">
        <Profile />
      </div>
    </div>
  );
}
