import { useState } from 'react';
import './App.css';

function ListNewItem(props) {
  const [itemName, setName] = useState('');
  const [itemPrice, setPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [imgUrl, setImgUrl] = useState(); //file
  const [itemLink, setItemLink] = useState('');
  const [image, setImage] = useState('');
  const [uploadStatus, setUploadStatus] = useState('Upload');

  //Img Upload
  function handleImgUpload(e) {
    setImage(e.target.files[0]);
  }
  function removeImg() {
    setImage('');
    setImgUrl('');
    setUploadStatus('Upload');
  }
  function handleLinkChange(e) {
    const { value } = e.target;

    setItemLink(value);
    setImgUrl(value);
  }
  function handleNameChange(e) {
    const { value } = e.target;

    setName(value);
  }
  function handlePriceChange(e) {
    const { value } = e.target;

    setPrice(value);
  }
  function handleLocalImgUpload() {
    setItemLink('');
    setImgUrl('');
  }
  function handleDescriptionChange(e) {
    const { value } = e.target;

    setItemDescription(value);
  }
  function uploadImage() {
    setUploadStatus(<div className="animate-pulse">Uploading...</div>);
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'img_upload');
    data.append('cloud_name', 'dimzcf9j8');

    fetch('  https://api.cloudinary.com/v1_1/dimzcf9j8/image/upload', {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => setImgUrl(data.url))
      .catch((err) => console.log(err));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.onTap();

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/items/new-item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            itemName: itemName,
            itemPrice: itemPrice,
            itemImgUrl: imgUrl,
            itemDescription: itemDescription,
            userName: props.userName,
            userId: props.userId,
          },
        ]),
      })
        .then((res) => res.json())
        .then((data) => data !== 'poop' && props.newUserData(data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="font-allerta bg-gradient-to-r from-cyan-400 to-gray-500 px-[5%] pt-[15%] pb-[50%] lg:p-[2%_25%_15%]">
      <form
        className="shadow-xl p-4 lg:p-[5%] bg-[#ffd5e4] rounded-lg"
        onSubmit={handleSubmit}
      >
        <label htmlFor="itemName">
          Item Name <span className="text-red-500">*</span>
        </label>
        <input
          className="block border-none rounded-md w-[100%] h-[2rem] m-[3%_0] focus:outline-none"
          id="itemName"
          type="text"
          value={itemName}
          onChange={handleNameChange}
          name="itemName"
        />
        <label className="text-md m-[1%_0]" htmlFor="itemPrice">
          Item Price <span className="text-red-500">*</span>
        </label>
        <input
          className="block border-none rounded-md w-[100%] px-2 h-[2rem] m-[3%_0] focus:outline-none"
          id="itemPrice"
          type="number"
          value={itemPrice}
          onChange={handlePriceChange}
          name="itemPrice"
        />
        <label htmlFor="itemDescription">Item Description</label>
        <textarea
          className="block border-none rounded-md w-[100%] m-[3%_0] focus:outline-none"
          id="itemDescription"
          type="text"
          value={itemDescription}
          onChange={handleDescriptionChange}
          name="itemDescription"
        />
        <label className="text-md m-[1%_0]" htmlFor="uploadedImg">
          Item Image Url/Link
        </label>
        <input
          className="block border-none rounded-md w-[100%] px-2 h-[2rem] m-[3%_0] focus:outline-none"
          id="itemLink"
          type="text"
          value={itemLink}
          onChange={handleLinkChange}
          name="itemLink"
        />
        <center className="text-lg">
          <span className="py-2 px-4 bg-red-400 text-white rounded-lg">OR</span>
        </center>
        <input
          type="file"
          onClick={handleLocalImgUpload}
          id="uploadedImg"
          className="py-4 file:bg-white file:cursor-pointer file:p-2 hover:file:text-red-400 file:text-pink-500 file:rounded file:shadow file:border-none"
          name="uploadedImg"
          onChange={handleImgUpload}
          // value={image}
          accept="image/png, image/jpeg,image/jpg,image/webp"
        />
        <br />
        {image && !imgUrl && (
          <button
            type="button"
            className="p-2 text-white rounded-lg shadow-md bg-pink-500 hover:bg-red-400"
            onClick={uploadImage}
          >
            {uploadStatus}
          </button>
        )}
        {imgUrl ? (
          <div>
            {' '}
            <img className="h-40 w-40 " src={imgUrl} alt="uploaded-img" />{' '}
            <button
              onClick={removeImg}
              className="p-2 my-4 text-white rounded-lg shadow-md bg-red-500 hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ) : (
          ''
        )}
        <div className="messageDiv">
          <p
            className="m-0"
            style={
              itemName && itemPrice
                ? { visibility: 'hidden' }
                : { color: '#ff7c7c' }
            }
          >
            Please fill in the required fields *
          </p>
        </div>
        <center>
          {' '}
          <button
            className="bg-pink-500 hover:bg-red-400 shadow-lg active:translate-y-0.5  text-white text-xl w-[66%] p-[2%] m-[3%_0] rounded-2xl "
            type={itemName && itemPrice ? 'submit' : 'button'}
          >
            {' '}
            Add New Item
          </button>
        </center>{' '}
      </form>
    </div>
  );
}

export default ListNewItem;
