// import React, { useState, useEffect } from 'react';
// import ticket from "../assets/images/newticket.png"; // Ensure this is the correct path
// import barcode from "../assets/images/Bar Code.png"; // Ensure this is the correct path

// const Catalogue = () => {
//     const [tickets, setTickets] = useState([]);

//     // Load tickets from localStorage
//     useEffect(() => {
//         const savedTickets = JSON.parse(localStorage.getItem("generatedTickets")) || [];
//         setTickets(savedTickets);
//     }, []);

//     // Clear all tickets
//     const clearTickets = () => {
//         localStorage.removeItem("generatedTickets");
//         setTickets([]); // Update state to reflect changes
//     };

//     return (
//         <div className="w-full h-auto flex flex-col justify-center items-center py-10">
//             <h2 className="text-white text-2xl mb-4">Generated Tickets</h2>

//             {tickets.length === 0 ? (
//                 <p className="text-gray-400">No ticket has been generated</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {tickets.map(ticketData => (
//                         <div key={ticketData.id} className="relative w-[300px] h-[600px] bg-cover bg-no-repeat bg-center p-5"
//                             style={{ backgroundImage: `url('${ticket}')` }}>
                            
//                             <div className="w-[260px] h-[446px] border border-[#197686] rounded-2xl flex flex-col items-center justify-center gap-[20px]">
//                                 <div className="w-[175px] h-[76px]">
//                                     <h1 className='header text-white text-[34px]'>Techember Fest "25</h1>
//                                     <p className='text-white text-[10px] text-center'>📍 4, Rumens road, Ikoyi, Lagos</p>
//                                     <p className='text-white text-[10px] text-center'>📅 March 15, 2025 | 7:00 PM</p>
//                                 </div>
//                                 <div className="w-[140px] h-[140px] border-3 border-[#24A0B5] rounded-2xl">
//                                     <img src={ticketData.profilePic} alt="Profile" className="w-[135px] h-[135px] rounded-xl object-cover" />
//                                 </div>
//                                 <div className="w-[232px] h-[160px] bg-[#08343C] border border-[#133D44] rounded-xl">
//                                     <div className='flex w-full justify-center mt-1'>
//                                         <div className="w-[110px]">
//                                             <div className="text-[10px] text-gray-400 border-r-2 border-b-2 border-[#133D44]">
//                                                 <label>Enter your name</label>
//                                                 <p className="text-white text-[12px]">{ticketData.name}</p>
//                                             </div>
//                                             <div className="text-[10px] text-gray-400 border-r-2 border-b-2 border-[#133D44]">
//                                                 <label>Ticket Type</label>
//                                                 <p className="text-white text-[12px]">{ticketData.type || "Regular"}</p>
//                                             </div>
//                                         </div>
                                        
//                                         <div className="w-[110px]">
//                                             <div className="text-[10px] text-gray-400 border-b-2 border-[#133D44]">
//                                                 <label>Enter your email</label>
//                                                 <p className="text-white text-[12px]">{ticketData.email}</p>
//                                             </div>
//                                             <div className="text-[10px] text-gray-400 border-b-2 border-[#133D44]">
//                                                 <label>Ticket For:</label>
//                                                 <p className="text-white text-[12px]">{ticketData.ticketQuantity || "1"}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="w-[224px] h-[65px] p-1">
//                                         <form>
//                                             <label className=" text-gray-400 text-[10px]">Special request?</label>
//                                             <textarea
//                                                 rows="3"
//                                                 className="w-full p-1 rounded-md text-[10px] text-gray-400"
//                                                 placeholder="Enter your request here..."
//                                             ></textarea>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="h-[150px] w-[260px] flex justify-center items-center">
//                                 <img src={barcode} alt="Barcode" />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {tickets.length > 0 && (
//                 <button 
//                     onClick={clearTickets}
//                     className="mt-6 px-4 py-2 border border-[#197686] text-white rounded-lg"
//                 >
//                     Clear All Tickets
//                 </button>
//             )}
//         </div>
//     );
// };

// export default Catalogue;
