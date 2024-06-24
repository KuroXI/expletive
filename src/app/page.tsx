import { ExampleCode } from "@/components/common/ExampleCode";
import { Logo } from "@/components/common/Logo";
import { TryForm } from "@/components/common/TryForm";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto grid min-h-screen max-w-screen-lg grid-rows-3 justify-center py-10">
      <div className="row-span-2 space-y-10">
        <div className="flex max-w-xl flex-col gap-2 px-2 text-center md:px-0">
          <h1 className="text-5xl font-extrabold">
            Say What You Mean, Without <span>🤬</span>
          </h1>
          <p className="text-lg text-primary/70">
            Detect strong language instantly - less than 2 seconds is all it
            takes.
          </p>
          <div className="flex items-center justify-center gap-5">
            <ExampleCode />
            <Button variant="link" className="border">
              <Star className="mr-2" size={20} />
              <Link href="https://github.com/KuroXI/profanity">
                Star on Github
              </Link>
            </Button>
          </div>
        </div>
        <TryForm />
      </div>
      <div className="flex flex-col items-center justify-end gap-2">
        <h1 className="text-center">Powered by</h1>
        <div className="flex items-center gap-10">
          <Logo href="https://groq.com/" src="/groqcloud.svg" alt="GroqCloud" />
          <Logo href="https://upstash.com" src="/upstash.svg" alt="Upstash" />
        </div>
      </div>
    </div>
  );
}
