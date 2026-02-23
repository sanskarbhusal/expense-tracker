const environment: String = "local"

type Config = {
    API_BASE_URL: String
}

let config: Config

if (environment == "production") {
    config = {
        API_BASE_URL: "https://clarity-api.sanskarbhusal.com.np"
    }
} else {
    config = {
        API_BASE_URL: "http://localhost:3000"
    }
}

export default config