'use client';

import { ClipboardPaste, Code, Dot, Image, MoreHorizontal, Plus } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';
import MediumEditor from 'medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import './new_story.css';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { ImageUpload } from '@/actions/cloudinary';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

type Props = {
  userId: string;
  storyId: string;
  StoryContent: string | null | undefined;
  WalletAddress: string | undefined;
};

const NewStory = ({ userId, storyId, StoryContent, WalletAddress }: Props) => {
  const contentEditableRef = useRef<HTMLDivElement | null>(null);
  const [openTools, setOpenTools] = useState<boolean>(false);
  const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [saving, setSaving] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { address } = useAccount();

  const handleSave = async () => {
    if (!userId) {
      console.error('No user is signed in');
      return;
    }

    const content = contentEditableRef.current?.innerHTML;
    setSaving(true);
    console.log('Saving content...', { WalletAddress, storyId, content });

    try {
      const response = await axios.patch('/api/new-story', {
        userId,
        storyId,
        content,
      });
      console.log('Saved', response.data);
    } catch (error) {
      console.log('Error in saving', error);
    }
    setSaving(false);
  };

  const insertImageComp = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOpenTools(false);

      const localImageUrl = URL.createObjectURL(file);
      console.log('Image selected', localImageUrl);

      const ImageComponent = <ImageComp imageUrl={localImageUrl} file={file} handleSave={handleSave} />;

      const wrapperDiv = document.createElement('div');
      const root = createRoot(wrapperDiv);
      root.render(ImageComponent);

      contentEditableRef.current?.appendChild(wrapperDiv);
    }
  };

  useEffect(() => {
    const editor = new MediumEditor('.editable', {
      elementsContainer: document.getElementById('container') as HTMLElement,
      toolbar: {
        buttons: ['bold', 'italic', 'underline', 'anchor', 'h1', 'h2', 'h3', 'quote'],
      },
    });

    contentEditableRef.current?.addEventListener('input', handleSave);

    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <main id='container' className='max-w-[800px] mx-auto relative font-mono mt-8'>
      <div
        id='editable'
        ref={contentEditableRef}
        contentEditable
        suppressContentEditableWarning
        className='outline-none focus:outline-none editable max-w-[800px] prose'
        style={{ whiteSpace: 'pre-line' }}
      >
        {StoryContent ? (
          <div dangerouslySetInnerHTML={{ __html: StoryContent }}></div>
        ) : (
          <div>
            <h1 className='font-medium' data-h1-placeholder='New Story Title'></h1>
            <p className='' data-p-placeholder='Write your story ...'></p>
          </div>
        )}
      </div>
      <div className='flex items-center mt-2'>
        <button
          onClick={() => setOpenTools(!openTools)}
          className='text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded'
        >
          + Añadir
        </button>
        {openTools && (
          <div className='flex items-center ml-2 space-x-2'>
            <span
              onClick={insertImageComp}
              className='border-[1.5px] border-green-500 rounded-full block p-[6px] bg-white cursor-pointer'
            >
              <Image size={20} className='opacity-60 text-green-800' />
              <input
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileInputChange}
              />
            </span>
            {/* Puedes añadir más botones para otras herramientas si es necesario */}
          </div>
        )}
      </div>
    </main>
  );
};

export default NewStory;

const ImageComp = ({ imageUrl, file, handleSave }: { imageUrl: string; file: File; handleSave: () => void }) => {
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(imageUrl);

  const updateImageUrl = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await ImageUpload(formData).then((SecureImageUrl) => setCurrentImageUrl(SecureImageUrl));
      console.log('Image uploaded', currentImageUrl);
    } catch (error) {
      console.log('Error uploading the image', error);
    }
  };

  useEffect(() => {
    updateImageUrl().then(() => {
      handleSave();
    });
  }, [imageUrl]);

  return (
    <div className='py-3'>
      <div>
        <img src={currentImageUrl} alt='Image' className='max-w-full h-[450px]' />
        <div className='text-center text-sm max-w-md mx-auto'>
          <p data-p-placeholder='Type caption for your image'></p>
        </div>
      </div>
      <p data-p-placeholder='...'></p>
    </div>
  );
};
