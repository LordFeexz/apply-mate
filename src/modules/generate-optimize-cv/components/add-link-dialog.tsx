"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { memo, useCallback, type RefObject } from "react";
import useGeneratedCV from "../state";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { LangProps } from "@/interfaces/component";
import { getAddLinkDialogDictionary } from "../i18n";

export interface AddLinkDialogProps extends LangProps {
  ref: RefObject<HTMLTextAreaElement | null>;
}

function AddLinkDialog({ ref, lang }: AddLinkDialogProps) {
  const { title, desc, insert } = getAddLinkDialogDictionary(lang);
  const {
    linkDialog,
    setLinkDialog,
    linkText,
    setLinkText,
    linkUrl,
    setLinkUrl,
    selectionRange,
    content,
    setContent,
  } = useGeneratedCV();

  const insertLink = useCallback(() => {
    if (!selectionRange) return;

    const { start, end } = selectionRange;
    const linkMarkdown = `[${linkText}](${linkUrl})`;

    const newText =
      content.substring(0, start) + linkMarkdown + content.substring(end);

    setContent(newText);
    setLinkDialog(false);

    if (ref.current) {
      ref.current.focus();
      const newCursorPos = start + linkMarkdown.length;
      ref.current.setSelectionRange(newCursorPos, newCursorPos);
    }
  }, [selectionRange, content, setContent, setLinkDialog, ref]);

  return (
    <Dialog open={linkDialog} onOpenChange={setLinkDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link-text" className="text-right">
              Text
            </Label>
            <Input
              id="link-text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              className="col-span-3"
              placeholder="Display text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link-url" className="text-right">
              URL
            </Label>
            <Input
              id="link-url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="col-span-3"
              placeholder="https://example.com"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setLinkDialog(false)}>
            Cancel
          </Button>
          <Button onClick={insertLink} disabled={!linkText || !linkUrl}>
            {insert}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(AddLinkDialog);
