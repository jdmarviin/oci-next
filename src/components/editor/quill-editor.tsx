'use client';

import React from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export type RichTextEditorHandle = {
    getContent: () => string;
    setContent: (html: string) => void;
}

interface RichTextEditorProps {
  initialContent?: string;
}

const RichTextEditor = React.forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  ({ initialContent = '' }, ref) => {
    const editorRef = React.useRef<HTMLDivElement>(null);
    const quillRef = React.useRef<Quill | null>(null);
    const isInitialized = React.useRef(false);
    const [isHtmlMode, setIsHtmlMode] = React.useState(false);
    const [htmlContent, setHtmlContent] = React.useState('');

    React.useEffect(() => {
      if (editorRef.current && !isInitialized.current) {
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

        isInitialized.current = true;

        // Define o conteúdo inicial apenas na criação
        if (initialContent) {
          quillRef.current.root.innerHTML = initialContent;
        }
      }

      return () => {
        if (quillRef.current) {
          quillRef.current = null;
          isInitialized.current = false;
        }
      };
    }, []);

    // Atualiza o conteúdo quando initialContent mudar (após a inicialização)
    React.useEffect(() => {
      if (quillRef.current && isInitialized.current && initialContent) {
        const currentContent = quillRef.current.root.innerHTML;
        // Só atualiza se o conteúdo for diferente para evitar re-renders desnecessários
        if (currentContent !== initialContent) {
          quillRef.current.root.innerHTML = initialContent;
        }
      }
    }, [initialContent]);
    
    React.useImperativeHandle(ref, () => ({
      getContent: () => {
        if (isHtmlMode) {
          return htmlContent;
        }
        if (quillRef.current) {
          return quillRef.current.root.innerHTML;
        }
        return '';
      },
      setContent: (html: string) => {
        if (quillRef.current) {
          quillRef.current.root.innerHTML = html;
        }
      }
    }));

    const toggleHtmlMode = () => {
      if (!quillRef.current) return;

      if (!isHtmlMode) {
        // Mudando para modo HTML
        const content = quillRef.current.root.innerHTML;
        setHtmlContent(content);
        setIsHtmlMode(true);
      } else {
        // Voltando para modo visual
        quillRef.current.root.innerHTML = htmlContent;
        setIsHtmlMode(false);
      }
    };

    const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHtmlContent(e.target.value);
    };

    return (
      <div className="relative">
        <button
          type="button"
          onClick={toggleHtmlMode}
          className="absolute top-2 right-2 z-10 px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition"
        >
          {isHtmlMode ? '👁️ Visual' : '</> HTML'}
        </button>
        
        {isHtmlMode ? (
          <textarea
            value={htmlContent}
            onChange={handleHtmlChange}
            className="w-full h-[500px] p-4 border rounded font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            spellCheck={false}
          />
        ) : (
          <div ref={editorRef} style={{ height: '500px' }} />
        )}
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;
