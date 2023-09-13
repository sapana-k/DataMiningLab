import React, {useState} from 'react';
const Assign2FileUpload = ({ onUpload }) => {
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

const handleSubmission = (e) => {
  e.preventDefault(); // Prevent the default form submission
  if (!selectedFile) {
    // Handle case where no file is selected
    console.log("no file selected")
    return;
  } 
  setIsFilePicked(true);
  const file = selectedFile;
  console.log(file)
  const formData = new FormData();
  formData.append('file', file);
  try {
    fetch(
      'http://localhost:8000/api/uploadBreast/',
      {
        method: 'POST',
        body: formData,
      }
    )
    .then((response) => response.json())
    .then((result) => {
        console.log('Success:', result);
      //sending result(=file data) to output parameter(onUpload) to AssignMain
      //dataset, attribute list
      onUpload(result);
    })
    .catch((error) => {
      console.error('Sapnaaaaaa Error:', error);
    });
  }
  catch (error) {
    console.error('sapnaaaa Error uploading file:', error);
  }
};
  return (
    <div>
    <form onSubmit={handleSubmission} encType="multipart/form-data">
    <input type="file" name="file" onChange={changeHandler}/>
    <button type="submit">Upload</button>
    </form>
    
    {isFilePicked ? ( 
				<div>
					<p>Filename: {selectedFile.name} <br/>
					Filetype: {selectedFile.type}<br/>
					Size in bytes: {selectedFile.size}<br/>
					lastModifiedDate:{' '}{selectedFile.lastModifiedDate.toLocaleDateString()}</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
      </div>
  );
};

export default Assign2FileUpload;
