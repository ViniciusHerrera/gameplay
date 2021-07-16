import axios from 'axios';

const api = axios.create({  // Criamos a rota base que acessa nossa api
  baseURL: 'https://discord.com/api'
});

export { api }