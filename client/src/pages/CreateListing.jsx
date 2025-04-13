import React, { useState } from 'react';
import { storeImage } from '../utils/cloudnaryUploade';

export default function CreateListing() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
    });
    const [uploading, setUploading] = useState(false)

    const [imageUploadError, setImageUploadError] = useState(false);

    console.log(formData);

    const handleImageSubmit = async (e) => {
        e.preventDefault();
        if (files.length > 0 && files.length <= 6) {
            setUploading(true)
            setImageUploadError(false)
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }

            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                setImageUploadError(false);
                setUploading(false)
            }).catch((err) => {
                setImageUploadError("Image upload failed (2 mb max per image)");
            setUploading(false)
            });
            
        } else {
            setImageUploadError("You can only uplad 6 images per listing");
            setUploading(false)
        }

    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index)
        })
    }

    return (
        <main className='p-6 max-w-5xl mx-auto'>
            <h1 className='text-4xl font-bold text-center mb-10 text-slate-800'>Create a Listing</h1>
            <form className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Left Section */}
                <div className='flex flex-col gap-6'>
                    <input
                        type="text"
                        placeholder='Name'
                        className='border border-gray-300 p-3 rounded-lg shadow-sm'
                        id='name'
                        maxLength="62"
                        minLength="10"
                        required
                    />
                    <textarea
                        placeholder='Description'
                        className='border border-gray-300 p-3 rounded-lg shadow-sm min-h-[100px]'
                        id='description'
                        required
                    />
                    <input
                        type="text"
                        placeholder='Address'
                        className='border border-gray-300 p-3 rounded-lg shadow-sm'
                        id='address'
                        required
                    />

                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id='sale' className='w-5 h-5' />
                            <span>Sell</span>
                        </label>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id='rent' className='w-5 h-5' />
                            <span>Rent</span>
                        </label>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id='parking' className='w-5 h-5' />
                            <span>Parking</span>
                        </label>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id='furnished' className='w-5 h-5' />
                            <span>Furnished</span>
                        </label>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id='offer' className='w-5 h-5' />
                            <span>Offer</span>
                        </label>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className="flex flex-col">
                            <label htmlFor='bedrooms' className='mb-1'>Bedrooms</label>
                            <input type="number" id='badrooms' min='1' max="10" required className='p-3 border border-gray-300 rounded-lg' />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='bathrooms' className='mb-1'>Bathrooms</label>
                            <input type="number" id='bathrooms' min='1' max="10" required className='p-3 border border-gray-300 rounded-lg' />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='regularPrice' className='mb-1'>Regular Price ($/month)</label>
                            <input type="number" id='regularPrice' min='1' required className='p-3 border border-gray-300 rounded-lg' />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='discountPrice' className='mb-1'>Discount Price ($/month)</label>
                            <input type="number" id='discountPrice' min='1' required className='p-3 border border-gray-300 rounded-lg' />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className='flex flex-col gap-6'>
                    <div>
                        <p className='font-semibold text-lg mb-1'>Images</p>
                        <p className='text-sm text-gray-600 mb-3'>The first image will be the cover (max 6)</p>
                        <div className="flex items-center gap-3">
                            <input
                                onChange={(e) => setFiles(Array.from(e.target.files))}
                                className='p-3 border border-gray-300 rounded w-full'
                                type="file"
                                id='images'
                                accept='image/*'
                                multiple
                            />
                            <button
                                disabled={uploading}
                                onClick={handleImageSubmit}
                                type='button'
                                className='p-3 text-green-700 border border-green-700 rounded hover:bg-green-50 transition'
                            >
                                {uploading ? "Uploading..." : "Upload"}

                            </button>
                        </div>
                        <p className=' text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                        {
                            formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                                <div key={url} className=" flex justify-between p-3 border items-center">
                                    <img src={url} alt="listing image" className=' w-20 h-20 object-contain rounded-lg' />
                                    <button type='button' onClick={() => handleRemoveImage(index)} className=' p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                                </div>
                            ))
                        }
                    </div>

                    <button
                        type='submit'
                        className='w-full mt-4 p-4 bg-slate-800 text-white font-semibold rounded-lg hover:opacity-90 transition'
                    >
                        Create Listing
                    </button>
                </div>

            </form>
        </main>
    );
}


