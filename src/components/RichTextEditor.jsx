import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { useState, useRef, useEffect } from 'react'

export default function RichTextEditor({ value, onChange }) {
  const [showAlignMenu, setShowAlignMenu] = useState(false)
  const alignRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['paragraph'] }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })
  

  useEffect(() => {
    function handleClickOutside(event) {
      if (alignRef.current && !alignRef.current.contains(event.target)) {
        setShowAlignMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!editor) return null

  return (
  <div className="border rounded p-2 w-full">
  <div className="mb-2 space-x-2 flex items-center">
  <button
  onClick={() => editor.chain().focus().toggleBold().run()}
  className={`px-2 py-1 border rounded ${editor.isActive('bold') ? 'bg-gray-300 font-bold' : ''}`}
  >
  B
  </button>
  <button
  onClick={() => editor.chain().focus().toggleItalic().run()}
  className={`px-2 py-1 border rounded ${editor.isActive('italic') ? 'bg-gray-300 italic' : ''}`}
  >
  𝑖
  </button>
  <button
  onClick={() => editor.chain().focus().toggleUnderline().run()}
  className={`px-2 py-1 border rounded ${editor.isActive('underline') ? 'bg-gray-300 underline' : ''}`}
  >
  U
  </button>
  <div className="relative" ref={alignRef}>
  <button
  onClick={() => setShowAlignMenu(!showAlignMenu)}
  className="px-2 py-1 border rounded"
  >
  ≡
  </button>

  <button
  onClick={() => {
    const url = prompt('Ingrese el enlace:')
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }}
  className="px-2 py-1 border rounded"
>
  🔗
</button>

<button 
  onClick={() => {
    const emoji = prompt('Ingrese un emoji:')
    if (emoji) {
      editor.chain().focus().insertContent(emoji).run()
    }
  }}
  className="px-2 py-1 border rounded opacity-20"
>
  🙂
</button>

<button
  onClick={() => {
    editor.chain().focus().toggleBulletList().run()
  }}
  className={`px-2 py-1 border rounded ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
>
  •••
</button>

  {showAlignMenu && (
  <div className="absolute mt-2 w-28 bg-white border rounded shadow z-20">
  <button
  onClick={() => {
  editor.chain().focus().setTextAlign('left').run()
  setShowAlignMenu(false)
  }}
  className={`block w-full text-left px-3 py-1 hover:bg-gray-100 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
  >
  ⯇ Izquierda
  </button>
  <button
  onClick={() => {
  editor.chain().focus().setTextAlign('center').run()
  setShowAlignMenu(false)
  }}
  className={`block w-full text-left px-3 py-1 hover:bg-gray-100 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
  >
  ≡ Centro
  </button>
  <button
  onClick={() => {
  editor.chain().focus().setTextAlign('right').run()
  setShowAlignMenu(false)
  }}
  className={`block w-full text-left px-3 py-1 hover:bg-gray-100 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
  >
  ⯈ Derecha
  </button>
  </div>
  
  )}
  </div>
  </div>
  
<EditorContent
  editor={editor}
  className="min-h-[120px] px-2 py-1 border rounded bg-white"
  />
  </div>
  )
}
