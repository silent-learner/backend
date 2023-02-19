const fs = require('fs')
let arr = [];
const companies = [
  "Google",
  "Amazon",
  "Tesla",
  "Meta",
  "Microsoft",
  "TCS",
  "IBM",
  "Intel",
  "Infosys",
  "Mercedes",
];

const country_city = [
  { country: "USA", city: "New York" },
  { country: "USA", city: "Washington Dc" },
  { country: "USA", city: "Boston" },
  { country: "India", city: "Delhi" },
  { country: "India", city: "Mumbai" },
  { country: "India", city: "Banglore" },
  { country: "India", city: "Kolkata" },
  { country: "UK", city: "London" },
  { country: "UK", city: "Oxford" },
  { country: "UK", city: "Cambridge" },
  { country: "UK", city: "Manchester" },
  { country: "France", city: "Paris" },
  { country: "France", city: "Nice" },
  { country: "France", city: "Touluse" },
  { country: "Italy", city: "Rome" },
  { country: "Italy", city: "Milan" },
  { country: "Italy", city: "Vatican" },
  { country: "Germany", city: "Berlin" },
];

function getRandomDate() {
    const maxDate = Date.now();
    const timestamp = Math.floor(Math.random() * maxDate);
    return new Date(timestamp);
}

for (let i = 0; i < 100; i++) {
    let ele = {}
  ele.name = `Kashif${i}`;
  ele.email = `kashif${i}@gmail.com`;
  ele.aadharNumber =  Math.floor(100000000 + Math.random() * 900000000);
  ele.company_name = companies[Math.floor(Math.random()*10)];
  ele.department = Math.floor(Math.random()*100);
  ele.address = "street 1 block 2";
  let index = Math.floor(Math.random()*18)
  ele.city = country_city[index].city;
  ele.country = country_city[index].country;
  ele.salary = Math.floor(100000 + Math.random() * 900000);
  ele.phone = Math.floor(100000000 + Math.random() * 900000000);
  ele.dateOfJoining = getRandomDate();
  ele.createdAt = getRandomDate();
  ele.updatedAt = ele.createdAt
  arr.push(ele)
}

console.log(arr);

const data = JSON.stringify(arr)

fs.writeFile("./data.json", data, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
