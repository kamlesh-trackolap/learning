import { AuthService } from "../../services/auth/auth.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import userModal from "../../models/user.model.js";

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await AuthService.register(email, password);
  res.json({ message: "User created", user });
});
export const AuthController = {
  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await AuthService.register(email, password);
      res.json({ message: "User created", user });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const tokens = await AuthService.login(email, password);

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.json({ accessToken: tokens.accessToken });
    } catch (err) {
      next(err);
    }
  },

  sendOtp: async (req, res, next) => {
    try {
      const { email } = req.body;
      const out = await AuthService.loginByOtp(email);
      res.json(out);
    } catch (err) {
      next(err);
    }
  },

  verifyOtp: async (req, res, next) => {
    try {
      const { email, otp } = req.body;
      const tokens = await AuthService.verifyOtp(email, otp);

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.json({ accessToken: tokens.accessToken });
    } catch (err) {
      next(err);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const oldToken = req.cookies.refreshToken;
      const tokens = await AuthService.rotateRefreshToken(oldToken);

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.json({ accessToken: tokens.accessToken });
    } catch (err) {
      next(err);
    }
  },
};
