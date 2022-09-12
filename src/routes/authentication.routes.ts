import { Router } from "express";
import { AuthenticationController } from "../controllers/authentication.controller";

import { AuthenticationRequestVerifications } from "../middlewares/verifications/requestContent/authentication.middleware";
import { AuthenticationDBVerifications } from "../middlewares/verifications/database/authentication.middleware";
import { hashPassword, comparePassword } from "../middlewares/security/authentication.middleware";


const authenticationRouter = Router();

authenticationRouter.post(
  '/register', 
  AuthenticationRequestVerifications.verifyPresenceOfFieldsForRegister,
  AuthenticationRequestVerifications.verifyUsernamePresence,
  AuthenticationRequestVerifications.verifyEmailPresence,
  AuthenticationRequestVerifications.verifyEmailSyntax,
  AuthenticationRequestVerifications.verifyPasswordPresence,
  AuthenticationRequestVerifications.verifyPasswordSyntax,
  AuthenticationDBVerifications.findUserInDbByUsername,
  AuthenticationDBVerifications.dontAuthorizeDuplicateUsername,
  hashPassword,
  AuthenticationController.register
);  

authenticationRouter.get(
  '/login',
  AuthenticationRequestVerifications.verifyPresenceOfFieldsForLogin,
  AuthenticationRequestVerifications.verifyUsernamePresence,
  AuthenticationRequestVerifications.verifyPasswordPresence,
  AuthenticationRequestVerifications.verifyPasswordSyntax,
  AuthenticationDBVerifications.findUserInDbByUsername,
  AuthenticationDBVerifications.checkIfUserExistForLogin,
  comparePassword,
  AuthenticationController.login
  )

export default authenticationRouter;