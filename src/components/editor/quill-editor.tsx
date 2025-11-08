'use client';

import React from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export type RichTextEditorHandle = {
    getContent: () => string;
}

const RichTextEditor = React.forwardRef<RichTextEditorHandle>((_, ref) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const quillRef = React.useRef<Quill | null>(null);

  React.useEffect(() => {
    if (editorRef.current) {
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
    }

    return () => {
      quillRef.current = null;
    };
  }, []);
  
  React.useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quillRef.current) {
        return quillRef.current.root.innerHTML;
      }
      return '';
    },
  }));

  return <div ref={editorRef} style={{ height: '500px' }} />;
});

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;
