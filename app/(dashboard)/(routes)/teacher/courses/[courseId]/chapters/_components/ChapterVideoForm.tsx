"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import MuxPlayer from '@mux/mux-player-react'


import { Button } from "@/components/ui/button";
import { BiPencil } from "react-icons/bi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Video } from "lucide-react";
import { FileUpload } from "@/components/file-upload";


type props = {
  initialData: any;
  courseId: string;
  chapterId:string;
};

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const ChapterVideoForm = ({ initialData, courseId,chapterId }: props) => {
  const router = useRouter();
  const [isEditing, setisEditing] = useState(false);

  const handleEdit = () => setisEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter Updated");
      handleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 boder bg-slate-100 rounded-md p-4">
         <div className="font-semibold flex items-center justify-between">
           Chapter Video
           <Button onClick={handleEdit} variant="ghost">
             {isEditing && (
               "Cancel"
             ) } 
             {!isEditing && !initialData.videoUrl && (
               <>
                 <BiPencil className="mr-2 h-4 w-4" />
                 Add a Video
               </>
             )}
             {!isEditing && initialData.videoUrl && (
               <>
                 <BiPencil className="mr-2 h-4 w-4" />
                 Edit Video
               </>
             )}
           </Button>
         </div>
         {!isEditing &&
           (!initialData.videoUrl ? (
             <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
               <Video className="h-10 w-10 text-slate-500" />
             </div>
           ) : (
             <div className="relative aspect-video mt-2">
            <MuxPlayer
            playbackId={initialData?.muxData?.playbackId || ''}
            />
             </div>
           ))}
         {isEditing && (
           <div>
             <FileUpload
               endpoint="chapterVideo"
               onChange={(url) => {
                 if (url) {
                   onSubmit({ videoUrl: url });
                 }
               }}
             />
             <div className="text-xs text-muted-foreground mt-4">
               Upload this chapter&apos;s video
             </div>
           </div>
         )}
        {initialData.videoUrl && !isEditing && (
          <div className="text-xs text-muted-foreground mt-2">
            Videos can take few minutes to process. Referesh the page if video does not appear.
          </div>
        )}
       </div>
  );
};

export default ChapterVideoForm;
