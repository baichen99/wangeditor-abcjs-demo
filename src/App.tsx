import { useEffect, useRef, useState } from 'react'
import { Boot } from '@wangeditor/editor'
import type { IDomEditor } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import '@wangeditor/editor/dist/css/style.css'
import AbcModal from './components/AbcModal'
import { AbcMenu } from './components/AbcMenu'

function App() {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [abcText, setAbcText] = useState('')

  const menuRegistered = useRef(false)

  const editorConfig = {
    placeholder: 'Type here...',
    MENU_CONF: {
      insertImage: {
        checkImage: () => true,
      },
    },
  }


  useEffect(() => {
    if (!menuRegistered.current) {
      const menu = new AbcMenu(() => setShowModal(true))
      Boot.registerMenu({ key: 'insert-abc', factory: () => menu })
      menuRegistered.current = true
    }
  }, [])

  const insertAbc = (src: string) => {
    if (editor) {
      const imageNode = { type: 'image', src } as any
      editor.insertNode(imageNode)
      editor.focus(true)

    }
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: 10 }}>
      <Toolbar editor={editor} defaultConfig={{ insertKeys: { index: 0, keys: ['insert-abc'] } }} />
      <Editor
        defaultConfig={editorConfig}

        style={{ height: '300px', overflowY: 'hidden' }}
        value=""
        onCreated={setEditor}
      />
      <AbcModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onInsert={insertAbc}
        text={abcText}
        setText={setAbcText}
      />
    </div>
  )
}

export default App
