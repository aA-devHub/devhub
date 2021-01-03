import React, { useState, useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Button, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import CloudUploadTwoToneIcon from '@material-ui/icons/CloudUploadTwoTone';
import * as COLORS from '../../../colors';

const baseStyle = {
  padding: '2rem 0',
  borderWidth: 5,
  borderRadius: 10,
  borderColor: COLORS.DEVBLUE,
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function ImageUploader({ errors, incomingImage, type, handleImageChange }) {
  const [imageUrl, setImageUrl] = useState(incomingImage);
  const [del, setDel] = useState('none');
  const [opa, setOpa] = useState('1.0');

  const postShot = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'dribbble');
    data.append('cloud_name', 'willwang');
    fetch('https://api.cloudinary.com/v1_1/willwang/image/upload', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.url);
        handleImageChange(type, data.url);
      })
      .catch((err) => console.log('error', err));
  };

  const onDrop = useCallback((acceptedFiles) => {
    postShot(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: 'image/*', multiple: true });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="image-uploader">
      <div className="image-uploader-errors">{errors}</div>
      {imageUrl ? (
        <div
          className="image-uploader-success"
          onMouseOver={() => {
            setDel(' visible');
          }}
          onMouseOut={() => {
            setDel('');
          }}
        >
          <img
            src={imageUrl}
            className="pointer"
            style={{ opacity: opa }}
          ></img>
          <div
            className={`delete-button pointer` + del}
            onMouseOver={() => setOpa('0.4')}
            onMouseOut={() => setOpa('1.0')}
          >
            <Button
              onClick={() => {
                setImageUrl('');
                handleImageChange(type, '');
              }}
              variant="contained"
              color="secondary"
              style={{ borderRadius: 999, margin: 15 }}
            >
              Delete
              <Delete style={{ '&:hover': { backgroundColor: 'gray' } }} />
            </Button>
          </div>
        </div>
      ) : (
        <div className="image-uploader-container">
          <div className="image-uploader-inner" {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <div className="image-uploader-content">
              <CloudUploadTwoToneIcon className="image-uploader-cloud-icon" />
              <Typography>{`Click or drag to upload image.`}</Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
