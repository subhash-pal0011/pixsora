export const logout = async (_, res) => {
       try {
              res.cookie("token", "", {
                     httpOnly: true,
                     expires: new Date(Date.now()),
                     sameSite: "none",
                     secure: true
              });

              return res.status(200).json({
                     success: true,
                     message: "Logout successful"
              });

       } catch (error) {
              return res.status(500).json({
                     success: false,
                     message: "Logout failed",
                     error: error.message
              });
       }
};
