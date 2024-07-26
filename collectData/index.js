fetch("https://erp.iitj.ac.in/Academic/getIHSubCount.htm", {
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
        "cookie": process.env.cookie,
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": `subno={MSL7390}`,
    "method": "POST"
})

const data = fs.readFileSync('curatedCourses.json', 'utf8');
const jsonData = JSON.parse(data);