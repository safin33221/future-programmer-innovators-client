'use client';

import { useEffect, useState } from 'react';

const OTP_EXPIRY_SECONDS = 10; // testing (use 120 in production)

interface OtpCountdownProps {
  onExpire: () => void;
}

export function OtpCountdown({ onExpire }: OtpCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_SECONDS);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  if (timeLeft <= 0) {
    return (
      <p className="text-sm text-destructive font-medium">
        OTP expired. Please resend.
      </p>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <p className="text-xs text-muted-foreground">
      OTP expires in{' '}
      <span className="font-medium text-foreground">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
    </p>
  );
}
