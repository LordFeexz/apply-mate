"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Check } from "lucide-react";
import MarkDownRenderer from "@/components/common/markdown";
import { Textarea } from "@/components/ui/textarea";
import useGeneratedCV from "../state";
import Formatter from "./formatter";
import AddLinkDialog from "./add-link-dialog";
import type { LangProps } from "@/interfaces/component";
import { LANG } from "@/enums/global";

export interface CVRichEditorProps extends LangProps {}

export default function CVRichEditor({ lang }: CVRichEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { content, setContent } = useGeneratedCV();

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const convertToMarkdown = useCallback((text: string): string => {
    let markdownContent = "";

    for (const line of text.split("\n")) {
      if (
        line.trim().endsWith(":") ||
        (line.toUpperCase() === line && line.trim())
      )
        markdownContent += `### ${line}\n`;
      else if (line.trim().startsWith("•") || line.trim().startsWith("-"))
        markdownContent += `${line}\n`;
      else if (line.trim() === "") markdownContent += "\n";
      else markdownContent += `${line}\n`;
    }

    return markdownContent;
  }, []);

  if (isEditing) {
    return (
      <div className="p-6 bg-card text-card-foreground">
        <div className="flex justify-between items-center mb-4">
          <Formatter ref={ref} />
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={toggleEditMode}
          >
            <Check className="h-4 w-4" />
            {lang === LANG.ID ? "Simpan" : "Save"}
          </Button>
        </div>

        <Textarea
          ref={ref}
          id="cv-editor"
          className="w-full h-[500px] p-4 font-mono text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
        />

        <div className="mt-4">
          <details className="text-sm">
            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
              Preview
            </summary>
            <div className="mt-4 p-4 border rounded-md bg-background">
              <MarkDownRenderer content={convertToMarkdown(content)} />
            </div>
          </details>
        </div>

        <AddLinkDialog ref={ref} lang={lang} />
      </div>
    );
  }

  return (
    <div className="p-6 bg-card text-card-foreground">
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={toggleEditMode}
        >
          <Pencil className="h-4 w-4" />
          Edit CV
        </Button>
      </div>
      <div className="prose max-w-none dark:prose-invert">
        <MarkDownRenderer content={convertToMarkdown(content)} />
      </div>
    </div>
  );
}
