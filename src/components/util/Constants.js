const prod = {
  url: {
    API_BASE_URL: 'https://viu.proyectofinal.com',
  }
}

const dev = {
  url: {
    API_BASE_URL: 'http://127.0.0.1:8080'
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod