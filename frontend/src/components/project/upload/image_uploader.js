import React, { useState, useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Button, makeStyles, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import CloudUploadTwoToneIcon from '@material-ui/icons/CloudUploadTwoTone';

const baseStyle = {
  padding: '2rem 0',
  borderWidth: 10,
  borderRadius: 10,
  borderColor: 'pink',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
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

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 500,
    minHeight: 600,
    transform: 'scale(.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: '5%',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tag: {
    margin: 'auto 0.3rem',
    lineHeight: 1.3,
    cursor: 'pointer',
  },
  root: {
    display: 'flex',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: '.3px solid #eaeaea',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  createButton: {
    padding: '10px 30px',
    backgroundColor: 'red',
    borderRadius: 10,
    color: 'white',
  },
  uploadedImage: {
    margin: 'auto 0',
    width: '100%',
    cursor: 'pointer',
  },
}));

function ImageUploader({ errors }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [del, setDel] = useState('none');
  const [opa, setOpa] = useState('1.0');
  const classes = useStyles();

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
        console.log('data', data.url);
      })
      .catch((err) => console.log('error', err));
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    postShot(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: 'image/*' });

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
          style={{
            height: '100%',
            postion: 'relative',
            backgroundColor: 'pink',
            padding: '1rem',
            borderRadius: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onMouseOver={() => {
            setDel('block');
          }}
          onMouseOut={() => {
            setDel('none');
          }}
        >
          <img
            className={classes.uploadedImage}
            src={imageUrl}
            style={{ opacity: opa }}
          ></img>
          <div
            className={del}
            onMouseOver={() => setOpa('0.4')}
            onMouseOut={() => setOpa('1.0')}
            style={{
              display: del,
              position: 'absolute',
              right: 30,
              top: 30,
              cursor: 'pointer',
            }}
          >
            <Button
              onClick={() => setImageUrl(null)}
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
              <div className="image-uploader-instructions">
                <Typography variant="h4">Drag and drop an image</Typography>
                <Typography variant="h5">
                  or <span>browse</span> to choose a file
                </Typography>
                <Typography variant="body2" style={{ lineHeight: '2rem' }}>
                  (1600x1200 or larger recommended, up to 10MB each)
                </Typography>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
