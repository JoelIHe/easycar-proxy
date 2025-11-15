const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// URL de tu ASMX
const SOAP_URL = "https://gestintsoa.runasp.net/WS_Vehiculo.asmx";

// Ruta proxy
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

// Puerto Render:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy corriendo en http://localhost:${PORT}`);
});
