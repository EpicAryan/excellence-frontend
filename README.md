



# Excellence Frontend

**Excellence** is a centralized academic platform built for teachers to manage student records, batch-wise semester results, and subject-specific mark details. Built using **Next.js**, **TypeScript**, **Tailwind CSS**, **Motion** and **Shadcn UI**, this frontend connects seamlessly with a powerful backend to deliver efficient and intuitive academic data management.

---

## Features

- Teacher Dashboard to view, add, and manage students
- Batch-wise semester and subject result storage
- Responsive tables and input forms for fast entry
- Clean, modern UI using Shadcn and Tailwind
- Fast navigation and optimized routing with Next.js App Router

---

## Tech Stack

| Technology      | Purpose                              |
|----------------|---------------------------------------|
| Next.js         | React framework (App Router enabled) |
| TypeScript      | Type-safe frontend development        |
| Tailwind CSS    | Utility-first CSS framework           |
| Shadcn UI       | Accessible, reusable UI components    |
| Lucide Icons    | Lightweight icon set                  |
| Motion          | For Animation purpose                  |


## Project Structure

```txt
excellence-frontend/
├── app/                     # App directory (routing and pages)
│   └── (routes)/            # Feature-specific routes
├── components/              # UI components (tables, forms)
├── lib/                     # Utility functions and helpers
├── styles/                  # Global styles
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind config
└── tsconfig.json            # TypeScript config
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/EpicAryan/excellence-frontend.git
cd excellence-frontend
````

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> Replace the value with your backend server's actual URL.

---

## Running the Application

### Development

```bash
npm run dev
# or
yarn dev
```

Visit: [http://localhost:3000](http://localhost:3000)

### Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

---

## Customization

* UI built with Shadcn: Customize in `components/ui/`
* Add new routes or pages inside `app/`
* Style overrides in `tailwind.config.ts` or `globals.css`

---

## 🔗 Backend Integration

This project expects an API server running at the specified `NEXT_PUBLIC_API_URL`.

Backend capabilities (assumed from context):

* User login/auth
* Student creation and editing
* Batch and semester data management
* Result storage by subject

Ensure backend CORS and API endpoints are properly configured.

---

## License

This project is licensed under the [MIT License](LICENSE).


Built with care by [Aryan Kumar](https://github.com/EpicAryan)

```

