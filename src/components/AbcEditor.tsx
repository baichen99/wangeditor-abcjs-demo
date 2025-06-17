import { useRef, useState } from "react";
import AbcModal from "./AbcModal";

export default function AbcEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [abcText, setAbcText] = useState("");

  const insertAbc = (src: string) => {
    const img = `<img src="${src}" style="width:100%"/>`;
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, img);
  };

  const exportHtml = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "content.html";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setShowModal(true)}>Insert ABC</button>
        <button onClick={exportHtml} style={{ marginLeft: 10 }}>
          Export HTML
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        style={{ border: "1px solid #ccc", minHeight: 200, padding: 8 }}
      />
      <AbcModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onInsert={insertAbc}
        text={abcText}
        setText={setAbcText}
      />
    </div>
  );
}
