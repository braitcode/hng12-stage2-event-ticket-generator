import React from 'react';
import { writeup } from '../db/data';

const WriteUp = () => {
    return (
        <div className="w-full h-auto bg-[#052F35] flex justify-center items-center py-10">
            <div className="w-[80%] border border-[#197686] rounded-3xl p-8">
                {writeup.map((info) => (
                    <div key={info.id} className="mb-8">
                        {/* Dynamically Render Headings */}
                        {info.heading1 && <h2 className="text-white text-2xl font-bold mb-4">{info.heading1}</h2>}
                        {info.heading2 && <h2 className="text-white text-2xl font-bold mb-4">{info.heading2}</h2>}
                        {info.heading3 && <h2 className="text-white text-2xl font-bold mb-4">{info.heading3}</h2>}
                        {info.heading4 && <h2 className="text-white text-2xl font-bold mb-4">{info.heading4}</h2>}
                        {info.heading5 && <h2 className="text-white text-2xl font-bold mb-4">{info.heading5}</h2>}
                        {info.heading6 && <h2 className="text-white text-2xl font-bold mb-4">{info.heading6}</h2>}
                        {info.heading7 && <h2 className="text-white text-2xl font-bold mb-4">{info.heading7}</h2>}

                        {/* Subheading */}
                        {info.subheading && <h3 className="text-white text-xl font-semibold mt-2">{info.subheading}</h3>}

                        {/* Render Paragraphs if Present */}
                        {info.body1 && <p className="text-white text-[16px] mb-2">{info.body1}</p>}
                        {info.parabody && <p className="text-white text-16px mb-2">{info.parabody}</p>}
                        {info.para4 && <p className="text-white text-lg mb-2">{info.para4}</p>}


                        {/* Render List Items if Body is an Array */}
                        {info.body2 && (
                            <ul className="text-white text-[16px] list-disc pl-6">
                                {info.body2.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        )}

                        {info.body3 && (
                            <ul className="text-white text-[16px] list-disc pl-6">
                                {info.body3.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        )}

                        {info.body4 && (
                            <ul className="text-white text-[16px] list-disc pl-6">
                                {info.body4.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        )}

                        {info.body5 && (
                            <ul className="text-white text-[16px] list-disc pl-6">
                                {info.body5.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        )}

                        {info.body6 && (
                            <ul className="text-white text-lg list-disc pl-6">
                                {info.body6.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        )}

                        {info.body7 && (
                            <ul className="text-white text-[16px] list-disc pl-6">
                                {info.body7.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        )}

                        {/* Additional Subheading and List */}
                        {info.subhead7 && <h3 className="text-white text-xl font-semibold mt-4">{info.subhead7}</h3>}
                        {info.subody7 && (
                            <ul className="text-white text-[16px] list-disc pl-6">
                                {info.subody7.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        )}
                        {info.need7 && <p className="text-white text-lg mb-2 font-semibold">{info.need7}</p>}
                    </div>

                ))}
                <div className="w-full flex justify-center">
                    <p className='text-white lg:text-[80px] text-[30px]'>💛 Enjoy</p>
                </div>
                <div className="w-full flex justify-center ">
                    <div className="lg:w-[558px] w-[100%] h-[80px] flex justify-center items-center lg:gap-[32px] gap-[20px] border border-[#0E464F] rounded-xl">

                    <button className='lg:w-[215px] w-[100px] h-[48px] lg:text-[16px] text-[14px] border border-[#197686] text-[#197686] rounded-xl'>Design File</button>
                    <button className='lg:w-[215px] w-[100px] h-[48px] lg:text-[16px] bg-[#197686] text-[14px] text-white rounded-xl'>GitHub Code</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WriteUp;
