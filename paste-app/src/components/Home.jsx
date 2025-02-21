import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateToPastes, addToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    console.log("inside useEffect");

    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      
      if (paste) {  // ✅ Check if paste exists before updating state
        console.log("Paste found", paste);
        setTitle(paste.title);
        setValue(paste.content);
      } else {
        console.log("Paste not found");
      }
    }
  }, [pasteId, allPastes]);  // ✅ Dependency array includes `allPastes`

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste)); // ✅ Update existing paste
    } else {
      dispatch(addToPastes(paste)); // ✅ Create new paste
    }

    // ✅ Clear inputs after submission
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        {/* Title Input */}
        <input 
          className='p-2 rounded-2xl mt-2 w-[66%] pl-5'
          type='text'
          placeholder='Enter title here'
          value={title}  // ✅ Ensure controlled component
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste} className='p-2 rounded-2xl mt-2'>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className='mt-8'>
        {/* Content Textarea */}
        <textarea
          className='rounded-2xl mt-4 min-w-[500px] p-4'
          placeholder="Enter content here"
          value={value}  // ✅ Ensure controlled component
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;

