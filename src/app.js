// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
import '@tensorflow/tfjs-node';

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
import * as canvas from 'canvas';
import fetch from 'node-fetch';

import * as faceapi from '@vladmandic/face-api';
import fs from 'fs'
// Import a fetch implementation for Node.js


const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
faceapi.env.monkeyPatch({ fetch: fetch });


fs.readFile('Michael-Emerson-2.png', async (err, data) => {
    if (err)
        throw err

    const image = new Image()
    image.src = data

    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./public/models').then(async () => {
        const detections = await faceapi.detectAllFaces(image).then((data) => {
            console.log(data)
        })
    })

})