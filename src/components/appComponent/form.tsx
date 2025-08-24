"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

const formSchema = z.object({
  fullname: z.string().min(2, "Full name is required"),
  email: z.email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(5, "Message is required"),
});

type FormType = z.infer<typeof formSchema>;

export default function MyForm() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullname: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (data: FormType) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-5">
          <FormField
            name="fullname"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold">Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
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
              <FormLabel className="font-bold">Subject</FormLabel>
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
              <FormLabel className="font-bold">Message</FormLabel>
              <FormControl>
                <Textarea
                  className="h-48"
                  placeholder="Tell me about your project"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full flex items-center justify-center gap-2 text-white">
          <Send size={18} /> Send message
        </Button>
      </form>
    </Form>
  );
}
