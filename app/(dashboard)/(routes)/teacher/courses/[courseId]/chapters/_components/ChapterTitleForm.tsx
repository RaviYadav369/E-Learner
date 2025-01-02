"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiPencil } from "react-icons/bi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type props = {
  initialData: {
    title:string;
  };
  courseId: string;
  chapterId:string;
};

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title is required",
  }),
});

const ChapterTitleForm = ({ initialData, courseId,chapterId }: props) => {
  const router = useRouter();
  const [isEditing, setisEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;
  const handleEdit = () => setisEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter Title Updated");
      handleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-semibold flex items-center justify-between">
        Chapter Title
        <Button onClick={handleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <BiPencil className="h-4 w-4  mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
     {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Introduction of Course"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterTitleForm;
