const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const user = req.user;

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
            }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: `Access denied. ${allowedRoles.join(' or ')} privileges required.`,
                    yourRole: user.role
                });
            }

            next();
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error checking role permissions',
                error: error.message
            });
        }
    };
};

module.exports = roleMiddleware;