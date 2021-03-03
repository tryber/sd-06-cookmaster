import { Router } from 'express'
import { checkIfExist, checkEmailIsValid, checkPasswordIsValid } from '../services/basicChecks'
import { generateToken } from '../auth/generateToken'
import { getByEmail } from '../models/users'

const loginController = Router();

loginController.post('/', async (req, res) => {
    const { email, password } = req.body;
    const entriesExist = checkIfExist(email) && checkIfExist(password);

    if (!entriesExist) {
      const errorMsg = { message: "All fields must be filled" };
      console.log('entra aquiii')
      return res.status(401).json(errorMsg)
    } 
    
    const entriesAreValid= checkEmailIsValid(email) && checkPasswordIsValid(password);
    if (!entriesAreValid) {
      const errorMsg = { message: "Incorrect username or password" };
      return res.status(401).json(errorMsg)
    } 
    
    const response = await getByEmail(email)
    if (response.email !== email || response.password !== password) {
      const errorMsg = { message: "Incorrect username or password" };
      return res.status(401).json(errorMsg)
    }

    const payload = { name: response.name, role: response.role }
    const token = await generateToken(payload)
    res.status(200).json({ token })
});

export default loginController;