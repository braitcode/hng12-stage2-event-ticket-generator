import React, { useState, useEffect } from 'react';
import cloud from "../assets/icons/cloud-download.png";
import { NavLink, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'

const Attendee = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [uploading, setUploading] = useState(false);


    useEffect(() => {
        const savedName = localStorage.getItem("attendeeName");
        const savedEmail = localStorage.getItem("attendeeEmail");
        const savedProfilePic = localStorage.getItem("attendeeProfilePic");

        if (savedName) setName(savedName);
        if (savedEmail) setEmail(savedEmail);
        if (savedProfilePic) setProfilePic(savedProfilePic);
    }, []);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploading(true); // Show loading state
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "your_cloudinary_preset"); // Replace with actual preset

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
                localStorage.setItem("attendeeProfilePic", reader.result);
            };
            reader.readAsDataURL(file);

            try {
                const response = await fetch("https://api.cloudinary.com/v1_1/dww4lgcy9/image/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                if (data.secure_url) {
                    setProfilePic(data.secure_url);
                    localStorage.setItem("attendeeProfilePic", data.secure_url);
                }
            } catch (error) {
                console.error("Error uploading to Cloudinary:", error);
            } finally {
                setUploading(false); // Remove loading state
            }
        }
    };

    // Handle Cloudinary URL input
    const handleCloudinaryURL = (event) => {
        const url = event.target.value;
        setProfilePic(url);
        localStorage.setItem("attendeeProfilePic", url);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !email || !profilePic) {
            setError("All fields, including profile picture, must be filled!");
            setShowModal(true);
            return;
        }
        setError('');
        setShowModal(false);
        localStorage.setItem("attendeeName", name);
        localStorage.setItem("attendeeEmail", email);
        localStorage.setItem("attendeeProfilePic", profilePic);
        sendTicketByEmail();
        navigate("/ticket");
    };

    const sendTicketByEmail = () => {
        const templateParams = {
            to_name: name,
            to_email: email,
            message: `Here is your ticket, ${name}!`,
        };

        emailjs.send('service_jwjmshg', 'template_yw6rnv7', templateParams, 'dWrQxDouBiHt8clnu')
            .then(response => console.log("Email sent successfully", response))
            .catch(error => console.error("Error sending email", error));
    };

    return (
        <div className="w-full h-auto bg-[#052F35] flex justify-center items-center py-10">
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60 bg-transparent">
                    <div className="bg-[#08252B] border border-[#2BA4B9] p-6 rounded-lg shadow-lg">
                        <p className="text-white">All fields, including profile picture, must be filled!</p>
                        <button onClick={() => setShowModal(false)} className="mt-4 px-4 py-2 bg-[#2BA4B9] text-white rounded">OK</button>
                    </div>
                </div>
            )}
            <div className="lg:w-[45%] w-[90%] border border-[#197686] rounded-3xl p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <span className='flex justify-between'>
                        <p className='text-white'>Attendee Details</p>
                        <p className='text-white'>Step 2/3</p>
                    </span>
                    <div className="w-full bg-[#0E464F] h-[4px] rounded-full overflow-hidden">
                        <div className="bg-[#24A0B5] h-full w-[66%]"></div>
                    </div>
                </div>
                <div className="bg-[#08252B] w-full h-auto flex flex-col items-center justify-center gap-8 rounded-xl border border-[#2BA4B9] p-6">
                    <div className="lg:w-[556px] w-[95%] border border-[#07373F] text-white flex flex-col justify-center items-center gap-4 rounded-xl p-4">
                        <p className="text-white">Upload Profile Picture</p>
                        <label className="cursor-pointer relative group">
                            <div className="lg:w-[210px] lg:h-[210px] h-[200px] w-[200px] bg-[#0E464F] rounded-2xl flex flex-col justify-center items-center gap-4 relative">
                                {uploading ? (
                                    <p className="text-white">Uploading...</p>
                                ) : profilePic ? (
                                    <>
                                        <img src={profilePic} alt="Profile" className="lg:w-[200px] lg:h-[200px] h-[190px] w-[190px] object-cover rounded-lg" />
                                        {/* Show Cloud & Upload Text on Hover */}
                                        <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                            <img src={cloud} alt="Upload" />
                                            <p className="text-white text-center">Drag & Drop or Click to Upload</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <img src={cloud} alt="Upload" />
                                        <p className="text-white text-center">Drag & Drop or Click to Upload</p>
                                    </>
                                )}
                            </div>
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                        </label>

                        <input
                            type="text"
                            placeholder="Paste Cloudinary URL here"
                            value={profilePic || ""}
                            onChange={handleCloudinaryURL}
                            className="w-full p-2 mt-2 border border-[#07373F] rounded-lg text-white bg-transparent"
                        />
                    </div>
                    <form className='flex flex-col justify-center items-center lg:gap-8 gap-4 lg:w-[556px]' onSubmit={handleSubmit}>
                        <div className="lg:w-full w-[90%] flex flex-col gap-2">
                            <label className='text-white'>Enter your name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='lg:w-full text-white h-[48px] p-2 border border-[#07373F] rounded-lg' required />
                        </div>
                        <div className="lg:w-full w-[90%] flex flex-col gap-2">
                            <label className='text-white'>Enter your email*</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='hello@avioflagos.io' className='w-full h-[48px] p-2 border border-[#07373F] text-white rounded-lg' required />
                        </div>
                        <div className="lg:w-full w-[90%] flex flex-col gap-2">
                            <label className='text-white'>Special Request</label>
                            <textarea placeholder='' className='w-full h-[127px] p-2 border border-[#07373F] text-white rounded-lg' />
                        </div>
                        <div className="lg:w-[556px] lg:h-[48px] bg-transparent lg:bg-[#041E23] rounded-2xl flex flex-col-reverse md:flex-row justify-center gap-4">
                            <NavLink to='/'>
                                <button className='border border-[#2BA4B9] w-[270px] h-[48px] rounded-lg text-[#2BA4B9] cursor-pointer'>Back</button>
                            </NavLink>
                            <button type='submit' className='w-[270px] h-[48px] bg-[#2BA4B9] rounded-lg text-white cursor-pointer'>Get My Ticket</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Attendee;
