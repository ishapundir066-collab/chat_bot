// const express = require('express');
// const bodyParser = require('body-parser');
// const fetch = require('node-fetch');
// require('dotenv').config();

// const app = express();
// app.use(bodyParser.json());
// app.use(express.static('.'));

// app.post('/api/chat', async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const apiRes = await fetch('https://openai-o3-mini.p.rapidapi.com/', {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': process.env.RAPID_API_KEY,
//         'X-RapidAPI-Host': 'openai-o3-mini.p.rapidapi.com'
//       },
//       body: JSON.stringify({
//         model: 'o3-mini',
//         messages: [{ role: 'user', content: prompt }]
//       })
//     });

//     const data = await apiRes.json();
//     res.json({ reply: data.choices?.[0]?.message?.content || "No reply" });
//   } catch (e) {
//     res.status(500).json({ reply: "Error fetching response." });
//   }
// });

// app.listen(3000, () => console.log("Server running at http://localhost:3000"));
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // serves your HTML/CSS/JS files

const http = require('https');

// -------------------------
// API Endpoint for Programming Challenges
// -------------------------
app.get('/api/programming-challenge', async (req, res) => {
  try {
    console.log('Received request for programming challenge');

    const options = {
      method: 'GET',
      hostname: 'programming-challenges.p.rapidapi.com',
      port: null,
      path: '/api/ziza/programming-challenges/get/single/random',
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': 'programming-challenges.p.rapidapi.com'
      }
    };

    const apiReq = http.request(options, function (apiRes) {
      const chunks = [];

      apiRes.on('data', function (chunk) {
        chunks.push(chunk);
      });

      apiRes.on('end', function () {
        const body = Buffer.concat(chunks);
        const data = JSON.parse(body.toString());
        console.log('RapidAPI Response Data:', data);
        res.json(data);
      });
    });

    apiReq.on('error', (error) => {
      console.error('RapidAPI Request Error:', error);
      res.status(500).json({ error: error.message });
    });

    apiReq.end();

  } catch (error) {
    console.error('Programming Challenge API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// -------------------------
// API Endpoint for AI Chat
// -------------------------
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    const { default: fetch } = await import('node-fetch');
    console.log('OPENROUTER_KEY being used:', process.env.OPENROUTER_KEY);
    const apiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_KEY}`,
        'HTTP-Referer': 'http://localhost:3000', // change to your domain if hosted
        'X-Title': 'Programming Challenge Platform',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-nano-12b-v2-vl:free',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    const data = await apiRes.json();
    console.log('OpenRouter API Response Status:', apiRes.status);
    console.log('OpenRouter API Response Status Text:', apiRes.statusText);
    console.log('OpenRouter API Response Data:', data);
    res.json({
      reply: data.choices?.[0]?.message?.content || "No reply received from OpenRouter."
    });
  } catch (error) {
    console.error('OpenRouter API Error:', error);
    res.status(500).json({ reply: "Error fetching response from OpenRouter." });
  }
});

// -------------------------
// Start Server
// -------------------------
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
