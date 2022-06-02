import httpProxy from "http-proxy";
import Cookies from "cookies";

export const config = {
    api: {
        bodyParser: false,
    },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req, res) {
    if (req.method !== "POST") return res.status(404).json({ message: "method not supported" });
    return new Promise((resolve) => {
        req.headers.cookie = "";
        const handleLoginResponse = (proxyRes, req, res) => {
            let body = "";
            proxyRes.on("data", (chunk) => (body += chunk));
            proxyRes.on("end", async () => {
                try {
                    const { message, accessToken } = JSON.parse(body);
                    if (!accessToken) return res.status(400).json({ message: message });
                    const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== "development" });
                    cookies.set("access_token", accessToken, {
                        httpOnly: true,
                        sameSite: "lax",
                    });
                    res.status(200).json({
                        message: "login successful",
                    });
                } catch (error) {
                    res.status(500).json({ message: "something went wrong" });
                }
                resolve(true);
            });
        };
        proxy.once("proxyRes", handleLoginResponse);
        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: true,
        });
    });
}
