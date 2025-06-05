// @ts-check
import { defineConfig } from 'astro/config';
import dotenv from "dotenv";
import vercel from '@astrojs/vercel/serverless'; 

dotenv.config()

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: vercel(),
    server: {
        host: true,
        port: 3000,
    },
});
