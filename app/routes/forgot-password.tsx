import { Label } from '@radix-ui/react-label';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

const ForgotPassword = () => {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email address and we will send you a verification code
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Send reset instructions
        </Button>
        <div className="text-center text-sm">
          Remember your password?{' '}
          <a href="/auth/login" className="underline underline-offset-4">
            Back to login
          </a>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
