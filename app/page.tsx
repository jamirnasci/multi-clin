'use client'
import SideBar from "./_components/sidebar/SideBar";
import { PacienteSection } from "./_components/sections/PacienteSection";
import { useState } from "react";

export default function Home() {
  const [SelectedSection, setSelectedSection] = useState(() => PacienteSection)
  return (
    <div className="flex flex-row flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <SideBar changeSection={setSelectedSection}/>
      <main className="bg-white w-full flex justify-center min-h-screen p-2">
        {<SelectedSection/>}
      </main>
    </div>
  );
}
