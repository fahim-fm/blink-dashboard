import { Title } from "../ui";

interface AuthLayoutProps {
  children: React.ReactNode;
  description?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  description,
}) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-1">
      <div className="max-w-[400px] w-full space-y-8">

        <div className="bg-form py-5 px-5 shadow-sm rounded-[32px]">
          <div className="text-center mb-[44px]">
            <Title as="h1" variant="logo">
              BLINK
            </Title>
            {description && (
              <p className="mt-2 text-sm font-normal text-text-muted">
                {description}
              </p>
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
