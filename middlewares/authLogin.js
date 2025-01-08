const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    status: 'fail',
                    message: 'Token inválido ou expirado.'
                })
            }

            req.user = user;

            next()
        })

    } else {
        return res.status(401).json({
            status: 'fail',
            message: 'Requisição não possui parâmetro de autorização.'
        })
    }
}

