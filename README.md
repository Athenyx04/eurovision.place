# eurovision.place

Welcome to **eurovision.place**, a passion project born out of love for the Eurovision Song Contest and the unity it brings across borders. This platform is crafted for Eurovision fans worldwide, aiming to fill the gaps in existing Eurovision platforms by combining clean design, intuitive functionality, and a personalized experience. Whether you're here to explore past and present Eurovision entries, compare your tastes with the community, or share your passion with friends, eurovision.place is your go-to hub for all things Eurovision.

## Features

- **Song Sorting**: Sort ESC 2024 songs based on your preferences to discover new and old favorites.
- **Community Engagement**: See how your Eurovision tastes compare with the broader community.
- **User Authentication**: Secure login with Google and X providers thanks to Lucia Auth.
- **Drag & Drop**: Enhanced interactivity with drag & drop features for a seamless experience.

## Built With

- **Astro** for a clear structure with high performance and improved SEO.
- **React** for my dynamic Astro islands, so I can use my favourite UI components.
- **Server-Side Rendering** approach, deployed on Vercel for optimal performance.
- **SQLite Database** hosted on Turso.io for robust data management.
- **AWS S3 and CloudFront** for fast and reliable image hosting.
- **UI Components** by Radix and shadcn/ui for a polished and user-friendly interface.
- **dndkit** for intuitive drag & drop interactions.

## Project Structure

The project is structured to facilitate easy navigation and contribution, ensuring a clear separation of concerns across the platform:

```
/
├── public/                # Static assets not in AWS
├── src/
│   ├── components/        # Web components
│   │   └── ui/            # UI specific reusable components
│   ├── db/                # Database related files
│   ├── i18n/              # Internationalization configurations
│   ├── layouts/           # Layout components
│   ├── lib/               # Library code that's reused across the project
│   ├── pages/             # Page components and API routes
│   │   └── api/           # Serverless functions or API logic
│   ├── store/             # State management
│   ├── auth.ts            # Authentication setup
│   ├── env.d.ts           # TypeScript definitions for Astro namespace variables
│   ├── globals.css        # Global CSS styles
│   └── middleware.ts      # Middleware for handling requests
├── test/
│   ├── components/        # Component tests
│   └── e2e/               # End-to-end tests
├── package.json           # Project metadata and dependencies
├── .env                   # Environment variables
└── config files           # Various configuration files for tools and libraries
```

## Getting Started

To set up eurovision.place locally:

1. Clone the repository:

```bash
git clone https://github.com/Athenyx04/eurovision.place.git
```

2. Navigate to the project directory and install dependencies:

```bash
cd eurovision.place
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

Navigate to `http://localhost:4321` to view the application.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file. Please ensure you replace the placeholder values with your actual data.

- `ENV` - The environment you are in for secure cookies, either dev, preview or prod.
- `DATABASE_URL` - The URL to your database.
- `DATABASE_AUTH_TOKEN` - Your authentication token for database access.
- `GOOGLE_CLIENT_ID` - Your Google client ID for authentication.
- `GOOGLE_CLIENT_SECRET` - Your Google client secret.
- `GOOGLE_REDIRECT_URI` - The redirect route for Google, located at your paths' /login/google/callback.
- `TWITTER_CLIENT_ID` - Your X provider client ID for authentication.
- `TWITTER_CLIENT_SECRET` - Your X provider client secret.
- `TWITTER_REDIRECT_URI` - The redirect route for X, located at your paths' /login/twitter/callback.

**Note**: Do not share or commit your `.env` file or the sensitive information it contains.

## Contributing

Contributions are welcome and appreciated! Whether it's bug fixes, feature additions, or improvements in documentation, your help is invaluable to making eurovision.place better for everyone. If you have suggestions for improvements or new features, feel free to:

- Fork the repository.
- Create a new branch (git checkout -b feature/AmazingFeature).
- Commit your changes (git commit -m 'feat: Add some AmazingFeature').
- Push to the branch (git push origin feature/AmazingFeature).
- Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [Mr. Gerbear's sorter](https://esc.gerbear.com/sorter2023.htm).
- Learnt a lot of useful things for this project from [midudev](https://github.com/midudev) and his community.
- Thanks to the entire Eurovision community for their passion and support.
