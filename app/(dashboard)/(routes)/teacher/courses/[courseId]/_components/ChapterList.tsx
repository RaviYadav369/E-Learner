"use client";
import React, { useEffect, useState } from "react";
import Chapter from "@/lib/models/chapter.model";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChapterListProps {
  // items: any;
  items: typeof Chapter[];
  onRecorder: (updateData: { _id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

const ChapterList = ({ items, onRecorder, onEdit }: ChapterListProps) => {
  const [isMounted, setisMounted] = useState(false);
  const [chapters, setchapters] = useState(items);

  useEffect(() => {
    setchapters(items);
  }, [items]);

  useEffect(() => {
    setisMounted(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setchapters(items);
    const updatedChapters = items.map((chapter: any, index: number) => ({
      _id: chapter._id,
      position: index + 1, 
    }));
    onRecorder(updatedChapters);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
    
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters" type="chapter">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {chapters.map((chapter: typeof Chapter, index: number) => (
                <Draggable
                  key={chapter._id}
                  draggableId={chapter._id}
                  index={index}
                >
                  {(provided) => (
                      <div
                        className={cn(
                          "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                          chapter.isPublished &&
                            "bg-sky-100 border-sky-200 text-sky-700"
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          className={cn(
                            "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                            chapter.isPublished &&
                              "border-r-sky-200 hover:bg-sky-200"
                          )}
                          {...provided.dragHandleProps}
                        >
                          <Grip className="h-5 w-5" />
                        </div>
                        {chapter.title}
                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                          {chapter.isFree && <Badge>Free</Badge>}
                          <Badge
                            className={cn(
                              "bg-slate-500",
                              chapter.isPublished && "bg-sky-700"
                            )}
                          >
                            {chapter.isPublished ? "Published" : "Draft"}
                          </Badge>
                          <Pencil
                            onClick={() => onEdit(chapter._id)}
                            className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                          />
                        </div>
                      </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default ChapterList;
