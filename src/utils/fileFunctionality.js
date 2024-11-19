import { pinata } from './config';

export const fileUpload = async (type, files, metadata) => {
  const uploadedFiles = [];
  let error;

  try {
    for (let i = 0; i < files.length; i++) {
      const formDataForFile = new FormData();
      formDataForFile.append('file', files[i]);

      const fileMetadata = JSON.stringify({
        name: files[i].name,
        type: type,
        keyvalues: metadata || {}, // Pass metadata from the caller
      });

      formDataForFile.append('pinataMetadata', fileMetadata);
      formDataForFile.append('pinataOptions', '{"cidVersion": 1}');

      // Call Pinata API for each file
      const response = await pinata.post(
        '/pinning/pinFileToIPFS',
        formDataForFile,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      uploadedFiles.push({
        fileName: files[i].name,
        ipfsHash: response.data.IpfsHash,
      });
    }
  } catch (err) {
    error = err;
  }
  return { uploadedFiles, error };
};

export const fetchFileFromIPFS = async (ipfsHash) => {
  try {
    const response = await fetch(
      `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch file with hash: ${ipfsHash}`);
    }
    return { url: response.url, error: null };
  } catch (error) {
    console.error('Error fetching file from IPFS:', error.message);
    return { url: null, error: error.message };
  }
};
