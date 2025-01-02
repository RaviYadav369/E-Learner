"use client";

import React from "react";
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
import { Editor } from "@/components/editor";
import { cn } from "@/lib/utils";
import { Preview } from "@/components/preview";

type props = {
  initialData: any;
  courseId: string;
  chapterId:string
};

const formSchema = z.object({
  description: z.string().min(3, {
    message: "Description is required",
  }),
});

const ChapterDescriptionForm = ({ initialData, courseId,chapterId }: props) => {

  const router = useRouter();
  const [isEditing, setisEditing] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;
  const handleEdit = () => setisEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);

    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter Description Updated");
      handleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-semibold flex items-center justify-between">
          Course Description
          <Button onClick={handleEdit} variant="ghost">
            {isEditing ? (
              "Cancel"
            ) : (
              <>
                <BiPencil className="h-4 w-4 mr-2" />
                {initialData.description ? 'Edit Description': 'Add Chapter Description'}
                
              </>
            )}
          </Button>
        </div>
        {!isEditing && (
          <div className={cn('text-sm mt-2', !initialData.description && 'text-slate-500')}>
            {!initialData.description && "No Description"}
            {initialData.description && (
              <Preview value={initialData.description} />
            )}
            </div>
        )}
       {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                   <Editor 
                   {...field}
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
    </>
  );
};

export default ChapterDescriptionForm;
