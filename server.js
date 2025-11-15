const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

// Middleware para RAW TEXT (IMPORTANTE)
app.use(express.text({ type: "*/*" }));

app.use(cors());

// URL del servicio ASMX REAL
const SOAP_URL = "http://gestintsoa.runasp.net/WS_Vehiculo.asmx";

app.post("/proxy", async (req, res) => {
  try {
    const soapResponse = await fetch(SOAP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": "http://rentaautos.ec/gestion/obtenerVehiculos"
      },
      body: req.body  // <= AQUÍ ENVIAMOS EL XML CRUDO
    });

    const result = await soapResponse.text();

    res.set("Content-Type", "text/xml");
    res.send(result);

  } catch (err) {
    console.error("❌ Error en proxy:", err);
    res.status(500).send("Error en el proxy");
  }
});

// Puerto Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy corriendo en http://localhost:${PORT}`);
});
