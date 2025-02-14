import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas'
import { jsPDF } from "jspdf";
import ticket from "../assets/images/newticket.png"
import { NavLink } from 'react-router-dom'
import barcode from "../assets/images/Bar Code.png"
import '../components/styles/styles.css'
import { useRef } from "react"

const Tickets = () => {
  const [ticketData, setTicketData] = useState(null);
  const ticketRef = useRef(null);

    // Load stored ticket & attendee data
   useEffect(() => {
    const storedTicket = JSON.parse(localStorage.getItem("selectedTicket")) || {};
    const name = localStorage.getItem("attendeeName") || "No Name Found";
    const email = localStorage.getItem("attendeeEmail") || "No Email Found";
    const profilePic = localStorage.getItem("attendeeProfilePic") || "";
    const ticketQuantity = localStorage.getItem("ticketQuantity") || "1";

    console.log("Loaded Name:", name);
    console.log("Loaded Email:", email);
    console.log("Loaded Profile Pic:", profilePic);

    setTicketData({
        type: storedTicket.type || "Free",
        price: storedTicket.price || "0",
        name,
        email,
        profilePic,
        ticketQuantity
    });
}, []);

    // Download Ticket as Image
    const handleDownload = async (format = "png") => {
      if (!ticketRef.current) {
        console.error("Ticket container not found!");
        return;
      }
  
      try {
        const canvas = await html2canvas(ticketRef.current, {
          scale: 3,
          useCORS: true,
          backgroundColor: null
        });
  
        const imgData = canvas.toDataURL("image/png");
  
        if (format === "png") {
          // Download as PNG
          const link = document.createElement("a");
          link.href = imgData;
          link.download = "ticket.png";
          link.click();
        } else if (format === "pdf") {
          // Download as PDF
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: [80, 120]  // Ticket-sized PDF
          });
          pdf.addImage(imgData, "PNG", 5, 5, 70, 100);
          pdf.save("ticket.pdf");
        }
      } catch (error) {
        console.error("Error capturing ticket:", error);
      }
    };

  if (!ticketData) return <p className="text-white text-center">Loading...</p>;
  return (
    <>
      <div className="w-full h-auto bg-[#052F35] flex justify-center items-center py-10">
        <div className="lg:w-[45%] w-[90%] border border-[#197686] rounded-3xl p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className='flex justify-between'>
              <p className='text-white'>Ready</p>
              <p className='text-white'>Step 3/3</p>
            </span>
            <div className="w-full bg-[#0E464F] h-[4px] rounded-full overflow-hidden">
                            <div className="bg-[#24A0B5] h-full w-[100%]"></div>
                        </div>
          </div>
          <div className="w-full h-[900.85px] flex flex-col justify-between items-center">
            <span className='h-[81px] flex flex-col justify-between items-center'>
              <p className='text-center lg:text-[32px] text-[20px] text-white'>Your Ticket Is Booked!</p>
              <p className='text-white lg:text-[16px] text-[14px] text-center'>Check your email for a copy or you can <b>download</b></p>
            </span>
            <div ref={ticketRef} id="ticketContainer" className="relative w-[300px] h-[600px] bg-cover bg-no-repeat bg-center p-5"
              style={{ backgroundImage: `url('${ticket}')` }}>

              <div className="w-[260px] h-[446px] border border-[#197686] rounded-2xl flex flex-col items-center justify-center gap-[20px]">
                <div className="w-[175px] h-[76px]">
                  <h1 className='header text-white text-[34px]'>Techember Fest "25</h1>
                  <p className='text-white text-[10px] text-center'>📍 4, Rumens road, Ikoyi, Lagos</p>
                  <p className='text-white text-[10px] text-center'>📅 March 15, 2025 | 7:00 PM</p>
                </div>
                <div className="w-[140px] h-[140px] border-3 border-[#24A0B5] rounded-2xl">
                <img src={ticketData.profilePic} alt="Profile" className="w-[135px] h-[135px] rounded-xl object-cover" />
                </div>
                <div className="w-[232px] h-[160px] bg-[#08343C] border border-[#133D44] rounded-xl">
                  <div className='flex w-full justify-center mt-1'>
                    <div className="w-[110px]">
                      <div className="text-[10px] text-gray-400 border-r-2 border-b-2 border-[#133D44]">
                        <label htmlFor="">Enter your name</label>
                        <p className="text-white text-[12px]">{ticketData.name}</p>
                      </div>
                      <div className="text-[10px] text-gray-400 border-r-2 border-b-2 border-[#133D44]">
                        <label htmlFor="" >Ticket Type</label>
                        <p className="text-white text-[12px]">{ticketData.type}</p>
                      </div>

                    </div>
                    
                    <div className="w-[110px]">
                      <div className="text-[10px] text-gray-400 border-b-2 border-[#133D44]">
                        <label htmlFor="" className='p-1'>Enter your email</label>
                        <p className="text-white text-[12px]">{ticketData.email}</p>
                      </div>
                      <div className="text-[10px] text-gray-400 border-b-2 border-[#133D44]">
                        <label htmlFor="" className='p-1'>Ticket For:</label>
                        <p className="text-white text-[12px]">{ticketData.ticketQuantity}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[224px] h-[65px] p-1">
                    <form action="">
                      <label htmlFor="special-request" className=" text-gray-400 text-[10px]">Special request?</label>
                      <textarea
                        id="special-request"
                        rows="3"
                        className="w-full p-1 rounded-md text-[10px] text-gray-400"
                        placeholder="Enter your request here..."
                      ></textarea>
                    </form>

                  </div>
                </div>
              </div>
              <div className="h-[150px] w-[260px] flex justify-center items-center">
                <img src={barcode} alt="" />
              </div>
            </div>

            <div className=" lg:w-[556px] lg:h-[48px] bg-transparent lg:bg-[#041E23] rounded-2xl flex flex-col-reverse md:flex-row justify-center gap-4">
              <NavLink to='/'>

              <button className='border border-[#2BA4B9] lg:w-[214px] w-[287px] h-[48px] rounded-lg text-[#2BA4B9] cursor-pointer'>Book Another Ticket</button>
              </NavLink>

                <button 
                onClick={handleDownload}
                className='lg:w-[214px] w-[287px] h-[48px] bg-[#2ca5ba] rounded-lg text-white cursor-pointer'>Download Ticket</button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tickets