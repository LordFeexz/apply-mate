"use client";

import { memo, useCallback, useMemo, type RefObject } from "react";
import useGeneratedCV from "../state";
import { Button } from "@/components/ui/button";
import { AlignLeft, Bold, Heading, LinkIcon, List } from "lucide-react";

export interface FormatterProps {
  ref: RefObject<HTMLTextAreaElement | null>;
}

function Formatter({ ref }: FormatterProps) {
  const {
    linkDialog,
    setLinkDialog,
    setLinkText,
    setLinkUrl,
    content,
    setContent,
    setSelectionRange,
  } = useGeneratedCV();

  const formatText = useCallback(
    (format: string) => {
      if (!ref.current) return;

      const start = ref.current.selectionStart;
      const end = ref.current.selectionEnd;
      const selectedText = content.substring(start, end);
      let newText = content;

      switch (format) {
        case "bold":
          newText =
            content.substring(0, start) +
            selectedText.toUpperCase() +
            content.substring(end);
          break;
        case "heading":
          if (!selectedText.endsWith(":")) {
            newText =
              content.substring(0, start) +
              selectedText.toUpperCase() +
              ":" +
              content.substring(end);
          } else {
            newText =
              content.substring(0, start) +
              selectedText.toUpperCase() +
              content.substring(end);
          }
          break;
        case "bullet":
          newText =
            content.substring(0, start) +
            "• " +
            selectedText +
            content.substring(end);
          break;
        case "newline":
          newText =
            content.substring(0, start) + "\n\n" + content.substring(start);
          break;
      }

      setContent(newText);

      const newCursorPos =
        format === "bullet"
          ? start + 2
          : format === "newline"
          ? start + 2
          : end;
      ref.current.focus();
      ref.current.setSelectionRange(newCursorPos, newCursorPos);
    },
    [content, ref, setContent]
  );

  const openLinkDialog = useCallback(() => {
    if (!ref.current) return;

    const start = ref.current.selectionStart;
    const end = ref.current.selectionEnd;
    const selectedText = content.substring(start, end);

    setLinkText(selectedText);
    setLinkUrl("");
    setSelectionRange({ start, end });
    setLinkDialog(true);
  }, [ref, setLinkText, setSelectionRange, setLinkDialog, setLinkUrl]);

  const BUTTON_FORMATTER = useMemo(
    () => [
      {
        format: "heading",
        icon: <Heading className="h-4 w-4" />,
        onClick: () => formatText("heading"),
        title: "Add heading",
      },
      {
        format: "bold",
        icon: <Bold className="h-4 w-4" />,
        onClick: () => formatText("bold"),
        title: "Make text uppercase",
      },
      {
        format: "bullet",
        icon: <List className="h-4 w-4" />,
        onClick: () => formatText("bullet"),
        title: "Add bullet point",
      },
      {
        format: "newline",
        icon: <AlignLeft className="h-4 w-4" />,
        onClick: () => formatText("newline"),
        title: "Add empty line",
      },
      {
        format: "link",
        icon: <LinkIcon className="h-4 w-4" />,
        onClick: openLinkDialog,
        title: "Add link",
      },
    ],
    [openLinkDialog, formatText]
  );

  return (
    <div className="flex items-center gap-2">
      {BUTTON_FORMATTER.map(({ format, icon, onClick, title }) => (
        <Button
          key={format}
          title={title}
          onClick={onClick}
          variant="outline"
          size="sm"
        >
          {icon}
        </Button>
      ))}
    </div>
  );
}

export default memo(Formatter);
