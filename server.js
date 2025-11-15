import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.text({ type: "*/*" })); // Acepta XML
app.use(cors());

// URL de tu WS en MonsterASP (HTTP ✔)
const SOAP_URL = "http://gestintsoa.runasp.net/WS_Vehiculo.asmx";

// 🔥 Proxy universal para SOAP (funciona para todos los métodos)
app.post("/proxy", async (req, res) => {
    try {

        const soapResponse = await fetch(SOAP_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/xml; charset=utf-8",
                "SOAPAction": "http://rentaautos.ec/gestion/obtenerVehiculos"
            },
            body: req.body
        });

        const result = await soapResponse.text();
        res.set("Content-Type", "text/xml");
        res.send(result);

    } catch (err) {
        console.error("❌ Error en proxy:", err);
        res.status(500).send("Error en el proxy");
    }
});

// Puerto para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Proxy corriendo en http://localhost:${PORT}`);
});
