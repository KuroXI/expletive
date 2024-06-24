"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ResultType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardCopy, CornerDownLeft, Loader2 } from "lucide-react";
import {
  ChangeEvent,
  KeyboardEvent,
  createRef,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { cn, getBaseURL, getRandomMessage } from "@/lib/utils";
import {
  cleanMessageResponses,
  profanityDetectedResponses,
} from "@/lib/constant";

const FormSchema = z.object({
  message: z.string(),
});

export const TryForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [result, setResult] = useState<ResultType | null>(null);

  // api cold start
  useEffect(() => {
    const coldStart = async () => {
      const response = await fetch("/api/check");
      return response.status;
    };

    return () => {
      coldStart();
    };
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const startTime = Date.now();
    setLoading(true);

    const response = await fetch("/api/check", {
      method: "POST",
      body: JSON.stringify({ message: data.message }),
    });

    setResult(await response.json());
    setLoading(false);
    setTimer(Date.now() - startTime);
  }

  const formRef = createRef<HTMLFormElement>();

  const adjustHeight = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "36px";
    const height = e.currentTarget.scrollHeight;
    e.currentTarget.style.height = `${height + 2}px`;
  };

  const shortcut = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      if (formRef.current && e.currentTarget.value) {
        formRef.current.requestSubmit();
      }

      e.preventDefault();
    }
  };

  return (
    <div className="h-fit space-y-8 rounded border bg-accent p-5 shadow">
      <div className="space-y-2">
        <div className="flex w-full flex-col items-end justify-between md:flex-row md:items-center">
          <div className="flex w-full items-center justify-between gap-0 md:w-auto md:justify-start md:gap-5">
            <h1 className="font-black">POST</h1>
            <h1 className="text-sm">{getBaseURL()}/api/check</h1>
          </div>
          {timer ? (
            <h1 className="text-sm text-muted-foreground">
              It took {timer / 1000} second(s)
            </h1>
          ) : null}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            ref={formRef}
            className="flex flex-col gap-2 md:flex-row"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isLoading}
                      rows={1}
                      className="max-h-44 min-h-10 w-full resize-none overflow-y-auto scroll-smooth"
                      placeholder="Check profanity"
                      onInput={adjustHeight}
                      onKeyDown={shortcut}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading || !form.getValues().message}
            >
              {isLoading ? (
                <Loader2 className="mr-2 animate-spin" size={20} />
              ) : (
                "Try it!"
              )}
              <span className="ml-3 hidden text-xs tracking-widest text-muted-foreground md:flex">
                <CornerDownLeft size={15} /> Enter
              </span>
            </Button>
          </form>
        </Form>
        {result && !isLoading ? (
          <div className="pt-5 text-center text-sm text-muted-foreground">
            <h1
              className={cn(
                result.isProfanity ? "text-red-500" : "text-green-500",
              )}
            >
              {getRandomMessage(
                result.isProfanity
                  ? profanityDetectedResponses
                  : cleanMessageResponses,
              )}
            </h1>
          </div>
        ) : null}
      </div>
    </div>
  );
};
