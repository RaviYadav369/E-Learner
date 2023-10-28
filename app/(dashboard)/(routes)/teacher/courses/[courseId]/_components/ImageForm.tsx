"use client";

import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { FaImage } from "react-icons/fa";
import { LiaImageSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import toast from "react-hot-toast";

const formSchema = z.object({
  imageUrl: z.string().min(3, {
    message: "Image Url is required",
  }),
});

type props = {
  initialData: any;
  courseId: string;
};

const ImageForm = ({ initialData, courseId }: props) => {
  const [isEditing, setisEditing] = useState(false);
  const router = useRouter()

  const handleEdit = () => setisEditing((current) => !current);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/`,values)
      toast.success('Upload Image successful')
      handleEdit()
      router.refresh()
      
    } catch (error) {
      toast.error("Something went Wrong")
      
    }
  };

  return (
    <div className="mt-6 boder bg-slate-100 rounded-md p-4">
      <div className="font-semibold flex items-center justify-between">
        Course Image
        <Button onClick={handleEdit} variant="ghost">
          {isEditing && (
            "Cancel"
          ) }
          {!isEditing && !initialData.imageUrl && (
            <>
              <FaImage className="mr-2 h-4 w-4" />
              Add New Image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <FaImage className="mr-2 h-4 w-4" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <LiaImageSolid className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                console.log(url);
                
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm
