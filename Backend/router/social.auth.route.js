import express from "express";
import passport from 'passport';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const router=express.Router();
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/linkedin', passport.authenticate('linkedin'));
router.get( '/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
}));
router.get( '/linkedin/callback',
    passport.authenticate( 'linkedin', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
}));
router.get('/callback/success' , (req , res) => {
    // console.log('Authenticated User:', req.user);
    if(!req.user)
        res.redirect('/callback/failure');
    const token=jwt.sign({userId:req.user._id,userRole:3},process.env.SERECT_KEY,{expiresIn:'1d'});
    res.cookie('token', token, { httpOnly: true, secure: true });
    res.redirect(`${process.env.CALLBACK_URL}/applicant`);
});
router.get('/callback/failure' , (req , res) => {
    res.status(401).send('Login Failed');
})
export default router;