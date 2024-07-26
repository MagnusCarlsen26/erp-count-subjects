import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import subscribersModel from './models/subscribers.js'
import subjectModel from './models/subjects.js'
import cookiesModel from './models/cookies.js'
import fetch from 'node-fetch';      
import https from 'https';    
import fs from 'fs'
import Fuse from 'fuse.js'
import trafficModel from './models/traffic.js'

const app = express()

app.use(cors())
app.use(express.json())

const CONNECTION_URL = 'mongodb+srv://khushalsindhav26:YcHWqD43lnF9qHKx@cluster0.s9hsg2q.mongodb.net/'

app.post('/traffic',async(req,res) => {
    try {
        const {isTouch } = req.body
        console.log(isTouch)
        const info = new trafficModel({isTouch,time : Date.now()})
        await info.save()
        res.send('ok')
    } catch (error) {
        console.error(error)
    }
})

app.post('/autocomplete',async(req,res) => {
    try {

        const { subject } = req.body
        const data = await subjectModel.find(); 
        const fuse = new Fuse(data, {
            keys: ['subject']
        });
        const results = fuse.search(subject,{ limit: 5 });
        res.json(results.map((item) => item.item.subject));
    } catch (error) {
        console.error(error)
    }
})

app.post('/count', async( req,res ) => {
    try{

        const { subject } = req.body
        const data = await  subjectModel.findOne( { subject } )
        res.send({count : data.count})
    } catch(error) {
        console.error(error)
    }
})

app.post('/subscribe', async( req,res ) => {
    try {
        const { email,subject } = req.body
        const response = new subscribersModel( {  email,subject,time:Date.now() } )
        await response.save()
        res.send({response})
    } catch (error) {
        console.error(error)
    }
})

async function save() {


    const data = fs.readFileSync('curatedCourses.json', 'utf8');
    const jsonData = JSON.parse(data);

    Object.keys(jsonData).forEach( async(code) => {
        try {
                var response = await fetch("https://erp.iitj.ac.in/Academic/getIHSubCount.htm", {
                    agent: new https.Agent({ rejectUnauthorized: false }),
                    "headers": {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest",
                    "cookie": "JSESSIONID=5DE5513A83AC5B1B99C6FA8D94D059C5.worker3; ssoToken=AAF1F4AC523FE0DB27FB37E598D34CB9.worker1261EBD0A37201B65A4C4C640EB7413B7.worker1N4QWMJINJBRP9ZO31WE7BGRB6URJQM73M4JPWX1RQ3O8RBS1IWBKRLCPF7K6FJI5; JSID#/IIT_ERP3=261EBD0A37201B65A4C4C640EB7413B7.worker1; JSID#/Academic=5DE5513A83AC5B1B99C6FA8D94D059C5.worker3",
                    "Referer": "https://erp.iitj.ac.in/Academic/preSubjectRegistration.htm",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": `subno=${code}`,
                "method": "POST"
            })
            
            const count = await response.json()
            console.log(jsonData[code],count.count)
            response = new subjectModel({ 
                subject : jsonData[code], 
                code,
                count : parseInt(count.count,10),
                time : Date.now() 
            })
            response = await response.save()
            console.log(response)
        } catch (error) {
            console.log(error)
            process.exit()
        }
    } )
    
}

mongoose.connect(CONNECTION_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => { 
console.log(`Server is running on port ${PORT}`)
})