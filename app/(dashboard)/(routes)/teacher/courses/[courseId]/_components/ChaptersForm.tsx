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
import { Loader2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import ChapterList from "./ChapterList";

type props = {
  initialData: any;
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1),
});

const ChaptersForm = ({ initialData, courseId }: props) => {
  const router = useRouter();
  const [isCreating, setisCreating] = useState(false);
  const [isUpdating, setisUpdating] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const toggleCreating = () => setisCreating((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);

    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter Created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handelRecord = async (
    updatedData: { _id: string; position: number }[]
  ) => {
    console.log("this is updated data", updatedData);
    try {
      setisUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updatedData,
      });
      toast.success("Chaptes is reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setisUpdating(false);
    }
  };

  return (
    <>
      <div className=" relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating &&(
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className='animate-spin h-6 w-6 text-sky-700' />
        </div>
      )}
        <div className="font-semibold flex items-center justify-between">
          Course Chapter
          <Button onClick={toggleCreating} variant="ghost">
            {isCreating ? (
              "Cancel"
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add a Chapter
              </>
            )}
          </Button>
        </div>

        {isCreating && (
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
                        placeholder="e.g. Introduction to the course"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={!isValid || isSubmitting} type="submit">
                Create
              </Button>
            </form>
          </Form>
        )}
        {!isCreating && (
          <div
            className={cn(
              "text-sm mt-2",
              !initialData.chapters.length && "text-slate-500 italic"
            )}
          >
            {!initialData.chapters.length && "No Chapters"}

            <ChapterList
              onEdit={(id) => {
                console.log(id);
              }}
              onRecorder={handelRecord}
              items={initialData.chapters || []}
            />
          </div>
        )}
        {!isCreating && (
          <p className="text-xs text-muted-foreground mt-4">
            Drag and drop to reorder the chapter
          </p>
        )}
      </div>
    </>
  );
};

export default ChaptersForm;
