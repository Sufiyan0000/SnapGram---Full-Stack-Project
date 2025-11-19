import React from 'react'

const Note = ({note,onDelete}) => {

    const formattedDate = new Date(note.created_at).toLocaleDateString('en-US')

  return (
    <div className='p-5  font-normal flex flex-col gap-3 w-full capitalize'>
        <p className='text-center font-semibold text-lg'>{note.title}</p>
        <p><span className='font-semibold'>Note : </span>{note.content}</p>
        <p><span className='font-semibold'>Post @</span> {formattedDate}</p>
        <p><span className='font-semibold'>Author : </span>{note.author}</p>
        <button onClick={() => onDelete(note.id)}
        className='bg-red-500 py-2 text-white font-semibold'    >
            Delete
        </button>
    </div>
  )
}

export default Note