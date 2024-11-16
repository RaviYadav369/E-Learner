"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { BiPencil } from "react-icons/bi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { File, Loader2, Trash2Icon } from "lucide-react";
import { FileUpload } from "@/components/file-upload";

type props = {
  initialData: any;
  courseId: string;
};

const formSchema = z.object({
  url: z.string().min(1, {
    message: "Attachment is required",
  }),
  name: z.string().min(1, {
    message: "Attachment name is required",
  }),
});

const AttachmentForm = ({ initialData, courseId }: props) => {
  const router = useRouter();
  const [isEditing, setisEditing] = useState(false);
  const [deletingId, setdeletingId] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: initialData?.attachments || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const handleEdit = () => setisEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/attachments/${courseId}`, values);
      toast.success("Course Attachment Updated");
      handleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };
  const handleDelete = async (attachId: string) => {
    try {
      setdeletingId(attachId)
      await axios.delete(`/api/attachments/${courseId}/${attachId}`);
      toast.success("Course Attachment Updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-semibold flex items-center justify-between">
        Course Attachment
        <Button onClick={handleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <BiPencil className="h-4 w-4  mr-2" />
              Add a File
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        initialData.attachments &&
        initialData?.attachments?.map((link: any) => (
          <div
            className="flex items-center p-3 gap-1 w-full bg-sky-100 border-sky-200 text-sky-700"
            key={link._id}
          >
            <File className="h-4 w-4 mr-2 flex-shrink-0" />
            <p className="text-sm line-clamp-1">{link.name}</p>
            {deletingId === link._id && (
              <div>
                <Loader2 className=" h-4 w-4 mx-2 animate-spin" />
              </div>
            )}
            {deletingId !== link._id && (
              <Trash2Icon
                className="w-5 h-5 mx-2 text-red-600 hover:text-red-400 cursor-pointer"
                onClick={() => handleDelete(link._id)}
              />
            )}
          </div>
        ))}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-4"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      endpoint="courseAttachment"
                      onChange={(url, name) => {
                        if (url && name) {
                          onSubmit({ url: url, name: name });
                        }
                      }}
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

export default AttachmentForm;
