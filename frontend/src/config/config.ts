const environment: String = "production"

type Config = {
    API_BASE_URL: String
}

let config: Config

if (environment == "production") {
    config = {
        API_BASE_URL: "https://expense-tracker-api.sanskarbhusal.com.np"
    }
} else {
    config = {
        API_BASE_URL: "http://localhost:3000"
    }
}

export default config