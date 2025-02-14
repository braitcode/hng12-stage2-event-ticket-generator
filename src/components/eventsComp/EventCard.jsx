import React, { useState, useEffect } from 'react'
import "../styles/styles.css"
import { NavLink } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js';
// import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import PaystackPop from '@paystack/inline-js';

const EventCard = () => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const stripePromise = loadStripe("pk_test_51QsKyyPDSkXjoayWLz3UwPmOY9qL8YPjLhCgzNflQrtOtFNnLyXRaoahNj8XYl9dTHj1KS4P9Jmvk3YGFKJVxqhZ00p5xHbwW6");

    // Load saved selection from localStorage on component mount
    useEffect(() => {
        const savedTicket = JSON.parse(localStorage.getItem("selectedTicket"));
        const savedQuantity = localStorage.getItem("ticketQuantity");

        if (savedTicket) setSelectedTicket(savedTicket);
        if (savedQuantity) setTicketQuantity(savedQuantity);
    }, []);

    // Handle ticket selection
    const handleTicketSelection = (type, price) => {
        const ticketData = { type, price };
        setSelectedTicket(ticketData);
        localStorage.setItem("selectedTicket", JSON.stringify(ticketData));

        if (price === "$50" || price === "$150") {
            setShowPaymentModal(true);
        }
    };

    // PayStack for African users
    const handlePaystackPayment = () => {
        if (!selectedTicket || !selectedTicket.price) {
            alert("Please select a ticket first.");
            return;
        }

        const priceInKobo = parseInt(selectedTicket.price.replace(/[^0-9]/g, ""), 10) * 100; // Converts "$50" → 5000
        const email = localStorage.getItem("attendeeEmail") || "brightjohn489@gmail.com";

        if (!email) {
            alert("A valid email is required for payment.");
            return;
        }

        const paystack = new PaystackPop();
        paystack.newTransaction({
            key: "pk_test_f9641f49d62914edbfdd6e3973e986a08d01c9cc",
            amount: priceInKobo,
            email: email,
            currency: "NGN",
            reference: `TXN_${new Date().getTime()}`,
            label: "Techember Fest 2025 Ticket",
            onSuccess: (response) => {
                alert(`Payment successful! Transaction ID: ${response.reference}`);
                setShowPaymentModal(false);
            },
            onCancel: () => {
                alert("Payment was canceled.");
            }
        });
    };

    // Stripe for International Users
    const handleStripePayment = async () => {
        if (!selectedTicket || !selectedTicket.price) {
            alert("Please select a ticket first.");
            return;
        }

        const stripe = await stripePromise;

        // Use real Stripe Price IDs
        const stripePriceIds = {
            "VIP": "price_1QsL7sPDSkXjoayWQDiEhhbY",   // Replace with actual Price ID for VIP ticket
            "VVIP": "price_1QsL9lPDSkXjoayW2keVfvJa"   // Replace with actual Price ID for VVIP ticket
        };

        const priceId = stripePriceIds[selectedTicket.type]; // Get corresponding price ID

        if (!priceId) {
            alert("Invalid ticket selection.");
            return;
        }

        const { error } = await stripe.redirectToCheckout({
            lineItems: [{ price: priceId, quantity: ticketQuantity }],
            mode: "payment",
            successUrl: "http://localhost:5173/ticket",
            cancelUrl: "http://localhost:5173/"
        });

        if (error) console.error("Stripe Checkout Error:", error);
    };


    // Handle quantity selection
    const handleQuantityChange = (event) => {
        const quantity = event.target.value;
        setTicketQuantity(quantity);
        localStorage.setItem("ticketQuantity", quantity);
    };
    return (
        <>

            {showPaymentModal && (
                <div className="fixed inset-0 flex justify-center items-center">
                    <div className="bg-[#08252B] border border-[#2BA4B9] p-6 rounded-lg shadow-lg w-[400px] text-center">
                        <h2 className="text-white text-lg font-bold">Select a Payment Method</h2>
                        <div className="flex flex-col gap-4 mt-4">
                            <button onClick={handleStripePayment} className="bg-[#08252B] border border-[#2BA4B9] text-white py-2 rounded-lg cursor-pointer">Pay with Stripe</button>
                            <button onClick={handlePaystackPayment} className="bg-[#08252B] border border-[#2BA4B9] text-white py-2 rounded-lg cursor-pointer">Pay with Paystack</button>
                            {/* <button className="bg-[#08252B] border border-[#2BA4B9] text-white py-2 rounded-lg cursor-pointer">Pay with Flutterwave</button> */}
                        </div>
                        <button
                            className="mt-4 text-white underline cursor-pointer"
                            onClick={() => setShowPaymentModal(false)}
                        >Cancel</button>
                    </div>
                </div>
            )}
            <div className="w-full h-auto bg-[#052F35] flex justify-center items-center py-10">
                <div className="lg:w-[45%] w-[95%] border border-[#197686] rounded-3xl p-6 flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <span className='flex justify-between'>
                            <p className='text-white'>Ticket Selection</p>
                            <p className='text-white'>Step 1/3</p>
                        </span>
                        <div className="w-full bg-[#0E464F] h-[4px] rounded-full overflow-hidden">
                            <div className="bg-[#24A0B5] h-full w-[33%]"></div>
                        </div>
                    </div>
                    <div className="bg-[#08252B] w-full lg:h-[726px] h-[1000px] flex flex-col items-center justify-center gap-6 rounded-xl border border-[#2BA4B9]">
                        <div className="lg:w-[556px] w-[90%] h-[200px] border border-[#07373F] text-white flex flex-col justify-center items-center gap-4 rounded-xl">
                            <h1 className='header h-[62px] lg:text-[62px] text-[40px]'>Techember Fest "25</h1>
                            <p className='lg:w-[340px] h-[48px] text-center lg:text-[16px] text-[12px]'>Join us for an unforgettable experience at Techember Fest '25! Secure your spot now.</p>
                            <p className='h-[24px] lg:text-[16px] text-[12px] text-center'>📍 [Event Location] || March 15, 2025 | 7:00PM</p>
                        </div>
                        <div className="bg-[#07373F] h-[4px] lg:w-[556px] w-[90%]"></div>
                        <div className="lg:h-[218px] lg:w-[556px] w-[90%] flex flex-col justify-between">
                            <p className='text-white h-[24px]'>Select Ticket Type:</p>
                            <div className="border border-[#07373F] lg:h-[186px] h-[410px] lg:w-[556px] w-[287px] rounded-xl flex justify-center items-center p-4">
                                <div className="h-auto w-[524px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className={`lg:w-[158px] w-[255px] h-[110px] p-2 rounded-xl cursor-pointer ${selectedTicket?.type === "Regular" ? "bg-[#197686]" : "border border-[#07373F]"
                                        }`}
                                        onClick={() => handleTicketSelection("Regular", "Free")}>
                                        <p className=" text-white font-semibold text-[24px]">
                                            Free
                                        </p>
                                        <span>
                                            <p className="text-white mt-2">REGULAR ACCESS</p>
                                            <p className="text-white text-[14px]">20/52</p>
                                        </span>
                                    </div>
                                    <div className={`lg:w-[158px] w-[255px] h-[110px] p-2 rounded-xl cursor-pointer ${selectedTicket?.type === "VIP" ? "bg-[#197686]" : "border border-[#07373F]"
                                        }`}
                                        onClick={() => handleTicketSelection("VIP", "$50")}
                                    >
                                        <p className=" text-white font-semibold text-[24px]">
                                            $50
                                        </p>
                                        <span>
                                            <p className="text-white mt-2">VIP ACCESS</p>
                                            <p className="text-white text-[14px]">20/52</p>
                                        </span>

                                    </div>
                                    <div className={`lg:w-[158px] w-[255px] h-[110px] p-2 rounded-xl cursor-pointer lg:col-span-1 md:col-span-2 ${selectedTicket?.type === "VVIP" ? "bg-[#197686]" : "border border-[#07373F]"
                                        }`}
                                        onClick={() => handleTicketSelection("VVIP", "$150")}
                                    >
                                        <p className="text-white font-semibold text-[24px]">
                                            $150
                                        </p>
                                        <span>
                                            <p className="text-white mt-2">VVIP ACCESS</p>
                                            <p className="text-white text-[14px]">20/52</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-[556px] w-[90%] flex flex-col">
                            <p className="text-white">Number of Tickets:</p>
                            <input
                                type="number"
                                value={ticketQuantity}
                                min="1"
                                max="10"
                                onChange={handleQuantityChange}
                                className="w-full h-[48px] p-2 border border-[#07373F] rounded-lg text-white bg-transparent"
                            />
                        </div>
                        <div className=" lg:w-[556px] lg:h-[48px] bg-transparent lg:bg-[#041E23] rounded-2xl flex flex-col-reverse md:flex-row justify-center gap-4">
                            <button className='border border-[#2BA4B9] lg:w-[214px] w-[287px] h-[48px] rounded-lg text-[#2BA4B9] cursor-pointer'>Cancel</button>
                            <NavLink to='/attendee'>

                                <button className='lg:w-[214px] w-[287px] h-[48px] bg-[#2BA4B9] rounded-lg text-white cursor-pointer'>Next</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard