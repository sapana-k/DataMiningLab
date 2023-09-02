import React, {useState} from 'react';
const Assign1FileUpload = ({ onUpload }) => {
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
      'http://localhost:8000/api/upload/',
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
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
      </div>
  );
};





// import React, {useState} from 'react';
// // this file has apis that fetches data from backend using django restframework

// //onUpload function is an output parameter for Assign1FileUpload component
// const Assign1FileUpload = ({ onUpload }) => {

// 	const [isFilePicked, setIsFilePicked] = useState(false);

//   const changeHandler = (e) => {
// 		setIsFilePicked(true);
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       fetch(
//         'http://localhost:8000/api/upload/',
//         {
//           method: 'POST',
//           body: formData,
//         }
//       )
//         .then((response) => response.json())
//         .then((result) => {
//           console.log('Success:', result);
//           //sending result(=file data) to output parameter(onUpload) to AssignMain
//           onUpload(result);
//         })
//         .catch((error) => {
//           console.error('Sapnaaaaaa Error:', error);
//         });
//     }
//     catch (error) {
//       console.error('sapnaaaa Error uploading file:', error);
//     }
// 	};

//   // const handleFileUpload = () => {
//   //   const file = selectedFile;
//   //   const formData = new FormData();
//   //   formData.append('file', file);
//   //   try {
//   //     fetch(
//   //       'http://localhost:8000/api/upload/',
//   //       {
//   //         method: 'POST',
//   //         body: formData,
//   //       }
//   //     )
//   //       .then((response) => response.json())
//   //       .then((result) => {
//   //         console.log('Success:', result);
//   //         //sending result(=file data) to output parameter(onUpload) to AssignMain
//   //         onUpload(result);
//   //       })
//   //       .catch((error) => {
//   //         console.error('Sapnaaaaaa Error:', error);
//   //       });
//   //   }
//   //   catch (error) {
//   //     console.error('sapnaaaa Error uploading file:', error);
//   //   }
//   // };

//   return (
//     <div>
//       <form onSubmit={changeHandler} encType="multipart/form-data">
//       <input type="file" name="file" />
//       <button type="submit">Upload</button>
//       </form>
//     {/* <input type="file" name="file" onChange={changeHandler} /> */}
//     {/* {isFilePicked ? ( 
// 				// <div>
// 				// 	<p>Filename: {selectedFile.name}</p>
// 				// 	<p>Filetype: {selectedFile.type}</p>
// 				// 	<p>Size in bytes: {selectedFile.size}</p>
// 				// 	<p>
// 				// 		lastModifiedDate:{' '}
// 				// 		{selectedFile.lastModifiedDate.toLocaleDateString()}
// 				// 	</p>
// 				// </div>
// 			// ) : (
// 			// 	<p>Select a file to show details</p>
// 			// )}
//     {/* <div>
//       <button onClick={handleFileUpload}>Submit</button>
//     </div> */}
//   </div>
//   );
// };

export default Assign1FileUpload;
