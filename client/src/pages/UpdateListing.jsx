import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { storeImage } from '../utils/cloudnaryUploade';
import { useNavigate, useParams } from "react-router-dom"

export default function CreateListing() {
    const { currentUser } = useSelector((state) => state.user)
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        regularPrice: 0,
        discountPrice: 0,
        bathrooms: 1,
        bedrooms: 1,
        furnished: false,
        parking: false,
        type: "rent",
        offer: false,
    });
    const [uploading, setUploading] = useState(false)
    const [imageUploadError, setImageUploadError] = useState(false);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId;
            const res = await fetch(`/api/listing/get/${listingId}`)
            const data =await res.json()
            if(data.success === false){
                console.log(data.message);
                return;
            }
         setFormData(data)
            
        }

        fetchListing();
    }, [])


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

    const handleChange = (e) => {
        if (e.target.id === "sale" || e.target.id === "rent") {
            setFormData({
                ...formData,
                type: e.target.id
            })
        }

        if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        if (e.target.type === "number" || e.target.type === 'text' || e.target.type === "textarea") {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (formData.imageUrls.length < 1) return setError("You must upload at least one image")
            if (+formData.regularPrice < +formData.discountPrice) return setError("discount price must be lower then regular price")
            setLoading(true)
            setError(false);
            const res = await fetch(`/api/listing/update/${params.listingId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id
                })
            })

            const data = await res.json()
            setLoading(false);
            if (data.success === false) {
                setError(data.message)
            }
            navigate(`/listing/${data._id}`)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    return (
        <main className='p-6 max-w-5xl mx-auto'>
            <h1 className='text-4xl font-bold text-center mb-10 text-slate-800'>Update a Listing</h1>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-8'>
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
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <textarea
                        placeholder='Description'
                        className='border border-gray-300 p-3 rounded-lg shadow-sm min-h-[100px]'
                        id='description'
                        required
                        onChange={handleChange}
                        value={formData.description}
                    />
                    <input
                        type="text"
                        placeholder='Address'
                        className='border border-gray-300 p-3 rounded-lg shadow-sm'
                        id='address'
                        required
                        onChange={handleChange}
                        value={formData.address}
                    />

                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id='sale' className='w-5 h-5' onChange={handleChange} checked={formData.type === 'sale'} />
                            <span>Sell</span>
                        </label>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id='rent' className='w-5 h-5' onChange={handleChange} checked={formData.type === "rent"} />
                            <span>Rent</span>
                        </label>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id='parking' className='w-5 h-5' onChange={handleChange} checked={formData.parking} />
                            <span>Parking</span>
                        </label>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id='furnished' className='w-5 h-5' onChange={handleChange} checked={formData.furnished} />
                            <span>Furnished</span>
                        </label>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" id='offer' className='w-5 h-5' onChange={handleChange} checked={formData.offer} />
                            <span>Offer</span>
                        </label>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className="flex flex-col">
                            <label htmlFor='bedrooms' className='mb-1'>Bedrooms</label>
                            <input type="number" id='bedrooms' min='1' max="10" required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bedrooms} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor='bathrooms' className='mb-1'>Bathrooms</label>
                            <input type="number" id='bathrooms' min='1' max="10" required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bathrooms} />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor='regularPrice' className='mb-1'>Regular Price ($/month)</label>
                            <input type="number" id='regularPrice' min='1' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.regularPrice} />
                        </div>
                        {formData.offer && (
                            <div className="flex flex-col">
                                <label htmlFor='discountPrice' className='mb-1'>Discount Price ($/month)</label>
                                <input type="number" id='discountPrice' min='1' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.discountPrice} />
                            </div>
                        )}

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
                        disabled={loading || uploading}
                        type='submit'
                        className='w-full mt-4 p-4 bg-slate-800 text-white font-semibold rounded-lg hover:opacity-90 transition'
                    >
                        {loading ? "Creating..." : "Update Listing"}
                    </button>
                    {error && <p className=' text-red-700 text-sm'>{error}</p>}
                </div>

            </form>
        </main>
    );
}


