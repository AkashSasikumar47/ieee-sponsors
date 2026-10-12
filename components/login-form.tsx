"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Alert, AlertDescription } from "@ieee/ui/components/alert";
import { Button } from "@ieee/ui/components/button";
import { Input } from "@ieee/ui/components/input";
import { Label } from "@ieee/ui/components/label";
import { SHAKE } from "@/components/motion/timing";

const ERRORS: Record<string, string> = {
  credentials: "Incorrect email or password",
  admin: "This account is not an admin",
};

export function LoginForm({ error }: { error?: string }) {
  const [pending, setPending] = useState(false);
  const message = error ? (ERRORS[error] ?? ERRORS.credentials) : "";

  return (
    <motion.form
      method="post"
      action="/api/auth/login"
      onSubmit={() => setPending(true)}
      className="flex flex-col gap-5"
      animate={{ x: message ? SHAKE.path : 0 }}
      transition={{ duration: SHAKE.duration, delay: SHAKE.delay }}
    >
      {message && (
        <Alert variant="destructive">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="font-mono text-xs uppercase">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          inputMode="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          required
          className="h-11 bg-background text-base"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="font-mono text-xs uppercase">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="h-11 bg-background text-base"
        />
      </div>
      <Button type="submit" size="lg" className="h-11" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </motion.form>
  );
}
