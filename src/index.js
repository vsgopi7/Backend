
import dotenv from 'dotenv';
import connectDB from './db/index.js'; // Ensure the correct path and file extension
import {app} from './app.js'; // Ensure the correct path and file extension
dotenv.config();


const port = process.env.PORT || 3000;

connectDB()
.then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch(error => console.error("MONGODB ERROR CONNECTION",error));  



