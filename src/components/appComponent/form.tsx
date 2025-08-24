"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

export default function MyForm() {
  const formSchema = z.object({
    fullname: z.string(),
    email: z.email(),
    subject: z.string(),
    message: z.string(),
  });

  type formType = z.infer<typeof formSchema>;

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullname: "",
      message: "",
      subject: "",
    },
  });
  return (
    <div>
      <Form {...form}>
        <form className=" space-y-5">
          <div className=" flex justify-between items-center w-full gap-5  md:gap-10">
            <FormField
              name="fullname"
              control={form.control}
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className=" font-bold">Full name</FormLabel>
                  <FormControl>
                    <Input
                      className=" w-full"
                      placeholder="Your name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className=" font-bold">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="subject"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" font-bold">Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Project inquiry" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" font-bold">Message </FormLabel>
                <FormControl>
                  <Textarea
                    className=" h-48"
                    placeholder="Tell me about your project"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className=" w-full text-white">
            <Send />
            Send message
          </Button>
        </form>
      </Form>
    </div>
  );
}
