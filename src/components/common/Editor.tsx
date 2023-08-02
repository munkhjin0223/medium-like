import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type EditorProps = {
  body: string;
  setBody: (body: string) => void;
};

function Editor({ body, setBody }: EditorProps) {
  return (
    <div>
      <MDEditor value={body} onChange={(value: string | undefined) => setBody(value || '')} />
    </div>
  );
}

export default Editor;
