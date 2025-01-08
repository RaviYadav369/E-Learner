"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "./ConfirmModal";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ChapterActionProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const CourseAction = ({
  disabled,
  courseId,
  isPublished,
}: ChapterActionProps) => {
  const [isLoading, setisLoading] = useState(false);
  const [isPublish, setisPublish] = useState(isPublished);
  const confetti = useConfettiStore()
  const router = useRouter();
  const onDelete = async () => {
    try {
      setisLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course Deleted");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setisLoading(false);
    }
  };

  const onPublished = async (publish: boolean) => {
    try {
      
      setisLoading(true);
      await axios.patch(`/api/courses/${courseId}`, { isPublished: publish });
      if (publish === true) {
        toast.success("Course Published");
        confetti.onOpen()
      } else {
        toast.success("Course UnPublished");
      }
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
    finally{
      setisLoading(false)
    }
  };

  const handleClick = () => {
    setisPublish(isPublish => {
      const newValue = !isPublish;
      onPublished(newValue);
      return newValue;
    });
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={() => handleClick()}
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

export default CourseAction;
