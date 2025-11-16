import { userModal } from "../../models/user.model.js";
import { generateOtp } from "../../utils/auth/generateOtp.js";
import { comparePassword, compareToken, hashPassword, hashToken } from "../../utils/auth/hash.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/auth/token.js";

export const AuthService = {
  async register(email: string, password: string) {
    const exists = await userModal.findOne({ email });
    if (exists) throw new Error("User already exists");

    const passwordHash = await hashPassword(password);

    const user = await userModal.create({ email, password: passwordHash });
    return user;
  },

  async login(email: string, password: string) {
    const user = await userModal.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const match = await comparePassword(password, user.password!);
    if (!match) throw new Error("Invalid credentials");

    return await this.issueTokens(user);
  },

  async loginByOtp(email: string) {
    const user = await userModal.findOne({ email });
    if (!user) throw new Error("User not found");

    const otp = generateOtp();
    const otpHash = await hashPassword(otp);

    user.otpHash = otpHash;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    console.log("SEND OTP TO EMAIL:", otp);

    return { message: "OTP sent" };
  },

  async verifyOtp(email: string, otp: string) {
    const user = await userModal.findOne({ email });
    if (!user || !user.otpHash) throw new Error("Invalid OTP");

    if (user.otpExpiry! < new Date()) throw new Error("OTP expired");

    const valid = await comparePassword(otp, user.otpHash);
    if (!valid) throw new Error("Invalid OTP");

    user.otpHash = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return await this.issueTokens(user);
  },

  async googleLogin(googleId: string, email: string) {
    let user = await userModal.findOne({ email });

    if (!user) {
      user = await userModal.create({ email, googleId });
    }

    return await this.issueTokens(user);
  },

  async issueTokens(user: any) {
    const accessToken = await generateAccessToken({ sub: user._id });
    const refreshToken = await generateRefreshToken({ sub: user._id });

    const refreshHash = await hashToken(refreshToken);
    user.refreshTokens.push(refreshHash);
    await user.save();

    return { accessToken, refreshToken };
  },

  async rotateRefreshToken(oldRefreshToken: string) {
    const payload = await verifyRefreshToken(oldRefreshToken);

    const user = await userModal.findById(payload.userId);
    if (!user) throw new Error("Invalid token");

    // check if token exists
    const match = await Promise.all(
      user.refreshTokens.map(hash => compareToken(oldRefreshToken, hash))
    );

    if (!match.includes(true)) throw new Error("Refresh token revoked");

    // remove old token
    user.refreshTokens = user.refreshTokens.filter(
      (_, i) => !match[i]
    );

    // issue new tokens
    const accessToken = await generateAccessToken({ sub: user._id });
    const newRefreshToken = await generateRefreshToken({ sub: user._id });

    const newRefreshHash = await hashToken(newRefreshToken);
    user.refreshTokens.push(newRefreshHash);
    await user.save();

    return { accessToken, refreshToken: newRefreshToken };
  },
};
