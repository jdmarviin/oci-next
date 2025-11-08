'use client';

import React from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export type RichTextEditorHandle = {
    getContent: () => string;
}

interface RichTextEditorProps {
  initialContent?: string;
}

const RichTextEditor = React.forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  ({ initialContent = '' }, ref) => {
    const editorRef = React.useRef<HTMLDivElement>(null);
    const quillRef = React.useRef<Quill | null>(null);

    React.useEffect(() => {
      if (editorRef.current && !quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          },
          placeholder: 'Write something...',
        });

        // Define o conteúdo inicial
        if (initialContent) {
          quillRef.current.root.innerHTML = initialContent;
        }
      }

      return () => {
        if (quillRef.current) {
          quillRef.current = null;
        }
      };
    }, []);

    // Atualiza o conteúdo quando initialContent mudar
    React.useEffect(() => {
      if (quillRef.current && initialContent) {
        quillRef.current.root.innerHTML = initialContent;
      }
    }, [initialContent]);
    
    React.useImperativeHandle(ref, () => ({
      getContent: () => {
        if (quillRef.current) {
          return quillRef.current.root.innerHTML;
        }
        return '';
      },
    }));

    return <div ref={editorRef} style={{ height: '500px' }} />;
  }
);

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;
