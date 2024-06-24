"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Prism } from "react-syntax-highlighter";
import { darcula as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button } from "../ui/button";
import { getBaseURL } from "@/lib/utils";
import { toast } from "sonner";

const code = `const response = await fetch("${getBaseURL()}/api/check", {
  method: "POST",
  body: JSON.stringify({
    message: "the quick brown fox jumps over the lazy dog"
  })
});

console.log(await response.json());`;

export const ExampleCode = () => {
  const copyCode = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => toast.success("Copied to the clipboard"))
      .catch(() => toast.error("Something went wrong while copying the code."));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Example Code</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <Prism
          customStyle={{ borderRadius: "10px 10px 10px 10px" }}
          PreTag="div"
          language="typescript"
          style={theme}
        >
          {code}
        </Prism>
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" onClick={copyCode}>
            Copy Code
          </Button>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
