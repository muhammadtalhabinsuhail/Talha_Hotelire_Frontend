"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // 👁️ icons added
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onLoginSuccess: () => void;
  onForgotPassword: () => void;
}

export function PasswordModal({
  isOpen,
  onClose,
  email,
  onLoginSuccess,
  onForgotPassword,
}: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle state

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setIsLoggingIn(true);
    setError("");

    try {

      const response = await axios.post(
        `${baseUrl}/auth/login`,
        {
          email: email,
          passwordhash: password
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );




      if (response.data.message == "Login successful") {
        const userResponse = await axios.get(`${baseUrl}/auth/me`, { withCredentials: true });
        if (userResponse) {
          onLoginSuccess();
        }
      } else {
        setError(response.data.message || "Incorrect password. Please try again.");
        setPassword("");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px] transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95"
        data-testid="modal-password"
      >
        <DialogHeader>
          <DialogTitle className="[font-family:'Poppins',Helvetica] text-2xl font-bold text-[#59A5B2]">
            Welcome Back
          </DialogTitle>
          <DialogDescription className="[font-family:'Inter',Helvetica] text-gray-600">
            Enter your password to continue.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="[font-family:'Inter',Helvetica] text-gray-700 font-medium"
            >
              Password
            </Label>

            {/* 👁️ Password Field with Show/Hide */}
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="h-12 border-gray-300 focus:border-[#59A5B2] focus:ring-[#59A5B2] pr-10"
                autoFocus
                data-testid="input-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#59A5B2] transition-colors"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            {error && (
              <p
                className="text-sm text-red-500 [font-family:'Inter',Helvetica]"
                data-testid="text-password-error"
              >
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 [font-family:'Inter',Helvetica] text-sm text-gray-600">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
                className="border-gray-300 data-[state=checked]:bg-[#59A5B2] data-[state=checked]:border-[#59A5B2]"
                data-testid="checkbox-remember-me"
              />
              Remember me
            </label>

            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-blue-600 hover:underline [font-family:'Inter',Helvetica]"
              data-testid="link-forgot-password"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoggingIn}
            className="w-full h-12 bg-[#59A5B2] hover:bg-[#4C7E87] text-white transition-colors duration-200"
            data-testid="button-continue"
          >
            {isLoggingIn ? "Logging in..." : "Continue"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
