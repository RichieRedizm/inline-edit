import React, { useState } from 'react'
import ContentEditable from 'react-contenteditable'

const EditableText = () => {
  const [text, setText] = useState('Hello World')
  const handleTextUpdate = (e) => setText(e.target.value)
  return (
    <ContentEditable
      innerRef={React.createRef()}
      html={text} // innerHTML of the editable div
      disabled={false} // use true to disable editing
      onChange={handleTextUpdate} // handle innerHTML change
      tagName='article' // Use a custom HTML tag (uses a div by default)
    />
  )
}

export default EditableText
