import Images from "@/components/Images";
import PromptInput from "@/components/PromptInput";

export default function Home() {
  return (
    <>
      <PromptInput />
      <main className="mx-0">
        <Images />
      </main>
    </>
  );
}
