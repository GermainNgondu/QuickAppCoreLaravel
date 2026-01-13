import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useFormContext } from "react-hook-form";
import { FormField } from "@ui/form";
import { Toggle, MediaPicker} from "@ui";
import { Bold, Italic, Image as ImageIcon } from "lucide-react";
import { cn } from "@lib";
import { FieldWrapper } from "@shared";

export function RichTextField({ name, label, help, required }) {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FieldWrapper label={label} help={help} required={required}>
                    <TipTapInner value={field.value} onChange={field.onChange} />
                </FieldWrapper>
            )}
        />
    );
}

const TipTapEditor = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto border shadow-sm', // Style par défaut des images insérées
                },
            }),
        ],
        content: value || '',
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class: cn("prose prose-sm dark:prose-invert max-w-none min-h-[200px] border rounded-md p-3 focus:outline-none"),
            },
        },
    });

    if (!editor) return null;

    // Fonction pour insérer l'image choisie via le MediaPicker
    const addImageFromMediaPicker = (assets) => {
        const asset = Array.isArray(assets) ? assets[0] : assets;
        if (asset && asset.url) {
            editor.chain().focus().setImage({ src: asset.url, alt: asset.name }).run();
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-1 p-1 border rounded-md bg-muted/50">
                {/* Boutons standards */}
                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} pressed={editor.isActive('bold')}>
                    <Bold className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} pressed={editor.isActive('italic')}>
                    <Italic className="h-4 w-4" />
                </ToolbarButton>
                
                <div className="w-px h-6 bg-border mx-1 self-center" />

                {/* INTEGRATION DU MEDIAPICKER */}
                <MediaPicker onSelect={addImageFromMediaPicker} multiple={false}>
                    <Toggle size="sm" variant="outline" className="h-8 w-8 p-0" title="Insérer une image">
                        <ImageIcon className="h-4 w-4" />
                    </Toggle>
                </MediaPicker>
            </div>
            
            <EditorContent editor={editor} />
        </div>
    );
};

const ToolbarButton = ({ onClick, pressed, children }) => (
    <Toggle size="sm" pressed={pressed} onPressedChange={onClick} variant="outline" className="h-8 w-8 p-0">
        {children}
    </Toggle>
);