import axios from 'axios';

// Use environment variables for API keys and secrets
const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY;
const pinataApiSecretKey = import.meta.env.VITE_PINATA_API_SECRET_KEY;

if (!pinataApiKey || !pinataApiSecretKey) {
  console.error(
    'Pinata API Key and Secret Key are not set in .env.local file!'
  );
}

export const pinata = axios.create({
  baseURL: 'https://api.pinata.cloud',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
  },
  headers: {
    pinata_api_key: pinataApiKey,
    pinata_secret_api_key: pinataApiSecretKey,
  },
});
