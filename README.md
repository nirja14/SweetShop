 Sweet Shop Management System
A simple web application to manage sweet inventory using Node.js, Express, and  JavaScript, with features like adding, updating, purchasing, restocking, searching, sorting, and generating reports.

Project File Structure
SweetShop/
├── public/
|----TEST_REPORT.pdf
|----style.css
│ └── index.html
│ └── script.js
├── src/
│ ├── server.js
│ └── sweetShop.js
├── test/
│ └── sweetShop.test.js
├── README.md
├── package.json


# Features

-  Add sweet with name, category, price, and quantity
-  Update sweet details
-  Delete sweet
-  Purchase sweet (reduce stock)
-  Restock sweet
-  Search sweets
-  Sort sweets (by name, price, quantity)
-  Download test report as PDF

---

# Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/nirja14/SweetShop.git
   cd SweetShop
   
2. Install dependencies:
   ```bash
   npm install
   npm install express ,jest
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
4. Open the app: 
   Navigate to [http://localhost:3000](http://localhost:3001)

---

# Testing

This project follows est-Driven Development (TDD) using Jest.

Run tests using:
```bash
npm test
```
 Test Report
A manual testing summary is available in:
📄 [`public/TEST_REPORT.pdf`](public/TEST_REPORT.pdf)

Thanks for exploring the Sweet Shop Management System!
This project was built with a focus on learning, testing, and clean architecture using modern web technologies.
