"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ConfirmModal } from "./ComfirmModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ChapterActionProps {
  disabled: boolean;
  chapterId: string;
  courseId: string;
  isPublished: boolean;
}

const ChapterAction = ({
  disabled,
  chapterId,
  courseId,
  isPublished,
}: ChapterActionProps) => {
  const [isLoading, setisLoading] = useState(false);
  const [Publish, setPublish] = useState(isPublished)
  const router = useRouter();
  const onDelete = async () => {
    try {
      setisLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter Deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setisLoading(false);
    }
  };

  const onPublished = async(Publish:boolean) => {
    try {
      setisLoading(true);
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`,
        {isPublished:Publish}
      );
      if(Publish === true){
        toast.success("Chapter Published");
      }
      else{
        toast.success("Chapter UnPublished");
      }
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch {
      toast.error("Something went wrong");
    }
    finally{
      setisLoading(false)
    }
  };

  const handleClick = () => {
    setPublish(prev => {
      const newValue = !prev;
      console.log('this is from usestate ',newValue)
      onPublished(newValue); 
      return newValue; 
    });
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={()=>handleClick()}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterAction;
