import { Outlet } from 'react-router';
import cclIcon from '~/assets/images/ccl.png';
import cclLogo from '~/assets/images/logoCCL.png';

const AuthLayout = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="https://codecrafterslabs.com/"
            className="flex items-center gap-2 font-medium"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md text-primary-foreground">
              <img
                src={cclIcon}
                alt="CCL Logo"
                className="size-6 object-contain"
              />
            </div>
            CodeCrafter Labs
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0">
          <img
            src={cclLogo}
            alt="CCL Logo"
            className="h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
