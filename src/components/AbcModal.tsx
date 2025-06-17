import { useEffect, useRef } from 'react'
import abcjs from 'abcjs'

interface AbcModalProps {
  show: boolean
  onClose: () => void
  onInsert: (src: string) => void
  text: string
  setText: (t: string) => void
}

export default function AbcModal({ show, onClose, onInsert, text, setText }: AbcModalProps) {
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = ''
      if (text.trim()) {
        abcjs.renderAbc(previewRef.current, text)
      }
    }
  }, [text, show])

  if (!show) return null

  const handleInsert = () => {
    const temp = document.createElement('div')
    abcjs.renderAbc(temp, text)
    const svg = temp.querySelector('svg')
    if (svg) {
      const serializer = new XMLSerializer()
      const svgStr = serializer.serializeToString(svg)
      const encoded = encodeURIComponent(svgStr)
      const src = `data:image/svg+xml,${encoded}`
      onInsert(src)
    }

    onClose()
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)' }}>
      <div style={{ background: '#fff', width: '80%', margin: '5% auto', padding: 20, display: 'flex', gap: 20 }}>
        <textarea
          style={{ flex: 1, height: '300px' }}
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div style={{ flex: 1, border: '1px solid #ccc', padding: 10 }} ref={previewRef}></div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <button onClick={handleInsert}>Insert</button>
        <button onClick={onClose} style={{ marginLeft: 10 }}>Cancel</button>
      </div>
    </div>
  )
}
