import jwt from 'jsonwebtoken';

export default function adminAuth(req, res, next) {
    try { // 토큰 검증 성공
        if (req.decoded.isAdmin === true) {
            return next();
        } else {
            console.log(req.decoded.isAdmin);
            return res.status(403).send("NEED_AUTHORIZATION");
        }
    } catch (err) { // 토큰 검증 실패
        return res.status(500).send("VERIFICATION_FAILURE");
    }
}

