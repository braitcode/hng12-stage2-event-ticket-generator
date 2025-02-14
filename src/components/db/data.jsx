export const writeup = [
    {
        id: '1',
        heading1: '📌 Overview',
        body1: 'This is a beginner-friendly yet practical Event Ticket Booking UI designed for developers to clone, explore, and build upon. The design focuses on a seamless, login-free ticket reservation flow, allowing users to book event tickets quickly and efficiently.',
        parabody: 'The project consists of a three-step ticket booking flow, and developers can extend it further by integrating payment solutions, user authentication (optional), and ticket validation systems.',

    },
    {
        id: '2',
        heading2: '📌 Flow & Features',
        subheading: 'Ticket Selection',
        body2: [
            "Users can browse available tickets (Free & Paid).",
            "Ticket options are displayed in a list or card view.",
            "For Free Tickets → Clicking “Get Free Ticket” proceeds to attendee details.",
            "For Paid Tickets → Clicking “Purchase Ticket” would ideally open a payment modal."
        ]
    },
    {
        id: '3',
        heading3: '📌 Attendee Details Form',
        body3: [
            "Users input their Name, Email, and optional Phone Number.",
            "Profile picture upload option with preview functionality.",
            "Ticket summary is visible to ensure users review their details before submission."
        ]
    },
    {
        id: '4',
        heading4: '📌 Payment or Success Page',
        body4: [
            "If the ticket is free, the user is taken directly to the Ticket Confirmation Page.",
            "If the ticket is paid, developers can integrate Stripe, Paystack, or Flutterwave to process payments before showing the confirmation page.",
            "Upon successful booking, users should receive:",
            "A visual ticket preview with a unique QR Code.",
            "An option to download the ticket as PDF or save it to their device.",
            "An email confirmation containing ticket details."
        ],
        para4: 'How To Build This'
    },
    {
        id: '5',
        heading5: 'This UI can be implemented using:',
        body5: [
            "📌 Frontend (Nextjs or React)",
            "Component Breakdown:",
            "TicketCard.tsx → Displays ticket details",
            "AttendeeForm.tsx → Captures user details",
            "PaymentModal.tsx → Handles payment processing",
            "SuccessScreen.tsx → Shows the final ticket preview",
            "State Management: React’s Context API, Zustand, or Redux (if needed).",
            "File Handling: Users should be able to upload images (profile picture for ticket) using Firebase Storage, Cloudinary, or local preview with URL.createObjectURL()."
        ]
    },
    {
        id: '6',
        heading6: '📌 Backend (Optional)',
        body6: [
            "If persistence is required, a backend can be built using:",
            "Node.js & Express or Firebase Functions",
            "Database: MongoDB, PostgreSQL, or Firebase Firestore to store ticket records"
        ]
    },
    {
        id: '7',
        heading7: '📌 Payment Integration',
        body7: [
            "For paid events, developers should integrate:",
            "Stripe Checkout (for international transactions)",
            "Paystack or Flutterwave (for African users)"
        ],
        subhead7: "What You’ll Learn 🧑‍💻",
        subody7: [
            "File handling & validation (profile picture uploads).",
            "Dynamic UI updates based on ticket selection.",
            "Persisting bookings using local state or a backend.",
            "Integrating payment gateways for ticket purchases.",
            "Generating & validating QR Codes for event check-in (Advanced)."
        ],
        need7: "Need Help? Reach Out! 💬"
    }
]