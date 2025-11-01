#  Digital Lost-and-Found Board

A *responsive web application* built using *React.js* that helps students report, find, and reunite with lost belongings within a college campus.  
This system ensures an *efficient, secure, and user-friendly* experience for both finders and owners through a well-organized web interface.

---

##  Features 

###  Home Page
- Interactive landing page with 3 main options:
  - *Lost an Item*
  - *Found an Item*
  - *Admin Panel*
- Smooth scrolling and modern UI with animations.
- <img width="1813" height="777" alt="Screenshot 2025-11-01 113221" src="https://github.com/user-attachments/assets/ae9edb94-f780-45ff-9304-f96741b839b8" />


###  Lost Item Portal
- Allows users to report items they have lost.
- Fields: Item name, description, location (optional), date, time (optional), and image (optional).
- Institutional email verification (@nirmauni.ac.in) before submitting details.
- Real-time notifications when a similar found item is posted.

###  Found Item Portal
- Allows users to submit details of items they’ve found.
- All fields are *mandatory*: item name, description, location, date, time, and image.
- Institutional email verification (@nirmauni.ac.in) via OTP before posting.

###  Admin Panel
- Access restricted to:
  - *Email:* lostfound@lostfound.com
  - *Password:* admin@lostfound
- Admin can:
  - View all lost items
  - View all found items
  - See matched items
  - Monitor active chats
  - Mark items as resolved

### Static Chat System
- When a *lost item* matches with a *found item*, both users are automatically connected via a private real-time chat.
- Users can communicate safely to verify and return the item.
- Chat includes:
  - Message bubbles with timestamps
  - Typing indicators
  - "Mark as Reunited" confirmation button

---

##  System Flow

1. *User visits* homepage and selects either “Lost” or “Found”.
2. *Email verification* ensures authenticity (only @nirmauni.ac.in allowed).
3. *Form submission* stores item details in the database.
4. System automatically *matches items* using text similarity and metadata.
5. If a match is found, both users are *notified* and connected via chat.
6. Once confirmed, users mark the item as *Reunited*.

---
![IMG-20251101-WA0012](https://github.com/user-attachments/assets/697eb325-27fa-4052-b1b4-a03159331137)
![IMG-20251101-WA0011](https://github.com/user-attachments/assets/01704e6e-4dd9-4a17-8a51-d48effb3ef44)
![IMG-20251101-WA0010](https://github.com/user-attachments/assets/55b98ce2-f13b-4fc8-872d-9993b1e55060)
![IMG-20251101-WA0009](https://github.com/user-attachments/assets/b2766d72-54a4-417b-9776-47d62cea1beb)
<img width="1917" height="905" alt="Screenshot 2025-11-01 131709" src="https://github.com/user-attachments/assets/7c50a022-7558-4561-affd-4005111d42f8" />

<img width="479" height="878" alt="Screenshot 2025-11-01 131759" src="https://github.com/user-attachments/assets/af0524a6-f921-4695-8420-3c2f9d60c5f2" />




##  Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | React.js, Tailwind CSS / Figma UI |
| Authentication | OTP Email Verification |
| Image Storage | Local Storage |

---

##  UI/UX Design

The complete UI/UX was generated using *Figma AI* based on structured prompts.  
The design includes:
- Smooth scrolling single-page layout  
- Distinct portals for Lost, Found, and Admin  
- Minimalistic and professional dashboard  
- Modern chat interface for real-time communication  

*Color Palette:*
- Soft Blue (#E6F0FF)
- Teal Accent (#00BFA6)
- White & Gray Neutrals

---

##  Authentication Rules

| User Type | Email Format | Access Type |
|------------|---------------|--------------|
| Lost User | @nirmauni.ac.in | Via OTP Verification |
| Found User | @nirmauni.ac.in | Via OTP Verification |
| Admin | lostfound@lostfound.com | Password: admin@lostfound |

---

##  Installation & Setup

1. *Clone the Repository*
   ```bash
   git clone https://github.com/<your-username>/digital-lost-and-found-board.git
   cd digital-lost-and-found-board
