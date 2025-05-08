export const cooldownOtp = (lastSent, limitInMs = 60000) => {
   
    const now = Date.now();
  
    if (lastSent && now - new Date(lastSent).getTime() < limitInMs) {
      const secondsLeft = Math.ceil((limitInMs - (now - new Date(lastSent).getTime())) / 1000);
  
      return {
        allowed: false,
        status: 429,
        message: `Please wait ${secondsLeft}s before requesting another OTP.`,
      };
    }
  
    return { allowed: true };
  };

  
//   const cooldownCheck = cooldownOtp(user.lastOtpSent);
//   if (!cooldownCheck.allowed) {
//     return NextResponse.json({ message: cooldownCheck.message }, { status: cooldownCheck.status });
//   }